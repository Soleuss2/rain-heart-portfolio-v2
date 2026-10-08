import { useEffect } from 'react'
import type { NavItem } from '../data/portfolio'

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
  )
}

/** Press 1–6 to jump to a section. Never fires while typing or in a modal. */
export function useKeyboardNavigation(items: NavItem[]) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return
      if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return
      if (isTyping(e.target)) return
      if (document.querySelector('[aria-modal="true"]')) return

      const item = items.find((i) => i.key === e.key)
      if (!item) return
      // default behavior follows the CSS scroll-behavior setting,
      // so reduced-motion users get an instant jump
      document.getElementById(item.id)?.scrollIntoView()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [items])
}