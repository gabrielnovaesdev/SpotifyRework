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

/** Um cartaz branco de perguntas, com as respostas abrindo como um acordeão. */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="wall-x py-16 lg:py-24">
      <div className="poster grid gap-8 bg-paper p-6 sm:p-10 lg:grid-cols-[1fr_1.7fr] lg:gap-14 lg:pb-24">
        <h2 id="faq-titulo" className="wood text-[clamp(3.5rem,7vw,6.5rem)]">
          Alguma <span className="text-pink">dúvida?</span>
        </h2>
        <ul className="border-t-2 border-ink">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q} className="border-b-2 border-ink">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="group flex w-full items-center justify-between gap-6 py-5 text-left text-xl font-extrabold"
                >
                  <span className="decoration-2 group-hover:underline">{f.q}</span>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center transition-[transform,background-color] duration-500 ease-(--ease-paste) ${
                      isOpen ? 'rotate-45 bg-pink' : 'bg-yellow'
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
                  <p className="min-h-0 overflow-hidden pr-14 text-lg leading-relaxed">
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
