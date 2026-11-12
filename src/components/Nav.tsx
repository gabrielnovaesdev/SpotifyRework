import { useEffect, useState } from 'react'
import { Wordmark } from './Icons'
import { getLenis } from '../hooks/useLenis'

const links = [
  { label: 'Premium', href: '#planos' },
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'Ajuda', href: '#faq' },
  { label: 'Baixar', href: '#cta' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 400 && y > last)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const lenis = getLenis()
    if (open) lenis?.stop()
    else lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-500 ease-(--ease-spring) ${
        hidden && !open ? '-translate-y-full' : 'translate-y-0'
      } ${scrolled || open ? 'bg-black/70 backdrop-blur-xl' : 'bg-transparent'}`}
    >
      <nav className="container-x flex h-16 items-center justify-between lg:h-20" aria-label="Principal">
        <a href="#topo" className="text-white transition-opacity hover:opacity-80" aria-label="Spotify — início">
          <Wordmark className="h-8 text-[15px]" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-[15px] font-bold text-white/90 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-green transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
          <li className="mx-3 h-4 w-px bg-white/40" aria-hidden="true" />
          <li>
            <a href="#planos" className="px-4 py-2 text-[15px] font-bold text-subdued transition-colors hover:text-white">
              Inscrever-se
            </a>
          </li>
          <li>
            <a href="#planos" className="btn btn-light ml-2 px-7 py-2.5 text-[15px]">
              Entrar
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="relative z-10 grid h-11 w-11 place-items-center md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Alternar navegação"
        >
          <span className={`absolute h-0.5 w-6 bg-white transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
          <span className={`absolute h-0.5 w-6 bg-white transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-(--ease-spring) md:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <ul className="container-x min-h-0 space-y-1 pb-0">
          {[...links, { label: 'Inscrever-se', href: '#planos' }, { label: 'Entrar', href: '#planos' }].map((l, i) => (
            <li
              key={l.label}
              className={`transition-[opacity,transform] duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
            >
              <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-3xl font-extrabold tracking-tight">
                {l.label}
              </a>
            </li>
          ))}
          <li className="h-8" />
        </ul>
      </div>
    </header>
  )
}
