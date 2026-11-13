import { useRef, useState } from 'react'
import { gsap, useGSAP, img } from '../lib'

const steps = [
  { kicker: '01', title: 'Navegar', text: 'Explore paradas, gêneros, lançamentos e playlists feitas por quem entende.', phone: 'iphone3.png', color: '#1ed760' },
  { kicker: '02', title: 'Descobrir', text: 'Toda semana, uma mixtape nova feita só para você com base no que você ouve.', phone: 'iphone2.png', color: '#cfb5f7' },
  { kicker: '03', title: 'Ouvir', text: 'Toque, pule e repita o que quiser. Sem anúncios e até sem internet.', phone: 'iphone1.png', color: '#ffc864' },
]

export default function Showcase() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop: seção fixa (pin) com troca de telas sincronizada ao scroll
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const phones = gsap.utils.toArray<HTMLElement>('.sc-phone')
        const texts = gsap.utils.toArray<HTMLElement>('.sc-step')
        gsap.set(phones.slice(1), { yPercent: 140, rotate: 6 })
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 40 })

        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: {
            trigger: '.sc-pin',
            start: 'top top',
            end: `+=${(steps.length - 1) * 100}%`,
            pin: true,
            scrub: 0.8,
            snap: { snapTo: 1 / (steps.length - 1), duration: 0.6, ease: 'power2.inOut' },
            onUpdate: (self) => setActive(Math.round(self.progress * (steps.length - 1))),
          },
        })
        tl.to('.sc-progress', { scaleY: 1, ease: 'none', duration: steps.length - 1 }, 0)
        for (let i = 1; i < steps.length; i++) {
          const at = i - 1
          tl.to(texts[i - 1], { autoAlpha: 0, y: -40, duration: 0.5 }, at)
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.5)
            .to(phones[i - 1], { scale: 0.85, autoAlpha: 0.0, rotate: -6, duration: 1 }, at)
            .to(phones[i], { yPercent: 0, rotate: 0, duration: 1 }, at)
            .to('.sc-glow', { backgroundColor: steps[i].color, duration: 1 }, at)
        }
      })

      // Mobile: cada passo revela individualmente
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.sc-mobile').forEach((el) => {
          gsap.from(el, { y: 60, autoAlpha: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="recursos" aria-label="É fácil" className="relative">
      {/* Desktop */}
      <div className="sc-pin relative hidden h-svh overflow-hidden lg:block">
        <div className="sc-glow absolute left-[60%] top-1/2 -z-0 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green opacity-30 blur-[140px]" />
        <div className="container-x relative grid h-full grid-cols-[auto_1fr_1fr] items-center gap-16">
          <div className="relative h-56 w-[3px] overflow-hidden rounded-full bg-white/15">
            <div className="sc-progress absolute inset-0 origin-top scale-y-0 rounded-full bg-white" />
          </div>
          <div>
            <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-none tracking-[-0.04em]">É fácil.</h2>
            <div className="relative mt-10 h-56">
              {steps.map((s) => (
                <div key={s.title} className="sc-step absolute inset-0">
                  <span className="font-mono text-sm text-subdued">{s.kicker} / 03</span>
                  <h3 className="mt-3 text-5xl font-extrabold tracking-tight" style={{ color: s.color }}>{s.title}</h3>
                  <p className="mt-5 max-w-md text-xl leading-relaxed text-white/80">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-2" aria-hidden="true">
              {steps.map((s, i) => (
                <span key={s.title} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-10 bg-white' : 'w-4 bg-white/25'}`} />
              ))}
            </div>
          </div>
          <div className="relative mx-auto h-[78vh] w-full">
            {steps.map((s, i) => (
              <img
                key={s.phone}
                src={img(s.phone)}
                alt={`Tela do app: ${s.title}`}
                className="sc-phone absolute inset-0 m-auto h-full w-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                style={{ zIndex: i }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="container-x py-20 lg:hidden">
        <h2 className="text-[clamp(2.75rem,10vw,4rem)] font-black leading-none tracking-[-0.04em]">É fácil.</h2>
        <div className="mt-12 space-y-20">
          {steps.map((s) => (
            <div key={s.title} className="sc-mobile grid items-center gap-8 sm:grid-cols-2">
              <div>
                <span className="font-mono text-sm text-subdued">{s.kicker} / 03</span>
                <h3 className="mt-2 text-4xl font-extrabold tracking-tight" style={{ color: s.color }}>{s.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-white/80">{s.text}</p>
              </div>
              <img src={img(s.phone)} alt={`Tela do app: ${s.title}`} className="mx-auto h-[420px] w-auto" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
