#!/usr/bin/env node
/**
 * Gravador de tela frame a frame para analisar sites (referências, bugs, responsividade).
 *
 * Usa o Chrome/Edge instalado via DevTools Protocol (Page.startScreencast): cada frame
 * que o navegador pinta vira um JPEG numerado, com o tempo (ms desde o início) e o scroll.
 * Não precisa de ffmpeg nem de dependências: só Node 22+ (WebSocket global).
 *
 *   node tools/motion-recorder/record.mjs --url https://slush.org --plan plan.json --out rec/slush-desktop
 *     [--w 1440] [--h 900] [--mobile] [--quality 70] [--headful] [--reduced]
 *
 * O plano é uma lista de passos executados em ordem (ver README.md):
 *   { "wait": 800 }                                  espera
 *   { "wheel": 1200, "ms": 1500 }                    rola com a roda do mouse (negativo sobe), distribuído no tempo
 *   { "scrollTo": 0 }                                pula direto (window.scrollTo)
 *   { "key": "Tab" } | { "key": "ArrowRight" }       tecla
 *   { "click": "css selector" }                      clique no centro do elemento
 *   { "hover": "css selector" }                      move o mouse até o elemento
 *   { "drag": "css selector", "dx": -400, "ms": 600 }  arrasta com o mouse a partir do centro
 *   { "swipe": "css selector", "dx": -300, "dy": 0 }   gesto de toque (precisa de --mobile)
 *   { "eval": "js" }                                 roda JS na página
 *   { "log": "js" }                                  imprime o valor de uma expressão (medições)
 *   { "mark": "nome" }                               marca o tempo no frames.json (para achar trechos)
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith('--')) acc.push([a.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true])
    return acc
  }, []),
)
if (!args.url || !args.out) {
  console.error('uso: record.mjs --url <url> --out <pasta> [--plan plano.json] [--w 1440 --h 900] [--mobile] [--reduced]')
  process.exit(1)
}
const W = +(args.w || 1440)
const H = +(args.h || 900)
const mobile = !!args.mobile
const out = path.resolve(args.out)
const plan = args.plan ? JSON.parse(fs.readFileSync(args.plan, 'utf8')) : [{ wait: 1500 }, { wheel: 3000, ms: 4000 }, { wait: 800 }]
fs.rmSync(out, { recursive: true, force: true })
fs.mkdirSync(path.join(out, 'frames'), { recursive: true })

const chromePath = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && fs.existsSync(p))
if (!chromePath) throw new Error('Chrome não encontrado (defina CHROME_PATH)')

const port = 9300 + Math.floor(Math.random() * 500)
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'motion-rec-'))
const chrome = spawn(
  chromePath,
  [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    args.headful ? '' : '--headless=new',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    '--autoplay-policy=no-user-gesture-required',
    `--window-size=${W},${H}`,
    'about:blank',
  ].filter(Boolean),
  { stdio: 'ignore' },
)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function cdpTarget() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()
      const page = list.find((t) => t.type === 'page')
      if (page) return page.webSocketDebuggerUrl
    } catch {}
    await sleep(250)
  }
  throw new Error('não consegui falar com o Chrome')
}

const ws = new WebSocket(await cdpTarget())
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
let id = 0
const pending = new Map()
const listeners = []
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)
  } else if (msg.method) listeners.forEach((fn) => fn(msg))
})
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const i = ++id
    pending.set(i, { resolve, reject })
    ws.send(JSON.stringify({ id: i, method, params }))
  })

await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile })
if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 })
if (args.reduced) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })

// ---- captura
const frames = []
const marks = []
let t0 = 0
listeners.push(async (msg) => {
  if (msg.method !== 'Page.screencastFrame') return
  const { data, metadata, sessionId } = msg.params
  send('Page.screencastFrameAck', { sessionId }).catch(() => {})
  const t = Math.round(metadata.timestamp * 1000 - t0)
  const n = frames.length
  const file = `${String(n).padStart(5, '0')}.jpg`
  fs.writeFileSync(path.join(out, 'frames', file), Buffer.from(data, 'base64'))
  frames.push({ n, file, t, scrollY: Math.round(metadata.scrollOffsetY) })
})

const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value
const center = async (sel) => {
  const r = await evaluate(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return null; e.scrollIntoView({block:'nearest'}); const b=e.getBoundingClientRect(); return {x:b.left+b.width/2,y:b.top+b.height/2}})()`)
  if (!r) throw new Error(`seletor não encontrado: ${sel}`)
  return r
}
const mouse = (type, x, y, extra = {}) => send('Input.dispatchMouseEvent', { type, x, y, button: 'left', ...extra })

// a captura começa antes da navegação para pegar a entrada da página
t0 = Date.now()
await send('Page.startScreencast', { format: 'jpeg', quality: +(args.quality || 70), maxWidth: W, maxHeight: H, everyNthFrame: 1 })
await send('Page.navigate', { url: args.url })
await new Promise((r) => {
  const fn = (m) => m.method === 'Page.loadEventFired' && (listeners.splice(listeners.indexOf(fn), 1), r())
  listeners.push(fn)
  setTimeout(r, 15000)
})
marks.push({ name: 'loaded', t: Date.now() - t0 })

let mx = W / 2
let my = H / 2
for (const step of plan) {
  try {
  const now = Date.now() - t0
  if (step.mark) marks.push({ name: step.mark, t: now })
  if (step.wait) await sleep(step.wait)
  if (step.scrollTo !== undefined) await evaluate(`window.scrollTo(0, ${step.scrollTo})`)
  if (step.wheel) {
    const ms = step.ms || 1000
    const ticks = Math.max(1, Math.round(ms / 16))
    for (let i = 0; i < ticks; i++) {
      await mouse('mouseWheel', mx, my, { deltaX: 0, deltaY: step.wheel / ticks })
      await sleep(16)
    }
  }
  if (step.key) {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: step.key, code: step.key, windowsVirtualKeyCode: { Tab: 9, Enter: 13, Escape: 27, ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40, ' ': 32, PageDown: 34, PageUp: 33 }[step.key] })
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: step.key, code: step.key })
  }
  if (step.hover || step.click) {
    const p = await center(step.hover || step.click)
    for (let i = 1; i <= 12; i++) await mouse('mouseMoved', mx + ((p.x - mx) * i) / 12, my + ((p.y - my) * i) / 12), await sleep(16)
    mx = p.x
    my = p.y
    if (step.click) {
      await mouse('mousePressed', mx, my, { clickCount: 1 })
      await sleep(60)
      await mouse('mouseReleased', mx, my, { clickCount: 1 })
    }
  }
  if (step.drag) {
    const p = await center(step.drag)
    const ms = step.ms || 600
    const n = Math.max(4, Math.round(ms / 16))
    await mouse('mousePressed', p.x, p.y, { clickCount: 1 })
    for (let i = 1; i <= n; i++) await mouse('mouseMoved', p.x + ((step.dx || 0) * i) / n, p.y + ((step.dy || 0) * i) / n, { buttons: 1 }), await sleep(16)
    await mouse('mouseReleased', p.x + (step.dx || 0), p.y + (step.dy || 0), { clickCount: 1 })
  }
  if (step.swipe) {
    const p = await center(step.swipe)
    const n = 14
    const pt = (i) => [{ x: p.x + ((step.dx || 0) * i) / n, y: p.y + ((step.dy || 0) * i) / n }]
    await send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(0) })
    for (let i = 1; i <= n; i++) await send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pt(i) }), await sleep(16)
    await send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  }
  if (step.eval) await evaluate(step.eval)
  if (step.log) console.log("log:", JSON.stringify(await evaluate(step.log)))
  } catch (err) {
    console.warn('passo ignorado:', JSON.stringify(step), '-', err.message)
  }
}
await sleep(400)
await send('Page.stopScreencast').catch(() => {})
await sleep(200)

fs.writeFileSync(path.join(out, 'frames.json'), JSON.stringify({ url: args.url, w: W, h: H, mobile, reduced: !!args.reduced, marks, frames }, null, 1))
ws.close()
chrome.kill()
await sleep(300)
try {
  fs.rmSync(profile, { recursive: true, force: true })
} catch {}
const dur = frames.length ? frames.at(-1).t : 0
console.log(`${frames.length} frames em ${(dur / 1000).toFixed(1)}s (~${Math.round(frames.length / Math.max(dur / 1000, 0.001))} fps) -> ${out}`)
