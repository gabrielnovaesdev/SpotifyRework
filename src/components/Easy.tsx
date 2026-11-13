import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib'
import { dur, gap, ease } from '../motion'
import PhoneShot from './PhoneShot'

const steps = [
  { word: 'Navegar', line: 'Paradas, gêneros, lançamentos e playlists feitas por quem entende.', phone: 'iphone3.png', bg: 'bg-green', rot: '-1.2deg' },
  { word: 'Descobrir', line: 'Toda semana, uma mixtape nova feita com base no que você ouve.', phone: 'iphone2.png', bg: 'bg-pink', rot: '1deg' },
  { word: 'Ouvir', line: 'Toque, pule e repita o que quiser, até sem internet.', phone: 'iphone1.png', bg: 'bg-yellow', rot: '-0.8deg' },
]

/**
 * Blocos editoriais alternados (referência #6): mídia quadrada recortada de um lado,
 * título condensado grande do outro, trocando de lado a cada linha no desktop.
 * Ao entrar na tela: o título revela por recorte e deslocamento, depois texto e mídia
 * em sobreposição curta. No celular empilha texto → mídia, mantendo o par junto.
 */
export default function Easy() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const splits: SplitText[] = []
        gsap.utils.toArray<HTMLElement>('.ed-row').forEach((row) => {
          const title = row.querySelector('.ed-title')!
          const s = SplitText.create(title, { type: 'chars', mask: 'chars', aria: 'auto' })
          splits.push(s)
          const tl = gsap.timeline({ defaults: { ease: ease.out }, scrollTrigger: { trigger: row, start: 'top 78%', once: true } })
          tl.from(s.chars, { yPercent: 110, duration: dur.reveal + 0.1, stagger: gap.item * 0.5 })
            .from(row.querySelector('.ed-text'), { y: 24, autoAlpha: 0, duration: dur.reveal }, `-=${dur.reveal * 0.7}`)
            .from(row.querySelector('.ed-media'), { y: 40, autoAlpha: 0, duration: dur.reveal + 0.1 }, `-=${dur.reveal * 0.8}`)
        })
        return () => splits.forEach((s) => s.revert())
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="facil" aria-labelledby="facil-titulo" className="wall-x py-16 lg:py-24">
      <div className="poster bg-paper p-6 sm:p-10 lg:p-14">
        <h2 id="facil-titulo" className="wood text-center text-[clamp(4rem,11vw,10rem)]">
          É <span className="bg-ink px-[0.08em] text-yellow">fácil</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-xl font-semibold">Três gestos e você já está ouvindo. É assim no app:</p>

        <ol className="mt-12 space-y-14 lg:space-y-20">
          {steps.map((s, i) => (
            <li key={s.word} className={`ed-row grid items-center gap-8 md:grid-cols-2 lg:gap-16`}>
              <div className={`ed-text-col ${i % 2 ? 'md:order-2' : ''}`}>
                <h3 className="ed-title wood text-[clamp(3.5rem,7vw,7rem)]">{s.word}</h3>
                <p className="ed-text mt-4 max-w-sm text-xl font-semibold leading-snug">{s.line}</p>
              </div>
              <div className={`ed-media poster ${s.bg} grid aspect-square place-items-center overflow-hidden`} style={{ rotate: s.rot }}>
                <PhoneShot file={s.phone} alt={`Tela do app: ${s.word}`} className="w-[min(46%,230px)] translate-y-[14%]" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
