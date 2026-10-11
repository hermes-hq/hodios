---
schema: 1
id: define-spacing-scale
kind: prompt
title: Define a spacing and sizing scale
description: Defines a spacing and sizing scale with a base unit, steps, token names, control and icon sizes, and rules for padding, gaps and layout spacing.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, config, image]
output: [table, code, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [spacing, sizing, design-tokens, touch-targets, padding-and-gaps]
pairs_with:
  prompts: [define-design-tokens, define-layout-grid-and-breakpoints, design-density-modes, audit-hardcoded-styles-against-tokens]
  personas: [design-systems-lead]
args:
  - name: product
    description: The product, its platforms, and how dense its main screens are (data tables, forms, content pages, touch-first mobile).
    type: text
    required: true
  - name: current
    description: Optional. Spacing values found in designs or code today, control heights, and any existing token names.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Base unit and steps, Spacing tokens, Sizing tokens, Usage rules, Code, Migration from current, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most products end up with dozens of one-off spacing values because the scale was either too sparse at the small end or too linear at the large end. A good scale uses a 4px base (or 8px with a 4px half step) with small increments where components need precision (2, 4, 8, 12, 16) and wider jumps for layout (24, 32, 48, 64, 96). Token names should not encode a value that might change (`space-16`) or an ambiguous size order that leaves no room to insert (`small`, `medium`); numeric multipliers or a 100-based scale (`space-100`, `space-150`) age better, and semantic aliases (`space-inset-md`, `space-stack-lg`) can sit on top. Spacing is not sizing: control heights, icon sizes and touch targets need their own tokens. Touch targets have floors: WCAG 2.5.8 sets a 24 by 24 CSS pixel minimum, and Apple and Material guidance recommend about 44pt and 48dp for touch. Components should own their inner padding and never their outer margin; the parent decides the gap between children, which keeps components reusable. Whether spacing is in rem (scales with the user's font size) or px (stays fixed) is a real trade-off and should be decided once, on purpose.
</context>

<task>
Define the spacing and sizing scale for this product.

<product>
{{product}}
</product>
{{#current}}

<current>
{{current}}
</current>
{{/current}}

1. **Base unit and steps.** Choose the base unit and the steps (usually 10 to 14 values including 0), and explain why the small and large ends are shaped the way they are for this product.
2. **Spacing tokens.** A table with token name, value in px and rem, and typical use. Recommend one naming scheme and say why; add a small set of semantic aliases (inset, stack, inline, layout section) only if they will be used.
3. **Sizing tokens.** Control heights (for example small, medium, large inputs and buttons), icon sizes, avatar sizes and minimum touch target, aligned to the base unit. State the touch target floor used and its source.
4. **Usage rules.** Inner padding is owned by the component; outer spacing is set by the parent with gap or layout primitives; how spacing relates to the type scale's line heights; when an off-scale value is allowed (for example 1px borders and optical corrections) and how it is documented.
5. **Code.** CSS custom properties and, where relevant, an excerpt for the user's platform (Tailwind theme, iOS or Android constants). Decide rem or px for spacing and state the trade-off.
6. **Migration from current.** If current values are given, map each to the nearest step, list values that disappear, and flag changes larger than 2px that will be visible.
7. If the product is touch-first, check every control size against the touch target floor and list any that fall short.
</task>

<constraints>
- Do not invent current values or measurements; mark every proposal as proposed.
- Do not add steps nobody needs to make the scale look complete; justify each.
- Do not cite touch target figures other than the ones named here unless the user gives a platform guideline.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Tokens and migration as tables, code in fenced blocks. End with Open questions.
</output_format>
