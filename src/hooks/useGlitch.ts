import { useCallback, useEffect, useRef, useState } from 'react'
import { useFx } from './useFx'

const NOISE = '█▓▒░<>/\\|#$%&*+=?01'

/** Replace some characters (never spaces) with random noise. */
function corrupt(text: string, amount: number): string {
  return Array.from(text, (ch) =>
    ch === ' ' || Math.random() > amount
      ? ch
      : NOISE[Math.floor(Math.random() * NOISE.length)],
  ).join('')
}

export function useGlitch(text: string, duration = 450) {
  const { level } = useFx()
  const [scrambled, setScrambled] = useState(text)
  const [active, setActive] = useState(false)
  const timer = useRef<number | null>(null)

  const clear = useCallback(() => {
    if (timer.current !== null) {
      window.clearInterval(timer.current)
      timer.current = null
    }
  }, [])

  const play = useCallback(() => {
    if (level === 'off') return
    clear()
    const start = performance.now()
    const scramble = level === 'on' // LOW = CSS split only, no scrambling

    setActive(true)
    if (scramble) setScrambled(corrupt(text, 0.3))

    timer.current = window.setInterval(() => {
      const t = (performance.now() - start) / duration
      if (t >= 1) {
        clear()
        setActive(false)
        return
      }
      if (scramble) setScrambled(corrupt(text, 0.3 * (1 - t)))
    }, 50)
  }, [level, text, duration, clear])

  // stop the timer if the component unmounts mid-glitch
  useEffect(() => clear, [clear])

  const isActive = active && level !== 'off'
  return {
    shown: isActive && level === 'on' ? scrambled : text,
    active: isActive,
    play,
  }
}