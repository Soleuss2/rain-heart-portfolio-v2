import { useEffect, useRef } from 'react'

export function useInViewOnce<T extends Element>(
  onEnter: () => void,
  threshold = 0.35,
) {
  const ref = useRef<T>(null)
  const callback = useRef(onEnter)

  useEffect(() => {
    callback.current = onEnter
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      callback.current()
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          callback.current()
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}