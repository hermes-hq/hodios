---
schema: 1
id: analyze-net-revenue-retention
kind: prompt
title: Analyse net revenue retention
description: Analyses net and gross revenue retention by cohort and segment, splitting expansion, contraction and churn to show where revenue is gained or lost and which segments carry the number.
category: product-metrics
version: 1.0.0
status: incubating
stage: [review, learn]
role: [product-manager, founder, financial-analyst, data-analyst]
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
tags: [net-revenue-retention, gross-revenue-retention, expansion-revenue, contraction, revenue-cohorts, account-revenue]
pairs_with:
  prompts: [explain-saas-metrics, plan-expansion-revenue, find-churn-drivers, build-growth-accounting]
args:
  - name: data
    description: Recurring revenue per customer at a start date and twelve months later (or by month), with segment fields such as plan, size band, region, signup year, and how churn, downgrades and price rises are recorded.
    type: text
    required: true
  - name: question
    description: What you want to know, for example "why did NRR fall from 112% to 101%" or "which segment should we invest in". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Definitions used, NRR and GRR overall, Bridge from start to end, By segment and cohort, What is driving it, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a SaaS revenue analyst. Net revenue retention takes the customers who existed at the start of a period and compares their recurring revenue at the end, including expansion, contraction and churn but excluding new customers. Gross revenue retention is the same without expansion, capped at 100%, so it isolates losses. A healthy-looking NRR can hide poor GRR when a few large accounts expand a lot, and a blended figure often hides that one segment (enterprise) carries the number while another (small business) leaks. Methods differ: trailing twelve-month cohort NRR, averages of monthly rates compounded, and logo-weighted versus revenue-weighted figures give different results, so the method must be stated. Price rises count as expansion and can mask product weakness. Currency moves, one-off fees and usage spikes should be separated from recurring revenue.
</context>

<task>
<data>
{{data}}
</data>
{{#question}}<question>{{question}}</question>{{/question}}

1. Definitions used: the method (start cohort and twelve-month comparison by default), what counts as recurring revenue, how price rises, currency and usage are handled.
2. NRR and GRR overall with the arithmetic.
3. Bridge from start to end: starting revenue, plus expansion, minus contraction, minus churn, equals ending revenue, with each as a share of start; split expansion into price rise versus seats or upgrades if the data allows.
4. By segment and cohort: NRR and GRR per segment and per signup year, and how much of total expansion and churn each segment contributes. Note small segments where one account swings the result.
5. What is driving it: concentration (top ten accounts' share of expansion), whether retention depends on price rises, and which segment explains a change if one is asked about. Answer the question if given.
</task>

<constraints>
- Do not include new customers in NRR.
- Show the method; if the user's figures mix methods, say so before comparing.
- Do not quote industry NRR benchmarks as targets; compare segments and periods.
- If customer-level data is missing and only totals are given, explain what cannot be separated.
{{> output/uncertainty}}
</constraints>

<output_format>
## Definitions used
Bullets.

## NRR and GRR overall
Two figures with arithmetic.

## Bridge from start to end
Table: component | amount | share of start.

## By segment and cohort
Table: segment | start revenue | NRR | GRR | share of churn | share of expansion.

## What is driving it
Three to six bullets.

## Questions
What to confirm.
</output_format>
