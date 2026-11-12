import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib'
import { LOGO_PATH } from '../media'

/**
 * "O mundo está ouvindo aqui." — logo do Spotify em neon roxo feito em SVG
 * (no original é um vídeo). A luz percorre a borda, o logo sobe e cresce com
 * o scroll e o título entra por cima da parte de baixo do logo.
 */
export default function Spotlight() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Brilho girando pela borda
        gsap.to('.sp-sweep', { rotate: 360, duration: 9, ease: 'none', repeat: -1, svgOrigin: '84 84' })
        gsap.to('.sp-pulse', { opacity: 0.55, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 })

        gsap.fromTo(
          '.sp-logo',
          { scale: 0.7, yPercent: 18, rotate: -8, autoAlpha: 0.2 },
          {
            scale: 1,
            yPercent: 0,
            rotate: 0,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'center center', scrub: 1 },
          },
        )
        const split = SplitText.create('.sp-title', { type: 'chars,words', mask: 'words' })
        const tl = gsap.timeline({ scrollTrigger: { trigger: '.sp-title', start: 'top 80%' } })
        tl.from(split.chars, { yPercent: 110, duration: 1, stagger: 0.02, ease: 'expo.out' }).from(
          '.sp-sub',
          { y: 20, autoAlpha: 0, duration: 0.8, ease: 'expo.out' },
          '-=0.6',
        )
        return () => split.revert()
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label="O mundo está ouvindo aqui" className="relative overflow-hidden bg-base pb-12 pt-24 sm:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-[38%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7b2cff] opacity-25 blur-[140px]" />

      <div className="container-x relative flex flex-col items-center text-center">
        <svg viewBox="-12 -12 192 192" className="sp-logo w-[min(86vw,640px)] overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id="sp-fill" cx="50%" cy="35%" r="70%">
              <stop offset="0" stopColor="#2a1450" />
              <stop offset="0.6" stopColor="#120726" />
              <stop offset="1" stopColor="#07030f" />
            </radialGradient>
            <linearGradient id="sp-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f3e8ff" />
              <stop offset="0.35" stopColor="#b57bff" />
              <stop offset="1" stopColor="#5b1fd1" />
            </linearGradient>
            <filter id="sp-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.2" result="b1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="b2" />
              <feMerge>
                <feMergeNode in="b1" />
                <feMergeNode in="b1" />
                <feMergeNode in="b2" />
              </feMerge>
            </filter>
            <mask id="sp-sweep-mask">
              <path d={LOGO_PATH} fill="none" stroke="#fff" strokeWidth="3" />
            </mask>
          </defs>

          {/* Corpo escuro com volume */}
          <path d={LOGO_PATH} fill="url(#sp-fill)" />
          {/* Borda neon (circulo + barras) */}
          <path className="sp-pulse" d={LOGO_PATH} fill="none" stroke="url(#sp-edge)" strokeWidth="1.6" filter="url(#sp-glow)" opacity="0.9" />
          {/* Luz que gira pela borda */}
          <g mask="url(#sp-sweep-mask)" filter="url(#sp-glow)">
            <g className="sp-sweep">
              <path d="M84 84 L84 -40 A124 124 0 0 1 190 30 Z" fill="#fff" opacity="0.9" />
            </g>
          </g>
        </svg>

        <h2 className="sp-title relative -mt-[clamp(4rem,12vw,9rem)] text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.95] tracking-[-0.05em] [text-shadow:0_8px_40px_rgba(0,0,0,0.6)]">
          O mundo está ouvindo aqui.
        </h2>
        <p className="sp-sub mt-6 text-lg font-medium text-white/85 sm:text-xl">Junte-se à festa com o Premium.</p>
      </div>
    </section>
  )
}
