---
schema: 1
id: analyze-usage-distribution-for-pricing
kind: prompt
title: Set plan limits from usage data
description: Analyses how usage is distributed across customers to set plan limits and value-metric thresholds, showing who each limit affects, the revenue at stake and the risks of each cut-off.
category: product-metrics
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, founder, data-analyst, business-analyst]
subject: [saas]
requires: [none]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [plan-limits, value-metric, usage-based-pricing, packaging, percentiles, free-tier-limits]
pairs_with:
  prompts: [design-pricing, design-free-tier, analyze-free-to-paid-conversion, design-pricing-experiment]
args:
  - name: pricing
    description: Current plans, prices and limits, and the change being considered (new limit, new value metric, new tier).
    type: text
    required: true
  - name: usage
    description: Usage per customer for the candidate metric (seats, projects, API calls, storage, contacts) as percentiles or a table description, by plan and segment, with revenue per customer if available and how usage grows with tenure.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Value metric check, Usage distribution, Limit options, Who each option affects, Recommendation, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a pricing analyst who sets packaging from data. Usage almost always has a long tail: the median customer uses little and the top few percent use a large share, so a limit set at the mean hits far more people than expected. A good value metric grows with the value the customer gets, is easy to predict, and is hard to game; seats work when value scales with people, usage metrics when value scales with volume. A free or entry-tier limit should sit just above where most new users reach value, so they experience the product, and below where a team that relies on it operates. Limits must account for growth: customers grow into limits over months, so today's distribution understates future impact. Existing customers hit by a new limit react strongly, so grandfathering and notice periods are decisions, not afterthoughts.
</context>

<task>
<pricing>
{{pricing}}
</pricing>

<usage>
{{usage}}
</usage>

1. Value metric check: does the candidate metric track value, is it predictable for buyers, can it be gamed (sharing logins, batching calls)? Suggest an alternative if it fails.
2. Usage distribution: percentiles (median, 75th, 90th, 95th, 99th) per plan and segment, the share of total usage from the top decile, and how usage grows over the first year.
3. Limit options: three candidate thresholds (for example at the 70th, 85th and 95th percentile of the relevant plan), each with the share of customers above it today and after twelve months of typical growth.
4. Who each option affects: customer count, their revenue, segment mix, and whether they are likely to upgrade (they rely on the product) or leave (marginal users). Use the data; mark assumptions.
5. Recommendation: the option to take, with grandfathering, notice period and how to measure the result (upgrade rate, churn of affected customers, support contacts), and a small test or staged rollout if feasible.
</task>

<constraints>
- Work from percentiles, not averages; if only averages are given, ask for the distribution.
- Do not invent price elasticities or upgrade rates; state assumptions as ranges and label them.
- Flag any limit that would push existing customers over without notice.
- Do not recommend limits designed to trap users (hidden overages, surprise bills).
{{> output/uncertainty}}
</constraints>

<output_format>
## Value metric check
Short paragraph.

## Usage distribution
Table: plan | p50 | p75 | p90 | p95 | p99 | top decile share.

## Limit options
Table: option | threshold | share above now | share above in 12 months.

## Who each option affects
Table: option | customers | revenue | likely upgrade | likely churn | notes.

## Recommendation
Bullets: option, rollout, measurement.

## Questions
What to confirm.
</output_format>
