import { useId, useState, type FormEvent } from 'react'
import { links } from '../../data/portfolio'
import GlitchButton from '../arcade/GlitchButton'
import CopyEmail from './CopyEmail'

type Status = 'idle' | 'sending' | 'sent' | 'error'

interface Draft {
  name: string
  email: string
  message: string
}

const MAX_MESSAGE = 1500
const LABEL = 'font-pixel text-xs tracking-wider text-ink-dim'

const STATUS: Record<Status, { text: string; className: string }> = {
  idle: {
    text: 'TRANSMISSION READY',
    className: 'border-arc-green text-arc-green',
  },
  sending: {
    text: 'TRANSMITTING...',
    className: 'border-arc-cyan text-arc-cyan',
  },
  sent: {
    text: 'TRANSMISSION SENT · STATUS: SUCCESS',
    className: 'border-arc-green text-arc-green',
  },
  error: {
    text: 'TRANSMISSION FAILED · STATUS: ERROR',
    className: 'border-arc-orange text-arc-orange',
  },
}

export default function ContactForm() {
  const id = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [length, setLength] = useState(0)
  // kept in state so the fallback email link can reuse what was typed
  const [draft, setDraft] = useState<Draft>({ name: '', email: '', message: '' })

  const sending = status === 'sending'

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return

    // grab the form now: e.currentTarget is empty after an await
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    setDraft({ name, email, message })

    // hidden spam-trap field: real visitors never fill it in
    if (data.get('botcheck')) {
      setStatus('sent')
      form.reset()
      setLength(0)
      return
    }

    setStatus('sending')
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 15000)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: links.web3formsKey,
          subject: `Portfolio message from ${name}`,
          from_name: name,
          name,
          email,
          message,
        }),
        signal: controller.signal,
      })
      const result = await res.json()

      if (res.ok && result.success) {
        setStatus('sent')
        form.reset()
        setLength(0)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      window.clearTimeout(timer)
    }
  }

  const fallbackHref = `mailto:${links.email}?subject=${encodeURIComponent(
    `Portfolio message from ${draft.name}`,
  )}&body=${encodeURIComponent(
    `${draft.message}\n\n${draft.name}\nReply to: ${draft.email}`,
  )}`

  const current = STATUS[status]

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label htmlFor={`${id}-name`} className={LABEL}>
          NAME
        </label>
        <div className="field-wrap">
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Your name"
            disabled={sending}
            className="field"
          />
          <span aria-hidden="true" className="field-prompt">
            &gt;
          </span>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={LABEL}>
          EMAIL
        </label>
        <div className="field-wrap">
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            placeholder="you@example.com"
            disabled={sending}
            className="field"
          />
          <span aria-hidden="true" className="field-prompt">
            &gt;
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={`${id}-message`} className={LABEL}>
            MESSAGE
          </label>
          <span
            aria-hidden="true"
            className={`font-mono text-xs ${
              length > MAX_MESSAGE * 0.9 ? 'text-arc-orange' : 'text-ink-dim'
            }`}
          >
            {length}/{MAX_MESSAGE}
          </span>
        </div>
        <div className="field-wrap">
          <textarea
            id={`${id}-message`}
            name="message"
            required
            rows={5}
            maxLength={MAX_MESSAGE}
            placeholder="What are you building?"
            disabled={sending}
            onChange={(e) => setLength(e.currentTarget.value.length)}
            className="field"
          />
          <span aria-hidden="true" className="field-prompt field-prompt--top">
            &gt;
          </span>
        </div>
      </div>

      {/* spam trap: hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <GlitchButton
        label={sending ? 'SENDING...' : 'SEND MESSAGE'}
        variant="primary"
        type="submit"
        disabled={sending}
        className="w-full sm:w-auto"
      />

      <p
        role="status"
        className={`border-l-2 bg-void px-3 py-2 font-pixel text-xs tracking-wider ${current.className}`}
      >
        {current.text}
      </p>

      {status === 'sent' && (
        <p className="text-sm text-ink-dim">
          Thanks for reaching out. Your message was delivered and I'll reply to
          the email you gave.
        </p>
      )}

      {status === 'error' && (
        <div className="text-sm text-ink-dim">
          <p>
            Your message didn't go through. You can{' '}
            <a
              href={fallbackHref}
              className="text-arc-cyan underline underline-offset-4 hover:text-arc-magenta"
            >
              send it from your email app
            </a>{' '}
            or write to me directly at{' '}
            <span className="break-all text-ink">{links.email}</span>.
          </p>
          <CopyEmail />
        </div>
      )}
    </form>
  )
}