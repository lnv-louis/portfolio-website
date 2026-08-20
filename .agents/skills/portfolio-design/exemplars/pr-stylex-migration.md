# Exemplar: StyleX migration and design system adoption

**Date:** 2026-08-20
**PR:** N/A (direct commit)
**Status:** shipped

## What changed

- Migrated from Tailwind utility classes to StyleX across all components.
- Created token SOT: `src/tokens/design-tokens.css` (CSS custom properties
  under `--portfolio-*` namespace) + `src/tokens/token-consts.stylex.ts` (typed
  StyleX constants).
- Created page-shell recipes: `src/tokens/page-shell.stylex.ts` with
  `displayTitleLg/Md/Sm`, `eyebrow`, `bodyLg/Md/Sm`.
- Adopted cf0.ai's rail layout: 1400px max-width, 1px hairline borders,
  sections divided by 1px top borders.
- Switched primary color from blue to red (`#ef4444` brand-700).
- Light-mode only. Removed `next-themes` and dark theme.
- Removed 11 dependencies: d3, react-icon-cloud, phosphor, lucide, cva,
  clsx, tailwind-merge, radix-slot, next-themes, framer-motion, gsap,
  calcom, vercel analytics/speed-insights.
- Removed all decorative components: loader, signature, d3-force-graph,
  svg-divider, tech-ecosystem, magicui/*, reactbits/*, pdf-preview.
- Renamed components: hero → hero-section, bento → capabilities-section,
  projects → work-section, research → research-section, contact →
  contact-section, ui/navbar → site-nav.
- Upgraded to Next.js 16.3 with Cache Components + Partial Prefetching.
- Switched from Turbopack to webpack (Babel required for StyleX).

## Why

The previous portfolio was visually flashy but structurally undisciplined.
No token system, hardcoded colors, 7 animation libraries, 63 RES score.
cf0.ai's design system is the gold standard. Adopting it gives the
portfolio the same engineering discipline.

## What to repeat

- Token SOT pattern: CSS custom properties → typed StyleX constants →
  page-shell recipes → component styles.
- Rail layout with hairline borders.
- Editorial typography: Source Serif 4 display + Inter body + JetBrains
  Mono labels.
- One brand voltage (red), used scarcely.
- Light-mode only.
- No decorative motion.

## What to avoid

- Don't re-add animation libraries. Motion is limited to 150ms color
  transitions.
- Don't hardcode hex values in components. Use tokens.
- Don't use Tailwind utility classes in components. Use StyleX.
- Don't add `next/font`. It's incompatible with Babel (required for
  StyleX). Use `<link>` tags.
- Don't use `new Date()` directly in client component render. Cache
  Components blocks it during prerender. Use `useState` + `useEffect`.
