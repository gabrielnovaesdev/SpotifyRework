import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib'

let instance: Lenis | null = null
export const getLenis = () => instance

/**
 * Smooth scroll com Lenis, sincronizado com o ticker do GSAP para que
 * ScrollTrigger e o scroll suave usem exatamente o mesmo frame.
 */
export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, anchors: { offset: -80 } })
    instance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      instance = null
    }
  }, [])
}
