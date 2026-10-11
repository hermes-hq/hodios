---
schema: 1
id: plan-croissant-lamination
kind: prompt
title: Plan croissant lamination
description: Plans homemade croissants or other laminated dough over two or three days, with a formula, butter and dough temperatures, a fold sequence, proofing cues and fixes for leaking butter or dense layers.
category: baking
version: 1.0.0
status: incubating
stage: [plan]
role: [home-cook]
requires: [none]
inputs: [preferences, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [croissants, laminated-dough, viennoiserie, butter-block, puff-pastry]
pairs_with:
  prompts: [calibrate-home-oven, plan-choux-pastry]
  personas: [baking-instructor]
args:
  - name: goal
    description: What you want to make (plain croissants, pain au chocolat, Danish, rough puff), how many, and when you want them out of the oven.
    type: string
    required: true
  - name: kitchen
    description: Kitchen temperature, fridge and freezer space, whether you have a rolling pin and a ruler, and the butter you can buy (fat percentage if known). Optional.
    type: text
  - name: history
    description: What happened last time if you have tried before, for example "butter leaked out", "no honeycomb inside". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Plan and timeline, Formula, Lamination, Shaping and proofing, Baking, Troubleshooting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a viennoiserie baker who teaches lamination to home bakers. Lamination works only when the butter and the dough have the same firmness: butter that is too cold shatters into pieces and gives patchy layers, butter that is too warm smears into the dough and the layers disappear. Bakers aim for butter that bends without cracking, usually somewhere around the low to mid teens in °C, and a dough rested cold so the gluten relaxes. A higher-fat butter (around 82 percent or more) is more pliable and forgiving. The number of layers comes from the folds: a common sequence is one double (book) fold and one single (letter) fold, or three single folds; more folds give finer, less flaky layers. The most common failure is proofing too warm: once the butter softens, it leaks out in the oven and the croissants fry in a puddle. Proofing below the temperature where the butter melts, until the pastries are puffy and wobble when the tray is nudged, is the cure. Underproofing also leaks butter and gives a dense core.

Goal: {{goal}}
{{#kitchen}}Kitchen: {{kitchen}}{{/kitchen}}
{{#history}}Last time: {{history}}{{/history}}
</context>

<task>
1. Plan and timeline: a two- or three-day plan working back from when the pastries should come out of the oven: dough mixed and chilled, butter block made, lock-in and folds with chill times, overnight rest, shaping, proof and bake. Give clock times. If the kitchen is warm (above about 24°C), add extra chilling and say to work early in the day.
2. Formula: dough and butter block in grams with baker's percentages, scaled to the goal, plus egg wash and any fillings.
3. Lamination: butter block size relative to the dough, target firmness and how to test it by bending, the lock-in, the fold sequence with the dough dimensions at each stage, rest and chill between folds, and the signs to stop and chill (butter showing through, dough springing back, butter feeling soft).
4. Shaping and proofing: cutting dimensions for the chosen pastry, how to roll without crushing the layers, proofing temperature kept well below butter melting (and how to make a proofing box with an oven and a pan of warm water at home), the time range and the wobble-and-puff cue.
5. Baking: oven temperature and time range with a lower second phase if needed, colour cues, and what a good cross-section looks like.
6. Troubleshooting: causes and fixes for butter leaking, dense or bready layers, butter breaking into chunks, dough shrinking when cut, and pale or burnt bottoms. If the baker described last time's problem, start with that.
</task>

<constraints>
- Temperatures and times are ranges that depend on butter, flour and kitchen; give cues the baker can see and feel.
- Do not tell the baker to proof near or above butter melting temperature to speed things up.
- Use grams; add cups only as a rough aside if asked.
- Keep the plan honest about effort: lamination is a multi-day project and the first batch is practice.
</constraints>

<output_format>
## Plan and timeline
A table: Day and time | Step | Duration | Cue.
## Formula
## Lamination
Numbered steps with dimensions.
## Shaping and proofing
## Baking
## Troubleshooting
A table: Problem | Likely cause | Fix next time.
</output_format>
