import { useRef, type PointerEvent } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib'
import { RevealHeading } from './Reveal'
import { IconDownload, IconFriends, IconNoAds, IconQuality, IconQueue, IconShuffle } from './Icons'

const items = [
  { Icon: IconNoAds, title: 'Ouça músicas sem anúncios', text: 'Nada de interrupções entre uma faixa e outra. Só música, do começo ao fim.' },
  { Icon: IconDownload, title: 'Baixe e ouça offline', text: 'Salve suas playlists e escute no avião, no metrô ou onde não tiver sinal.' },
  { Icon: IconShuffle, title: 'Ouça na ordem que quiser', text: 'Escolha qualquer música, de qualquer álbum, a qualquer momento.' },
  { Icon: IconQuality, title: 'Qualidade de áudio superior', text: 'Som com mais detalhe e definição, até em lossless nos dispositivos compatíveis.' },
  { Icon: IconFriends, title: 'Ouça com amigos em tempo real', text: 'Crie uma Jam e deixe todo mundo escolher as próximas faixas juntos.' },
  { Icon: IconQueue, title: 'Organize a fila de músicas', text: 'Arraste, reordene e monte a sequência perfeita para cada momento.' },
]

function onSpot(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

export default function Benefits() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.benefit', { y: 60, autoAlpha: 0 })
        ScrollTrigger.batch('.benefit', {
          start: 'top 90%',
          onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="beneficios" className="container-x py-20 sm:py-28">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-green">Por que o Premium?</p>
        <RevealHeading className="mt-4 text-[clamp(2.25rem,5.5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.045em]">
          Benefícios de todos os planos Premium
        </RevealHeading>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ Icon, title, text }) => (
          <li
            key={title}
            onPointerMove={onSpot}
            className="benefit group relative overflow-hidden rounded-2xl bg-elevated p-7 ring-1 ring-white/5 transition-colors duration-500 hover:bg-highlight sm:p-8"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: 'radial-gradient(420px circle at var(--x) var(--y), rgba(30,215,96,0.16), transparent 45%)' }}
            />
            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-white/5 text-green transition-transform duration-500 ease-(--ease-spring) group-hover:scale-110 group-hover:-rotate-6">
                <Icon />
              </span>
              <h3 className="mt-8 text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-subdued">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
