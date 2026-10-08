import GlitchText from './GlitchText'

interface GlitchButtonProps {
  label: string
  variant?: 'primary' | 'ghost'
  href?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export default function GlitchButton({
  label,
  variant = 'ghost',
  href,
  external = false,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: GlitchButtonProps) {
  const classes = `arcade-btn arcade-btn--${variant} ${className}`

  const content = (
    <span className="arcade-btn-inner">
      <span aria-hidden="true">[</span>
      <GlitchText text={label} trigger="host" />
      <span aria-hidden="true">]</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </span>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        data-glitch-host
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      data-glitch-host
    >
      {content}
    </button>
  )
}