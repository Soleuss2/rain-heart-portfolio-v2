import { useEffect, useId, useRef, type ReactNode, type RefObject } from 'react'
import { motion } from 'framer-motion'
import type { Project } from '../../data/portfolio'
import { useFx } from '../../hooks/useFx'
import GlitchText from '../arcade/GlitchText'
import GlitchButton from '../arcade/GlitchButton'
import Panel from '../ui/Panel'
import { getProjectStatus } from './status'

interface ProjectModalProps {
  project: Project
  onClose: () => void
  returnFocusRef: RefObject<HTMLElement | null>
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="font-pixel text-[0.65rem] tracking-widest text-ink-dim">
        {label}
      </h3>
      <div className="mt-2">{children}</div>
    </div>
  )
}

export default function ProjectModal({
  project,
  onClose,
  returnFocusRef,
}: ProjectModalProps) {
  const { level } = useFx()
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  const status = getProjectStatus(project)
  const duration = level === 'off' ? 0 : 0.2

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  // lock page scroll, trap focus, close on Escape, restore focus on exit
  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !dialog) return

      const items = Array.from(
        dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      )
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (!dialog.contains(active)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      returnFocusRef.current?.focus()
    }
  }, [returnFocusRef])

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-end justify-center bg-void/85 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeRef.current()
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="w-full max-w-2xl outline-none"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration, ease: 'easeOut' }}
      >
        <Panel
          title={`MISSION ${project.number}`}
          accent="cyan"
          tag={
            <button
              type="button"
              onClick={onClose}
              aria-label="Close mission file"
              className="min-h-8 cursor-pointer px-1 transition-colors hover:text-arc-magenta"
            >
              [ X ]
            </button>
          }
        >
          <div className="max-h-[calc(92svh-5rem)] overflow-y-auto pr-1">
            <p className="font-pixel text-xs tracking-widest text-arc-green">
              MISSION FILE
            </p>
            <h2 id={titleId} className="mt-2">
              <GlitchText
                text={project.title.toUpperCase()}
                trigger="mount"
                className="font-pixel text-2xl leading-tight text-arc-cyan sm:text-3xl"
              />
            </h2>
            <p className="mt-3 font-pixel text-xs tracking-wider">
              <span className="text-ink-dim">STATUS: </span>
              <span className={status.className}>{status.label}</span>
            </p>

            <Block label="OVERVIEW">
              <p className="text-ink">{project.summary}</p>
            </Block>

            <Block label="MY ROLE">
              <p className="font-semibold text-ink">{project.role}</p>
            </Block>

            {project.built.length > 0 && (
              <Block label="WHAT I BUILT">
                <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-dim marker:text-arc-cyan">
                  {project.built.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Block>
            )}

            <Block label="TECHNOLOGY">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="border border-line px-2.5 py-1 font-mono text-xs text-ink-dim"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Block>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live && (
                <GlitchButton
                  label="VIEW LIVE"
                  variant="primary"
                  href={project.links.live}
                  external
                />
              )}
              {project.links.source && (
                <GlitchButton
                  label="VIEW SOURCE"
                  href={project.links.source}
                  external
                />
              )}
              <GlitchButton label="CLOSE" onClick={onClose} />
            </div>
          </div>
        </Panel>
      </motion.div>
    </motion.div>
  )
}