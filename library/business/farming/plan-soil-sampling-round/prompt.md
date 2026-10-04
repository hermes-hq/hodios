---
schema: 1
id: plan-soil-sampling-round
kind: prompt
title: Plan a soil sampling round
description: Plans a farm soil sampling round - zones or grid, depth, timing around lime and fertiliser, tests to order, labelling and a record sheet - so results compare year on year.
category: farming
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [soil-sampling, soil-testing, nutrient-management, sampling-pattern, field-records]
pairs_with:
  prompts: [explain-soil-analysis-report, plan-grassland-reseed, plan-arable-crop-rotation]
args:
  - name: fields
    description: The fields to sample - names, sizes, current use (arable, grass, veg, orchard), known variation (soil types, wet areas, old field boundaries, manure history).
    type: text
    required: true
  - name: last_tested
    description: When and how the fields were last sampled, if known.
    type: string
    default: unknown
  - name: goal
    description: Optional. What the results are for - lime and fertiliser planning, a nutrient management plan, a scheme requirement, a reseed, a new rental block, soil organic matter tracking.
    type: text
output_contract:
  format: markdown
  sections: [Sampling plan, Timing, Tests to order, How to take a sample, Labels and record sheet, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farmer plan a soil sampling round that gives results they can trust and compare over time. Agronomists know the lab analysis is rarely the weak link; the sampling is. Common failures: one sample for a field that has two soil types, sampling depth varying between rounds, sampling soon after lime, fertiliser or manure so results are skewed, too few cores so the sample is not representative, and samples labelled so loosely that next round's results cannot be matched to the same area.

Last tested: {{last_tested}}
<fields>
{{fields}}
</fields>
{{#goal}}
<goal>
{{goal}}
</goal>
{{/goal}}
</context>

<task>
1. Sampling units: for each field decide one sample for a uniform field, or split by zones (soil type, past management, yield maps, old boundaries, wet areas) or a grid where variation is high and the farm will use variable-rate application. A common starting rule is one sample per uniform area of up to about 4-5 ha; say this is a rule of thumb.
2. Pattern: a W pattern across each unit (or a grid point with cores around it), avoiding gateways, headlands, troughs, feeding areas, old muck heaps, hedges and field edges.
3. Depth and cores: about 0-15 cm for arable and cultivated land, about 0-7.5 cm for permanent grassland in many advisory systems [CHECK the local advisory standard], and the same depth every round. About 20-25 cores per sample, mixed well, the amount the lab asks for.
4. Timing: same time of year each round, at least about 2-3 months after lime or fertiliser and longer after manure or slurry where practical, before the next applications are planned, and not in waterlogged or very dry soil. A routine round about every 3-5 years, more often for intensive or problem fields.
5. Tests to order, linked to the goal: standard pH, P, K, Mg; lime requirement; organic matter; and extras only where they answer a question (sulphur, trace elements for a known problem, texture once, soil biology or nitrate if the goal needs them). Say that P results depend on the extraction method and must be compared like for like.
6. Labels and record sheet: a consistent sample ID, field, zone, date, depth, cores, crop, last lime, fertiliser and manure dates, who sampled, and GPS or a sketch, so the next round hits the same area.
7. Questions that would change the plan.
</task>

<constraints>
- Mark all numbers as rules of thumb and say which to confirm with the lab or local advisory guidance.
- Do not recommend lime or fertiliser rates; that follows the results and an agronomist or adviser.
- Use the field names given; do not invent fields or sizes. Mark gaps [X].
- If the fields are not described at all, ask and stop.
</constraints>

<output_format>
## Sampling plan
Table: Sample ID | Field | Zone | Approx area | Depth | Reason.
## Timing
Bullets.
## Tests to order
Table: Test | Why | Which samples.
## How to take a sample
Numbered steps.
## Labels and record sheet
The label format, then a blank record table.
## Questions
At most three.
</output_format>
