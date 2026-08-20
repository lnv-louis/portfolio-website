# Rules

Stable-ID rules with sources. Each rule has a deterministic lint counterpart
where possible, and a prose counterpart in `interface-quality.md` where
product judgment is needed.

## How to use this file

1. When reviewing code, check each rule against the diff.
2. When writing code, check each rule before claiming completion.
3. When a rule is violated, follow the fix in the rule's `Good` example.
4. If a rule doesn't fit the situation, check `coverage-gaps.md`.

## Deterministically enforced

ast-grep rules in `sg-rules/`, run by `bunx ast-grep scan`.

| Lint rule | Severity | What it stops |
|---|---|---|
| `no-hardcoded-colors` | error | Literal hex/rgb colors in components. Use `color.*` tokens. |
| `no-tailwind-in-components` | error | Tailwind utility classes in `src/components/`. Use StyleX. |
| `no-inline-style` | error | `style={{}}` props in components. Use StyleX. |
| `no-vh-units` | error | `vh` units. Use `dvh`. |
| `no-index-key` | warning | Array index as React key. Use a stable id. |

## Prose only — no linter enforces these

| ID | Source | Lives in |
|---|---|---|
| rule/serif-display-only | src/tokens/design-tokens.css | interface-quality.md |
| rule/mono-data-only | src/tokens/design-tokens.css | interface-quality.md |
| rule/sentence-case | portfolio-design SKILL.md | interface-quality.md |
| rule/max-width-tokens | src/tokens/design-tokens.css | interface-quality.md |
| rule/hairlines-not-shadows | portfolio-design SKILL.md | interface-quality.md |
| rule/single-brand-voltage | src/tokens/design-tokens.css | interface-quality.md |
| rule/semantic-color-only | src/tokens/design-tokens.css | interface-quality.md |
| rule/dvh-not-vh | portfolio-design SKILL.md | interface-quality.md |
| rule/spacing-scale | src/tokens/design-tokens.css | interface-quality.md |
| rule/no-hardcoded-pixels | portfolio-design SKILL.md | interface-quality.md |
| rule/canonical-product-names | glossary.md | copy.md |
| rule/no-marketing-language | portfolio voice | copy.md |

## Adding, changing, or removing a rule

See `AGENTS.md` § Governance. Register the result in the right table above.

## Rule vs heuristic

A **rule** is deterministic — it can be checked by a linter. A **heuristic**
requires product judgment and cannot be mechanically enforced. Rules live
in this file and have lint counterparts. Heuristics live in
`interface-quality.md`, `product-judgment.md`, and `copy.md` as prose.

Examples:
- "No hardcoded hex colors" is a **rule** (deterministic).
- "Use sentence case" is a **heuristic** (eyebrows are uppercase).
- "No Tailwind in components" is a **rule** (deterministic).
- "Destructive actions are proportional" is a **heuristic** (needs judgment).
