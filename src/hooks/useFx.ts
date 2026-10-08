import { createContext, useContext } from 'react'

export type FxLevel = 'on' | 'low' | 'off'

export interface FxContextValue {
  level: FxLevel
  setLevel: (level: FxLevel) => void
  cycle: () => void
}

export const FxContext = createContext<FxContextValue | null>(null)

export function useFx(): FxContextValue {
  const ctx = useContext(FxContext)
  if (!ctx) throw new Error('useFx must be used inside <FxProvider>')
  return ctx
}