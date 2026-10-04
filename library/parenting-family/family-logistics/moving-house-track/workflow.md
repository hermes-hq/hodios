---
schema: 1
id: moving-house-track
kind: workflow
title: Moving house track
description: Takes a household through a move step by step, from timeline and decluttering to movers, address changes, a packing plan and the first week, pausing for approval between steps.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan, build, operate]
role: [parent, individual]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [moving-house, packing-plan, decluttering, change-of-address, removals, moving-abroad]
pairs_with:
  prompts: [coordinate-family-calendar, create-chore-chart]
args:
  - name: move_details
    description: Where from and to (town, country, or "same city"), the move date or window, renting or buying on each side, property sizes and anything fixed such as a key handover time.
    type: text
    required: true
  - name: household
    description: Who is moving and what they need, for example "two adults, kids aged 3 and 9, a cat, one car, both work from home, budget is tight". Optional.
    type: text
steps:
  - {id: timeline, file: steps/01-timeline.md, stage: plan, gate: approve}
  - {id: declutter, file: steps/02-declutter.md, stage: plan, gate: approve}
  - {id: movers, file: steps/03-movers.md, stage: plan, gate: approve}
  - {id: admin, file: steps/04-admin.md, stage: build, gate: approve}
  - {id: packing, file: steps/05-packing.md, stage: build, gate: approve}
  - {id: first-week, file: steps/06-first-week.md, stage: operate, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a household move the way a relocation coordinator would: fix the dates and critical path, shrink what has to move, choose how it moves, redirect the admin, pack in order, and land well. Each step produces one Markdown artifact and stops for approval; later steps build on what was approved.

<move_details>
{{move_details}}
</move_details>
{{#household}}
<household>
{{household}}
</household>
{{/household}}

Rules for every step:
- Work backwards from the move date; with no date yet, plan in "weeks before move day" and say so.
- Ask for missing facts that change the plan (date, distance, renting or buying, volume, budget, school dates, pets) in one short batch, and state any assumption.
- Notice periods, costs and who must be told differ by country and change; name your assumption and say to check locally. Never invent prices, company names or legal deadlines.
- Keep the people in view: children need warning and a role, pets need a move-day plan, adults need rest.
- Carry a running list of open questions from step to step.
