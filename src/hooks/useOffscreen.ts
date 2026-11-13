import { useEffect } from 'react'

/**
 * Marca com `.is-offscreen` os blocos fora da tela (com folga de meia tela), para que os loops
 * em CSS dos objetos, faixas e bobs parem de gastar quadro onde ninguém está olhando.
 */
export function useOffscreen(selector = '#conteudo > *, footer, .announce') {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('is-offscreen', !e.isIntersecting)),
      { rootMargin: '50% 0px' },
    )
    document.querySelectorAll(selector).forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selector])
}
