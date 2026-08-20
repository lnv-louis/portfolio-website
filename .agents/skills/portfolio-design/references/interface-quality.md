# Interface Quality

Visual and interaction quality standards for the portfolio. Every rule has
a stable ID, a source, and a concrete fix.

## Shape (radius)

The portfolio uses 0px radius (sharp aesthetic) for actions, 6px for
inputs/buttons, 8px for cards. Intent aliases: `radius.action` (0px),
`radius.input` (6px), `radius.card` (8px).

## Typography

### rule/serif-display-only
Source: src/tokens/design-tokens.css
Rule: Source Serif 4 (`text.fontDisplay`) is for display headings (h1/h2)
and the wordmark only. Never for body text, buttons, labels, or UI controls.
Why: Serif display signals editorial authority. Serif body text hurts
readability at 14-16px on screen.
Exceptions: None.
Bad: `fontFamily: text.fontDisplay` on a button or body paragraph
Good: `fontFamily: text.fontDisplay` on h1/h2 only; `font-sans` (Inter) for
everything else

### rule/mono-data-only
Source: src/tokens/design-tokens.css
Rule: JetBrains Mono (`text.fontMono`) is for data, numbers, code, paths,
eyebrows, tags, and labels only. Never for body text or headings.
Why: Mono signals "this is technical, not editorial."
Exceptions: Eyebrows and tags use mono for the technical-label aesthetic.
Bad: `fontFamily: text.fontMono` on a paragraph or heading
Good: `fontFamily: text.fontMono` on eyebrows, tags, numbers, code

### rule/sentence-case
Source: portfolio-design SKILL.md
Rule: Sentence case in body copy and headings. "Building production systems"
— never "Building Production Systems". Caption-style eyebrows (12px, weight
500, uppercase, tracking 0.12em) are the only exception.
Why: Sentence case reads as professional restraint. Title case reads as
marketing.
Exceptions: Eyebrows (uppercase, tracked), acronyms.
Bad: `Building Production Systems`, `BUILDING PRODUCTION SYSTEMS`
Good: `Building production systems`, eyebrow: `SELECTED WORK`

## Color

### rule/single-brand-voltage
Source: src/tokens/design-tokens.css
Rule: One brand voltage: Red. `#ef4444` (portfolio-brand-700) on light.
Used for primary CTAs, focus rings, accent italics, category labels. Used
scarcely — most surfaces are 90%+ neutral.
Why: A single accent creates focus. Multiple accents compete and dilute
the brand.
Exceptions: Semantic colors (positive/negative/warning) for data only.
Bad: `bg-blue-500`, `text-red-600` for branding, a second accent color
Good: `color.primary`, `color.onPrimary`, token references

### rule/semantic-color-only
Source: src/tokens/design-tokens.css
Rule: Positive (#10b981), Negative (#dc2626), Warning (#f59e0b) are
semantic only — gains/losses, risk flags. No decorative color.
Why: Color earns its presence by carrying meaning.
Exceptions: Brand mark, chart series.
Bad: A colored badge on a non-interactive element "for visual interest"
Good: Red for primary actions, green for gains, semantic tokens for data

### rule/no-hardcoded-colors
Source: portfolio-design SKILL.md, src/tokens/design-tokens.css
Rule: Never hardcode brand colors at the call site. Use tokens: `color.primary`,
`color.ink`, `color.hairline`. The only hex values live in
`src/tokens/design-tokens.css`.
Why: Hardcoded colors bypass theming and create drift.
Exceptions: None.
Bad: `backgroundColor: '#ef4444'`, `color: '#0a0a0a'`
Good: `backgroundColor: color.primary`, `color: color.ink`
Lint: ast-grep rule `no-hardcoded-colors` (error)

## Depth

### rule/hairlines-not-shadows
Source: portfolio-design SKILL.md
Rule: Cards and in-flow surfaces separate via 1px hairline borders
(`color.hairline`, `color.hairlineStrong`), never drop shadows. Drop shadows
are reserved for genuinely floating UI (modals, popovers, dropdowns).
Why: Hairlines read as editorial precision. Shadows read as consumer app
chrome.
Exceptions: Floating UI (modals, popovers, dropdowns).
Bad: `boxShadow: shadow.s4` on a card
Good: `borderColor: color.hairline`, `borderWidth: '1px'` on cards

## Layout

### rule/max-width-tokens
Source: src/tokens/design-tokens.css
Rule: Use the width tokens, not arbitrary values: `layout.containerWide`
(1400px) for the rail, `layout.containerMax` (1200px) for content,
`layout.proseMax` (680px) for prose.
Why: Wide lines hurt readability. Consistent widths create rhythm.
Exceptions: Full-bleed hero.
Bad: `maxWidth: '80rem'`, `maxWidth: '1280px'`
Good: `maxWidth: layout.containerWide`, `maxWidth: layout.proseMax`

### rule/no-hardcoded-pixels
Source: portfolio-design SKILL.md
Rule: No hardcoded pixel values in StyleX styles. Use token references
(`space.*`, `text.size*`, `radius.*`). Exceptions: `1px` borders, focus
rings.
Why: Token references keep the system consistent and themeable.
Exceptions: 1px borders, 2px focus rings, breakpoint definitions.
Bad: `padding: '24px'`, `fontSize: '16px'`
Good: `padding: space.lg`, `fontSize: text.sizeBodyMd`

### rule/dvh-not-vh
Source: portfolio-design SKILL.md
Rule: Use `minHeight: '100dvh'`, never `100vh` or `100%`. Mobile browser
chrome makes vh taller than the visible viewport.
Why: 100vh clips content under mobile browser toolbars. dvh tracks the
visible viewport.
Exceptions: None.
Bad: `minHeight: '100vh'`
Good: `minHeight: '100dvh'`
Lint: ast-grep rule `no-vh-units` (error)

### rule/spacing-scale
Source: src/tokens/design-tokens.css
Rule: Spacing uses the 12-step scale: xxs(4) · xs(8) · sm(12) · md(16) ·
lg(24) · xl(32) · 2xl(40) · 3xl(48) · 4xl(64) · 5xl(96) · 6xl(128) ·
section(192). Use `space.*` tokens.
Why: A consistent grid creates rhythm. Arbitrary spacing creates visual
noise.
Exceptions: 1px borders.
Bad: `padding: '20px'`, `gap: '15px'`
Good: `padding: space.lg` (24px), `gap: space.md` (16px)

## Component choice

### rule/design-system-first
Source: src/tokens/page-shell.stylex.ts
Rule: Reach for page-shell recipes first (`displayTitleLg`, `displayTitleMd`,
`eyebrow`, `bodyLg`, `bodyMd`, `bodySm`). Then compose with StyleX tokens.
Hand-roll only as a last resort.
Why: The recipes encode the editorial visual language. Hand-rolled
equivalents drift.
Exceptions: When the recipe doesn't fit the specific use case.
Bad: Hand-rolling a display title with inline fontSize/fontFamily
Good: `{...stylex.props(pageShellStyles.displayTitleMd)}`
