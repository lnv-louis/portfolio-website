import { DEVIN_LOCAL, HACKATHON_COMMUNITY, HACKATHON_EVENTS } from '@/content/hackathons'

// Agent-facing facts, shared by the WebMCP tools (src/app/agent-tools.ts) and the MCP
// server (src/mcp.ts). Keep in sync with the visible copy; never add claims here first.

export const PROFILE = {
  name: 'Louis Le',
  alternateName: 'Le Nguyen Vu',
  location: 'London, United Kingdom',
  roles: [
    'Co-Founder & CTO, cf0.ai (Zero: the AI that lets and manages homes)',
    "Co-founder, The Hack Collective (London's hackathon community)",
    'Devin AI Ambassador',
    'EuroTech Fellow',
    'Thinking About Thinking Fellow',
    'Raion member (sovereign AI infrastructure)',
    'BSc Computer Science, University College London (expected 2028)',
  ],
  focus: 'Production AI systems for real estate',
  pages: {
    home: 'https://lenguyenvu.com/',
    about: 'https://lenguyenvu.com/about',
    contact: 'https://lenguyenvu.com/contact',
    privacy: 'https://lenguyenvu.com/privacy',
    markdown: 'https://lenguyenvu.com/index.md',
    llms: 'https://lenguyenvu.com/llms.txt',
  },
}

export const CONTACT = [
  { channel: 'LinkedIn', url: 'https://linkedin.com/in/le-nguyen-vu' },
  { channel: 'X', url: 'https://x.com/lnv007' },
  { channel: 'GitHub', url: 'https://github.com/lnv-louis' },
  { channel: 'The Hack Collective', url: 'https://hackcollective.uk/' },
]

const EVENTS = [
  ...HACKATHON_EVENTS,
  {
    name: DEVIN_LOCAL.name,
    city: 'London',
    date: DEVIN_LOCAL.date,
    startDate: '2026-10-01',
    endDate: '2026-10-01',
    role: 'Host, on behalf of Cognition',
    stat: `${DEVIN_LOCAL.attended} attended`,
    href: DEVIN_LOCAL.href,
  },
]

const ROLES = ['host', 'sponsor', 'partner'] as const
const WHEN = ['past', 'upcoming'] as const
const SECTIONS = ['roles', 'pages'] as const
const CHANNELS = ['LinkedIn', 'X', 'GitHub', 'The Hack Collective'] as const

export const MARKDOWN_PAGES = ['/index.md', '/about.md', '/contact.md', '/privacy.md', '/developers.md'] as const

export interface AgentTool {
  name: string
  title: string
  description: string
  inputSchema: Record<string, unknown>
}

// Tool definitions shared by WebMCP and MCP. All are read-only.
export const AGENT_TOOLS: AgentTool[] = [
  {
    name: 'get_profile',
    title: 'Get profile',
    description: "Louis Le's current roles, focus, location and the site's page URLs.",
    inputSchema: {
      type: 'object',
      properties: {
        section: { type: 'string', enum: [...SECTIONS], description: 'Return only the roles or only the page URLs. Omit for the full profile.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'list_hackathons',
    title: 'List hackathons',
    description: 'Hackathons Louis Le has hosted, sponsored or partnered on, with dates, roles and event links.',
    inputSchema: {
      type: 'object',
      properties: {
        role: { type: 'string', enum: [...ROLES], description: "Only events where Louis's role includes this. Omit for all." },
        when: { type: 'string', enum: [...WHEN], description: 'Only past or only upcoming events. Omit for all.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_contact_links',
    title: 'Get contact links',
    description: 'Public channels for contacting Louis Le (LinkedIn, X, GitHub, The Hack Collective).',
    inputSchema: {
      type: 'object',
      properties: {
        channel: { type: 'string', enum: [...CHANNELS], description: 'Return only this channel. Omit for all.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_page_markdown',
    title: 'Get page as markdown',
    description: 'The markdown version of a page on lenguyenvu.com.',
    inputSchema: {
      type: 'object',
      properties: {
        page: { type: 'string', enum: [...MARKDOWN_PAGES], description: 'Markdown page path, for example /about.md' },
      },
      required: ['page'],
      additionalProperties: false,
    },
  },
]

function listHackathons(args: Record<string, unknown>, today: string) {
  const events = EVENTS.filter((event) => {
    if (typeof args.role === 'string' && !event.role.toLowerCase().includes(args.role)) return false
    // Running events (between start and end date) count as upcoming, not past.
    const upcoming = event.endDate !== null && event.endDate >= today
    if (args.when === 'upcoming' && !upcoming) return false
    if (args.when === 'past' && upcoming) return false
    return true
  })
  return { community: HACKATHON_COMMUNITY, events }
}

// Data-only tools: the result doesn't need a fetch. `today` is an ISO date (YYYY-MM-DD).
export function staticToolResult(name: string, args: Record<string, unknown> = {}, today = new Date().toISOString().slice(0, 10)): unknown | undefined {
  if (name === 'get_profile') {
    if (args.section === 'roles') return { name: PROFILE.name, roles: PROFILE.roles }
    if (args.section === 'pages') return PROFILE.pages
    return PROFILE
  }
  if (name === 'list_hackathons') return listHackathons(args, today)
  if (name === 'get_contact_links') {
    return typeof args.channel === 'string' ? CONTACT.filter((c) => c.channel === args.channel) : CONTACT
  }
  return undefined
}
