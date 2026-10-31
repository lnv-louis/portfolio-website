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

export const HACKATHONS = {
  community: HACKATHON_COMMUNITY,
  events: [
    ...HACKATHON_EVENTS,
    {
      name: DEVIN_LOCAL.name,
      city: 'London',
      date: DEVIN_LOCAL.date,
      role: 'Host, on behalf of Cognition',
      stat: `${DEVIN_LOCAL.attended} attended`,
      href: DEVIN_LOCAL.href,
    },
  ],
}

export const MARKDOWN_PAGES = ['/index.md', '/about.md', '/contact.md', '/privacy.md'] as const

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
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'list_hackathons',
    title: 'List hackathons',
    description: 'Hackathons Louis Le has hosted, co-hosted or sponsored, with dates, roles and event links.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_contact_links',
    title: 'Get contact links',
    description: 'Public channels for contacting Louis Le (LinkedIn, X, GitHub, The Hack Collective).',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
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

// Data-only tools: the result doesn't need a fetch.
export function staticToolResult(name: string): unknown | undefined {
  if (name === 'get_profile') return PROFILE
  if (name === 'list_hackathons') return HACKATHONS
  if (name === 'get_contact_links') return CONTACT
  return undefined
}
