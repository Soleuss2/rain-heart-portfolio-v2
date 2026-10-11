import type { PointerEvent } from 'react'
import type { Project } from '../../data/portfolio'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import GlitchText from '../arcade/GlitchText'
import Panel from '../ui/Panel'
import { getProjectStatus } from './status'

interface ProjectCardProps {
  project: Project
  unlocked: boolean
  onDiscover: (id: string) => void
  onOpen: (project: Project, trigger: HTMLElement) => void
}

const LINK_CLASS =
  'inline-flex min-h-11 items-center font-pixel text-xs tracking-wider text-ink-dim underline-offset-4 transition-colors hover:text-arc-magenta hover:underline'

export default function ProjectCard({
  project,
  unlocked,
  onDiscover,
  onOpen,
}: ProjectCardProps) {
  const ref = useInViewOnce<HTMLLIElement>(() => onDiscover(project.id))
  const status = getProjectStatus(project)

  // spotlight position goes straight into CSS variables: no React re-render
  const track = (e: PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <li ref={ref} onPointerMove={track} className="h-full">
      <Panel
        title={`PROJECT ${project.number}`}
        tag={
          <span
            className={unlocked ? 'text-arc-green' : 'scan-text text-ink-dim'}
          >
            {unlocked ? 'UNLOCKED' : 'SCANNING'}
          </span>
        }
        glitchHost
        className={`project-card relative h-full ${unlocked ? 'is-unlocked' : ''}`}
        bodyClassName="flex flex-col"
      >
        {/* cartridge label: CSS-drawn, no screenshots needed */}
        <div className="cart-label mb-4 flex h-20 items-end justify-between px-3 py-2">
          <span
            aria-hidden="true"
            className="font-pixel text-4xl leading-none text-line"
          >
            {project.number}
          </span>
          <span
            className={`font-pixel text-[0.65rem] tracking-wider ${status.className}`}
          >
            {status.label}
          </span>
        </div>

        <h3 className="font-pixel text-lg leading-snug text-ink">
          <GlitchText text={project.title.toUpperCase()} trigger="host" />
        </h3>

        <p className="mt-3 text-sm text-ink-dim">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="border border-line px-2 py-0.5 font-mono text-xs text-ink-dim"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-5">
          {/* its ::after stretches over the whole card, so the card is clickable */}
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={(e) => onOpen(project, e.currentTarget)}
            className="card-open min-h-11 cursor-pointer font-pixel text-xs tracking-wider text-arc-cyan"
          >
            <span aria-hidden="true">[ </span>
            OPEN MISSION FILE
            <span className="sr-only"> for {project.title}</span>
            <span aria-hidden="true"> ]</span>
          </button>

          {/* sits above the stretched button so these stay clickable */}
          <div className="relative z-10 flex gap-4">
            {project.links.source && (
              <a
                href={project.links.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
                className={LINK_CLASS}
              >
                SOURCE ↗
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site (opens in a new tab)`}
                className={LINK_CLASS}
              >
                LIVE ↗
              </a>
            )}
          </div>
        </div>
      </Panel>
    </li>
  )
}