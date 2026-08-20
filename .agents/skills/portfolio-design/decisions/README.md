# Decisions

Decision log with dates and rationale. Newest first.

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
