import { useLenis } from './hooks/useLenis'
import { useFrameJump } from './hooks/useFrameJump'
import AnnounceBar from './components/AnnounceBar'
import Nav from './components/Nav'
import Hero from './components/Hero'
import HeroUnfold from './components/HeroUnfold'
import BenefitsCarousel from './components/BenefitsCarousel'
import Easy from './components/Easy'
import CtaBands from './components/CtaBands'
import Plans from './components/Plans'
import Moments from './components/Moments'
import Paths from './components/Paths'
import Faq from './components/Faq'
import PayRails from './components/PayRails'
import Footer from './components/Footer'

export default function App() {
  useLenis()
  useFrameJump()
  return (
    <>
      <a href="#conteudo" className="tape sr-only bg-yellow text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]">
        Pular para o conteúdo
      </a>
      <AnnounceBar />
      {/* O header fica fora do palco: na transição de enquadramento ele continua como orientação */}
      <Nav />
      <div id="stage">
        <main id="conteudo">
          <Hero />
          <HeroUnfold />
          <BenefitsCarousel />
          <Easy />
          <CtaBands />
          <Plans />
          <Moments />
          <Paths />
          <Faq />
          <PayRails />
        </main>
        <Footer />
      </div>
    </>
  )
}
