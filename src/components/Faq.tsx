import { useState } from 'react'
import { RevealHeading } from './Reveal'
import { ScrollTrigger } from '../lib'
import { IconPlus } from './Icons'

const faqs = [
  { q: 'Como funciona o teste grátis do Premium?', a: 'Você aproveita todos os benefícios do Premium por 1 mês sem pagar nada. Se não cancelar até o fim do período, a assinatura passa a ser cobrada mensalmente no valor do plano escolhido.' },
  { q: 'Como posso cancelar o Premium?', a: 'É só acessar a página da sua conta, entrar em "Gerenciar plano" e escolher cancelar. Você continua com o Premium até o fim do período já pago e depois volta para o plano gratuito.' },
  { q: 'Quais formas de pagamento são aceitas?', a: 'Cartões de crédito e débito, Pix, PayPal, boleto e cartões pré-pagos. Também é possível fazer um pagamento único, sem renovação automática.' },
  { q: 'Como funciona o plano Família?', a: 'O plano Família inclui até 6 contas Premium separadas para pessoas que moram no mesmo endereço. Cada pessoa tem sua própria biblioteca e recomendações, e o titular pode filtrar conteúdo explícito.' },
  { q: 'Quem pode assinar o plano Universitário?', a: 'Estudantes matriculados em uma instituição de ensino superior credenciada. A verificação é feita na assinatura e precisa ser renovada a cada 12 meses, por até 4 anos.' },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.6fr]">
      <div>
        <RevealHeading className="text-[clamp(2.25rem,5vw,4rem)] font-black leading-[0.95] tracking-[-0.04em]">
          Alguma dúvida?
        </RevealHeading>
        <p className="mt-5 max-w-sm text-lg text-subdued">Confira as perguntas mais frequentes sobre o Premium.</p>
      </div>
      <ul className="divide-y divide-white/10 border-y border-white/10">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <li key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold sm:text-xl"
              >
                <span className="transition-colors group-hover:text-green">{f.q}</span>
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-(--ease-spring) ${
                    isOpen ? 'rotate-45 bg-green text-black' : 'bg-white/10 group-hover:bg-white/20'
                  }`}
                >
                  <IconPlus />
                </span>
              </button>
              <div
                id={`faq-${i}`}
                inert={!isOpen}
                onTransitionEnd={() => ScrollTrigger.refresh()}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-(--ease-spring) ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <p className="min-h-0 overflow-hidden pr-14 text-[15px] leading-relaxed text-subdued">
                  <span className="block pb-6">{f.a}</span>
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
