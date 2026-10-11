import { useBoot } from './hooks/useBoot'
import { FxProvider } from './components/arcade/FxProvider'
import CRTOverlay from './components/arcade/CRTOverlay'
import FxToggle from './components/arcade/FxToggle'
import BootSequence from './components/arcade/BootSequence'
import ArcadeHUD from './components/arcade/ArcadeHUD'
import Footer from './components/arcade/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'

function Portfolio({
  fresh,
  onReplayBoot,
}: {
  fresh: boolean
  onReplayBoot: () => void
}) {
  return (
    <>
      <ArcadeHUD />
      {/* power-on animation lives on <main> only: a transform on a parent
          would break the fixed HUD while it plays */}
      <main className={fresh ? 'power-on' : ''}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer onReplayBoot={onReplayBoot} />
    </>
  )
}

function Shell() {
  const { booted, fresh, complete, replay } = useBoot()

  if (!booted) {
    return (
      <>
        <BootSequence onComplete={complete} />
        {/* the HUD isn't mounted during boot, so keep a floating FX toggle */}
        <FxToggle floating />
      </>
    )
  }

  return <Portfolio fresh={fresh} onReplayBoot={replay} />
}

export default function App() {
  return (
    <FxProvider>
      <Shell />
      <CRTOverlay />
    </FxProvider>
  )
}