import { useEffect } from 'react'
import { gsap, prefersReducedMotion } from '../lib'
import { dur } from '../motion'
import { getLenis } from './useLenis'

/**
 * Transição de enquadramento (referência #13, troca de rota da slush.app adaptada a uma página única):
 * num link marcado com data-frame que aponta para uma âncora, a página encolhe para um quadro
 * central sobre fundo preto, dois painéis coloridos entram nas laterais em perspectiva, o conteúdo
 * troca para a seção de destino e o quadro expande de volta. O header fica por cima como orientação.
 *
 * Não interfere em: clique com Ctrl/Cmd/Shift/Alt ou botão do meio (nova aba), links externos,
 * movimento reduzido (âncora normal) e cliques repetidos durante a transição (ignorados).
 * Mantém a URL com o hash (histórico e botão voltar) e move o foco para a seção de destino.
 */
export function useFrameJump(stageSelector = '#stage') {
  useEffect(() => {
    let busy = false

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[data-frame]')
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const hash = a.getAttribute('href') ?? ''
      if (!hash.startsWith('#')) return
      const target = document.querySelector<HTMLElement>(hash)
      const stage = document.querySelector<HTMLElement>(stageSelector)
      if (!target || !stage || prefersReducedMotion()) return
      // captura + parar a propagação: o Lenis também trata cliques de âncora e rolaria por conta própria
      e.preventDefault()
      e.stopImmediatePropagation()
      if (busy) return
      busy = true

      const lenis = getLenis()
      const left = document.createElement('div')
      const right = document.createElement('div')
      left.className = 'fj-side fj-left'
      right.className = 'fj-side fj-right'
      document.body.append(left, right)
      document.documentElement.classList.add('fj-on')

      // Medidas feitas antes de encolher (com o palco em escala 1)
      const stageTop = stage.getBoundingClientRect().top + window.scrollY
      const targetY = target.getBoundingClientRect().top + window.scrollY - 72
      const originY = () => `${window.scrollY + window.innerHeight / 2 - stageTop}px`
      gsap.set(stage, { transformOrigin: `50% ${originY()}` })

      const jump = () => {
        if (lenis) lenis.scrollTo(targetY, { immediate: true, force: true })
        else window.scrollTo(0, targetY)
        gsap.set(stage, { transformOrigin: `50% ${originY()}` })
        history.pushState(null, '', hash)
      }

      gsap
        .timeline({
          defaults: { ease: 'power3.inOut' },
          onComplete: () => {
            gsap.set(stage, { clearProps: 'transform,transformOrigin,opacity' })
            left.remove()
            right.remove()
            document.documentElement.classList.remove('fj-on')
            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
            target.focus({ preventScroll: true })
            busy = false
          },
        })
        .to(stage, { scale: 0.62, duration: dur.frameIn })
        .fromTo(left, { xPercent: -110, rotateY: 40, transformPerspective: 700 }, { xPercent: 0, rotateY: 28, duration: dur.frameIn }, 0.08)
        .fromTo(right, { xPercent: 110, rotateY: -40, transformPerspective: 700 }, { xPercent: 0, rotateY: -28, duration: dur.frameIn }, 0.08)
        .to(stage, { opacity: 0, duration: 0.14, ease: 'none' }, `+=${dur.frameHold * 0.35}`)
        .add(jump)
        .to(stage, { opacity: 1, duration: 0.16, ease: 'none' })
        .to(stage, { scale: 1, duration: dur.frameOut }, `+=${dur.frameHold * 0.35}`)
        .to(left, { xPercent: -110, duration: dur.frameOut }, '<')
        .to(right, { xPercent: 110, duration: dur.frameOut }, '<')
    }

    window.addEventListener('click', onClick, true)
    return () => window.removeEventListener('click', onClick, true)
  }, [stageSelector])
}
