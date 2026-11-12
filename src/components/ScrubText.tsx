import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib'

export default function ScrubText() {
  const ref = useRef<HTMLParagraphElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = SplitText.create(ref.current, { type: 'words' })
        gsap.fromTo(
          split.words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        )
        return () => split.revert()
      })
    },
    { scope: ref },
  )
  return (
    <section className="container-x py-24 sm:py-36">
      <p
        ref={ref}
        className="max-w-6xl text-[clamp(2rem,5.2vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em]"
      >
        Mais de <span className="text-green">100 milhões</span> de músicas e <span className="text-lavender">7 milhões</span> de
        podcasts. Seus artistas favoritos, playlists feitas para você e nenhum anúncio no caminho.
      </p>
    </section>
  )
}
