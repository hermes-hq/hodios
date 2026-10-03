---
schema: 1
id: set-up-hydroponics
kind: prompt
title: Set up a small hydroponic garden
description: Plans a small indoor hydroponic setup with the system type, lighting, nutrients, pH and EC targets, crops to start with, costs and a weekly maintenance routine.
category: gardening
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [hydroponics, indoor-growing, grow-lights, microgreens, nutrient-solution]
pairs_with:
  prompts: [plan-seed-starting, plan-container-garden, diagnose-plant-problem]
args:
  - name: space
    description: Where it will go, size, light and temperature, access to power and water, and who else is around (for example "kitchen counter corner 60 x 40 cm, no window, 20 C, cat").
    type: text
    required: true
  - name: budget
    description: Budget with currency. Optional.
    type: string
  - name: crops
    description: What you want to grow (for example "lettuce and herbs", "cherry tomatoes", "strawberries"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [System choice, Light, Nutrients and water, What to grow first, Build and start, Weekly routine, Troubleshooting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a controlled-environment grower who has built hydroponic systems from jam-jar setups to commercial greenhouses, and teaches beginners. You start people on simple, forgiving systems with leafy greens and herbs, because fruiting crops need far more light, space and attention. You manage three things relentlessly: light, nutrient strength (EC) and pH, plus clean, oxygenated water.

Space:
<space>
{{space}}
</space>
{{#budget}}Budget: {{budget}}{{/budget}}
{{#crops}}Crops wanted: {{crops}}{{/crops}}
</context>

<task>
1. Compare the systems that fit this space - Kratky (passive, no pump), deep water culture with an air pump, wick, ebb and flow, nutrient film technique, and all-in-one countertop units - by cost, noise, power use, reliability and suitability for their crops. Recommend one and say why.
2. Specify lighting: whether a window is enough (rarely, for good growth indoors), the light type (full-spectrum LED), the light level needed for leafy greens versus fruiting crops (express as a daily light integral range and hours per day, with typical photoperiods of about 14-16 hours for greens), the hanging height, and a timer.
3. Explain nutrients and water: a complete hydroponic nutrient (not soil fertiliser), mixing to the target EC range for the crops, pH 5.5-6.5 for most crops, tools needed (pH meter or kit, EC or TDS meter), water temperature (ideally around 18-22 C), oxygen, and when to top up versus change the solution.
4. Recommend what to grow first, with days to harvest: lettuce, basil, other herbs, leafy greens, and microgreens as the easiest; explain if their wanted crops (for example tomatoes or strawberries) are harder and what extra they need (more light, support, hand pollination).
5. Give build and start steps: parts list with approximate costs within budget, assembling, starting seeds in rockwool or plugs, when to move seedlings into the system, spacing.
6. Give a weekly routine (check level, pH and EC, top up, clean, inspect roots and leaves) and a monthly routine (full solution change, clean reservoir).
7. Troubleshoot common problems: algae, root rot (brown, slimy roots), nutrient burn, yellowing leaves, leggy plants, pests such as fungus gnats and aphids.
</task>

<constraints>
- Electrical safety around water is non-negotiable: plug pumps, lights and heaters into an outlet protected by a residual current device (RCD or GFCI), use drip loops on cables, keep connections and power strips above and away from water, and use equipment rated for damp locations.
- If children or pets are present, keep nutrient concentrates and pH adjusters (which are corrosive) locked away, and secure the reservoir.
- Show approximate running costs for lights (watts x hours x electricity price, with the price as a placeholder they fill in).
- If the budget is small, say what to cut (start with Kratky in a container) rather than exceed it.
- Do not recommend specific brands.
</constraints>

<output_format>
## System choice
Comparison table: System | Cost | Noise and power | Best for | Beginner-friendly? Then the recommendation.

## Light
Bullets with numbers, including running-cost formula.

## Nutrients and water
Table: Parameter | Target | How to check | How often.

## What to grow first
Table: Crop | Difficulty | Days to harvest | Notes.

## Build and start
Parts list table with costs and total against budget, then numbered steps.

## Weekly routine
Checklist, then a monthly checklist.

## Troubleshooting
Table: Problem | Cause | Fix.
</output_format>
