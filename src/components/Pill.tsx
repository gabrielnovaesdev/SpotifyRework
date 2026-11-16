import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Tone = 'dark' | 'light' | 'green'
type Accent = 'green' | 'pink' | 'yellow' | 'lavender' | 'sky'
type Size = 'sm' | 'md' | 'lg'

type Props = {
  children: ReactNode
  tone?: Tone
  accent?: Accent
  size?: Size
  className?: string
  icon?: ReactNode
} & (
  | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'>)
  | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>)
)

/**
 * Cápsula com giro 3D no hover (referência: botões da slush.app): a face da frente sobe e
 * gira no eixo X enquanto a face de trás entra por baixo, na cor de destaque, com o mesmo
 * rótulo. A área clicável (o próprio link/botão) não se move. O rótulo só existe uma vez
 * para leitores de tela; a face de trás é decorativa.
 */
export default function Pill({ children, tone = 'dark', accent = 'green', size = 'md', className = '', icon, ...rest }: Props) {
  const inner = (
    <span className="pill__in">
      <span className="pill__back" aria-hidden="true">
        {children}
        {icon}
      </span>
      <span className="pill__front">
        <span className="pill__bg" />
        <span className="pill__txt">
          {children}
          {icon}
        </span>
      </span>
    </span>
  )
  const cls = `pill ${size === 'sm' ? 'is-sm' : size === 'lg' ? 'is-lg' : ''} ${className}`
  if (rest.href !== undefined) {
    const a = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a {...a} className={cls} data-tone={tone} data-accent={accent}>
        {inner}
      </a>
    )
  }
  const b = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" {...b} className={cls} data-tone={tone} data-accent={accent}>
      {inner}
    </button>
  )
}
