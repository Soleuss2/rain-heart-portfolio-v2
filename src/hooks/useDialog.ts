import { useEffect, useRef, type RefObject } from 'react'

/**
 * Shared modal behavior: locks page scroll, traps Tab inside the dialog,
 * closes on Escape, and returns focus to the opener when it unmounts.
 */
export function useDialog(
  dialogRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  returnFocusRef: RefObject<HTMLElement | null>,
) {
  const closeRef = useRef(onClose)

  useEffect(() => {
    closeRef.current = onClose
  })

  useEffect(() => {
    const dialog = dialogRef.current
    // the opener is stored before the modal mounts, so read it up front
    const returnTo = returnFocusRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeRef.current()
        return
      }
      if (e.key !== 'Tab' || !dialog) return

      const items = Array.from(
        dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      )
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (!dialog.contains(active)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      returnTo?.focus()
    }
  }, [dialogRef, returnFocusRef])
}