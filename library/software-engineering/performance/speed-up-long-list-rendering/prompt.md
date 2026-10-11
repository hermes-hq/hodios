---
schema: 1
id: speed-up-long-list-rendering
kind: prompt
title: Speed up rendering of long lists and tables
description: Makes a web page with thousands of rows fast by measuring render cost and choosing pagination, virtualization or content-visibility, keeping find-in-page, keyboard and screen readers working.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript, html-css]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [virtualization, windowing, data-tables, dom-size, inp]
pairs_with:
  prompts: [fix-react-rerenders, improve-web-vitals, fix-data-table-accessibility]
  personas: [performance-engineer]
args:
  - name: target
    description: The page or component, the number of rows or items, row complexity (fixed or variable height, images, inputs), and the framework.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Result, Measurements, Approach chosen, Changes made, Accessibility and behaviour checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rendering thousands of rows creates tens of thousands of DOM nodes; the cost lands in style recalculation, layout and memory, and shows up as a slow first render, janky scrolling and poor interaction responsiveness. There are three levers with different trade-offs. Pagination or "load more" is simplest and keeps every browser feature working. Virtualization (windowing) renders only visible rows and scales to any size, but breaks the browser's find-in-page, makes off-screen rows invisible to screen readers and keyboard navigation unless handled, needs known or measured row heights, and complicates sticky headers and scroll restoration. CSS `content-visibility: auto` with `contain-intrinsic-size` skips rendering work for off-screen content while keeping it in the DOM, which keeps find-in-page and accessibility, but does not reduce DOM size or memory. Often the list is also slow because each row re-renders on every change or does expensive work (date formatting, image decoding at full size).
</context>

<task>
Target: {{target}}

1. Measure with a production build in the browser's performance tools: initial render time, DOM node count, scripting versus style and layout time, scroll frame rate, and an interaction delay for a typical action (filter, select a row). Note the device and CPU throttling used.
2. Check per-row costs first: unnecessary re-renders of all rows on a single change, unstable keys, heavy formatting in render, full-size images, layout reads inside loops.
3. Choose the approach and explain it: pagination if users do not need to scroll through everything; `content-visibility` if the DOM size is acceptable and find-in-page matters; virtualization if item counts are large or unbounded. For virtualization pick fixed or measured heights and an overscan amount.
4. Implement it. For virtualization: keep a real table or list structure with `aria-rowcount` and `aria-rowindex` (or set size and position for lists), keep keyboard focus on a row when it scrolls out and back, restore scroll position on navigation back, and provide in-app search if find-in-page is lost.
5. Re-measure the same scenarios and report before and after.
</task>

<constraints>
- Do not virtualize lists of a few hundred simple rows when fixing row costs is enough; say so.
- Accessibility must not regress: screen reader row counts, keyboard navigation and focus visibility.
- Report measured numbers from a production build.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
One line: initial render, DOM nodes and interaction delay before and after.
## Measurements
Table: metric | before | after.
## Approach chosen
Pagination, content-visibility or virtualization, and why.
## Changes made
The diff summary.
## Accessibility and behaviour checks
Checklist: find-in-page or replacement, keyboard, screen reader counts, scroll restoration, sticky header.
</output_format>
