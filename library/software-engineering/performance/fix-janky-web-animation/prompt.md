---
schema: 1
id: fix-janky-web-animation
kind: prompt
title: Fix janky web animation and scrolling
description: Fixes stuttering web animations, transitions and scroll effects by moving to compositor-only properties and removing forced layouts and heavy paints, verified frame by frame.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [frontend-engineer]
stack: [html-css, javascript]
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [animation, jank, layout-thrashing, compositing, scroll-performance]
pairs_with:
  prompts: [improve-web-vitals, fix-react-rerenders, speed-up-long-list-rendering]
  personas: [frontend-engineer]
args:
  - name: animation
    description: What stutters (a menu transition, parallax, sticky header, carousel, scroll-linked effect), where the code lives, and on which devices or browsers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Evidence, Cause, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every frame goes through style, layout, paint and composite, and must finish in about 16.7 ms at 60 Hz (8.3 ms at 120 Hz). Animating `transform` and `opacity` can skip layout and paint and run on the compositor, so it stays smooth even when the main thread is busy. Animating `top`, `left`, `width`, `height`, `margin` or `box-shadow` re-runs layout or paint every frame. The other classic cause is forced synchronous layout ("layout thrashing"): JavaScript writes a style, then reads a geometry property such as `offsetHeight` or `getBoundingClientRect()`, forcing the browser to lay out immediately, often inside a loop or a scroll handler. Scroll handlers that do work on every event, non-passive touch and wheel listeners, and large or frequent repaints (big blurred shadows, `filter`, fixed backgrounds) are next. `will-change` helps only for elements that really animate; putting it everywhere wastes GPU memory. Modern options remove JavaScript entirely: CSS transitions, the Web Animations API, `IntersectionObserver` instead of scroll polling, and CSS scroll-driven animations where supported.
</context>

<task>
Fix the jank in: {{animation}}

1. Read the animation code, its CSS and any scroll, resize or pointer handlers involved.
2. Reproduce and record evidence: describe a Performance panel recording with 4x CPU throttling, looking for long frames, purple layout blocks marked "Forced reflow", large green paint blocks and long tasks during the animation. If you cannot record, list the code-level signs you found and what to record.
3. Identify the cause: animated properties that trigger layout or paint; read-after-write geometry in loops or handlers; per-event work in scroll handlers; non-passive listeners; expensive paints; too many or too large layers; framework re-renders during the animation.
4. Fix with the smallest change: animate `transform` and `opacity` instead; batch reads before writes and do visual updates in `requestAnimationFrame`; make listeners passive; replace scroll polling with `IntersectionObserver` or a scroll-driven animation; reduce paint area or cost; add `will-change` only to the animating element, only while it animates.
5. Respect `prefers-reduced-motion` for any motion you touch.
6. Verify in a new recording or by reasoning from the code if you cannot run a browser, and run the existing tests.
</task>

<constraints>
- Keep the visual result the same unless the user agrees to a change; say where a compositor-only version looks different.
- Do not add `will-change` or `translateZ(0)` broadly as a blanket fix.
- Say which browsers a suggested API supports when support is not universal, and keep a fallback.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Evidence
What the recording or code shows, frame times if measured.
## Cause
The specific mechanism, with file:line.
## Changes
One line per file: `path`, what changed, with the key snippet.
## Results
Frame times or long-frame count before and after, or what to check if not measured.
</output_format>
