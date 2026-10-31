# AGENTS.md

Instructions for AI coding agents working in this repository, the source of
[lenguyenvu.com](https://lenguyenvu.com), Louis Le's personal site.

The full project guide is [CLAUDE.md](CLAUDE.md). Read it before changing anything. The
short version:

## Stack

Vite 8 + React 19 + TypeScript, StyleX for every style, prerendered to static HTML and
served from Cloudflare Workers static assets with a small Worker (`src/worker.ts`) for
markdown negotiation. Bun is the package manager.

## Commands

```bash
bun run dev           # dev server
bun run build         # client build + SSR build + prerender every route into dist/
bun run typecheck     # tsc --noEmit
bun run lint          # ESLint
ast-grep scan         # design-system rules in sg-rules/
bun run import-media  # curated hackathon media -> public/hackathons/ (see src/content/hackathon-curation.json)
```

## Rules

- Style only with StyleX tokens from `src/tokens/token-consts.stylex.ts`. No hardcoded
  colours, no Tailwind, no inline `style={{}}`, `dvh` not `vh`.
- Every claim on the site must come from Louis's CV or his explicit instructions.
- New pages go in `src/app/routes.tsx` (they are prerendered automatically) and need a
  markdown twin in `public/<page>.md`, an entry in `public/sitemap.xml`, and a line in
  `public/llms.txt`.
- Videos are served from R2 (`media.lenguyenvu.com`), never `public/`: Workers static
  assets ignore Range requests, which Safari needs for MP4.

## For agents reading the site (not the code)

Use [llms.txt](https://lenguyenvu.com/llms.txt), or request any page as markdown by
appending `.md`, sending `Accept: text/markdown`, or adding `?mode=agent`. The same
read-only tools (`get_profile`, `list_hackathons`, `get_contact_links`,
`get_page_markdown`) are served over MCP at `https://lenguyenvu.com/mcp` and registered
in the page via WebMCP. Discovery: `/.well-known/ard.json`, `/.well-known/ai-catalog.json`,
`/.well-known/agent-skills/index.json`, `/.well-known/mcp/server-card.json`.
