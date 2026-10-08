import { useCallback, useState } from 'react'

const STORAGE_KEY = 'rain-os:boot-seen'
// Bump this string after a big redesign to replay the intro for everyone.
const BOOT_VERSION = '1'

function hasSeenBoot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === BOOT_VERSION
  } catch {
    return false // storage blocked: just show the intro
  }
}

export function useBoot() {
  const [booted, setBooted] = useState(hasSeenBoot)
  // fresh = the visitor just came through the intro in this session
  const [fresh, setFresh] = useState(false)

  const complete = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, BOOT_VERSION)
    } catch {
      /* ignore */
    }
    setFresh(true)
    setBooted(true)
  }, [])

  const replay = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setFresh(false)
    setBooted(false)
  }, [])

  return { booted, fresh, complete, replay }
}