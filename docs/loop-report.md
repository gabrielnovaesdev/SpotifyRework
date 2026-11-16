# Relatório do loop: objetos, entradas e fontes no nível da slush.app (13/11/2026)

Execução automática do agendamento `spotify-slush-loop`, na branch `v1.2`. O foco foi a **Prioridade 1**
(objetos, entrada do hero, símbolo 3D e fontes). Os passos de "medir na referência" e "comparar com o nosso
site" foram feitos com `tools/motion-recorder`; as gravações ficam em `.motion/` (fora do git).

## Medições novas na referência (slush.app, 1440×900)
- **Gravação da entrada** (`.motion/ref-entrance`, 572 quadros, ~62 fps, folhas de 0 a 3,5 s com 30 quadros):
  - o logotipo aparece inteiro (~1,0 s), fica parado e depois cada coluna de letra rola em **fatias** de glifo
    (~1,4 s → ~2,4 s), com atrasos diferentes por coluna;
  - as ilustrações surgem entre ~2,0 e ~2,4 s, com escala e rebote; os CTAs ficam visíveis por volta de 1,8 a 2,0 s;
  - a frase de apoio entra palavra por palavra entre ~2,67 e ~3,1 s.
- **Recorte dos objetos** (nova opção `--crop` do `sheet.mjs`): estilo chapado, contorno preto de ~2 px, uma
  faixa de "espessura" em tom mais escuro, brilhos brancos e personalidade (a moeda tem olhos com pupilas que
  passeiam). Animação interna sutil, com ciclo de ~2 s e amplitudes pequenas (pupilas ±3 px, giro de ±4°).

## Rodadas e mudanças

### Rodada 1: fontes
- Display: **Archivo Variable em largura 62% e peso 900** (equivalente livre da Lateral), reto em `.display`
  e com **itálico real** + 4° de cisalhamento em `.display-tilt` (antes era Anton com `skewX(-7deg)`).
- Texto: **Figtree Variable** (equivalente livre da Aeonik Pro).
- `@fontsource/anton` foi removido e `@fontsource-variable/figtree` adicionado; `src/main.tsx` e os tokens
  `--font-display` e `--font-sans` em `src/index.css` foram atualizados. A entrelinha ficou em 1,02 / 1,04 e o
  espaço entre palavras subiu um pouco.
- Não deu para comparar lado a lado com a Lateral renderizada: as fontes da Slush são deles e não foram baixadas.
  A comparação foi visual, contra os quadros gravados da referência.

### Rodada 2: objetos musicais (`src/components/Stickers.tsx`, keyframes `sk-*` em `index.css`)
Nove objetos redesenhados com contorno de 3 unidades no viewBox (~2 px na tela), cor chapada, tom de
sombra/espessura, brilhos e detalhes. Cada um ganhou uma animação interna própria:

| Objeto | Detalhes | Animação interna |
|---|---|---|
| Fones | almofadas internas, haste, cabo com plugue | conchas pulsam no ritmo (defasadas), cabo balança, traços de som piscam |
| Microfone | grade recortada, sombra em crescente, anel, botão | ondas sonoras em 3 tempos, leve aceno |
| Disco + braço | sulcos, selo com marcas assimétricas, reflexos fixos | disco gira (a luz não gira), braço oscila |
| Fita cassete | etiqueta, janela com fita enrolada, parafusos | rolos giram, corpo balança com leve deformação |
| Nota | bandeira, cabeça com sombra e olhos | quica com deformação (estica/achata), sombra no chão, bandeira tremula, pisca, pupilas passeiam |
| Play | base com espessura, brilho | emite anéis, triângulo "aperta" |
| Equalizador (novo) | 5 barras com sombra lateral e brilho | barras sobem e descem com durações diferentes |
| Caixa de som (nova) | gabinete com espessura, tweeter | woofer bate com rebote |

- `phase` defasa a mesma animação entre instâncias.
- Os loops param fora da tela: o novo `src/hooks/useOffscreen.ts` aplica `.is-offscreen`. Essa classe já
  existia no CSS, mas **nunca era aplicada**, então os loops também gastavam quadro fora da tela.
- Com movimento reduzido, as animações internas ficam desligadas.
- O `clipPath` do microfone passou a usar `useId`, para não colidir quando há mais de um na página.

### Rodada 3: símbolo 3D (`Symbol3D.tsx`, `src/three/renderSymbol.ts`, `tools/bake-symbol.mjs`)
- O path do símbolo é extrudado em **Three.js** com chanfro arredondado (18 segmentos), material físico verde,
  grão fino (ruído como relevo e rugosidade, ~1 texel por pixel) e luz de estúdio: luz chave pontual com queda,
  céu/chão, recorte frio e RoomEnvironment. A tonalização é Neutral, para não lavar o verde.
- A primeira versão renderizava em tempo de execução. Isso **atrasava a entrada em ~1,4 s** (compilação de
  shader na thread principal) e o resultado saía lavado. A decisão foi **"assar" uma vez**:
  `public/imagens/symbol-3d.webp` (1400 px, 328 KB). Em produção não há WebGL nem o pacote do three (ele só
  entra no código de desenvolvimento, com `?bake-symbol`). O SVG com filtros fica de reserva se a imagem falhar.
- O parallax suave foi mantido (wrapper com `will-change-transform`).

### Rodada 4: entrada do hero em letras-rolo (`Hero.tsx`)
- Cada letra de "PREMIUM" virou uma coluna recortada com 5 cópias do glifo espaçadas em 1,45 em. O rolo desce e
  assenta na cópia de cima (`expo.inOut`, 0,95–1,11 s, atrasos de 0 a 0,34 s fora de ordem). Isso gera as fatias
  vistas na referência. A primeira tentativa, com cópias coladas, deixava o rolo invisível.
- Sequência medida, aplicada a partir do início do rolo: CTAs em +0,4 s (subindo em sequência, clicáveis cedo),
  objetos em +0,65 s (70 ms entre si, `back.out(2.2)`), frase palavra a palavra em +1,25 s (0,35 s cada,
  0,1 s entre palavras), termos em +1,5 s.
- O título e os CTAs ficam escondidos até a fonte carregar (limite de 0,9 s), para não piscar a fonte reserva.
  O leitor de tela ouve "Spotify Premium" (texto `sr-only`; o rolo é `aria-hidden`).
- Os quatro objetos principais agora ficam **ancorados ao título**, encostando nas letras como na referência.
  Os outros ficam na periferia; caixa de som e equalizador foram adicionados (`lg+`).

### Rodada 5: celular
- No celular, o título subiu para `min(23vw, 6.5rem)` e os objetos de cima cresceram (24% e 22% do título).
- O disco e o microfone saíram de cima do subtítulo e foram para a faixa livre abaixo dos CTAs.
- O subtítulo ficou em 1,3 rem, cabendo em uma linha.

## Testes executados
- `npx tsc --noEmit -p .` e `npx tsc -b`: ok. `npm run build`: ok.
- Overflow horizontal com o plano `plans/check.json` (novo passo `log` no gravador): nenhum em **1440**,
  **375 com toque** e **375 com movimento reduzido** (`scrollWidth === innerWidth`).
- Ritmo de quadros (rAF, headless sem vsync): 121 fps parado no hero e 95–97 fps durante o scroll programático,
  em desktop e celular. Seções fora da tela recebem `.is-offscreen` (6–8 por vez).
- Movimento reduzido: título visível e cabendo (301 px em 375), objetos visíveis (opacidade 1), loops parados.
- Scroll completo em desktop (`.motion/ours-pages`): a fonte nova em todas as seções, sem corte nem colisão de acentos.

## Diferenças restantes em relação à Slush
- **Objetos**: o desenho e o movimento são próprios, em SVG + CSS. Ficam um pouco mais "limpos" que as
  ilustrações Lottie da referência, que têm traço com variação de espessura e mais quadros de animação
  (piscada da moeda, chama do foguete). Para chegar lá, seria preciso ilustrar à mão ou montar Lottie em uma
  ferramenta de animação.
- **Símbolo 3D**: tem volume, grão e luz reais, mas o "S" da referência é uma forma tubular orgânica com
  subsurface. O nosso é o logotipo extrudado (a forma da marca precisa ser preservada).
- **Fontes**: Archivo 62%/900 é próxima, mas não idêntica à Lateral (a Lateral é mais estreita e de ombros mais
  quadrados). Não houve comparação lado a lado com a fonte original.
- **Outras seções** (carrossel, faixas, abas, pilha, rodapé): passaram a usar os objetos novos e a fonte nova,
  mas as entradas de título dessas seções não foram refeitas nesta execução. É o próximo passo do loop.
- Com movimento reduzido, a fonte troca em ~0,5 s (sem animação, não há por que esconder o título).

## O que não pôde ser testado
- O painel do navegador do app foi recusado nesta execução automática. Tudo foi verificado pelo gravador
  headless, sem hover real com mouse e sem toque em aparelho físico.
- Não houve medida de fps com GPU real (o headless usa SwiftShader e não limita por vsync).
- Arraste do carrossel e da pilha: não houve regressão de código nesses componentes, mas eles não foram regravados.

## Continuação (13/11/2026, sessão manual)

### Símbolo da hero voltou ao SVG com luz
- A imagem assada em Three.js ficou lavada (verde chapado). Voltou o símbolo SVG com sombreado difuso,
  brilho especular e grão; o pipeline `three` / `renderSymbol` / `bake-symbol` / `symbol-3d.webp` foi removido.
- **Causa real do símbolo "apagado"**: no modo estrito do React (dev), o primeiro contexto do GSAP era desfeito,
  mas a promessa `document.fonts.load` dele ainda disparava a entrada. A segunda entrada usava `from()` e
  "terminava" no valor parcial deixado pela primeira, então o símbolo ficava parado em ~30% de opacidade e 90% de
  escala (os termos, em ~3%). Corrigido com uma trava `cancelled` na limpeza e `fromTo()` com valores finais
  explícitos. Medido: opacidade 1 e escala 1 após ~1,5 s.

### Rodada 6: objetos embutidos no bloco tipográfico
- Comparando a gravação da referência (bloco "All in", com objetos e o QR no meio das linhas) com a nossa
  (`.motion/ours-r6`): o nosso bloco "100 milhões de músicas sem anúncio" era só texto.
- Agora o disco, a nota e o equalizador ficam **dentro das linhas**, na altura da caixa-alta, com o loop próprio de
  cada um, e saltam para dentro da linha (escala + giro, `back.out`) logo depois das letras vizinhas, no scrub.
- As letras são separadas por palavra e por letra (`words,chars`), então a quebra no celular não corta mais palavras
  ("SEM ANÚ / NCIO"). Os objetos soltos que encostavam no título no celular ficam só a partir de `md`.
- Testado: sem overflow em 375 e 1440; build e tipos ok.
