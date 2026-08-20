# Patterns

Interaction patterns for the portfolio.

## Navigation

- Sticky top nav, transparent over hero, solid `surfaceCard` on scroll.
- Anchor links to `#about`, `#projects`, `#research`, `#contact`.
- Primary CTA: `mailto:louis@cf0.ai` link, red background, mono label.
- No mobile drawer yet (coverage gap — see `coverage-gaps.md`).

## Links

- External links: `target="_blank"`, `rel="noopener noreferrer"`.
- Internal anchor links: smooth scroll via CSS `scroll-behavior: smooth`
  (not yet added — see `coverage-gaps.md`).
- Social links: mono font, uppercase, 1px bottom border, color transition
  on hover.

## Cards

- `surfaceSoft` background, 1px `hairline` border, no shadow.
- Padding: `space.xl` (32px).
- Title: `displayTitleSm` recipe (Source Serif 4, 22px, weight 500).
- Body: `bodySm` recipe (Inter, 14px, `color.meta`).
- Tags: mono, 11px, 1px border, `color.meta`.

## Project rows

- Numbered list (01, 02, 03, 04).
- Number: mono, `color.meta`, fixed-width column.
- Title: `displayTitleSm` recipe.
- Category: mono, uppercase, `color.primary` (red).
- Description: `bodyMd` recipe, max-width 48rem.
- Tags: same as card tags.
- Link: mono, uppercase, "View project" with external link.

## Motion

- No decorative motion. No page-load animations. No scroll-triggered
  animations.
- Transitions are limited to: color (150ms), background-color (150ms),
  border-color (150ms).
- `prefers-reduced-motion` is respected by default (no motion to suppress).
