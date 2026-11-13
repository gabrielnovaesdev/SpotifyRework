import { useLenis } from './hooks/useLenis'
import { useFrameJump } from './hooks/useFrameJump'
import { useOffscreen } from './hooks/useOffscreen'
import AnnounceBar from './components/AnnounceBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Easy from './components/Easy'
import BenefitsCarousel from './components/BenefitsCarousel'
import CtaBands from './components/CtaBands'
import Plans from './components/Plans'
import Moments from './components/Moments'
import Paths from './components/Paths'
import AlbumBands from './components/AlbumBands'
import Faq from './components/Faq'
import Footer from './components/Footer'

/** Ordem das seções seguindo a home da slush.app (docs/motion-map.md). */
export default function App() {
  useLenis()
  useFrameJump()
  useOffscreen()
  return (
    <>
      <a href="#conteudo" className="sr-only rounded-full bg-yellow px-5 py-3 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]">
        Pular para o conteúdo
      </a>
      <AnnounceBar />
      {/* O header fica fora do palco: na transição de enquadramento ele continua como orientação */}
      <Nav />
      <div id="stage">
        <main id="conteudo">
          <Hero />
          <Easy />
          <BenefitsCarousel />
          <CtaBands />
          <Plans />
          <Moments />
          <Paths />
          <AlbumBands />
          <Faq />
        </main>
        <Footer />
      </div>
    </>
  )
}
