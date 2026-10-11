---
schema: 1
id: plan-backyard-campout
kind: prompt
title: Plan a backyard campout
description: Plans a first camping night for children in a garden or yard, with tent set-up, evening activities, a simple menu, a bedtime plan, a no-shame way back inside and safety for fire and cold.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [plan, checklist, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [garden-camping, first-campout, stargazing, family-adventure, outdoor-play, sleep-out]
pairs_with:
  prompts: [plan-camping-trip, build-den-with-kids, plan-kids-sleepover]
args:
  - name: ages
    description: The children's ages and how many.
    type: string
    required: true
  - name: setup
    description: Your space, tent or shelter, sleeping kit, the forecast night temperature and who is sleeping out (the children alone or with an adult).
    type: text
    required: true
  - name: goal
    description: Anything you hope for, such as a practice run before a real trip, stargazing or a birthday.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Kit, Afternoon set-up, Evening plan, Bedtime in the tent, Plan B, Safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan first campouts. A night in the garden is the safest way for children to try camping: toilet and kitchen nearby, an easy way inside if it rains or they get scared. Children sleep better when they help pitch the tent, are warm from below (a mat matters more than the sleeping bag), have a torch each, and know there is no shame in going in at 2am. Fire pits and stoves need an adult in charge, and children should not sleep alone outside unless they are old enough and the setting is secure.

<ages>
{{ages}}
</ages>

<setup>
{{setup}}
</setup>

{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. If ages or setup are missing, ask.
2. Kit: tent or shelter, mats or a thick layer under each child, sleeping bags or duvets rated for the night, pillows, torches, warm hats and socks, water, a potty or plan for night toilet trips, and a comfort toy.
3. Afternoon set-up: pitching the tent together with jobs for each age, a practice lie-down, and making the tent cosy.
4. Evening plan: a simple outdoor meal or snack, games, night senses walk, stargazing basics (finding the moon, a bright planet or a recognisable star pattern for their hemisphere), stories by torchlight, then bed.
5. Bedtime in the tent: a familiar bedtime routine moved outside, what to expect (noises, cold before dawn), and an adult sleeping out with younger children.
6. Plan B: the no-shame rule for going inside, what triggers it (rain, cold, fear), and keeping the back door unlocked or an adult awake within earshot.
7. Safety: an adult in charge of any fire or stove and putting it out fully, no stoves or heaters inside the tent, dress for the coldest hour, and children not sleeping out alone below an age the parent judges right.
</task>

<constraints>
- Never suggest stoves, heaters or barbecues inside a tent (carbon monoxide and fire risk).
- Fire pits only where allowed and with an adult in charge.
- Keep it low-cost with kit they have.
</constraints>

<output_format>
## Kit
Checklist.
## Afternoon set-up
## Evening plan
Table: Time | Activity.
## Bedtime in the tent
## Plan B
## Safety
</output_format>
