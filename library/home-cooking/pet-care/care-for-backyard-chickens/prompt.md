---
schema: 1
id: care-for-backyard-chickens
kind: prompt
title: Care for backyard chickens
description: Plans keeping a few backyard hens with the rules to check, coop and run design, feed, daily and seasonal care, predator protection, health signs to watch and winter care for the climate.
category: pet-care
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [backyard-chickens, hens, chicken-coop, poultry-care, predator-proofing, fresh-eggs]
pairs_with:
  prompts: [plan-new-pet-care, build-pet-emergency-plan, start-composting]
  personas: [pet-care-advisor]
args:
  - name: flock_size
    description: How many hens you plan to keep.
    type: number
    default: 3
  - name: space
    description: The space you have - garden size, where a coop could go, shade, ground type, distance to neighbours, and whether hens could free-range part of the day.
    type: text
    required: true
  - name: climate
    description: Your climate and its extremes, for example "hot humid summers, mild winters" or "snowy winters to -20 C".
    type: string
    required: true
  - name: country
    description: The country and region you live in, which decides registration, local rules and bird flu guidance.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Check first, Coop and run, Getting your hens, Feed and water, Daily, weekly and seasonal care, Predators and pests, Health watch, Climate care, Costs and time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a smallholder and poultry keeper who helps families start with a few hens. Chickens are social, long-lived (often 6-10 years, laying well for the first 2-4) and vulnerable: most backyard losses come from foxes, raccoons, dogs or hawks getting into a coop that was not secure at night, from rats drawn to spilled feed, from heat stress, and from mites. Many places have rules: some require registering even a small flock with an agricultural authority, many towns limit numbers or ban roosters, and bird flu outbreaks can bring housing orders.

Flock size: {{flock_size}}
Space: {{space}}
Climate: {{climate}}
Country: {{country}}
</context>

<task>
1. If the space description does not say roughly how big the garden is or where a coop could go, ask and stop. If the flock size is under three, explain that chickens should not be kept alone and suggest at least three.
2. "Check first": the rules to confirm for {{country}} - local zoning or tenancy limits on poultry and roosters, flock registration with the national or regional agricultural authority where required (some countries require it for any number of birds), rules on feeding kitchen scraps (some countries ban kitchen scraps for poultry), and how to receive bird flu alerts. Name rules only when confident, and mark them "confirm locally".
3. "Coop and run": space guidance per bird (common guidance is at least about 0.4 m2 / 4 sq ft per bird inside and about 1 m2 / 10 sq ft in the run, more is better), perches, one nest box per three or four hens, ventilation without draughts, easy cleaning, secure locks raccoons cannot open, welded mesh (not chicken wire) and an apron or buried skirt against digging.
4. "Getting your hens": point of lay hens versus chicks, breeds suited to the climate and to families (calm, cold- or heat-hardy), buying from a reputable source or rehoming ex-commercial hens, and quarantining new birds for a few weeks before mixing.
5. "Feed and water": complete layer feed as the main diet, grit and oyster shell, limited treats, foods to avoid, clean water that will not freeze or overheat, and storing feed in a rodent-proof bin.
6. "Daily, weekly and seasonal care": a table of tasks (let out and shut in at dusk, eggs, food and water, coop cleaning, deep clean, mite checks, moult in autumn).
7. "Predators and pests": closing up every night, local predators for the region, rats, red mites and lice and how to check for them.
8. "Health watch": signs to call a vet who treats poultry (lethargy, fluffed up and not eating, laboured breathing, swollen abdomen, egg-bound straining, sudden deaths in the flock), and that sudden multiple deaths during a bird flu period must be reported to the authority. No medication dosing.
9. "Climate care" for {{climate}}: heat (shade, ventilation, cool water) or cold (draught-free but ventilated coop, unfrozen water, deep litter; most hardy breeds do not need a heat lamp, which is a fire risk).
10. "Costs and time": startup and monthly cost ranges to confirm locally, minutes per day, holiday cover, and a plan for older hens that stop laying.
11. Before answering, check that the coop and run fit the space and flock size given.
</task>

<constraints>
- Health problems go to a vet; do not diagnose or give doses.
- Hygiene: wash hands after handling birds and eggs, keep young children supervised, and do not let hens into the kitchen; Salmonella is a known risk.
- Fire safety: avoid heat lamps in coops; if any heat source is used, secure it properly.
- Rules on registration, scraps and housing orders vary and change; confirm locally.
</constraints>

<output_format>
## Check first
## Coop and run
## Getting your hens
## Feed and water
## Daily, weekly and seasonal care
Table: Frequency | Task.
## Predators and pests
## Health watch
## Climate care
## Costs and time
</output_format>
