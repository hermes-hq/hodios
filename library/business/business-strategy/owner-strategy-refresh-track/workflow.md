---
schema: 1
id: owner-strategy-refresh-track
kind: workflow
title: Refresh the owner's strategy
description: Refreshes a small business strategy once a year in gated steps - review the year, generate options, choose priorities, plan and budget, then brief the staff.
category: business-strategy
version: 1.0.0
status: incubating
stage: [review, discover, plan, ship]
role: [founder, executive, operations-manager]
requires: [none]
inputs: [text, dataset, notes]
output: [report, plan, table, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [annual-review, owner-led, priorities, strategy-budget, staff-briefing, year-plan]
pairs_with:
  prompts: [run-yearly-company-health-check, write-one-page-strategy-for-owners, build-annual-operating-plan, map-growth-options, run-swot-analysis, write-internal-announcement]
  personas: [small-business-advisor, management-consultant]
args:
  - name: business
    description: Your business - what you sell, to whom, size, team and partners, how the year went, last year's plan or goals if any, and what you want from the next year (growth, more profit, fewer hours, preparing to sell).
    type: text
    required: true
  - name: figures
    description: This year's and last year's key figures - sales, gross margin, profit, cash, customer numbers, staff - and anything you track. Optional; step 1 asks for what it needs.
    type: text
steps:
  - {id: review, file: steps/01-review-year.md, stage: review, gate: approve, artifact: "strategy/01-year-review.md"}
  - {id: options, file: steps/02-options.md, stage: discover, gate: approve, artifact: "strategy/02-options.md"}
  - {id: priorities, file: steps/03-priorities.md, stage: plan, gate: approve, artifact: "strategy/03-priorities.md"}
  - {id: plan-budget, file: steps/04-plan-and-budget.md, stage: plan, gate: approve, artifact: "strategy/04-plan-and-budget.md"}
  - {id: share, file: steps/05-share-with-staff.md, stage: ship, gate: none, artifact: "strategy/05-staff-briefing.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs the yearly strategy refresh an owner-managed business needs but rarely makes time for: look honestly at the year, open up the options, choose a few priorities, turn them into a plan and budget, and tell the team. Each step writes one artifact and stops for the owner's approval; later steps build only on what was approved.

<business>
{{business}}
</business>
{{#figures}}

<figures>
{{figures}}
</figures>
{{/figures}}

Rules for every step:
- Use only facts and figures the owner gave or confirmed. Ask for missing essentials and mark gaps as [X]; never invent figures, customers or competitors.
- Show arithmetic so the owner can check it. Label rules of thumb as guides that vary by sector.
- Keep to choices: no more than three priorities, and every priority has an owner, a measure and a date.
- Respect the owner's goals, including staying small or working fewer hours.
- Tax, financing, legal and employment matters are questions for an accountant, lender or solicitor, never stated as fact.
- Plain words, short tables; each artifact ends with open questions.
