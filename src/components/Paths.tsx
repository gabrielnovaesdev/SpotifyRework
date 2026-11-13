import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib'
import Pill from './Pill'
import { IconArrow } from './Icons'
import { Headphones, Mic, PlayBtn } from './Stickers'

const paths: { title: string; line: string; cta: string; href: string; bg: string; frame: boolean; obj: ReactNode; accent: 'green' | 'pink' | 'yellow' }[] = [
  { title: 'Para quem quer só ouvir', line: 'Escolha um plano e comece com 1 mês por R$ 0.', cta: 'Ver os planos', href: '#planos', bg: 'bg-yellow', frame: true, obj: <Headphones />, accent: 'green' },
  { title: 'Para quem tem dúvidas', line: 'Teste grátis, cancelamento, pagamento e planos.', cta: 'Ler as respostas', href: '#faq', bg: 'bg-lavender', frame: true, obj: <Mic />, accent: 'yellow' },
  { title: 'Para quem é dev', line: 'Este site é um projeto de portfólio. O código está aberto.', cta: 'Ver o código', href: 'https://github.com/gabrielnovaesdev/SpotifyRework', bg: 'bg-sky', frame: false, obj: <PlayBtn />, accent: 'pink' },
]

/**
 * Grade de caminhos (referência: "Crypto for humans. Not just degens."): três cartões de mesmo
 * peso, título condensado inclinado, ação e um objeto em loop. Entram em sequência curta.
 */
export default function Paths() {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.path-card', { y: 80, rotate: (i) => [-4, 3, -3][i], autoAlpha: 0, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.08, scrollTrigger: { trigger: root.current, start: 'top 72%', once: true } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="caminhos-titulo" className="panel mt-3 py-20 sm:py-28">
      <div className="wrap">
        <h2 id="caminhos-titulo" className="mx-auto max-w-2xl text-center text-[clamp(1.9rem,3.4vw,3.25rem)] font-semibold leading-tight tracking-tight">
          Música para gente. Não só para playlist.
        </h2>
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {paths.map((p, i) => (
            <li key={p.title} className={`path-card card flex aspect-[4/5] flex-col justify-between p-7 ${p.bg}`}>
              <h3 className="display-tilt origin-left text-[clamp(2.75rem,4.4vw,4.25rem)]">{p.title}</h3>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="max-w-[16rem] text-base font-semibold leading-snug">{p.line}</p>
                  <div className="mt-5">
                    <Pill
                      href={p.href}
                      {...(p.frame ? { 'data-frame': '' } : { target: '_blank', rel: 'noopener noreferrer' })}
                      tone="dark"
                      accent={p.accent}
                      size="sm"
                      icon={<IconArrow className="h-3.5 w-3.5" />}
                    >
                      {p.cta}
                    </Pill>
                  </div>
                </div>
                <div className="w-[30%] shrink-0">
                  <div className="loop-bob" style={{ '--dur': `${4.4 + i * 0.8}s`, '--delay': `-${i}s` } as CSSProperties}>
                    {p.obj}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
