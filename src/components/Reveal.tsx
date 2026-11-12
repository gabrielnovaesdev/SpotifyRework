import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText, useGSAP } from '../lib'

/** Título que revela linha a linha (máscara) quando entra na viewport. */
export function RevealHeading({
  as: Tag = 'h2',
  className = '',
  children,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const split = SplitText.create(ref.current, { type: 'lines,words', mask: 'lines', autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 120,
              duration: 1.1,
              ease: 'expo.out',
              stagger: 0.04,
              scrollTrigger: { trigger: ref.current, start: 'top 85%' },
            }),
        })
        return () => split.revert()
      })
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
