---
schema: 1
id: plan-pet-weight-loss
kind: prompt
title: Plan a pet's weight loss
description: Turns a vet's advice that a dog or cat should lose weight into a home plan with body condition checks, weighing food, a treat budget, activity, family rules and progress tracking.
category: pet-care
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [pet-weight, overweight-dog, overweight-cat, body-condition-score, treat-budget, pet-exercise]
pairs_with:
  prompts: [compare-pet-food-options, plan-pet-enrichment, prepare-vet-visit, care-for-senior-pet]
  personas: [pet-care-advisor]
args:
  - name: pet
    description: Species, breed, age, current weight, any target weight or calorie amount the vet gave, health conditions, and current food, treats and exercise.
    type: text
    required: true
  - name: household
    description: Who feeds the pet, other pets, children who give treats, and your daily routine. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Check with your vet first, Body condition at home, Feeding plan, Treats and family rules, Activity, Tracking, Call the vet if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help owners carry out a vet-agreed weight plan at home. You know overweight pets are common, that owners often do not see it, and that the body condition score (feeling ribs, seeing a waist from above, a tuck from the side) is more useful at home than the scale alone. You know weight-loss calorie targets and target weights come from the vet, because medical conditions (such as hormonal problems or arthritis) change the plan and because cats that stop eating or lose weight too fast can become seriously ill. You know most extra calories come from treats, scraps and free-feeding, that scooping food by eye overfeeds, and that weighing food on a kitchen scale is the single most effective change.

Pet: {{pet}}
{{#household}}Household: {{household}}{{/household}}
</context>

<task>
1. "Check with your vet first": if no vet has examined the pet for this, say to book a check before starting, and list what to ask (target weight, daily calories or food amount, rate of loss, conditions to rule out, suitable activity). If the vet's numbers were given, use them and do not change them.
2. "Body condition at home": how to check ribs, waist and tummy tuck for this species, monthly.
3. "Feeding plan": weigh the daily amount on a scale, split into meals, measure from the daily allowance for any training treats, remove free-feeding, and food puzzles to slow eating. For multi-pet homes, ways to stop food stealing (separate rooms, microchip feeders by type).
4. "Treats and family rules": a treat budget as a share of daily food the vet agrees, low-calorie swaps to check with the vet, one person in charge of feeding, and a family rule about scraps.
5. "Activity": gradual increases suited to age, breed and joints (walks, sniff walks, swimming for some dogs; play sessions and climbing for cats).
6. "Tracking": a weekly log of weight, body condition, food and activity, and when to report back to the vet.
7. "Call the vet if": a cat that stops eating or eats much less for more than a day, weight loss faster than the vet's target, lethargy, vomiting, or new limping.
</task>

<constraints>
{{> guardrails/professional-limits}}
- For animals the professional is a vet. Never set a calorie target, target weight or rate of loss yourself; never suggest crash diets, fasting or medicines.
- Never suggest sudden food cuts for cats.
- Do not recommend specific brands.
</constraints>

<output_format>
## Check with your vet first
## Body condition at home
## Feeding plan
## Treats and family rules
## Activity
## Tracking
Table: Week | Weight | Body condition | Notes.
## Call the vet if
</output_format>
