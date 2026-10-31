// Cloudflare Worker in front of the static assets, for agent-facing behaviour only:
// - /mcp: read-only MCP server (src/mcp.ts); /mcp/server-card: its server card
// - Accept: text/markdown, ?mode=agent, or an AI assistant fetching for a person
//   (ChatGPT-User, Claude-User, Perplexity-User) get a page's markdown twin
// - HTML pages advertise the sitemap, markdown alternate and llms.txt via Link headers
// - 404s carry a markdown body when the client prefers markdown
// Everything else is served by the assets binding untouched.
import { handleMcp, serverCard } from "@/mcp";

interface Env {
  ASSETS: { fetch: (request: Request | URL | string) => Promise<Response> };
}

const MARKDOWN_TWINS: Record<string, string> = {
  "/": "/index.md",
  "/about": "/about.md",
  "/contact": "/contact.md",
  "/privacy": "/privacy.md",
  "/developers": "/developers.md",
};

// User agents that fetch a page on a person's behalf and read it as text.
const ASSISTANT_AGENTS = /ChatGPT-User|Claude-User|Perplexity-User/i;

// Quality (q) the Accept header gives a media type: exact match, then type/*, then */*.
function quality(accept: string, type: string): number {
  let best = -1;
  let bestSpecificity = -1;
  for (const part of accept.split(",")) {
    const [range, ...params] = part.trim().toLowerCase().split(";");
    const specificity = range === type ? 2 : range === `${type.split("/")[0]}/*` ? 1 : range === "*/*" ? 0 : -1;
    if (specificity < 0 || specificity < bestSpecificity) continue;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    bestSpecificity = specificity;
    best = q ? Number(q.slice(2)) || 0 : 1;
  }
  return best < 0 ? 0 : best;
}

function prefersMarkdown(accept: string): boolean {
  if (!/text\/markdown/i.test(accept)) return false;
  // Markdown only when explicitly accepted and ranked at least as high as HTML.
  const md = quality(accept, "text/markdown");
  return md > 0 && md >= quality(accept, "text/html");
}

function wantsMarkdown(request: Request, url: URL): boolean {
  if (url.searchParams.get("mode") === "agent") return true;
  if (ASSISTANT_AGENTS.test(request.headers.get("User-Agent") ?? "")) return true;
  return prefersMarkdown(request.headers.get("Accept") ?? "");
}

function linkHeader(markdown: string): string {
  return [
    `<${markdown}>; rel="alternate"; type="text/markdown"`,
    '</sitemap.xml>; rel="sitemap"; type="application/xml"',
    '</llms.txt>; rel="describedby"; type="text/plain"',
    '</.well-known/ard.json>; rel="ard"; type="application/json"',
  ].join(", ");
}

// Copy a response's headers (so the _headers protections carry over) and adjust them.
function withHeaders(response: Response, set: Record<string, string>, body: BodyInit | null = response.body): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(set)) {
    if (name === "Vary") headers.append(name, value);
    else headers.set(name, value);
  }
  return new Response(body, { status: response.status, statusText: response.statusText, headers });
}

const NOT_FOUND_MARKDOWN = `# Page not found

There is nothing at this address on lenguyenvu.com.

- [Home](https://lenguyenvu.com/index.md)
- [About](https://lenguyenvu.com/about.md)
- [Contact](https://lenguyenvu.com/contact.md)
- [llms.txt](https://lenguyenvu.com/llms.txt)
`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/mcp") return handleMcp(request, env.ASSETS);
    if (url.pathname === "/mcp/server-card") {
      return new Response(JSON.stringify(serverCard(), null, 2), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const path = url.pathname.replace(/\.html$/, "").replace(/(.)\/$/, "$1");
    const twin = MARKDOWN_TWINS[path];
    const markdown = wantsMarkdown(request, url);

    if (twin && markdown) {
      const doc = await env.ASSETS.fetch(new URL(twin, url));
      if (doc.ok) {
        return withHeaders(doc, {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "public, max-age=300",
          Vary: "Accept, User-Agent",
          Link: linkHeader(twin),
        });
      }
    }

    const response = await env.ASSETS.fetch(request);

    // Both 404 variants (HTML and markdown) depend on Accept and User-Agent.
    if (response.status === 404) {
      if (markdown) {
        return withHeaders(response, { "Content-Type": "text/markdown; charset=utf-8", Vary: "Accept, User-Agent" }, NOT_FOUND_MARKDOWN);
      }
      return withHeaders(response, { Vary: "Accept, User-Agent" });
    }
    if (!twin) return response;
    return withHeaders(response, { Vary: "Accept, User-Agent", Link: linkHeader(twin) });
  },
};
