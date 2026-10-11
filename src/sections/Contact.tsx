import { links, profile } from '../data/portfolio'
import Section from '../components/ui/Section'
import Panel from '../components/ui/Panel'
import Reveal from '../components/ui/Reveal'
import GlitchButton from '../components/arcade/GlitchButton'
import ContactForm from '../components/contact/ContactForm'
import CopyEmail from '../components/contact/CopyEmail'

export default function Contact() {
  return (
    <Section id="contact" index="06" title="CONTACT">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="h-full">
          <Panel
            title="TERMINAL"
            tag={profile.systemName}
            accent="green"
            className="h-full"
          >
            <div className="font-mono text-sm">
              <p className="text-arc-green">&gt; ESTABLISH CONNECTION</p>

              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-xs text-ink-dim">TARGET</dt>
                  <dd className="text-arc-cyan">{profile.name.toUpperCase()}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-dim">LOCATION</dt>
                  <dd className="text-ink">{profile.hud.location}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-dim">EMAIL</dt>
                  <dd className="flex flex-wrap items-center gap-x-3">
                    <a
                      href={`mailto:${links.email}`}
                      className="break-all text-ink underline-offset-4 hover:text-arc-cyan hover:underline"
                    >
                      {links.email}
                    </a>
                    <CopyEmail />
                  </dd>
                </div>
              </dl>
            </div>

            <p className="mt-6 text-ink">{profile.availability}</p>

            <p className="mt-6 font-pixel text-[0.65rem] tracking-widest text-ink-dim">
              AVAILABLE CHANNELS
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <GlitchButton label="EMAIL" href={`mailto:${links.email}`} />
              <GlitchButton label="GITHUB" href={links.github} external />
              <GlitchButton label="LINKEDIN" href={links.linkedin} external />
              <GlitchButton label="VIEW RESUME" href={links.resume} external />
            </div>
          </Panel>
        </Reveal>

        <Reveal className="h-full" delay={0.08}>
          <Panel
            title="TRANSMISSION"
            tag="COMPOSE"
            accent="cyan"
            className="h-full"
          >
            <ContactForm />
          </Panel>
        </Reveal>
      </div>
    </Section>
  )
}