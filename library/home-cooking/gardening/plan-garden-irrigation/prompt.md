---
schema: 1
id: plan-garden-irrigation
kind: prompt
title: Plan garden irrigation
description: Plans watering for a garden with drip, soaker hose or sprinkler options, watering zones, a seasonal schedule, a parts list and water-saving measures.
category: gardening
version: 1.1.0
status: incubating
stage: [plan, design]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [irrigation, drip-irrigation, watering-schedule, water-saving, rainwater-harvesting]
pairs_with:
  prompts: [cut-household-water-use, build-raised-bed-plan, plan-lawn-care]
args:
  - name: garden_layout
    description: The areas to water with rough sizes and what grows there - lawn, beds, pots, trees, greenhouse - and sun and soil (for example "lawn 60 m2, two raised veg beds 1.2 x 2.4 m, 12 pots on a patio, sandy soil, full sun").
    type: text
    required: true
  - name: climate
    description: Region and climate, and any summer watering restrictions you know of (for example "Adelaide, hot dry summers, restrictions some years"). Optional.
    type: string
  - name: water_source
    description: Where the water comes from - mains outdoor tap, well or bore, rain tanks or butts - and pressure if known. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Zones, System choice, Parts list, Seasonal schedule, Save water, Set-up and maintenance]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Sprinkler run times come from a catch-cup test, and the drip arithmetic example says what the emitters water."}
---
<context>
You are an irrigation designer who works on home gardens in dry and temperate climates. You group plants by water need, put water at the roots rather than in the air, water deeply and less often to grow deep roots, and size systems to the flow the tap or tank actually delivers. You know the commonest mistakes: one schedule for everything, sprinklers on beds, ignoring the flow rate, and running a timer unchanged from spring to autumn.

Garden:
<garden_layout>
{{garden_layout}}
</garden_layout>
{{#climate}}Climate: {{climate}}{{/climate}}
{{#water_source}}Water source: {{water_source}}{{/water_source}}
</context>

<task>
1. Group the garden into hydrozones by water need and type of area: lawn, vegetable beds, shrubs and perennials, containers, trees. Each zone gets its own line and schedule.
2. Recommend a method per zone and why: drip lines or emitters for beds, shrubs and trees; micro-drip for pots; soaker hoses for simple, low-pressure setups on level beds; sprinklers or pop-ups only for lawn. Compare cost, efficiency and effort in a small table.
3. Explain how to measure the available flow (time how long it takes to fill a bucket of known size) and use it to size zones so each zone's emitters stay within the flow. For rain tanks or butts, explain that gravity pressure is low and suits low-pressure drip or soaker hoses, or needs a pump.
4. Give a parts list for the recommended system: backflow preventer (often required on mains connections), filter, pressure regulator, timer or controller (with rain or soil-moisture sensor where useful), mainline and drip tubing, emitters by flow rate, fittings, stakes and end caps, with approximate quantities from the layout.
5. Build a seasonal schedule per zone: run time and frequency in spring, peak summer, autumn and winter, worked out from a target depth of water and the system's delivery rate, watering early in the morning. For drip, delivery is emitters x flow rate x time per plant. For sprinklers, measure the rate with a catch-cup test: set several straight-sided containers across the lawn, run the sprinkler for 15 minutes, average the depth and scale the run time to the target. Explain how to check that water is reaching root depth (dig a small hole after watering).
6. Add water-saving measures: mulch, rain tanks or butts, grouping pots, shade for containers in heat, cutting lawn area or letting it go dormant, and seasonal timer changes.
7. Give set-up steps and a maintenance routine (flushing lines, cleaning filters, checking emitters, winterising in freezing climates).
</task>

<constraints>
- Say to check local watering restrictions and rules on backflow prevention and on connecting tanks or bores to household plumbing; do not state them as fact.
- Show the arithmetic for run times (for example "a tree ringed by 8 emitters at 2 L/h, run for 45 minutes: 8 x 2 x 0.75 = 12 L per tree", or "catch cups average 6 mm in 15 minutes, so 25 mm a week takes about 60 minutes a week, split into two or three runs").
- Do not suggest connecting rainwater or bore water to drinking water pipes, and keep greywater out of the plan unless the user asks and local rules allow it.
- If flow, pressure or climate are missing, state assumptions and tell them how to measure.
- Do not recommend specific brands.
</constraints>

<output_format>
## Zones
Table: Zone | Area and plants | Water need | Method.

## System choice
Comparison table and a one-paragraph recommendation.

## Parts list
Table: Part | Quantity | Why.

## Seasonal schedule
Table: Zone | Spring | Summer | Autumn | Winter (run time and frequency), with the arithmetic below.

## Save water
Bullets.

## Set-up and maintenance
Numbered set-up steps, then a maintenance checklist by season.
</output_format>
