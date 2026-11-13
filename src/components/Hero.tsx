import { useRef } from 'react'
import { gsap, SplitText, useGSAP, tilt } from '../lib'
import { dur, gap, ease } from '../motion'
import MascotMedia from './MascotMedia'
import { IconArrow } from './Icons'

/**
 * Primeira dobra em camadas (referência: entrada do hero da slush.app, docs/motion-map.md #2/#3).
 * - Entrada: o título aparece em fatias, letra a letra, de cima e de baixo alternadamente;
 *   os cartazes em série e o mascote pulam escalonados; a linha de preço entra por palavras.
 *   A fita de ação nunca some: só assenta, então fica legível e clicável desde o primeiro frame.
 * - Parallax: o título sobe mais rápido que o cartaz; cada plano tem sua velocidade.
 * Entrada e parallax vivem em elementos diferentes para um não sobrescrever o outro.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', (ctx) => {
        let title: SplitText | undefined
        let lead: SplitText | undefined
        // O recorte por letra precisa da fonte final (Anton); até ela chegar, título e frase
        // ficam ocultos, com teto de 1,2 s para nunca segurar a leitura.
        gsap.set(['.h-title', '.h-lead'], { autoAlpha: 0 })
        gsap.set('.h-pop', { autoAlpha: 0 })
        let started = false
        const run = () => {
          gsap.set(['.h-title', '.h-lead'], { autoAlpha: 1 })
          title = SplitText.create('.h-title', { type: 'chars', mask: 'chars', aria: 'auto' })
          lead = SplitText.create('.h-lead', { type: 'words', aria: 'auto' })
          const tl = gsap.timeline({ defaults: { ease: ease.out } })
          tl.from(title.chars, {
            yPercent: (i) => (i % 2 ? -105 : 105),
            duration: 0.95,
            stagger: { each: 0.045, from: 'random' },
          })
            .fromTo('.h-pop', { scale: 0.4, rotate: (i) => (i % 2 ? 14 : -14), autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.7, ease: ease.back, stagger: gap.item + 0.02 }, 0.3)
            .from(lead.words, { yPercent: 60, autoAlpha: 0, duration: dur.reveal, stagger: gap.word * 0.4 }, 0.55)
            .from('.h-cta', { scale: 0.86, rotate: -6, duration: 0.6, ease: ease.back }, 0.5)
            .from('.h-small', { autoAlpha: 0, duration: 0.5 }, 0.9)
        }
        const start = () => {
          if (started) return
          started = true
          ctx.add(run)
        }
        document.fonts.load('400 1em Anton').then(() => start())
        const fallback = window.setTimeout(() => start(), 1200)

        // Planos com velocidades diferentes ao rolar (reversível)
        const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.4 }
        gsap.to('.px-title', { y: -160, ease: 'none', scrollTrigger: st })
        gsap.to('.px-lead', { y: -90, ease: 'none', scrollTrigger: st })
        gsap.to('.px-bills', { y: -40, ease: 'none', scrollTrigger: st })
        gsap.to('.px-mascot', { y: 60, ease: 'none', scrollTrigger: st })

        return () => {
          window.clearTimeout(fallback)
          title?.revert()
          lead?.revert()
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="topo" className="wall-x grid gap-4 pb-10 pt-2 sm:gap-5 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-12 lg:pb-6">
      {/* Cartaz principal: a arte fica, o texto sobe mais rápido */}
      <div className="poster flex flex-col justify-between overflow-hidden bg-yellow p-6 sm:p-10 lg:col-span-8 lg:p-12">
        <div>
          <div className="px-title">
            <h1 className="h-title wood text-[clamp(5rem,12vw,11rem)] leading-[1.22]">
              Ouça
              <br />
              sem <span className="bg-ink px-[0.08em] text-pink [box-decoration-break:clone]">parar</span>
            </h1>
          </div>
          <p className="px-lead h-lead mt-6 max-w-xl text-xl font-bold leading-snug sm:text-2xl">
            Spotify Premium: 1 mês por R$ 0, depois R$ 21,90 por mês. Sem anúncios, offline e na ordem que você quiser.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <a href="#planos" data-frame className="h-cta tape whitespace-nowrap bg-green text-lg text-ink sm:text-2xl" style={tilt(-2)}>
            Começar 1 mês grátis <IconArrow className="h-5 w-5" />
          </a>
          <p className="h-small max-w-xs text-sm leading-snug">
            Só para o Premium Individual e para quem nunca teve Premium. Sujeito a termos.
          </p>
        </div>
      </div>

      {/* Coluna da direita: cartazes em série e o mascote, cada um num plano */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-4 lg:grid-cols-1 lg:grid-rows-[auto_1fr]">
        <div className="px-bills grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} aria-hidden={i > 0 || undefined} style={{ rotate: `${[-1, 0.6, -0.4][i]}deg` }}>
              <div className="h-pop poster flex aspect-[3/4] flex-col justify-between bg-pink p-3 text-ink sm:p-4">
                <p className="wood text-[clamp(1.6rem,2.3vw,2.4rem)] leading-[1.28]">
                  Sem
                  <br />
                  anún&shy;cio
                </p>
                <p className="text-xs font-bold uppercase leading-tight sm:text-sm">Premium · 1 mês R$ 0</p>
              </div>
            </div>
          ))}
        </div>
        <div className="h-pop poster flex min-h-[300px] flex-col bg-ink p-6 text-paper sm:p-8">
          <p className="wood text-[clamp(3.5rem,6vw,6rem)] text-green">Toca tudo</p>
          <div className="px-mascot m-auto w-[min(100%,420px)]">
            <MascotMedia />
          </div>
        </div>
      </div>
    </section>
  )
}
