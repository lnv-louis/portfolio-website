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

function wantsMarkdown(request: Request, url: URL): boolean {
  if (url.searchParams.get("mode") === "agent") return true;
  const accept = request.headers.get("Accept") ?? "";
  // Prefer markdown only when the client asks for it ahead of (or instead of) HTML.
  const md = accept.indexOf("text/markdown");
  const html = accept.indexOf("text/html");
  return md !== -1 && (html === -1 || md < html);
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
