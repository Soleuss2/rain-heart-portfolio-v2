import { links, profile } from '../data/portfolio'
import GlitchText from '../components/arcade/GlitchText'
import GlitchButton from '../components/arcade/GlitchButton'
import Panel from '../components/ui/Panel'

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Home"
      className="flex min-h-svh items-center px-5 pb-16 pt-24 lg:pt-28"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <div>
          <p className="font-pixel text-xs tracking-widest text-arc-green">
            PLAYER DETECTED
          </p>

          <GlitchText
            as="h1"
            text={profile.name.toUpperCase()}
            trigger="idle"
            className="mt-4 font-pixel text-2xl leading-tight text-arc-cyan sm:text-5xl lg:text-6xl"
          />

          <p className="mt-3 font-pixel text-sm text-arc-magenta sm:text-lg">
            {profile.title.toUpperCase()}
          </p>

          <p className="mt-8 max-w-xl text-xl font-semibold text-ink sm:text-2xl">
            {profile.tagline}
          </p>
          <p className="mt-4 max-w-xl text-ink-dim">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <GlitchButton
              label="VIEW PROJECTS"
              variant="primary"
              href="#projects"
            />
            <GlitchButton label="ABOUT PLAYER" href="#about" />
            <GlitchButton label="CONTACT" href="#contact" />
            <GlitchButton label="VIEW RESUME" href={links.resume} external />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Panel title="PLAYER 1" tag="ONLINE" accent="cyan">
            <img
              src={profile.portrait}
              alt={profile.portraitAlt}
              width={400}
              height={400}
              fetchPriority="high"
              className="aspect-square w-full object-cover"
            />
          </Panel>

          <Panel title="PLAYER STATUS" tag="LIVE" accent="green">
            <dl className="font-mono text-sm">
              {Object.entries(profile.hud).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-b-0"
                >
                  <dt className="text-xs uppercase text-ink-dim">{key}</dt>
                  <dd
                    className={
                      key === 'status' ? 'text-arc-green' : 'text-arc-cyan'
                    }
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-ink-dim">
              LEVEL = current year level (4th year BSIT), not a skill rating.
            </p>
          </Panel>
        </div>
      </div>
    </section>
  )
}