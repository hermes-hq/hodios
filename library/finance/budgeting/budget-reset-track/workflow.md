---
schema: 1
id: budget-reset-track
kind: workflow
title: Reset your budget from scratch
description: Takes someone whose money feels out of control from real spending data to a working budget, automated payday set-up and a first-month review, pausing for approval between steps.
category: budgeting
version: 1.0.0
status: incubating
stage: [discover, plan, build, review]
role: [individual, parent]
requires: [none]
inputs: [dataset, text]
output: [table, plan, checklist, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [money-reset, spending-audit, budget-setup, monthly-review]
pairs_with:
  prompts: [categorize-expenses, build-monthly-budget, set-up-money-accounts-system, review-budget-vs-actual, fix-failing-budget]
  personas: [personal-finance-coach]
args:
  - name: spending
    description: Two or three months of bank and card transactions (exported or pasted), or totals by category if that is all you have.
    type: text
    required: true
  - name: money_picture
    description: Take-home income and pay dates, debts with rates and minimum payments, savings, and who the budget covers.
    type: text
    required: true
  - name: country
    description: Country, so account types and free advice services can be framed correctly. Optional.
    type: string
steps:
  - {id: spending-picture, file: steps/01-spending-picture.md, stage: discover, gate: approve, artifact: "budget-reset/01-spending-picture.md"}
  - {id: new-budget, file: steps/02-new-budget.md, stage: plan, gate: approve, artifact: "budget-reset/02-new-budget.md"}
  - {id: payday-setup, file: steps/03-payday-setup.md, stage: build, gate: approve, artifact: "budget-reset/03-payday-setup.md"}
  - {id: first-month-review, file: steps/04-first-month-review.md, stage: review, gate: none, artifact: "budget-reset/04-first-month-review.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Resets this household's budget the way a good money adviser would: start from what is really being spent, build a realistic budget from it, make it run automatically on payday, then check it against the first month and adjust. Each step writes one artifact and stops for approval; later steps reuse the approved figures.

<spending>
{{spending}}
</spending>

<money_picture>
{{money_picture}}
</money_picture>
{{#country}}Country: {{country}}{{/country}}

{{> guardrails/professional-limits}}

Rules for every step:
- Use only figures the person gave or confirmed. Mark estimates and missing numbers as [X] with a question.
- Show the arithmetic so they can redo it.
- No shame and no moralising about choices; the aim is a budget that fits the life being lived.
- Do not name banks, apps or products; describe account types and features.
- Never ask for account numbers or log-in details; tell them to remove these from pasted data.
- If income does not cover essentials and minimum debt payments, say so in the step where it shows up and point to free, non-profit money or debt advice before continuing.
