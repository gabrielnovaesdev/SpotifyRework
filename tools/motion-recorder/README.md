# motion-recorder

Grava um site frame a frame (Chrome/Edge via DevTools, sem ffmpeg) para estudar referências,
caçar bugs de animação e conferir responsividade. Só precisa de Node 22+.

```bash
# grava (desktop) seguindo um plano de ações
node tools/motion-recorder/record.mjs --url https://slush.app/ --plan tools/motion-recorder/plans/survey.json --out .motion/ref

# celular com toque, ou com movimento reduzido
node tools/motion-recorder/record.mjs --url http://localhost:5173/ --plan tools/motion-recorder/plans/mobile.json --out .motion/m --w 390 --h 844 --mobile
node tools/motion-recorder/record.mjs --url http://localhost:5173/ --out .motion/r --reduced

# folha de contato de um trecho (por tempo ou por marca do plano)
node tools/motion-recorder/sheet.mjs --rec .motion/ref --from 3000 --to 9000 --count 16 --cols 4
node tools/motion-recorder/sheet.mjs --rec .motion/ref --mark route --span 2000 --count 15 --cols 5
```

Saída: `frames/00000.jpg…` + `frames.json` (tempo em ms desde a navegação, scroll de cada frame e marcas).

Passos do plano (JSON): `wait`, `wheel` (+ `ms`), `scrollTo`, `key`, `click`, `hover`, `drag` (+ `dx`/`dy`/`ms`),
`swipe` (toque, com `--mobile`), `eval`, `mark`. Um passo que falha é avisado e pulado.
Planos usados neste projeto estão em `plans/`. As gravações ficam em `.motion/` (fora do git).
