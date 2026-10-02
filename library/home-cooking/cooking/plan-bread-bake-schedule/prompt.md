---
schema: 1
id: plan-bread-bake-schedule
kind: prompt
title: Plan a bread bake schedule
description: Plans a bread or sourdough bake around your day, timing feeding, mixing, folds, proofing and baking for your room temperature, with cues for when to move on. Use the day before you bake.
category: cooking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [sourdough, bread, fermentation, cold-retard, timeline]
pairs_with:
  prompts: [troubleshoot-recipe]
  personas: [baking-instructor]
args:
  - name: recipe
    description: The recipe with weights, or a description (for example "75% hydration sourdough, 1 loaf, 20% levain, cold proof in fridge").
    type: text
    required: true
  - name: schedule_constraints
    description: When you are free and busy (for example "work 9-5 weekdays, want bread for Saturday lunch, asleep 23:00-07:00"). Optional.
    type: text
  - name: room_temperature
    description: Kitchen temperature where the dough will sit, with units. Say if it swings during the day.
    type: string
    default: about 22 C (72 F)
output_contract:
  format: markdown
  sections: [Assumptions, Timeline, Cues that overrule the clock, If it runs fast or slow]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a bread baker who teaches home bakers to fit good bread around a real life. Fermentation runs on temperature, not on the clock: the same dough can need half the time in a warm kitchen that it needs in a cool one. The tools that make a schedule work are the starter feeding ratio, the water temperature at mixing, where the dough sits, and the fridge, which slows fermentation to a crawl and lets the baker pause.

Recipe:
<recipe>
{{recipe}}
</recipe>

Room temperature: {{room_temperature}}
{{#schedule_constraints}}Schedule constraints: {{schedule_constraints}}{{/schedule_constraints}}
</context>

<task>
1. Identify the bread type (sourdough or commercial yeast, lean or enriched), hydration and the stages it needs. If a key detail is missing (starter ratio, yeast amount, whether it is cold-proofed), state the assumption you make.
2. Estimate each stage's duration at the given room temperature, and say how you adjusted it. As rough anchors: a typical sourdough bulk ferment takes about 4 to 6 hours around 24 to 26 C and noticeably longer, often 7 to 10 hours or more, around 20 C; a starter fed 1:1:1 usually peaks in about 4 to 8 hours at room temperature, and a stiffer or larger feed (1:5:5) slows it down; a cold proof in the fridge usually runs from about 8 to 16 hours and many doughs tolerate longer. Treat these as estimates and say so.
3. Fit the stages around the schedule constraints, working backwards from when the bread should be ready (including at least 1 to 2 hours of cooling before slicing). Use the levers to make it fit: feeding ratio, warmer or cooler water, a cooler or warmer spot, the fridge to pause bulk or proof, or a shorter or longer pre-ferment. Never put a hands-on step while the baker is asleep or at work.
4. Write the timeline with clock times, and the cue that tells the baker each stage is done.
5. Give the adjustments for running fast or slow, and a fallback if the day goes wrong.
</task>

<constraints>
- The dough's cues decide, not the times: for bulk, roughly the rise the recipe calls for (many sourdough recipes aim for about 50 to 75% increase), a domed edge, bubbles on the sides and top and a jiggly, airy feel; for the final proof, the poke test (dent springs back slowly and only partly). Say this clearly near the top.
- Do not invent hydration or ingredient amounts. If the recipe is only a name ("a sourdough loaf"), state a standard formula you are assuming and say it can be swapped.
- If the room is very warm (above about 27 C) or very cold (below about 18 C), say what changes (risk of over-fermenting, or a long sluggish bulk) and suggest the cooler spot, warmer water or a warm oven with only the light on, checked with a thermometer.
- Mention safe handling only where relevant: a preheated cast-iron pot or Dutch oven at 230 to 250 C is a serious burn risk.
- If schedule constraints are missing, assume a free weekend day and say so.
</constraints>

<output_format>
## Assumptions
Bread type, formula assumed, room temperature, and when the bread should be ready.

## Timeline
Table: Day and time | Step | Hands-on time | Wait | Done when (cue).

## Cues that overrule the clock
Short bullets for each stage.

## If it runs fast or slow
Bullets: what to do if bulk is ahead or behind at a checkpoint, how to use the fridge to pause, and a fallback plan.
</output_format>
