import { useRef } from 'react'
import { gsap, useGSAP } from '../lib'

type Bill = { word: string; line: string; bg: string; ink: string; accent?: string; big?: boolean; pos: string }

// Cada benefício é um cartaz. `pos` é o lugar dele no muro do desktop (sobrepostos).
const bills: Bill[] = [
  { word: 'Sem anúncio', line: 'Nada entre uma faixa e outra. Só música, do começo ao fim.', bg: 'bg-pink', ink: 'text-ink', pos: 'lg:left-[0%] lg:top-[2%] lg:w-[36%] lg:rotate-[-1.5deg]' },
  { word: 'Offline', big: true, line: 'Baixe suas playlists e ouça no metrô, no avião ou sem sinal.', bg: 'bg-paper', ink: 'text-ink', accent: 'text-pink', pos: 'lg:left-[33%] lg:top-[0%] lg:w-[31%] lg:rotate-[1deg]' },
  { word: 'Na ordem que quiser', line: 'Qualquer música, de qualquer álbum, a qualquer momento.', bg: 'bg-yellow', ink: 'text-ink', pos: 'lg:left-[61%] lg:top-[4%] lg:w-[39%] lg:rotate-[-0.5deg]' },
  { word: 'Áudio superior', line: 'Mais detalhe e definição, até em lossless nos aparelhos compatíveis.', bg: 'bg-ink', ink: 'text-paper', accent: 'text-green', pos: 'lg:left-[1%] lg:top-[53%] lg:w-[35%] lg:rotate-[0.8deg]' },
  { word: 'Jam', big: true, line: 'Crie uma Jam e deixe todo mundo escolher as próximas faixas.', bg: 'bg-green', ink: 'text-ink', pos: 'lg:left-[34%] lg:top-[51%] lg:w-[28%] lg:rotate-[-1.2deg]' },
  { word: 'Sua fila', big: true, line: 'Arraste, reordene e monte a sequência perfeita para cada momento.', bg: 'bg-paper', ink: 'text-ink', pos: 'lg:left-[60%] lg:top-[55%] lg:w-[40%] lg:rotate-[1.4deg]' },
]

/**
 * O momento da página: no desktop a seção fica presa e a rolagem cola os seis
 * cartazes, um por cima do outro. Celular e movimento reduzido mostram o muro pronto.
 */
export default function Paste() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray<HTMLElement>('.bill')
        gsap.set('.paste-count', { textContent: 0 })
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '.paste-pin', start: 'top top+=64', end: `+=${items.length * 55}%`, pin: true, scrub: 0.6 },
        })
        items.forEach((el, i) => {
          tl.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1 }, i)
            .fromTo(el, { y: -30 }, { y: 0, duration: 1, ease: 'power2.out' }, i)
          tl.to('.paste-count', { textContent: i + 1, snap: { textContent: 1 }, duration: 0.01 }, i + 0.5)
        })
        tl.to({}, { duration: 0.6 })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="beneficios" aria-labelledby="beneficios-titulo">
      <div className="paste-pin wall-x py-16 lg:flex lg:h-[calc(100svh-4rem)] lg:flex-col lg:py-8">
        <div className="flex items-end justify-between gap-6">
          <h2 id="beneficios-titulo" className="wood max-w-3xl text-[clamp(3rem,7vw,6rem)]">
            Seis motivos colados no muro
          </h2>
          <p className="wood hidden text-[clamp(3rem,7vw,6rem)] text-paper lg:block" aria-hidden="true">
            <span className="paste-count">6</span>/6
          </p>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:relative lg:mt-6 lg:block lg:flex-1">
          {bills.map((b) => (
            <li key={b.word} className={`bill poster ${b.bg} ${b.ink} flex flex-col justify-between gap-6 p-6 sm:p-8 lg:absolute lg:min-h-[45%] ${b.pos}`}>
              <h3 className={`wood ${b.big ? 'text-[clamp(3.5rem,7vw,8rem)]' : 'text-[clamp(2.75rem,4.6vw,5rem)]'} ${b.accent ?? ''}`}>{b.word}</h3>
              <p className="mt-3 max-w-sm text-lg font-semibold leading-snug">{b.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
