import { useEffect, useRef, type ElementType } from 'react'
import { useFx } from '../../hooks/useFx'
import { useGlitch } from '../../hooks/useGlitch'

type Trigger = 'hover' | 'mount' | 'idle' | 'host' | 'none'

interface GlitchTextProps {
  text: string
  as?: ElementType
  trigger?: Trigger
  className?: string
  duration?: number
}

export default function GlitchText({
  text,
  as: Tag = 'span',
  trigger = 'hover',
  className = '',
  duration,
}: GlitchTextProps) {
  const { level } = useFx()
  const { shown, active, play } = useGlitch(text, duration)
  const ref = useRef<HTMLElement>(null)

  // trigger="mount": play once shortly after appearing
  useEffect(() => {
    if (trigger !== 'mount') return
    const id = window.setTimeout(play, 150)
    return () => window.clearTimeout(id)
  }, [trigger, play])

  // trigger="idle": occasional random glitch, only at FX level ON
  useEffect(() => {
    if (trigger !== 'idle' || level !== 'on') return
    let id = 0
    const schedule = () => {
      id = window.setTimeout(() => {
        play()
        schedule()
      }, 5000 + Math.random() * 5000)
    }
    schedule()
    return () => window.clearTimeout(id)
  }, [trigger, level, play])

  // trigger="host": react to hover/focus on a parent [data-glitch-host]
  useEffect(() => {
    if (trigger !== 'host') return
    const host = ref.current?.closest('[data-glitch-host]')
    if (!host) return
    host.addEventListener('pointerenter', play)
    host.addEventListener('focusin', play)
    return () => {
      host.removeEventListener('pointerenter', play)
      host.removeEventListener('focusin', play)
    }
  }, [trigger, play])

  const ownHover = trigger === 'hover' || trigger === 'idle'

  return (
    <Tag
      ref={ref}
      className={`glitch ${active ? 'is-glitching' : ''} ${className}`}
      onPointerEnter={ownHover ? play : undefined}
    >
      {/* real text for screen readers */}
      <span className="sr-only">{text}</span>
      {/* invisible copy: reserves the exact width so scrambling never shifts layout */}
      <span className="glitch-size" aria-hidden="true">
        {text}
      </span>
      {/* visible layer, with RGB-split copies drawn by CSS pseudo-elements */}
      <span className="glitch-face" aria-hidden="true" data-text={shown}>
        {shown}
      </span>
    </Tag>
  )
}