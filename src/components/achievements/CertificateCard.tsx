import { FileText } from 'lucide-react'
import type { Certificate } from '../../data/portfolio'
import GlitchText from '../arcade/GlitchText'
import Panel from '../ui/Panel'

interface CertificateCardProps {
  certificate: Certificate
  onOpen: (certificate: Certificate, trigger: HTMLElement) => void
}

export default function CertificateCard({
  certificate,
  onOpen,
}: CertificateCardProps) {
  return (
    <li className="h-full">
      <Panel
        title="ACHIEVEMENT"
        tag={<span className="text-arc-green">UNLOCKED</span>}
        accent="green"
        glitchHost
        className="relative h-full hover:[--edge:var(--color-arc-cyan)] has-[.card-open:focus-visible]:[--edge:var(--color-ink)]"
      >
        <div className="aspect-[4/3] overflow-hidden border border-line bg-void">
          {certificate.image ? (
            <img
              src={certificate.image}
              alt={certificate.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="cart-label flex h-full flex-col items-center justify-center gap-3 border-0">
              <FileText
                size={44}
                aria-hidden="true"
                className="text-arc-cyan"
              />
              <span className="font-pixel text-xs tracking-widest text-ink-dim">
                PDF DOCUMENT
              </span>
            </div>
          )}
        </div>

        <p className="mt-5 font-pixel text-[0.65rem] tracking-widest text-arc-green">
          ACHIEVEMENT UNLOCKED
        </p>
        <h3 className="mt-2 font-pixel text-lg leading-snug text-ink">
          <GlitchText text={certificate.title.toUpperCase()} trigger="host" />
        </h3>

        {certificate.issuer && (
          <>
            <p className="mt-3 font-pixel text-[0.65rem] tracking-widest text-ink-dim">
              ISSUER
            </p>
            <p className="text-sm text-ink">{certificate.issuer}</p>
          </>
        )}

        {/* ::after (from projects.css) stretches this over the whole card */}
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={(e) => onOpen(certificate, e.currentTarget)}
          className="card-open mt-5 min-h-11 cursor-pointer font-pixel text-xs tracking-wider text-arc-cyan"
        >
          <span aria-hidden="true">[ </span>
          VIEW CERTIFICATE
          <span className="sr-only"> for {certificate.title}</span>
          <span aria-hidden="true"> ]</span>
        </button>
      </Panel>
    </li>
  )
}