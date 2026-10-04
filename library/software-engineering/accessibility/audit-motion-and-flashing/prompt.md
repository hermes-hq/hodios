---
schema: 1
id: audit-motion-and-flashing
kind: prompt
title: Audit motion and flashing
description: Audits animations, parallax, carousels and video for vestibular and seizure risk against WCAG 2.2.2, 2.3.1 and 2.3.3, then adds reduced-motion handling and pause controls.
category: accessibility
version: 1.0.0
status: incubating
stage: [review, build]
role: [frontend-engineer, mobile-engineer, game-developer, designer]
requires: [none]
inputs: [file, text]
output: [report, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [reduced-motion, photosensitive-epilepsy, vestibular, animation, carousels, wcag]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, audit-game-accessibility]
  rules: [frontend-accessibility-rules]
args:
  - name: ui_code
    description: The animation, transition, carousel or video code and its CSS, or a description of the effects (what moves, how big, how fast, for how long, triggered by what).
    type: text
    required: true
  - name: platform
    description: Where it runs, which decides the reduced-motion API to use.
    type: enum
    enum: [web, ios, android, game]
    default: web
output_contract:
  format: markdown
  sections: [Risk summary, Findings, Fixes, Checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Motion can make people ill and flashing can cause seizures. Two groups are at risk: people with vestibular disorders, migraine or concussion, for whom parallax, large zooms, scroll-jacking and spinning transitions can trigger dizziness and nausea for hours; and people with photosensitive epilepsy, for whom flashes in the wrong frequency, size or colour can trigger a seizure. Common misses: treating `prefers-reduced-motion` as "turn off everything", which breaks loading feedback, or as "slow it down", which does not help; carousels that auto-advance with no pause; background video that loops forever; and saturated red flashes, which carry their own threshold.
</context>

<task>
Audit this {{platform}} UI for motion and flashing risk:

<ui_code>
{{ui_code}}
</ui_code>

1. Inventory every effect: what moves or flashes, its trigger (load, scroll, hover, interaction, auto), area of the viewport, distance or scale, duration, repetition and whether it can be stopped.
2. Flashing (WCAG 2.3.1, level A): flag anything that flashes more than three times in any one-second period unless it is below the general and red flash thresholds. As a working rule, a flash covering more than about a quarter of a 10-degree field of view (roughly 341 x 256 px at typical viewing distance) or any saturated red flash is high risk. Say when a frame-by-frame measurement (for example with a photosensitive epilepsy analysis tool) is needed rather than guessing.
3. Auto-moving content (2.2.2, level A): anything that starts automatically, lasts more than 5 seconds and runs alongside other content needs pause, stop or hide. Auto-updating content needs pause or control of frequency.
4. Motion from interaction (2.3.3, AAA, but treat as required where it is large): parallax, zoom, scroll-linked and full-screen transitions can be disabled unless essential.
5. Classify each effect: essential (conveys information that cannot be conveyed another way, such as a progress indicator), functional (feedback that can be a cross-fade or colour change instead), or decorative (remove under reduced motion).
6. Fix with the platform API: CSS `@media (prefers-reduced-motion: reduce)` and `matchMedia` in script for web; `UIAccessibility.isReduceMotionEnabled` and its notification on iOS; `Settings.Global.ANIMATOR_DURATION_SCALE` or `ValueAnimator.areAnimatorsEnabled()` on Android; an in-game motion and flashing setting (camera shake, screen flashes, motion blur, field of view) that also reads the system setting where available. Replace motion with a fade or instant change rather than deleting feedback.
7. Add visible pause controls for carousels, background video and animated illustrations; stop animated GIFs or provide a still. Respect the user's choice across pages.
</task>

<constraints>
- Never declare content seizure-safe from code alone; say what to measure and with what kind of tool.
- Keep essential feedback such as loading and focus indicators, in a reduced form.
- If the description lacks size, speed or frequency for an effect, list the effect with "needs measuring" rather than inventing numbers.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Risk summary
Two or three sentences: the highest risk and who it affects.

## Findings
Table: Effect | Trigger | WCAG SC | Risk (seizure, vestibular, distraction) | Severity (blocker, serious, minor) | Essential, functional or decorative.

## Fixes
Code for {{platform}}: the reduced-motion handling, pause controls and replacements, with comments.

## Checks
Numbered: turning on the system reduced-motion setting and expected result per effect, flash measurement if needed, and a check that the pause control is keyboard and screen-reader operable.
</output_format>
