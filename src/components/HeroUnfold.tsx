import { useRef } from 'react'
import { gsap, useGSAP, tilt, img } from '../lib'
import PhoneShot from './PhoneShot'

/**
 * Continuação da primeira dobra (referência #3): um painel preto sobe sobre o muro e os dois
 * celulares, que chegam inclinados, endireitam conforme o scroll. Logo depois, a segunda
 * mensagem em linhas grandes e inclinadas, que entram de lados opostos. Tudo ligado à
 * posição do scroll, com deslocamento contido e reversível.
 */
export default function HeroUnfold() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const panel = { trigger: '.uf-panel', start: 'top bottom', end: 'center center', scrub: 0.5 }
        gsap.fromTo('.uf-panel', { scale: 0.9 }, { scale: 1, ease: 'none', scrollTrigger: panel })
        gsap.fromTo('.uf-l', { rotate: -28, yPercent: 30, xPercent: 18 }, { rotate: 0, yPercent: 0, xPercent: 0, ease: 'none', scrollTrigger: panel })
        gsap.fromTo('.uf-r', { rotate: 24, yPercent: 38, xPercent: -18 }, { rotate: 0, yPercent: 0, xPercent: 0, ease: 'none', scrollTrigger: panel })

        gsap.utils.toArray<HTMLElement>('.uf-line').forEach((line, i) => {
          gsap.fromTo(
            line,
            { xPercent: i % 2 ? 22 : -22, autoAlpha: 0.15 },
            { xPercent: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: line, start: 'top 95%', end: 'top 55%', scrub: 0.5 } },
          )
        })
        gsap.fromTo('.uf-coin', { rotate: -40, scale: 0.6 }, { rotate: 12, scale: 1, ease: 'none', scrollTrigger: { trigger: '.uf-type', start: 'top 90%', end: 'bottom 40%', scrub: 0.6 } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="app" aria-labelledby="app-titulo" className="wall-x pb-16 pt-4">
      <div className="uf-panel poster flex min-h-[min(88svh,760px)] items-center justify-center gap-[5vw] overflow-hidden bg-ink px-4 py-16">
        <PhoneShot file="iphone3.png" alt="Tela do app: navegar por gêneros e paradas" className="uf-l w-[min(38vw,330px)]" />
        <PhoneShot file="iphone1.png" alt="Tela do app: tocando uma música" className="uf-r w-[min(38vw,330px)]" />
      </div>

      <div className="uf-type relative overflow-x-clip py-16 text-center sm:py-24">
        <h2 id="app-titulo" className="wood mx-auto max-w-6xl -rotate-3 text-[clamp(2.75rem,10vw,9.5rem)] leading-[1.24]">
          <span className="uf-line block">100 milhões</span>
          <span className="uf-line block">
            de <span className="bg-ink px-[0.08em] text-pink [box-decoration-break:clone]">músicas</span>
          </span>
          <span className="uf-line mt-[0.16em] block">sem anúncio</span>
        </h2>
        <img
          src={img('mascote.webp')}
          alt=""
          aria-hidden="true"
          width={560}
          height={420}
          loading="lazy"
          className="uf-coin pointer-events-none absolute right-[4%] top-[8%] hidden w-[min(22vw,260px)] md:block"
        />
        <p className="mx-auto mt-8 max-w-md text-xl font-semibold">E mais 7 milhões de podcasts. Tudo no mesmo app, no celular ou no computador.</p>
        <a href="#planos" data-frame className="tape mt-8 bg-green text-xl text-ink" style={tilt(-1.5)}>
          Escolher meu plano
        </a>
      </div>
    </section>
  )
}
