// WebMCP: read-only tools a browser agent can call on this page.
// https://webmachinelearning.github.io/webmcp/ — registered via document.modelContext,
// with navigator.modelContext as a fallback for earlier implementations.
import { DEVIN_LOCAL, HACKATHON_COMMUNITY, HACKATHON_EVENTS } from "@/content/hackathons";

interface ToolResult {
  content: { type: "text"; text: string }[];
}

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: { readOnlyHint?: boolean };
  execute: (input: Record<string, unknown>) => Promise<ToolResult> | ToolResult;
}

interface ModelContext {
  registerTool: (tool: WebMcpTool) => unknown;
}

const PROFILE = {
  name: "Louis Le",
  alternateName: "Le Nguyen Vu",
  location: "London, United Kingdom",
  roles: [
    "Co-Founder & CTO, cf0.ai (Zero: the AI that lets and manages homes)",
    "Co-founder, The Hack Collective (London's hackathon community)",
    "Devin AI Ambassador",
    "EuroTech Fellow",
    "Thinking About Thinking Fellow",
    "BSc Computer Science, University College London (expected 2028)",
  ],
  focus: "Production AI systems for real estate",
  pages: { home: "/", about: "/about", contact: "/contact", privacy: "/privacy", markdown: "/index.md" },
};

const CONTACT = [
  { channel: "LinkedIn", url: "https://linkedin.com/in/le-nguyen-vu" },
  { channel: "X", url: "https://x.com/lnv007" },
  { channel: "GitHub", url: "https://github.com/lnv-louis" },
  { channel: "The Hack Collective", url: "https://hackcollective.uk/" },
];

const json = (value: unknown): ToolResult => ({ content: [{ type: "text", text: JSON.stringify(value, null, 2) }] });

const PAGES = ["/index.md", "/about.md", "/contact.md", "/privacy.md"] as const;

const TOOLS: WebMcpTool[] = [
  {
    name: "get_profile",
    description: "Who Louis Le is: current roles, focus, location and the site's pages.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: () => json(PROFILE),
  },
  {
    name: "list_hackathons",
    description: "Hackathons Louis Le has hosted, co-hosted or sponsored, with dates, roles and event links.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: () =>
      json({
        community: HACKATHON_COMMUNITY,
        events: [
          ...HACKATHON_EVENTS,
          {
            name: DEVIN_LOCAL.name,
            city: "London",
            date: DEVIN_LOCAL.date,
            role: "Host, on behalf of Cognition",
            stat: `${DEVIN_LOCAL.attended} attended`,
            href: DEVIN_LOCAL.href,
          },
        ],
      }),
  },
  {
    name: "get_contact_links",
    description: "Public channels for contacting Louis Le.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
    execute: () => json(CONTACT),
  },
  {
    name: "get_page_markdown",
    description: "The markdown version of a page on lenguyenvu.com.",
    inputSchema: {
      type: "object",
      properties: { page: { type: "string", enum: [...PAGES], description: "Markdown page path" } },
      required: ["page"],
    },
    annotations: { readOnlyHint: true },
    execute: async (input) => {
      const page = PAGES.find((p) => p === input.page) ?? "/index.md";
      const text = await (await fetch(page)).text();
      return { content: [{ type: "text", text }] };
    },
  },
];

export function registerAgentTools() {
  const context =
    (document as Document & { modelContext?: ModelContext }).modelContext ??
    (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
  if (!context?.registerTool) return;
  for (const tool of TOOLS) context.registerTool(tool);
}
