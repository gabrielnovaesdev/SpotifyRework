import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../lib'
import Pill from './Pill'
import { IconArrow } from './Icons'
import { Cassette, Headphones, Mic, Note, PlayBtn, Vinyl } from './Stickers'

type Bill = { word: string; line: string; bg: string; obj: ReactNode }
const bills: Bill[] = [
  { word: 'Sem anúncio', line: 'Nada entre uma faixa e outra.', bg: 'bg-green', obj: <PlayBtn /> },
  { word: 'Baixe e ouça offline', line: 'No metrô, no avião ou sem sinal.', bg: 'bg-yellow', obj: <Cassette /> },
  { word: 'Na ordem que quiser', line: 'Qualquer música, a qualquer hora.', bg: 'bg-sky', obj: <Note /> },
  { word: 'Áudio superior', line: 'Até em lossless nos aparelhos compatíveis.', bg: 'bg-lavender', obj: <Headphones /> },
  { word: 'Ouça numa Jam', line: 'Todo mundo escolhe a próxima.', bg: 'bg-pink', obj: <Mic /> },
  { word: 'Monte sua fila', line: 'Arraste e reordene do seu jeito.', bg: 'bg-orange', obj: <Vinyl /> },
]
const N = bills.length
const AUTOPLAY = 4500 // 4–5 s, como na referência

/** distância circular de i até p, em (-N/2, N/2] */
const wrapD = (d: number) => {
  const m = (((d + N / 2) % N) + N) % N
  return m - N / 2
}

/**
 * Carrossel central infinito (referência: "Earn, swap, and explore" da slush.app).
 * Uma posição contínua `p` (em cartões) move todos os cartões; cada um se coloca pela
 * distância circular até `p`, então o último e o primeiro passam um pelo outro sem salto
 * nem lacuna, por quantas voltas o arraste quiser. Soltar aplica inércia e assenta no
 * cartão mais próximo. Avança sozinho a cada 4,5 s, pausando com hover, foco, toque,
 * fora da tela e pelo botão.
 */
export default function BenefitsCarousel() {
  const vp = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLLIElement | null)[]>([])
  const pos = useRef({ p: 0 })
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hold, setHold] = useState(false)
  const drag = useRef<{ x: number; start: number; lastX: number; lastT: number; v: number; moved: boolean; id: number } | null>(null)

  const layout = () => {
    const el = vp.current
    if (!el) return
    const first = cards.current[0]
    const w = first?.offsetWidth ?? 360
    const step = w + (window.innerWidth < 640 ? 12 : 20)
    const cx = el.clientWidth / 2 - w / 2
    cards.current.forEach((c, i) => {
      if (!c) return
      const d = wrapD(i - pos.current.p)
      gsap.set(c, { x: cx + d * step, rotate: d * 1.5, zIndex: 10 - Math.round(Math.abs(d)) })
    })
    const a = ((Math.round(pos.current.p) % N) + N) % N
    setActive((prev) => (prev === a ? prev : a))
  }

  const goTo = (target: number, duration = 0.75) => {
    gsap.to(pos.current, {
      p: target,
      duration: prefersReducedMotion() ? 0 : duration,
      ease: 'power3.out',
      overwrite: true,
      onUpdate: layout,
    })
  }
  const step = (d: number) => goTo(Math.round(pos.current.p) + d)

  useEffect(() => {
    layout()
    if (prefersReducedMotion()) setPlaying(false)
    window.addEventListener('resize', layout)
    return () => window.removeEventListener('resize', layout)
  }, [])

  useEffect(() => {
    if (!playing || hold) return
    const id = window.setInterval(() => step(1), AUTOPLAY)
    return () => window.clearInterval(id)
  }, [playing, hold])

  useEffect(() => {
    const el = vp.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setHold(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const down = (e: PointerEvent) => {
    gsap.killTweensOf(pos.current)
    drag.current = { x: e.clientX, start: pos.current.p, lastX: e.clientX, lastT: performance.now(), v: 0, moved: false, id: e.pointerId }
    setHold(true)
  }
  const move = (e: PointerEvent) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const w = (cards.current[0]?.offsetWidth ?? 360) + 20
    const now = performance.now()
    const inst = (e.clientX - d.lastX) / Math.max(1, now - d.lastT)
    d.v = d.v * 0.6 + inst * 0.4 // px/ms suavizado
    d.lastX = e.clientX
    d.lastT = now
    if (Math.abs(e.clientX - d.x) > 4) d.moved = true
    pos.current.p = d.start - (e.clientX - d.x) / w
    layout()
  }
  const up = () => {
    const d = drag.current
    drag.current = null
    setHold(false)
    if (!d) return
    const w = (cards.current[0]?.offsetWidth ?? 360) + 20
    // inércia: a velocidade projeta a posição ~300 ms à frente, depois assenta num cartão
    const projected = pos.current.p - (d.v * 300) / w
    goTo(Math.round(projected), 0.9)
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') (e.preventDefault(), step(1))
    if (e.key === 'ArrowLeft') (e.preventDefault(), step(-1))
  }

  return (
    <section id="beneficios" aria-labelledby="beneficios-titulo" className="panel mt-3 py-20 sm:py-28">
      <div className="wrap text-center">
        <h2 id="beneficios-titulo" className="mx-auto max-w-3xl text-[clamp(1.9rem,3.4vw,3.25rem)] font-semibold leading-[1.1] tracking-tight">
          Ouça, descubra e monte sua trilha sonora, sem nada no caminho
        </h2>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Pill href="#planos" data-frame tone="light" accent="green" size="sm">
            Ver os planos
          </Pill>
          <Pill href="https://www.spotify.com/br-pt/download/" target="_blank" rel="noopener noreferrer" tone="light" accent="yellow" size="sm">
            Baixar o app
          </Pill>
        </div>
      </div>

      <div
        ref={vp}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Benefícios do Premium"
        tabIndex={0}
        onKeyDown={onKey}
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        className="relative mt-14 h-[min(108vw,440px)] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing sm:h-[440px]"
      >
        <ul>
          {bills.map((b, i) => (
            <li
              key={b.word}
              ref={(el) => {
                cards.current[i] = el
              }}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${N}: ${b.word}`}
              aria-hidden={i !== active || undefined}
              className={`card absolute left-0 top-0 flex h-full w-[min(80vw,400px)] flex-col justify-between p-7 will-change-transform ${b.bg}`}
            >
              <h3 className="display-tilt origin-left text-[clamp(3rem,5vw,4.5rem)] text-ink">{b.word}</h3>
              <div className="flex items-end justify-between gap-4">
                <p className="max-w-[60%] text-base font-semibold leading-snug">{b.line}</p>
                <div className="w-[34%]">
                  <div className="loop-bob" style={{ '--dur': `${4 + (i % 3)}s`, '--delay': `-${i * 0.7}s` } as CSSProperties}>
                    {b.obj}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 px-5">
        <button type="button" className="round" onClick={() => step(-1)} aria-label="Benefício anterior">
          <IconArrow className="h-4 w-4 rotate-180" />
        </button>
        <div className="flex items-center" role="group" aria-label="Escolher benefício">
          {bills.map((b, i) => (
            <button
              key={b.word}
              type="button"
              onClick={() => goTo(Math.round(pos.current.p) + ((((i - active) % N) + N + N / 2) % N) - N / 2)}
              aria-label={`Benefício ${i + 1}: ${b.word}`}
              aria-current={i === active || undefined}
              className="grid h-11 w-7 place-items-center"
            >
              <span className={`block h-2 rounded-full bg-ink transition-[width,opacity] duration-300 ${i === active ? 'w-6' : 'w-2 opacity-30'}`} />
            </button>
          ))}
        </div>
        <button type="button" className="round" onClick={() => step(1)} aria-label="Próximo benefício">
          <IconArrow className="h-4 w-4" />
        </button>
        <button type="button" className="nav-pill ml-2" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
          {playing ? 'Pausar' : 'Tocar'}
        </button>
      </div>
    </section>
  )
}
