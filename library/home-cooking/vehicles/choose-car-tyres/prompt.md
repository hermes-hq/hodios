---
schema: 1
id: choose-car-tyres
kind: prompt
title: Choose car tyres
description: Decodes your tyre size and ratings, then compares summer, winter and all-season tyres and price tiers for your driving, climate and budget, with fitting and pairing rules.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, image, preferences]
output: [explanation, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [tyres, tyre-size, all-season-tyres, winter-tyres, tyre-labels, buying-guide]
pairs_with:
  prompts: [prepare-car-for-winter, plan-car-maintenance, cut-driving-costs]
  personas: [car-advisor]
args:
  - name: car
    description: Make, model, year and fuel type, including whether it is electric or a heavy SUV or van.
    type: string
    required: true
  - name: tyre_markings
    description: What is printed on the tyre sidewall, for example "225/45 R17 94W", or a photo description. Optional; the door-jamb placard or handbook also lists approved sizes.
    type: string
  - name: driving
    description: Country or climate, typical winters, yearly mileage, mostly town, motorway or rural, and anything special (towing, gravel roads, mountain passes, performance driving).
    type: text
    required: true
  - name: budget
    description: Rough budget per tyre or for a set, with currency, and how many tyres you need to replace. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your tyre size decoded, Which type of tyre, Price tier, Comparing models, Buying and fitting, Checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an independent tyre fitter who sells no brand. What buyers miss: the size code (width/aspect ratio, construction, rim diameter, then load index and speed rating) must match what the car is approved for, and the load index and speed rating must be at least the original; electric and heavy cars may need reinforced (XL) or EV-specific tyres because of weight; "all-season" ranges from mild-climate tyres to genuine winter-rated ones (look for the mountain-snowflake symbol, not just M+S); in some countries winter tyres or equipment are legally required in certain conditions; the cheapest tyre is often not the cheapest per kilometre; independent tests and the label values (where the country has a label: wet grip, rolling resistance, noise) are better guides than brand reputation; tyres age as well as wear, so the date code matters; and when only two are replaced, the newer pair usually goes on the rear axle.

Car: {{car}}
{{#tyre_markings}}Sidewall markings: {{tyre_markings}}{{/tyre_markings}}
Driving: {{driving}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Your tyre size decoded: explain each part of the markings in plain words. If no markings are given, tell them where to find the approved sizes (door-jamb placard, handbook, current tyres) and continue generally.
2. Which type of tyre: summer, all-season (mild versus snowflake-rated) or a separate winter set, judged against their climate and driving. Mention when local rules may require winter tyres or chains and say to confirm with official sources for their country. For EVs and heavy vehicles, cover load rating and EV-specific tyres.
3. Price tier: budget, mid-range and premium in general terms, what you trade (wet braking, wear life, noise, efficiency), and where saving money is reasonable and where it is not for their use.
4. Comparing models: how to read independent tyre tests and the tyre label if their country uses one, and a short table of what to compare. Do not name winners.
5. Buying and fitting: date code (a four-digit week and year; avoid old stock), fitting and balancing, valves or TPMS sensors, wheel alignment if wear was uneven, matching tread on the same axle, newer tyres on the rear when replacing two, all-wheel-drive limits on mixing tread depths, and running-in. Storing a second set if they swap seasonally.
6. Checklist: what to check before paying and what to ask the fitter.
</task>

<constraints>
- Never recommend a lower load index or speed rating than the car's approved minimum, or a size not approved for the car.
- Do not name or rank specific brands or models, and do not quote prices as current facts; price tiers are relative.
- Winter tyre laws, label schemes and minimum tread depths differ by country and change; state assumptions and tell them to confirm.
- If the markings look inconsistent with the car (for example a space-saver spare or a size from a different model), say so.
</constraints>

<output_format>
## Your tyre size decoded
A short table: Part | Means.
## Which type of tyre
A recommendation with the reason in two or three lines.
## Price tier
## Comparing models
Table: What to compare | Why it matters for you.
## Buying and fitting
## Checklist
</output_format>
