import PhoneShot from './PhoneShot'

/**
 * "É fácil": um cartaz dominante (Descobrir) com os outros dois colados por cima
 * das bordas dele, em tamanhos e inclinações diferentes. No celular, empilham.
 */
export default function Easy() {
  return (
    <section id="facil" aria-labelledby="facil-titulo" className="wall-x py-16 lg:py-24">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-0">
        {/* Título colado no alto, à esquerda */}
        <div className="poster bg-ink p-6 text-paper sm:p-10 lg:col-span-6 lg:row-start-1 lg:-rotate-1 lg:self-start">
          <h2 id="facil-titulo" className="wood text-[clamp(4rem,11vw,10rem)]">
            É <span className="text-yellow">fácil</span>
          </h2>
          <p className="mt-4 max-w-md text-xl font-semibold">Três gestos e você já está ouvindo. É assim no app:</p>
        </div>

        {/* Cartaz dominante */}
        <div className="poster bg-pink p-6 text-ink sm:p-10 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
          <h3 className="wood text-[clamp(4rem,9vw,8.5rem)]">Descobrir</h3>
          <p className="mt-3 max-w-md text-xl font-semibold leading-snug">
            Toda semana, uma mixtape nova feita com base no que você ouve.
          </p>
          <PhoneShot file="iphone2.png" alt="Tela do app: Descobertas da Semana" className="mt-8 w-[min(78%,300px)]" />
        </div>

        {/* Dois cartazes menores, colados por cima da borda do dominante */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:relative lg:z-10 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:mt-8 lg:gap-4">
          {[
            { word: 'Navegar', line: 'Paradas, gêneros, lançamentos e playlists feitas por quem entende.', phone: 'iphone3.png', bg: 'bg-green', rot: 'lg:rotate-[1.2deg]' },
            { word: 'Ouvir', line: 'Toque, pule e repita o que quiser, até sem internet.', phone: 'iphone1.png', bg: 'bg-yellow', rot: 'lg:-rotate-[0.8deg] lg:translate-y-10' },
          ].map((s) => (
            <div key={s.word} className={`poster ${s.bg} flex flex-col p-6 text-ink sm:p-8 ${s.rot}`}>
              <h3 className="wood text-[clamp(3rem,5vw,4.75rem)]">{s.word}</h3>
              <p className="mt-3 text-lg font-semibold leading-snug">{s.line}</p>
              <PhoneShot file={s.phone} alt={`Tela do app: ${s.word}`} className="mt-6 w-[min(70%,190px)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
