import { tilt } from '../lib'
import { IconArrow } from './Icons'

/** O último cartaz do muro: rosa, de ponta a ponta. */
export default function FinalCta() {
  return (
    <section id="cta" aria-labelledby="cta-titulo" className="wall-x relative z-10 pb-16 pt-4 lg:-mt-44 lg:pb-24">
      {/* Colado por cima do pé do cartaz de dúvidas */}
      <div className="poster bg-pink p-6 text-ink sm:p-12 lg:ml-[8%] lg:rotate-[-0.8deg] lg:p-16">
        <h2 id="cta-titulo" className="wood max-w-6xl text-[clamp(4rem,11vw,10rem)]">
          Sua próxima música favorita está esperando
        </h2>
        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-xl font-bold leading-snug">
            Comece com 1 mês de Premium por R$ 0. Sem anúncios, offline e na ordem que você quiser.
          </p>
          <a href="#planos" className="tape bg-ink text-xl text-paper" style={tilt(1.5)}>
            Escolher meu plano <IconArrow className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
