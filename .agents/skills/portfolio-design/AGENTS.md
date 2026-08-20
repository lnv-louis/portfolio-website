# portfolio-design — Skill Governance

## Load order

When this skill is invoked, load files in this order:

1. **`SKILL.md`** — entry point. Resolves request mode, sets scope, defines workflow.
2. **`references/rules.md`** — stable-ID rule index with lint status. Check this first to know what's deterministically enforced.
3. **`references/product-judgment.md`** — for Shape, Implement, Harden, or full Review modes.
4. **`references/surfaces.md`** — routes to the correct surface-specific reference.
5. **`references/interface-quality.md`** — for any material visual change or full review.
6. **`references/resilience.md`** — when designing or reviewing states beyond the happy path.
7. **`references/copy.md`** — when editing user-facing language or accessible names.
8. **`references/patterns.md`** — when choosing interaction patterns.
9. **`references/glossary.md`** — when using product terminology.
10. **`references/coverage-gaps.md`** — when checking if a standard exists.
11. **`exemplars/pr-*.md`** — when relevant to the current decision.

Do not load all references unconditionally. Load only what the request mode and surface require (see SKILL.md § Workflow step 5).

## Validation

Before claiming work is complete under this skill:

1. **Lint checks pass:** `bun run lint`
2. **Build passes:** `bun run build`
3. **Design system rules:** ast-grep rules in `sg-rules/` return 0 error-severity hits
4. **Visual verification:** screenshots or live inspection of the changed surface
5. **State coverage:** every materially changed reachable state has been exercised
6. **Copy check:** all user-facing text follows `references/copy.md`

## Governance

### Adding a new rule
1. Verify the rule against current source code (not just one example).
2. Write the rule with: stable ID, source, rule statement, why, exceptions, bad/good examples.
3. If a linter can enforce it reliably, add an ast-grep rule in `sg-rules/`.
4. If it needs product context, keep it in prose in the relevant reference file.
5. Record the decision in an exemplar if it's a significant product decision.
6. Human review required before merging.

### Changing an existing rule
1. Read the current rule and its source.
2. Verify the change against current source code.
3. Update the rule, its source reference, and any lint rules.
4. Record the change in an exemplar.
5. Human review required before merging.

### Removing a rule
1. Verify the rule is no longer needed (the pattern it prevented is no longer a risk).
2. Remove the rule, its lint rule, and any references to it.
3. Record the removal in an exemplar.
4. Human review required before merging.

## What lives where

| Artifact | Location | Purpose |
|---|---|---|
| Token SOT | `src/tokens/` | CSS custom properties + typed StyleX constants |
| Page shell recipes | `src/tokens/page-shell.stylex.ts` | Reusable StyleX recipes for display titles, eyebrows, body text |
| Page composition | `app/page.tsx` | Rail layout and section ordering |
| Components | `src/components/` | All product UI, one file per section |
| Lint rules | `sg-rules/` | ast-grep rules for deterministic enforcement |
| Skill references | `.agents/skills/portfolio-design/references/` | Product judgment, interface quality, resilience, copy, surfaces, patterns, glossary, coverage gaps |
| Exemplars | `.agents/skills/portfolio-design/exemplars/` | Documented decisions from shipped PRs |
| Decisions | `.agents/skills/portfolio-design/decisions/` | Decision log with dates and rationale |

## What does NOT live here

- **Token values** — live in `src/tokens/`, not in reference files.
- **Component API documentation** — lives with the components in `src/components/`.
- **Marketing content** — lives in the page and component source, not in this skill.
- **Test fixtures** — not yet implemented (see `references/coverage-gaps.md`).
