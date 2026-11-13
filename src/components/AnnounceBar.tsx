/**
 * Faixa estreita de anúncio no topo, correndo na horizontal sem costura.
 * Um único link na ordem de foco; as repetições visuais são decorativas.
 */
const item = 'Premium: 1 mês por R$ 0 · Sem anúncios · Ouça offline ·'

export default function AnnounceBar() {
  return (
    <a
      href="#planos"
      className="group relative block h-8 overflow-hidden bg-pink text-ink"
      aria-label="Premium: 1 mês por R$ 0. Ver os planos"
    >
      <span className="marquee flex h-full w-max items-center" aria-hidden="true">
        {[0, 1].map((half) => (
          <span key={half} className="flex shrink-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="wood shrink-0 px-4 text-sm leading-none tracking-wide">
                {item}
              </span>
            ))}
          </span>
        ))}
      </span>
    </a>
  )
}
