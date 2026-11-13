import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '../lib'
import Pill from './Pill'
import { IconArrow, IconCheck } from './Icons'
import { Cassette, Headphones, Mic, Vinyl } from './Stickers'

type Plan = { id: string; name: string; price: string; who: string; bg: string; features: string[]; terms: string; obj: ReactNode; accent: 'green' | 'pink' | 'yellow' | 'lavender' }

const plans: Plan[] = [
  {
    id: 'individual', name: 'Individual', price: '21,90', who: '1 conta', bg: 'bg-green', obj: <Headphones />, accent: 'yellow',
    features: ['1 conta Premium', 'Cancele quando quiser', 'Assine ou faça um pagamento único'],
    terms: 'R$ 0 por 1 mês, depois R$ 21,90 por mês. Só para quem nunca teve Premium.',
  },
  {
    id: 'duo', name: 'Duo', price: '27,90', who: '2 contas', bg: 'bg-pink', obj: <Mic />, accent: 'green',
    features: ['2 contas Premium', 'Cancele quando quiser', 'Assine ou faça um pagamento único'],
    terms: 'Para duas pessoas que moram no mesmo endereço. Sujeito a termos.',
  },
  {
    id: 'familia', name: 'Família', price: '34,90', who: 'até 6 contas', bg: 'bg-yellow', obj: <Vinyl />, accent: 'pink',
    features: ['Até 6 contas Premium', 'Controle de conteúdo explícito', 'Cancele quando quiser'],
    terms: 'Para até 6 pessoas que moram no mesmo endereço. Sujeito a termos.',
  },
  {
    id: 'universitario', name: 'Universitário', price: '11,90', who: '1 conta verificada', bg: 'bg-lavender', obj: <Cassette />, accent: 'lavender',
    features: ['1 conta Premium verificada', 'Desconto para estudantes', 'Cancele quando quiser'],
    terms: 'Para estudantes de ensino superior credenciado, com verificação anual.',
  },
]

/**
 * Planos em abas (referência: "Slush is always within reach"). A cápsula preta desliza no
 * seletor com mola; cor, imagem, título e texto trocam juntos: a imagem sai e entra com
 * deslocamento, o título chega da esquerda com desfoque. Cliques seguidos interrompem a troca
 * anterior. Semântica: tablist / tab / tabpanel, setas, Home/End e um único painel ativo.
 */
export default function Plans() {
  const [sel, setSel] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const panel = useRef<HTMLDivElement>(null)
  const [ind, setInd] = useState({ x: 0, w: 0 })
  const p = plans[sel]

  useLayoutEffect(() => {
    const measure = () => {
      const b = tabs.current[sel]
      if (b) setInd({ x: b.offsetLeft, w: b.offsetWidth })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [sel])

  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (prefersReducedMotion() || !panel.current) return
    const q = gsap.utils.selector(panel.current)
    gsap.timeline({ defaults: { overwrite: true } })
      .fromTo(q('.pl-media'), { xPercent: -8, autoAlpha: 0, scale: 0.96 }, { xPercent: 0, autoAlpha: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, 0)
      .fromTo(q('.pl-title'), { x: -60, autoAlpha: 0, filter: 'blur(10px)' }, { x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out', clearProps: 'filter' }, 0.05)
      .fromTo(q('.pl-text'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out' }, 0.15)
  }, [sel])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const n = plans.length
    const k = e.key
    const next = k === 'ArrowRight' ? (sel + 1) % n : k === 'ArrowLeft' ? (sel - 1 + n) % n : k === 'Home' ? 0 : k === 'End' ? n - 1 : -1
    if (next < 0) return
    e.preventDefault()
    setSel(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="planos" aria-labelledby="planos-titulo" className="panel mt-3 py-20 sm:py-28">
      <div className="wrap">
        <h2 id="planos-titulo" className="text-center text-[clamp(1.9rem,3.4vw,3.25rem)] font-semibold leading-tight tracking-tight">
          Um plano Premium para cada situação
        </h2>

        <div className="mt-8 flex justify-center">
          <div role="tablist" aria-label="Planos" className="relative flex max-w-full overflow-x-auto rounded-full border-2 border-ink bg-paper p-1 [scrollbar-width:none]">
            <span aria-hidden="true" className="tab-ind absolute bottom-1 left-0 top-1 rounded-full bg-ink" style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} />
            {plans.map((q, i) => (
              <button
                key={q.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`tab-${q.id}`}
                aria-selected={i === sel}
                aria-controls="plano-painel"
                tabIndex={i === sel ? 0 : -1}
                onClick={() => setSel(i)}
                onKeyDown={onKey}
                className={`relative z-10 min-h-11 shrink-0 rounded-full px-4 text-[0.8125rem] font-extrabold uppercase tracking-[0.03em] transition-colors duration-300 sm:px-6 ${
                  i === sel ? 'text-paper' : 'text-ink hover:bg-ink/5'
                }`}
              >
                {q.name}
              </button>
            ))}
          </div>
        </div>

        <div ref={panel} role="tabpanel" id="plano-painel" aria-labelledby={`tab-${p.id}`} tabIndex={0} className="mt-12 grid items-center gap-10 md:grid-cols-2 lg:gap-20">
          <div className={`pl-media card relative grid aspect-[5/4] place-items-center overflow-hidden transition-colors duration-500 ${p.bg}`}>
            <p className="display text-[clamp(5rem,12vw,10rem)] leading-none text-ink">
              <span className="align-top text-[0.32em]">R$</span>
              {p.price}
            </p>
            <div className="pointer-events-none absolute bottom-[8%] right-[8%] w-[24%]">
              <div className="loop-bob" style={{ '--dur': '5s' } as CSSProperties}>
                {p.obj}
              </div>
            </div>
          </div>
          <div>
            <h3 className="pl-title display text-[clamp(4rem,8vw,7.5rem)]">{p.name}</h3>
            <p className="pl-text mt-2 text-lg font-semibold">R$ {p.price}/mês, {p.who}</p>
            <ul className="mt-6 space-y-3">
              {p.features.map((f) => (
                <li key={p.id + f} className="pl-text flex items-start gap-3 text-lg">
                  <IconCheck className="mt-1 h-5 w-5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="pl-text mt-8">
              <Pill href="https://www.spotify.com/br-pt/premium/" target="_blank" rel="noopener noreferrer" tone="dark" accent={p.accent} icon={<IconArrow className="h-4 w-4" />}>
                Começar o {p.name}
              </Pill>
            </div>
            <p className="pl-text mt-5 max-w-md text-sm text-ink/70">{p.terms}</p>
          </div>
        </div>

        <p className="mt-12 text-center text-sm font-semibold text-ink/70">
          Pix, cartão, PayPal ou boleto. Valores de referência para fins de estudo. Projeto educacional sem vínculo com a Spotify AB.
        </p>
      </div>
    </section>
  )
}
