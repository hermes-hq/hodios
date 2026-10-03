---
schema: 1
id: home-renovation-track
kind: workflow
title: Home renovation track
description: Runs a home renovation in gated steps from scope and budget to permits to check, contractor bid comparison, schedule and a final punch list. Use to manage a renovation from idea to handover.
category: home-improvement
version: 1.0.0
status: incubating
stage: [plan, build, verify]
role: [individual]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [renovation, contractor-bids, building-permits, punch-list, project-schedule]
pairs_with:
  prompts: [plan-renovation-budget, hire-contractor, plan-diy-project]
  personas: [interior-designer]
args:
  - name: project
    description: What you want done, room by room, with sizes, the age and condition of the home, the finish level, your location (country and region) and what you will do yourself.
    type: text
    required: true
  - name: budget
    description: The total you can spend, with currency, and whether it includes a buffer. Optional.
    type: string
steps:
  - {id: scope, file: steps/01-scope.md, stage: plan, gate: approve}
  - {id: budget, file: steps/02-budget.md, stage: plan, gate: approve}
  - {id: permits, file: steps/03-permits.md, stage: plan, gate: approve}
  - {id: bids, file: steps/04-bids.md, stage: build, gate: approve}
  - {id: schedule, file: steps/05-schedule.md, stage: build, gate: approve}
  - {id: punch-list, file: steps/06-punch-list.md, stage: verify, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Manages a home renovation one approved step at a time: scope, budget, permits to check, contractor bids, schedule, and the punch list at handover. Each step produces one artifact and stops for the homeowner's approval; later steps build on approved versions and do not reopen settled decisions without asking. Costs are ranges to verify with local quotes, and permit and legal rules are questions to confirm with the local building authority, never stated as fact. If the homeowner asks to skip approvals, confirm once, then run the remaining steps and state the choice made at each skipped gate.

{{> guardrails/professional-limits}}
