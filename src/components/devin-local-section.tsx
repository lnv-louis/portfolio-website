import * as stylex from '@stylexjs/stylex'
import { HugeiconsIcon } from '@hugeicons/react'
import ArrowUpRight01Icon from '@hugeicons/core-free-icons/ArrowUpRight01Icon'

import { devinStyles as styles } from '@/components/devin-local-section.stylex'
import { DEVIN_LOCAL } from '@/content/hackathons'

const FACTS = [
  { label: 'Date', value: DEVIN_LOCAL.date },
  { label: 'Attended', value: DEVIN_LOCAL.attended },
  { label: 'Role', value: 'Host for Cognition' },
]

export function DevinLocalSection() {
  return (
    <section id="devin-local" aria-labelledby="devin-local-heading" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.copy)}>
        <h2 id="devin-local-heading" {...stylex.props(styles.heading)}>
          Hosting Devin Local for Cognition.
        </h2>
        <p {...stylex.props(styles.body)}>
          Cognition is the lab behind Devin, the AI software engineer. As a Devin AI Ambassador, I
          hosted {DEVIN_LOCAL.name} on their behalf: an evening in a London cafe where engineers,
          designers and founders built with Devin.
        </p>
        <p {...stylex.props(styles.body)}>
          The challenge: design a keychain with Devin, print it on the night&rsquo;s 3D printers,
          some provided by Muon, then vote on the best one. Everyone left with $200 of Devin Max.
        </p>
        <dl {...stylex.props(styles.facts)}>
          {FACTS.map((fact) => (
            <div key={fact.label} {...stylex.props(styles.fact)}>
              <dt {...stylex.props(styles.factLabel)}>{fact.label}</dt>
              <dd {...stylex.props(styles.factValue)}>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <a href={DEVIN_LOCAL.href} target="_blank" rel="noopener noreferrer" {...stylex.props(styles.link)}>
          Event page
          <HugeiconsIcon icon={ArrowUpRight01Icon} size={12} strokeWidth={1.8} {...stylex.props(styles.linkIcon)} />
        </a>
      </div>

      <video
        src={DEVIN_LOCAL.film.src}
        poster={DEVIN_LOCAL.film.poster}
        width={DEVIN_LOCAL.film.width}
        height={DEVIN_LOCAL.film.height}
        controls
        playsInline
        preload="none"
        aria-label={DEVIN_LOCAL.film.label}
        {...stylex.props(styles.film)}
      />
    </section>
  )
}
