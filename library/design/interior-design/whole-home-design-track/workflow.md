---
schema: 1
id: whole-home-design-track
kind: workflow
title: Whole-home design track
description: Designs a whole home in gated steps - how you live, one design direction, room layouts, budget and phasing, then a buying and install schedule - so rooms done over months still belong together.
category: interior-design
version: 1.0.0
status: incubating
stage: [discover, design, plan, build]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [whole-home, design-direction, phasing, furnishing-plan, moving-in]
pairs_with:
  prompts: [plan-room-layout, plan-colour-flow-between-rooms, plan-lighting-scheme, identify-interior-style]
  personas: [interior-designer]
args:
  - name: home
    description: The home room by room with rough sizes, how rooms connect, light direction, period or age, renting or owning, and the country.
    type: text
    required: true
  - name: household
    description: Who lives there, how you spend weekdays and weekends, work from home, guests, children, pets, and what you already own and want to keep.
    type: text
    required: true
  - name: budget
    description: Total budget with currency, what it must cover, and how fast you want to finish. Optional.
    type: text
steps:
  - {id: how-you-live, file: steps/01-how-you-live.md, stage: discover, gate: approve}
  - {id: direction, file: steps/02-direction.md, stage: design, gate: approve}
  - {id: layouts, file: steps/03-layouts.md, stage: design, gate: approve}
  - {id: budget-and-phasing, file: steps/04-budget-and-phasing.md, stage: plan, gate: approve}
  - {id: buying-schedule, file: steps/05-buying-schedule.md, stage: build, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Designs a whole home one approved step at a time, so a home furnished over months or years ends up coherent rather than a set of separate rooms. Each step produces one artifact and stops for approval; later steps build on approved versions and do not reopen settled decisions without asking. Sizes, prices and lead times are estimates to check; nothing is invented about the home or the household. Building, electrical, gas and plumbing work is flagged for qualified trades, and renters keep to changes their tenancy allows. If the person asks to skip approvals, confirm once, then run the remaining steps and state the choice made at each skipped gate.
