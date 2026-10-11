import { useCallback, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { projects, type Project } from '../data/portfolio'
import { useFx } from '../hooks/useFx'
import Section from '../components/ui/Section'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectModal from '../components/projects/ProjectModal'

export default function Projects() {
  const { level } = useFx()
  const [seen, setSeen] = useState<ReadonlySet<string>>(() => new Set())
  const [selected, setSelected] = useState<Project | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const discover = useCallback((id: string) => {
    setSeen((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
  }, [])

  const open = useCallback(
    (project: Project, trigger: HTMLElement) => {
      returnFocus.current = trigger
      discover(project.id)
      setSelected(project)
    },
    [discover],
  )

  const close = useCallback(() => setSelected(null), [])

  // at FX OFF everything shows as unlocked straight away
  const isUnlocked = (id: string) => level === 'off' || seen.has(id)
  const discovered = projects.filter((p) => isUnlocked(p.id)).length

  return (
    <Section id="projects" index="03" title="PROJECTS">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
        <p className="max-w-xl text-ink-dim">
          Select a project to open its mission file. Everything here is fully
          readable from the start. &ldquo;Discovered&rdquo; just tracks what
          you&rsquo;ve scrolled past.
        </p>

        <div
          className="flex items-center gap-3 font-pixel text-xs tracking-wider"
          role="group"
          aria-label={`Projects discovered: ${discovered} of ${projects.length}`}
        >
          <span className="text-ink-dim">PROJECTS DISCOVERED</span>
          <span className="text-arc-green">
            {discovered}/{projects.length}
          </span>
          <span aria-hidden="true" className="flex gap-1">
            {projects.map((p) => (
              <span
                key={p.id}
                className={`block size-2.5 ${
                  isUnlocked(p.id) ? 'bg-arc-green' : 'bg-line'
                }`}
              />
            ))}
          </span>
        </div>
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            unlocked={isUnlocked(project.id)}
            onDiscover={discover}
            onOpen={open}
          />
        ))}
      </ul>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={close}
            returnFocusRef={returnFocus}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}