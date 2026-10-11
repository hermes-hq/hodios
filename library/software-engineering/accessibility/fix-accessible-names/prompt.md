---
schema: 1
id: fix-accessible-names
kind: prompt
title: Fix accessible names
description: Finds controls, links and images whose accessible name is missing, wrong or misleading, computes what assistive technology actually gets, and fixes it with visible text first and ARIA last.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, review]
role: [frontend-engineer, fullstack-engineer]
stack: [html-css]
requires: [none]
inputs: [file, text]
output: [code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [accessible-name, aria-label, icon-buttons, link-text, label-in-name, voice-control]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [preview-screen-reader-announcements, fix-form-accessibility, audit-web-accessibility]
args:
  - name: markup
    description: Rendered HTML or component code containing the buttons, links, icons, inputs and images to check.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Name table, Fixes, Patterns to keep]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every interactive element has an accessible name computed by the browser following the Accessible Name and Description Computation: `aria-labelledby` wins, then `aria-label`, then native labelling (a `label` element, `alt`, button or link content, `title` as a last resort). Mistakes are common and silent: icon buttons with an SVG and no text announce as "button"; `aria-label` overrides visible text so the spoken name and the visible label differ, which breaks voice control users who say what they see (WCAG 2.5.3 Label in Name); repeated "Read more" or "Edit" links are indistinguishable in a links list (2.4.4 Link Purpose); `aria-label` on a `div` or `span` with no role is ignored by many screen readers; an `img` inside a link with empty `alt` leaves the link nameless; and `title` tooltips are not a dependable name. The best name is short, starts with the visible text, and adds context only where needed, through visually hidden text or `aria-labelledby` pointing at existing text.
</context>

<task>
<markup>
{{markup}}
</markup>

1. For every button, link, form control, image, icon and landmark or region in the markup, compute the accessible name a browser would produce and which rule produced it.
2. Flag: empty names, names that differ from the visible label or do not start with it, generic names that repeat ("Edit", "Read more", "Click here") without context, names that include role words ("button", "link") or file names, `aria-label` on elements where it is unsupported, and decorative images that are announced.
3. Write the fix for each, in this order of preference: visible text; native labelling (`label`, `alt`); visually hidden text appended to visible text; `aria-labelledby` reusing existing text; `aria-label` only for icon-only controls.
4. For repeated controls in lists or cards, show the pattern once (for example "Edit" plus visually hidden "invoice INV-1042") and apply it.
5. List the patterns in the markup that are already correct so they are kept.
</task>

<constraints>
- Keep visible text as it is unless it is the problem; if you change it, give the new copy.
- Do not add `aria-label` where visible text already names the control.
- Do not invent the purpose of a control you cannot infer; mark it "purpose unclear" and ask.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Name table
Table: Element | Visible label | Computed name now | Rule used | Problem | Name after fix.

## Fixes
Before and after code per element or repeated pattern.

## Patterns to keep
Bullets, or "none".
</output_format>
