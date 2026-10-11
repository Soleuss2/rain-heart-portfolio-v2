import { useCallback, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { certificates, type Certificate } from '../data/portfolio'
import Section from '../components/ui/Section'
import Reveal from '../components/ui/Reveal'
import CertificateCard from '../components/achievements/CertificateCard'
import CertificateModal from '../components/achievements/CertificateModal'

export default function Achievements() {
  const [selected, setSelected] = useState<Certificate | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const open = useCallback((certificate: Certificate, trigger: HTMLElement) => {
    returnFocus.current = trigger
    setSelected(certificate)
  }, [])

  const close = useCallback(() => setSelected(null), [])

  return (
    <Section id="achievements" index="05" title="ACHIEVEMENTS">
            <p className="max-w-2xl text-ink-dim">
        Certificates from courses and trainings I've completed or attended.
        Select one to view it.
      </p>

      <Reveal>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              onOpen={open}
            />
          ))}
        </ul>
      </Reveal>

      <AnimatePresence>
        {selected && (
          <CertificateModal
            key={selected.id}
            certificate={selected}
            onClose={close}
            returnFocusRef={returnFocus}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}