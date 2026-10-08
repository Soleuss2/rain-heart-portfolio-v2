import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0])
  // a stable string, so passing a new array each render doesn't re-run the effect
  const key = ids.join('|')

  useEffect(() => {
    const list = key.split('|')
    let frame = 0

    const compute = () => {
      frame = 0
      const marker = window.innerHeight * 0.35
      const atBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4

      let current = list[0]
      if (atBottom) {
        current = list[list.length - 1]
      } else {
        for (const id of list) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= marker) current = id
        }
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [key])

  return active
}