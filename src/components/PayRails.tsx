import { useEffect, useRef, type CSSProperties } from 'react'

const methods = ['Pix', 'Visa', 'Mastercard', 'Elo', 'Amex', 'PayPal', 'Boleto', 'Cartão pré-pago']
const tones = ['bg-yellow', 'bg-pink', 'bg-green', 'bg-paper']

function Rail({ dir, offset }: { dir: 'normal' | 'reverse'; offset: number }) {
  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div className="marquee flex w-max" style={{ '--marquee-dur': '34s', '--marquee-dir': dir } as CSSProperties}>
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 gap-3 pr-3">
            {[...methods, ...methods].map((m, i) => (
              <span key={i} className={`poster wood grid h-20 shrink-0 place-items-center px-7 text-3xl text-ink ${tones[(i + offset) % tones.length]}`}>
                {m}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Trilhos em sentidos opostos (referência #12): as formas de pagamento reais fazem a ponte
 * para o fechamento. Os trilhos param quando saem da tela.
 */
export default function PayRails() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-offscreen', !e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={root} aria-labelledby="pagamento-titulo" className="bg-ink py-14 text-paper sm:py-20">
      <div className="wall-x mb-8 text-center">
        <h2 id="pagamento-titulo" className="wood text-[clamp(2.75rem,6vw,5rem)]">
          Pague do seu jeito
        </h2>
        <p className="mx-auto mt-3 max-w-md text-lg font-semibold text-paper/85">{methods.join(', ')}.</p>
      </div>
      <div className="space-y-3">
        <Rail dir="normal" offset={0} />
        <Rail dir="reverse" offset={2} />
      </div>
    </section>
  )
}
