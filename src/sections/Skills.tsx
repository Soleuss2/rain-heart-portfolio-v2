import { skillGroups, type Skill } from '../data/portfolio'
import Section from '../components/ui/Section'
import Panel from '../components/ui/Panel'
import Reveal from '../components/ui/Reveal'
import SkillBar from '../components/ui/SkillBar'

type RatedSkill = Skill & { confidence: number }

export default function Skills() {
  return (
    <Section id="skills" index="04" title="SKILLS">
      <p className="max-w-2xl text-ink-dim">
        Bars show my <span className="text-ink">personal confidence while still
        learning</span> on a 0–5 scale. They're a self-assessment, not a
        measured score. Skills without a bar are ones I use but haven't rated.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {skillGroups.map((group, index) => {
          const rated = group.skills.filter(
            (s): s is RatedSkill => s.confidence !== undefined,
          )
          const unrated = group.skills.filter((s) => s.confidence === undefined)

          return (
            <Reveal key={group.id} className="h-full" delay={(index % 2) * 0.08}>
              <Panel
                title={group.label}
                tag={`${group.skills.length} SKILLS`}
                accent="cyan"
                className="h-full"
              >
                {rated.length > 0 && (
                  <ul className="space-y-1">
                    {rated.map((s) => (
                      <SkillBar
                        key={s.name}
                        name={s.name}
                        confidence={s.confidence}
                      />
                    ))}
                  </ul>
                )}

                {unrated.length > 0 && (
                  <>
                    {rated.length > 0 && (
                      <p className="mb-2 mt-5 font-pixel text-[0.65rem] tracking-widest text-ink-dim">
                        ALSO USING
                      </p>
                    )}
                    <ul className="flex flex-wrap gap-2">
                      {unrated.map((s) => (
                        <li
                          key={s.name}
                          className="border border-line px-2.5 py-1 font-mono text-xs text-ink-dim transition-colors hover:border-arc-cyan hover:text-ink"
                        >
                          {s.name}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Panel>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}