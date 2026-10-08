import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { FxContext, type FxLevel } from '../../hooks/useFx'

const STORAGE_KEY = 'rain-os:fx'
const ORDER: FxLevel[] = ['on', 'low', 'off']

function isFxLevel(value: unknown): value is FxLevel {
  return value === 'on' || value === 'low' || value === 'off'
}

function getInitialLevel(): FxLevel {
  // 1. An explicit choice the visitor made earlier always wins.
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isFxLevel(saved)) return saved
  } catch {
    /* storage blocked: fall through to defaults */
  }
  // 2. Respect the OS "reduce motion" setting.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'off'
  }
  // 3. Phones and tablets get the lighter version.
  if (window.matchMedia('(max-width: 767px), (pointer: coarse)').matches) {
    return 'low'
  }
  return 'on'
}

export function FxProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<FxLevel>(getInitialLevel)

  useEffect(() => {
    document.documentElement.dataset.fx = level
  }, [level])

  const setLevel = useCallback((next: FxLevel) => {
    setLevelState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const cycle = useCallback(() => {
    setLevel(ORDER[(ORDER.indexOf(level) + 1) % ORDER.length])
  }, [level, setLevel])

  const value = useMemo(
    () => ({ level, setLevel, cycle }),
    [level, setLevel, cycle],
  )

  return <FxContext.Provider value={value}>{children}</FxContext.Provider>
}