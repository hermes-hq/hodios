---
schema: 1
id: descale-coffee-machine
kind: prompt
title: Clean and descale a coffee machine
description: "Gives a cleaning and descaling routine for a home coffee machine - espresso, bean-to-cup, drip or pod - matched to its type and your water, with backflushing, steam wand care and a schedule."
category: drinks
version: 1.0.0
status: incubating
stage: [maintain]
role: [home-cook, individual]
requires: [none]
inputs: [text]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [descaling, espresso-machine, machine-maintenance, water-hardness]
pairs_with:
  prompts: [dial-in-espresso, troubleshoot-milk-steaming]
args:
  - name: machine
    description: "The machine type and make or model if known (single-boiler espresso, bean-to-cup, drip filter, pod machine, kettle), how often you use it, and what cleaning you do now."
    type: text
    required: true
  - name: water
    description: "Hard or soft water if known, whether you use a filter jug or bottled water, and any symptoms (slow flow, low pressure, sour or bitter taste, white flakes). Optional."
    type: text
output_contract:
  format: markdown
  sections: [Daily and weekly, Descaling, Water, Schedule, Symptoms]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an espresso machine technician. Two kinds of build-up ruin machines: coffee oils and grounds (which go rancid and taste bitter, and clog shower screens and group heads) and limescale from hard water (which blocks pipes, slows flow, wrecks heating elements and is the commonest reason for repairs). Oils are removed by daily rinsing, wiping the steam wand, and backflushing with a coffee machine detergent for machines with a three-way valve; limescale is removed by descaling with the descaler the manufacturer specifies, at the interval their water hardness needs. Some machines must not be descaled with certain acids, and bean-to-cup machines have their own cleaning and descaling programmes. Vinegar is often suggested but can damage seals and leave tastes; many makers advise against it.

Machine: {{machine}}
{{#water}}Water: {{water}}{{/water}}
</context>

<task>
1. Daily and weekly cleaning for this machine type: rinsing, steam wand purge and wipe, drip tray, portafilter and basket, backflushing if applicable.
2. Descaling: when (by water hardness and symptoms), with the maker's recommended descaler, step by step in outline, and thorough rinsing afterwards.
3. Water: how to reduce scale (filter, suitable water) and why distilled or very soft water is not always good for espresso machines.
4. A schedule table.
5. Symptoms: map any symptoms to oils, scale or a fault, and say when to call a technician.
</task>

<constraints>
- Follow the machine's manual for descaler type, ratios and programme; do not invent model-specific steps or quantities. If the model is unknown, give a general outline and say so.
- Never mix descaler with detergent or other cleaners, and never descale and backflush with chemicals at the same time. Rinse fully between products and before making coffee.
- Do not backflush machines without a three-way solenoid valve; say how to tell.
- Do not advise opening the machine, the boiler or electrics; that is for a technician. Switch off and let it cool before cleaning parts that get hot.
- Mention that some warranties depend on using approved descalers or water filters.
</constraints>

<output_format>
## Daily and weekly
Checklist.
## Descaling
Numbered steps.
## Water
## Schedule
Table: Task | How often | Notes.
## Symptoms
Bullets, or 'None given'.
</output_format>
