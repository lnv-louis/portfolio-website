import media from '@/content/hackathon-media.json'

export interface HackathonPhoto {
  event: string
  name: string
  alt: string
  // false: only used where referenced by name (event tooltips), not on the photo wall.
  wall: boolean
  width: number
  height: number
}

export interface HackathonEvent {
  name: string
  city: string
  date: string
  // ISO start date when known; used to tell past from upcoming events.
  startDate: string | null
  endDate: string | null
  role: string
  stat: string
  href: string
  // How the event reads on the page: a linked lead, then one line of facts.
  lead: string
  detail: string
  // Photo shown in the event's tooltip (a name from hackathon-media.json).
  image?: string
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
    name: 'Grok Bot Community Engineering Hackathon',
    city: 'London',
    date: '22 Oct 2026',
    startDate: '2026-10-22',
    endDate: '2026-10-22',
    role: 'Host, for The Hack Collective',
    stat: '180 builders; sponsored by Cursor, Supabase, Cognee, Zero and Notion',
    href: 'https://luma.com/wn0h6ffm',
    lead: 'Hosted the Grok Bot Community Engineering Hackathon.',
    detail: '180 builders, sponsored by Cursor, Supabase, Cognee, Zero and Notion.',
    image: 'grok-bot-hackathon-group-photo',
  },
  {
    name: 'Hack-Nation 7th Global AI Hackathon',
    city: 'London hub',
    date: '3–4 Oct 2026',
    startDate: '2026-10-03',
    endDate: '2026-10-04',
    role: 'London hub host',
    stat: '3,150 builders across 15+ hubs',
    href: 'https://luma.com/nln5g3e0',
    lead: 'Hosted the London hub of Hack-Nation’s 7th Global AI Hackathon.',
    detail: '3,150 builders across 15+ hubs.',
    image: 'hack-nation-london-teams',
  },
  {
    name: 'Paris Builds',
    city: 'Paris',
    date: '36 hours',
    startDate: null,
    endDate: null,
    role: 'Sponsor and host',
    stat: '150 builders; the first Y Combinator-affiliated hackathon, held before YC Startup School Paris',
    href: 'https://luma.com/8ucy347o',
    lead: 'Sponsored and hosted Paris Builds.',
    detail: '150 builders at the first Y Combinator-affiliated hackathon, held before YC Startup School Paris.',
    image: 'paris-builds-group-photo',
  },
  {
    name: 'Imperial BioHack x Anthropic',
    city: 'London, Imperial College',
    date: '28–29 Nov 2026',
    startDate: '2026-11-28',
    endDate: '2026-11-29',
    role: 'Sponsor, on behalf of Cognition',
    stat: '48 hours, 120 builders, biotech challenges',
    href: 'https://luma.com/m21rdpv1',
    lead: 'Sponsoring Imperial BioHack x Anthropic for Cognition.',
    detail: '120 builders, 28–29 November.',
    image: 'imperial-biohack-anthropic-cover',
  },
  {
    name: 'ImpactHack 2027',
    city: 'Bristol and Mumbai',
    date: '13–14 Feb 2027',
    startDate: '2027-02-13',
    endDate: '2027-02-14',
    role: 'Partner and sponsor for The Hack Collective',
    stat: '350+ students across two campuses',
    href: 'https://impact-hack.com/',
    lead: 'Partnering on ImpactHack 2027 for The Hack Collective.',
    detail: '350+ students in Bristol and Mumbai.',
    image: 'impacthack-2027-venue',
  },
  {
    name: 'HackEurope',
    city: 'Dublin, Paris and Stockholm',
    date: '21–22 Feb 2026',
    startDate: '2026-02-21',
    endDate: '2026-02-22',
    role: 'Community partner, The Hack Collective',
    stat: "1,000 students; Europe's largest student hackathon",
    href: 'https://www.hackeurope.com/',
    lead: 'The Hack Collective partnered with HackEurope.',
    detail: "1,000 students in Dublin, Paris and Stockholm at Europe's largest student hackathon.",
    image: 'hackeurope-partnered-with-the-hack-collective',
  },
  {
    name: 'VC101: The European Venture Capital Experience',
    city: 'Barcelona, Esade',
    date: '7–8 Mar 2026',
    startDate: '2026-03-07',
    endDate: '2026-03-08',
    role: 'Community partner, The Hack Collective',
    stat: "Europe's biggest student-led venture capital competition, with FINEDA, ESFS and Ennova Esade",
    href: 'https://lnkd.in/ew8riMjf',
    lead: 'The Hack Collective partnered with FINEDA on VC101.',
    detail: "Europe's biggest student-led venture capital competition, at Esade Barcelona.",
    image: 'vc101-the-hack-collective-partnership',
  },
  {
    name: 'Student Tech Forum 2026',
    city: 'London',
    date: '29 Jan 2026',
    startDate: '2026-01-29',
    endDate: '2026-01-29',
    role: 'Community partner, The Hack Collective',
    stat: 'Hosted by London Venture Capital Network with UK university societies',
    href: 'https://lu.ma/stf2026',
    lead: 'The Hack Collective partnered on the Student Tech Forum.',
    detail: "London Venture Capital Network's day of panels and workshops on UK venture capital.",
    image: 'student-tech-forum-2026-partners',
  },
  {
    name: 'UK National Case Championship 2026',
    city: 'London',
    date: '14 Nov 2026',
    startDate: '2026-11-14',
    endDate: '2026-11-14',
    role: 'Community partner, The Hack Collective',
    stat: "New London School's free case competition for UK student teams",
    href: 'https://newlondonschool.com/',
    lead: 'The Hack Collective is partnering with New London School.',
    detail: 'The UK National Case Championship, with its final in London on 14 November.',
  },
]

const ALL_PHOTOS: HackathonPhoto[] = media.photos

export const HACKATHON_PHOTOS = ALL_PHOTOS.filter((photo) => photo.wall)

export function photoNamed(name: string): HackathonPhoto | undefined {
  return ALL_PHOTOS.find((photo) => photo.name === name)
}

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
