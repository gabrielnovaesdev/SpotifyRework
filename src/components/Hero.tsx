import { useRef } from 'react'
import { gsap, SplitText, useGSAP, img } from '../lib'
import { IconArrow } from './Icons'

const covers = [
  { src: 'img1.jpg', cls: 'left-[-6%] top-[8%] w-[38%] [--r:-10deg]', depth: 1.4 },
  { src: 'img2.jpg', cls: 'right-[-4%] top-[2%] w-[30%] [--r:8deg]', depth: 0.8 },
  { src: 'img3.jpg', cls: 'left-[-2%] bottom-[6%] w-[30%] [--r:6deg]', depth: 1.1 },
  { src: 'img4.jpg', cls: 'right-[-8%] bottom-[14%] w-[36%] [--r:-6deg]', depth: 1.6 },
]

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1024px)' },
        (ctx) => {
          const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
          if (!motion) return

          // Entrada: título letra a letra com máscara
          const split = SplitText.create('.hero-title', { type: 'lines,chars', mask: 'lines' })
          const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
          tl.from('.hero-badge', { y: 20, autoAlpha: 0, duration: 0.8 })
            .from(split.chars, { yPercent: 110, rotate: 6, duration: 1.1, stagger: 0.025 }, '<0.1')
            .from('.hero-fade', { y: 30, autoAlpha: 0, duration: 1, stagger: 0.08 }, '<0.4')
            .from('.hero-phone', { y: 120, rotate: 8, autoAlpha: 0, duration: 1.4 }, 0.3)
            .from('.hero-cover', { scale: 0.4, autoAlpha: 0, duration: 1.2, stagger: 0.08, ease: 'back.out(1.6)' }, 0.6)

          // Saída com scroll (scrub): conteúdo sobe e some, phone dá zoom
          const out = gsap.timeline({
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          })
          out.to('.hero-copy', { yPercent: -30, autoAlpha: 0, ease: 'none' }, 0)
            .to('.hero-phone', { yPercent: desktop ? 18 : 8, scale: 0.92, ease: 'none' }, 0)
            .to('.hero-blob', { yPercent: 40, ease: 'none' }, 0)
          gsap.utils.toArray<HTMLElement>('.hero-cover').forEach((el) => {
            out.to(el, { yPercent: -60 * Number(el.dataset.depth), ease: 'none' }, 0)
          })

          // Parallax com o mouse (apenas desktop)
          if (desktop) {
            const items = gsap.utils.toArray<HTMLElement>('.hero-cover-inner')
            const setters = items.map((el) => ({
              x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' }),
              y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' }),
              d: Number(el.dataset.depth),
            }))
            const onMove = (e: PointerEvent) => {
              const nx = e.clientX / window.innerWidth - 0.5
              const ny = e.clientY / window.innerHeight - 0.5
              setters.forEach((s) => {
                s.x(nx * 40 * s.d)
                s.y(ny * 40 * s.d)
              })
            }
            window.addEventListener('pointermove', onMove)
            return () => {
              window.removeEventListener('pointermove', onMove)
              split.revert()
            }
          }
          return () => split.revert()
        },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} id="topo" className="relative isolate min-h-svh overflow-hidden pt-28 pb-16 lg:pt-36">
      {/* Fundo */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#0f3d22_0%,#121212_85%)]" />
      <div className="hero-blob pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -left-[10%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full bg-green/40 blur-[120px]" />
        <div className="animate-blob absolute right-[-15%] top-[10%] h-[45vmax] w-[45vmax] rounded-full bg-[#7c26f8]/35 blur-[120px] [animation-delay:-6s]" />
        <div className="animate-blob absolute bottom-[-20%] left-[30%] h-[40vmax] w-[40vmax] rounded-full bg-[#ff4169]/20 blur-[120px] [animation-delay:-12s]" />
      </div>
      <div className="noise pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: `url(${img('ruido.png')})` }} />

      <div className="container-x grid items-center gap-14 lg:min-h-[calc(100svh-12rem)] lg:grid-cols-[1.15fr_1fr]">
        <div className="hero-copy text-center lg:text-left">
          <span className="hero-badge inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold ring-1 ring-white/15 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            Oferta por tempo limitado
          </span>

          <h1 className="hero-title mt-6 text-[clamp(3.25rem,9vw,8.5rem)] font-black leading-[0.9] tracking-[-0.055em]">
            Escute sem limites
          </h1>

          <p className="hero-fade mx-auto mt-7 max-w-xl text-lg font-medium text-white/85 sm:text-xl lg:mx-0">
            <strong className="text-white">R$ 0 por 1 mês</strong> de Premium Individual. Cancele quando quiser.
          </p>

          <div className="hero-fade mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#planos" className="btn btn-light w-full sm:w-auto">
              Experimente 1 mês por R$ 0
            </a>
            <a href="#planos" className="btn btn-outline group w-full sm:w-auto">
              Ver todos os planos
              <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <p className="hero-fade mx-auto mt-6 max-w-md text-xs leading-relaxed text-white/55 lg:mx-0">
            Somente Premium Individual. R$ 0 por 1 mês, depois R$ 21,90/mês. Oferta disponível apenas para quem nunca
            assinou o Premium. Sujeito a termos.
          </p>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px]">
          {covers.map((c) => (
            <div key={c.src} data-depth={c.depth} className={`hero-cover absolute z-0 ${c.cls}`}>
              <div data-depth={c.depth} className="hero-cover-inner">
                <img
                  src={img(c.src)}
                  alt=""
                  className="animate-float aspect-square w-full rounded-xl object-cover shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]"
                  style={{ animationDelay: `${c.depth * -2}s` }}
                />
              </div>
            </div>
          ))}
          <div className="hero-phone absolute inset-0 z-10 flex items-center justify-center">
            <img
              src={img('iphone2.png')}
              alt="App do Spotify aberto na playlist Descobertas da Semana"
              className="h-full w-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="hero-copy pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50 lg:flex">
        Role
        <span className="relative h-10 w-px overflow-hidden bg-white/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-white" />
        </span>
      </div>
    </section>
  )
}
