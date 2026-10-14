---
schema: 1
id: define-elevation-and-layering
kind: prompt
title: Define elevation and layering rules
description: Defines a design system's elevation levels, shadow and surface tokens per theme, and a named layering scale for overlays, with stacking rules for dialogs, menus, toasts and sticky elements.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, frontend-engineer]
requires: [none]
inputs: [text, spec, image]
output: [docs, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [elevation, shadows, z-index, stacking-context, overlays]
pairs_with:
  prompts: [define-design-tokens, design-dark-mode, fix-css-layout-bug]
  personas: [design-systems-lead, frontend-engineer]
args:
  - name: context
    description: The product and themes, the overlays and sticky elements you have (menus, dialogs, drawers, toasts, tooltips, sticky headers), current shadow values and z-index values, and any stacking bugs you see.
    type: text
    required: true
  - name: platforms
    description: Optional. Platforms to cover, e.g. "web only" or "web, iOS, Android".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Elevation levels, Shadow and surface tokens, Layering scale, Stacking rules, Platform notes, Migration, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Elevation tells people what sits above what and what they can interact with. Systems drift into dozens of slightly different shadows and z-index values like 999, 9999 and 99999 that teams escalate whenever something hides behind something else. The fix is two small scales: a handful of elevation levels (often four to six) mapped to roles such as raised card, menu, dialog, and a named layer scale (base, sticky, dropdown, overlay, modal, toast, tooltip) with gaps between values. Experts also know why bigger numbers often do not help: `transform`, `opacity` below 1, `filter`, `position: fixed` or `sticky` and some other properties create a new stacking context, and z-index only competes inside its own context, so overlays belong in a portal or, better, the browser's top layer via the native `dialog` element and the popover API. In dark themes shadows barely show, so elevation moves to lighter surface tones. Native platforms express elevation differently (tonal surfaces on Android Material, materials and blur on iOS).
</context>

<task>
Define elevation and layering for this system.

<context_from_user>
{{context}}
</context_from_user>
{{#platforms}}
Platforms: {{platforms}}.
{{/platforms}}

1. **Elevation levels.** Four to six named levels, each with its purpose and the components that use it. Merge existing near-duplicate shadows into these levels and list the mapping.
2. **Shadow and surface tokens.** Per level and theme: shadow values (a key shadow plus a softer ambient shadow is a common recipe) for light themes, and surface tone changes for dark themes. Use the given values where possible and mark proposals.
3. **Layering scale.** Named layers with numeric values and gaps (for example steps of 100), as tokens. State which layers must never be used for ordinary content.
4. **Stacking rules.** Toast versus modal, menu inside a dialog, nested dialogs, tooltip inside a popover, sticky headers versus dropdowns, and the order of focus and inert background for modals. Recommend rendering overlays in a portal or the top layer (native `dialog` with `showModal()`, the popover API) and explain how that avoids z-index conflicts.
5. **Diagnose stacking bugs.** For each bug in the context, explain the likely cause (often a stacking context created by an ancestor) and the fix, instead of a larger number.
6. **Platform notes.** If native platforms are in scope, map levels to their elevation models.
7. **Migration.** How to replace existing ad hoc values: search for `z-index` and `box-shadow` usages, map them to tokens, and add a lint rule against raw values.
</task>

<constraints>
- Never solve a stacking problem by raising a number without explaining the stacking context.
- Do not rely on shadow alone to show a state such as selected or focused.
- Do not invent the product's existing values or components; mark proposals.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Elevation levels, tokens and the layering scale as tables; a CSS excerpt in a fenced block. End with Open questions.
</output_format>
