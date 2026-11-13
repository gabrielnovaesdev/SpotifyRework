import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Logo } from './Icons'
import Pill from './Pill'

const links = [
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'É fácil', href: '#facil' },
  { label: 'Planos', href: '#planos' },
  { label: 'Momentos', href: '#momentos' },
  { label: 'Dúvidas', href: '#faq' },
]

/**
 * Header flutuante sobre os painéis (referência: slush.app). Símbolo redondo à esquerda;
 * à direita, links em cápsulas, o botão "+" e a ação principal. Ao descer, os links recolhem
 * em cascata; ao subir ou no "+", voltam. "+" vira "−"; Esc fecha e devolve o foco.
 * No celular, a primeira linha fica compacta e os links abrem abaixo dela.
 */
export default function Nav() {
  const [expanded, setExpanded] = useState(true)
  const toggle = useRef<HTMLButtonElement>(null)
  const desktop = useRef(true)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => {
      desktop.current = mq.matches
      setExpanded(mq.matches && window.scrollY < 120)
    }
    sync()
    mq.addEventListener('change', sync)
    let last = window.scrollY
    let acc = 0
    const onScroll = () => {
      const y = window.scrollY
      const d = y - last
      last = y
      acc = Math.sign(d) === Math.sign(acc) ? acc + d : d
      if (acc > 8) setExpanded(false)
      else if (desktop.current && (y < 120 || acc < -8)) setExpanded(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      mq.removeEventListener('change', sync)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setExpanded(false)
      toggle.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

  const close = () => !desktop.current && setExpanded(false)

  return (
    <header className="nav pointer-events-none sticky top-0 z-50 -mb-[74px] h-[74px]" data-shown={expanded}>
      <nav className="pointer-events-auto mx-2 flex flex-wrap items-center gap-2 px-3 py-3 sm:mx-3 sm:px-5" aria-label="Principal">
        <a href="#topo" className="round text-ink" aria-label="Spotify — início">
          <Logo className="h-6" />
        </a>

        <div className="ml-auto flex items-center gap-1.5">
          <ul className="nav-links hidden md:flex md:items-center md:gap-1.5" inert={!expanded}>
            {links.map((l, i) => (
              <li key={l.href} style={{ '--i': i, '--n': links.length } as CSSProperties}>
                <a href={l.href} className="nav-pill">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            ref={toggle}
            type="button"
            className="round"
            aria-expanded={expanded}
            aria-controls="nav-mobile"
            aria-label={expanded ? 'Recolher navegação' : 'Mostrar navegação'}
            onClick={() => setExpanded((v) => !v)}
          >
            <span className="nav-toggle__h" />
            <span className="nav-toggle__v" />
          </button>
          <Pill href="#planos" data-frame tone="dark" accent="green" size="sm">
            Começar grátis
          </Pill>
        </div>

        <div id="nav-mobile" className="nav-mobile w-full md:hidden" inert={!expanded}>
          <ul className="flex flex-wrap gap-1.5 rounded-[24px] bg-paper/0 pt-2">
            {links.map((l, i) => (
              <li key={l.href} style={{ '--i': i, '--n': links.length } as CSSProperties}>
                <a href={l.href} className="nav-pill" onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
