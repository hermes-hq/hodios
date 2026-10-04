---
schema: 1
id: plan-low-stress-weaning
kind: prompt
title: Plan low-stress weaning
description: Plans weaning for beef calves, lambs or goat kids - timing by age and weight, creep feeding, fence-line or gradual methods, health checks and weighing - to cut the growth check and stress.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder]
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
tags: [weaning, fence-line-weaning, creep-feeding, animal-welfare, weighing, young-stock]
pairs_with:
  prompts: [plan-calving-season, plan-tupping-calendar, budget-winter-forage-stocks]
  personas: [stockperson-mentor]
args:
  - name: species
    description: Which young stock are being weaned.
    type: enum
    enum: [beef-calves, lambs, goat-kids]
    required: true
  - name: group_size
    description: Number of young animals to wean.
    type: number
    required: true
  - name: facilities
    description: Optional. Fields and fences next to each other, sheds, handling system, weighing scales, creep feeders, distance from neighbours' houses, and the planned weaning date or age.
    type: text
output_contract:
  format: markdown
  sections: [When to wean, Before weaning, Weaning method, Weaning week, After weaning, Records, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a livestock keeper plan weaning so young stock keep growing and stay healthy. Weaning stacks several stresses at once: losing the mother and milk, a new diet, often a move, handling, and sometimes housing, transport or sale. Experienced stockpeople spread those stresses out. The common failures: young stock that have never eaten hard feed before weaning, so they stop growing for weeks; weaning and housing or selling on the same day; abrupt separation out of sight and earshot so animals walk fences and bawl for days; and weaning by date rather than by the animal's age, weight and the mother's condition.

Species: {{species}}
Group size: {{group_size}}
{{#facilities}}
<facilities_and_timing>
{{facilities}}
</facilities_and_timing>
{{/facilities}}
</context>

<task>
1. When to wean: typical ranges as starting points to confirm with the vet or adviser: suckled beef calves often about 6-8 months; lambs often about 12-16 weeks, earlier in a drought or when ewes are thin, later if grass is good; meat goat kids often about 8-12 weeks, or once eating enough solid feed, with dairy-reared kids following their own system. Say which signals matter more than age: weight, eating solid feed well, the mothers' body condition before the next breeding, and grass supply.
2. Before weaning (2-4 weeks): introduce creep feed or creep grazing so young stock already eat hard feed, practise handling, plan health measures with the vet (vaccines or worm control are the vet's decisions), and weigh a sample or all.
3. Weaning method, matched to the facilities: fence-line weaning (mothers and young in adjacent fields across a secure fence for about 4-7 days), two-stage methods for calves where used (devices that stop sucking for a few days before separation, if legal and agreed with the vet), or a gradual removal of mothers in small batches. Keep young stock on familiar ground with the same water and feed; move the mothers, not the young.
4. Weaning week: day-by-day checks (eating, drinking, coughing or breathing changes, scouring, walking fences), keep handling quiet, and no castration, dehorning, housing, transport or sale in the same week where possible. Say what to do if animals break through a fence or a sick animal is found.
5. Mothers after weaning: dry-off management and feeding by condition, and checking udders for mastitis.
6. After weaning: grazing or ration plan for young stock, a weigh at about 2-4 weeks to check the growth check, and follow-up health checks.
7. Records: weaning date, weights, mother ID, health events and any treatments given on the vet's advice.
8. Questions that would change the plan.
</task>

<constraints>
- Do not prescribe vaccines, wormers, medicines or doses; list them as items to agree with the vet.
- Mark typical figures as rules of thumb.
- Consider neighbours: bawling cattle near houses at night is a common complaint; suggest timing and placement.
- If the species or group size is missing, ask and stop.
</constraints>

<output_format>
## When to wean
Bullets with the deciding signals.
## Before weaning
Checklist with timings.
## Weaning method
The chosen method in steps, and why it suits the facilities.
## Weaning week
Table: Day | Young stock checks | Mother checks.
## After weaning
Bullets.
## Records
Table of columns.
## Questions
At most three.
</output_format>
