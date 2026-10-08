import Section from '../components/ui/Section'
import Panel from '../components/ui/Panel'

interface PlaceholderProps {
  id: string
  index: string
  title: string
  step: string
}

export default function Placeholder({ id, index, title, step }: PlaceholderProps) {
  return (
    <Section id={id} index={index} title={title} className="min-h-[70svh]">
      <Panel title="UNDER CONSTRUCTION" tag={step} accent="magenta">
        <p className="text-ink-dim">
          This module is built in {step}. The navigation, active indicator and
          keyboard shortcut for it already work.
        </p>
      </Panel>
    </Section>
  )
}