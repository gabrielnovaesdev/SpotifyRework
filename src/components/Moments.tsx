import { useRef } from 'react'
import { gsap, useGSAP } from '../lib'
import { moments } from '../media'
import { RevealHeading } from './Reveal'

// Larguras/alturas alternadas, como no carrossel original
// Altura limitada pela tela (o bloco inteiro precisa caber fixo na viewport)
const sizes = [
  'w-[min(78vw,56vh)] aspect-[4/3]',
  'w-[min(62vw,32vh)] aspect-[3/4]',
  'w-[min(70vw,40vh)] aspect-[1/1]',
  'w-[min(58vw,29vh)] aspect-[3/4]',
  'w-[min(74vw,50vh)] aspect-[4/3]',
]

/** "Moldando os grandes momentos da música": galeria que anda na horizontal com o scroll. */
export default function Moments() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Fundo escurece → roxo ao entrar
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          root.current,
          { backgroundColor: '#121212' },
          { backgroundColor: '#4100f4', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 85%', end: 'top 30%', scrub: true } },
        )
      })

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const track = root.current!.querySelector<HTMLElement>('.mo-track')!
        const distance = () => track.scrollWidth - window.innerWidth
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.mo-pin',
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        // Parallax interno de cada foto + leve rotação conforme passa pelo centro
        gsap.utils.toArray<HTMLElement>('.mo-item').forEach((item) => {
          gsap.fromTo(
            item.querySelector('img'),
            { xPercent: -6 },
            { xPercent: 6, ease: 'none', scrollTrigger: { trigger: item, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } },
          )
          gsap.fromTo(
            item,
            { rotate: 3, y: 30 },
            { rotate: -3, y: -30, ease: 'none', scrollTrigger: { trigger: item, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } },
          )
          // Como na referência: a foto entra como uma faixa estreita que abre para os lados,
          // com um véu roxo que some
          const reveal = { trigger: item, containerAnimation: tween, start: 'left 100%', end: 'left 55%', scrub: true }
          gsap.fromTo(item.querySelector('.mo-box'), { clipPath: 'inset(0% 38% 0% 38%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', scrollTrigger: reveal })
          gsap.fromTo(item.querySelector('.mo-tint'), { opacity: 0.8 }, { opacity: 0, ease: 'none', scrollTrigger: reveal })
        })
      })

      // Celular: mesma revelação, disparada quando a foto entra na tela
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.mo-item').forEach((item) => {
          const st = { trigger: item, start: 'top 85%' }
          gsap.fromTo(item.querySelector('.mo-box'), { clipPath: 'inset(0% 38% 0% 38%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.out', scrollTrigger: st })
          gsap.fromTo(item.querySelector('.mo-tint'), { opacity: 0.8 }, { opacity: 0, duration: 1.1, ease: 'power2.out', scrollTrigger: st })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="momentos" aria-label="Moldando os grandes momentos da música" className="relative bg-[#4100f4]">
      <div className="mo-pin flex min-h-svh flex-col justify-center overflow-hidden py-20 md:pb-8 md:pt-24">
        <header className="container-x">
          <RevealHeading className="max-w-4xl text-[clamp(2.5rem,5.6vw,5rem)] font-black leading-[1] tracking-[-0.04em]">
            Moldando os grandes momentos da música
          </RevealHeading>
          <p className="mt-6 max-w-3xl text-lg font-medium text-white/90 sm:text-xl">
            O Spotify é onde a música acontece e a cultura se move. Esteja aqui quando a história acontecer.
          </p>
        </header>

        <ul
          className="mo-track mt-12 flex snap-x snap-mandatory items-start gap-8 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-8 md:w-max md:snap-none md:overflow-visible md:pl-[max(3rem,calc((100vw-1320px)/2+3rem))] md:pr-[12vw]"
          data-lenis-prevent-wheel
        >
          {moments.map((m, i) => (
            <li key={m.src} className={`mo-item group shrink-0 snap-center ${sizes[i % sizes.length].split(' ')[0]}`}>
              <figure>
                <div className={`mo-box relative overflow-hidden rounded-xl bg-black/20 ${sizes[i % sizes.length].split(' ')[1]}`}>
                  <img
                    src={m.src}
                    alt={m.alt}
                    loading="lazy"
                    className="absolute -left-[12%] top-0 h-full w-[124%] max-w-none object-cover transition-[filter] duration-500 group-hover:saturate-[1.2]"
                  />
                  <div className="mo-tint pointer-events-none absolute inset-0 bg-[#4100f4] opacity-0 mix-blend-multiply" />
                </div>
                <figcaption className="mt-3 max-w-[90%] text-sm font-semibold leading-snug text-white/90">{m.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
