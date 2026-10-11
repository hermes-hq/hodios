---
schema: 1
id: fix-reflow-and-text-resize
kind: prompt
title: Fix reflow and text resize
description: Fixes layouts that break at 400% zoom, 200% text size or custom text spacing, finding fixed heights, clipped text and sideways scrolling, with CSS changes mapped to WCAG 1.4.4, 1.4.10 and 1.4.12.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [html-css]
requires: [none]
inputs: [file, text]
output: [code, report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [reflow, zoom, text-spacing, responsive-layout, low-vision, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, fix-keyboard-navigation]
args:
  - name: code
    description: The HTML and CSS (or component and styles) of the page or component that breaks, including any global styles, breakpoints and sticky elements.
    type: text
    required: true
  - name: symptoms
    description: Optional. What goes wrong and where, for example "at 400% zoom the filter sidebar covers the results" or "text is cut off in buttons when users set larger text".
    type: text
output_contract:
  format: markdown
  sections: [Findings, CSS changes, Exceptions, Test steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Low-vision users zoom the browser to 200 to 400 percent, raise the default font size, or apply their own line and letter spacing with a bookmarklet or extension. Three WCAG criteria cover this: 1.4.4 Resize Text (text to 200% without loss of content or function), 1.4.10 Reflow (at a 320 CSS pixel wide viewport, which is 1280px at 400% zoom, content fits without scrolling in two directions, except for content that needs two-dimensional layout such as maps, data tables and diagrams) and 1.4.12 Text Spacing (line height 1.5, paragraph spacing 2x, letter spacing 0.12em, word spacing 0.16em with nothing clipped or overlapping). The usual culprits are fixed heights on text containers, `overflow: hidden` on anything holding text, widths and font sizes in px that ignore the user's font setting, media queries in px that never trigger at zoom, sticky headers and footers that eat most of a zoomed viewport, and `maximum-scale` or `user-scalable=no` in the viewport meta tag. Mobile-first responsive CSS usually passes reflow for free; desktop-only layouts rarely do.
</context>

<task>
<code>
{{code}}
</code>
{{#symptoms}}
Reported symptoms: {{symptoms}}
{{/symptoms}}

1. Read the code and list every pattern that will fail at 320 CSS px width, 200% text size or the 1.4.12 spacing values: fixed `height` or `max-height` on text, `overflow: hidden` or `text-overflow: ellipsis` hiding meaningful text, px font sizes and line heights, absolute positioning of text, `white-space: nowrap` on long strings, fixed-width containers, sticky or fixed elements taller than about a quarter of a small viewport, and viewport meta settings that block zoom.
2. For each, say which criterion it fails, what the user loses (text cut off, controls unreachable, sideways scrolling on every line) and how sure you are from the code alone.
3. Write the CSS change: `min-height` instead of `height`, rem or em units, `flex-wrap` and grid `minmax()` so columns stack, `overflow-wrap: anywhere` for long tokens, media queries in em so they respond to zoom and font size, sticky elements that stop sticking below a height threshold, and removal of zoom-blocking viewport settings.
4. Name the content that may keep two-dimensional scrolling under the 1.4.10 exception (data tables, maps, code blocks, diagrams) and make sure only that region scrolls, not the whole page, and that the region is keyboard scrollable.
5. Give a manual test: browser at 1280px wide zoomed to 400%, default font size raised to 200%, and a text spacing override applied, with what to check on each.
</task>

<constraints>
- Change only what the failures need; do not redesign the layout or the visual style.
- Do not hide content at small widths to make it fit; content and function must remain available, though they may move.
- Never suggest disabling zoom or setting a maximum scale.
- Mark findings you cannot confirm from code alone (for example layout shaped by JavaScript at runtime) as "check in the browser".
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Findings
Table: # | Selector or element | Pattern | Criterion (1.4.4, 1.4.10 or 1.4.12) | User impact | Confidence.

## CSS changes
Before and after CSS per finding, ready to paste.

## Exceptions
Regions that may scroll in two directions and how they are contained.

## Test steps
Checklist for 400% zoom, 200% text and the text spacing override.
</output_format>
