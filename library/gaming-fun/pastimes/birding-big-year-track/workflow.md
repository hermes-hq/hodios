---
schema: 1
id: birding-big-year-track
kind: workflow
title: Birding big year track
description: Plans and runs a birding big year in gated steps from rules and area through a target list and seasonal calendar to trip plans and monthly reviews, with ethics and budget kept in check.
category: pastimes
version: 1.0.0
status: incubating
stage: [plan, operate, review]
role: [individual]
requires: [none]
inputs: [text, preferences, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [big-year, year-list, bird-listing, bird-migration, birding-trips, field-skills]
pairs_with:
  prompts: [plan-birdwatching-outing, identify-bird-from-description]
args:
  - name: area
    description: The area your year list covers, for example "my county", "a 5 km circle from home", "the whole of Portugal".
    type: string
    required: true
  - name: year
    description: The year or 12-month period, for example "2027" or "April 2027 to March 2028".
    type: string
    required: true
  - name: constraints
    description: Time, budget and travel limits, for example "weekends only, 1,000 EUR, no flights", "car-free, cycling only".
    type: string
    required: true
  - name: experience
    description: Your birding level.
    type: enum
    enum: [beginner, intermediate, expert]
    default: intermediate
steps:
  - {id: rules, file: steps/01-rules.md, stage: plan, gate: approve}
  - {id: targets, file: steps/02-targets.md, stage: plan, gate: approve}
  - {id: calendar, file: steps/03-calendar.md, stage: plan, gate: approve}
  - {id: trip, file: steps/04-trip.md, stage: operate, gate: approve}
  - {id: review, file: steps/05-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a birding big year in {{area}} over {{year}} within {{constraints}}, pitched at a {{experience}} birder. It fixes the rules first, builds a realistic target list and a seasonal calendar, then plans trips and reviews progress each month so the plan adapts to what has been seen and what is left. It never invents species occurrence, dates or sites for the area: it reasons from the birder's own knowledge, regional guides and local records, and marks every timing as "to check". Ethics come before the list: no disturbance of nesting or roosting birds, no playback where it harms birds or is banned, and no trespass. Steps 4 and 5 repeat through the year. If the birder asks to skip approvals, confirm once, then run the remaining planning steps in one reply and state each choice made at a skipped gate.
