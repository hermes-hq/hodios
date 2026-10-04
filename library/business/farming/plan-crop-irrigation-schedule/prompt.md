---
schema: 1
id: plan-crop-irrigation-schedule
kind: prompt
title: Plan a crop irrigation schedule
description: Plans irrigation for field vegetables, fruit or arable crops from soil type, crop stage, rainfall and evaporation, water supply limits and equipment capacity, with a soil-moisture check routine.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder, operations-manager]
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
tags: [irrigation-scheduling, water-balance, evapotranspiration, soil-moisture, water-licence]
pairs_with:
  prompts: [plan-orchard-season-tasks, triage-crop-symptoms, plan-harvest-logistics]
args:
  - name: crops
    description: Crops to irrigate with areas, planting dates, rooting depth if known, and critical stages (for example "potatoes 20 ha, planted mid April, tuber initiation late May").
    type: text
    required: true
  - name: soil
    description: Soil texture for each block, for example "sandy loam" or "clay loam over chalk".
    type: string
    required: true
  - name: water_supply
    description: Where water comes from and its limits - licence or allocation volume per year and per day, reservoir or borehole capacity, pump rate, any restrictions in dry periods.
    type: text
    required: true
  - name: equipment
    description: Optional. Irrigation equipment - hose reels and rain guns, booms, centre pivot, drip or trickle - with output, coverage per day, and labour to move it.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Water budget, Capacity check, Schedule by crop stage, Soil moisture check routine, When water runs short, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a grower plan irrigation that puts water on when the crop needs it and stays within the water and equipment they have. Irrigation advisers schedule with a soil water balance: crop water use (reference evapotranspiration × a crop coefficient for the growth stage) minus rainfall, drawn from the soil's available water in the root zone, with irrigation triggered before the crop is stressed. The common failures: watering by calendar, applying more than the soil can hold so water drains past the roots, an equipment cycle so long that the last block is stressed before the first is watered again, and a licence used up before the most critical crop stage.

Soil: {{soil}}
<crops>
{{crops}}
</crops>
<water_supply>
{{water_supply}}
</water_supply>
{{#equipment}}
<equipment>
{{equipment}}
</equipment>
{{/equipment}}
</context>

<task>
1. Assumptions, labelled: available water capacity for the soil texture (for example sandy soils roughly 70-120 mm per metre of soil and loams roughly 150-200 mm per metre, to confirm locally), effective rooting depth by crop and stage, the allowable depletion before irrigating (often about 30-50% of available water, lower for sensitive stages such as potato tuber initiation for scab control or fruit sizing), peak daily crop water use for the region and crop, and irrigation efficiency by system (rain guns lower than booms, drip highest).
2. Water budget: the season's likely irrigation need per crop (in mm and cubic metres: 1 mm on 1 ha = 10 m³), compared with the licence or supply. Prioritise crops and stages where water gives the most quality or yield if it does not cover everything.
3. Capacity check: how many hectares the equipment can water per day at the planned application, the cycle time to return to the same block, and whether that keeps up with peak water use. Name the gap if not.
4. Schedule by crop stage: trigger points (soil moisture deficit in mm or sensor readings), application depth per pass that the soil can hold without runoff or drainage, and critical stages to protect first.
5. Soil moisture check routine: a weekly or twice-weekly water balance sheet (rain, estimated crop use, irrigation, running deficit) plus field checks (soil probe or sensors at two depths, the hand-feel test), and when to recalibrate.
6. When water runs short: which crops and stages to protect, application changes (night watering to cut losses, shorter cycles), and talking to the licensing body early about restrictions.
</task>

<constraints>
- Show sums with units (mm, m³, hectares per day).
- Mark all figures as rules of thumb; suggest local weather and evaporation data sources or an irrigation adviser for local values.
- Do not state licence rules as fact; mark them [CHECK with the licensing body].
- If crops, soil or water supply are missing, ask and stop.
</constraints>

<output_format>
## Assumptions
Table: Item | Value | Source.
## Water budget
Table: Crop | Area | Expected need (mm) | Volume (m³) | Priority.
## Capacity check
The arithmetic and a one-line verdict.
## Schedule by crop stage
Table: Crop | Stage | Trigger | Application per pass | Notes.
## Soil moisture check routine
Numbered steps and a blank weekly balance table.
## When water runs short
Bullets.
## Questions
At most three.
</output_format>
