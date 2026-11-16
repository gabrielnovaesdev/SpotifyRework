import { useState } from 'react'
import { ScrollTrigger } from '../lib'
import { IconPlus } from './Icons'

const faqs = [
  { q: 'Como funciona o teste grátis do Premium?', a: 'Você aproveita todos os benefícios do Premium por 1 mês sem pagar nada. Se não cancelar até o fim do período, a assinatura passa a ser cobrada mensalmente no valor do plano escolhido.' },
  { q: 'Como posso cancelar o Premium?', a: 'É só acessar a página da sua conta, entrar em "Gerenciar plano" e escolher cancelar. Você continua com o Premium até o fim do período já pago e depois volta para o plano gratuito.' },
  { q: 'Quais formas de pagamento são aceitas?', a: 'Cartões de crédito e débito, Pix, PayPal, boleto e cartões pré-pagos. Também é possível fazer um pagamento único, sem renovação automática.' },
  { q: 'Como funciona o plano Família?', a: 'O plano Família inclui até 6 contas Premium separadas para pessoas que moram no mesmo endereço. Cada pessoa tem sua própria biblioteca e recomendações, e o titular pode filtrar conteúdo explícito.' },
  { q: 'Quem pode assinar o plano Universitário?', a: 'Estudantes matriculados em uma instituição de ensino superior credenciada. A verificação é feita na assinatura e precisa ser renovada a cada 12 meses, por até 4 anos.' },
]

/** Perguntas frequentes num painel claro; respostas abrem como acordeão, com mola. */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="panel mt-3 py-20 sm:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <h2 id="faq-titulo" className="display-tilt origin-left text-[clamp(4rem,7.5vw,7.5rem)]">
          Alguma dúvida?
        </h2>
        <ul className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q} className={`card px-5 transition-colors duration-300 sm:px-7 ${isOpen ? 'bg-mint' : 'bg-paper'}`}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="group flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-bold sm:text-xl"
                >
                  <span className="decoration-2 group-hover:underline">{f.q}</span>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink transition-[transform,background-color] duration-500 ease-(--ease-spring) ${
                      isOpen ? 'rotate-45 bg-green' : 'bg-yellow'
                    }`}
                  >
                    <IconPlus />
                  </span>
                </button>
                <div
                  id={`faq-${i}`}
                  inert={!isOpen}
                  onTransitionEnd={() => ScrollTrigger.refresh()}
                  className={`grid transition-[grid-template-rows] duration-500 ease-(--ease-paste) ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <p className="min-h-0 overflow-hidden pr-4 text-base leading-relaxed sm:pr-14 sm:text-lg">
                    <span className="block pb-6">{f.a}</span>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
