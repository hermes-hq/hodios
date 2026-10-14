---
schema: 1
id: build-accessible-tooltips
kind: prompt
title: Build accessible tooltips and toggletips
description: Builds or fixes tooltips and toggletips that open on hover, focus and touch, can be dismissed, stay while hovered, and are named or described correctly for screen readers.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer]
stack: [javascript]
requires: [repo-read, file-write]
inputs: [file, repo, text]
output: [code, tests]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [tooltip, toggletip, wcag-1-4-13, aria-describedby, touch]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [fix-accessible-names, build-aria-widget, audit-motor-accessibility]
args:
  - name: tooltip_code
    description: The tooltip component or library and a few real usages, for example icon buttons with tooltips, info icons next to form labels, truncated text with a title attribute.
    type: text
    required: true
  - name: framework
    description: The UI framework.
    type: string
    default: react
output_contract:
  format: markdown
  sections: [Usage audit, Component changes, Call site changes, Tests and manual check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Tooltip" covers three different jobs, and most bugs come from treating them the same. A label tooltip shows the name of an icon-only button; the button still needs its own accessible name, and the tooltip can provide it via `aria-labelledby` or simply repeat an `aria-label`. A description tooltip adds a hint to a control that already has a name, via `aria-describedby` and `role="tooltip"`. A toggletip is an info "i" button that reveals a short explanation on click, often with a live region so the text is read when opened; it is the right choice for touch and for content users need to read at length. WCAG 1.4.13 requires content shown on hover or focus to be dismissible (Escape, without moving the pointer or focus), hoverable (the pointer can move onto it without it vanishing) and persistent (it stays until dismissed or no longer relevant). Tooltips must never contain interactive content or essential information that exists nowhere else, and the `title` attribute is not a substitute: keyboard and touch users never see it and screen readers handle it inconsistently.
</context>

<task>
Fix tooltips in this {{framework}} codebase.

<tooltip_code>
{{tooltip_code}}
</tooltip_code>

1. Read the tooltip component and search for its usages and for `title` attributes on interactive elements. Classify each usage as label, description or toggletip, and flag usages that hide interactive content or essential information.
2. Fix the component: open on hover and on keyboard focus (not only `mouseenter`); close on Escape without moving focus, on blur and on pointer leave with a short delay; stay open while the pointer is over the tooltip; position without covering the trigger; `role="tooltip"` with an id referenced from the trigger.
3. Support the label case: when the tooltip is the only visible name of an icon button, make sure the button's accessible name equals the tooltip text, and that the name works when the tooltip is not rendered.
4. Add or fix a toggletip for info icons: a named button ("More information about delivery times"), click and Enter toggle, Escape closes, content announced when it appears, and readable on touch devices.
5. Update call sites: move essential information and any links out of tooltips into visible text or toggletips; replace `title` on controls with proper names or tooltips.
6. Respect reduced motion for tooltip animations, and check the tooltip at 400% zoom.
7. Write tests for hover, focus, Escape, hoverability and the name or description; run them and report results.
</task>

<constraints>
- Never put links, buttons or form fields inside a tooltip.
- Do not rely on `title` for any information.
- Keep the component's public API backwards compatible where possible; list breaking changes.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Usage audit
Table: location | type (label, description, toggletip) | problem | fix.

## Component changes
Diff.

## Call site changes
Diffs grouped by pattern.

## Tests and manual check
Test code, command result, manual steps for keyboard, touch and a screen reader.
</output_format>
