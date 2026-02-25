# CLAUDE.md — portfolio-website

## Overview

Personal portfolio for Louis Le (lenguyenvu.com). Deployed on Vercel. Dark-first design with red (#ef4444) accent, Playfair Display serif headings, sharp 0px radius.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack), React 19, TypeScript 5
- **Styling**: Tailwind CSS v4 (PostCSS-based, `@theme inline` in globals.css)
- **Animations**: Framer Motion (page transitions, scroll-driven SVG dividers, signature loader), GSAP (FlowingMenu only)
- **Data Viz**: D3.js force-directed graph (dynamically imported, SSR disabled)
- **Icons**: Phosphor Icons (bento), Lucide React (hero, projects)
- **Theming**: `next-themes` with CSS custom properties (--primary, --background, --foreground, etc.)
- **Analytics**: Vercel Analytics + Speed Insights
- **Scheduling**: Cal.com embed (dynamically imported in Contact)
- **Deployment**: Vercel, Cloudflare DNS for lenguyenvu.com

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
```

## Project Structure

```
app/
  page.tsx           # Homepage — all sections composed here, "use client"
  layout.tsx         # Root layout — fonts (Inter, Playfair Display), ThemeProvider, Analytics
  globals.css        # CSS variables for light/dark themes, custom animations

components/
  hero.tsx           # Hero section — portrait, "I'm Louis Le", rotating text, social links
  bento.tsx          # Bento grid — skills/capabilities with Phosphor icons, IconCloud
  projects.tsx       # Project cards — Grounded, Dex, Homiq with R2 video demos
  research.tsx       # Research manuscripts section
  contact.tsx        # Contact footer — Cal.com embed, TextPressure, social links
  loader.tsx         # Signature animation loader (calligrapher.ai neural net paths)
  signature.tsx      # SVG signature "Louis Le" — 5 strokes animated via pathLength
  d3-force-graph.tsx # Interactive D3 force graph — tech ecosystem visualization
  svg-divider.tsx    # Scroll-driven SVG section dividers (circuit, wave, pulse)

  magicui/           # Magic UI components (bento-grid, border-beam, icon-cloud, interactive-hover-button)
  reactbits/         # React Bits (dither, flowing-menu, rotating-text, spotlight-card, target-cursor, text-pressure)
  ui/                # Base UI (button, navbar, theme-toggle)

public/
  robots.txt         # Blocks AI training crawlers (GPTBot, ClaudeBot, CCBot, etc.)
  llms.txt           # LLM-readable site summary (llmstxt.org spec)
  le-nguyen-vu.png   # Hero portrait image

docs/
  me.md              # CV/resume content (source of truth for bio text)
  links.md           # Social and project links
```

## Architecture Decisions

- **Page is "use client"**: Entire page.tsx is client-rendered due to Framer Motion AnimatePresence for loader→content transition. Heavy components (D3, TargetCursor, IconCloud) are `next/dynamic` with `ssr: false`.
- **Signature loader**: Uses real AI-generated SVG paths from calligrapher.ai. Paths retrace (forward then backward), so `pathLength` animates to 0.5 not 1.0 to only draw the forward stroke.
- **SVG dividers**: Driven by `useScroll` + `useTransform` — path draws proportionally to scroll position, not triggered by viewport entry.
- **Videos**: R2-hosted mp4s via `NEXT_PUBLIC_R2_BUCKET_URL` env var, with `preload="none"` for performance.
- **Target cursor**: Uses native `requestAnimationFrame` (not GSAP) with passive mousemove listener.
- **Dither/noise**: Inline `<feTurbulence>` SVG filter, no external image dependency.
- **Navbar images**: CSS gradients (not Unsplash stock photos) for the FlowingMenu reveal.

## Design System

- **Primary**: `#ef4444` (dark), `#dc2626` (light)
- **Background**: `#0a0a0a` (dark), `#fafafa` (light)
- **Fonts**: Inter (body), Playfair Display (headings — inline `style={{ fontFamily }}`)
- **Radius**: 0px everywhere (sharp aesthetic)
- **Semantic tokens**: Always use `var(--primary)`, `text-foreground`, `bg-card`, `border-border` etc. Never hardcode `bg-white`/`dark:bg-black`.

## Critical Rules

- **Never change video URLs** in projects.tsx — R2-hosted mp4 links must stay intact
- **Never use hardcoded colors** in components — always use CSS custom properties
- **Dynamic imports** for heavy libs (D3, GSAP consumers, IconCloud) — keep initial bundle small
- **Signature paths**: Do NOT regenerate — these are from a specific calligrapher.ai session
- **Security headers**: CSP, HSTS, X-Frame-Options configured in next.config.ts
- **No Unsplash dependency** — removed, do not re-add to remotePatterns or CSP

## Environment Variables

- `NEXT_PUBLIC_R2_BUCKET_URL` — Cloudflare R2 bucket for video hosting

## Performance Notes

Previous RES score: 63. Mitigations applied:
- Loader reduced from 3.5s → <3s
- Hero animation chain cut from 2s+ → 0.5s
- D3/IconCloud/TargetCursor dynamically imported
- Videos `preload="none"`
- External noise SVG inlined
- GSAP replaced with rAF for cursor
- `compress: true`, AVIF/WebP image formats enabled
