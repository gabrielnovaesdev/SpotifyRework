import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, img } from '../lib'
import { Logo } from './Icons'
import { RevealHeading } from './Reveal'

type Card = { title: string; premium?: boolean; color: string; graphic: ReactNode }
type Group = { id: string; title: string; subtitle: string; cards: Card[] }

/* ---------- Gráficos de cada card (animados quando o card fica ativo) ---------- */

function DjGraphic() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[linear-gradient(170deg,#0a5ad0_0%,#03306f_100%)] shadow-[inset_0_0_60px_rgba(255,255,255,0.08)]">
      <svg viewBox="0 0 200 200" className="fc-anim absolute left-1/2 top-[44%] w-[62%] -translate-x-1/2 -translate-y-1/2 overflow-visible">
        <defs>
          <filter id="dj-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle className="dj-ring" cx="100" cy="100" r="78" fill="none" stroke="#1ee88a" strokeWidth="9" filter="url(#dj-glow)" strokeDasharray="490" strokeDashoffset="0" />
        {/* adesivo "descolando" */}
        <path className="dj-peel" d="M118 24c10 2 14 14 20 22 6 9 18 8 26 14-4-18-20-32-46-36z" fill="#3fb8d8" opacity="0.9" />
      </svg>
      <p className="dj-text absolute inset-x-[12%] bottom-[9%] text-center text-[clamp(0.85rem,1.3vw,1.05rem)] font-bold leading-snug text-[#1ee88a]">
        Que tal começar a manhã com algumas das suas faixas favoritas do momento?
      </p>
    </div>
  )
}

function WrappedGraphic() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#c6f432]">
      <div className="fc-anim absolute -left-[10%] top-[6%] rotate-[-8deg] text-[clamp(5rem,11vw,9rem)] font-black leading-[0.8] tracking-[-0.07em] text-[#1d2a00]">
        2026
      </div>
      <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-[#ff4bd8]" />
      <div className="absolute bottom-[-30px] left-[20%] h-28 w-[70%] -rotate-6 rounded-full bg-[#2d46b9]" />
      <div className="wr-card absolute bottom-[10%] left-1/2 w-[72%] -translate-x-1/2 rounded-2xl bg-black p-4 text-white shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-[#c6f432]">Seus minutos ouvidos</p>
        <p className="mt-1 text-[clamp(1.75rem,3vw,2.5rem)] font-black tracking-tight">
          <span className="wr-count">48.392</span>
        </p>
        <div className="mt-3 flex h-10 items-end gap-1">
          {[40, 65, 50, 90, 72, 100, 58, 80, 45, 70, 95, 60].map((h, i) => (
            <span key={i} className="wr-bar flex-1 origin-bottom rounded-sm bg-[#c6f432]" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function DaylistGraphic() {
  const moods = ['indie chill', 'pop dançante', 'lo-fi focado', 'samba nostálgico']
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[conic-gradient(from_200deg_at_30%_40%,#ff9be0,#7358ff,#4bd3ff,#ffd36e,#ff9be0)]">
      <div className="dl-blob absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.55),transparent_45%)] mix-blend-soft-light" />
      <div className="fc-anim absolute inset-x-[10%] top-[14%] rounded-2xl bg-white/15 p-5 ring-1 ring-white/30 backdrop-blur-md">
        <p className="text-sm font-bold text-white/80">daylist •</p>
        <div className="relative mt-1 h-[2.6em] overflow-hidden text-[clamp(1.5rem,2.6vw,2.25rem)] font-black leading-[1.2] tracking-tight text-white">
          {moods.map((m) => (
            <span key={m} className="dl-mood absolute inset-x-0 top-0 [&:not(:first-child)]:invisible">
              {m}
              <br />
              quinta à noite
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-[10%] bottom-[10%] space-y-2">
        {['img1.jpg', 'img2.jpg', 'img3.jpg'].map((s, i) => (
          <div key={s} className="dl-row flex items-center gap-3 rounded-xl bg-black/25 p-2 backdrop-blur" style={{ opacity: 1 - i * 0.2 }}>
            <img src={img(s)} alt="" className="h-10 w-10 rounded-md object-cover" loading="lazy" />
            <span className="h-2 w-1/2 rounded-full bg-white/70" />
          </div>
        ))}
      </div>
    </div>
  )
}

function JamGraphic() {
  const people = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'capa.png']
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#e64fc7,#7a0f63)]">
      <div className="fc-anim jam-orbit absolute left-1/2 top-[42%] aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-white/30">
        {people.map((p, i) => {
          const a = (i / people.length) * Math.PI * 2
          return (
            <img
              key={p}
              src={img(p)}
              alt=""
              loading="lazy"
              className="jam-avatar absolute h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover ring-4 ring-[#cc2faf]"
              style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}
            />
          )
        })}
        <div className="absolute inset-[30%] grid place-items-center rounded-full bg-black text-white">
          <Logo className="h-1/2" />
        </div>
      </div>
      <div className="absolute inset-x-[10%] bottom-[8%] flex items-center gap-3 rounded-2xl bg-black/80 p-3 text-white">
        <span className="flex h-6 items-end gap-0.5" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="jam-eq block h-full w-1 origin-bottom rounded-full bg-[#1ed760]" style={{ animation: `eq 0.9s ${i * 0.15}s ease-in-out infinite` }} />
          ))}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">Jam do Gabriel</p>
          <p className="text-xs text-white/60">5 pessoas ouvindo agora</p>
        </div>
      </div>
    </div>
  )
}

function MatchGraphic() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#10b48d,#03473a)]">
      <div className="fc-anim absolute left-1/2 top-[40%] flex -translate-x-1/2 -translate-y-1/2 items-center">
        <img src={img('img2.jpg')} alt="" loading="lazy" className="mt-left h-[clamp(6rem,12vw,10rem)] w-[clamp(6rem,12vw,10rem)] rounded-full object-cover ring-4 ring-[#088569]" />
        <img src={img('img4.jpg')} alt="" loading="lazy" className="mt-right -ml-8 h-[clamp(6rem,12vw,10rem)] w-[clamp(6rem,12vw,10rem)] rounded-full object-cover ring-4 ring-[#088569]" />
      </div>
      <div className="absolute inset-x-0 bottom-[12%] text-center text-white">
        <p className="text-[clamp(3rem,6vw,5rem)] font-black leading-none tracking-[-0.04em]">
          <span className="mt-count">92</span>%
        </p>
        <p className="mt-2 text-sm font-bold uppercase tracking-widest text-white/70">de gosto em comum</p>
      </div>
    </div>
  )
}

const groups: Group[] = [
  {
    id: 'descobrir',
    title: 'Novas formas de descobrir música',
    subtitle: 'Feito para você, com você.',
    cards: [
      { title: 'O DJ toca faixas com a sua cara', premium: true, color: '#0d72ea', graphic: <DjGraphic /> },
      { title: 'Sua Retrospectiva no final do ano', color: '#5f8008', graphic: <WrappedGraphic /> },
      { title: 'Crie a trilha sonora do seu astral com a daylist', color: '#7358ff', graphic: <DaylistGraphic /> },
    ],
  },
  {
    id: 'galera',
    title: 'O melhor lugar para ouvir música com a galera',
    subtitle: 'Seus amigos e familiares já estão aqui. Colaborando, compartilhando e ouvindo juntos.',
    cards: [
      { title: 'Ouça qualquer música com a galera em tempo real em uma Jam', premium: true, color: '#cc2faf', graphic: <JamGraphic /> },
      { title: 'Descubra se você tem o gosto parecido daquela pessoa com o Match', color: '#088569', graphic: <MatchGraphic /> },
    ],
  },
]

/** Animação "de vida" de cada gráfico, disparada quando o card chega ao topo. */
function playGraphic(card: HTMLElement) {
  const q = gsap.utils.selector(card)
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
  tl.fromTo(q('.fc-anim'), { scale: 0.85, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.1 })
  if (q('.dj-ring').length) {
    tl.fromTo(q('.dj-ring'), { strokeDashoffset: 490 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power3.inOut' }, 0)
      .fromTo(q('.dj-peel'), { scale: 0, transformOrigin: '0% 0%' }, { scale: 1, duration: 0.8, ease: 'back.out(2)' }, 1.1)
      .fromTo(q('.dj-text'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power2.inOut' }, 0.6)
  }
  if (q('.wr-count').length) {
    const el = q('.wr-count')[0]
    const n = { v: 0 }
    tl.to(n, { v: 48392, duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = Math.round(n.v).toLocaleString('pt-BR')) }, 0.2)
      .fromTo(q('.wr-bar'), { scaleY: 0 }, { scaleY: 1, stagger: 0.04, duration: 0.8 }, 0.3)
      .fromTo(q('.wr-card'), { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0)
  }
  if (q('.dl-row').length) {
    tl.fromTo(q('.dl-row'), { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: (i: number) => 1 - i * 0.2, stagger: 0.1, duration: 0.9 }, 0.3)
  }
  if (q('.jam-avatar').length) {
    tl.fromTo(q('.jam-avatar'), { scale: 0 }, { scale: 1, stagger: 0.08, duration: 0.8, ease: 'back.out(2)' }, 0.2)
  }
  if (q('.mt-count').length) {
    const el = q('.mt-count')[0]
    const n = { v: 0 }
    tl.fromTo(q('.mt-left'), { x: -80 }, { x: 0, duration: 1.2 }, 0)
      .fromTo(q('.mt-right'), { x: 80 }, { x: 0, duration: 1.2 }, 0)
      .to(n, { v: 92, duration: 1.6, ease: 'power3.out', onUpdate: () => (el.textContent = String(Math.round(n.v))) }, 0.2)
  }
}

function CardGroup({ group }: { group: Group }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const $ = (sel: string) => Array.from(root.current!.querySelectorAll<HTMLElement>(sel))
        const cards = $('.fc-item')
        const inners = $('.fc-card')
        const dots = $('.fc-dot')

        // daylist: o "astral" troca sozinho
        const moods = $('.dl-mood')
        if (moods.length) {
          gsap.set(moods, { yPercent: 110, autoAlpha: 1 })
          gsap.set(moods[0], { yPercent: 0 })
          const loop = gsap.timeline({ repeat: -1, defaults: { duration: 0.8, ease: 'expo.inOut' } })
          moods.forEach((m, i) => {
            loop.to(m, { yPercent: -110 }, '+=1.8').fromTo(moods[(i + 1) % moods.length], { yPercent: 110 }, { yPercent: 0 }, '<')
          })
        }

        inners.forEach((card, i) => {
          // Gráfico ganha vida quando o card encosta no topo (e repete ao voltar)
          gsap.set(card.querySelectorAll('.fc-anim'), { autoAlpha: 0 })
          gsap.timeline({
            scrollTrigger: {
              trigger: cards[i],
              start: 'top 70%',
              onEnter: () => playGraphic(card),
              onEnterBack: () => playGraphic(card),
              onToggle: (self) => self.isActive && dots.forEach((d, j) => d.classList.toggle('is-on', j === i)),
              end: 'bottom 70%',
            },
          })

          // Card anterior recua, escurece e desfoca quando o próximo sobe por cima (melhoria sobre o original)
          const next = cards[i + 1]
          if (!next) return
          const depth = inners.length - 1 - i
          gsap.fromTo(card, { scale: 1, filter: 'brightness(1) blur(0px)', rotateX: 0 }, {
            scale: 1 - 0.05 * depth,
            filter: 'brightness(0.6) blur(2px)',
            rotateX: 4,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top 70%', end: 'top 15%', scrub: true },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id={group.id} className="container-x relative py-20 sm:py-28">
      <header className="mx-auto max-w-[1105px] text-center">
        <RevealHeading className="text-[clamp(2.25rem,5vw,4rem)] font-black leading-[1.02] tracking-[-0.04em]">
          {group.title}
        </RevealHeading>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-white/75 sm:text-xl">{group.subtitle}</p>
      </header>

      <div className="relative mx-auto mt-12 max-w-[1105px]">
        {/* Indicador lateral de progresso */}
        <ol className="pointer-events-none absolute -left-10 top-0 hidden h-full xl:block" aria-hidden="true">
          <li className="sticky top-[40vh] flex flex-col gap-2">
            {group.cards.map((c) => (
              <span key={c.title} className="fc-dot block h-6 w-1 rounded-full bg-white/20 transition-all duration-500 [&.is-on]:h-12 [&.is-on]:bg-white" />
            ))}
          </li>
        </ol>

        <ul className="space-y-[12vh] [perspective:1400px]">
          {group.cards.map((c, i) => (
            <li key={c.title} className="fc-item sticky" style={{ top: `calc(13vh + ${i * 18}px)` }}>
              <article
                className="fc-card grid origin-top overflow-hidden rounded-3xl md:h-[min(68vh,520px)] md:grid-cols-[1.3fr_1fr]"
                style={{ backgroundColor: c.color }}
              >
                {/* Painel "vaza" pela borda de baixo do card, como na referência */}
                <div className="fc-graphic relative h-[340px] px-5 pt-5 sm:h-[400px] md:h-full md:px-10 md:pt-8">
                  <div className="h-full md:h-[calc(100%+28px)]">{c.graphic}</div>
                </div>
                <div className="flex items-center p-7 pt-2 md:p-12">
                  <div>
                    {c.premium && (
                      <span className="inline-flex items-center gap-1.5 text-base font-extrabold">
                        <Logo className="h-4" /> Premium
                      </span>
                    )}
                    <h3 className="mt-2 text-[clamp(1.75rem,3vw,2.6rem)] font-extrabold leading-[1.08] tracking-[-0.03em]">{c.title}</h3>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function FeatureCards() {
  return (
    <>
      {groups.map((g) => (
        <CardGroup key={g.id} group={g} />
      ))}
    </>
  )
}
