---
schema: 1
id: plan-paddock-grazing-rotation
kind: prompt
title: Plan a paddock grazing rotation
description: Designs a rotational grazing plan from the field map - paddock layout, rest periods by season, entry and exit grass covers, water and fencing, and a weekly grass walk routine.
category: farming
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual, founder]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rotational-grazing, grass-cover, paddock-design, grass-walk, set-stocking, water-troughs]
pairs_with:
  prompts: [estimate-farm-stocking-rate, budget-winter-forage-stocks, plan-grassland-reseed]
args:
  - name: livestock
    description: The animals that will graze - species, class (for example cows with calves, ewes and lambs, dairy herd, youngstock), numbers and rough liveweights.
    type: text
    required: true
  - name: grazing_area
    description: The grazing land - field names and sizes, shape, slope, wet areas, existing fences, gates, water points and tracks. A rough sketch description is fine.
    type: text
    required: true
  - name: current_system
    description: Optional. How you graze now (set stocking, rough rotation), problems you see, and budget for fencing and water.
    type: text
  - name: region_climate
    description: Region and climate, for example "lowland Ireland, mild and wet" or "upland Wales, short season" or "Victoria, dry summers".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Grazing targets, Paddock layout, Water and fencing, Season by season, Weekly grass walk, First month, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a livestock farmer move to paddock or rotational grazing. Good grassland managers decide moves by grass cover and growth rate, not by fixed days: the rotation length must match how fast grass regrows, which changes through the season. Common failures: paddocks too big so stock graze the regrowth and selectively waste grass, rotation length fixed all season so grass gets ahead in spring and runs out in summer, water points that make stock walk too far or poach the ground, and no measuring, so decisions stay guesswork.

Region and climate: {{region_climate}}
<livestock>
{{livestock}}
</livestock>
<grazing_area>
{{grazing_area}}
</grazing_area>
{{#current_system}}
<current_system>
{{current_system}}
</current_system>
{{/current_system}}
</context>

<task>
1. Grazing targets as starting points to adjust locally: entry cover about 2,500-3,000 kg DM/ha for cattle (about 8-10 cm, three leaves), about 2,200-2,600 for sheep; exit (residual) about 1,500-1,700 kg DM/ha for cattle (about 4-5 cm) and similar for sheep at a slightly shorter height. Explain the three-leaf stage for ryegrass swards and that other swards differ.
2. Daily demand: estimate dry matter intake from liveweights (about 2.5-3% of liveweight a day for growing or lactating stock), and total herd demand per day.
3. Rotation length by season: rest period roughly = time for grass to regrow to entry cover; give a starting table (for example about 18-25 days at peak growth, 30-40 in early spring or a dry summer, longer in autumn) and say growth rate is what decides it.
4. Paddock layout: number of paddocks = rotation length / days per paddock + 1-2 spare. Aim for 1-3 days per paddock for cattle, 3-5 for sheep. Size paddocks from daily demand and available cover, keep them square-ish, use existing fences and hedges first, temporary electric fencing to subdivide, and a back fence where stock stay longer than 2-3 days.
5. Water and fencing: a trough in or near every paddock, stock walking distance under about 200-250 m where possible, trough flow and capacity sized to peak demand, and a costed list (permanent vs temporary fence, reels, posts, energiser, pipe).
6. Season by season: spring (start date, skipping or closing paddocks for silage when grass gets ahead), summer (lengthen rotation in dry weather, buffer feeding), autumn (closing order and building cover for spring), winter (housing or sacrifice areas).
7. Weekly grass walk: measure or estimate cover in every paddock (plate meter, sward stick or visual with calibration), compute farm cover and growth rate, update a grass wedge, and the decision rules (grass ahead: take out paddocks for silage; behind: lengthen rotation, add supplement or reduce stock).
8. First month: what to set up first with the least spend.
</task>

<constraints>
- Mark every figure as a rule of thumb and explain how to adapt it to {{region_climate}}.
- Do not invent field sizes or water points; use the grazing area notes and mark gaps [X].
- Protect soils and watercourses: avoid poaching wet ground and keep stock out of streams where rules or welfare require it [CHECK locally].
- If livestock numbers or area are missing, ask and stop.
</constraints>

<output_format>
## Grazing targets
Table: Item | Target | How to check.
## Paddock layout
Paddock count with the sum shown, then a table: Paddock | From field | Approx area | Water | Notes.
## Water and fencing
Checklist with quantities.
## Season by season
Table: Season | Rotation length | Key decisions.
## Weekly grass walk
Numbered routine and the decision rules.
## First month
Numbered steps.
## Questions
At most three.
</output_format>
