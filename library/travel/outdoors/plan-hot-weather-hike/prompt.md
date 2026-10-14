---
schema: 1
id: plan-hot-weather-hike
kind: prompt
title: Plan a hot-weather hike
description: Plans a hike in heat or strong sun with start times, shade and rest rules, water and salt, heat illness signs and first steps, and a decision rule for cancelling or shortening the day.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [heat-illness, heatstroke, sun-protection, desert-hiking, canyon-hiking, electrolytes]
pairs_with:
  prompts: [plan-trail-water, set-turnaround-time, plan-hike-with-dog]
args:
  - name: hike
    description: Route, distance, ascent, shade and exposure (open slopes, canyon, desert), expected temperatures and humidity, start time you had in mind, and water on the route.
    type: text
    required: true
  - name: group
    description: Who is going, whether anyone is new to heat or just arrived from a cooler climate, ages, and any health conditions or medicines people have chosen to share that may affect heat tolerance. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Should you go?, Timing, Water, salt and food, Clothing and sun, On the trail, Heat illness, Cancel or shorten rule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan hikes in hot places such as deserts, canyons and summer valleys. Heat illness develops faster than people expect when air temperature is high, the sun is direct, humidity stops sweat evaporating, and the hardest climb comes in the afternoon. Canyon hikes are a known trap: the descent in the cool morning feels easy and the climb out happens in the afternoon heat. People who have arrived from cooler climates have not acclimatised, which usually takes one to two weeks of gradual exposure. Heat exhaustion (heavy sweating, weakness, headache, nausea, dizziness) can progress to heatstroke, a medical emergency with confusion, collapse or a very high body temperature. Drinking large amounts of plain water without salt over a long hot day can cause low blood sodium, which looks similar and is also dangerous.

<hike>
{{hike}}
</hike>
{{#group}}
<group>
{{group}}
</group>
{{/group}}
</context>

<task>
1. Should you go? Weigh the forecast heat, exposure, route profile and the group's acclimatisation. Say plainly if the plan is a poor fit and suggest a cooler alternative (another day, an earlier start, a shaded or shorter route, a different season).
2. Timing: start at first light or earlier, plan to be off exposed ground before the hottest hours, schedule the hard climbing in the cool, and set a turnaround time.
3. Water, salt and food: a per-hour water range for heat, carrying enough for the worst gap, salty snacks or electrolytes, eating regularly, and pre-drinking before starting.
4. Clothing and sun: loose, light-coloured, long-sleeved and breathable clothing, wide-brimmed hat, sunglasses, sun cream reapplied, and wetting a scarf or hat to cool.
5. On the trail: shade breaks on a schedule, buddy checks, pace by the most heat-affected person, and soaking clothing at water sources.
6. Heat illness: signs of heat exhaustion, heatstroke and low sodium, and first steps (stop, shade, cool with water and airflow, sip fluids if alert, call emergency services for confusion, collapse or worsening). Make clear that heatstroke is an emergency.
7. Cancel or shorten rule: specific triggers before and during the hike.
</task>

<constraints>
{{> guardrails/professional-limits}}
- If someone mentions a heart condition, diabetes, pregnancy, or medicines such as diuretics or some blood-pressure and mental-health medicines, say that these can affect heat tolerance and to ask their doctor or pharmacist before a hot hike; do not advise changing any medicine.
- Present numbers as ranges and rules of thumb, not thresholds that make a day "safe".
- Do not invent current temperatures or water availability.
</constraints>

<output_format>
## Should you go?
## Timing
## Water, salt and food
## Clothing and sun
## On the trail
## Heat illness
Table: Condition | Signs | What to do.
## Cancel or shorten rule
</output_format>
