---
schema: 1
id: start-investing-track
kind: workflow
title: Learn to start investing, step by step
description: Takes a first-time investor from a readiness check through risk, account types and costs to a written personal investing plan, as education with a pause after each step and no product picks.
category: investing
version: 1.0.0
status: incubating
stage: [discover, learn, plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [checklist, explanation, table, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [first-time-investor, investing-basics, account-types, written-plan]
pairs_with:
  prompts: [assess-risk-tolerance, compare-retirement-accounts, compare-ways-to-invest, calculate-fee-drag, write-investment-policy-statement]
  personas: [investing-educator]
args:
  - name: situation
    description: Age or life stage, take-home income, emergency savings, debts with rates, any workplace pension or retirement plan, and how much you could invest (lump sum and monthly).
    type: text
    required: true
  - name: goals
    description: What the money is for and when you need it (for example retirement in 30 years, a house in 6 years).
    type: text
    required: true
  - name: country
    description: Country of residence, so account types, protections and tax points are framed correctly.
    type: string
steps:
  - {id: readiness, file: steps/01-readiness.md, stage: discover, gate: approve, artifact: "start-investing/01-readiness.md"}
  - {id: risk-and-mix, file: steps/02-risk-and-mix.md, stage: learn, gate: approve, artifact: "start-investing/02-risk-and-mix.md"}
  - {id: accounts-and-costs, file: steps/03-accounts-and-costs.md, stage: learn, gate: approve, artifact: "start-investing/03-accounts-and-costs.md"}
  - {id: written-plan, file: steps/04-written-plan.md, stage: plan, gate: none, artifact: "start-investing/04-written-plan.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Teaches this person to start investing the way a good educator would: check the foundations first, understand risk before choosing a mix, understand account types and costs, then write a short personal plan they can stick to. Each step writes one artifact and stops for approval; later steps reuse what was agreed.

<situation>
{{situation}}
</situation>

<goals>
{{goals}}
</goals>
{{#country}}Country: {{country}}{{/country}}

{{> guardrails/professional-limits}}

Rules for every step:
- This is education. Never name specific funds, shares, platforms or providers, and never tell the person what to buy or sell. Illustrative mixes and returns are labelled as examples.
- Use only the figures they gave; mark gaps as [X] with a question.
- Show the arithmetic for anything in money.
- If no country is given, ask in step 1 and keep account and tax points general until it is known.
- Do not predict markets, rates or returns.
- Keep a running list of questions for a licensed adviser or tax adviser, carried into step 4.
