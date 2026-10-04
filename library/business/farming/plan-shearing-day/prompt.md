---
schema: 1
id: plan-shearing-day
kind: prompt
title: Plan a shearing day
description: Plans a sheep shearing day - contractor booking, keeping sheep dry and empty, pens and catching flow, wool handling and packing, helpers' jobs and a wet-weather fallback.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [checklist, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [shearing, sheep-handling, wool, shearing-contractor, wet-weather-plan]
pairs_with:
  prompts: [plan-lambing-shed-rota, plan-low-stress-weaning]
  personas: [stockperson-mentor]
args:
  - name: sheep_count
    description: Number of sheep to shear (and how many are ewes with lambs at foot, rams or hoggs).
    type: number
    required: true
  - name: setup
    description: Optional. Shed or barn, handling pens, shearing trailer or board, power supply, distance from fields, wool buyer or what you do with the wool, and the planned date.
    type: text
  - name: helpers
    description: Optional. Number of helpers available on the day, not counting the shearers.
    type: number
    default: 2
output_contract:
  format: markdown
  sections: [Booking and timing, The week before, Day plan, Jobs for helpers, Wool handling, Wet weather fallback, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a sheep keeper run a shearing day that keeps shearers shearing. Contractors are paid per head and their day is wasted when sheep are wet, not in, or full, or when catching pens run empty. Experienced keepers plan the flow: sheep gathered and penned dry the evening before, held off feed for some hours so they are comfortable to shear and the board stays clean, a full catching pen behind every shearer, and someone dedicated to the wool. Common failures: rain overnight on sheep left out, too few helpers so shearers catch their own sheep, wool packed with dags and contamination, and no plan for ewes with young lambs mothering up again afterwards.

Sheep to shear: {{sheep_count}}
Helpers available: {{helpers}}
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}
</context>

<task>
1. Booking and timing: book the contractor early, agree start time, numbers, the board or trailer, power and lunch arrangements, and the per-head rate in writing (never quote a rate yourself). Estimate time with a labelled rule of thumb (a skilled shearer often does roughly 150-250 a day depending on breed, size and condition) and say how many shearers the job needs to finish in one day.
2. The week before: check the weather forecast, plan to gather and house or pen sheep under cover the evening before, crutch or dag dirty sheep beforehand if needed, and hold sheep off feed and water for a period agreed with the shearer (often several hours; shorter for heavily pregnant or young animals) for comfort and a cleaner board. Set up pens: a forcing pen, catching pens behind each stand, and a let-out race with a count.
3. Day plan: timetable from first gather to last sheep out, with breaks for shearers, and how ewes and lambs are separated and mothered up afterwards in a quiet field.
4. Jobs for helpers: penning and keeping catching pens full, wool handling (one person per one or two shearers), sweeping the board, tally keeping, and checking shorn sheep for cuts to treat as the vet advises. Fit the jobs to the number of helpers and say what to drop if fewer turn up.
5. Wool handling: skirt and roll fleeces skin side out, keep belly wool, dags and locks separate, keep coloured and black fibre and contamination (baler twine, plastic, straw) out, pack dry wool in the buyer's sheets or bags, and label for the buyer or wool board [CHECK the buyer's packing rules].
6. Wet weather fallback: what counts as too wet, how many sheep can be kept dry under cover, and when to call the contractor to postpone.
7. Questions that would change the plan.
</task>

<constraints>
- Do not quote contractor rates or wool prices.
- Animal welfare: no shearing of wet sheep, care with heavily pregnant ewes, shelter for newly shorn sheep in cold or wet weather.
- People safety: lifting and catching technique, trip hazards on the board, electrical safety for clipper power.
- If the sheep count is missing, ask and stop.
</constraints>

<output_format>
## Booking and timing
Bullets, with the shearer count arithmetic.
## The week before
Checklist with days.
## Day plan
Table: Time | What happens | Who.
## Jobs for helpers
Table: Job | Person | Notes.
## Wool handling
Numbered steps.
## Wet weather fallback
Bullets.
## Questions
At most three.
</output_format>
