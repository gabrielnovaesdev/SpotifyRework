import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, img, prefersReducedMotion } from '../lib'

const video = `${import.meta.env.BASE_URL}videos/mascote.webm`

/**
 * Personagem 3D nas cores do Brasil entre a grade de benefícios e os cards,
 * no mesmo lugar do personagem da referência. Vídeo VP9 com transparência;
 * Safari não suporta alpha em WebM, então lá (e com movimento reduzido) usa a imagem parada.
 */
export default function Mascot() {
  const root = useRef<HTMLDivElement>(null)
  const [useVideo, setUseVideo] = useState(false)

  useEffect(() => {
    const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)
    setUseVideo(!isSafari && !prefersReducedMotion())
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Aparece "caindo" na tela e continua afundando devagar com o scroll
        gsap.fromTo(
          '.mascot',
          { yPercent: -35, rotate: -10, scale: 0.8, autoAlpha: 0 },
          {
            yPercent: 20,
            rotate: 6,
            scale: 1,
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 95%', end: 'bottom 15%', scrub: 1 },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="pointer-events-none relative -my-6 flex justify-center overflow-hidden py-6" aria-hidden="true">
      <div className="mascot w-[min(78vw,560px)]">
        {useVideo ? (
          <video
            className="aspect-[4/3] w-full"
            src={video}
            poster={img('mascote.webp')}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <img src={img('mascote.webp')} alt="" className="aspect-[4/3] w-full" loading="lazy" />
        )}
      </div>
    </div>
  )
}
