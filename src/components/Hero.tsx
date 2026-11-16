import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap, SplitText, useGSAP } from '../lib'
import { ease } from '../motion'
import Symbol3D from './Symbol3D'
import PhoneShot from './PhoneShot'
import Pill from './Pill'
import { IconArrow } from './Icons'
import { Cassette, Equalizer, Headphones, Mic, Note, PlayBtn, Speaker, Vinyl } from './Stickers'

/** Objeto embutido na linha de texto, do tamanho da caixa-alta, com o próprio loop. */
function Inline({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="h-inl relative inline-block h-[0.9em] w-[0.9em] align-[-0.06em]">
      <span className="loop-bob absolute inset-0 block" style={{ '--dur': '4.6s', '--dy': '-6px' } as CSSProperties}>
        {children}
      </span>
    </span>
  )
}

/** Objeto musical posicionado: o invólucro entra (escala/rotação) e o filho faz o loop próprio. */
function Obj({ children, className, style, loop }: { children: ReactNode; className: string; style?: CSSProperties; loop: CSSProperties }) {
  return (
    <div className={`h-obj pointer-events-none absolute ${className}`} style={style}>
      <div className="loop-bob" style={loop}>
        {children}
      </div>
    </div>
  )
}

/** Cópias por coluna do título-rolo (a de cima é a definitiva). */
const REEL = 5

/**
 * Título em letras-rolo (referência: logotipo da slush.app): cada letra é uma coluna recortada
 * com cópias do glifo empilhadas; o rolo desce e assenta na cópia de cima, com atraso e duração
 * próprios por coluna. Sem animação (movimento reduzido), a cópia de cima já é a visível.
 */
function ReelTitle({ text }: { text: string }) {
  return (
    <span aria-hidden="true" className="inline-flex">
      {[...text].map((ch, i) => (
        <span key={i} className="h-col relative inline-block h-[1em] [clip-path:inset(0_-30%_0_-30%)]">
          <span className="h-reel flex flex-col will-change-transform">
            {Array.from({ length: REEL }, (_, k) => (
              <span key={k} className="block h-[1.45em] leading-[1em]">
                {ch}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}

/**
 * Primeira dobra + desdobramento, num único painel claro (referência: hero da slush.app).
 * 1. Símbolo do Spotify em 3D atrás do título, com parallax suave. Entrada: letras-rolo,
 *    subtítulo por partes, CTAs subindo em sequência; objetos musicais entram com escala e
 *    rotação e seguem em loops defasados.
 * 2. Quadro preto que se expande com o scroll; os celulares sobem inclinados e desfocados,
 *    endireitam e ganham nitidez, e saem inclinando para o outro lado.
 * 3. Bloco tipográfico inclinado com as letras revelando conforme o scroll.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', (ctx) => {
        let sub: SplitText | undefined
        let lines: SplitText | undefined
        // o título espera a fonte (sem flash da fonte reserva) e entra já rolando
        gsap.set(['.h-sub', '.h-title', '.h-cta', '.h-sym'], { autoAlpha: 0 })
        gsap.set('.h-obj', { scale: 0, autoAlpha: 0 })
        // rolos já parados na última cópia, à espera da fonte
        gsap.set('.h-reel', { yPercent: (-(REEL - 1) / REEL) * 100 })

        // Tempos medidos na referência (a partir do início do rolo): colunas 0–0,35 s de atraso e
        // ~0,95 s cada; objetos +0,65 s (70 ms entre si); frase palavra a palavra +1,25 s; CTAs +0,4 s.
        const colDelay = [0.12, 0.3, 0, 0.22, 0.06, 0.34, 0.16, 0.26, 0.04]
        const run = () => {
          gsap.set(['.h-sub', '.h-title'], { autoAlpha: 1 })
          sub = SplitText.create('.h-sub', { type: 'words', mask: 'words', aria: 'auto' })
          const tl = gsap.timeline({ defaults: { ease: ease.out } })
          tl.fromTo('.h-sym', { scale: 0.86, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.4 }, 0)
          gsap.utils.toArray<HTMLElement>('.h-reel').forEach((r, i) => {
            tl.to(r, { yPercent: 0, duration: 0.95 + (i % 3) * 0.08, ease: 'expo.inOut' }, colDelay[i % colDelay.length])
          })
          tl.to('.h-obj', { scale: 1, autoAlpha: 1, rotate: 0, duration: 0.85, ease: 'back.out(2.2)', stagger: { each: 0.07, from: 'random' } }, 0.65)
            .fromTo('.h-cta', { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'back.out(1.6)', stagger: 0.09 }, 0.4)
            .from(sub.words, { yPercent: 115, duration: 0.35, ease: 'power3.out', stagger: 0.1 }, 1.25)
            .fromTo('.h-terms', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 1.5)
        }
        // `cancelled`: no modo estrito do React o primeiro contexto é desfeito antes da fonte
        // carregar; sem a trava, a entrada dele rodaria junto e a segunda pararia no meio (apagada)
        let started = false
        let cancelled = false
        const start = () => {
          if (started || cancelled) return
          started = true
          ctx.add(run)
        }
        document.fonts.load('900 1em "Archivo Variable"', 'PREMIUM').then(start, start)
        const fallback = window.setTimeout(start, 900)
        gsap.set('.h-obj', { rotate: (i) => (i % 2 ? 60 : -60) })

        // Parallax da primeira dobra: o símbolo anda mais devagar que o título
        const first = { trigger: '.h-first', start: 'top top', end: 'bottom top', scrub: 0.4 }
        gsap.to('.h-sym', { yPercent: 18, ease: 'none', scrollTrigger: first })
        gsap.to('.h-copy', { y: -140, ease: 'none', scrollTrigger: first })
        gsap.utils.toArray<HTMLElement>('.h-first .h-obj').forEach((o, i) => {
          gsap.to(o, { y: [-90, -40, -130, -60, -110, -30][i % 6], ease: 'none', scrollTrigger: first })
        })

        // Quadro preto: abre na largura e os celulares fazem a trajetória medida na referência
        const fr = { trigger: '.h-frame', start: 'top bottom', end: 'bottom top', scrub: 0.6 }
        gsap.fromTo('.h-frame', { clipPath: 'inset(0% 12% 0% 12% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power1.out', scrollTrigger: { ...fr, end: 'top 15%' } })
        const phones = gsap.timeline({ scrollTrigger: fr, defaults: { ease: 'none' } })
        phones
          .fromTo('.h-ph-l', { yPercent: 70, xPercent: 30, rotate: -32, scale: 0.8, filter: 'blur(10px)', autoAlpha: 0.35 }, { yPercent: 0, xPercent: 0, rotate: -4, scale: 1, filter: 'blur(0px)', autoAlpha: 1, duration: 0.45 }, 0)
          .fromTo('.h-ph-r', { yPercent: 90, xPercent: -30, rotate: 30, scale: 0.8, filter: 'blur(10px)', autoAlpha: 0.35 }, { yPercent: 0, xPercent: 0, rotate: 4, scale: 1, filter: 'blur(0px)', autoAlpha: 1, duration: 0.5 }, 0.04)
          .to('.h-ph-l', { yPercent: -45, rotate: 18, scale: 0.92, duration: 0.45 }, 0.6)
          .to('.h-ph-r', { yPercent: -60, rotate: -16, scale: 0.92, duration: 0.45 }, 0.58)

        // Bloco tipográfico: letras revelam conforme o scroll, no ritmo inclinado da referência
        lines = SplitText.create('.h-type .tw', { type: 'words,chars', aria: 'auto' })
        gsap.from(lines.chars, {
          yPercent: 60,
          rotate: 10,
          autoAlpha: 0,
          ease: 'power2.out',
          stagger: 0.03,
          scrollTrigger: { trigger: '.h-type', start: 'top 85%', end: 'center 50%', scrub: 0.6 },
        })
        // objetos embutidos: saltam para dentro da linha logo depois das letras vizinhas
        gsap.from('.h-inl', {
          scale: 0,
          rotate: (i) => [-40, 30, -25][i % 3],
          ease: 'back.out(2.4)',
          stagger: 0.25,
          scrollTrigger: { trigger: '.h-type', start: 'top 75%', end: 'center 45%', scrub: 0.6 },
        })

        return () => {
          cancelled = true
          window.clearTimeout(fallback)
          sub?.revert()
          lines?.revert()
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="topo" aria-labelledby="hero-titulo" className="panel mt-1.5 bg-mint">
      {/* 1. Primeira dobra */}
      <div className="h-first relative flex min-h-[max(100svh,680px)] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-28 text-center">
        <div className="h-sym pointer-events-none absolute inset-0 grid place-items-center will-change-transform [backface-visibility:hidden]">
          <Symbol3D className="w-[min(96vw,84svh,820px)] max-w-none" />
        </div>

        {/* no celular, os objetos de baixo vão para a faixa livre abaixo dos CTAs */}
        <Obj className="bottom-[7%] left-[8%] w-[22vw] max-w-[110px] sm:hidden" loop={{ '--dur': '9s', '--delay': '-3s', '--r0': '-20deg', '--r1': '10deg', '--dy': '-10px' } as CSSProperties}>
          <Vinyl phase={0.6} />
        </Obj>
        <Obj className="bottom-[8%] right-[10%] w-[17vw] max-w-[90px] sm:hidden" loop={{ '--dur': '4.6s', '--delay': '-0.6s', '--r0': '12deg', '--r1': '-6deg' } as CSSProperties}>
          <Mic phase={0.2} />
        </Obj>
        <Obj className="left-[24%] top-[9%] hidden w-[clamp(48px,6vw,90px)] md:block" loop={{ '--dur': '5.8s', '--delay': '-3.2s', '--r0': '-8deg', '--r1': '14deg', '--dy': '-20px' } as CSSProperties}>
          <Note />
        </Obj>
        <Obj className="right-[26%] bottom-[10%] hidden w-[clamp(48px,6vw,96px)] md:block" loop={{ '--dur': '6.6s', '--delay': '-1.8s', '--r0': '-10deg', '--r1': '6deg' } as CSSProperties}>
          <PlayBtn phase={0.7} />
        </Obj>
        <Obj className="right-[23%] top-[11%] hidden w-[clamp(52px,5.5vw,92px)] lg:block" loop={{ '--dur': '5.4s', '--delay': '-2.2s', '--r0': '10deg', '--r1': '2deg', '--dy': '-12px' } as CSSProperties}>
          <Speaker />
        </Obj>
        <Obj className="left-[25%] bottom-[9%] hidden w-[clamp(60px,6.5vw,110px)] lg:block" loop={{ '--dur': '6.2s', '--delay': '-4s', '--r0': '-6deg', '--r1': '-14deg' } as CSSProperties}>
          <Equalizer />
        </Obj>

        <div className="h-copy relative">
          {/* objetos ancorados ao título, encostando nas letras como na referência */}
          <div className="relative inline-block">
            <h1 id="hero-titulo" className="h-title display text-[min(23vw,6.5rem)] leading-none sm:text-[clamp(4.25rem,17.5vw,17.5rem)] text-ink">
              <span className="sr-only">Spotify Premium</span>
              <ReelTitle text="Premium" />
            </h1>
            <Obj className="-left-[7%] -top-[34%] w-[24%] max-w-[150px] sm:w-[19%]" loop={{ '--dur': '5.2s', '--delay': '-1s', '--r0': '-14deg', '--r1': '-4deg' } as CSSProperties}>
              <Headphones />
            </Obj>
            <Obj className="-right-[6%] -top-[26%] w-[22%] max-w-[136px] sm:w-[17%]" loop={{ '--dur': '6.1s', '--delay': '-2.4s', '--r0': '8deg', '--r1': '18deg', '--dy': '-18px' } as CSSProperties}>
              <Cassette phase={0.3} />
            </Obj>
            <Obj className="-left-[9%] -bottom-[40%] hidden w-[19%] max-w-[150px] sm:block" loop={{ '--dur': '9s', '--delay': '-3s', '--r0': '-20deg', '--r1': '10deg', '--dy': '-10px' } as CSSProperties}>
              <Vinyl />
            </Obj>
            <Obj className="-right-[7%] -bottom-[46%] hidden w-[15%] max-w-[120px] sm:block" loop={{ '--dur': '4.6s', '--delay': '-0.6s', '--r0': '12deg', '--r1': '-6deg' } as CSSProperties}>
              <Mic phase={0.9} />
            </Obj>
          </div>
          <p className="h-sub mt-2 text-[1.3rem] sm:text-[clamp(1.5rem,2.6vw,2.4rem)] font-semibold tracking-tight text-ink">Sua música. Sem anúncio. Sem parar.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Pill href="#planos" data-frame tone="dark" accent="green" size="lg" className="h-cta" icon={<IconArrow className="h-4 w-4" />}>
              Começar 1 mês grátis
            </Pill>
            <Pill href="https://www.spotify.com/br-pt/download/" target="_blank" rel="noopener noreferrer" tone="light" accent="yellow" size="lg" className="h-cta">
              Baixar o app
            </Pill>
          </div>
          <p className="h-terms mx-auto mt-5 max-w-sm text-sm text-ink/70">R$ 0 por 1 mês, depois R$ 21,90/mês. Só Premium Individual, para quem nunca teve Premium.</p>
        </div>
      </div>

      {/* 2. Quadro preto que se expande, com os celulares */}
      <div className="h-frame relative flex h-[min(100svh,880px)] items-center justify-center gap-[4vw] overflow-hidden bg-night px-4">
        <PhoneShot file="iphone3.png" alt="Tela do app: navegar por gêneros e paradas" className="h-ph-l w-[min(40vw,300px)]" />
        <PhoneShot file="iphone1.png" alt="Tela do app: tocando uma música" className="h-ph-r w-[min(40vw,300px)]" />
      </div>

      {/* 3. Bloco tipográfico inclinado */}
      <div className="h-type relative overflow-x-clip px-5 py-24 text-center sm:py-32">
        <Obj className="left-[5%] top-[14%] hidden md:block w-[clamp(56px,8vw,120px)]" loop={{ '--dur': '5s', '--delay': '-2s' } as CSSProperties}>
          <Headphones />
        </Obj>
        <Obj className="right-[6%] bottom-[16%] hidden w-[clamp(56px,6vw,100px)] md:block" loop={{ '--dur': '5.6s', '--delay': '-1.4s', '--r0': '8deg', '--r1': '-4deg' } as CSSProperties}>
          <Speaker phase={0.4} />
        </Obj>
        {/* Linhas com objetos embutidos entre as palavras (referência: bloco "All in" da slush.app) */}
        <h2 className="display-tilt mx-auto max-w-6xl text-[clamp(3.25rem,10.5vw,10rem)] text-ink">
          <span className="block">
            <span className="tw">100</span> <Inline><Vinyl phase={1.1} /></Inline> <span className="tw">milhões</span>
          </span>
          <span className="block">
            <Inline><Note phase={0.5} /></Inline> <span className="tw">de</span> <span className="tw text-green-deep">músicas</span>
          </span>
          <span className="block">
            <span className="tw">sem</span> <span className="tw">anúncio</span> <Inline><Equalizer phase={0.4} /></Inline>
          </span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-lg font-semibold">E mais 7 milhões de podcasts, no celular, no computador e na TV.</p>
        <div className="mt-8 flex justify-center">
          <Pill href="#planos" data-frame tone="dark" accent="pink" icon={<IconArrow className="h-4 w-4" />}>
            Escolher meu plano
          </Pill>
        </div>
      </div>
    </section>
  )
}
