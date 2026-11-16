import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib'

/**
 * Duas (ou mais) fileiras em loop contínuo, em sentidos opostos (referência: "Get Slush").
 * O movimento é por JS para poder seguir o scroll: a rolagem acelera as fileiras e, ao
 * inverter a direção, cada uma muda de sentido a partir da posição atual — a velocidade
 * interpola até o novo alvo, sem tranco. Um deslocamento extra acompanha o progresso do scroll.
 * Para quando sai da tela; com movimento reduzido fica parado.
 */
export default function ScrollBands({ rows, speed = 60, className = '', gap = 12 }: { rows: ReactNode[][]; speed?: number; className?: string; gap?: number }) {
  const root = useRef<HTMLDivElement>(null)
  const tracks = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const state = tracks.current.map((t, i) => ({ t, x: 0, v: speed * (i % 2 ? 1 : -1), sign: i % 2 ? 1 : -1, half: 0 }))
    const measure = () => state.forEach((s) => (s.half = (s.t?.scrollWidth ?? 0) / 2))
    measure()
    let dir = 1
    let boost = 0
    let offset = 0
    let active = false

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (active = self.isActive),
      onUpdate: (self) => {
        dir = self.direction
        boost = Math.min(Math.abs(self.getVelocity()) / 500, 5)
        offset = (self.progress - 0.5) * 220
      },
      onRefresh: measure,
    })
    active = st.isActive

    const tick = (_t: number, dtMs: number) => {
      if (!active) return
      const dt = Math.min(dtMs, 50) / 1000
      boost *= Math.pow(0.08, dt) // a aceleração do scroll some em ~1 s
      state.forEach((s) => {
        if (!s.t || !s.half) return
        const target = speed * s.sign * dir * (1 + boost)
        s.v += (target - s.v) * Math.min(1, dt * 3.5)
        s.x = (s.x + s.v * dt) % s.half
        if (s.x > 0) s.x -= s.half
        gsap.set(s.t, { x: s.x + offset * s.sign })
      })
    }
    gsap.ticker.add(tick)
    window.addEventListener('resize', measure)
    return () => {
      gsap.ticker.remove(tick)
      st.kill()
      window.removeEventListener('resize', measure)
    }
  }, [speed])

  return (
    <div ref={root} className={className} aria-hidden="true">
      {rows.map((items, r) => (
        <div key={r} className="overflow-hidden py-1.5">
          <div
            ref={(el) => {
              tracks.current[r] = el
            }}
            className="flex w-max will-change-transform"
          >
            {[0, 1].map((half) => (
              <div key={half} className="flex shrink-0" style={{ gap, paddingRight: gap }}>
                {items.map((it, i) => (
                  <div key={i} className="shrink-0">
                    {it}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
