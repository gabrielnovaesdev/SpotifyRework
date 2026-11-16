import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap, SplitText, useGSAP } from '../lib'
import { ease } from '../motion'
import PhoneShot from './PhoneShot'
import Pill from './Pill'
import { Cassette, Headphones, Note } from './Stickers'

const steps: { word: string; line: string; phone: string; bg: string; tilt: string; obj: ReactNode; cta: string; href: string }[] = [
  { word: 'Navegar', line: 'Paradas, gêneros, lançamentos e playlists feitas por quem entende.', phone: 'iphone3.png', bg: 'bg-green', tilt: '-2deg', obj: <Headphones />, cta: 'Ver os benefícios', href: '#beneficios' },
  { word: 'Descobrir', line: 'Toda semana, uma mixtape nova feita com base no que você ouve.', phone: 'iphone2.png', bg: 'bg-lavender', tilt: '2deg', obj: <Note />, cta: 'Ver os momentos', href: '#momentos' },
  { word: 'Ouvir', line: 'Toque, pule e repita o que quiser, até sem internet.', phone: 'iphone1.png', bg: 'bg-yellow', tilt: '-1.5deg', obj: <Cassette />, cta: 'Escolher um plano', href: '#planos' },
]

/**
 * Blocos editoriais alternados (referência: "Your shortcut to DeFi" da slush.app): mídia
 * quadrada arredondada de um lado, título condensado grande do outro, trocando de lado a cada
 * linha. Ao entrar: o título revela por recorte, depois texto e mídia em sobreposição curta.
 */
export default function Easy() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const splits: SplitText[] = []
        gsap.utils.toArray<HTMLElement>('.ed-row').forEach((row) => {
          const s = SplitText.create(row.querySelector('.ed-title'), { type: 'lines', mask: 'lines', aria: 'auto' })
          splits.push(s)
          gsap
            .timeline({ defaults: { ease: ease.out }, scrollTrigger: { trigger: row, start: 'top 78%', once: true } })
            .from(s.lines, { yPercent: 105, duration: 0.8, stagger: 0.08 })
            .from(row.querySelectorAll('.ed-text'), { y: 24, autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 0.25)
            .from(row.querySelector('.ed-media'), { y: 60, scale: 0.94, autoAlpha: 0, duration: 0.9 }, 0.1)
        })
        return () => splits.forEach((s) => s.revert())
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="facil" aria-labelledby="facil-titulo" className="panel mt-3 py-20 sm:py-28">
      <div className="wrap">
        <h2 id="facil-titulo" className="mx-auto max-w-2xl text-center text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-tight tracking-tight">
          Seu atalho para a música. É fácil assim:
        </h2>
        <ol className="mt-16 space-y-20 lg:space-y-28">
          {steps.map((s, i) => (
            <li key={s.word} className="ed-row grid items-center gap-8 md:grid-cols-2 lg:gap-20">
              <div className={i % 2 ? 'md:order-2' : ''}>
                <h3 className="ed-title display text-[clamp(4rem,8vw,8rem)]">{s.word}</h3>
                <p className="ed-text mt-4 max-w-sm text-lg font-medium leading-snug">{s.line}</p>
                <div className="ed-text mt-6">
                  <Pill href={s.href} tone="dark" accent="yellow" size="sm">
                    {s.cta}
                  </Pill>
                </div>
              </div>
              <div className={`ed-media card relative grid aspect-square place-items-center ${s.bg}`} style={{ rotate: s.tilt }}>
                <PhoneShot file={s.phone} alt={`Tela do app: ${s.word}`} className="w-[min(44%,230px)] translate-y-[16%]" />
                <div className="pointer-events-none absolute right-[8%] top-[8%] w-[22%]">
                  <div className="loop-bob" style={{ '--dur': `${4.5 + i}s`, '--delay': `-${i}s` } as CSSProperties}>
                    {s.obj}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
