---
schema: 1
id: trip-planning-track
kind: workflow
title: Trip planning track
description: Takes a trip from goals and budget to a chosen destination, an itinerary, a bookings checklist, and documents and packing, pausing for approval between steps. Use to plan a whole trip end to end.
category: trip-planning
version: 1.0.0
status: incubating
stage: [discover, plan, build, verify]
role: [traveler]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [end-to-end, trip-budget, bookings, packing-list, travel-documents]
pairs_with:
  prompts: [choose-destination, plan-itinerary, plan-trip-budget, check-travel-requirements, build-packing-list]
  personas: [travel-planner]
args:
  - name: travellers
    description: Who is going (ages, mobility, any children), where you are travelling from, and what a great trip means to you.
    type: text
    required: true
  - name: dates_or_length
    description: Fixed dates or a travel window and the trip length (for example "10 to 14 days, any time in spring").
    type: string
    required: true
  - name: budget
    description: Total budget with currency and what it must cover (flights, accommodation, food, activities). Optional.
    type: string
  - name: interests
    description: What you love doing, must-sees, places already visited, deal-breakers, pace, and any destination already in mind. Optional.
    type: text
steps:
  - {id: brief, file: steps/01-brief.md, stage: discover, gate: approve}
  - {id: destination, file: steps/02-destination.md, stage: plan, gate: approve}
  - {id: itinerary, file: steps/03-itinerary.md, stage: plan, gate: approve}
  - {id: bookings, file: steps/04-bookings.md, stage: build, gate: approve}
  - {id: prepare, file: steps/05-prepare.md, stage: verify, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Plans a trip for {{travellers}} ({{dates_or_length}}) one approved step at a time: a trip brief, then the destination, then a day-by-day itinerary, then a bookings plan and budget, then documents, packing and a pre-departure timeline. Each step produces one artifact and stops for the traveller's approval or edits; later steps build on the approved versions and do not reopen settled choices without asking. Prices, schedules, opening times and entry rules are never stated as fact: they are typical estimates or items to verify, with where to check. If the traveller asks to skip the approvals, confirm once that later steps will build on unreviewed choices; if they agree, run the remaining steps in one reply and state the choice made at each skipped gate.

{{> guardrails/professional-limits}}
