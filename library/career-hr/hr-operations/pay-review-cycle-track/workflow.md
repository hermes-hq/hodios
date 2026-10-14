---
schema: 1
id: pay-review-cycle-track
kind: workflow
title: Run the annual pay review cycle
description: Runs a company's annual pay review in gated steps - budget and principles, increase guidelines, manager proposals and calibration, an equity check and approval, then letters and communication.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan, review, ship]
role: [operations-manager, executive, founder]
requires: [none]
inputs: [dataset, text]
output: [plan, table, report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [pay-review, merit-cycle, compensation-planning, calibration, salary-increases]
pairs_with:
  prompts: [build-merit-increase-matrix, allocate-merit-increases, analyze-pay-equity, write-pay-review-letters, design-salary-bands]
  personas: [hr-business-partner]
args:
  - name: company
    description: Headcount, countries, pay structure (bands or not), the rating scale, review effective date, who approves pay, and any collective agreements.
    type: text
    required: true
  - name: inputs
    description: What you have for this cycle - budget or the range leadership is considering, pseudonymised pay data with band midpoints and ratings, last year's outcomes and known problems.
    type: text
    required: true
steps:
  - {id: budget, file: steps/01-budget-and-principles.md, stage: plan, gate: approve, artifact: "pay-review/01-budget-and-principles.md"}
  - {id: guidelines, file: steps/02-guidelines.md, stage: plan, gate: approve, artifact: "pay-review/02-guidelines.md"}
  - {id: calibration, file: steps/03-proposals-and-calibration.md, stage: review, gate: approve, artifact: "pay-review/03-calibration.md"}
  - {id: approval, file: steps/04-equity-check-and-approval.md, stage: review, gate: approve, artifact: "pay-review/04-approval-pack.md"}
  - {id: communicate, file: steps/05-communicate.md, stage: ship, gate: none, artifact: "pay-review/05-communication.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes HR through one annual pay review the way an experienced reward lead runs it: agree what the money is for, turn that into guidelines managers can use, collect and calibrate proposals, test the result for unexplained gaps before anyone signs off, then tell people well. Each step writes one artifact and stops for approval, because a budget or calibration decision changes everything after it.

<company>
{{company}}
</company>

<inputs>
{{inputs}}
</inputs>

Rules for every step:
- Use pseudonymised data only (IDs, not names). Report no group breakdown below five people.
- Show the working for every cost and percentage; never state a total you did not compute.
- Do not invent market movement, budgets or band values; mark gaps [X] and ask.
- Points that depend on employment law, collective agreements, minimum wage changes or tax go to a running list for an employment lawyer or adviser, marked "confirm locally".
- End each artifact with open decisions and what to bring to the next step.
