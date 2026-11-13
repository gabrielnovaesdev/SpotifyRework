/**
 * Gera public/imagens/symbol-3d.webp renderizando o símbolo 3D (src/three/renderSymbol.ts) no
 * Chrome headless a partir do servidor de desenvolvimento.
 *   npm run dev  (porta 5173)  →  node tools/bake-symbol.mjs [--url http://localhost:5173/]
 */
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const i = process.argv.indexOf('--url')
const url = (i > 0 ? process.argv[i + 1] : 'http://localhost:5173/') + '?bake-symbol'
const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome'].find((p) => p && fs.existsSync(p))
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'bake-'))
const r = spawnSync(chrome, ['--headless=new', `--user-data-dir=${profile}`, '--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--virtual-time-budget=20000', '--dump-dom', url], { encoding: 'utf8', maxBuffer: 1 << 28 })
const m = /<textarea id="bake-out">data:image\/webp;base64,([^<]+)<\/textarea>/.exec(r.stdout || '')
if (!m) {
  console.error('não encontrei a imagem no DOM; o servidor de desenvolvimento está rodando?')
  process.exit(1)
}
const out = path.resolve('public/imagens/symbol-3d.webp')
fs.writeFileSync(out, Buffer.from(m[1], 'base64'))
console.log('ok ->', out, fs.statSync(out).size, 'bytes')
