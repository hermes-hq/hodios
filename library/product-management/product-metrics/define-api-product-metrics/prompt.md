---
schema: 1
id: define-api-product-metrics
kind: prompt
title: Define API product metrics
description: Defines metrics for an API or developer product - time to first call, active apps, per-customer error rates, integration depth, production adoption and expansion - with data sources.
category: product-metrics
version: 1.0.0
status: incubating
stage: [design, plan]
role: [product-manager, developer-advocate, founder, data-analyst]
requires: [none]
inputs: [text, spec]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [api-products, developer-experience, time-to-first-call, api-adoption, usage-metrics, developer-funnel]
pairs_with:
  prompts: [define-north-star-metric, define-activation-metric, define-guardrail-metrics, measure-time-to-value]
args:
  - name: product
    description: What the API or SDK does, who integrates it (individual developers, companies), pricing model (free tier, usage-based, contracts), and the main endpoints or use cases.
    type: text
    required: true
  - name: data_sources
    description: What is available - API gateway logs, key and account tables, docs analytics, SDK telemetry, billing, support tickets. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Developer funnel, Metric set, Health and quality, Account view, Data sources and caveats, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You define metrics for API and developer products. Their funnel differs from app funnels: sign up, get a key, make a first successful call (time to first call or "hello world"), build an integration in a test environment, go live in production, then grow usage. Value is reached when calls happen in production for a real use case, not when a key is created; many keys are created, tested once and abandoned. Raw call volume misleads because one customer's batch job or retry storm can dominate it; distinct active apps or accounts with production traffic, and the breadth of endpoints used, describe adoption better. Errors must be split into the customer's errors (4xx, often docs or onboarding problems) and the provider's (5xx, timeouts), and measured per customer, since an average success rate hides a single customer having a bad week. Test and production keys, internal traffic and load tests must be separated.
</context>

<task>
<product>
{{product}}
</product>
{{#data_sources}}<data_sources>{{data_sources}}</data_sources>{{/data_sources}}

1. Developer funnel: stages from signup to production use and expansion, with each stage's definition and the conversion and median time between stages, including time to first successful call.
2. Metric set: a primary adoption metric (for example weekly accounts with production calls on a meaningful endpoint) and supporting metrics: active keys or apps, endpoints used per account, call volume by account percentile, retention of production accounts, expansion of usage or spend.
3. Health and quality: success rate split by client and server errors, latency percentiles, both measured per customer as well as overall, and the share of customers who had a bad day (above an error or latency threshold).
4. Account view: how keys, apps and users roll up to accounts, and which metrics are reported per account for sales and success teams.
5. Data sources and caveats: where each metric comes from, how to exclude test keys and internal traffic, and limits such as SDK telemetry consent.
</task>

<constraints>
- Do not use total call volume as the headline adoption metric.
- Separate sandbox or test traffic from production in every definition.
- Do not invent baselines; mark targets to be set from data.
- If production and test traffic cannot be told apart, say so and suggest how to tag keys.
</constraints>

<output_format>
## Developer funnel
Table: stage | definition | metric.

## Metric set
Table: metric | definition | why it matters | primary or supporting.

## Health and quality
Table: metric | definition | per customer or overall.

## Account view
Bullets.

## Data sources and caveats
Bullets.

## Questions
What to confirm.
</output_format>
