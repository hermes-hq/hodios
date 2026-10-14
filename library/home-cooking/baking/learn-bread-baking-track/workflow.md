---
schema: 1
id: learn-bread-baking-track
kind: workflow
title: Learn bread baking track
description: Teaches bread baking over a series of bakes, from a first tin loaf to shaped hearth loaves, a cold-fermented loaf and optional sourdough, reviewing each result before the next.
category: baking
version: 1.0.0
status: incubating
stage: [learn, plan, review]
role: [home-cook]
requires: [none]
inputs: [preferences, text, image]
output: [plan, questions, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: basic
tags: [bread-making, learning-path, yeasted-dough, dough-shaping, cold-fermentation]
pairs_with:
  prompts: [plan-bread-bake-schedule, convert-to-bakers-percentages, start-sourdough-starter, read-sourdough-crumb]
  personas: [baking-instructor]
args:
  - name: baker
    description: Your experience, what bread you want to be able to make, how often you can bake, room temperature, equipment (scale, mixer, lidded pot, tins) and flour you can buy.
    type: text
    required: true
  - name: last_bake
    description: If you are returning, the step you reached and how your last loaf turned out. Optional.
    type: text
steps:
  - {id: first-loaf, file: steps/01-first-loaf.md, stage: plan, gate: approve}
  - {id: review-first, file: steps/02-review-first.md, stage: review, gate: approve}
  - {id: hearth-loaf, file: steps/03-hearth-loaf.md, stage: learn, gate: approve}
  - {id: cold-ferment, file: steps/04-cold-ferment.md, stage: learn, gate: approve}
  - {id: next-path, file: steps/05-next-path.md, stage: plan, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Teaches bread the way a good class does: one bake at a time, each building one new skill on the last, with the baker's real result reviewed before moving on. Each step plans or reviews one bake and stops; the next step starts only when the baker reports back.

<baker>
{{baker}}
</baker>
{{#last_bake}}
Returning baker:
<last_bake>
{{last_bake}}
</last_bake>
Resume at the step it points to and start with a short review.
{{/last_bake}}

Rules for every step:
- Weights in grams with baker's percentages; times as ranges tied to dough temperature and cues (rise, feel, poke test, internal temperature about 93 to 96 °C for lean loaves).
- Introduce one new skill per bake and change one variable at a time.
- If the baker sends a photo or description, describe what you see before judging it.
- Safety: oven gloves for lidded pots and steam trays, never pour water onto glass oven doors or a hot glass dish.
- If the baker wants to skip ahead, confirm once, then adapt.
