import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Paste from './components/Paste'
import Easy from './components/Easy'
import Moments from './components/Moments'
import Plans from './components/Plans'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'

export default function App() {
  useLenis()
  return (
    <>
      <a href="#conteudo" className="tape sr-only bg-yellow text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]">
        Pular para o conteúdo
      </a>
      <Nav />
      <main id="conteudo">
        <Hero />
        <Paste />
        <Easy />
        <Moments />
        <Plans />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
