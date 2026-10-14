---
schema: 1
id: define-layout-grid-and-breakpoints
kind: prompt
title: Define a layout grid and breakpoints
description: Defines a design system's layout grid with breakpoints, columns, gutters, margins, max widths and container rules, plus tokens, design-file grid styles and responsive rules.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, image, spec]
output: [docs, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [layout-grid, breakpoints, responsive-design, container-queries, reflow]
pairs_with:
  prompts: [define-design-tokens, adapt-design-for-mobile, fix-reflow-and-text-resize]
  personas: [design-systems-lead, product-designer]
args:
  - name: product
    description: The product, its main page types (dashboards, reading pages, forms, marketing pages), and the devices people use.
    type: text
    required: true
  - name: platforms
    description: Optional. Platforms to cover, e.g. "web only" or "web, iOS, Android".
    type: string
  - name: current
    description: Optional. Existing breakpoints, grid settings and spacing scale, and viewport-width analytics if you have them.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Breakpoints, Grid per breakpoint, Containers and max widths, Spacing relationship, Responsive behaviour, Tokens and code, Design files, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Breakpoints chosen from a list of popular devices age within a year; breakpoints chosen where the content breaks, checked against real viewport analytics, last. Fewer is better: three to five ranges cover most products. Mobile-first `min-width` queries keep the base styles simple. Since container queries are widely supported in current browsers, components should respond to the space they are given rather than the viewport, which leaves page-level breakpoints for page layout only. Gutters and margins belong on the spacing scale. Reading content needs a maximum line length (roughly 60 to 80 characters), so wide screens need max widths, not wider text. Accessibility sets a hard floor: WCAG 1.4.10 Reflow expects content to work at 320 CSS pixels wide, which is what a 1280 pixel window at 400 percent zoom gives you. Native platforms have their own size systems (iOS size classes, Android window size classes) and should map to them rather than copy web breakpoints.
</context>

<task>
Define the layout grid and breakpoints for this product.

<product>
{{product}}
</product>
{{#platforms}}Platforms: {{platforms}}.
{{/platforms}}{{#current}}

<current>
{{current}}
</current>
{{/current}}

1. **Breakpoints.** Propose named ranges (for example `sm`, `md`, `lg`, `xl`) with min widths, and justify each by the content it serves. If analytics are given, show how the ranges fit them; if not, say what to measure.
2. **Grid per breakpoint.** A table of columns, gutter, outer margin and whether margins are fixed or fluid, per range.
3. **Containers and max widths.** Max widths for reading pages, forms, dashboards and full-bleed sections; how content centres; maximum line length for text.
4. **Spacing relationship.** Tie gutters and margins to the spacing scale; if no scale is given, propose one and mark it proposed.
5. **Responsive behaviour.** Rules for common patterns: navigation, sidebars, card grids, data tables, forms, dialogs. Say which should use container queries and which page breakpoints. Confirm every pattern works at 320 CSS pixels wide.
6. **Tokens and code.** Token names for breakpoints, columns, gutters and max widths; a CSS excerpt with custom properties and media and container queries, noting that custom properties cannot be used inside media query conditions, so breakpoints need a preprocessor, build step or duplicated values.
7. **Native platforms.** If iOS or Android are in scope, map the grid to iOS size classes and Android window size classes instead of pixel breakpoints, and report the mapping under Breakpoints.
8. **Design files.** Grid styles to create in the design tool for each breakpoint, and frame widths designers should use for handoff.
</task>

<constraints>
- Do not define breakpoints per device model.
- Do not invent analytics figures or existing values; mark proposals.
- Keep the number of breakpoints as low as the content allows and say why each exists.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Breakpoints and grid as tables, code in fenced blocks. End with Open questions.
</output_format>
