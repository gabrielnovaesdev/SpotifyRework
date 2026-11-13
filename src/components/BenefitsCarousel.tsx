import { useCallback, useEffect, useRef, useState, type ComponentType, type KeyboardEvent, type PointerEvent } from 'react'
import { gsap, prefersReducedMotion, tilt } from '../lib'
import { autoplayMs, dur, ease } from '../motion'
import { IconArrow, IconDownload, IconFriends, IconNoAds, IconQuality, IconQueue, IconShuffle } from './Icons'

type Bill = { word: string; line: string; bg: string; ink: string; Icon: ComponentType<{ className?: string }> }

const bills: Bill[] = [
  { word: 'Sem anúncio', line: 'Nada entre uma faixa e outra. Só música, do começo ao fim.', bg: 'bg-pink', ink: 'text-ink', Icon: IconNoAds },
  { word: 'Offline', line: 'Baixe suas playlists e ouça no metrô, no avião ou sem sinal.', bg: 'bg-paper', ink: 'text-ink', Icon: IconDownload },
  { word: 'Na ordem que quiser', line: 'Qualquer música, de qualquer álbum, a qualquer momento.', bg: 'bg-yellow', ink: 'text-ink', Icon: IconShuffle },
  { word: 'Áudio superior', line: 'Mais detalhe e definição, até em lossless nos aparelhos compatíveis.', bg: 'bg-ink', ink: 'text-paper', Icon: IconQuality },
  { word: 'Jam', line: 'Crie uma Jam e deixe todo mundo escolher as próximas faixas.', bg: 'bg-green', ink: 'text-ink', Icon: IconFriends },
  { word: 'Sua fila', line: 'Arraste, reordene e monte a sequência perfeita para cada momento.', bg: 'bg-paper', ink: 'text-ink', Icon: IconQueue },
]
const N = bills.length
// Três cópias da lista: a do meio é a "real"; as laterais só preenchem os vizinhos cortados.
const track = [...bills, ...bills, ...bills]

/**
 * Carrossel central de benefícios (referência #7): introdução com ação, cartazes vizinhos
 * parcialmente visíveis, bullets sincronizados e avanço automático com pausa
 * (hover, foco, toque e botão). Setas do teclado, swipe e arraste com o mouse.
 */
export default function BenefitsCarousel() {
  const [index, setIndex] = useState(N) // posição na trilha (começa na cópia do meio)
  const [playing, setPlaying] = useState(true)
  const [hold, setHold] = useState(false) // pausa temporária: hover, foco ou fora da tela
  const viewport = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; dx: number; id: number } | null>(null)
  const active = ((index % N) + N) % N

  useEffect(() => {
    if (prefersReducedMotion()) setPlaying(false)
  }, [])

  // Centraliza o cartaz ativo
  const place = useCallback(
    (i: number, animate: boolean) => {
      const vp = viewport.current
      const r = rail.current
      if (!vp || !r) return
      const card = r.children[i] as HTMLElement
      const x = vp.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2)
      const instant = !animate || prefersReducedMotion()
      gsap.to(r, {
        x,
        duration: instant ? 0 : dur.slide,
        ease: ease.inOut,
        overwrite: true,
        onComplete: () => {
          // fora da cópia do meio: volta para o equivalente nela, sem animar
          if (i < N || i >= 2 * N) setIndex(((i % N) + N) % N + N)
        },
      })
    },
    [],
  )

  const first = useRef(true)
  useEffect(() => {
    place(index, !first.current)
    first.current = false
  }, [index, place])

  useEffect(() => {
    const onResize = () => place(index, false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [index, place])

  // Avanço automático
  useEffect(() => {
    if (!playing || hold) return
    const id = window.setTimeout(() => setIndex((i) => i + 1), autoplayMs)
    return () => window.clearTimeout(id)
  }, [playing, hold, index])

  // Pausa fora da tela
  useEffect(() => {
    const el = viewport.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setHold(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const go = (d: number) => setIndex((i) => i + d)
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') (e.preventDefault(), go(1))
    if (e.key === 'ArrowLeft') (e.preventDefault(), go(-1))
  }

  // Swipe / arraste horizontal; gesto vertical continua rolando a página (touch-action: pan-y)
  const down = (e: PointerEvent) => {
    drag.current = { x: e.clientX, dx: 0, id: e.pointerId }
    setHold(true)
  }
  const move = (e: PointerEvent) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    d.dx = e.clientX - d.x
    if (Math.abs(d.dx) > 6) gsap.set(rail.current, { x: `+=${e.movementX}` })
  }
  const up = () => {
    const d = drag.current
    drag.current = null
    setHold(false)
    if (!d) return
    if (Math.abs(d.dx) > 50) go(d.dx < 0 ? 1 : -1)
    else place(index, true)
  }

  return (
    <section id="beneficios" aria-labelledby="beneficios-titulo" className="wall-x py-16 lg:py-24">
      <div className="poster bg-paper px-0 py-12 sm:py-16">
        <div className="px-6 text-center sm:px-10">
          <h2 id="beneficios-titulo" className="wood mx-auto max-w-4xl text-[clamp(3rem,7vw,6rem)]">
            Seis motivos colados no muro
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-semibold">Tudo o que o Premium tira do seu caminho, e o que ele coloca no lugar.</p>
          <a href="#planos" data-frame className="tape mt-6 bg-ink text-paper" style={tilt(-1.5)}>
            Ver os planos
          </a>
        </div>

        <div
          ref={viewport}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Benefícios do Premium"
          tabIndex={0}
          onKeyDown={onKey}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
          className="mt-12 cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        >
          <div ref={rail} className="flex w-max gap-4 sm:gap-5" aria-live={playing && !hold ? 'off' : 'polite'}>
            {track.map((b, i) => {
              const real = i >= N && i < 2 * N
              const on = i === index
              return (
                <article
                  key={i}
                  role={real ? 'group' : undefined}
                  aria-roledescription={real ? 'slide' : undefined}
                  aria-label={real ? `${(i % N) + 1} de ${N}: ${b.word}` : undefined}
                  aria-hidden={!real || undefined}
                  inert={!on}
                  className={`car-card poster ${b.bg} ${b.ink} flex aspect-[4/5] w-[min(78vw,360px)] shrink-0 flex-col justify-between p-6 sm:p-8 ${on ? 'is-on' : ''}`}
                >
                  <h3 className="wood text-[clamp(2.75rem,4.4vw,4.25rem)]">{b.word}</h3>
                  <b.Icon className="car-icon h-20 w-20 self-end" />
                  <p className="text-lg font-semibold leading-snug">{b.line}</p>
                </article>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3 px-6">
          <button type="button" className="nav-toggle" onClick={() => go(-1)} aria-label="Benefício anterior">
            <IconArrow className="h-5 w-5 rotate-180" />
          </button>
          <div className="flex items-center gap-1" role="group" aria-label="Escolher benefício">
            {bills.map((b, i) => (
              <button
                key={b.word}
                type="button"
                onClick={() => setIndex(N + i)}
                aria-label={`Benefício ${i + 1}: ${b.word}`}
                aria-current={i === active || undefined}
                className="grid h-11 w-8 place-items-center"
              >
                <span className={`block h-2 rounded-full bg-ink transition-[width,opacity] duration-300 ${i === active ? 'w-7 opacity-100' : 'w-2 opacity-40'}`} />
              </button>
            ))}
          </div>
          <button type="button" className="nav-toggle" onClick={() => go(1)} aria-label="Próximo benefício">
            <IconArrow className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="nav-toggle ml-2 w-auto px-3 text-sm font-extrabold uppercase"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={!playing}
          >
            {playing ? 'Pausar' : 'Tocar'}
          </button>
        </div>
      </div>
    </section>
  )
}
