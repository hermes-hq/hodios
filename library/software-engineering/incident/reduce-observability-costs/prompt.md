---
schema: 1
id: reduce-observability-costs
kind: prompt
title: Reduce logging, metrics and tracing costs
description: Finds where observability spend goes, such as noisy logs, high-cardinality metrics, unsampled traces and long retention, and plans cuts ranked by savings without losing what incidents need.
category: incident
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [sre, devops-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [dataset, config, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [telemetry-cost, cardinality, log-volume, trace-sampling, retention]
pairs_with:
  prompts: [instrument-service-observability, prune-noisy-alerts, write-observability-queries, design-service-dashboard]
  personas: [site-reliability-engineer]
args:
  - name: usage_data
    description: Where the volume and cost come from - billing breakdown, top log sources by volume, top metric names by series count, trace volume per service, current retention. Exports or rough figures both work.
    type: text
    required: true
  - name: setup
    description: The observability stack (vendor or self-hosted), how telemetry is collected (agents, OpenTelemetry collector, sidecars) and the pricing model if known (per GB ingested, per series, per host, per span).
    type: text
    required: true
  - name: target
    description: The savings goal and limits, for example "cut 40% by next quarter, must keep 30 days of audit logs".
    type: string
---
<context>
You help a team cut observability spend without going blind during the next incident. Costs concentrate in a few places: debug or per-request info logs left on in production, health-check and load-balancer access logs, duplicate shipping of the same log through two agents, metrics labelled with user ids, request paths or pod names that explode series counts, histograms with too many buckets, every trace kept at 100%, and hot retention far longer than anyone queries. The cost model matters: per-GB pricing rewards dropping and sampling at the collector, per-series pricing rewards label hygiene. Cuts that save the most often remove what responders need, so each cut should be checked against the alerts, dashboards and runbooks that depend on the data.

<usage_data>
{{usage_data}}
</usage_data>

<setup>
{{setup}}
</setup>

{{#target}}Target: {{target}}{{/target}}
</context>

<task>
1. Rank the cost drivers from the data. State the pricing unit each one is billed on, and where the data is too coarse to tell.
2. For logs: find high-volume, low-value sources (health checks, debug levels, repeated stack traces, verbose third-party libraries); propose dropping, sampling, lowering levels, converting repeated logs to metrics, or routing to cheaper storage tiers.
3. For metrics: find high-cardinality labels and unused series; propose dropping labels, aggregating at collection, reducing histogram buckets, or deleting metrics nothing reads. Explain how to check that a metric is unused (dashboards, alerts, recording rules, recent queries).
4. For traces: propose head or tail sampling, keeping all errors and slow requests, and dropping spans with no diagnostic value.
5. For retention: propose tiers (hot for recent days, cheaper or archived beyond), keeping required compliance or audit retention separate.
6. For every proposal, estimate the saving as a share of the relevant volume, name what could be lost, list which alerts, dashboards or runbooks depend on it, and rate the risk.
7. Order the work: quick, safe wins first, then changes that need code or team agreement. Add guardrails so costs do not creep back (volume budgets per team, cardinality limits, review of new metrics).
</task>

<constraints>
- Base estimates on the data given; label every estimate and show how you got it. Do not invent vendor prices.
- Never propose dropping audit, security or legally required logs; flag them to keep, and note the user must confirm retention requirements for their jurisdiction and contracts.
- Keep errors, and the signals behind SLO alerts, at full fidelity unless the user agrees otherwise.
- If the usage data is too thin to rank drivers, ask for the specific breakdowns needed rather than guessing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where the money goes
Table: driver | billed on | share of cost | confidence.
## Proposed cuts
Table: change | signal type | estimated saving | what could be lost | dependent alerts or dashboards | risk.
## Keep as is
Bullets with reasons.
## Order of work
Numbered phases.
## Guardrails
Bullets.
## Data still needed
Bullets.
</output_format>
