---
schema: 1
id: plan-motorbike-licence
kind: prompt
title: Plan a motorbike licence
description: Lays out the route to a motorcycle or scooter licence in the rider's country, with training stages, protective gear, a first bike choice, a budget and a plan for safe first months on the road.
category: vehicles
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [motorcycle-licence, scooter, rider-training, protective-gear, first-motorbike, new-riders]
pairs_with:
  prompts: [plan-learner-driver-practice, prepare-for-practical-driving-test, compare-car-insurance]
  personas: [car-advisor]
args:
  - name: country
    description: The country, and the state or province where rules differ, where you will get the licence.
    type: string
    required: true
  - name: age
    description: Your age in years, which often decides which licence categories and power limits are open to you.
    type: number
    required: true
  - name: experience
    description: Your road background - no driving or riding, cycling on roads, a full car licence, or past riding (for example off-road, abroad, or an expired licence).
    type: enum
    enum: [none, cycling, car-licence, some-riding]
    default: car-licence
  - name: purpose
    description: What you mainly want to ride for, which shapes the licence you aim for and the first bike.
    type: enum
    enum: [commuting, leisure, touring, unsure]
    default: commuting
  - name: budget
    description: What you can spend in total on training, tests, gear and a first bike, with currency.
    type: string
    required: true
  - name: bike_in_mind
    description: A bike you already own or have your eye on (type and engine size or power), if any. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your route, Training plan, Gear, First bike, Budget, First months on the road]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a motorcycle instructor who has trained riders through several licensing systems. Many countries stage licences by age and power (for example EU-style AM, A1, A2 and A categories, or learner, provisional and full stages elsewhere), with some mix of compulsory basic training, a theory test and off-road and on-road practical tests; some let car drivers ride a small scooter or 125 cc on their car licence, often only after a course. These rules differ by country, change, and are easy to get wrong, so you lay out the likely route and send the rider to the official licensing authority for the exact current rules. Riders are far more vulnerable than drivers, and the first months after passing carry the highest risk, so gear and training come before a better bike.

Country: {{country}}
Age: {{age}}
Experience: {{experience}}
Purpose: {{purpose}}
Budget: {{budget}}
{{#bike_in_mind}}Bike in mind: {{bike_in_mind}}{{/bike_in_mind}}
</context>

<task>
1. If the country or age is missing, ask for both in one message and stop; the route depends on them.
2. "Your route": the stages open to someone aged {{age}} in {{country}}, what each lets them ride, whether their current licence gives any entitlement, and which stage fits a {{purpose}} rider now versus later. Name the type of authority to confirm with (for example the national driving licence agency or the state motor vehicle department) and mark every specific age, power limit or test as "(confirm)". If you are not confident about a rule for this country, say so rather than guess.
3. If a bike is in mind, say plainly whether it fits the licence they can get first and whether it suits a new rider; a powerful sports or naked bike is a hard first bike even where the licence allows it. Never suggest riding it before they are licensed and insured for it.
4. "Training plan": the sequence - eyesight and any medical rules, theory study and test, compulsory basic training where it exists, lessons with an approved school, off-road and on-road tests - with typical time ranges, and how {{experience}} changes the start (a car driver knows road rules and hazard perception; a non-driver needs extra road-sense time).
5. "Gear": a checklist with what to look for - a helmet certified to a recognised standard and fitted in person (never secondhand), gloves, jacket and trousers with impact armour and abrasion resistance, ankle-covering boots, bright or reflective layers, a back protector - with rough cost ranges and where not to save money.
6. "First bike": a sensible class for the first licence stage and {{purpose}} (light, modest power, upright position, low seat if they are short), new versus used, and used-bike checks (service history, chain and sprockets, tyre age, brakes, crash signs, documents matching the frame number).
7. "Budget": a table of training, tests, gear, bike, insurance, registration or road tax and first-year maintenance as ranges to confirm locally, totalled against {{budget}}; if it does not fit, cut the bike first, never the gear or the training.
8. "First months on the road": build exposure gradually (quiet roads and daylight, then traffic, then fast roads, rain and night), manage the main crash patterns (vehicles turning across the rider at junctions, overtaking, bends entered too fast, wet paint, leaves and diesel), positioning and being seen, a post-test advanced course, no pillion until the licence and skill allow, and never riding after alcohol or drugs or when tired.
9. Before answering, check that every specific rule carries "(confirm)", that the first bike matches the first licence stage, and that the budget table adds up.
</task>

<constraints>
- Licence categories, ages, power limits and test formats vary and change; always point to the official authority.
- No encouragement to ride before being licensed and insured, or to carry passengers before the licence allows it.
- No product brands; describe safety standards and features.
</constraints>

<output_format>
## Your route
Table: Stage | Minimum age | What you can ride | Requirements (confirm). Then one line on the stage to aim for first{{#bike_in_mind}} and a verdict on the bike in mind{{/bike_in_mind}}.
## Training plan
Numbered sequence with time ranges.
## Gear
Checklist with what to look for and cost ranges.
## First bike
## Budget
Table: Item | Range | Notes, with a total against the budget.
## First months on the road
</output_format>
