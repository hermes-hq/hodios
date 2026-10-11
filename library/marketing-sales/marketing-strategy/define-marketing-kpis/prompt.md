---
schema: 1
id: define-marketing-kpis
kind: prompt
title: Define marketing KPIs tied to revenue
description: Defines a small marketing KPI set tied to revenue, from a lead measure to funnel and channel metrics, with exact definitions, data sources, owners, targets and a review cadence.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, founder, manager]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [marketing-metrics, kpi-definitions, scorecard, funnel-metrics, review-cadence]
pairs_with:
  prompts: [build-kpi-tree, write-marketing-performance-report, build-reverse-funnel-model, analyze-marketing-attribution]
  personas: [fractional-cmo]
args:
  - name: business
    description: Business model (B2B sales-led, self-serve subscription, ecommerce, local service), what marketing is responsible for, and the company goal for the year.
    type: text
    required: true
  - name: current_measures
    description: What you track today, in which tools (analytics, CRM, ad platforms, spreadsheets), and the problems with it (for example "we report likes and traffic, the CEO asks about revenue").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [KPI summary, How marketing creates value here, Primary KPI, Funnel KPIs, Channel and efficiency metrics, Definitions and sources, Review cadence, Metrics to stop reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing leader who sets up measurement for teams that report activity instead of results. A good KPI set is small: one primary measure tied to revenue (marketing-sourced pipeline, new customers, or revenue from new customers depending on the model), a few funnel measures that lead to it, and efficiency measures (customer acquisition cost, payback, cost per opportunity). Each metric has one written definition, one source of truth, an owner and a target; otherwise two people report two different numbers. Vanity metrics (impressions, followers, total leads) are fine as diagnostics inside a channel but should not be headline KPIs. Lagging measures alone are useless for steering, so each must have a leading indicator that moves within weeks.
</context>

<task>
<business>
{{business}}
</business>

<current_measures>
{{current_measures}}
</current_measures>

1. If the business model or marketing's responsibility is unclear, ask up to three questions and stop.
2. How marketing creates value here: one paragraph naming the path from attention to revenue for this business model.
3. Primary KPI: one measure, why it fits, and its target logic (from the company goal).
4. Funnel KPIs: three to five stage measures with conversion rates between them, each with a leading indicator.
5. Channel and efficiency metrics: cost per acquisition or per opportunity, payback or ratio of customer value to acquisition cost where data allows, and one diagnostic per main channel.
6. Definitions and sources: exact formula, inclusion rules (for example which sources count as marketing-sourced, attribution rule used), source system, owner, refresh frequency.
7. Review cadence: weekly (leading indicators), monthly (funnel and spend), quarterly (primary KPI, efficiency, strategy), with the questions asked at each.
8. Metrics to stop reporting as headline numbers, and where they still belong.
</task>

<constraints>
- At most eight headline metrics in total.
- Do not invent targets; derive them from the user's goal or leave a placeholder with the formula.
- State the attribution rule used for "marketing-sourced" and its limits; do not imply it is precise.
{{> output/uncertainty}}
</constraints>

<output_format>
## KPI summary
A short list of the headline metrics.

## How marketing creates value here

## Primary KPI

## Funnel KPIs
A table: Stage metric | Leading indicator | Target logic.

## Channel and efficiency metrics

## Definitions and sources
A table: Metric | Formula | Includes or excludes | Source | Owner | Refresh.

## Review cadence
A table: Cadence | Metrics | Questions.

## Metrics to stop reporting
</output_format>
