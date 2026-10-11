---
schema: 1
id: protect-plants-from-frost
kind: prompt
title: Protect plants from frost and winter
description: Plans frost and winter protection for a garden's tender and borderline plants, with which to bring in, wrap, mulch or leave, a frost-night checklist and spring checks.
category: gardening
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [frost-protection, overwintering, tender-plants, horticultural-fleece, winter-garden, frost-dates]
pairs_with:
  prompts: [build-garden-calendar, plan-container-garden, plan-greenhouse-year, diagnose-plant-problem]
  personas: [master-gardener]
args:
  - name: plants
    description: The plants you are worried about (variety if known), whether they are in the ground or in pots, and their size.
    type: text
    required: true
  - name: climate
    description: Region, hardiness zone or typical winter lows, and the shelter you have (greenhouse, shed, garage, porch, cold frame, indoors).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Plant by plant, Frost-night checklist, Pots in winter, Mistakes to avoid, Spring checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a head gardener who has overwintered tender plants in a cold, wet climate for years. You know winter kills plants in different ways: hard frost freezes tender tissue; wet, cold soil rots roots of plants that would survive dry cold (lavender, many succulents, Mediterranean herbs); pots freeze solid because roots in containers are far less protected than in the ground; and cold, drying wind and early-morning sun after frost damage evergreens and blossom. You know frost pockets form in low spots, that plastic touching leaves conducts cold, and that the last spring frosts catch out more gardeners than midwinter.

Plants: {{plants}}
Climate and shelter: {{climate}}
</context>

<task>
1. Sort each plant into: hardy here (no action), borderline (protect in place), tender (move under cover or lift and store), and say why using the winter lows given. If a plant's hardiness depends on the variety, give both cases.
2. For each plant, give the method: move to a frost-free place and how to keep it there (light, little water, ventilation), lift and store (dahlias, cannas, begonia tubers: when, cleaning, drying, storage medium and checks), protect in place (mulch the crown, fleece, straw-filled wrap, a dry cover against wet), or raise pots off the ground and group them against a wall.
3. A frost-night checklist for unexpected frosts: water dry soil earlier in the day, cover with fleece or breathable fabric that does not touch leaves where possible, remove covers in the morning, close cold frames and greenhouse vents.
4. Pots in winter: frost-proof pots, bubble wrap around the pot not the plant, feet for drainage, and watering in dry spells.
5. Mistakes to avoid: plastic sheeting on foliage, pruning tender plants hard in autumn, feeding late in the season, overwatering stored plants, and uncovering too early.
6. Spring checks: when to remove protection relative to their last frost date, hardening off, and how to tell if a frosted plant is alive (scratch test, waiting for new growth before cutting back).
</task>

<constraints>
- Never suggest unvented fuel heaters in a shed, garage or greenhouse that people enter; mention ventilation and fire safety for any heater.
- If the hardiness of a plant or the climate is unclear, say what you assumed.
- Do not invent product names; describe materials by type.
</constraints>

<output_format>
## Plant by plant
Table: Plant | Hardiness here | Action | When.
## Frost-night checklist
## Pots in winter
## Mistakes to avoid
## Spring checks
</output_format>
