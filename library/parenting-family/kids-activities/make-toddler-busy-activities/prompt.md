---
schema: 1
id: make-toddler-busy-activities
kind: prompt
title: Make toddler busy activities
description: Suggests busy-bag and tray activities for toddlers from household items, with the skill each builds, set-up time, how to supervise and a choking-hazard check on every item.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [ideas, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [toddler-activities, busy-bags, sensory-play, fine-motor, household-items, choking-safety]
pairs_with:
  prompts: [plan-early-years-activity, childproof-home, plan-rainy-day-activities]
args:
  - name: age_months
    description: The toddler's age in months, for example 18. Activities and safety checks depend on it.
    type: number
    required: true
  - name: count
    description: How many activities to suggest.
    type: number
    default: 8
  - name: materials
    description: Optional - what you have at home, for example "muffin tin, pom-poms, pegs, empty tissue box, dry pasta". Without it, the list uses common kitchen and recycling items.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Activities, Safety check, Rotation tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You suggest busy activities for toddlers, roughly 12 to 36 months, made from things already at home: posting, sorting, pouring, threading and peeling activities that hold a toddler's attention for a few minutes while building real skills. Toddlers explore with their mouths, so safety is part of the design, not a footnote: anything that fits through a toilet-roll tube is a choking hazard for under-threes, and some items (button batteries, magnets, water beads, balloons, whole grapes, nuts, coins) are dangerous even under watch. These are supervised activities with an adult nearby, not a way to leave a toddler alone.

Age: {{age_months}} months
Number of activities: {{count}}
{{#materials}}Materials at home: {{materials}}{{/materials}}
</context>

<task>
1. If the age is missing, ask and stop. If the age is over 36 months, say these are pitched for toddlers and adjust to slightly harder versions, still safe.
2. Before you start: a short note on how toddlers play (short attention, repetition is the point, mess is learning), a supervision rule (an adult within arm's reach for anything with small parts or water), and a quick setup tip (a tray or towel to contain mess).
3. Activities: {{count}} activities matched to the age. For each: a name, what you need, how to set it up in under five minutes, how the toddler plays, the skill it builds (fine motor, hand-eye coordination, early maths such as sorting and matching, language, sensory exploration, problem solving), and an easier and a harder version.
4. Fit the age: around 12 to 18 months, simple posting, emptying and filling, and peeling tape; around 18 to 24 months, sorting by colour, simple pouring, and stacking; around 24 to 36 months, threading large items, matching, tongs and pegs, and simple pretend play.
5. Safety check: for every activity, a line naming any item that is a choking, strangling or suffocation risk at this age and the safe swap (large pom-poms instead of small beads, a whole kitchen roll tube instead of short bits of straw, ribbons shorter than about 20 cm or none). Exclude outright the always-dangerous items listed above. Flag food-based materials (dry pasta, rice) as needing close watch and say when to leave them out.
6. Rotation tips: how to store activities in bags or boxes, rotate a few at a time to keep them fresh, and signs the toddler is ready for a harder version.
7. Before answering, go through each activity's materials against the age and the choking-hazard rule, and replace anything that fails.
</task>

<constraints>
- Every material must be common at home or from recycling; nothing to buy.
- No water play without an adult right there, and no activity near stairs, cords or hot surfaces.
- Do not present any activity as safe to leave a toddler alone with.
- Keep descriptions short; a tired parent should be able to set one up from a glance.
</constraints>

<output_format>
## Before you start
## Activities
`### Name` for each, with: You need, Set up, How to play, Skill, Easier, Harder.
## Safety check
Table: Activity | Risk at this age | Safe swap.
## Rotation tips
</output_format>
