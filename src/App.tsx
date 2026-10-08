import { navItems } from './data/portfolio'
import { useBoot } from './hooks/useBoot'
import { FxProvider } from './components/arcade/FxProvider'
import CRTOverlay from './components/arcade/CRTOverlay'
import FxToggle from './components/arcade/FxToggle'
import BootSequence from './components/arcade/BootSequence'
import ArcadeHUD from './components/arcade/ArcadeHUD'
import Footer from './components/arcade/Footer'
import Hero from './sections/Hero'
import Placeholder from './sections/Placeholder'

// which step builds each section (placeholders only)
const STEP: Record<string, string> = {
  about: 'STEP 6',
  skills: 'STEP 6',
  projects: 'STEP 7',
  achievements: 'STEP 8',
  contact: 'STEP 8',
}

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
        {navItems
          .filter((item) => item.id !== 'home')
          .map((item) => (
            <Placeholder
              key={item.id}
              id={item.id}
              index={`0${navItems.indexOf(item) + 1}`}
              title={item.label}
              step={STEP[item.id]}
            />
          ))}
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