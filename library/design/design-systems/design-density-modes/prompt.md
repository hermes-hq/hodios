---
schema: 1
id: design-density-modes
kind: prompt
title: Design density modes for a design system
description: Designs compact, default and comfortable density modes for a design system, with spacing and size tokens per mode, component rules, target-size limits and how users switch.
category: design-systems
version: 1.0.0
status: incubating
stage: [design]
role: [designer, frontend-engineer]
requires: [none]
inputs: [text, spec, image]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [density, spacing-tokens, data-dense-ui, target-size, user-preferences]
pairs_with:
  prompts: [define-design-tokens, design-interactive-table, design-internal-tool-ui]
  personas: [design-systems-lead, product-designer]
args:
  - name: product
    description: The product and its users, the main screens that feel too loose or too tight, input devices (mouse, touch, both), and platforms.
    type: text
    required: true
  - name: current_scale
    description: Optional. Current spacing scale, control heights, row heights and type sizes, as token names and values.
    type: text
output_contract:
  format: markdown
  sections: [Summary, When density changes, Density tokens, Component rules, Accessibility limits, Switching, Testing, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Density modes exist because a professional scanning 200 table rows and a first-time user on a tablet need different amounts of space. Done well, density is a remap of a small set of semantic size tokens (control height, inset padding, row height, gap) per mode, so components never contain density logic. Done badly, it shrinks type and touch targets until the product fails people with low vision or motor impairments, or it becomes a per-screen setting that makes adjacent components inconsistent. Experts change padding and heights first and type size rarely, keep compact mode for fine pointers, respect minimum target sizes (WCAG 2.2 success criterion 2.5.8 asks for at least 24 by 24 CSS pixels or enough spacing, and touch guidance from platform vendors is larger), and make sure text zoom still works in every mode.
</context>

<task>
Design density modes for this product.

<product>
{{product}}
</product>
{{#current_scale}}

<current_scale>
{{current_scale}}
</current_scale>
{{/current_scale}}

1. **When density changes.** Decide which modes are needed (often compact and default, sometimes comfortable) and what each is for. Say who chooses: the product per surface, the user, or both, and where the setting lives.
2. **Density tokens.** Define the small set of semantic size tokens that change per mode (for example control height, inset padding, row height, stack gap) with values for each mode, built on the current scale if given. List tokens that must not change with density (type sizes in most cases, border widths, focus ring).
3. **Component rules.** For buttons, inputs, selects, checkboxes, tables, lists, tabs, menus and toolbars, say what changes per mode and what stays fixed. Cover icons, line height and truncation.
4. **Accessibility limits.** Check every mode against minimum target size and spacing, text zoom to 200 percent, and focus visibility. Compact mode is for fine pointers; say what happens on touch devices (force default, or enlarge hit areas without changing the visual size).
5. **Switching.** How the mode is applied (an attribute or theme scope at the root or on a region), how a user preference is persisted, and how mixed densities on one screen are prevented or contained.
6. **Testing.** Screens to check in each mode, visual regression coverage, and checks with real data volumes and long strings.
7. If the product description does not say which input devices are used, assume both mouse and touch and say so.
</task>

<constraints>
- Do not reduce body text below the system's minimum readable size to achieve density.
- Do not invent the system's existing token names or values; mark proposals as "proposed".
- Do not cite target-size numbers beyond those you are confident of; attribute platform guidance to the platform vendor rather than quoting exact figures you cannot verify.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Density tokens and component rules as tables with one column per mode. End with Open questions.
</output_format>
