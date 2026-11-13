import { useEffect, useRef, type CSSProperties } from 'react'
import { Wordmark } from './Icons'
import { img, tilt } from '../lib'

const links = [
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'É fácil', href: '#facil' },
  { label: 'Planos', href: '#planos' },
  { label: 'Momentos', href: '#momentos' },
  { label: 'Dúvidas', href: '#faq' },
]
const socials = [
  { name: 'Instagram', src: 'instagram.png', href: 'https://www.instagram.com/spotifybrasil/' },
  { name: 'X (Twitter)', src: 'twitter.png', href: 'https://x.com/SpotifyBrasil' },
  { name: 'Facebook', src: 'facebook.png', href: 'https://www.facebook.com/SpotifyBrasil' },
]

/**
 * Fechamento modular (referência #12): a faixa de CTA volta no rodapé, seguida de módulos
 * de links, redes e o aviso educacional, que fica sempre visível.
 */
export default function Footer() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-offscreen', !e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <footer ref={root} className="bg-ink pb-8 pt-10 text-paper">
      <a href="#planos" data-frame className="block overflow-hidden py-2" aria-label="Começar 1 mês grátis">
        <span className="marquee flex w-max" aria-hidden="true" style={{ '--marquee-dur': '26s' } as CSSProperties}>
          {[0, 1].map((half) => (
            <span key={half} className="flex shrink-0 gap-3 pr-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className={`poster wood shrink-0 px-6 py-1 text-[clamp(3rem,9vw,7rem)] leading-[1.15] text-ink ${['bg-yellow', 'bg-green', 'bg-pink', 'bg-paper'][i]}`}>
                  Ouça sem parar
                </span>
              ))}
            </span>
          ))}
        </span>
      </a>

      <div className="wall-x mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div className="poster flex flex-col justify-between gap-8 bg-green p-6 text-ink sm:p-8">
          <a href="#topo" aria-label="Voltar ao topo" className="inline-flex h-11 w-fit items-center">
            <Wordmark className="h-9 text-[16px]" />
          </a>
          <p className="wood text-[clamp(2rem,3.4vw,3rem)] leading-[1.15]">Baixe o app. Depois é só dar o play.</p>
          <a href="https://www.spotify.com/br-pt/download/" target="_blank" rel="noopener noreferrer" className="tape w-fit bg-ink text-paper" style={tilt(-1.5)}>
            Baixar o Spotify
          </a>
        </div>

        <nav aria-label="Rodapé" className="poster bg-paper p-6 text-ink sm:p-8">
          <ul className="grid gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="wood inline-flex min-h-11 items-center text-2xl hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-3 sm:col-span-2 lg:col-span-1">
          <ul className="grid grid-cols-3 gap-3">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="poster grid aspect-square place-items-center bg-paper transition-transform duration-200 ease-(--ease-paste) hover:-translate-y-0.5"
                >
                  <img src={img(s.src)} alt="" width={40} height={40} className="h-10 w-10 object-contain invert" />
                </a>
              </li>
            ))}
          </ul>
          <div className="poster bg-yellow p-6 text-ink">
            <p className="wood text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.2]">Projeto educacional sem vínculo com a Spotify AB</p>
            <p className="mt-3 text-sm">
              Marca, nome e identidade visual pertencem à Spotify AB. Preços são valores de referência para fins de estudo. Fotos de shows: Spotify.
            </p>
          </div>
        </div>
      </div>

      <p className="wall-x mt-8 text-sm text-paper/80">
        © {new Date().getFullYear()} por{' '}
        <a href="https://github.com/gabrielnovaesdev" className="inline-flex min-h-11 items-center font-bold underline hover:text-yellow">
          Gabriel Novaes
        </a>
      </p>
    </footer>
  )
}
