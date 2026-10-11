import { Briefcase, Code, GraduationCap, type LucideIcon } from 'lucide-react'
import { journey, profile, type JourneyEntry } from '../data/portfolio'
import Section from '../components/ui/Section'
import Panel from '../components/ui/Panel'
import Reveal from '../components/ui/Reveal'

const KIND: Record<JourneyEntry['kind'], { icon: LucideIcon; tag: string }> = {
  work: { icon: Briefcase, tag: 'WORK' },
  project: { icon: Code, tag: 'MISSION' },
  education: { icon: GraduationCap, tag: 'EDUCATION' },
}

export default function About() {
  return (
    <Section id="about" index="02" title="ABOUT">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="h-full">
          <Panel title="PLAYER PROFILE" tag="ID CARD" accent="cyan" className="h-full">
            <dl className="space-y-4">
              {Object.entries(profile.profilePanel).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-pixel text-[0.65rem] tracking-widest text-ink-dim">
                    {key.toUpperCase()}
                  </dt>
                  <dd className="mt-0.5 font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </Reveal>

        <Reveal className="h-full" delay={0.08}>
          <Panel title="ABOUT" tag="READ ME" className="h-full">
            <div className="space-y-4 text-ink">
              {profile.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>

      <div className="mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-pixel text-lg text-arc-cyan sm:text-xl">QUEST LOG</h3>
          <p className="font-pixel text-[0.65rem] tracking-widest text-ink-dim">
            LATEST FIRST
          </p>
        </div>

        <ol className="relative ml-2.5 mt-6 border-l border-line">
          {journey.map((entry) => {
            const { icon: Icon, tag } = KIND[entry.kind]
            const current = entry.period.includes('Present')
            return (
              <li key={entry.id} className="relative pb-6 pl-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[9px] top-4 grid size-[17px] place-items-center border bg-void ${
                    current
                      ? 'border-arc-green text-arc-green'
                      : 'border-arc-cyan text-arc-cyan'
                  }`}
                >
                  <Icon size={10} />
                </span>

                <Reveal>
                  <Panel
                    title={entry.period}
                    tag={current ? 'ACTIVE' : tag}
                    accent={current ? 'green' : 'dim'}
                  >
                    <h4 className="font-semibold text-ink">{entry.title}</h4>
                    <p className="text-sm text-ink-dim">{entry.org}</p>
                    {entry.points.length > 0 && (
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-ink-dim marker:text-arc-cyan">
                        {entry.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </Panel>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}