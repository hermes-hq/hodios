---
schema: 1
id: map-tokens-to-tailwind-config
kind: prompt
title: Map design tokens to a Tailwind theme
description: Maps a design system's tokens into the project's Tailwind theme with semantic colour utilities, spacing, type, radius and dark mode, matching the installed Tailwind version.
category: design-systems
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [tailwind]
requires: [repo-read, file-write, shell]
inputs: [repo, config, file]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [design-tokens, semantic-tokens, theming, dark-mode, utility-css]
pairs_with:
  prompts: [generate-platform-token-files, define-design-tokens, upgrade-tailwind-to-v4, audit-hardcoded-styles-against-tokens]
  personas: [design-systems-lead]
args:
  - name: tokens
    description: The token source, as a path in the repository or a pasted excerpt, with themes if any.
    type: text
    required: true
  - name: goals
    description: Optional. Whether default Tailwind palette and spacing should stay available, how dark mode is switched (class, data attribute or system setting), and naming preferences.
    type: text
output_contract:
  format: markdown
  sections: [Setup found, Mapping, Changes, Usage examples, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tailwind changes how tokens are wired between major versions. In v3 the theme lives in `tailwind.config.js` under `theme` (replace) or `theme.extend` (add), and colours backed by CSS variables need the `rgb(var(--x) / <alpha-value>)` pattern for opacity modifiers to work. In v4 the theme is defined in CSS with `@theme`, where variable namespaces create utilities (`--color-*`, `--spacing` as the base multiplier or named `--spacing-*` values, `--text-*` with `--text-*--line-height`, `--font-*`, `--radius-*`, `--shadow-*`, `--breakpoint-*`), `@theme inline` lets theme values reference runtime variables, dark mode variants are customised with `@custom-variant`, and opacity modifiers work on any colour value through `color-mix()`, so hex or OKLCH variables need no conversion. Mapping primitives only (`blue-500`) gives designers' raw palette to every class and loses the point of semantic tokens; the useful mapping exposes semantic names (`bg-surface`, `text-muted`, `border-default`) that change per theme through CSS variables, so no component needs a `dark:` variant for colours. Leaving the full default palette in place next to brand tokens invites off-system classes; removing it breaks existing code, so the choice needs an inventory first. Class names must stay complete strings in source so Tailwind can detect them.
</context>

<task>
Map these design tokens into the project's Tailwind setup.

<tokens>
{{tokens}}
</tokens>
{{#goals}}

<goals>
{{goals}}
</goals>
{{/goals}}

1. **Setup found.** Read the dependency manifest, the Tailwind config or main CSS entry, and how themes are switched today. State the installed Tailwind major version and the files you will change. If Tailwind is not installed, stop and say so.
2. **Inventory.** Search the codebase for default palette, spacing and arbitrary-value classes (`bg-[#...]`, `p-[13px]`) and count them, so the decision on keeping defaults is informed.
3. **Mapping.** A table from token to theme variable or config key to the utility it produces. Expose semantic colour tokens as utilities backed by CSS variables that change per theme; map spacing, font families, type sizes with line heights, radius and shadows. Say which primitives stay internal.
4. **Changes.** Make the edits in the version's own mechanism (config `theme.extend` or CSS `@theme`), add per-theme variable values for light and dark, and configure the dark variant to match how the app switches themes. Keep defaults unless the goals say otherwise.
5. **Usage examples.** Before and after for two existing components, using semantic utilities.
6. **Verification.** Run the existing build and type check, confirm the new utilities appear in the generated CSS, and that opacity modifiers work on token colours. Report commands and results.
</task>

<constraints>
- Follow the installed Tailwind version; do not upgrade it as part of this task.
- Do not remove default palette or spacing that existing code uses without listing the affected files and asking.
- Never build class names by string interpolation.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Mapping as a table, changes as diffs. End with Open questions.
</output_format>
