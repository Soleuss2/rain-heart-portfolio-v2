import { useFx, type FxLevel } from '../../hooks/useFx'

const NEXT: Record<FxLevel, FxLevel> = { on: 'low', low: 'off', off: 'on' }

export default function FxToggle({ floating = false }: { floating?: boolean }) {
  const { level, cycle } = useFx()

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`FX: ${level}, visual effects. Press to switch to ${NEXT[level]}.`}
      className={`min-h-11 cursor-pointer border border-line bg-panel px-3 font-pixel text-xs tracking-wider text-arc-cyan transition-colors hover:border-arc-cyan hover:bg-panel-hi ${
        floating ? 'fixed bottom-4 right-4 z-[60]' : ''
      }`}
    >
      [ FX: {level.toUpperCase()} ]
    </button>
  )
}