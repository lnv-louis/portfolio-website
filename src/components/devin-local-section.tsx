import * as stylex from '@stylexjs/stylex'

import { devinStyles as styles } from '@/components/devin-local-section.stylex'
import { FilmPlayer } from '@/components/film-player'
import { DEVIN_LOCAL_FILM } from '@/content/films'

export function DevinLocalSection() {
  return (
    <section id="devin-local" aria-labelledby="devin-local-heading" {...stylex.props(styles.section)}>
      <h2 id="devin-local-heading" {...stylex.props(styles.heading)}>
        Hosting Devin Local as a Devin AI Ambassador.
      </h2>
      <FilmPlayer film={DEVIN_LOCAL_FILM} />
    </section>
  )
}
