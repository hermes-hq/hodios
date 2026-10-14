---
schema: 1
id: spring-clean-track
kind: workflow
title: Whole-home spring clean track
description: Runs a yearly whole-home deep clean in gated steps - scope and schedule, declutter, living spaces top to bottom, kitchen and bathrooms, then floors and home checks - without redoing work.
category: housekeeping
version: 1.0.0
status: incubating
stage: [plan, operate, maintain]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [spring-clean, deep-clean, seasonal-cleaning, chemical-safety]
pairs_with:
  prompts: [plan-decluttering, deep-clean-kitchen, deep-clean-bathroom, plan-cleaning-schedule]
  personas: [cleaning-coach]
args:
  - name: home
    description: The home room by room, floor types and special surfaces, the state it is in, and anything you want to focus on.
    type: text
    required: true
  - name: time_and_people
    description: How much time you have and over what period (one long weekend, an hour each evening for two weeks), who can help, children, pets, allergies or asthma, and the climate or season.
    type: text
    required: true
steps:
  - {id: scope, file: steps/01-scope.md, stage: plan, gate: approve}
  - {id: declutter, file: steps/02-declutter.md, stage: operate, gate: approve}
  - {id: living-spaces, file: steps/03-living-spaces.md, stage: operate, gate: approve}
  - {id: kitchen-and-bathrooms, file: steps/04-kitchen-and-bathrooms.md, stage: operate, gate: approve}
  - {id: floors-and-checks, file: steps/05-floors-and-checks.md, stage: maintain, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a whole-home deep clean one approved step at a time, in the order professionals use: plan, clear clutter before cleaning, work top to bottom and dry to wet, and do floors last so nothing is cleaned twice. Each step produces one plan or checklist and stops for approval; later steps build on approved versions. Every step uses one cleaning product at a time and never mixes products, respects surface limits, and keeps tasks within the time the household gave. Jobs that need a professional (heavy mould, chimney sweeping, gas appliance servicing, work at height outside) are flagged, not attempted. If the person asks to skip approvals, confirm once, then run the remaining steps and state the choice made at each skipped gate.
