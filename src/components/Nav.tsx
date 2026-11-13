import { useEffect, useState } from 'react'
import { Wordmark } from './Icons'
import { getLenis } from '../hooks/useLenis'
import { tilt } from '../lib'

const links = [
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'É fácil', href: '#facil' },
  { label: 'Planos', href: '#planos' },
  { label: 'Dúvidas', href: '#faq' },
]

/** Faixa preta colada no topo do muro. */
export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-ink text-paper">
      <nav className="wall-x flex h-16 items-center justify-between" aria-label="Principal">
        <a href="#topo" className="inline-flex h-11 items-center" aria-label="Spotify — início">
          <Wordmark className="h-7 text-[14px]" />
        </a>

        <ul className="hidden items-center md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="wood inline-flex h-11 items-center px-4 text-xl tracking-wide transition-colors hover:text-yellow"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="ml-4">
            <a href="#planos" className="tape bg-yellow py-2 text-base text-ink" style={tilt(-1.5)}>
              Começar grátis
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="relative grid h-11 w-11 place-items-center md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <span className={`absolute h-0.5 w-6 bg-paper transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`absolute h-0.5 w-6 bg-paper transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
        </button>
      </nav>

      <div
        id="menu-mobile"
        inert={!open}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-(--ease-paste) md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <ul className="wall-x min-h-0">
          {[...links, { label: 'Começar grátis', href: '#planos' }].map((l) => (
            <li key={l.label} className="border-t border-paper/15">
              <a href={l.href} onClick={() => setOpen(false)} className="wood block py-4 text-4xl">
                {l.label}
              </a>
            </li>
          ))}
          <li className="h-6" />
        </ul>
      </div>
    </header>
  )
}
