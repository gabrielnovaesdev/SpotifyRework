import { moments } from '../media'

// Tamanhos e inclinações alternadas, como fotos coladas à mão
const looks = [
  'md:col-span-5 md:row-span-2 rotate-[-1deg]',
  'md:col-span-4 rotate-[1.2deg]',
  'md:col-span-3 rotate-[-0.6deg]',
  'md:col-span-3 rotate-[0.8deg]',
  'md:col-span-4 rotate-[-1.4deg]',
]

/** Fotos de shows coladas direto no muro, de ponta a ponta, com uma tira preta de legenda. */
export default function Moments() {
  return (
    <section id="momentos" aria-labelledby="momentos-titulo" className="wall-x py-16 lg:py-24">
      <h2 id="momentos-titulo" className="wood max-w-4xl text-[clamp(3rem,7vw,6rem)]">
        Onde a música acontece
      </h2>
      <p className="mt-4 max-w-2xl text-xl font-semibold">
        Do palco do estádio ao show de bairro: é aqui que a cultura se move.
      </p>

      <ul
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 [scrollbar-width:none] md:grid md:grid-cols-12 md:gap-5 md:overflow-visible"
        data-lenis-prevent-wheel
      >
        {moments.map((m, i) => (
          <li key={m.src} className={`w-[78vw] shrink-0 snap-center md:w-auto ${looks[i % looks.length]}`}>
            <figure className={`poster relative h-full ${i === 0 ? 'aspect-[4/5] md:aspect-auto' : 'aspect-[4/3]'}`}>
              <img src={m.src} alt={m.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-safe:hover:scale-[1.03]" />
              <figcaption className="absolute bottom-3 left-3 max-w-[85%] bg-ink px-3 py-2 text-sm font-semibold leading-snug text-paper">
                {m.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
