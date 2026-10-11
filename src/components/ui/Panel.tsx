import type { ElementType, ReactNode } from 'react'

type Accent = 'dim' | 'cyan' | 'magenta' | 'green'

interface PanelProps {
  title?: string
  tag?: ReactNode
  accent?: Accent
  as?: ElementType
  glitchHost?: boolean
  className?: string
  bodyClassName?: string
  children: ReactNode
}

export default function Panel({
  title,
  tag,
  accent = 'dim',
  as: Tag = 'div',
  glitchHost = false,
  className = '',
  bodyClassName = '',
  children,
}: PanelProps) {
  return (
    <Tag
      className={`panel panel--${accent} ${className}`}
      {...(glitchHost ? { 'data-glitch-host': true } : {})}
    >
      <div className="panel-inner flex flex-col">
        {(title || tag) && (
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2 font-pixel text-xs tracking-wider">
            <span className="text-arc-cyan">{title && `// ${title}`}</span>
            {tag && <span className="text-ink-dim">{tag}</span>}
          </div>
        )}
        <div className={`flex-1 p-4 sm:p-5 ${bodyClassName}`}>{children}</div>
      </div>
    </Tag>
  )
}