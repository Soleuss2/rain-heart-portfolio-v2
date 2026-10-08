import { useCallback, useEffect, useRef, useState } from 'react'
import { profile } from '../../data/portfolio'
import { useFx } from '../../hooks/useFx'
import GlitchText from './GlitchText'
import GlitchButton from './GlitchButton'

interface BootSequenceProps {
  onComplete: () => void
}

const LINES: { label: string; status?: string }[] = [
  { label: 'SYSTEM CHECK', status: 'OK' },
  { label: 'LOADING PROFILE', status: 'OK' },
  { label: 'LOADING PROJECTS', status: 'OK' },
  { label: 'LOADING SKILLS', status: 'OK' },
  { label: 'CONNECTION ESTABLISHED' },
]

// one step per line, plus one final step that reveals the start screen
const STEPS = LINES.length + 1
const FIRST_DELAY_MS = 350
const STEP_MS = 260
const LEAVE_MS = 320

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const { level } = useFx()
  const [step, setStep] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const skipRef = useRef<HTMLButtonElement>(null)
  const startWrap = useRef<HTMLDivElement>(null)
  const [touch] = useState(
    () => window.matchMedia('(pointer: coarse)').matches,
  )

  // FX OFF (including reduced motion): show everything immediately
  const visible = level === 'off' ? STEPS : step
  const ready = visible >= STEPS

  // typing timer: one step at a time, so nothing runs once it's finished
  useEffect(() => {
    if (level === 'off' || step >= STEPS) return
    const id = window.setTimeout(
      () => setStep((n) => n + 1),
      step === 0 ? FIRST_DELAY_MS : STEP_MS,
    )
    return () => window.clearTimeout(id)
  }, [level, step])

  // leave: play the "power off" animation, then hand control back to the app
  const finish = useCallback(() => setLeaving(true), [])

  useEffect(() => {
    if (!leaving) return
    const id = window.setTimeout(onComplete, level === 'off' ? 0 : LEAVE_MS)
    return () => window.clearTimeout(id)
  }, [leaving, level, onComplete])

  // keyboard: Enter or Escape starts / skips. If a button has focus we let
  // its own click handler do the job, so the action never fires twice.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== 'Escape') return
      if (e.target instanceof HTMLElement && e.target.closest('button')) {
        if (e.key === 'Escape') finish()
        return
      }
      e.preventDefault()
      finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finish])

  // focus: Skip on arrival, then the Start button once it appears
  useEffect(() => {
    skipRef.current?.focus()
  }, [])

  useEffect(() => {
    if (ready) startWrap.current?.querySelector('button')?.focus()
  }, [ready])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio startup"
      className={`boot fixed inset-0 z-40 overflow-y-auto bg-void ${
        leaving ? 'boot--leaving' : ''
      }`}
    >
      {!ready && (
        <button
          ref={skipRef}
          type="button"
          onClick={finish}
          className="absolute right-4 top-4 z-10 min-h-11 cursor-pointer px-3 font-pixel text-xs tracking-wider text-ink-dim transition-colors hover:text-arc-cyan"
        >
          [ SKIP ]
        </button>
      )}

      <div className="mx-auto flex min-h-full max-w-xl flex-col justify-center px-5 py-16">
        {/* screen readers get one calm sentence instead of the typing */}
        <p className="sr-only" role="status">
          {ready
            ? 'Startup complete. Press Enter or the start button to continue.'
            : 'Starting up the portfolio.'}
        </p>

        <p
          aria-hidden="true"
          className="font-pixel text-xs tracking-widest text-ink-dim"
        >
          {profile.systemName} {profile.systemVersion} // BOOT
        </p>

        <ul
          aria-hidden="true"
          className="mt-5 space-y-1.5 font-mono text-sm sm:text-base"
        >
          {LINES.slice(0, Math.min(visible, LINES.length)).map((line) => (
            <li key={line.label} className="boot-line flex items-baseline gap-2">
              {line.status ? (
                <>
                  <span className="text-ink">{line.label}</span>
                  <span className="boot-dots" />
                  <span className="text-arc-green">{line.status}</span>
                </>
              ) : (
                <span className="text-arc-cyan">&gt; {line.label}</span>
              )}
            </li>
          ))}
        </ul>

        {ready && (
          <div className="boot-line mt-8">
            <p className="font-pixel text-sm tracking-wider text-arc-green">
              PLAYER DETECTED
            </p>
            <GlitchText
              as="h1"
              text={profile.name.toUpperCase()}
              trigger="mount"
              className="mt-3 font-pixel text-2xl leading-tight text-arc-cyan sm:text-5xl"
            />
            <p className="mt-2 font-pixel text-sm text-arc-magenta sm:text-base">
              {profile.title.toUpperCase()}
            </p>

            <div ref={startWrap} className="mt-8 flex flex-wrap items-center gap-4">
              <GlitchButton
                label={touch ? 'TAP TO START' : 'PRESS ENTER TO START'}
                variant="primary"
                onClick={finish}
              />
              <span
                aria-hidden="true"
                className="boot-cursor font-pixel text-arc-green"
              >
                _
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}