import { useRef, type PointerEvent } from 'react'
import { gsap, useGSAP } from '../lib'
import { RevealHeading } from './Reveal'
import { IconCheck, Logo } from './Icons'

type Plan = {
  name: string
  badge: string
  price: string
  after: string
  accounts: string
  accent: string
  features: string[]
  cta: string
  terms: string
}

const plans: Plan[] = [
  {
    name: 'Individual',
    badge: 'R$ 0 por 1 mês',
    price: 'R$ 0 por 1 mês',
    after: 'R$ 21,90/mês depois',
    accounts: '1 conta Premium',
    accent: '#ffd2d7',
    features: ['1 conta Premium', 'Cancele quando quiser', 'Assine ou faça um pagamento único'],
    cta: 'Experimente 1 mês por R$ 0',
    terms: 'R$ 0 por 1 mês, depois R$ 21,90 por mês. Oferta disponível apenas para quem nunca assinou o Premium.',
  },
  {
    name: 'Duo',
    badge: 'R$ 0 por 1 mês',
    price: 'R$ 27,90/mês',
    after: 'para 2 pessoas',
    accounts: '2 contas Premium',
    accent: '#cfb5f7',
    features: ['2 contas Premium', 'Cancele quando quiser', 'Assine ou faça um pagamento único'],
    cta: 'Experimente 1 mês por R$ 0',
    terms: 'Para casais que moram no mesmo endereço. Sujeito a termos.',
  },
  {
    name: 'Família',
    badge: 'R$ 0 por 1 mês',
    price: 'R$ 34,90/mês',
    after: 'até 6 contas',
    accounts: 'Até 6 contas Premium',
    accent: '#a5c8f2',
    features: ['Até 6 contas Premium', 'Controle de conteúdo explícito', 'Cancele quando quiser', 'Assine ou faça um pagamento único'],
    cta: 'Experimente 1 mês por R$ 0',
    terms: 'Para até 6 membros da família que moram no mesmo endereço. Sujeito a termos.',
  },
  {
    name: 'Universitário',
    badge: 'R$ 0 por 1 mês',
    price: 'R$ 11,90/mês',
    after: 'com desconto',
    accounts: '1 conta Premium verificada',
    accent: '#ffc864',
    features: ['1 conta Premium verificada', 'Desconto para estudantes qualificados', 'Cancele quando quiser'],
    cta: 'Experimente 1 mês por R$ 0',
    terms: 'Disponível apenas para estudantes de instituições de ensino superior credenciadas.',
  },
]

function tilt(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  gsap.to(el, { rotateY: x * 8, rotateX: -y * 8, duration: 0.6, ease: 'power3.out', transformPerspective: 900 })
}
function untilt(e: PointerEvent<HTMLElement>) {
  gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' })
}

export default function Plans() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.plan', {
          y: 120,
          autoAlpha: 0,
          rotateX: -12,
          transformPerspective: 900,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.plans-grid', start: 'top 80%' },
        })
        gsap.from('.pay-chip', {
          scale: 0.6,
          autoAlpha: 0,
          duration: 0.6,
          ease: 'back.out(2)',
          stagger: 0.05,
          scrollTrigger: { trigger: '.pay-row', start: 'top 90%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="planos" className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <RevealHeading className="text-[clamp(2.25rem,5.5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.045em]">
            Planos acessíveis para qualquer situação
          </RevealHeading>
          <p className="mx-auto mt-6 max-w-xl text-lg text-subdued">
            Escolha um plano Premium e ouça sem anúncios quanto quiser, em qualquer dispositivo. Várias formas de pagamento.
            Cancele quando quiser.
          </p>
          <ul className="pay-row mt-8 flex flex-wrap justify-center gap-2" aria-label="Formas de pagamento">
            {['Pix', 'Visa', 'Mastercard', 'Elo', 'Amex', 'PayPal', 'Boleto'].map((p) => (
              <li key={p} className="pay-chip rounded-md bg-white px-3 py-1 text-xs font-extrabold text-black">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="plans-grid mt-16 grid gap-5 [perspective:1200px] md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p) => (
            <article
              key={p.name}
              onPointerMove={tilt}
              onPointerLeave={untilt}
              className="plan group relative flex flex-col overflow-hidden rounded-2xl bg-elevated p-7 ring-1 ring-white/5 will-change-transform [transform-style:preserve-3d]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                style={{ background: `radial-gradient(60% 100% at 50% 0%, ${p.accent}, transparent)` }}
              />
              <span
                className="relative w-fit rounded-br-lg rounded-tl-md px-3 py-1 text-sm font-bold text-black -mx-7 -mt-7 mb-6"
                style={{ background: p.accent }}
              >
                {p.badge}
              </span>
              <div className="relative flex items-center gap-2 text-white">
                <Logo className="h-6" />
                <span className="font-bold">Premium</span>
              </div>
              <h3 className="relative mt-2 text-4xl font-black tracking-tight" style={{ color: p.accent }}>
                {p.name}
              </h3>
              <p className="relative mt-3 text-lg font-bold">{p.price}</p>
              <p className="relative text-sm text-subdued">{p.after}</p>
              <hr className="relative my-6 border-white/10" />
              <ul className="relative flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] text-white/90">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className="btn relative mt-8 w-full whitespace-nowrap px-4 text-[15px] text-black hover:scale-[1.03] hover:brightness-110"
                style={{ background: p.accent }}
              >
                {p.cta}
              </a>
              <p className="relative mt-5 min-h-[3.75rem] text-center text-xs leading-relaxed text-white/50">{p.terms}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-white/40">
          Valores de referência para fins de estudo. Este é um projeto educacional sem vínculo com o Spotify.
        </p>
      </div>
    </section>
  )
}
