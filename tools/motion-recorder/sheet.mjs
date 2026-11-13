#!/usr/bin/env node
/**
 * Monta uma folha de contato (grade de frames com tempo e scroll) de uma gravação,
 * para ver uma animação quadro a quadro numa imagem só.
 *
 *   node tools/motion-recorder/sheet.mjs --rec rec/slush-desktop --from 1200 --to 2400 --count 12 [--cols 4] [--out sheet.png]
 *
 * --from/--to em ms (do frames.json) ou --mark nome (+ --span ms). Escolhe frames distribuídos no intervalo.
 * Renderiza a grade numa página local no Chrome headless e salva PNG.
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
const rec = path.resolve(args.rec)
const meta = JSON.parse(fs.readFileSync(path.join(rec, 'frames.json'), 'utf8'))
let from = +(args.from ?? 0)
let to = +(args.to ?? meta.frames.at(-1).t)
if (args.mark) {
  const m = meta.marks.find((x) => x.name === args.mark)
  if (!m) throw new Error(`marca não encontrada: ${args.mark}`)
  from = m.t
  to = m.t + +(args.span || 1500)
}
const count = +(args.count || 12)
const cols = +(args.cols || 4)
const pool = meta.frames.filter((f) => f.t >= from && f.t <= to)
if (!pool.length) throw new Error('nenhum frame no intervalo')
const pick = Array.from({ length: Math.min(count, pool.length) }, (_, i) => pool[Math.round((i * (pool.length - 1)) / Math.max(1, Math.min(count, pool.length) - 1))])
const cellW = Math.min(480, Math.round(1920 / cols))
const cellH = Math.round((cellW * meta.h) / meta.w)
const rows = Math.ceil(pick.length / cols)
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#111;font:600 13px system-ui;color:#fff}
.g{display:grid;grid-template-columns:repeat(${cols},${cellW}px);gap:6px;padding:6px}
figure{margin:0}img{display:block;width:${cellW}px;height:${cellH}px;object-fit:cover;outline:1px solid #333}
figcaption{padding:3px 2px}</style><div class="g">${pick
  .map((f) => `<figure><img src="file:///${path.join(rec, 'frames', f.file).replace(/\\/g, '/')}"><figcaption>#${f.n} · ${f.t} ms · y ${f.scrollY}</figcaption></figure>`)
  .join('')}</div>`
const tmp = path.join(os.tmpdir(), `sheet-${process.pid}.html`)
fs.writeFileSync(tmp, html)
const W = cols * (cellW + 6) + 6
const H = rows * (cellH + 26) + 6
const outFile = path.resolve(args.out || path.join(rec, `sheet-${from}-${to}.png`))
const chromePath = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome'].find((p) => p && fs.existsSync(p))
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'motion-sheet-'))
await new Promise((resolve) => {
  const c = spawn(chromePath, ['--headless=new', `--user-data-dir=${profile}`, '--allow-file-access-from-files', '--hide-scrollbars', `--window-size=${W},${H}`, `--screenshot=${outFile}`, `file:///${tmp.replace(/\\/g, '/')}`], { stdio: 'ignore' })
  c.on('exit', resolve)
})
fs.rmSync(tmp, { force: true })
try {
  fs.rmSync(profile, { recursive: true, force: true })
} catch {}
console.log(`${pick.length} frames (${from}-${to} ms) -> ${outFile}`)
