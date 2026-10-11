---
schema: 1
id: define-motion-tokens
kind: prompt
title: Define motion tokens
description: Defines a design system's motion tokens for duration and easing, with usage rules per interaction type and reduced-motion behaviour across components.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, config]
output: [table, code, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [motion, animation, easing, reduced-motion, design-tokens]
pairs_with:
  prompts: [spec-motion-and-microinteractions, define-design-tokens, generate-platform-token-files]
  personas: [design-systems-lead]
args:
  - name: product
    description: The product, its platforms, its brand character (calm, playful, precise) and the components that animate today.
    type: text
    required: true
  - name: current
    description: Optional. Durations and easing curves found in code or design files today.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Motion principles, Duration tokens, Easing tokens, Usage by pattern, Reduced motion, Code, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Without tokens, every engineer picks `0.3s ease` and the product feels both sluggish and inconsistent. Good UI motion is short: small feedback (hover, press, toggles) around 100 to 150ms, standard component transitions around 200 to 300ms, large surfaces such as sheets and page transitions up to about 400 to 500ms. Duration should grow with the distance and size of what moves, and exits are usually faster than entrances because the user has already decided. Easing carries meaning: decelerating curves (ease-out) for things entering, accelerating curves (ease-in) for things leaving, and a standard ease-in-out for things moving within the screen; linear is for progress and colour only. Animate `transform` and `opacity`, not layout properties like width, height or top, which cause jank. Reduced motion is not "everything at 0ms": users who set `prefers-reduced-motion` should lose movement, parallax, zoom and auto-playing animation, but keep the feedback, usually by swapping movement for a short fade. WCAG 2.3.3 (AAA) covers motion triggered by interaction, and 2.2.2 requires a way to pause anything that moves automatically for more than five seconds. Native platforms often use springs, which are defined by response and damping rather than duration.
</context>

<task>
Define motion tokens for this product.

<product>
{{product}}
</product>
{{#current}}

<current>
{{current}}
</current>
{{/current}}

1. **Motion principles.** Three or four principles that fit the brand character and say what motion is for here (feedback, orientation, continuity), and what it is not for.
2. **Duration tokens.** Four to six named durations (for example `motion.duration.instant`, `fast`, `moderate`, `slow`) with values and the kind of change each is for.
3. **Easing tokens.** Three to five named curves (standard, enter, exit, emphasised, linear) with `cubic-bezier()` values, what each communicates and where it must not be used. If native platforms are in scope, give spring parameters as an alternative and say they are approximations to tune on device.
4. **Usage by pattern.** A table mapping common patterns (button press, hover, toggle, tooltip, dropdown, dialog open and close, toast, drawer or sheet, accordion, page transition, skeleton to content) to duration, easing and the properties that animate.
5. **Reduced motion.** For each pattern, what happens under `prefers-reduced-motion: reduce` (keep, replace with fade, or remove), how auto-playing or looping motion can be paused, and how the preference is read on each platform.
6. **Code.** Tokens in the user's format or the W3C design tokens format (`duration` and `cubicBezier` types), CSS custom properties, a reduced-motion media query example, and a note on how components consume the tokens.
7. If current values are given, map them to the new tokens and list outliers to fix.
</task>

<constraints>
- Do not claim a value comes from a named platform guideline unless the user supplied it; present values as recommendations.
- Never recommend animating layout properties for performance-sensitive transitions.
- Reduced-motion rules must keep essential feedback; do not simply set all durations to zero.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Tokens and patterns as tables, code in fenced blocks. End with Open questions.
</output_format>
