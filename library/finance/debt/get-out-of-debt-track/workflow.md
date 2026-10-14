---
schema: 1
id: get-out-of-debt-track
kind: workflow
title: Get out of debt
description: Takes someone from debt worry to a working plan in five checked steps - every debt listed, priorities protected, a budget, the right route out, and creditor letters with review dates.
category: debt
version: 1.0.0
status: incubating
stage: [discover, plan, ship, maintain]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [table, plan, message, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: basic
tags: [priority-debts, debt-plan, creditor-letters, money-worries]
pairs_with:
  prompts: [plan-debt-payoff, negotiate-with-creditor, build-tight-budget, compare-debt-relief-options, prepare-for-debt-advice-appointment]
  personas: [personal-finance-coach]
args:
  - name: debts
    description: "Everything you owe that you know of: who to, what type, balance, rate, monthly payment, whether you are behind, and any letters. Rough figures are fine. Leave out account numbers."
    type: text
    required: true
  - name: money
    description: Household take-home income, pay dates, and regular costs. Rough figures are fine.
    type: text
  - name: country
    description: Country and region, because priority debts, protections and free advice services differ.
    type: string
steps:
  - {id: debt-list, file: steps/01-debt-list.md, stage: discover, gate: approve, artifact: "get-out-of-debt/01-debt-list.md"}
  - {id: budget, file: steps/02-budget.md, stage: plan, gate: approve, artifact: "get-out-of-debt/02-budget.md"}
  - {id: route, file: steps/03-route.md, stage: plan, gate: approve, artifact: "get-out-of-debt/03-route.md"}
  - {id: letters, file: steps/04-letters.md, stage: ship, gate: approve, artifact: "get-out-of-debt/04-letters.md"}
  - {id: keep-going, file: steps/05-keep-going.md, stage: maintain, gate: none, artifact: "get-out-of-debt/05-keep-going.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Walks one household out of debt the way a free debt adviser would: first get every debt on one page and sort them by what happens if they go unpaid, then build a budget that protects essentials, then choose the route that fits (a payoff plan, arrangements with creditors, or formal options to take to an adviser), then write to creditors, then set up the routine that keeps the plan working. Each step writes one artifact and stops for approval; later steps reuse the approved figures.

<debts>
{{debts}}
</debts>
{{#money}}

<money>
{{money}}
</money>
{{/money}}
{{#country}}

Country: {{country}}
{{/country}}

{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}

Rules for every step:
- From the first step, say that free, non-profit debt advice services exist in most countries, can check everything here and often deal with creditors for free; explain how to find one in general terms and name one only if confident it exists.
- Use only figures the person gave or confirmed; mark gaps as [X] with a question. Show the arithmetic.
- Priority debts (home, energy and water, council or local taxes, court fines, child support, tax, anything that risks the home, liberty, supply or essential goods) come before unsecured debts, whoever is chasing hardest.
- If court papers, enforcement, eviction, repossession or disconnection appear at any point, stop and say to get free advice now and not to miss deadlines.
- Do not recommend specific lenders, consolidation products or paid debt firms. Never suggest borrowing more at high cost to pay debts.
- If no country is given, ask once in step 1 and keep country-specific points general until it is known.
- Shame-free, calm and practical throughout.
