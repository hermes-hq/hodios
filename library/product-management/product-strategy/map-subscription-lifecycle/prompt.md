---
schema: 1
id: map-subscription-lifecycle
kind: prompt
title: Map the subscription lifecycle
description: Maps a subscriber's journey from trial through activation, conversion, expansion and renewal, with the metric, triggers, touchpoints and risk signals per stage and the moments that move revenue.
category: product-strategy
version: 1.0.0
status: incubating
aliases: [monetize-subscription-lifecycle]
stage: [plan, design]
role: [product-manager, marketer, founder, business-analyst]
requires: [none]
inputs: [text, dataset]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [saas]
tags: [subscriptions, customer-lifecycle, trial-conversion, renewals, churn]
pairs_with:
  prompts: [define-activation-metric, design-free-tier, design-churn-save-flow, write-email-sequence, plan-expansion-revenue]
args:
  - name: product
    description: What the subscription is, who subscribes, plans and prices, trial or free offer, billing cycle, and how customers get value.
    type: text
    required: true
  - name: data
    description: Funnel and retention numbers you have - visitors, trial starts, activation, trial-to-paid, monthly churn, expansion, renewal rates - and which channels (email, in-app, sales) you can use.
    type: text
output_contract:
  format: markdown
  sections: [Lifecycle map, Highest-leverage moments, Cancellation and renewal, Measurement]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Subscription revenue is won or lost at a few moments: the first session where the user gets value, the end of the trial, the first bill, the moment a customer outgrows their plan, and renewal. A lifecycle map makes each stage explicit with what the customer is trying to do, how you know they did it, what you do when they stall, and the signals that they are about to leave.
{{#data}}
Data and channels: {{data}}
{{/data}}
</context>

<task>
Product:
<product>
{{product}}
</product>

1. Define the stages for this product: awareness, trial or free start, activation, conversion to paid, engagement, expansion, renewal, plus cancellation and win-back. Merge or skip stages that do not apply and say why.
2. For each stage give: what the customer is trying to do, the key action that marks success, the metric with a definition, automated triggers (events or inactivity), touchpoints by channel (in-app, email, sales or success), and risk signals that predict drop-off.
3. Mark the three highest-leverage moments for revenue, using the numbers where given (for example the biggest absolute drop between stages), and propose specific interventions and experiments for each.
4. Design the trial-to-paid and renewal flows in more detail: reminder timing, what the customer sees before being charged, payment failure recovery, and the cancellation flow with a reason survey and offers matched to reasons.
5. Say how to measure the whole map: a cohort view, the dashboard metrics and the owner of each stage.
</task>

<constraints>
- Use the customer's numbers when given and label any benchmark or estimate as an assumption, never as a fact about the market.
- No dark patterns: renewals and charges are announced clearly, cancelling is as easy as subscribing, and offers are honest.
- Keep touchpoints few and useful; each has a trigger and an exit condition.
{{> output/uncertainty}}
</constraints>

<output_format>
## Lifecycle map
A table: stage, customer goal, success action, metric, triggers, touchpoints, risk signals.
## Highest-leverage moments
Three moments, each with the evidence, interventions and an experiment.
## Cancellation and renewal
The trial-to-paid, renewal, payment-failure and cancellation flows as numbered steps.
## Measurement
Cohort view, dashboard metrics and owners.
</output_format>
