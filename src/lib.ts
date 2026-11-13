import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

export { gsap, ScrollTrigger, SplitText, useGSAP }

/** Caminho de um arquivo em public/imagens respeitando o base do Vite. */
export const img = (name: string) => `${import.meta.env.BASE_URL}imagens/${name}`

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Inclinação de um papel colado (também usada pelo hover da fita). */
export const tilt = (deg: number) => ({ '--tilt': `${deg}deg`, rotate: `${deg}deg` }) as import('react').CSSProperties
