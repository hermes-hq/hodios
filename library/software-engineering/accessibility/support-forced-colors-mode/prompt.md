---
schema: 1
id: support-forced-colors-mode
kind: prompt
title: Support forced colors mode
description: Makes a web UI usable in Windows contrast themes and other forced colors modes, fixing invisible icons, focus rings, borders and states with system colour keywords and the forced-colors media query.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, designer]
stack: [html-css]
requires: [none]
inputs: [file, text]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [forced-colors, high-contrast, windows-contrast-themes, system-colors, focus-indicator, low-vision]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [review-color-contrast, fix-keyboard-navigation]
args:
  - name: code
    description: The CSS and markup of the components to fix (buttons, inputs, icons, toggles, tabs, cards, focus styles), or the design system's base styles.
    type: text
    required: true
  - name: symptoms
    description: Optional. What users or testers saw, for example "checkbox state invisible in Windows contrast theme" or "icons disappear".
    type: text
output_contract:
  format: markdown
  sections: [Will break, Fixes, Do not override, Test steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In forced colors mode (Windows contrast themes, and some browser or extension settings) the browser replaces author colours with a small user-chosen palette: text, background, links, button text and face, highlight, and disabled text. Backgrounds become one colour, `box-shadow` is removed, `background-image` gradients may vanish, and anything that relied on colour alone disappears. Typical breakage: focus rings drawn with `box-shadow` or `outline: none` plus a coloured background; custom checkboxes, radios and toggles whose state is a background colour; icons drawn as CSS backgrounds or SVGs with hard-coded fills; borders set to `transparent` so buttons no longer look like buttons; selected tabs and rows marked only by colour; and disabled states with no other cue. The fix is not to switch the mode off with `forced-color-adjust: none` everywhere; it is to make the defaults survive (transparent outlines and borders that turn visible, `currentColor` SVGs) and use `@media (forced-colors: active)` with CSS system colours (`CanvasText`, `Canvas`, `LinkText`, `ButtonText`, `ButtonFace`, `Highlight`, `HighlightText`, `GrayText`) for the rest.
</context>

<task>
<code>
{{code}}
</code>
{{#symptoms}}
Reported: {{symptoms}}
{{/symptoms}}

1. Predict what each component looks like under forced colors: which borders, focus indicators, icons, states (checked, selected, current, disabled, error) and separators will disappear or merge with the background.
2. Apply default-safe fixes first: replace `outline: none` with a transparent outline that becomes visible (`outline: 2px solid transparent` plus the existing visual style), give buttons and inputs a transparent border instead of none, and make SVG icons use `fill="currentColor"` or `stroke="currentColor"`.
3. Add a `@media (forced-colors: active)` block for what still breaks: system colours for selected and checked states (`Highlight` and `HighlightText`), `GrayText` for disabled, borders on cards and menus, and a visible indicator for current page or selected tab that is not colour alone (a border, underline or icon).
4. Use `forced-color-adjust: none` only where author colours carry meaning the user needs (colour swatches, charts with their own patterns) and say why in a comment.
5. Write test steps: turn on a dark and a light contrast theme on Windows (or emulate forced colors in browser developer tools), then tab through and operate each component.
</task>

<constraints>
- Respect the user's chosen colours; never force a light or dark palette back on.
- Do not change the default (non-forced) appearance except where a transparent border or outline is invisible by design.
- Mark behaviour that differs between browsers or that you cannot confirm as "verify in the browser".
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Will break
Table: Component | What disappears | Why.

## Fixes
CSS per component: default-safe changes, then the forced-colors block.

## Do not override
Places where `forced-color-adjust: none` is justified, or "none".

## Test steps
Checklist for light and dark contrast themes and browser emulation.
</output_format>
