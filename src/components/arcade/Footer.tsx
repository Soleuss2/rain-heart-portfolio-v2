import { profile } from '../../data/portfolio'

export default function Footer({ onReplayBoot }: { onReplayBoot: () => void }) {
  return (
    <footer className="border-t border-line px-5 py-6 pb-24 lg:pb-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 font-mono text-xs text-ink-dim">
        <p>
          © 2026 {profile.name} · {profile.systemName} {profile.systemVersion}
        </p>
        <button
          type="button"
          onClick={onReplayBoot}
          className="min-h-11 cursor-pointer px-2 font-pixel tracking-wider transition-colors hover:text-arc-cyan"
        >
          [ REPLAY BOOT ]
        </button>
      </div>
    </footer>
  )
}