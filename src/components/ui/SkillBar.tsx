import { motion } from 'framer-motion'
import { useFx } from '../../hooks/useFx'
import GlitchText from '../arcade/GlitchText'

interface SkillBarProps {
  name: string
  confidence: number // 0–5, personal confidence
}

const CELLS = [0, 1, 2, 3, 4]

export default function SkillBar({ name, confidence }: SkillBarProps) {
  const { level } = useFx()
  const animate = level !== 'off'

  return (
    <li
      data-glitch-host
      className="border-l-2 border-transparent py-2 pl-3 transition-colors hover:border-arc-magenta hover:bg-panel-hi"
    >
      <div className="flex items-baseline justify-between gap-3">
        <GlitchText
          text={name}
          trigger="host"
          className="font-mono text-sm text-ink"
        />
        <span aria-hidden="true" className="font-pixel text-xs text-arc-cyan">
          {confidence.toFixed(1)}
          <span className="text-ink-dim">/5</span>
        </span>
      </div>

      <div
        role="img"
        aria-label={`Personal confidence ${confidence} out of 5`}
        className="mt-2 grid grid-cols-5 gap-1"
      >
        {CELLS.map((i) => {
          const pct = Math.max(0, Math.min(1, confidence - i)) * 100
          return (
            <span key={i} className="block h-2.5 overflow-hidden bg-line/60">
              {pct > 0 &&
                (animate ? (
                  <motion.span
                    className="block h-full origin-left bg-arc-cyan"
                    style={{ width: `${pct}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08, ease: 'easeOut' }}
                  />
                ) : (
                  <span
                    className="block h-full bg-arc-cyan"
                    style={{ width: `${pct}%` }}
                  />
                ))}
            </span>
          )
        })}
      </div>
    </li>
  )
}