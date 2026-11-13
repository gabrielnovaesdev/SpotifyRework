import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Logo } from './Icons'
import { tilt } from '../lib'

const links = [
  { label: 'Benefícios', href: '#beneficios' },
  { label: 'É fácil', href: '#facil' },
  { label: 'Planos', href: '#planos' },
  { label: 'Momentos', href: '#momentos' },
  { label: 'Dúvidas', href: '#faq' },
]

/**
 * Header persistente que recolhe, como na referência:
 * no topo os links aparecem como etiquetas; ao descer recolhem em cascata e ficam
 * o símbolo, o botão "+" e a fita de ação. Ao subir ou ao abrir pelo "+", voltam em cascata.
 * Mudanças pequenas de direção são amortecidas (8 px) para o header não piscar.
 * No celular a primeira linha fica compacta e os links abrem abaixo dela.
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
    <header className="nav sticky top-0 z-50" data-shown={expanded}>
      <nav className="wall-x flex min-h-16 flex-wrap items-center gap-x-2 py-3" aria-label="Principal">
        <a href="#topo" className="grid h-11 w-11 shrink-0 place-items-center bg-ink text-paper" aria-label="Spotify — início">
          <Logo className="h-6" />
        </a>

        <div className="ml-auto flex items-center gap-2">
          {/* Desktop: etiquetas de papel que recolhem e voltam em cascata */}
          <ul className="nav-links hidden md:flex md:items-center md:gap-2" inert={!expanded}>
            {links.map((l, i) => (
              <li key={l.href} style={{ '--i': i, '--n': links.length } as CSSProperties}>
                <a href={l.href} className="nav-tag">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={toggle}
            type="button"
            className="nav-toggle"
            aria-expanded={expanded}
            aria-controls="nav-mobile"
            aria-label={expanded ? 'Recolher navegação' : 'Mostrar navegação'}
            onClick={() => setExpanded((v) => !v)}
          >
            <span className="nav-toggle__h" />
            <span className="nav-toggle__v" />
          </button>

          <a href="#planos" data-frame className="tape whitespace-nowrap bg-yellow py-2 text-base text-ink" style={tilt(-1.5)}>
            Começar grátis
          </a>
        </div>

        {/* Celular: links distribuídos abaixo da primeira linha quando abertos */}
        <div id="nav-mobile" className="nav-mobile w-full md:hidden" inert={!expanded}>
          <ul className="flex flex-wrap gap-2 pt-3">
            {links.map((l, i) => (
              <li key={l.href} style={{ '--i': i, '--n': links.length } as CSSProperties}>
                <a href={l.href} className="nav-tag" onClick={close}>
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
