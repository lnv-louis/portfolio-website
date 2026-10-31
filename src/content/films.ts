import type { Film } from '@/components/film-player'
import { DEVIN_LOCAL } from '@/content/hackathons'

// Films on the homepage, played by FilmPlayer. All are served from R2
// (media.lenguyenvu.com) for Range support; see CLAUDE.md before re-encoding.

export const CF0_FILM: Film = {
  label: 'Zero by cf0.ai: product film',
  poster: '/zero-product-film-poster.webp',
  sources: [
    {
      src: 'https://media.lenguyenvu.com/cf0-product-film-1080.av1.mp4',
      type: 'video/mp4; codecs="av01.0.09M.08, mp4a.40.2"',
    },
    {
      src: 'https://media.lenguyenvu.com/cf0-product-film-1080.h264.mp4',
      type: 'video/mp4; codecs="avc1.640032, mp4a.40.2"',
    },
  ],
}

export const DEVIN_LOCAL_FILM: Film = {
  label: DEVIN_LOCAL.film.label,
  poster: DEVIN_LOCAL.film.poster,
  sources: [{ src: DEVIN_LOCAL.film.src, type: 'video/mp4; codecs="avc1.42001f, mp4a.40.2"' }],
}
