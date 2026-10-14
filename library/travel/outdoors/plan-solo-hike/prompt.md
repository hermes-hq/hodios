---
schema: 1
id: plan-solo-hike
kind: prompt
title: Plan a solo hike
description: Plans a hike or overnight trip alone, sizing the route to solo margins, with a check-in plan, emergency communication, decision rules without a partner and personal safety on the trail.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [solo-hiking, check-in-plan, satellite-messenger, go-no-go-rules, personal-safety, self-reliance]
pairs_with:
  prompts: [write-trip-intentions-plan, prepare-for-getting-lost, set-turnaround-time]
args:
  - name: trip
    description: The route or area, distance and climb, day or overnight, date, terrain, how remote it is and phone coverage if known.
    type: text
    required: true
  - name: hiker
    description: Your experience on similar routes, navigation skills, first aid training, the kit and communication devices you have, and any health conditions that matter.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Solo fit check, Route adjustments, Check-in plan, Communication kit, Decision rules without a partner, Personal safety, If something goes wrong]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people hike alone well. Solo hiking is common and rewarding, but the margin is thinner: an injury that is an inconvenience in a pair can be serious alone, there is nobody to check your navigation or notice early hypothermia, and the wish to finish is not balanced by anyone else. Experienced solo hikers choose routes a notch below their limit, avoid committing terrain without exits, leave a detailed plan with someone who knows exactly when to raise the alarm, carry a way to call for help that works where phones do not (a satellite messenger or personal locator beacon), and set firmer turnaround rules than they would in a group. Personal safety concerns from other people are real for some hikers, and practical habits help without feeding fear.

<trip>
{{trip}}
</trip>

<hiker>
{{hiker}}
</hiker>
</context>

<task>
1. Solo fit check: compare the route with their experience and say where the solo margin is thin (remoteness, river crossings, scrambling, weather exposure, no signal). Suggest a step-down if it is a stretch.
2. Route adjustments: busier or better-marked variants, more escape routes, shorter days, and avoiding sections that are only safe with a partner.
3. Check-in plan: a trip plan left with a reliable contact, a check-in time and an alarm time with the exact steps for them to take, and what to do if plans change (tell the contact before changing).
4. Communication kit: phone with offline map and full battery plus power bank, a satellite messenger or personal locator beacon for areas without signal (explain the difference simply), whistle, head torch, and how to keep electronics warm and dry.
5. Decision rules without a partner: set turnaround times and weather triggers before starting, the habit of a quick self-check every hour (where am I, how am I, what is the weather doing), and treating doubt as a reason to turn back.
6. Personal safety: share the plan with trusted people only, avoid posting live location publicly, trust instincts about people at trailheads or camps, camp away from roads, and carry what helps them feel confident within the law.
7. If something goes wrong: injury, getting lost, or weather turning, with the order of actions: stop, shelter, call for help, stay put if that is the plan agreed with the contact.
</task>

<constraints>
- Do not discourage solo hiking in general; make it safer and say where it is not wise.
- Do not recommend weapons or give advice on using them; check local laws on any personal safety device.
- Emergency numbers and rescue arrangements vary by country; say to check.
</constraints>

<output_format>
## Solo fit check
## Route adjustments
## Check-in plan
## Communication kit
Checklist.
## Decision rules without a partner
## Personal safety
## If something goes wrong
</output_format>
