# CLAUDE.md — portfolio-website

## Overview

Personal portfolio for Louis Le (lenguyenvu.com). Single-page site deployed on
Cloudflare Workers (static assets). Light-mode editorial design with red
(#ef4444) accent. Positioning: AI and Real Estate (cf0.ai, Zero). Geist Serif
for H1/H2, Geist for body and H3+, Geist Mono for labels. StyleX design system
modeled on cf0.ai.

## Tech Stack

- **Build**: Vite 8 + `@vitejs/plugin-react`, React 19, TypeScript 5
- **Routing**: React Router 8 (`createBrowserRouter`), one route; unknown paths redirect to `/`
- **Styling**: StyleX 0.19 via `@stylexjs/unplugin` (Vite). No Tailwind. All styles in `.stylex.ts` files or `stylex.create` calls.
- **Fonts**: Geist + Geist Mono from Google Fonts (`<link>` in `index.html`). Geist Serif Regular self-hosted at `public/fonts/GeistSerif-Regular.woff2` (`@font-face` in `globals.css`, preloaded in `index.html`). The `geist` npm package only ships `next/font` loaders, so it is not used.
- **Motion**: `motion` + `motion-plus` (hero stagger reveal via `splitText`), `lenis` smooth scroll. `MotionConfig reducedMotion="user"` app-wide.
- **UI primitives**: `@base-ui/react` (tooltip)
- **Icons**: `@hugeicons/react` + `@hugeicons/core-free-icons` (direct file imports, not barrel)
- **Dev tooling**: Agentation (visual feedback toolbar), dev-only; the import is gated on `import.meta.env.DEV` so it never reaches the production build
- **Package manager**: Bun 1.4.0 (pinned in `packageManager`), isolated linker (`bunfig.toml`)
- **Deployment**: Cloudflare Workers static assets via Wrangler (`wrangler.jsonc`, account LNV)

## Commands

```bash
bun run dev          # Vite dev server
bun run build        # Production build to dist/
bun run preview      # Serve dist/ locally
bun run typecheck    # tsc --noEmit
bun run lint         # ESLint
bun run deploy       # vite build && wrangler deploy
ast-grep scan        # Design system lint rules (sg-rules/)
```

## Project Structure

```
index.html                 # <head>: meta, OG, canonical, JSON-LD, font links
src/
  main.tsx                 # Router + root render
  app/
    app.tsx                # Page composition: hero + rail of sections
    globals.css            # Base layer, @font-face, @stylex directive
  components/
    hero-section.tsx         # Portrait, stagger-reveal headline, "Currently..." links with tooltips, socials
    stagger-reveal.tsx       # motion + motion-plus line-by-line entrance
    capabilities-section.tsx # #about — positioning headline + product film
    product-demo-section.tsx # cf0 product film (media.cf0.ai) with custom controls
    community-section.tsx    # #community — open source and community roles
    research-section.tsx     # #research — ML manuscripts (PDFs on media.lenguyenvu.com)
    contact-section.tsx      # #contact — photo, contact rows, footer
    lenis-provider.tsx       # Lenis smooth scroll (off under reduced motion)
    agentation.tsx           # Dev-only feedback toolbar
    ui/tooltip.tsx           # Base UI tooltip styled with StyleX
  tokens/
    design-tokens.css        # CSS custom properties (--portfolio-* namespace)
    token-consts.stylex.ts   # Typed StyleX constants (color, text, space, radius, shadow, motion, layout)
public/
  _headers                 # Security headers (CSP, HSTS, X-Frame-Options) + cache rules
  robots.txt, sitemap.xml, llms.txt
  fonts/GeistSerif-Regular.woff2
  le-nguyen-vu.webp        # Hero portrait
  zero-product-film-poster.webp  # Film poster (copied from cf0.ai/images/)
  favicon2.png
sg-rules/                  # ast-grep design system lint rules
.agents/skills/portfolio-design/  # Design skill
docs/                      # Local only (gitignored): me.md, links.md
```

## Architecture Decisions

- **Client-rendered SPA**: `index.html` has no prerendered content; the page renders after JS loads. `wrangler.jsonc` uses `not_found_handling: single-page-application`, so any missing static file returns `index.html` with 200. Every file referenced from `<head>` or `robots.txt` must exist in `public/`.
- **Rail layout**: 1400px max-width, 1px hairline borders left/right, sections divided by 1px top borders. Modeled on cf0.ai's page shell. No navbar.
- **Stagger reveal**: Hero hides until `document.fonts.ready` (capped at 1s), then splits the headline into lines. Fails open. `prefers-reduced-motion` skips animation.
- **Product film**: Sources are hashed files on `media.cf0.ai/film/`. When cf0.ai re-encodes, the hashes change and old URLs 404. Get the current URLs from the cf0.ai homepage HTML (`<source>` tags); the R2 `media` bucket on the cf0.ai account does not reflect what `media.cf0.ai` serves.
- **Hover**: All `:hover` styles are gated behind `@media (hover: hover) and (pointer: fine)` inside the StyleX value so taps don't stick on touch devices.
- **Path alias**: `@/*` resolves to `./src/*` (tsconfig + vite.config.ts + StyleX unplugin aliases).

## Design System

- **Primary**: `#ef4444` (portfolio-brand-700), used scarcely
- **Canvas**: `#f5f5f5` (portfolio-canvas)
- **Surface**: `#ffffff` (portfolio-surface-card)
- **Ink**: `rgba(24, 24, 27, 0.96)` (portfolio-ink)
- **Hairline**: `#e4e4e7` (portfolio-hairline)
- **Fonts**: Geist Serif (H1/H2, weight 400 only — the only weight shipped so far), Geist (body, H3+), Geist Mono (labels). `font-synthesis: none`, so a missing weight never gets faked.
- **Radius**: 0px actions, 6px inputs/buttons, 8px cards, 12px surfaces, pill for CTAs
- **Spacing**: 12-step scale (4px to 192px)
- **Tokens**: Always use `color.*`, `space.*`, `text.*` from `@/tokens/token-consts.stylex.ts`. Never hardcode hex values.

## StyleX Authoring Rules

- **No hardcoded values in components**: Use tokens. New tokens go in `design-tokens.css` + `token-consts.stylex.ts`.
- **No Tailwind**, **no inline `style={{}}`** (exception: SVG filter definitions).
- **Longhand properties**: Split shorthands (`borderWidth` / `borderStyle` / `borderColor`, `paddingBlock` / `paddingInline`).
- **Conditions as values**: `{ default: ..., '@media (min-width: ...)' : ..., ':hover': ... }`. `default` required when any condition exists.
- **Hover**: `':hover': { default: null, '@media (hover: hover) and (pointer: fine)': value }`.
- **Numbers are px**: `width: 24` means 24px. Other units as strings.

## Critical Rules

- **Never hardcode colors** in components — always use StyleX tokens
- **Never use `vh` units** — use `dvh`
- **Always use `--portfolio-*` namespace** for CSS custom properties
- **CSP lives in `public/_headers`**. New media origins must be added to `img-src` / `media-src` there.

## Content Source of Truth

- **CV**: `/Users/louiss/Desktop/placeholder/LE NGUYEN VU/Documents/04 CV/Nguyen_Vu_Le_CV.tex`
- **Derived bio**: `docs/me.md`
- **Positioning**: AI and Real Estate. cf0.ai's product is Zero, which lets and manages homes. Do not describe cf0 or Louis's current work as finance.
- All portfolio content must be grounded in the CV or Louis's explicit instructions. Do not invent claims.

## Design Skill

Load `.agents/skills/portfolio-design/SKILL.md` when shaping, editing, or
reviewing user-facing UI. Skip for backend-only work with no user-visible effect.

## Environment Variables

None required.
