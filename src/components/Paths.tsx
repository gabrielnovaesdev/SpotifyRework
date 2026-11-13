import { useRef } from 'react'
import { gsap, useGSAP } from '../lib'
import { dur, gap, ease } from '../motion'
import { IconArrow } from './Icons'
import MascotMedia from './MascotMedia'

const paths = [
  { title: 'Quero ouvir', line: 'Escolha um plano e comece com 1 mês por R$ 0.', cta: 'Ver os planos', href: '#planos', bg: 'bg-yellow', frame: true },
  { title: 'Tenho dúvidas', line: 'Teste grátis, cancelamento, pagamento e planos.', cta: 'Ler as respostas', href: '#faq', bg: 'bg-pink', frame: true },
  { title: 'Sou dev', line: 'Este site é um projeto de portfólio. O código está aberto.', cta: 'Ver o código', href: 'https://github.com/gabrielnovaesdev/SpotifyRework', bg: 'bg-green', frame: false },
]

/**
 * Grade de caminhos (referência #11): cartazes de mesmo peso, título grande, ação e uma
 * microanimação de acento. Entram em sequência curta quando a grade chega na tela.
 */
export default function Paths() {
  const root = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.path-card', {
          y: 60,
          rotate: (i) => [-3, 2, -2][i],
          autoAlpha: 0,
          duration: dur.reveal,
          ease: ease.out,
          stagger: gap.item,
          scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-labelledby="caminhos-titulo" className="wall-x py-16 lg:py-24">
      <div className="poster bg-paper p-6 sm:p-10 lg:p-14">
        <h2 id="caminhos-titulo" className="wood text-center text-[clamp(3rem,7vw,6rem)]">
          Música para gente, não só para playlist
        </h2>
        <ul className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
          {paths.map((p, i) => (
            <li key={p.title} className="path-card">
              <a
                href={p.href}
                data-frame={p.frame || undefined}
                {...(p.frame ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className={`group poster ${p.bg} flex aspect-[4/5] flex-col justify-between p-6 text-ink transition-transform duration-300 ease-(--ease-paste) hover:-translate-y-0.5 sm:p-8`}
              >
                <h3 className="wood text-[clamp(3rem,5vw,4.75rem)]">{p.title}</h3>
                {i === 0 && <MascotMedia className="pointer-events-none mx-auto w-3/4 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />}
                <div>
                  <p className="text-lg font-semibold leading-snug">{p.line}</p>
                  <span className="tape mt-5 bg-ink text-base text-paper">
                    {p.cta} <IconArrow className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
