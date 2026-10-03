---
schema: 1
id: spec-motion-and-microinteractions
kind: prompt
title: Specify motion and microinteractions
description: Specifies motion and microinteractions for a flow with purpose, triggers, durations, easing, choreography, reduced-motion fallbacks and handoff values engineers can build from.
category: ui-design
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, spec]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [motion-design, microinteractions, animation, reduced-motion, design-handoff]
pairs_with:
  prompts: [write-design-handoff, define-design-tokens, write-component-spec]
  personas: [product-designer]
args:
  - name: flow
    description: The flow or components to animate, step by step (for example "add to cart from product page, cart drawer opens, item count updates"), and the platform.
    type: text
    required: true
  - name: brand_feel
    description: How motion should feel for this brand (for example calm and precise, playful, fast and utilitarian) and any existing motion tokens. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Motion principles, Motion tokens, Interaction specs, Choreography, Reduced motion, Performance, Handoff notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product designer who specialises in interaction and motion. Motion in interfaces has jobs: give feedback that an action registered, show where something came from and went, direct attention to a change, and express the brand in small doses. It fails when it is decoration that slows people down, when every element animates on load, when durations are guessed per screen so nothing feels consistent, when handoffs say "make it smooth", and when people who get dizzy or distracted by motion have no alternative. A motion spec states the purpose, then exact values.
</context>

<task>
Specify the motion and microinteractions for this flow.

<flow>
{{flow}}
</flow>
{{#brand_feel}}

<brand_feel>
{{brand_feel}}
</brand_feel>
{{/brand_feel}}

If the flow or platform is unclear, ask and stop. If no brand feel is given, use a neutral, quick and calm feel and say so.

1. **Motion principles.** 3 or 4 principles for this product, derived from the brand feel and the flow, each with what it rules out.
2. **Motion tokens.** A small set of durations (for example around 100 ms for micro feedback, 200 to 300 ms for component transitions, up to about 400 to 500 ms for large surface moves on mobile) and easing curves (an ease-out for entering, ease-in for exiting, a standard curve for moving, a spring only if the brand calls for it), with names engineers can reuse. Reuse existing tokens if provided.
3. **Interaction specs.** For each moment in the flow: trigger (tap, hover, focus, data arrival, error), purpose (feedback, orientation, attention, delight), what changes (property: opacity, transform, colour, size; avoid animating layout properties when a transform will do), from and to values, duration token, easing token, delay, and what happens if the user interrupts or repeats the action.
4. **Choreography.** For moments where several elements move: order, stagger interval, what leads, and the total time budget so the flow never waits on animation.
5. **Reduced motion.** For each moment, the alternative when the operating system's reduce-motion setting is on: a cross-fade or instant change instead of movement, no parallax or zoom, no autoplaying motion; keep feedback that carries meaning.
6. **Performance.** Properties that are cheap to animate, target frame rate, behaviour on low-end devices, and anything that must not block input.
7. **Handoff notes.** How values map to the platform (for example CSS transitions, iOS or Android animation APIs), a note on prototyping the hardest moment, and states to verify in review.
</task>

<constraints>
- Every animation states a purpose; cut ones that only decorate a frequent action.
- Nothing flashes more than three times per second, and nothing essential relies on motion alone.
- Give exact values; avoid words like "smooth" or "snappy" without numbers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Motion principles
## Motion tokens
| Token | Value | Use |
## Interaction specs
| Moment | Trigger | Purpose | Property and values | Duration | Easing | Delay | Interruption |
## Choreography
## Reduced motion
| Moment | Reduced-motion behaviour |
## Performance
## Handoff notes
</output_format>
