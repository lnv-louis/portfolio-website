# Decisions

Decision log with dates and rationale. Newest first.

## 2026-10-31 — Hackathon section: "Scroll wall" (decided from /proto/hackathon-scenes)

**Status:** accepted
**Scope:** `hackathon-scenes-section.tsx`, `devin-local-section.tsx`
**Decision:** "Building the London hackathon scenes." uses the scroll wall: three rows of
curated photos (Grok Bot, Hack-Nation London hub, Paris Builds) that translate sideways
1:1 with page scroll (rows 1 and 3 to -30%, row 2 from -30%), split by a band of community
numbers in Geist Serif, with the events listed below. Devin Local gets its own section with
the film, about Devin and Cognition.

**Rejected:**
- Contact sheet (rolls, red grease-pencil keepers, loupe): strongest archive feel, but the
  longest section on the page and read as an archive rather than a community.
- Index (ledger + cursor-following photo stack): most restrained, but hid the photos behind
  hover/tap, which undersells the community.
- Flick stack (draggable deck per event): memorable, but one event at a time and 8 photos max.

**Rules kept:** rows move only with scroll (no autoplay), static under reduced motion; every
photo has its own alt text and a descriptive filename; media comes from
`scripts/import-hackathon-media.ts` driven by `src/content/hackathon-curation.json`.

## 2026-10-30 — Pivot to AI and Real Estate; Geist Serif headings; no navbar

**Status:** accepted
**Scope:** copy, metadata, typography, layout
**Decision:** Positioning moves from AI and finance to AI and Real Estate
(cf0.ai's product is Zero, which lets and manages homes). H1/H2 use Geist
Serif Regular, self-hosted. The floating nav is removed.

**Rationale:** cf0 pivoted. The site, its metadata, JSON-LD and `llms.txt`
must describe the current work. Past finance-related work (tradingview-mcp
contribution, FinancialPhraseBank paper) stays as historical fact.

**Exceptions:** Geist Serif ships Regular only, so headings are weight 400
until the variable font lands.

## 2026-08-20 — StyleX migration and cf0 design system adoption

**Status:** accepted
**Scope:** entire portfolio
**Decision:** Migrate from Tailwind utility classes to StyleX. Adopt cf0.ai's
design system architecture (token SOT, page-shell recipes, rail layout,
editorial typography). Switch primary from blue to red. Light-mode only.
Remove all decorative animation libraries (Framer Motion, GSAP, D3,
react-icon-cloud, React Bits components).

**Rationale:** The previous portfolio was visually flashy but structurally
undisciplined. No token system, hardcoded colors, 7 animation libraries,
63 RES score. cf0.ai's design system is the gold standard — single token
SOT, StyleX recipes, editorial typography, hairline borders, restrained
motion. Adopting it gives the portfolio the same engineering discipline.

**Evidence:**
- cf0.ai `DESIGN.md` and `src/tokens/source.ts` as the reference architecture
- Portfolio RES score of 63 (pre-migration)
- 6 inline `fontFamily` declarations, 2 hardcoded `#ef4444` instances
  (pre-migration)
- 11 dependencies removed post-migration

**Exceptions:** Tailwind retained for `@theme inline` bridge in
`globals.css` and `font-sans` body default. Not for component styling.

## 2026-08-20 — Next.js 16.3 + Cache Components + Partial Prefetching

**Status:** accepted
**Scope:** build config, page rendering
**Decision:** Upgrade to Next.js 16.3. Enable `cacheComponents: true` and
`partialPrefetching: true`. Switch from Turbopack to webpack (Babel
required for StyleX, Turbopack incompatible with Babel).

**Rationale:** Cache Components + Partial Prefetching give SPA-like instant
navigations. The portfolio is a single page, but the infrastructure is in
place for future multi-page work. Webpack is required because StyleX's
Babel plugin is incompatible with SWC/Turbopack.

**Evidence:**
- Next.js 16.3 blog post: "Instant Navigations" (June 25, 2026)
- Build passes with `cacheComponents: true` + `partialPrefetching: true`
- `next/font` incompatible with Babel — switched to `<link>` Google Fonts

**Exceptions:** `next/font` removed (incompatible with Babel). Fonts loaded
via `<link>` tags in `layout.tsx`.
