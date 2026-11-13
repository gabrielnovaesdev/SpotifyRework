import { useRef } from 'react'
import { gsap, useGSAP, tilt } from '../lib'
import MascotMedia from './MascotMedia'
import { IconArrow } from './Icons'

/**
 * Primeira tela: o muro já colado. À esquerda, o cartaz amarelo com a oferta;
 * a tira verde é a ação principal. À direita, dois cartazes menores.
 * Ao carregar, os cartazes são colados de cima para baixo, como a broxa passando.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
        tl.from('.paste', { clipPath: 'inset(0 0 100% 0)', duration: 0.9, stagger: 0.14 })
          .from('.slap', { scale: 1.25, autoAlpha: 0, duration: 0.5, ease: 'back.out(2.2)' }, '-=0.35')
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="topo" className="wall-x grid gap-4 pb-10 pt-4 sm:gap-5 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:py-6">
      {/* Cartaz principal */}
      <div className="paste poster flex flex-col justify-between bg-yellow p-6 sm:p-10 lg:col-span-8 lg:p-12">
        <div>
          <h1 className="wood text-[clamp(5rem,12vw,11rem)] leading-[1.22]">
            Ouça
            <br />
            sem <span className="text-pink">parar</span>
          </h1>
          <p className="mt-6 max-w-xl text-xl font-bold leading-snug sm:text-2xl">
            Spotify Premium: 1 mês por R$ 0, depois R$ 21,90 por mês. Sem anúncios, offline e na ordem que você quiser.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <a href="#planos" className="slap tape whitespace-nowrap bg-green text-lg text-ink sm:text-2xl" style={tilt(-2)}>
            Começar 1 mês grátis <IconArrow className="h-5 w-5" />
          </a>
          <p className="max-w-xs text-sm leading-snug">
            Só para o Premium Individual e para quem nunca teve Premium. Sujeito a termos.
          </p>
        </div>
      </div>

      {/* Coluna da direita */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-[auto_1fr]">
        {/* O mesmo cartaz colado em série, como no muro de verdade */}
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              aria-hidden={i > 0 || undefined}
              className="paste poster flex aspect-[3/4] flex-col justify-between bg-pink p-3 text-ink sm:p-4"
              style={{ rotate: `${[-1, 0.6, -0.4][i]}deg` }}
            >
              <p className="wood text-[clamp(1.6rem,2.3vw,2.4rem)] leading-[1.28]">
                Sem
                <br />
                anún&shy;cio
              </p>
              <p className="text-xs font-bold uppercase leading-tight sm:text-sm">Premium · 1 mês R$ 0</p>
            </div>
          ))}
        </div>
        <div className="paste poster flex min-h-[300px] flex-col bg-ink p-6 text-paper sm:p-8">
          <p className="wood text-[clamp(3.5rem,6vw,6rem)] text-green">Toca tudo</p>
          <MascotMedia className="m-auto w-[min(100%,420px)]" />
        </div>
      </div>
    </section>
  )
}
