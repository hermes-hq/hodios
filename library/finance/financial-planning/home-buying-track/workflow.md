---
schema: 1
id: home-buying-track
kind: workflow
title: First home buying track
description: Takes a first-time buyer from affordability to a deposit plan, mortgage preparation, offer strategy and a closing checklist, pausing for review at each step.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan, review, verify]
role: [individual, parent]
requires: [none]
inputs: [text, document]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
subject: [real-estate]
tags: [first-time-buyer, home-buying, mortgage-affordability, house-deposit, making-an-offer]
pairs_with:
  prompts: [estimate-home-buying-costs, compare-rent-vs-buy, prepare-mortgage-application, compare-mortgage-options, improve-credit-score]
  personas: [personal-finance-coach]
args:
  - name: income_and_savings
    description: Household take-home and gross income, regular spending, savings for the deposit and where they are held, debts with payments, credit history issues you know of, and who is buying (alone, with a partner, with family help).
    type: text
    required: true
  - name: location
    description: Country and the area or city where you want to buy, and the kind of home you have in mind (flat, house, new build) and price range if you have one.
    type: string
    required: true
  - name: timeline
    description: When you would like to buy, and anything that fixes the date (a lease ending, a job move, a school start). Optional.
    type: string
steps:
  - {id: affordability, file: steps/01-affordability.md, stage: plan, gate: approve, artifact: "home-buying/01-affordability.md"}
  - {id: deposit-plan, file: steps/02-deposit-plan.md, stage: plan, gate: approve, artifact: "home-buying/02-deposit-plan.md"}
  - {id: mortgage-prep, file: steps/03-mortgage-prep.md, stage: plan, gate: approve, artifact: "home-buying/03-mortgage-prep.md"}
  - {id: offer-strategy, file: steps/04-offer-strategy.md, stage: review, gate: approve, artifact: "home-buying/04-offer-strategy.md"}
  - {id: closing-checklist, file: steps/05-closing-checklist.md, stage: verify, gate: none, artifact: "home-buying/05-closing-checklist.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a first-time buyer the way a careful, independent buyer's adviser would: affordability on their own budget, a deposit and cash plan, mortgage readiness, offers with clear limits, and a calm completion. Each step writes one artifact and stops for review; later steps reuse approved figures.

<income_and_savings>
{{income_and_savings}}
</income_and_savings>

Location: {{location}}
{{#timeline}}Timeline: {{timeline}}{{/timeline}}

{{> guardrails/professional-limits}}

Rules for every step:
- Use only figures the buyer gave or confirmed; mark estimates as estimates and gaps as [X] with a question. Show the arithmetic.
- Describe options and trade-offs. Do not recommend named lenders, brokers, agents, lawyers or schemes; flag named schemes "verify eligibility".
- Mark country-specific taxes, fees and legal steps "verify locally" unless confident, and keep a running list of questions per professional (lender or broker, conveyancer or notary, surveyor).
- Judge affordability on the buyer's own budget with a rate-rise stress test, not the lender's maximum. If the purchase is not realistic yet, say so and turn the rest of the track into the plan to get there.
- Never help misstate income, debts or the deposit source to a lender; that is mortgage fraud.
