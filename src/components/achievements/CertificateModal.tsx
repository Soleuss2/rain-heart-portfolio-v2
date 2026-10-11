import { useId, useRef, type RefObject } from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import type { Certificate } from '../../data/portfolio'
import { useDialog } from '../../hooks/useDialog'
import { useFx } from '../../hooks/useFx'
import GlitchText from '../arcade/GlitchText'
import GlitchButton from '../arcade/GlitchButton'
import Panel from '../ui/Panel'

interface CertificateModalProps {
  certificate: Certificate
  onClose: () => void
  returnFocusRef: RefObject<HTMLElement | null>
}

export default function CertificateModal({
  certificate,
  onClose,
  returnFocusRef,
}: CertificateModalProps) {
  const { level } = useFx()
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const duration = level === 'off' ? 0 : 0.2

  useDialog(dialogRef, onClose, returnFocusRef)

  const openHref = certificate.file ?? certificate.image
  const isPdf = Boolean(certificate.file) && !certificate.image

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-end justify-center bg-void/85 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="w-full max-w-3xl outline-none"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration, ease: 'easeOut' }}
      >
        <Panel
          title="ACHIEVEMENT"
          accent="green"
          tag={
            <button
              type="button"
              onClick={onClose}
              aria-label="Close certificate viewer"
              className="min-h-8 cursor-pointer px-1 transition-colors hover:text-arc-magenta"
            >
              [ X ]
            </button>
          }
        >
          <div className="max-h-[calc(92svh-5rem)] overflow-y-auto pr-1">
            <p className="font-pixel text-xs tracking-widest text-arc-green">
              ACHIEVEMENT UNLOCKED
            </p>
            <h2 id={titleId} className="mt-2">
              <GlitchText
                text={certificate.title.toUpperCase()}
                trigger="mount"
                className="font-pixel text-xl leading-tight text-arc-cyan sm:text-3xl"
              />
            </h2>

            {certificate.issuer && (
              <p className="mt-2 text-sm text-ink-dim">
                Issued by{' '}
                <span className="text-ink">{certificate.issuer}</span>
              </p>
            )}

            {certificate.image ? (
              <img
                src={certificate.image}
                alt={certificate.alt}
                decoding="async"
                className="mx-auto mt-5 max-h-[55svh] w-auto max-w-full border border-line bg-void object-contain"
              />
            ) : (
              <div className="cart-label mt-5 flex flex-col items-center gap-3 px-4 py-10 text-center">
                <FileText
                  size={48}
                  aria-hidden="true"
                  className="text-arc-cyan"
                />
                <p className="font-pixel text-xs tracking-widest text-ink-dim">
                  PDF DOCUMENT
                </p>
                <p className="max-w-sm text-sm text-ink-dim">
                  This certificate is a PDF. Open it in a new tab to view or
                  download it.
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {openHref && (
                <GlitchButton
                  label={isPdf ? 'OPEN PDF' : 'OPEN FULL SIZE'}
                  variant="primary"
                  href={openHref}
                  external
                />
              )}
              <GlitchButton label="CLOSE" onClick={onClose} />
            </div>
          </div>
        </Panel>
      </motion.div>
    </motion.div>
  )
}