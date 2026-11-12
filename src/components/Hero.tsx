import { useEffect, useRef, useState } from 'react'
import { gsap, SplitText, useGSAP } from '../lib'
import { heroVideo, logoMask } from '../media'

const keywords = ['música', 'artistas', 'fãs', 'eventos ao vivo', 'vídeos']

/**
 * Hero no estilo da página oficial: o vídeo fica atrás de uma camada escura
 * com o logo do Spotify vazado (mask-composite: exclude). Ao rolar, o logo
 * cresce até tomar a tela e revela o vídeo inteiro; depois entra o texto
 * de apresentação palavra por palavra.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState<string | null>(null)
  const [playing, setPlaying] = useState(true)

  // Vídeo vertical no celular e horizontal no desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const pick = () => setSrc(mq.matches ? heroVideo.desktop : heroVideo.mobile)
    pick()
    mq.addEventListener('change', pick)
    return () => mq.removeEventListener('change', pick)
  }, [])

  // Palavra que troca no fim do título. Estado do React + transição CSS:
  // cada palavra sabe sozinha onde ficar, então nunca há duas no mesmo lugar.
  const [kw, setKw] = useState(0)
  const [prevKw, setPrevKw] = useState<number | null>(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => {
      setKw((i) => {
        setPrevKw(i)
        return (i + 1) % keywords.length
      })
    }, 2300)
    return () => window.clearInterval(id)
  }, [])

  const togglePlay = () => {
    const v = video.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 768px)' },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
          const mask = root.current!.querySelector<HTMLElement>('.hero-mask')!

          // Posição e tamanho iniciais do logo vazado
          const startSize = () => (desktop ? Math.min(window.innerWidth * 0.5, window.innerHeight * 0.86) : window.innerWidth * 0.82)
          const endSize = () => Math.max(window.innerWidth, window.innerHeight) * 3.4
          // Estado da máscara animado via objeto (mais confiável que tweenar variáveis CSS direto)
          const s = { size: startSize(), mx: desktop ? 92 : 50, my: desktop ? 50 : 24 }
          const apply = () => {
            mask.style.setProperty('--logo', `${s.size}px`)
            mask.style.setProperty('--mx', `${s.mx}%`)
            mask.style.setProperty('--my', `${s.my}%`)
          }
          apply()
          if (!motion) return

          const split = SplitText.create('.hero-desc-title', { type: 'words' })
          gsap.set(split.words, { opacity: 0.18 })
          gsap.set('.hero-desc', { autoAlpha: 0 })
          gsap.set('.hero-desc-sub', { autoAlpha: 0, y: 20 })

          // Entrada
          gsap.from('.hero-in', { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out', delay: 0.15 })
          gsap.from(s, { size: startSize() * 0.6, duration: 1.6, ease: 'expo.out', onUpdate: apply })

          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: '.hero-stage',
              start: 'top top',
              end: '+=230%',
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          })
          // Como na referência: o título sobe junto com a rolagem (sem sumir) enquanto o logo abre
          tl.to('.hero-copy', { yPercent: -100, duration: 1, ease: 'none' }, 0)
            .fromTo(s, { size: startSize, mx: s.mx, my: s.my }, { size: endSize, mx: 50, my: 50, duration: 1.2, ease: 'power2.in', onUpdate: apply }, 0)
            .to(mask, { opacity: 0, duration: 0.35 }, 0.85)
            .to('.hero-veil', { opacity: 1, duration: 0.5 }, 1.1)
            .to('.hero-desc', { autoAlpha: 1, duration: 0.2 }, 1.1)
            .to(split.words, { opacity: 1, stagger: 0.06, duration: 0.3 }, 1.2)
            .to('.hero-desc-sub', { autoAlpha: 1, y: 0, duration: 0.4 }, '>-0.1')
            .to({}, { duration: 0.4 })

          return () => split.revert()
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} id="topo" className="relative bg-base">
      <div className="hero-stage relative min-h-svh overflow-hidden">
        {/* Vídeo + camada escura com o logo vazado */}
        <div className="absolute inset-x-0 top-0 h-svh">
          {src && (
            <video
              ref={video}
              key={src}
              className="absolute inset-0 h-full w-full object-cover"
              src={src}
              poster={heroVideo.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
          )}
          <div className="hero-veil absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35),rgba(0,0,0,0.75))] opacity-0" />
          <div
            className="hero-mask absolute inset-0 bg-base will-change-[mask-size]"
            style={{
              maskImage: `linear-gradient(#000,#000), ${logoMask}`,
              WebkitMaskImage: `linear-gradient(#000,#000), ${logoMask}`,
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskSize: '100% 100%, var(--logo) var(--logo)',
              WebkitMaskSize: '100% 100%, var(--logo) var(--logo)',
              maskPosition: '0 0, var(--mx) var(--my)',
              WebkitMaskPosition: '0 0, var(--mx) var(--my)',
            }}
          />
        </div>

        {/* Título */}
        <div className="hero-copy container-x relative z-10 flex min-h-svh flex-col justify-end pb-14 pt-28 md:justify-center md:pb-0">
          <h1 className="hero-in text-[clamp(3.25rem,9.2vw,9.5rem)] font-black leading-[0.92] tracking-[-0.05em]">
            O lugar definitivo para
            <span className="relative block h-[1.12em] overflow-hidden">
              <span className="sr-only">{keywords.join(', ')}</span>
              {keywords.map((k, i) => {
                // ativa no lugar; a anterior sai por cima; as demais esperam embaixo, invisíveis
                const state = i === kw ? 'in' : i === prevKw ? 'out' : 'wait'
                return (
                  <span
                    key={k}
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 whitespace-nowrap italic text-white ${
                      state === 'wait' ? 'transition-none' : 'transition-[translate,opacity] duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]'
                    }`}
                    style={{
                      translate: state === 'in' ? '0 0' : state === 'out' ? '0 -110%' : '0 110%',
                      opacity: state === 'wait' ? 0 : 1,
                    }}
                  >
                    {k}
                  </span>
                )
              })}
            </span>
          </h1>

          <div className="hero-in mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#planos" className="btn btn-green">Experimente 1 mês por R$ 0</a>
            <a href="#planos" className="btn btn-outline">Ver todos os planos</a>
          </div>
          <p className="hero-in mt-6 max-w-sm text-xs leading-relaxed text-white/60">
            Apenas para o Premium Individual. R$ 0 por 1 mês, depois R$ 23,90 por mês. Oferta disponível apenas para
            quem nunca teve o Premium. Sujeito a Termos.
          </p>
        </div>

        {/* Apresentação que aparece sobre o vídeo */}
        <div className="hero-desc container-x relative z-10 flex flex-col justify-start py-24 motion-safe:invisible motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0 motion-safe:h-svh motion-safe:pb-0 motion-safe:pt-32">
          <h2 className="hero-desc-title max-w-3xl text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
            Como o centro mundial da música, o Spotify é onde fãs e artistas se encontram.
          </h2>
          <p className="hero-desc-sub mt-6 max-w-xl text-lg font-medium text-white/90 sm:text-xl">
            É o lugar pra descobrir a música perfeita pro momento. O lugar que torna a música sua trilha sonora.
          </p>
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="absolute bottom-6 right-6 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/50 text-white ring-1 ring-white/20 backdrop-blur transition hover:scale-105 hover:bg-black/70"
          aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M7 4.5v15l12.5-7.5z" /></svg>
          )}
        </button>
      </div>
    </section>
  )
}
