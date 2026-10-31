import * as stylex from '@stylexjs/stylex'

import { capsStyles } from '@/components/capabilities-section.stylex'
import { FilmPlayer } from '@/components/film-player'
import { CF0_FILM } from '@/content/films'

export function CapabilitiesSection() {
  return (
    <section id="about" {...stylex.props(capsStyles.section)}>
      <div {...stylex.props(capsStyles.headingBlock)}>
        <h2 {...stylex.props(capsStyles.heading)}>
          Building production systems at the intersection of AI and Real Estate.
        </h2>
      </div>

      <FilmPlayer film={CF0_FILM} />
    </section>
  )
}
