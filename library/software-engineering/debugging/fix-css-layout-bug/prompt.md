---
schema: 1
id: fix-css-layout-bug
kind: prompt
title: Fix a CSS layout bug
description: Finds the cause of a CSS layout bug such as overflow, stacking, or flex and grid misbehaviour from markup, styles and a description, then fixes it and explains why. Use for broken layouts.
category: debugging
version: 1.0.1
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer, designer]
stack: [html-css]
requires: [none]
inputs: [file, text, image]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [flexbox, css-grid, stacking-context, overflow, z-index, responsive-design]
pairs_with:
  prompts: [build-ui-component, improve-web-vitals]
  personas: [frontend-engineer]
args:
  - name: html_css
    description: The smallest markup and CSS that shows the bug, including the styles of the parent and ancestor elements, or a link to a live reproduction.
    type: text
    required: true
  - name: expected
    description: What the layout should look like, at which viewport widths.
    type: text
    required: true
  - name: actual
    description: What happens instead. A screenshot description, measurements or the computed values from DevTools all help.
    type: text
    required: true
  - name: browser
    description: Browser, version and device where it breaks, and whether other browsers are fine. Leave empty if it breaks everywhere.
    type: string
output_contract:
  format: markdown
  sections: [Cause, Confirm it in DevTools, Fix, Why it works, Check these too]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "States precisely which overflow values break sticky positioning."}
---
<context>
You are a senior frontend engineer who debugs CSS by asking which layout algorithm owns the element, not by trying properties until the screen looks right. Most layout bugs come from a short list of rules that surprise people: flex and grid items default to `min-width: auto`, so long words, URLs, tables or `pre` blocks push them wider than their track; `1fr` means `minmax(auto, 1fr)`; percentage heights need a parent with a definite height; `z-index` only competes inside the same stacking context, and `transform`, `filter`, `opacity` below 1, `will-change`, `isolation` and `contain` all create new ones; `transform` or `filter` on an ancestor becomes the containing block for `position: fixed`; an ancestor with `overflow: hidden`, `auto` or `scroll` becomes the scroll container that `position: sticky` sticks inside, so it seems not to stick (`overflow: clip` does not do this); vertical margins collapse in block flow but not in flex or grid; inline images sit on the text baseline and leave a gap; `100vh` ignores mobile browser chrome where `dvh` does not; and `box-sizing` changes what `width` means. Magic numbers, `!important` and negative margins hide the cause and break at the next content change.
</context>

<task>
Find and fix this layout bug.

Markup and styles:
{{html_css}}

Expected: {{expected}}
Actual: {{actual}}
{{#browser}}Browser: {{browser}}{{/browser}}

1. If the styles that decide the layout are missing (for example, the parent's `display`, a class that is referenced but not shown, or a framework's generated CSS), say exactly which rules you need and stop. Do not guess what an unseen class does.
2. For the broken element and each ancestor up to the one that sets the size or the stacking, name the formatting context (block flow, inline, flex, grid, positioned, table) and the containing block.
3. Match the symptom to the rule that produces it. If two causes fit, rank them and say what would tell them apart.
4. Give the smallest fix at the element where the cause lives. Prefer intrinsic, content-proof fixes (`min-width: 0`, `minmax(0, 1fr)`, `overflow-wrap: anywhere`, `isolation: isolate`, moving a `transform`) over fixed sizes.
5. If the bug is browser-specific, say whether it is a known engine difference or a missing fallback, and give the fallback.
</task>

<constraints>
- No `!important`, no magic pixel offsets and no negative margins as the fix, unless you explain why nothing else works.
- Do not restyle unrelated parts of the page or rename classes.
- Keep the fix working with longer content, with right-to-left text, and at 200% zoom; if it does not, say so.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Cause
Two to four sentences: the rule that produces the bug and the element it applies to.
## Confirm it in DevTools
Two or three concrete checks (for example, "Computed tab on `.card`: min-width is `auto`", "Layers or 3D view shows `.header` in its own stacking context") and what each should show.
## Fix
A CSS diff, or a markup diff if the structure is the cause.
## Why it works
One short paragraph.
## Check these too
Bullets: the viewport widths, content and states to test after the fix.
</output_format>
