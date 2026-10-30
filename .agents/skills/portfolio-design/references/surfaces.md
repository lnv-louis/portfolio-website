# Surfaces

The portfolio has one surface: the homepage (`src/app/app.tsx`). It is
composed of sections, each in its own component file.

## Section inventory

| Section | Component | ID | Purpose |
|---|---|---|---|
| Hero | `hero-section.tsx` | — | Portrait, headline, "Currently..." links, socials |
| Capabilities | `capabilities-section.tsx` | `#about` | AI and Real Estate headline + cf0 product film |
| Community | `community-section.tsx` | `#community` | Open source and community roles |
| Research | `research-section.tsx` | `#research` | ML manuscripts |
| Contact | `contact-section.tsx` | `#contact` | Email link, socials, footer |

## Layout system

The page uses a rail layout:
- Full-width canvas background (`color.canvas`)
- Hero is full-width, centered content
- Below hero: centered rail (1400px max-width, 1px hairline borders
  left/right, `color.surfaceCard` background)
- Sections inside the rail are divided by 1px top borders
- Section padding: `space.x5xl` (96px) block, `space.lg` (24px) inline
  default, `space.x4xl` (64px) inline at 1200px+

## Responsive behavior

- Mobile-first. All sections stack vertically below 960px.
- Hero: column on mobile, row on desktop (960px+).
- Capabilities: 1 column mobile, 2 at 768px, 3 at 1200px.
- Work: 1 column mobile, grid at 960px+.
- Research: 1 column mobile, 2 at 768px.
- Nav: anchor links hidden on mobile, CTA always visible.
