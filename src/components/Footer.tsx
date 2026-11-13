import { Wordmark } from './Icons'

/** Rodapé: a faixa preta no pé do muro, com o aviso educacional sempre visível. */
export default function Footer() {
  return (
    <footer className="bg-ink pb-10 pt-14 text-paper">
      <div className="wall-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <a href="#topo" aria-label="Voltar ao topo" className="inline-flex h-11 w-fit items-center">
            <Wordmark className="h-9 text-[16px]" />
          </a>
          <p className="wood max-w-2xl text-[clamp(1.75rem,3vw,2.5rem)] text-yellow">
            Projeto educacional sem vínculo com a Spotify AB
          </p>
        </div>
        <hr className="my-8 border-paper/20" />
        <div className="flex flex-col justify-between gap-4 text-sm text-paper/80 sm:flex-row">
          <p>
            Marca, nome e identidade visual pertencem à Spotify AB. Preços são valores de referência para fins de estudo. Fotos de
            shows: Spotify.
          </p>
          <p className="shrink-0">
            © {new Date().getFullYear()} por{' '}
            <a href="https://github.com/gabrielnovaesdev" className="inline-flex min-h-11 items-center font-bold underline hover:text-yellow">
              Gabriel Novaes
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
