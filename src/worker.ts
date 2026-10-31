// Cloudflare Worker in front of the static assets, for agent-facing behaviour only:
// - Accept: text/markdown (or ?mode=agent) on a page returns its markdown twin
// - HTML pages advertise the sitemap, markdown alternate and llms.txt via Link headers
// - Vary: Accept so caches keep the HTML and markdown variants apart
// Everything else is served by the assets binding untouched.

interface Env {
  ASSETS: { fetch: (request: Request | URL | string) => Promise<Response> };
}

const MARKDOWN_TWINS: Record<string, string> = {
  "/": "/index.md",
  "/about": "/about.md",
  "/contact": "/contact.md",
  "/privacy": "/privacy.md",
};

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

function wantsMarkdown(request: Request, url: URL): boolean {
  if (url.searchParams.get("mode") === "agent") return true;
  const accept = request.headers.get("Accept") ?? "";
  if (!/text\/markdown/i.test(accept)) return false;
  // Markdown only when explicitly accepted and ranked at least as high as HTML.
  const md = quality(accept, "text/markdown");
  return md > 0 && md >= quality(accept, "text/html");
}

function linkHeader(markdown: string): string {
  return [
    `<${markdown}>; rel="alternate"; type="text/markdown"`,
    '</sitemap.xml>; rel="sitemap"; type="application/xml"',
    '</llms.txt>; rel="describedby"; type="text/plain"',
  ].join(", ");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\.html$/, "").replace(/(.)\/$/, "$1");
    const twin = MARKDOWN_TWINS[path];

    if (twin && wantsMarkdown(request, url)) {
      const markdown = await env.ASSETS.fetch(new URL(twin, url));
      if (markdown.ok) {
        return new Response(markdown.body, {
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=300",
            Vary: "Accept",
            Link: linkHeader(twin),
          },
        });
      }
    }

    const response = await env.ASSETS.fetch(request);
    if (!twin) return response;

    const headers = new Headers(response.headers);
    headers.append("Vary", "Accept");
    headers.set("Link", linkHeader(twin));
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
