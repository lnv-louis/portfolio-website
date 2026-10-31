import media from '@/content/hackathon-media.json'

export interface HackathonPhoto {
  event: string
  name: string
  alt: string
  width: number
  height: number
}

export interface HackathonEvent {
  name: string
  city: string
  date: string
  role: string
  stat: string
  href: string
}

export const HACKATHON_COMMUNITY = {
  collective: { name: 'The Hack Collective', href: 'https://hackcollective.uk/' },
  stats: [
    { value: '1.2k+', label: 'Hack Collective members' },
    { value: '500+', label: 'calendar subscribers' },
    { value: '3,150', label: 'builders at Hack-Nation 07' },
  ],
}

export const HACKATHON_EVENTS: HackathonEvent[] = [
  {
    name: 'ImpactHack 2027',
    city: 'Bristol and Mumbai',
    date: '13–14 Feb 2027',
    role: 'Partner and sponsor for The Hack Collective',
    stat: '350+ students across two campuses',
    href: 'https://impact-hack.com/',
  },
  {
    name: 'Imperial BioHack x Anthropic',
    city: 'London, Imperial College',
    date: '28–29 Nov 2026',
    role: 'Sponsor, on behalf of Cognition',
    stat: '48 hours, 120 builders, biotech challenges',
    href: 'https://luma.com/m21rdpv1',
  },
  {
    name: 'Grok Bot Community Engineering Hackathon',
    city: 'London',
    date: '22 Oct 2026',
    role: 'Co-host for The Hack Collective',
    stat: 'Cursor, Supabase, Cognee, Zero and SpaceXAI as partners',
    href: 'https://luma.com/wn0h6ffm',
  },
  {
    name: 'Hack-Nation 7th Global AI Hackathon',
    city: 'London hub',
    date: '3–4 Oct 2026',
    role: 'London hub host',
    stat: '3,150 builders across 15+ hubs',
    href: 'https://luma.com/nln5g3e0',
  },
  {
    name: 'Paris Builds',
    city: 'Paris',
    date: '36 hours',
    role: 'Sponsor',
    stat: 'First YC-affiliated hackathon in Europe',
    href: 'https://luma.com/8ucy347o',
  },
]

export const HACKATHON_PHOTOS: HackathonPhoto[] = media.photos

export function photoSrc(photo: HackathonPhoto, size: 480 | 1600) {
  return `/hackathons/${photo.name}-${size}.webp`
}

const devinFilm = media.films.find((f) => f.event === 'devin-local')!

export const DEVIN_LOCAL = {
  name: 'Devin Local: London',
  date: '1 Oct 2026',
  attended: '202',
  href: 'https://luma.com/eveur09a',
  film: {
    src: devinFilm.src,
    poster: `/hackathons/${devinFilm.name}-poster.webp`,
    width: devinFilm.width,
    height: devinFilm.height,
    label: devinFilm.alt,
  },
}
