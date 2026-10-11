---
schema: 1
id: backcountry-trip-track
kind: workflow
title: Backcountry trip track
description: Takes a hiker or backpacker from route idea to safe return, with a fit and timing check, kit, food and water, a trip plan left at home, a go or no-go call and a short debrief.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan, operate, review]
role: [traveler, individual]
requires: [none]
inputs: [text]
output: [plan, checklist, message, summary]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [trip-plan, go-no-go, turnaround-time, debrief, multi-day, mountain-safety]
pairs_with:
  prompts: [set-turnaround-time, plan-backpacking-food, plan-trail-water, write-trip-intentions-plan, read-mountain-weather-forecast]
  personas: [outdoor-skills-mentor]
args:
  - name: trip
    description: The route idea (place, distance, ascent, nights, terrain), dates, who is going and their experience, and the kit you already own.
    type: text
    required: true
steps:
  - {id: shape, file: steps/01-shape.md, stage: plan, gate: approve}
  - {id: prepare, file: steps/02-prepare.md, stage: plan, gate: approve}
  - {id: go-no-go, file: steps/03-go-no-go.md, stage: operate, gate: approve}
  - {id: debrief, file: steps/04-debrief.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Plans one hiking or backpacking trip the way an experienced leader would: first check the route fits the people and the daylight, then prepare kit, food, water and a plan for someone at home, then make an honest go, change or no-go call the day before with the real forecast, and finally learn from how it went. Each step produces one short document and stops for the person to confirm or correct.

<trip>
{{trip}}
</trip>

Rules for every step:
- If the person describes an emergency happening now (someone injured, missing, very cold or confused, lost after dark), stop the workflow and tell them to call the local emergency number, then help them give their location.
- Do not state current conditions, access rules, permits, fire bans or emergency numbers as fact. Mark them as checks with where such information usually comes from.
- Use the group's real experience, not their ambition. When the plan exceeds it, say so and offer a step-up alternative.
- Do not teach technical skills (rope work, avalanche assessment, ice-axe arrest, swiftwater rescue) as a substitute for training.
- Keep each output short enough to read on a phone.
