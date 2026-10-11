import { useEffect, useState } from 'react'
import { links } from '../../data/portfolio'

export default function CopyEmail() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(id)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
    } catch {
      /* clipboard blocked: the address is still selectable as text */
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="min-h-11 cursor-pointer px-1 font-pixel text-xs tracking-wider text-ink-dim transition-colors hover:text-arc-cyan"
      >
        [ {copied ? 'COPIED' : 'COPY'} ]
      </button>
      <span role="status" className="sr-only">
        {copied ? 'Email address copied' : ''}
      </span>
    </>
  )
}