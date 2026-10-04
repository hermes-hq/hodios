---
schema: 1
id: plan-arable-crop-rotation
kind: prompt
title: Plan an arable crop rotation
description: Plans a multi-year crop rotation for an arable or mixed farm with disease and pest breaks, soil health, cover crops, workload and a field-by-field plan, for the farmer to check with an agronomist.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder]
subject: [agriculture]
requires: [none]
inputs: [notes, dataset, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [crop-rotation, arable-farming, cover-crops, soil-health, break-crops]
pairs_with:
  prompts: [plan-farm-diversification, plan-equipment-maintenance]
  personas: [farm-business-advisor]
args:
  - name: fields
    description: Each field with its name, size, soil type, drainage, last two or three crops, and known problems such as black-grass, clubroot, eelworm or compaction.
    type: text
    required: true
  - name: crops
    description: The crops you want or can grow and sell, any contracts or markets, livestock needs (forage, straw), and crops you will not grow.
    type: text
    required: true
  - name: climate
    description: Region and climate - rainfall, frost dates or season length, and anything that limits autumn or spring sowing.
    type: string
    required: true
  - name: years
    description: How many years the rotation plan should cover.
    type: number
    default: 5
  - name: system
    description: The farming system, because rotations differ - conventional, organic (fertility-building leys and stricter breaks) or reduced tillage.
    type: enum
    enum: [conventional, organic, reduced-tillage]
    default: conventional
output_contract:
  format: markdown
  sections: [Assumptions, Rotation logic, Field-by-field plan, Break check, Soil and cover crops, Workload and markets, Questions for the agronomist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help farmers draft crop rotations to take to their agronomist. A good rotation keeps enough time between crops that share diseases and pests (brassicas and clubroot, cereals and take-all, potatoes and cyst nematodes, pulses and foot rots), alternates autumn and spring sowing to manage grass weeds, puts legumes before hungry crops to use the nitrogen they fix, keeps soil covered over winter where possible, and spreads drilling and harvest work so the machinery and people can cope. It also has to make money and supply any livestock with forage and straw. You draft the plan and show your reasoning; the agronomist confirms break intervals, varieties and inputs for the actual fields.

Climate and region: {{climate}}
Years to plan: {{years}}
System: {{system}}

<fields>
{{fields}}
</fields>

<crops>
{{crops}}
</crops>
</context>

<task>
1. If fields lack sizes, soils or recent cropping history, ask for them and stop, because the first years of the plan depend on what was grown last.
2. State your assumptions about the climate and markets, and the break intervals you are using for each crop family as typical guidance to confirm.
3. Explain the rotation logic in a few sentences: the sequence, why each crop follows the one before, where cover crops or leys fit, and how it handles the known weed, disease and soil problems.
4. Build a field-by-field plan for {{years}} years, starting from each field's actual history so year 1 respects existing breaks. Balance the area of each crop across years where the markets or livestock need a steady supply.
5. Check every field's sequence, including the years before year 1, against your break intervals and list any field that breaks one, with a fix.
6. Plan soil health: cover crops before spring crops with a suggested species mix type and purpose, where to place leys or fertility-building in an organic system, and how the plan treats compaction or low organic matter.
7. Comment on workload (autumn and spring drilling area, harvest spread, storage) and on market or contract fit.
8. List questions to take to the agronomist.
9. Before writing the final version, verify that each field has exactly {{years}} entries and that the crop areas add up to the field sizes given.
</task>

<constraints>
- Do not recommend specific pesticides, herbicides, fertiliser rates or varieties. Refer those to the agronomist.
- Break intervals and agronomic rules are typical guidance; say they vary by soil, region and disease pressure.
- Use only fields and crops supplied. If a crop is needed for the logic but not listed (for example a break crop), propose it as an option and say why.
- Mention regulatory or scheme requirements such as crop diversity rules, nitrate zones or organic certification only as items to check.
</constraints>

<output_format>
## Assumptions
Including a table: Crop family | Break used | Reason.
## Rotation logic
## Field-by-field plan
Table: Field | Size | Soil | Year 1 … Year {{years}}.
Then a table of total area per crop per year.
## Break check
## Soil and cover crops
## Workload and markets
## Questions for the agronomist
</output_format>
