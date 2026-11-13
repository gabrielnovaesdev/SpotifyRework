import { useId, type CSSProperties } from 'react'

/**
 * Objetos musicais no estilo das ilustrações animadas da referência (desenho e animação próprios):
 * contorno fino e constante, cor chapada + um tom de sombra (espessura/volume) + brilhos, e uma
 * animação INTERNA em loop por objeto, como um Lottie: o disco gira e o braço oscila, os rolos da
 * fita giram, as almofadas do fone pulsam e o cabo balança, o microfone solta ondas, a nota quica
 * e pisca, o play emite anéis, o equalizador sobe e desce, a caixa de som bate.
 *
 * As partes animadas usam classes `sk-*` (keyframes em index.css) com `transform-box: view-box`,
 * então a origem de cada giro é dada em coordenadas do viewBox (120×120). `phase` defasa os loops
 * entre instâncias. Os loops param fora da tela (.is-offscreen) e com movimento reduzido.
 */
type P = { className?: string; phase?: number }
const ink = '#0a0a0b'
const sw = 3 // contorno: ~2px na escala de exibição
const o = (x: number, y: number, delay = 0): CSSProperties => ({ transformOrigin: `${x}px ${y}px`, ['--o' as string]: `${delay}s` })

function Svg({ className = '', phase = 0, children, label }: P & { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`stk overflow-visible ${className}`} style={{ ['--ph' as string]: `${phase}s` }} aria-hidden="true" data-obj={label}>
      {children}
    </svg>
  )
}

/** Olhos com pupilas que passeiam e piscada (personalidade, como os objetos da referência). */
function Eyes({ x, y, gap = 13, r = 6.5, d = 0 }: { x: number; y: number; gap?: number; r?: number; d?: number }) {
  return (
    <g className="sk-blink" style={o(x + gap / 2, y, d)}>
      {[x, x + gap].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy={y} rx={r} ry={r * 1.12} fill="#fff" stroke={ink} strokeWidth={2.4} />
          <g className="sk-look" style={o(cx, y, d)}>
            <circle cx={cx + 1.6} cy={y - 0.6} r={r * 0.52} fill={ink} />
            <circle cx={cx + 2.6} cy={y - 2} r={r * 0.16} fill="#fff" />
          </g>
        </g>
      ))}
    </g>
  )
}

export const Headphones = (p: P) => (
  <Svg {...p} label="fones">
    {/* cabo: balança a partir da concha esquerda */}
    <g className="sk-swing" style={o(22, 102)}>
      <path d="M22 102c0 7-7 8-7 13" fill="none" stroke={ink} strokeWidth={4.5} strokeLinecap="round" />
      <path d="M22 102c0 7-7 8-7 13" fill="none" stroke="#3a3a40" strokeWidth={2} strokeLinecap="round" />
      <rect x={11} y={113} width={8} height={9} rx={2} fill="#ffd731" stroke={ink} strokeWidth={2.2} />
    </g>
    {/* arco */}
    <path d="M23 72V58a37 37 0 0 1 74 0v14" fill="none" stroke={ink} strokeWidth={15} strokeLinecap="round" />
    <path d="M23 72V58a37 37 0 0 1 74 0v14" fill="none" stroke="#a7d4ff" strokeWidth={9} strokeLinecap="round" />
    <path d="M27 58a33 33 0 0 1 8-21" fill="none" stroke="#6fa9e6" strokeWidth={3} strokeLinecap="round" />
    <path d="M44 27a33 33 0 0 1 22-5" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
    <rect x={44} y={16} width={32} height={11} rx={5.5} fill="#ff6a2b" stroke={ink} strokeWidth={sw} />
    {/* conchas que pulsam no ritmo */}
    {[
      { x: 8, cushion: 30, hl: 13, d: 0 },
      { x: 82, cushion: 80, hl: 87, d: 0.45 },
    ].map((c) => (
      <g key={c.x} className="sk-pulse" style={o(c.x + 15, 82, c.d)}>
        <rect x={c.cushion} y={64} width={10} height={36} rx={5} fill="#2b2b31" stroke={ink} strokeWidth={sw} />
        <rect x={c.x} y={60} width={30} height={44} rx={13} fill="#ff5ca8" stroke={ink} strokeWidth={sw} />
        <path d={`M${c.x + 4} 92a12 12 0 0 0 11 9h4a12 12 0 0 0 9-6`} fill="none" stroke="#d63b86" strokeWidth={4} strokeLinecap="round" />
        <rect x={c.hl} y={66} width={5} height={15} rx={2.5} fill="#fff" />
        <circle cx={c.x + 15} cy={84} r={3} fill="#d63b86" stroke={ink} strokeWidth={1.6} />
      </g>
    ))}
    {/* traços de som que piscam para fora */}
    <g className="sk-flash" style={o(4, 70)}>
      <path d="M2 66l-6-4M1 76h-8M2 86l-6 4" stroke={ink} strokeWidth={2.6} strokeLinecap="round" />
    </g>
    <g className="sk-flash" style={o(116, 70, 0.45)}>
      <path d="M118 66l6-4M119 76h8M118 86l6 4" stroke={ink} strokeWidth={2.6} strokeLinecap="round" />
    </g>
  </Svg>
)

export function Mic(p: P) {
  const clip = `mic-${useId().replace(/:/g, '')}`
  return (
  <Svg {...p} label="microfone">
    <defs>
      <clipPath id={clip}>
        <circle cx={60} cy={36} r={25} />
      </clipPath>
    </defs>
    {/* ondas sonoras saindo da cápsula */}
    {[0, 0.6, 1.2].map((d) => (
      <g key={d} className="sk-wave" style={o(60, 36, d)}>
        <path d="M92 18a30 30 0 0 1 0 36" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" />
        <path d="M28 18a30 30 0 0 0 0 36" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" />
      </g>
    ))}
    <g className="sk-nod" style={o(60, 114)}>
      {/* cabo */}
      <path d="M44 66l-6 40a7 7 0 0 0 7 8h30a7 7 0 0 0 7-8l-6-40z" fill="#3a3a40" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      <path d="M68 70l5 36" stroke="#22222a" strokeWidth={6} strokeLinecap="round" />
      <path d="M50 72l-3 26" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.55} />
      <rect x={52} y={84} width={16} height={8} rx={3} fill="#1ed760" stroke={ink} strokeWidth={2.2} />
      {/* anel */}
      <rect x={40} y={56} width={40} height={13} rx={5} fill="#ffd731" stroke={ink} strokeWidth={sw} />
      <path d="M44 66h32" stroke="#e3ad00" strokeWidth={3} strokeLinecap="round" />
      {/* cápsula com grade */}
      <circle cx={60} cy={36} r={25} fill="#cdbcff" />
      <g clipPath={`url(#${clip})`}>
        <path d="M70 62a26 26 0 0 0 14-34a24 24 0 0 1-38 32z" fill="#a58ff0" />
        {[22, 30, 38, 46, 54].map((y) => (
          <path key={y} d={`M30 ${y}h60`} stroke={ink} strokeWidth={1.6} opacity={0.45} />
        ))}
        {[44, 52, 60, 68, 76].map((x) => (
          <path key={x} d={`M${x} 8v56`} stroke={ink} strokeWidth={1.6} opacity={0.45} />
        ))}
      </g>
      <circle cx={60} cy={36} r={25} fill="none" stroke={ink} strokeWidth={sw} />
      <path d="M43 26a19 19 0 0 1 11-9" fill="none" stroke="#fff" strokeWidth={4.5} strokeLinecap="round" />
      <circle cx={43} cy={33} r={2.2} fill="#fff" />
    </g>
  </Svg>
  )
}

export const Vinyl = (p: P) => (
  <Svg {...p} label="disco">
    <circle cx={54} cy={66} r={50} fill="#000" opacity={0.18} transform="translate(3 4)" />
    {/* disco que gira (o selo tem marcas assimétricas para o giro ser visível) */}
    <g className="sk-spin" style={o(54, 64)}>
      <circle cx={54} cy={64} r={48} fill="#17171b" stroke={ink} strokeWidth={sw} />
      {[41, 35, 29, 23].map((r) => (
        <circle key={r} cx={54} cy={64} r={r} fill="none" stroke="#34343c" strokeWidth={1.6} />
      ))}
      <circle cx={54} cy={64} r={16} fill="#1ed760" stroke={ink} strokeWidth={2.6} />
      <path d="M44 61c7-2 14-1 20 2M45 67c6-1 11 0 15 2" stroke={ink} strokeWidth={2.4} strokeLinecap="round" fill="none" />
      <circle cx={63} cy={54} r={3} fill="#ff5ca8" stroke={ink} strokeWidth={1.6} />
    </g>
    {/* reflexos fixos (a luz não gira com o disco) */}
    <path d="M18 50a38 38 0 0 1 20-24" stroke="#fff" strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.42} />
    <path d="M90 80a38 38 0 0 1-12 16" stroke="#fff" strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.25} />
    <circle cx={54} cy={64} r={3} fill="#fff" stroke={ink} strokeWidth={1.8} />
    {/* braço com leve oscilação */}
    <g className="sk-arm" style={o(104, 16)}>
      <path d="M104 16L94 58l-18 14" fill="none" stroke={ink} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M104 16L94 58l-18 14" fill="none" stroke="#d9d9e0" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={66} y={67} width={14} height={9} rx={2.5} transform="rotate(-36 73 71)" fill="#ff6a2b" stroke={ink} strokeWidth={2.4} />
      <circle cx={104} cy={16} r={9} fill="#a7d4ff" stroke={ink} strokeWidth={sw} />
      <circle cx={104} cy={16} r={3.4} fill={ink} />
      <circle cx={101} cy={12.6} r={1.8} fill="#fff" />
    </g>
  </Svg>
)

export const Cassette = (p: P) => (
  <Svg {...p} label="fita cassete">
    <g className="sk-wobble" style={o(60, 60)}>
      <rect x={8} y={24} width={104} height={72} rx={10} fill="#ffd731" />
      <path d="M8 82h104v4a10 10 0 0 1-10 10H18A10 10 0 0 1 8 86z" fill="#e8b100" />
      <path d="M14 30v44" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.7} />
      <rect x={8} y={24} width={104} height={72} rx={10} fill="none" stroke={ink} strokeWidth={sw} />
      <rect x={20} y={31} width={80} height={20} rx={4} fill="#fff" stroke={ink} strokeWidth={2.4} />
      <path d="M27 38h38M27 44h24" stroke="#ff5ca8" strokeWidth={3} strokeLinecap="round" />
      <circle cx={90} cy={41} r={4} fill="#1ed760" stroke={ink} strokeWidth={1.8} />
      {/* janela com a fita enrolada (mais de um lado que do outro) */}
      <rect x={26} y={56} width={68} height={28} rx={14} fill="#2b2b31" stroke={ink} strokeWidth={2.4} />
      <circle cx={42} cy={70} r={12} fill="#7a4b33" />
      <circle cx={78} cy={70} r={9} fill="#7a4b33" />
      <path d="M42 82h36" stroke="#7a4b33" strokeWidth={2} />
      {[
        [42, 70, 0],
        [78, 70, 0.2],
      ].map(([x, y, d]) => (
        <g key={x} className="sk-spin-fast" style={o(x, y, d)}>
          <circle cx={x} cy={y} r={7} fill="#fff" stroke={ink} strokeWidth={2.2} />
          {[0, 120, 240].map((a) => (
            <rect key={a} x={x - 1.4} y={y - 7} width={2.8} height={4.5} fill={ink} transform={`rotate(${a} ${x} ${y})`} />
          ))}
          <circle cx={x} cy={y} r={2.2} fill={ink} />
        </g>
      ))}
      <path d="M34 96l6-9h40l6 9" fill="#ff6a2b" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
      {[
        [16, 32],
        [104, 32],
        [16, 88],
        [104, 88],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={3} fill="#fff" stroke={ink} strokeWidth={1.6} />
          <path d={`M${x - 1.6} ${y}h3.2`} stroke={ink} strokeWidth={1.2} />
        </g>
      ))}
    </g>
  </Svg>
)

export const Note = (p: P) => (
  <Svg {...p} label="nota musical">
    <ellipse className="sk-shadow" style={o(46, 114)} cx={46} cy={114} rx={20} ry={3.5} fill={ink} opacity={0.18} />
    <g className="sk-hop" style={o(46, 104)}>
      <path d="M62 16v66" stroke={ink} strokeWidth={10} strokeLinecap="round" />
      <path d="M62 16v66" stroke="#3a3a40" strokeWidth={4} strokeLinecap="round" />
      <g className="sk-flag" style={o(62, 18)}>
        <path d="M62 14c18 4 32 14 32 32-6-9-17-13-32-13z" fill="#ff6a2b" stroke={ink} strokeWidth={sw} strokeLinejoin="round" />
        <path d="M68 22c9 3 16 8 19 15" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.8} />
      </g>
      <ellipse cx={46} cy={86} rx={24} ry={18} transform="rotate(-18 46 86)" fill="#ff5ca8" />
      <path d="M68 80a24 18 -18 0 1-38 20a26 20 -18 0 0 38-20z" fill="#d63b86" />
      <ellipse cx={46} cy={86} rx={24} ry={18} transform="rotate(-18 46 86)" fill="none" stroke={ink} strokeWidth={sw} />
      <ellipse cx={33} cy={77} rx={6} ry={3} transform="rotate(-30 33 77)" fill="#fff" opacity={0.85} />
      <Eyes x={38} y={86} gap={13} r={5.5} d={0.3} />
    </g>
  </Svg>
)

export const PlayBtn = (p: P) => (
  <Svg {...p} label="play">
    {[0, 1].map((d) => (
      <circle key={d} className="sk-ring" style={o(60, 60, d)} cx={60} cy={60} r={46} fill="none" stroke="#1ed760" strokeWidth={3.5} />
    ))}
    <circle cx={60} cy={63} r={46} fill="#0b7a37" stroke={ink} strokeWidth={sw} />
    <circle cx={60} cy={58} r={46} fill="#1ed760" stroke={ink} strokeWidth={sw} />
    <path d="M100 70a42 42 0 0 1-60 26" fill="none" stroke="#13a94d" strokeWidth={6} strokeLinecap="round" />
    <path d="M26 44a36 36 0 0 1 20-20" stroke="#fff" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.85} />
    <g className="sk-press" style={o(64, 58)}>
      <path d="M50 38l32 20-32 20z" fill={ink} stroke={ink} strokeWidth={6} strokeLinejoin="round" />
      <path d="M54 46l8 5" stroke="#fff" strokeWidth={2.6} strokeLinecap="round" opacity={0.7} />
    </g>
  </Svg>
)

export const Equalizer = (p: P) => (
  <Svg {...p} label="equalizador">
    <rect x={6} y={88} width={108} height={22} rx={8} fill="#2b2b31" stroke={ink} strokeWidth={sw} />
    <path d="M12 104h96" stroke="#18181c" strokeWidth={3} strokeLinecap="round" />
    {[20, 34, 48].map((x) => (
      <circle key={x} cx={x + 60} cy={99} r={2.6} fill={x === 20 ? '#1ed760' : '#55555f'} />
    ))}
    {[
      { x: 12, h: 66, c: '#1ed760', s: '#0f9d48', d: 0, t: 0.82 },
      { x: 32, h: 52, c: '#ffd731', s: '#e3ad00', d: 0.25, t: 0.64 },
      { x: 52, h: 76, c: '#ff5ca8', s: '#d63b86', d: 0.1, t: 0.9 },
      { x: 72, h: 44, c: '#a7d4ff', s: '#6fa9e6', d: 0.4, t: 0.7 },
      { x: 92, h: 60, c: '#ff6a2b', s: '#d9501a', d: 0.18, t: 0.76 },
    ].map((b) => (
      <g key={b.x} className="sk-eq" style={{ ...o(b.x + 8, 88, b.d), ['--t' as string]: `${b.t}s` }}>
        <rect x={b.x} y={88 - b.h} width={16} height={b.h} rx={4} fill={b.c} />
        <rect x={b.x + 10} y={88 - b.h + 3} width={6} height={b.h - 3} rx={3} fill={b.s} />
        <rect x={b.x} y={88 - b.h} width={16} height={b.h} rx={4} fill="none" stroke={ink} strokeWidth={2.6} />
        <path d={`M${b.x + 4.5} ${88 - b.h + 6}v${Math.min(14, b.h - 14)}`} stroke="#fff" strokeWidth={2.6} strokeLinecap="round" opacity={0.85} />
      </g>
    ))}
  </Svg>
)

export const Speaker = (p: P) => (
  <Svg {...p} label="caixa de som">
    <rect x={22} y={10} width={80} height={104} rx={13} fill="#c4441a" stroke={ink} strokeWidth={sw} />
    <rect x={18} y={8} width={80} height={104} rx={13} fill="#ff6a2b" stroke={ink} strokeWidth={sw} />
    <path d="M25 18v30" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" opacity={0.7} />
    <circle cx={58} cy={31} r={10} fill="#2b2b31" stroke={ink} strokeWidth={2.6} />
    <circle cx={55} cy={28} r={2.6} fill="#fff" />
    <g className="sk-boom" style={o(58, 76)}>
      <circle cx={58} cy={76} r={28} fill="#2b2b31" stroke={ink} strokeWidth={sw} />
      <circle cx={58} cy={76} r={20} fill="#3a3a44" stroke={ink} strokeWidth={2} />
      <circle cx={58} cy={76} r={9} fill="#ffd731" stroke={ink} strokeWidth={2.4} />
      <path d="M40 66a20 20 0 0 1 10-9" stroke="#fff" strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.5} />
      <circle cx={55} cy={73} r={2.4} fill="#fff" />
    </g>
  </Svg>
)
