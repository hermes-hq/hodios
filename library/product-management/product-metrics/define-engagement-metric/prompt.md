---
schema: 1
id: define-engagement-metric
kind: prompt
title: Define an engagement metric
description: Defines an engagement metric that fits the product's natural usage rhythm - the qualifying action, the active-user window, stickiness ratios or usage-day histograms - and checks it against retention.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, data-analyst, founder, designer]
requires: [none]
inputs: [text, dataset]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [active-users, stickiness, usage-frequency, power-user-curve, meaningful-action, dau-mau]
pairs_with:
  prompts: [define-north-star-metric, define-activation-metric, check-kpi-for-perverse-incentives]
args:
  - name: product
    description: What the product does, who uses it, and how often a satisfied user would naturally need it (daily, a few times a week, monthly, seasonally).
    type: text
    required: true
  - name: data
    description: Optional. Current active-user figures, a distribution of active days per user, retention data, or the events you log.
    type: text
output_contract:
  format: markdown
  sections: [Natural rhythm, Qualifying action, Metric definition, Supporting views, Validation, Pitfalls, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You define how a product measures engagement. Three mistakes are common. Counting anyone who opened the app or loaded a page as "active", which rewards notifications and accidental visits. Using a window that does not fit the product: daily active users suits a messaging app, not a tax tool or a travel booking site, where monthly or even yearly use is healthy. And reading a ratio like DAU/MAU as a universal score instead of a sign of habit for daily products only. Good engagement metrics count a meaningful action that delivers value, use a window matching the natural rhythm, and are backed by a distribution (how many days or weeks per period each user is active, sometimes called a power-user curve) so you can see whether usage is deepening or just widening.

{{#data}}
<data>
{{data}}
</data>
{{/data}}
</context>

<task>
<product>
{{product}}
</product>

1. Natural rhythm: state the expected usage interval for a satisfied user and why. If segments differ (admins versus members, buyers versus sellers), say so.
2. Qualifying action: propose one to three candidate actions that represent getting value (not opening or logging in), and choose one with the reason.
3. Metric definition: exact formula with action, window (daily, weekly, monthly, or per cycle), unit (user, account) and exclusions (internal users, bots, automated actions).
4. Supporting views: a frequency distribution (users by number of active days or weeks in the period), and a stickiness ratio only if the rhythm is daily or weekly (for example WAU/MAU for a weekly product).
5. Validation: how to check the metric tracks value, such as whether users above a threshold retain or renew better, and whether it moved when known good or bad changes shipped.
6. Pitfalls: how this metric could be gamed or inflated (notifications, auto-generated actions) and a counter-metric.
</task>

<constraints>
- Do not default to DAU or MAU; justify the window from the rhythm.
- Do not invent figures; if data is given, use it and show calculations.
- If the product's use is unclear, ask what a satisfied user does and how often, and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Natural rhythm
Short paragraph.

## Qualifying action
Table: candidate | why it shows value | risk. Then the choice.

## Metric definition
Formula and exclusions.

## Supporting views
The distribution and any ratio, with how to read them.

## Validation
Checks to run.

## Pitfalls
Bullets with the counter-metric.

## Questions
What to confirm.
</output_format>
