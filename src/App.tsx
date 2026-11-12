import { useLenis } from './hooks/useLenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Benefits from './components/Benefits'
import Showcase from './components/Showcase'
import ScrubText from './components/ScrubText'
import Plans from './components/Plans'
import FeatureCards from './components/FeatureCards'
import Moments from './components/Moments'
import Spotlight from './components/Spotlight'
import Mascot from './components/Mascot'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  useLenis()
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Benefits />
        <Mascot />
        <FeatureCards />
        <Showcase />
        <ScrubText />
        <Moments />
        <Spotlight />
        <Plans />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
