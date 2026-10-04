---
schema: 1
id: plan-harvest-logistics
kind: prompt
title: Plan harvest logistics
description: Plans harvest flow for grain, potatoes or fruit - field order, harvesting capacity, trailers and drivers, drying and storage, buyer collections - and finds the bottleneck that sets the pace.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder, operations-manager]
subject: [agriculture, supply-chain]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [harvest, bottleneck, grain-drying, field-order, crop-storage, haulage]
pairs_with:
  prompts: [plan-orchard-season-tasks, extract-field-work-log, plan-arable-crop-rotation, estimate-harvest-labour-needs]
args:
  - name: crop
    description: The crop or crops being harvested, for example "winter wheat and oilseed rape", "maincrop potatoes", "dessert apples".
    type: string
    required: true
  - name: area
    description: Fields with areas, distances from the yard or store, expected yields, varieties and likely ripening order.
    type: text
    required: true
  - name: equipment_and_crew
    description: Harvest equipment and people - combine or harvester and its work rate if known, trailers and their capacity, drivers and their hours, picking or grading crews, contractors.
    type: text
    required: true
  - name: storage
    description: Optional. Drying capacity per hour, store and cold-store capacity, intake pit speed, buyer collection schedule or contract delivery dates, weighbridge access.
    type: text
output_contract:
  format: markdown
  sections: [Capacity check, Bottleneck, Field order, Daily plan, Contingencies, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farm manager plan harvest as a flow from field to store or buyer. Experienced managers know harvest runs at the speed of its slowest link: the harvester, the haulage, the intake, the dryer, the grading line or the buyer's collections. Adding a second combine is pointless if the dryer can only take half its output. Common failures: no one calculates the capacity of each link, trailers queue at the pit while the combine waits, the field order ignores ripeness and distance, and there is no plan for a wet spell or a breakdown.

Crop: {{crop}}
<fields>
{{area}}
</fields>
<equipment_and_crew>
{{equipment_and_crew}}
</equipment_and_crew>
{{#storage}}
<storage_and_buyers>
{{storage}}
</storage_and_buyers>
{{/storage}}
</context>

<task>
1. Capacity check: express every link in the same unit (tonnes per hour, or bins or boxes per hour for fruit and potatoes) for a realistic working day. Harvester: work rate × yield × field efficiency (often about 65-75% once turning, unloading and stops are counted). Haulage: trailer capacity ÷ round-trip time (load, travel both ways, tip, queue). Intake and drying or grading: rated speed, and for drying the moisture removed (drying from 20% to 15% takes far longer than 17% to 15%). Storage: space left. Buyer: collections per day. Show each sum.
2. Bottleneck: name the slowest link and the hours or tonnes lost per day because of it, then the cheapest way to lift it (an extra trailer or driver, staggered start, a buffer heap or pad where permitted, a hired dryer or store, more collections).
3. Field order: rank fields by ripeness or moisture, quality risk (for example sprouting or shattering risk in grain, skin set in potatoes, fruit maturity tests), distance and access, and contract or buyer needs. Keep varieties and qualities separate where they are sold separately.
4. Daily plan: start and finish times by link (dew or moisture limits, picking temperature limits for fruit), driver and crew shifts within safe working hours, breaks and handovers, and daily records (field, load, weight, moisture or grade, store bin).
5. Contingencies: wet spell (priorities when the weather turns, what is cut first after rain), breakdown (spares, dealer contact, contractor back-up), staff illness, and storage full.
6. Questions that would change the plan most.
</task>

<constraints>
- Show the arithmetic; mark each rate as given or as a rule of thumb.
- Do not invent work rates, yields, prices or contract terms; use [X] and ask.
- Keep people safe: no plan that relies on drivers or pickers working excessive hours; flag lone working and overhead power lines for tipping trailers. If the plan depends on very long days or on a child or young person driving or riding on machinery, say so plainly, mark the age and hours rules as [CHECK locally], and plan extra drivers or a contractor instead.
- If crop, fields or equipment are missing, ask and stop.
</constraints>

<output_format>
## Capacity check
Table: Link | Capacity per hour | Hours per day | Capacity per day | Source.
## Bottleneck
Two to four sentences, with the fix options in a short list.
## Field order
Table: Order | Field | Area | Reason.
## Daily plan
Table: Time | Harvester | Haulage | Store or dryer | People.
## Contingencies
Table: Problem | Trigger | Response.
## Questions
At most three.
</output_format>
