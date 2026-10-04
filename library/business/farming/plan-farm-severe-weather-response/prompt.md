---
schema: 1
id: plan-farm-severe-weather-response
kind: prompt
title: Plan a farm severe-weather response
description: Plans a farm's response to flood, heavy snow, heatwave, drought or storm, with warning triggers, stock moves, water and feed, power and fuel, crops and buildings, as a one-page action card.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [severe-weather, farm-resilience, flood-plan, heat-stress, snow-plan, action-card]
pairs_with:
  prompts: [set-up-farm-lone-working-checks, write-emergency-procedures-for-staff, write-relief-worker-handover]
  personas: [farm-safety-adviser]
args:
  - name: weather_risk
    description: The weather event to plan for.
    type: enum
    enum: [flood, snow, heatwave, drought, storm]
    required: true
  - name: farm
    description: The farm - stock and where they are kept, low-lying or exposed fields and buildings, water sources, feed and bedding stocks, fuel, generator, access roads, staff and neighbours who help, and what happened last time.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Triggers, Before, During, After, Contacts and kit, Action card, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farm prepare for one type of severe weather so that, when the warning comes, people act on a plan rather than improvise. Losses in severe weather come from a few repeat causes: stock left in fields that flood or drift with snow, water supply failing (frozen pipes, power cut to the borehole pump, drought), feed and bedding running out when roads close, milk that cannot be cooled or collected, heat stress in housed or transported animals, and people hurt while trying to rescue stock in floodwater or high wind. A good plan ties actions to warning levels, does the slow jobs early (moving stock, stocking fuel and feed), protects people first, and fits on one page by the door.

Weather risk: {{weather_risk}}
</context>

<task>
<farm>
{{farm}}
</farm>

1. Triggers: which warnings to watch (national weather service warnings, flood alerts for the local river, drought or water restrictions) and three levels: watch (forecast days ahead), act (warning issued), emergency (event under way). Name the trigger for each level.
2. Before (watch and act levels), specific to {{weather_risk}} and this farm:
   - flood: move stock and machinery from flood-prone fields and buildings, raise feed, chemicals and fuel above flood level, secure slurry and chemical stores, check drains and culverts.
   - snow: bring stock to sheltered fields or housing, stock feed, bedding, fuel and milk-cooling backup, protect water pipes and troughs, plan access and clearing.
   - heatwave: shade and water capacity per animal, change handling and transport times to cool hours, ventilation, fire risk in crops and stores, staff working hours and water.
   - drought: water budget and priorities, feed budget and options (buying in, selling or moving stock early, reducing stocking), crop and irrigation priorities, fire risk.
   - storm: secure loose sheeting, gates and bales, check trees near buildings and lines, move stock from exposed fields, generator ready.
3. During: people safety first (no one enters floodwater or works under falling trees or on roofs in high wind; lone-working check-ins), keeping water, feed and milking going, generator use, what not to attempt.
4. After: safety check before entering buildings and fields, animal welfare checks and vet, power lines down (stay clear and report), records and photos for insurance, clean-up, and a short review of what to change.
5. Contacts and kit: who to call (vet, power network, water, milk buyer, feed supplier, neighbours with kit, insurer, local authority), and kit to have ready.
6. Action card: the whole plan on one page by trigger level, in short imperatives.
</task>

<constraints>
- Use only the farm details given; mark missing items `[CONFIRM]`.
- People before animals and property: never suggest anyone enters floodwater, goes onto roofs in a storm, or drives through flooded roads to save stock.
- If there is an emergency now (water rising, someone missing, live line down), say first to contact local emergency services, then give immediate steps.
- Do not state insurance cover, support schemes or regulations as fact; list them to check.
- If the farm description is missing, ask and stop.
</constraints>

<output_format>
## Triggers
Table: level | trigger | who watches it.

## Before
Checklist by task area (stock, water, feed and bedding, power and fuel, crops, buildings), with owner.

## During
Numbered steps, people safety first.

## After
Checklist.

## Contacts and kit
Table: contact | why | number [ADD]. Then a kit list.

## Action card
One page: three blocks (watch, act, emergency), up to eight short imperatives each.

## Questions
What to confirm.
</output_format>
