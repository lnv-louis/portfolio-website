# Resilience

States beyond the happy path for the portfolio.

## Image loading

- Hero portrait: `priority` flag on Next Image, `object-cover` + `object-center`.
- Fallback: `surfaceSoft` background on the frame while loading.

## Empty states

- Research section: currently 1 paper. If 0 papers, the section should not
  render. (Not yet implemented — see `coverage-gaps.md`.)
- Work section: always has projects. No empty state needed.

## Error states

- No forms on the site. No error states for user input.
- External links: if a link is broken, the user gets the browser's 404.
  No custom error handling.

## Network resilience

- The site is fully static (prerendered). No client-side data fetching.
- No loading states needed beyond image loading.
- No offline support (coverage gap — see `coverage-gaps.md`).

## Responsive resilience

- Test at 320px (smallest phone), 768px (tablet), 1200px (desktop), 1400px
  (wide).
- Long content: project descriptions are capped at 48rem. Headings use
  `textWrap: 'balance'`.
- Large values: no dynamic data to overflow.
