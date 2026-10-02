---
schema: 1
id: critique-ui-screen
kind: prompt
title: Critique a UI screen
description: Critiques one interface screen for hierarchy, layout, consistency, clarity and accessibility against its goal, and returns prioritised, concrete fixes. Use when reviewing a mockup or live screen.
category: ui-design
version: 1.0.0
status: incubating
stage: [review, design]
role: [designer, product-manager, frontend-engineer]
requires: [none]
inputs: [image, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [design-critique, visual-hierarchy, mockup-review]
pairs_with:
  prompts: [run-heuristic-evaluation, audit-design-consistency, write-ux-microcopy]
  personas: [product-designer]
args:
  - name: screen
    description: A screenshot of the screen, or a description of every element, its position, size, colour and text. Name the state shown (default, empty, error).
    type: text
    required: true
  - name: goal
    description: What the screen must help the user do, and what the business needs from it. Optional; without it the goal is inferred and stated.
    type: text
  - name: platform
    description: Platform whose conventions apply.
    type: enum
    enum: [web, ios, android, desktop]
    default: web
output_contract:
  format: markdown
  sections: [Verdict, What works, Issues, Revised layout, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Unhelpful design feedback is either taste ("I'd make it pop more") or a flat list of thirty nits with no order. Useful critique starts from what the screen is for, checks whether the eye lands on the thing that matters, and ranks problems by how much they get in the way of the goal. Every point names an element, says what is wrong for the user, and proposes a specific change.
</context>

<task>
Critique this {{platform}} screen.

<screen>
{{screen}}
</screen>
{{#goal}}
<goal>
{{goal}}
</goal>
{{/goal}}

1. State the screen's primary goal and primary action. If no goal was given, infer it and say so.
2. First-glance test: say what the eye lands on first, second and third. Compare that with what should come first given the goal.
3. Review, in this order, and note only real problems:
   - **Hierarchy:** one clear primary action; size, weight, colour and position used to rank content; competing emphasis.
   - **Layout:** grid and alignment, grouping and proximity, spacing rhythm, density, scanning path, what sits above the fold or first viewport.
   - **Consistency:** within the screen (same thing styled the same way) and with {{platform}} conventions (Apple Human Interface Guidelines for ios, Material Design for android, platform norms for desktop, familiar web patterns for web).
   - **Clarity:** labels, button text, icons without labels, affordances, feedback, and which states are missing (empty, loading, error, disabled).
   - **Accessibility:** text contrast (4.5:1 for body text, 3:1 for large text and UI components), touch or click target size (44 by 44 pt on iOS, 48 by 48 dp on Android, at least 24 by 24 CSS px on the web), text size, meaning carried by colour alone, and a reading and focus order that matches the visual order.
4. Prioritise each issue: **P1** blocks or misleads the user on the primary goal; **P2** adds friction or doubt; **P3** polish.
5. For each issue give a fix specific enough to apply ("Make 'Start trial' the only filled button; turn 'Compare plans' into a text link"), not a direction ("improve hierarchy").
6. Describe the revised layout in a few lines, top to bottom.
7. If the input is too vague to judge (no content, no layout), ask for a screenshot or a fuller description and stop.
</task>

<constraints>
- Judge against the goal and the platform, not personal taste. If something is a matter of taste, say so and keep it out of P1 and P2.
- Do not estimate contrast ratios by eye and present them as measured. If exact colours are not given, say a contrast check is needed.
- When working from a description, say which judgements depend on details you cannot see.
- Keep what already works; name it so it is not changed by accident.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
2 to 3 sentences: does the screen serve its goal, and the single biggest change.
## What works
Up to 4 bullets.
## Issues
| Priority | Element | Issue for the user | Category | Fix |
Sorted P1 to P3.
## Revised layout
Top-to-bottom description of the screen after the P1 and P2 fixes.
## Questions
Anything that would change the critique, such as audience, constraints or data.
</output_format>
