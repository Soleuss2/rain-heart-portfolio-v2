import {
  Cpu,
  Gamepad2,
  Mail,
  Terminal,
  Trophy,
  User,
  type LucideIcon,
} from 'lucide-react'
import { navItems, profile } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'
import GlitchText from './GlitchText'
import FxToggle from './FxToggle'

const ICONS: Record<string, LucideIcon> = {
  home: Terminal,
  about: User,
  projects: Gamepad2,
  skills: Cpu,
  achievements: Trophy,
  contact: Mail,
}

// shorter label for the narrow mobile tab bar
const SHORT: Record<string, string> = { achievements: 'AWARDS' }

export default function ArcadeHUD() {
  const active = useActiveSection(navItems.map((n) => n.id))
  useKeyboardNavigation(navItems)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 border-b border-line bg-void/95">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-4 lg:h-14">
          <div className="flex items-center gap-4">
            <a
              href="#home"
              data-glitch-host
              aria-label={`${profile.systemName}, back to top`}
              className="flex min-h-11 items-center"
            >
              <GlitchText
                text={profile.systemName}
                trigger="host"
                className="font-pixel text-sm tracking-wider text-arc-cyan"
              />
            </a>
            <span
              aria-hidden="true"
              className="hidden items-center gap-2 font-pixel text-[0.65rem] tracking-wider text-ink-dim sm:flex"
            >
              <span className="hud-dot" />
              SYSTEM ONLINE
            </span>
          </div>

          {/* desktop links */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      data-glitch-host
                      aria-current={isActive ? 'location' : undefined}
                      aria-keyshortcuts={item.key}
                      className={`relative flex min-h-11 items-center gap-2 px-3 font-pixel text-xs tracking-wider transition-colors ${
                        isActive
                          ? 'text-arc-cyan'
                          : 'text-ink-dim hover:text-ink'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="text-[0.6rem] text-arc-magenta"
                      >
                        {item.key}
                      </span>
                      <GlitchText text={item.label} trigger="host" />
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="hud-underline absolute inset-x-3 bottom-1 h-0.5 bg-arc-cyan"
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <FxToggle />
        </div>
      </header>

      {/* mobile / tablet tab bar */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-void/95 lg:hidden"
      >
        <ul className="mx-auto grid max-w-xl grid-cols-6">
          {navItems.map((item) => {
            const Icon = ICONS[item.id]
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-label={item.label}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex min-h-14 flex-col items-center justify-center gap-1 border-t-2 px-0.5 font-pixel text-[0.6rem] transition-colors ${
                    isActive
                      ? 'border-arc-cyan text-arc-cyan'
                      : 'border-transparent text-ink-dim'
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span aria-hidden="true">
                    {SHORT[item.id] ?? item.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}