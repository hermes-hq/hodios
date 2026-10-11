---
schema: 1
id: plan-churn-reduction
kind: prompt
title: Plan churn reduction
description: Plans how to reduce churn in a subscription product by splitting churn into its causes and ranking product, pricing, onboarding and payment levers by impact and effort.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder]
requires: [none]
inputs: [dataset, notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [churn, retention-plan, involuntary-churn, subscription, cohort-analysis]
pairs_with:
  prompts: [analyze-cancellation-feedback, design-churn-save-flow, define-activation-metric, design-customer-health-score]
args:
  - name: product
    description: What the product does, who pays, pricing and billing (monthly or annual), and the customer segments.
    type: text
    required: true
  - name: churn_data
    description: Churn rates by segment, plan, tenure or cohort, cancellation reasons, failed-payment numbers, usage before churn - whatever you have.
    type: text
    required: true
  - name: constraints
    description: Team capacity, things already tried, and any target. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Churn breakdown, Where churn concentrates, Root causes, Lever options, Ranked plan, Measurement, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retention lead for subscription products. "Churn" is several problems with different fixes. Involuntary churn from failed payments is often a large share and the cheapest to fix (retries, card updaters, reminders). Early churn in the first weeks or first renewal usually means users never reached value, so onboarding and activation are the lever. Later churn from engaged customers points to value decay, a competitor, a price change or a champion leaving. Some churn is unavoidable (the business closed, the project ended) and should be measured but not chased. Cancellation-survey reasons are a starting point, but people cite price when the real reason is low usage. Save offers at cancellation treat the symptom; most lasting gains come earlier in the lifecycle. Annual plans, pausing instead of cancelling, and downgrades rather than exits also shift churn.

<product>
{{product}}
</product>

<churn_data>
{{churn_data}}
</churn_data>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Break churn down: voluntary versus involuntary, and by tenure (first 30 to 90 days versus later), segment and plan, using the data given.
2. Show where churn concentrates and how much each slice contributes to total lost revenue.
3. Root causes for each major slice, linking cancellation reasons to usage evidence; mark hypotheses.
4. Lever options for each cause: payment recovery, onboarding and activation, value reinforcement, pricing and packaging (annual, pause, downgrade), customer success touchpoints, product gaps, save flow.
5. Ranked plan: order levers by expected revenue retained and effort, with the first three to start and an owner role for each.
6. Measurement: the metrics per lever (recovered payments, activation rate, cohort retention curves, net revenue retention) and how to test changes with control groups where possible.
7. What not to do: tactics that cut reported churn but harm customers or trust.
</task>

<constraints>
- Do not invent churn rates or revenue figures; where data is missing, list what to pull.
- Do not recommend making cancellation hard (hidden buttons, forced calls, obstruction); note that rules on cancellation vary by country and some require easy online cancellation.
- Separate correlation from cause in usage-churn links.
{{> output/uncertainty}}
</constraints>

<output_format>
## Churn breakdown
| Slice | Share of churn | Revenue lost | Evidence |
## Where churn concentrates
## Root causes
## Lever options
## Ranked plan
| Lever | Cause addressed | Expected impact | Effort | Owner role |
## Measurement
## What not to do
</output_format>
