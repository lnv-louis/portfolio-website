# Coverage Gaps

Areas where we do not have a standard yet. These are not rules — they are
explicit gaps that need a decision before they become guidance.

## Mobile navigation

- No mobile drawer/hamburger menu. Nav anchor links are hidden on mobile
  (`hidden md:flex`). The CTA button is always visible.
- Gap: should we add a mobile menu? If so, what pattern? (cf0 uses a drawer
  with IntersectionObserver-based dark-section detection.)

## Smooth scroll

- Anchor links jump, not smooth-scroll. CSS `scroll-behavior: smooth` is
  not yet added.
- Gap: add `scroll-behavior: smooth` to `html` in globals.css, or use JS
  scroll? CSS is simpler.

## Research empty state

- If the research section has 0 papers, it renders an empty section with
  just the heading.
- Gap: should the section conditionally render? Or show an "available on
  request" message?

## Print styles

- No `@media print` styles. The CV is a separate `.tex` file.
- Gap: should the portfolio be printable? If so, what should be
  included/excluded?

## Favicon and OG image

- Favicon exists (`/favicon2.png`). No OG image.
- Gap: should we generate an OG image? If so, what should it contain?

## Analytics

- Vercel Analytics and Speed Insights were removed during the StyleX
  migration.
- Gap: should we re-add them? If so, which ones?

## Sitemap

- `sitemap.xml` exists as a dynamic route. No manual sitemap.
- Gap: is the dynamic sitemap sufficient, or should we add a static one?
