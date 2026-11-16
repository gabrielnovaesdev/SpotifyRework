import type { ReactNode } from 'react'
import { img } from '../lib'
import ScrollBands from './ScrollBands'
import Pill from './Pill'
import { Logo } from './Icons'

const playlist = (title: string, from: string, to: string): ReactNode => (
  <div className="card flex aspect-square w-[clamp(120px,14vw,200px)] flex-col justify-between p-4" style={{ background: `linear-gradient(140deg, ${from}, ${to})` }}>
    <Logo className="h-6 text-ink" />
    <span className="display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.05] text-ink">{title}</span>
  </div>
)
const cover = (file: string): ReactNode => (
  <div className="card aspect-square w-[clamp(120px,14vw,200px)]">
    <img src={img(file)} alt="" loading="lazy" width={200} height={200} className="h-full w-full object-cover" />
  </div>
)
const rowA = [playlist('Top 50 Brasil', '#1ed760', '#a7d4ff'), cover('img1.jpg'), playlist('Funk Hits', '#ff5ca8', '#ffd731'), cover('img2.jpg'), playlist('Sertanejo', '#ffd731', '#ff6a2b'), cover('capa.png'), playlist('Lo-fi para focar', '#a7d4ff', '#cdbcff')]
const rowB = [cover('img3.jpg'), playlist('MPB', '#cdbcff', '#ff5ca8'), cover('img4.jpg'), playlist('Pagode', '#ff6a2b', '#ffd731'), playlist('Treino', '#1ed760', '#ffd731'), cover('img1.jpg'), playlist('Rock Nacional', '#ffffff', '#a7d4ff')]

/**
 * Faixas de capas (referência: trilhos do ecossistema da slush.app): a mesma mecânica do
 * bloco de CTA, agora com cartões quadrados de capas e playlists.
 */
export default function AlbumBands() {
  return (
    <section aria-labelledby="playlists-titulo" className="panel mt-3 bg-night py-20 text-paper sm:py-28">
      <div className="wrap text-center">
        <h2 id="playlists-titulo" className="mx-auto max-w-2xl text-[clamp(1.9rem,3.4vw,3.25rem)] font-semibold leading-tight tracking-tight">
          Playlists para cada momento, feitas para você
        </h2>
        <div className="mt-7 flex justify-center">
          <Pill href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer" tone="light" accent="green" size="sm">
            Abrir o player web
          </Pill>
        </div>
      </div>
      <ScrollBands rows={[rowA, rowB]} speed={45} className="mt-12" />
    </section>
  )
}
