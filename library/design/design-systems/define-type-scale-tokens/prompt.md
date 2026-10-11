---
schema: 1
id: define-type-scale-tokens
kind: prompt
title: Define a type scale as tokens
description: Defines a UI typography scale as tokens with role names, sizes, line heights, weights, letter spacing and responsive steps, plus code and design-file styles.
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
tags: [typography, type-scale, design-tokens, responsive-type, fluid-type]
pairs_with:
  prompts: [define-design-tokens, pair-typefaces, generate-platform-token-files, define-layout-grid-and-breakpoints]
  personas: [design-systems-lead]
args:
  - name: product
    description: The product, its main screen types (dense dashboards, reading pages, marketing pages, forms) and the platforms it runs on.
    type: text
    required: true
  - name: fonts
    description: The typefaces in use and the weights you actually load or license.
    type: text
    required: true
  - name: current
    description: Optional. The font sizes, heading styles or text styles in use today, even if inconsistent, and your spacing base unit.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Scale rationale, Type roles, Responsive behaviour, Tokens and code, Design-file styles, Migration from current, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A UI type scale fails in predictable ways. Teams name styles after HTML levels (`h1` to `h6`), so a card title that must be an `h3` for document structure cannot look small, and visual size gets tied to semantics. Role names (display, headline, title, body, label, caption) with size steps fix that: the heading level is chosen in markup, the style by role. A mathematical ratio (1.125 to 1.333) gives a coherent start, but dense product UI needs small steps at the bottom and larger jumps only at display sizes, so ratios get rounded and adjusted by hand. Line heights should be unitless in CSS, tighter for large text (about 1.1 to 1.3) and looser for body text (about 1.4 to 1.6), and resolve to whole pixels on the spacing grid so baselines and component heights line up. Large sizes usually need slightly negative letter spacing. Sizes belong in `rem` on the web so user font settings work, and fluid `clamp()` sizes must keep a `rem` part, or text stops scaling with browser zoom and fails WCAG 1.4.4 Resize Text. Native platforms have their own systems: iOS Dynamic Type text styles and Android `sp` units with the user's font scale, which the tokens should map to, not override. Every weight in the scale must be a weight that is actually loaded, or browsers synthesise a fake bold.
</context>

<task>
Define the type scale for this product as tokens.

<product>
{{product}}
</product>

<fonts>
{{fonts}}
</fonts>
{{#current}}

<current>
{{current}}
</current>
{{/current}}

1. **Scale rationale.** Choose a base body size (16px on the web unless the product gives a reason) and a ratio or hand-tuned set of steps. Explain the choice for this product's density, and keep the total number of sizes small (usually 8 to 12).
2. **Type roles.** A table of roles and sizes (for example `display-lg`, `headline-md`, `title-sm`, `body-md`, `label-sm`, `caption`), each with font family, size in px and rem, line height (unitless and resolved px), weight, letter spacing, and intended use. Say which roles may be used with which heading levels and that heading level is set in markup.
3. **Responsive behaviour.** Say which roles change across breakpoints. Give either stepped values per breakpoint or `clamp()` formulas that keep a `rem` term, with the minimum and maximum. Body and label sizes should normally stay fixed.
4. **Tokens and code.** Primitive tokens (font families, sizes, line heights, weights, tracking) and composite role tokens that reference them, in the W3C design tokens format (`$type: typography`) or the user's existing token format, plus a CSS excerpt with custom properties and one utility class or mixin per role. If iOS or Android are in scope, map each role to the nearest Dynamic Type text style and to `sp` values.
5. **Design-file styles.** The text styles to create in the design tool, named to match the tokens, and which values should be bound to variables.
6. **Migration from current.** If current sizes are given, map each to the nearest new role, list sizes that disappear, and flag places where the change is visible (more than 2px).
7. Check every weight used against the loaded weights and every line height against the spacing base unit; report any mismatch.
</task>

<constraints>
- Use only the given typefaces and weights; propose new weights only as a marked option with the cost of loading them.
- Do not size text in px only on the web, and do not use viewport units without a rem term.
- Do not invent current values or analytics; mark every proposal as proposed.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Roles and migration as tables, tokens and CSS in fenced code blocks. End with Open questions.
</output_format>
