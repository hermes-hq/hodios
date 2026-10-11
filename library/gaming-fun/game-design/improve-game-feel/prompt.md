---
schema: 1
id: improve-game-feel
kind: prompt
title: Improve game feel
description: Diagnoses why an action in a video game feels flat or unresponsive and proposes feedback layers - input timing, animation, hit-stop, camera, sound, particles - in priority order with values to try.
category: game-design
version: 1.0.0
status: incubating
stage: [review, design]
role: [game-developer, designer]
requires: [none]
inputs: [text, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [game-feel, juice, hit-stop, responsiveness]
pairs_with:
  prompts: [design-game-mechanic, design-boss-fight]
args:
  - name: action
    description: The action that feels wrong (jump, sword hit, shooting, card play, menu click), what happens now frame by frame if you know, and the genre and engine-agnostic context.
    type: text
    required: true
  - name: target_feel
    description: How it should feel, such as "weighty and crunchy", "snappy and light" or "satisfying but calm". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Diagnosis, Responsiveness first, Feedback layers, Values to try, Overdoing it, How to compare]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You improve game feel: the moment-to-moment sense that an action responds and matters. Responsiveness comes first: input delay, slow wind-up animations and missing input buffering make an action feel bad no matter how much polish is layered on top. Only then do feedback layers help: anticipation and follow-through in animation, a few frames of hit-stop on impact, screen shake scaled to importance, sound with a sharp attack, particles, and the target reacting (knockback, flash). Effects must scale with significance, or everything shouts and nothing reads. Every layer also needs an option to reduce it for players sensitive to motion or flashing.

Action: {{action}}
{{#target_feel}}Target feel: {{target_feel}}{{/target_feel}}
</context>

<task>
1. Diagnose: list the likely causes of the flat feel, starting with responsiveness (input-to-response delay, wind-up length, lack of buffering or coyote time for jumps, cancel windows), then missing feedback.
2. Responsiveness fixes: what to change first and the typical range to aim for, explained in frames at 60 frames per second.
3. Feedback layers in priority order: for each (animation, hit-stop, camera, sound, particles, target reaction, controller rumble, UI), what to add and why it serves the target feel.
4. Values to try: starting numbers for each layer (hit-stop frames, shake amplitude and duration, knockback distance, sound layers), marked as starting points.
5. Overdoing it: how to keep layers proportional to the action's importance, and the accessibility options to provide (reduce screen shake, reduce flashing, rumble off).
6. How to compare: build A and B versions, test with players who have not seen it, and what to ask or observe.
</task>

<constraints>
- Stay engine-agnostic; describe behaviour, not engine-specific code.
- Fix responsiveness before adding polish, and say so if the description suggests input lag.
- Mark all numbers as starting points to tune by feel.
- Never recommend flashing effects without a reduce option; avoid rapid full-screen flashes.
</constraints>

<output_format>
## Diagnosis
Numbered likely causes.
## Responsiveness first
## Feedback layers
Table: Layer | Add | Why.
## Values to try
Table: Value | Start | Range.
## Overdoing it
## How to compare
</output_format>
