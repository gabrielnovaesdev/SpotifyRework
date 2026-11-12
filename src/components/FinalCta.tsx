import { useRef, type PointerEvent } from 'react'
import { gsap, useGSAP } from '../lib'
import { IconPlay } from './Icons'

function magnet(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  gsap.to(el, {
    x: (e.clientX - r.left - r.width / 2) * 0.35,
    y: (e.clientY - r.top - r.height / 2) * 0.35,
    duration: 0.5,
    ease: 'power3.out',
  })
}
const release = (e: PointerEvent<HTMLElement>) =>
  gsap.to(e.currentTarget, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)' })

export default function FinalCta() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // O painel verde "abre" a partir de um círculo conforme o scroll
        gsap.fromTo(
          '.cta-panel',
          { clipPath: 'inset(18% 22% 18% 22% round 48px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 24px)',
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'top 20%', scrub: true },
          },
        )
        gsap.from('.cta-inner > *', {
          y: 50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 45%' },
        })
        gsap.to('.eq-bar', { scaleY: 1, duration: 0.5, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: { each: 0.12, from: 'random' } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="cta" className="px-2 py-10 sm:px-4">
      <div className="cta-panel relative overflow-hidden rounded-3xl bg-green text-black">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#c3f53c] opacity-60 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[#0b8a3a] opacity-50 blur-3xl" />
        <div className="cta-inner container-x relative flex flex-col items-center py-24 text-center sm:py-36">
          <div className="flex h-12 items-end gap-1.5" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => (
              <span key={i} className="eq-bar block h-full w-2 origin-bottom scale-y-[0.3] rounded-full bg-black" />
            ))}
          </div>
          <h2 className="mt-8 max-w-4xl text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.055em]">
            Sua próxima música favorita está esperando.
          </h2>
          <p className="mt-6 max-w-lg text-lg font-semibold text-black/70">
            Comece com 1 mês de Premium por R$ 0. Sem anúncios, offline e na ordem que você quiser.
          </p>
          <div className="mt-10 p-4" onPointerMove={magnet} onPointerLeave={release}>
            <a href="#planos" className="btn bg-black px-10 py-5 text-lg text-white hover:scale-[1.05]">
              <IconPlay /> Começar agora
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
