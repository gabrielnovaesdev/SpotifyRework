import { useRef, type CSSProperties } from 'react'
import { gsap, ScrollTrigger, useGSAP, img, tilt } from '../lib'

/**
 * Faixas de CTA em sentidos opostos (referência #8): duas linhas de cartazes grandes andam
 * em direções contrárias sobre uma faixa preta de largura total; a velocidade cresce com o
 * scroll e volta ao ritmo base. O mascote passa em primeiro plano com parallax.
 * As repetições são decorativas; o CTA acessível é a fita fixa no centro.
 */
const rowA = ['Ouça sem parar', '1 mês por R$ 0', 'Sem anúncio', 'Ouça sem parar', '1 mês por R$ 0', 'Sem anúncio']
const rowB = ['Comece grátis', 'Offline', 'Na ordem que quiser', 'Comece grátis', 'Offline', 'Na ordem que quiser']
const tones = ['bg-yellow text-ink', 'bg-pink text-ink', 'bg-green text-ink', 'bg-paper text-ink']

function Band({ words, dir, offset }: { words: string[]; dir: 'normal' | 'reverse'; offset: number }) {
  return (
    <div className="cta-band overflow-hidden py-1" aria-hidden="true">
      <div className="marquee flex w-max" style={{ '--marquee-dur': '30s', '--marquee-dir': dir } as CSSProperties}>
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 gap-3 pr-3">
            {words.map((w, i) => (
              <span
                key={i}
                className={`poster wood shrink-0 px-6 py-2 text-[clamp(3rem,8vw,7.5rem)] leading-[1.15] ${tones[(i + offset) % tones.length]}`}
                style={{ rotate: `${i % 2 ? 1 : -1}deg` }}
              >
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CtaBands() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tracks = gsap.utils.toArray<HTMLElement>('.cta-band .marquee')
        // A velocidade do scroll acelera as faixas e depois elas voltam ao ritmo base
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 4)
            tracks.forEach((t) => t.getAnimations().forEach((a) => (a.playbackRate = boost)))
          },
          onToggle: (self) => root.current?.classList.toggle('is-offscreen', !self.isActive),
        })
        const settle = gsap.ticker.add(() => {
          tracks.forEach((t) =>
            t.getAnimations().forEach((a) => {
              a.playbackRate += (1 - a.playbackRate) * 0.06
            }),
          )
        })
        gsap.fromTo('.cta-mascot', { yPercent: 50, rotate: -10 }, { yPercent: -40, rotate: 8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 } })
        return () => {
          st.kill()
          gsap.ticker.remove(settle as unknown as gsap.TickerCallback)
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label="Comece agora" className="relative overflow-hidden bg-ink py-14 sm:py-20">
      <div className="-rotate-2 space-y-3">
        <Band words={rowA} dir="normal" offset={0} />
        <Band words={rowB} dir="reverse" offset={2} />
      </div>
      <img
        src={img('mascote.webp')}
        alt=""
        aria-hidden="true"
        width={560}
        height={420}
        loading="lazy"
        className="cta-mascot pointer-events-none absolute right-[6%] top-1/2 z-10 w-[min(34vw,320px)] -translate-y-1/2"
      />
      <div className="relative z-20 mt-10 flex justify-center">
        <a href="#planos" data-frame className="tape bg-yellow text-xl text-ink" style={tilt(-2)}>
          Começar 1 mês grátis
        </a>
      </div>
    </section>
  )
}
