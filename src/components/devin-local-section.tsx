import * as stylex from '@stylexjs/stylex'

import { devinStyles as styles } from '@/components/devin-local-section.stylex'
import { DEVIN_LOCAL } from '@/content/hackathons'

export function DevinLocalSection() {
  return (
    <section id="devin-local" aria-labelledby="devin-local-heading" {...stylex.props(styles.section)}>
      <h2 id="devin-local-heading" {...stylex.props(styles.heading)}>
        Hosting Devin Local as a Devin AI Ambassador.
      </h2>
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
