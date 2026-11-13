import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib'
import ScrollBands from './ScrollBands'
import Pill from './Pill'
import { Logo } from './Icons'
import { Headphones, Note, PlayBtn, Vinyl } from './Stickers'

const tones = ['bg-green', 'bg-paper', 'bg-pink', 'bg-yellow', 'bg-lavender', 'bg-sky']
const card = (label: string, i: number): ReactNode => (
  <div className={`card flex h-[clamp(84px,11vw,150px)] items-center gap-4 px-6 sm:px-8 ${tones[i % tones.length]}`}>
    <span className="display-tilt whitespace-nowrap text-[clamp(3rem,7vw,6.5rem)] leading-none text-ink">{label}</span>
    {i % 2 === 0 && <Logo className="h-[clamp(36px,4.5vw,64px)] shrink-0 text-ink" />}
  </div>
)
const rowA = Array.from({ length: 6 }, (_, i) => card(i % 2 ? 'Ouça sem parar' : 'Comece grátis', i))
const rowB = Array.from({ length: 6 }, (_, i) => card(i % 2 ? '1 mês por R$ 0' : 'Spotify Premium', i + 3))

/**
 * Bloco preto de CTA (referência: "Get Slush"): duas fileiras de cartões retangulares em
 * sentidos opostos, ligadas ao scroll, e objetos musicais em primeiro plano com parallax e
 * loop próprio. A ação acessível é a cápsula fixa abaixo; as fileiras são decorativas.
 */
export default function CtaBands() {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.cb-obj').forEach((o, i) => {
          gsap.fromTo(o, { y: 120 + i * 30 }, { y: -120 - i * 40, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.5 } })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label="Comece agora" className="relative mt-3 overflow-hidden bg-night py-16 sm:py-24">
      <div className="-rotate-[4deg] scale-[1.06]">
        <ScrollBands rows={[rowA, rowB]} speed={70} />
      </div>
      {[
        { el: <Headphones />, cls: 'left-[6%] top-[8%] w-[clamp(70px,10vw,150px)]', d: '5s' },
        { el: <PlayBtn />, cls: 'right-[8%] top-[18%] w-[clamp(60px,8vw,120px)]', d: '4.4s' },
        { el: <Vinyl />, cls: 'left-[38%] bottom-[2%] w-[clamp(70px,9vw,140px)]', d: '7s' },
        { el: <Note />, cls: 'right-[24%] bottom-[10%] hidden w-[clamp(50px,6vw,100px)] md:block', d: '5.6s' },
      ].map((o, i) => (
        <div key={i} className={`cb-obj pointer-events-none absolute z-10 ${o.cls}`}>
          <div className="loop-bob" style={{ '--dur': o.d, '--delay': `-${i * 1.3}s` } as CSSProperties}>
            {o.el}
          </div>
        </div>
      ))}
      <div className="relative z-20 mt-10 flex justify-center">
        <Pill href="#planos" data-frame tone="green" accent="yellow" size="lg">
          Começar 1 mês grátis
        </Pill>
      </div>
    </section>
  )
}
