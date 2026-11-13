import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { gsap, prefersReducedMotion, tilt } from '../lib'
import { dur, ease } from '../motion'
import { IconArrow, IconCheck } from './Icons'

type Plan = { id: string; name: string; price: string; who: string; bg: string; ink: string; features: string[]; terms: string }

const plans: Plan[] = [
  {
    id: 'individual', name: 'Individual', price: '21,90', who: '1 conta', bg: 'bg-yellow', ink: 'text-ink',
    features: ['1 conta Premium', 'Cancele quando quiser', 'Assine ou faça um pagamento único'],
    terms: 'R$ 0 por 1 mês, depois R$ 21,90 por mês. Só para quem nunca teve Premium.',
  },
  {
    id: 'duo', name: 'Duo', price: '27,90', who: '2 contas', bg: 'bg-pink', ink: 'text-ink',
    features: ['2 contas Premium', 'Cancele quando quiser', 'Assine ou faça um pagamento único'],
    terms: 'Para duas pessoas que moram no mesmo endereço. Sujeito a termos.',
  },
  {
    id: 'familia', name: 'Família', price: '34,90', who: 'até 6 contas', bg: 'bg-green', ink: 'text-ink',
    features: ['Até 6 contas Premium', 'Controle de conteúdo explícito', 'Cancele quando quiser'],
    terms: 'Para até 6 pessoas que moram no mesmo endereço. Sujeito a termos.',
  },
  {
    id: 'universitario', name: 'Universitário', price: '11,90', who: '1 conta verificada', bg: 'bg-paper', ink: 'text-ink',
    features: ['1 conta Premium verificada', 'Desconto para estudantes', 'Cancele quando quiser'],
    terms: 'Para estudantes de ensino superior credenciado, com verificação anual.',
  },
]

/**
 * Planos como abas (referência #9): as tirinhas destacáveis são as abas. Um indicador preto
 * desliza até a tirinha escolhida; cor do cartaz, nome, preço, benefícios e ação trocam juntos,
 * entrando da esquerda com desfoque curto. Cliques seguidos interrompem a troca anterior.
 * Semântica de abas: tablist / tab / tabpanel, setas do teclado e um único painel ativo.
 */
export default function Plans() {
  const [sel, setSel] = useState(0)
  const strips = useRef<(HTMLButtonElement | null)[]>([])
  const panel = useRef<HTMLDivElement>(null)
  const [ind, setInd] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const p = plans[sel]

  // Indicador deslizante: mede a tirinha ativa (2x2 no celular, 4 colunas no desktop)
  useLayoutEffect(() => {
    const measure = () => {
      const b = strips.current[sel]
      if (b) setInd({ x: b.offsetLeft, y: b.offsetTop, w: b.offsetWidth, h: b.offsetHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [sel])

  // Troca sincronizada do conteúdo
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (prefersReducedMotion() || !panel.current) return
    gsap.fromTo(
      panel.current.querySelectorAll('.pl-anim'),
      { x: -36, autoAlpha: 0, filter: 'blur(8px)' },
      { x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: dur.slide * 0.75, ease: ease.out, stagger: 0.05, overwrite: true, clearProps: 'filter' },
    )
  }, [sel])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const k = e.key
    const n = plans.length
    const next =
      k === 'ArrowRight' || k === 'ArrowDown' ? (sel + 1) % n : k === 'ArrowLeft' || k === 'ArrowUp' ? (sel - 1 + n) % n : k === 'Home' ? 0 : k === 'End' ? n - 1 : -1
    if (next < 0) return
    e.preventDefault()
    setSel(next)
    strips.current[next]?.focus()
  }

  return (
    <section id="planos" aria-labelledby="planos-titulo" className="wall-x py-16 lg:py-24">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
        <div className="poster bg-ink p-6 text-paper sm:p-10 lg:col-span-4 lg:self-start">
          <h2 id="planos-titulo" className="wood text-[clamp(3.25rem,5.6vw,5.5rem)]">
            Destaque o seu plano
          </h2>
          <p className="mt-5 text-lg font-semibold leading-snug">
            Escolha uma tirinha. Todo plano começa com 1 mês por R$ 0 e pode ser cancelado quando quiser.
          </p>
          <p className="mt-6 text-sm text-paper/80">Pix, cartão, PayPal ou boleto.</p>
        </div>

        <article className={`poster ${p.bg} ${p.ink} relative z-10 flex flex-col transition-colors duration-500 lg:col-span-8 lg:-ml-8 lg:mt-16 lg:rotate-[0.6deg]`}>
          <div ref={panel} role="tabpanel" id="plano-painel" aria-labelledby={`tab-${p.id}`} tabIndex={0} className="grid flex-1 gap-8 p-6 sm:p-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <h3 className="pl-anim wood text-[clamp(4rem,9vw,8.5rem)]">{p.name}</h3>
              <p className="pl-anim mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold">R$</span>
                <span className="wood text-[clamp(4rem,8vw,7rem)]">{p.price}</span>
                <span className="text-xl font-bold">/mês, {p.who}</span>
              </p>
            </div>
            <div className="flex flex-col justify-between gap-6">
              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li key={p.id + f} className="pl-anim flex items-start gap-3 text-lg font-semibold">
                    <IconCheck className="mt-1 h-5 w-5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pl-anim">
                <a href="https://www.spotify.com/br-pt/premium/" target="_blank" rel="noopener noreferrer" className="tape whitespace-nowrap bg-ink px-5 text-base text-paper" style={tilt(-1.5)}>
                  Começar o {p.name} <IconArrow className="h-5 w-5" />
                </a>
                <p className="mt-4 text-sm leading-snug">{p.terms}</p>
              </div>
            </div>
          </div>

          {/* Tirinhas destacáveis = abas */}
          <div role="tablist" aria-label="Planos" className="relative grid grid-cols-2 border-t-2 border-dashed border-ink/50 sm:grid-cols-4">
            <span
              aria-hidden="true"
              className="strip-ind absolute left-0 top-0 bg-ink"
              style={{ transform: `translate3d(${ind.x}px, ${ind.y + 12}px, 0)`, width: ind.w, height: ind.h }}
            />
            {plans.map((q, i) => {
              const on = i === sel
              return (
                <button
                  key={q.id}
                  ref={(el) => {
                    strips.current[i] = el
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${q.id}`}
                  aria-selected={on}
                  aria-controls="plano-painel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setSel(i)}
                  onKeyDown={onKey}
                  className={`group relative z-10 flex min-h-28 flex-col items-center justify-center gap-1 border-dashed border-ink/50 px-2 py-4 text-center transition-[color,transform] duration-300 ease-(--ease-paste) odd:border-r-2 nth-[n+3]:border-t-2 sm:min-h-32 sm:nth-[n+3]:border-t-0 sm:not-last:border-r-2 ${
                    on ? 'translate-y-3 text-paper' : 'hover:-translate-y-0.5'
                  }`}
                >
                  <span className="wood text-2xl sm:text-3xl">{q.name}</span>
                  <span className="text-sm font-bold">R$ {q.price}</span>
                </button>
              )
            })}
          </div>
        </article>
      </div>
      <p className="mt-6 text-center text-sm font-semibold">Valores de referência para fins de estudo. Projeto educacional sem vínculo com a Spotify AB.</p>
    </section>
  )
}
