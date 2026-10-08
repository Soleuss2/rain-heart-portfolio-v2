import type { ReactNode } from 'react'
import GlitchText from '../arcade/GlitchText'

interface SectionProps {
  id: string
  index: string // "02"
  title: string
  className?: string
  children: ReactNode
}

export default function Section({
  id,
  index,
  title,
  className = '',
  children,
}: SectionProps) {
  const headingId = `${id}-title`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-14 px-5 py-20 sm:py-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-pixel text-xs tracking-widest text-arc-green">
          {index} // MODULE
        </p>
        <h2 id={headingId} className="mt-3">
          <GlitchText
            text={title}
            trigger="hover"
            className="font-pixel text-2xl text-ink sm:text-4xl"
          />
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}