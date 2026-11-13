import { Wordmark } from './Icons'
import { img } from '../lib'

const cols = [
  { title: 'Empresa', links: ['Sobre', 'Empregos', 'For the Record'] },
  { title: 'Comunidades', links: ['Para artistas', 'Desenvolvedores', 'Publicidade', 'Investidores', 'Fornecedores'] },
  { title: 'Links úteis', links: ['Suporte', 'Player da web', 'Aplicativo móvel grátis'] },
  { title: 'Planos do Spotify', links: ['Premium Individual', 'Premium Duo', 'Premium Família', 'Premium Universitário', 'Spotify Free'] },
]

const socials = [
  { name: 'Instagram', src: 'instagram.png' },
  { name: 'Twitter', src: 'twitter.png' },
  { name: 'Facebook', src: 'facebook.png' },
]

export default function Footer() {
  return (
    <footer className="bg-black pt-20 pb-10">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.2fr_repeat(4,1fr)_auto]">
          <a href="#topo" aria-label="Voltar ao topo" className="col-span-2 h-fit w-fit text-white lg:col-span-1">
            <Wordmark className="h-10 text-[17px]" />
          </a>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-[13px] font-bold uppercase tracking-[0.12em] text-subdued">{c.title}</h4>
              <ul className="mt-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="inline-flex min-h-11 items-center text-[15px] text-white/90 transition-colors hover:text-green hover:underline">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <ul className="col-span-2 flex h-fit gap-3 lg:col-span-1">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href="#"
                  aria-label={s.name}
                  className="grid h-12 w-12 place-items-center rounded-full bg-highlight transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-[#3e3e3e]"
                >
                  <img src={img(s.src)} alt="" className="h-6 w-6 object-contain" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-10 border-white/10" />
        <div className="flex flex-col justify-between gap-4 text-sm text-subdued sm:flex-row">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {['Legal', 'Centro de Privacidade', 'Política de Privacidade', 'Cookies', 'Acessibilidade'].map((l) => (
              <li key={l}>
                <a href="#" className="inline-flex min-h-11 items-center transition-colors hover:text-white">{l}</a>
              </li>
            ))}
          </ul>
          <p>© {new Date().getFullYear()} Projeto educacional por Gabriel Novaes · sem vínculo com a Spotify AB</p>
        </div>
      </div>
    </footer>
  )
}
