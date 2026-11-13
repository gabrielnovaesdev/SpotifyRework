import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { gsap, prefersReducedMotion } from '../lib'
import { dur, ease } from '../motion'
import { moments } from '../media'
import { IconArrow } from './Icons'

const N = moments.length

/**
 * Trilho arrastável (referência #10, prova social): título de um lado, pilha de fotos do outro,
 * a seguinte cortada na borda do componente. No arraste os cartazes deslizam, o da frente
 * inclina e passa para trás; ao soltar, a pilha assenta com inércia controlada.
 * Não há depoimentos reais no projeto, então a prova são as fotos reais de shows.
 * Gesto vertical continua rolando a página (touch-action: pan-y); botões e setas fazem o mesmo.
 */
export default function Moments() {
  const cards = useRef<(HTMLLIElement | null)[]>([])
  const box = useRef<HTMLDivElement>(null)
  const pos = useRef({ v: 0 })
  const [active, setActive] = useState(0)
  const drag = useRef<{ x: number; start: number; last: number; t: number; vel: number; id: number } | null>(null)

  // Posiciona cada cartaz a partir da posição contínua da pilha
  const apply = () => {
    const w = box.current?.querySelector('li')?.offsetWidth ?? 300
    cards.current.forEach((el, i) => {
      if (!el) return
      const k = i - pos.current.v
      const behind = k < 0
      gsap.set(el, {
        x: behind ? k * w * 0.14 : k * w * 0.86,
        y: behind ? Math.abs(k) * 14 : 0,
        rotate: behind ? k * 5 : k * 1.5,
        scale: behind ? Math.max(0.7, 1 + k * 0.08) : 1,
        zIndex: 100 - Math.round(Math.abs(k) * 10) - (behind ? 50 : 0),
        autoAlpha: k < -1.6 || k > 3 ? 0 : 1,
      })
    })
  }

  const snap = (to: number) => {
    const target = gsap.utils.clamp(0, N - 1, Math.round(to))
    setActive(target)
    gsap.to(pos.current, {
      v: target,
      duration: prefersReducedMotion() ? 0 : dur.slide + 0.1,
      ease: ease.out,
      overwrite: true,
      onUpdate: apply,
    })
  }

  useEffect(() => {
    apply()
    const onResize = () => apply()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const down = (e: PointerEvent) => {
    gsap.killTweensOf(pos.current)
    drag.current = { x: e.clientX, start: pos.current.v, last: e.clientX, t: performance.now(), vel: 0, id: e.pointerId }
  }
  const move = (e: PointerEvent) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    const w = box.current?.querySelector('li')?.offsetWidth ?? 300
    const now = performance.now()
    d.vel = (e.clientX - d.last) / Math.max(1, now - d.t)
    d.last = e.clientX
    d.t = now
    // resistência nas pontas
    const raw = d.start - (e.clientX - d.x) / (w * 0.82)
    pos.current.v = raw < 0 ? raw * 0.3 : raw > N - 1 ? N - 1 + (raw - N + 1) * 0.3 : raw
    apply()
  }
  const up = () => {
    const d = drag.current
    drag.current = null
    if (!d) return
    // inércia controlada: um gesto rápido avança no máximo uma foto; um lento assenta na mais próxima
    const flick = Math.abs(d.vel) > 0.35 ? -Math.sign(d.vel) : 0
    snap(flick ? Math.round(d.start) + flick : pos.current.v)
  }

  return (
    <section id="momentos" aria-labelledby="momentos-titulo" className="panel mt-3 py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.6fr] lg:items-center">
        <div>
          <h2 id="momentos-titulo" className="display-tilt origin-left text-[clamp(4rem,8vw,8rem)]">
            Onde a música acontece
          </h2>
          <p className="mt-4 max-w-sm text-lg font-medium">Do palco do estádio ao show de bairro: é aqui que a cultura se move.</p>
          <div className="mt-7 flex items-center gap-2">
            <button type="button" className="round" onClick={() => snap(active - 1)} disabled={active === 0} aria-label="Foto anterior">
              <IconArrow className="h-4 w-4 rotate-180" />
            </button>
            <button type="button" className="round" onClick={() => snap(active + 1)} disabled={active === N - 1} aria-label="Próxima foto">
              <IconArrow className="h-4 w-4" />
            </button>
            <p className="ml-2 text-sm font-bold tabular-nums" aria-live="polite">
              {active + 1} / {N}
            </p>
          </div>
        </div>

        <div
          ref={box}
          className="relative h-[min(120vw,520px)] cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing sm:h-[520px]"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') (e.preventDefault(), snap(active + 1))
            if (e.key === 'ArrowLeft') (e.preventDefault(), snap(active - 1))
          }}
          tabIndex={0}
          role="region"
          aria-roledescription="trilho de fotos"
          aria-label="Fotos de shows. Use as setas para trocar."
        >
          <ul className="absolute inset-y-4 left-[8%] w-[min(76%,340px)]">
            {moments.map((m, i) => (
              <li
                key={m.src}
                ref={(el) => {
                  cards.current[i] = el
                }}
                className="absolute inset-0 origin-bottom will-change-transform"
                aria-hidden={i !== active || undefined}
              >
                <figure className="card relative h-full bg-ink">
                  <img src={m.src} alt={m.alt} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
                  <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-paper px-4 py-3 text-sm font-semibold leading-snug text-ink">{m.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
