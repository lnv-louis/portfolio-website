import * as stylex from '@stylexjs/stylex'
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

import { scenesStyles as styles } from '@/components/hackathon-scenes-section.stylex'
import {
  HACKATHON_COMMUNITY,
  HACKATHON_EVENTS,
  HACKATHON_PHOTOS,
  photoSrc,
  type HackathonPhoto,
} from '@/content/hackathons'

const TILE_HEIGHT = 184

// Three rows, interleaved so each mixes London, Paris and the crowd shots.
const ROWS: HackathonPhoto[][] = [0, 1, 2].map((r) => HACKATHON_PHOTOS.filter((_, i) => i % 3 === r))

function WallRow({ photos, x }: { photos: HackathonPhoto[]; x: MotionValue<string> | string }) {
  // A scroll-linked motion value can't be expressed in StyleX, so it goes through Motion's style prop.
  const motionStyle = { x }
  return (
    <m.div {...stylex.props(styles.row)} style={motionStyle}>
      {photos.map((photo) => (
        <img
          key={photo.name}
          src={photoSrc(photo, 480)}
          alt={photo.alt}
          width={Math.round((TILE_HEIGHT * photo.width) / photo.height)}
          height={TILE_HEIGHT}
          loading="lazy"
          decoding="async"
          {...stylex.props(styles.tile)}
        />
      ))}
    </m.div>
  )
}

export function HackathonScenesSection() {
  const wallRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  // Rows move only as the page scrolls (1:1 with input), never on their own.
  const { scrollYProgress } = useScroll({ target: wallRef, offset: ['start end', 'end start'] })
  const left = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const right = useTransform(scrollYProgress, [0, 1], ['-30%', '0%'])

  return (
    <section id="hackathons" aria-labelledby="hackathons-heading" {...stylex.props(styles.section)}>
      <div {...stylex.props(styles.headingBlock)}>
        <h2 id="hackathons-heading" {...stylex.props(styles.heading)}>
          Building the London hackathon scenes.
        </h2>
        <p {...stylex.props(styles.lede)}>
          I host, sponsor and partner on hackathons on behalf of Cognition, a $100B+ lab, and through{' '}
          <a
            href={HACKATHON_COMMUNITY.collective.href}
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(styles.inlineLink)}
          >
            {HACKATHON_COMMUNITY.collective.name}
          </a>
          , the community I built: 1.2k+ members and 500+ calendar subscribers, London&rsquo;s most
          hackathon-hungry builders.
        </p>
      </div>

      <div ref={wallRef} {...stylex.props(styles.wall)}>
        <WallRow photos={ROWS[0]} x={reduceMotion ? '0%' : left} />
        <WallRow photos={ROWS[1]} x={reduceMotion ? '-15%' : right} />
        <dl {...stylex.props(styles.band)}>
          {HACKATHON_COMMUNITY.stats.map((stat) => (
            <div key={stat.label} {...stylex.props(styles.bandItem)}>
              <dt {...stylex.props(styles.srOnly)}>{stat.label}</dt>
              <dd {...stylex.props(styles.bandValue)}>{stat.value}</dd>
              <span aria-hidden="true" {...stylex.props(styles.bandLabel)}>
                {stat.label}
              </span>
            </div>
          ))}
        </dl>
        <WallRow photos={ROWS[2]} x={reduceMotion ? '0%' : left} />
      </div>

      <ul {...stylex.props(styles.events)}>
        {HACKATHON_EVENTS.map((event) => (
          <li key={event.name} {...stylex.props(styles.event)}>
            <a href={event.href} target="_blank" rel="noopener noreferrer" {...stylex.props(styles.eventLink)}>
              {event.lead}
            </a>{' '}
            {event.detail}
          </li>
        ))}
      </ul>
    </section>
  )
}
