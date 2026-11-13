import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, img, prefersReducedMotion } from '../lib'

type Tile = { title: string; from?: string; to?: string; src?: string }

const rowA: Tile[] = [
  { title: 'Top 50 Brasil', from: '#1ed760', to: '#0b5a2a' },
  { title: '', src: 'img1.jpg' },
  { title: 'Funk Hits', from: '#ff4169', to: '#7c26f8' },
  { title: '', src: 'img2.jpg' },
  { title: 'Sertanejo', from: '#ffc864', to: '#e8501b' },
  { title: 'Lo-fi Beats', from: '#5b7cfa', to: '#1d1f5e' },
  { title: '', src: 'img3.jpg' },
  { title: 'Rock Nacional', from: '#3d3d3d', to: '#0d0d0d' },
]
const rowB: Tile[] = [
  { title: 'MPB', from: '#cfb5f7', to: '#5a2ea6' },
  { title: '', src: 'img4.jpg' },
  { title: 'Pagode', from: '#ffd2d7', to: '#d6336c' },
  { title: 'Treino', from: '#c3f53c', to: '#1b7a3a' },
  { title: '', src: 'img2.jpg' },
  { title: 'Foco', from: '#a5c8f2', to: '#24527a' },
  { title: 'Podcasts', from: '#ff8a3d', to: '#8a1e00' },
  { title: '', src: 'img1.jpg' },
]

function TileCard({ t }: { t: Tile }) {
  return (
    <div className="relative aspect-square w-40 shrink-0 overflow-hidden rounded-lg shadow-xl sm:w-52 lg:w-60">
      {t.src ? (
        <img src={img(t.src)} alt="" className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex h-full w-full flex-col justify-between p-4" style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}>
          <svg viewBox="0 0 168 168" className="h-6 w-6 text-white/90" aria-hidden="true">
            <circle cx="84" cy="84" r="84" fill="currentColor" />
          </svg>
          <span className="text-2xl font-black leading-none tracking-tight text-white drop-shadow sm:text-3xl">{t.title}</span>
        </div>
      )}
    </div>
  )
}

function Row({ tiles, reverse = false }: { tiles: Tile[]; reverse?: boolean }) {
  // duplicamos para loop contínuo
  return (
    <div className={`marquee-row flex w-max gap-4 sm:gap-6 ${reverse ? 'marquee-reverse' : ''}`}>
      {[...tiles, ...tiles].map((t, i) => (
        <TileCard key={i} t={t} />
      ))}
    </div>
  )
}

export default function Marquee() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const rows = gsap.utils.toArray<HTMLElement>('.marquee-row')
      const tweens = rows.map((row) => {
        const rev = row.classList.contains('marquee-reverse')
        return gsap.fromTo(
          row,
          { xPercent: rev ? -50 : 0 },
          { xPercent: rev ? 0 : -50, duration: 40, ease: 'none', repeat: -1 },
        )
      })

      // A velocidade do scroll acelera o carrossel e inclina os cards
      const skew = gsap.quickTo(rows, 'skewX', { duration: 0.6, ease: 'power3' })
      const settle = gsap.delayedCall(0.15, () => {
        skew(0)
        tweens.forEach((tw) => gsap.to(tw, { timeScale: 1, duration: 1.2, overwrite: true }))
      }).pause()
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity()
          const boost = 1 + Math.min(Math.abs(v) / 300, 6)
          const dir = self.direction
          tweens.forEach((tw) => gsap.to(tw, { timeScale: boost * dir, duration: 0.3, overwrite: true }))
          skew(gsap.utils.clamp(-8, 8, v / -250))
          settle.restart(true)
        },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label="Playlists em destaque" className="relative overflow-hidden py-16 sm:py-24">
      <div className="space-y-4 sm:space-y-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <Row tiles={rowA} />
        <Row tiles={rowB} reverse />
      </div>
    </section>
  )
}
