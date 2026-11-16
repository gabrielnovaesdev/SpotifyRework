import type { CSSProperties, ReactNode } from 'react'
import { Logo, Wordmark } from './Icons'
import ScrollBands from './ScrollBands'
import Pill from './Pill'
import { Headphones, Mic } from './Stickers'

const links = [
  { label: 'Início', href: '#topo' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'É fácil', href: '#facil' },
  { label: 'Planos', href: '#planos' },
  { label: 'Momentos', href: '#momentos' },
  { label: 'Dúvidas', href: '#faq' },
]
const socials: { name: string; href: string; icon: ReactNode }[] = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/spotifybrasil/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/SpotifyBrasil',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
        <path d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@SpotifyBrasil',
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8zM10 15V9l5.2 3L10 15z" />
      </svg>
    ),
  },
  {
    name: 'Spotify no app',
    href: 'https://open.spotify.com/',
    icon: <Logo className="h-7 w-7" />,
  },
]

const band = Array.from({ length: 5 }, (_, i) => (
  <div className={`card flex h-[clamp(72px,9vw,120px)] items-center gap-4 px-6 ${['bg-green', 'bg-yellow', 'bg-pink', 'bg-sky', 'bg-lavender'][i]}`}>
    <span className="display-tilt whitespace-nowrap text-[clamp(2.5rem,6vw,5.5rem)] leading-none text-ink">Ouça sem parar</span>
    <Logo className="h-[clamp(30px,4vw,54px)] shrink-0 text-ink" />
  </div>
))

/**
 * Fechamento modular (referência: rodapé da slush.app): dois painéis de ação, a faixa animada
 * de CTA, cartões quadrados de redes e um painel maior de navegação com o aviso educacional.
 */
export default function Footer() {
  return (
    <footer className="mx-2 mt-3 pb-3 sm:mx-3">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="card relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-yellow p-7 sm:p-10">
          <h2 className="display-tilt origin-left max-w-md text-[clamp(3rem,5vw,4.75rem)]">Baixe o app e dê o play</h2>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="max-w-xs text-base font-semibold">Celular, computador, TV, carro e console.</p>
              <div className="mt-5">
                <Pill href="https://www.spotify.com/br-pt/download/" target="_blank" rel="noopener noreferrer" tone="dark" accent="green" size="sm">
                  Baixar o Spotify
                </Pill>
              </div>
            </div>
            <div className="w-[28%] shrink-0">
              <div className="loop-bob" style={{ '--dur': '5s' } as CSSProperties}>
                <Headphones />
              </div>
            </div>
          </div>
        </div>
        <div className="card relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-yellow p-7 sm:p-10">
          <h2 className="display-tilt origin-left max-w-md text-[clamp(3rem,5vw,4.75rem)]">Sempre aqui para ajudar</h2>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="max-w-xs text-base font-semibold">Respostas rápidas sobre planos, pagamento e cancelamento.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Pill href="#faq" data-frame tone="dark" accent="pink" size="sm">
                  Ler as dúvidas
                </Pill>
                <Pill href="https://support.spotify.com/br-pt/" target="_blank" rel="noopener noreferrer" tone="light" accent="green" size="sm">
                  Suporte Spotify
                </Pill>
              </div>
            </div>
            <div className="w-[24%] shrink-0">
              <div className="loop-bob" style={{ '--dur': '4.4s', '--delay': '-1.5s' } as CSSProperties}>
                <Mic />
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#planos" data-frame aria-label="Começar 1 mês grátis" className="mt-3 block overflow-hidden rounded-[24px] md:rounded-[40px]">
        <ScrollBands rows={[band]} speed={55} />
      </a>

      <div className="mt-3 grid gap-3 lg:grid-cols-[auto_1fr]">
        <ul className="grid grid-cols-4 gap-3 lg:grid-cols-2">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="card grid aspect-square place-items-center bg-paper text-ink transition-[background-color,transform] duration-500 ease-(--ease-spring) hover:-translate-y-1 hover:bg-green lg:w-[120px]"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
        <div className="card grid gap-8 bg-green p-7 sm:p-10 md:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col justify-between gap-8">
            <a href="#topo" aria-label="Voltar ao topo" className="inline-flex h-11 w-fit items-center">
              <Wordmark className="h-9 text-[16px]" />
            </a>
            <p className="display-tilt origin-left text-[clamp(2.25rem,4vw,3.75rem)]">Baixe o Spotify. Depois é só dar o play.</p>
            <p className="max-w-lg text-sm font-semibold">
              Projeto educacional por{' '}
              <a href="https://github.com/gabrielnovaesdev" className="underline">
                Gabriel Novaes
              </a>
              , sem vínculo com a Spotify AB. Marca, nome e identidade visual pertencem à Spotify AB. Preços são valores de referência para fins de estudo.
              Fotos de shows: Spotify. © {new Date().getFullYear()}
            </p>
          </div>
          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-x-6 md:grid-cols-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="inline-flex min-h-11 items-center text-lg font-bold uppercase tracking-wide hover:underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
