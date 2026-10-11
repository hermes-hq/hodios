---
schema: 1
id: design-layout-primitives
kind: prompt
title: Design layout primitives
description: Designs a design system's layout primitives such as Stack, Inline, Grid, Box and Sidebar, with props, spacing rules, semantics, examples and the misuse each prevents.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [frontend-engineer, designer]
stack: [html-css]
requires: [none]
inputs: [text, file, config]
output: [code, docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [layout-primitives, composition, component-api, css-layout, spacing-tokens]
pairs_with:
  prompts: [design-component-api, define-layout-grid-and-breakpoints, audit-component-duplication, audit-hardcoded-styles-against-tokens]
  personas: [design-systems-lead]
args:
  - name: system
    description: Your framework, styling approach (CSS modules, Tailwind, CSS-in-JS, plain CSS), spacing tokens, and the layouts product teams keep rebuilding.
    type: text
    required: true
  - name: current
    description: Optional. Existing layout components or wrapper divs, with their props or a code excerpt, and the problems they cause.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Primitive set, API per primitive, Spacing and semantics rules, Code, Examples, What not to build, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most one-off CSS in product code is layout: a flex row with a gap, a vertical stack, a card grid, a sidebar next to content. A handful of layout primitives removes most of it, as shown by the "Every Layout" approach (Stack, Cluster, Sidebar, Switcher, Grid, Center, Cover). The design rules that make them work: spacing props accept only spacing tokens, never raw values; primitives use `gap` instead of margins on children; components never set their own outer margin, so the parent primitive owns spacing between things; responsive behaviour comes from intrinsic CSS (`flex-wrap`, `minmax()` with `auto-fit`, container queries) before breakpoint props. Two failure modes are common. A `Box` that accepts every CSS property becomes a second styling language and brings back the hard-coded values the system was meant to remove. And props that reverse visual order (`reverse`, `order`) break the match between reading order and focus order (WCAG 1.3.2 and 2.4.3). Primitives also need a polymorphic element prop (`as`) so a Stack can be a `ul` or a `section` and keep correct semantics.
</context>

<task>
Design the layout primitives for this system.

<system>
{{system}}
</system>
{{#current}}

<current>
{{current}}
</current>
{{/current}}

1. **Primitive set.** Propose the smallest set that covers the layouts listed (usually five to seven: for example Box, Stack, Inline or Cluster, Grid, Sidebar, Center or Container, and possibly Switcher). For each, the layout job it does and the CSS technique behind it.
2. **API per primitive.** A table of props with types, allowed values (token names for spacing), defaults and whether responsive values are allowed. Include the `as` prop. Keep each API small; say which props were left out on purpose.
3. **Spacing and semantics rules.** Gap over margins; no outer margins on components; which element to render for lists and landmarks; a rule against props that reorder content visually; how primitives behave inside container queries.
4. **Code.** An implementation of two or three of the primitives in the user's framework and styling approach, typed if the stack uses TypeScript, consuming spacing tokens.
5. **Examples.** Rebuild three of the user's recurring layouts (or three common ones such as a form, a card grid and a page with a sidebar) using only the primitives, before and after.
6. **What not to build.** Props and primitives to avoid (an all-props Box, pixel spacing escape hatches, a primitive per page type) and when a layout should be a pattern component instead.
7. If current layout components are given, map each to the new set and list what to deprecate.
</task>

<constraints>
- Spacing props accept tokens only; if the user has no spacing tokens, say so and propose a minimal scale marked as proposed.
- Code must match the stated framework and styling approach; do not switch libraries.
- Do not invent the user's existing components or props.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. APIs as tables, code in fenced blocks. End with Open questions.
</output_format>
