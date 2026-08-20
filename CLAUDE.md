# CLAUDE.md — portfolio-website

## Overview

Personal portfolio for Louis Le (lenguyenvu.com). Deployed on Vercel.
Light-mode editorial design with red (#ef4444) accent. Geist for display
and body, Geist Mono for labels. StyleX design system modeled on cf0.ai.

## Tech Stack

- **Framework**: Next.js 16.3 (App Router, webpack, Cache Components, Partial Prefetching), React 19, TypeScript 5
- **Styling**: StyleX 0.19 (Babel plugin). No Tailwind. All styles authored in `.stylex.ts` files or `stylex.create` calls.
- **Fonts**: Geist (display + body), Geist Mono (labels) via `<link>` tags (next/font incompatible with Babel)
- **Motion**: `motion` + `motion-plus` for hero stagger reveal (splitText, line-by-line entrance). `prefers-reduced-motion` respected.
- **Icons**: `@hugeicons/react` + `@hugeicons/core-free-icons` (direct file imports, not barrel)
- **Dev tooling**: Agentation 3.0.2 (visual feedback toolbar for AI coding agents, dev-only, lazy-loaded)
- **Package manager**: Bun 1.3.14 (pinned in packageManager field)
- **Deployment**: Vercel

## Commands

```bash
bun run dev          # Start dev server (webpack, required for StyleX/Babel)
bun run build        # Production build
bun run lint         # ESLint
ast-grep scan        # Design system lint rules (sg-rules/)
```

## Project Structure

```
app/
  page.tsx               # Homepage — rail layout, section composition
  layout.tsx             # Root layout — fonts, metadata, JSON-LD, Agentation toolbar
  globals.css            # @stylex directive, token import, body defaults
  sitemap.ts             # Static sitemap

src/
  components/
    site-nav.tsx             # Floating glass pill nav — favicon logo, red CTA
    hero-section.tsx         # Hero — portrait, stagger reveal headline, socials
    stagger-reveal.tsx       # Client component: motion + motion-plus line-by-line entrance
    capabilities-section.tsx # Editorial rail — sticky heading, numbered items
    research-section.tsx     # ML manuscripts
    contact-section.tsx      # Two-column: text + image, socials, CTA, footer
    agentation.tsx           # Dev-only visual feedback toolbar (lazy-loaded)
  tokens/
    design-tokens.css        # CSS custom properties (--portfolio-* namespace)
    token-consts.stylex.ts   # Typed StyleX constants (color, text, space, radius, shadow, layout)
    page-shell.stylex.ts     # Reusable StyleX recipes (displayTitle*, body*)

sg-rules/                      # ast-grep design system lint rules
sgconfig.yml                   # ast-grep config
.agents/skills/portfolio-design/  # Design skill (SKILL.md, references/, exemplars/, decisions/)

public/
  robots.txt               # Blocks AI training crawlers
  llms.txt                 # LLM-readable site summary
  le-nguyen-vu.png         # Hero portrait image
  favicon2.png             # Favicon / nav logo

docs/
  me.md                    # CV/resume content (source of truth for bio text)
  links.md                 # Social and project links
```

## Architecture Decisions

- **Cache Components + Partial Prefetching**: `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts`. SPA-like instant navigations. `new Date()` blocked during prerender — use static values or `useState` + `useEffect` in client components.
- **Webpack not Turbopack**: StyleX's Babel plugin is incompatible with SWC/Turbopack. `--webpack` flag in dev/build scripts.
- **next/font removed**: Incompatible with Babel. Fonts loaded via `<link>` tags in `layout.tsx`.
- **Light-mode only**: No `next-themes`, no dark theme. Near-white canvas (`#f5f5f5`), ink text, one red accent.
- **Rail layout**: 1400px max-width, 1px hairline borders left/right, sections divided by 1px top borders. Modeled on cf0.ai's page shell.
- **Stagger reveal**: Hero uses `motion` + `motion-plus` `splitText` for line-by-line entrance. Waits for `document.fonts.ready` before splitting. Fails open (content visible on any error). `prefers-reduced-motion` skips animation.
- **Hugeicons direct imports**: Import from `@hugeicons/core-free-icons/Github01Icon` (default export), not the barrel `@hugeicons/core-free-icons`. Avoids bundling 6000+ icons.
- **Server components by default**: `capabilities-section`, `research-section`, `contact-section` are server components. Only `hero-section` (motion), `stagger-reveal` (client animation), `agentation` (dynamic import) are client-side.
- **Agentation**: Dev-only visual feedback toolbar. Lazy-loaded, guarded by `process.env.NODE_ENV !== 'production'`, never touches production bundle.
- **Path alias**: `@/*` resolves to `./src/*` (tsconfig.json + babel.config.js aliases).

## Design System

- **Primary**: `#ef4444` (portfolio-brand-700), used scarcely
- **Canvas**: `#f5f5f5` (portfolio-canvas)
- **Surface**: `#ffffff` (portfolio-surface-card)
- **Surface nav**: `rgba(24, 24, 27, 0.06)` (portfolio-surface-nav) — glass tint for floating nav
- **Ink**: `rgba(24, 24, 27, 0.96)` (portfolio-ink)
- **Hairline**: `#e4e4e7` (portfolio-hairline)
- **Fonts**: Geist (display + body), Geist Mono (labels)
- **Radius**: 0px actions, 6px inputs/buttons, 8px cards, 12px nav/surfaces, pill for CTAs
- **Spacing**: 12-step scale (4px to 192px)
- **Tokens**: Always use `color.*`, `space.*`, `text.*` from `@/tokens/token-consts.stylex.ts`. Never hardcode hex values.

## StyleX Authoring Rules

- **No hardcoded values in components**: Use tokens from `@/tokens/token-consts.stylex.ts`. New surface tokens go in `design-tokens.css` + `token-consts.stylex.ts`.
- **No Tailwind**: No utility classes. All styles via `stylex.create` + `stylex.props`.
- **No inline `style={{}}`**: Use StyleX. Exception: SVG filter definitions (e.g. nav glass distortion) which are not styleable via StyleX.
- **Longhand properties**: Split shorthands (`borderWidth` / `borderStyle` / `borderColor`, `paddingBlock` / `paddingInline`).
- **Conditions as values**: `{ default: ..., '@media (min-width: ...)' : ..., ':hover': ... }`. `default` required when any condition exists.
- **Numbers are px**: `width: 24` means 24px. Other units as strings (`'1.5rem'`, `'100dvh'`).

## Critical Rules

- **Never hardcode colors** in components — always use StyleX tokens
- **Never use Tailwind utility classes** — use StyleX
- **Never use inline `style={{}}`** in components — use StyleX
- **Never use `vh` units** — use `dvh`
- **Never use `new Date()`** during prerender — use static values or client-side state
- **Always use `--portfolio-*` namespace** for CSS custom properties
- **Security headers**: CSP, HSTS, X-Frame-Options configured in next.config.ts
- **Remote images**: `files.cf0.ai` allowed in next.config.ts `remotePatterns` and CSP `img-src`

## Content Source of Truth

- **CV**: `/Users/louiss/Desktop/placeholder/LE NGUYEN VU/Documents/04 CV/Nguyen_Vu_Le_CV.tex`
- **Derived bio**: `docs/me.md`
- All portfolio content must be grounded in the CV. Do not invent claims.

## Design Skill

Load `.agents/skills/portfolio-design/SKILL.md` when shaping, editing, or
reviewing user-facing UI. Applies to:
- pages and components
- copy, interaction, accessibility, responsive behavior, and states

Skip for backend-only work with no user-visible effect.

## Environment Variables

None required.
