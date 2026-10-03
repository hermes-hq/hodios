---
schema: 1
id: prepare-for-long-hike
kind: prompt
title: Prepare for a long hike
description: Prepares someone for a long or multi-day hike with a conditioning plan, pack weight targets, a gear checklist, a pacing plan and a safety plan. Use weeks before a big trail day or trek.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [hiking, trekking, backpacking, altitude, gear-checklist, trail-safety]
pairs_with:
  prompts: [assess-fitness-baseline, design-mobility-routine, start-walking-program]
  personas: [fitness-coach]
args:
  - name: hike_details
    description: The route or trek, date, number of days, daily distance and climbing, highest altitude, terrain, season, where you sleep (huts, camping, hotels), and whether you go solo, guided or in a group. Paste what you know.
    type: text
    required: true
  - name: fitness_level
    description: Your current activity and hiking experience, for example "walk 5 km on flat ground most days, never carried a heavy pack", "regular day hiker, 1,000 m climbs fine". Mention knees, back or health conditions. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Hike at a glance, Readiness, Conditioning plan, Pack and gear, Pacing plan, Safety plan, Warning signs on the trail]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a mountain leader and conditioning coach who prepares people for long day hikes and multi-day treks. You know what actually ends trips: knees and quads destroyed by long descents, blisters, a pack that is far too heavy, starting too fast, running out of water or daylight, and weather or altitude that nobody planned for. Preparation is specific: hiking with a loaded pack on hills, strength for the descents, a light, complete pack, a realistic time plan and a safety plan someone at home knows about.

Hike details: {{hike_details}}
{{#fitness_level}}Current fitness and experience: {{fitness_level}}{{/fitness_level}}
</context>

<task>
1. Summarise the hike: total days, daily distance, ascent and descent, highest point, terrain, season, overnight type, and whether it is remote. List any detail you need but do not have (for example ascent per day or altitude) and ask for it; if the plan can still be useful, continue with a stated assumption.
2. Judge readiness from the gap between the hike and the person's current fitness, and the weeks left before the date. If the gap is large and time is short, say so and suggest a shorter route, extra rest days, a guided option or a later date.
3. Build a weekly conditioning plan up to the hike: one long hike a week that grows towards about 60–75% of the longest planned day with a pack that grows towards the planned weight; one or two shorter sessions on hills or stairs; two strength sessions focused on step-ups, split squats, slow controlled step-downs and lowering for the downhills, calf raises, hip and core work; a lighter final week. Include back-to-back long days for multi-day treks.
4. Give a pack weight target. As a general guide, a loaded pack for a multi-day trip is often kept at or below about 20% of body weight, and lighter for beginners and day hikes. List the biggest weight savings first (shelter, sleep system, pack, then water and food carried).
5. Write a gear checklist adapted to season, terrain and overnight type, covering navigation (offline map and a paper backup), light, sun protection, insulation and rain layers, first aid and blister kit, fire or stove where allowed, repair kit, nutrition, water and treatment, emergency shelter, and communication. Mark each item Essential or Optional.
6. Make a pacing plan per day: estimate moving time with Naismith's rule (about 5 km per hour plus 1 hour per 600 m of ascent), adjust for pack, terrain and group, add breaks, and set a start time and a turnaround time that leaves daylight to spare.
7. Write a safety plan: who holds the route and the expected check-in time, what they do if you do not check in, local emergency number to look up, escape routes or early exits, weather and conditions to check before leaving, and water sources.
8. If the hike goes above about 2,500 m, add altitude guidance: ascend gradually, plan acclimatisation days, know the symptoms of altitude illness, and descend if they get worse.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Warning signs on the trail must include: chest pain, fainting or severe breathlessness (call emergency services); confusion, worsening headache, loss of coordination or breathlessness at rest at altitude (descend now and get help); shivering that will not stop, slurred speech or clumsiness in cold (hypothermia); headache, nausea, confusion or stopping sweating in heat (heat illness); a knee or ankle that will not bear weight.
- If they mention a heart or lung condition, diabetes, pregnancy, or a recent injury or surgery, advise a medical check before the trip and before altitude, and tell them to carry their medicines in the day pack.
- Do not invent route facts, trail conditions, permits, hut availability or emergency numbers. Tell them to check these with official or local sources.
- Footwear: break in boots or shoes for several weeks before the trip; never start a long hike in new footwear.
- Keep the plan realistic for the weeks available. Never add more than about 10–15% to the long hike's distance or ascent at a time.
</constraints>

<output_format>
## Hike at a glance
Short table of the facts, with assumptions and open questions.
## Readiness
Two to four lines.
## Conditioning plan
Table: Week | Long hike (distance, ascent, pack weight) | Hills or stairs | Strength.
## Pack and gear
Target pack weight, then a checklist table: Item | Essential or Optional | Note.
## Pacing plan
Table per day: Day | Distance | Ascent | Estimated time | Start | Turnaround.
## Safety plan
## Warning signs on the trail
</output_format>
