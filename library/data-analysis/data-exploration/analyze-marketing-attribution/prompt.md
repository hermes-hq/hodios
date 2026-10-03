---
schema: 1
id: analyze-marketing-attribution
kind: prompt
title: Compare marketing attribution models
description: Compares last-click, first-click, linear, position-based and data-driven attribution on supplied channel data and explains what each implies for budget. Use before moving marketing spend.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [marketer, data-analyst, founder]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [attribution, marketing-mix, incrementality, roas, customer-journey]
pairs_with:
  prompts: [analyze-web-analytics, estimate-causal-effect]
  personas: [data-analyst]
args:
  - name: channel_data
    description: The channel data - ideally conversion paths (ordered touchpoints per converting user or journey, with timestamps), plus spend by channel; or aggregated conversions by channel per platform if that is all you have. Say where it comes from and the lookback window.
    type: text
    required: true
  - name: conversion_definition
    description: What counts as a conversion and its value (for example "first paid order, value = order revenue net of VAT"). Leave empty if the data defines it.
    type: string
output_contract:
  format: markdown
  sections: [Answer, Data check, Credit by model, Cost per conversion by model, What each model implies, Budget implications, Tests to run, Code]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing analyst who has watched budgets move on the strength of one attribution report. Every attribution model is a rule for splitting credit among touchpoints; none measures what would have happened without a channel. Comparing several models side by side shows which channels open journeys, which close them, and where the conclusion depends on the rule chosen. Only an incrementality test answers how much a channel causes.
</context>

<task>
Compare attribution models on the data below.

<channel_data>
{{channel_data}}
</channel_data>

<conversion_definition>
{{conversion_definition}}
</conversion_definition>

1. Check the data: is it path-level (touchpoints per journey) or aggregated per channel? Paths are needed for first-click, linear, position-based and data-driven models. If only platform-reported conversions per channel are available, say so, show that the platforms' totals add up to more than the actual conversions when they do (each platform claims credit for the same sale), and limit the analysis to what aggregates can support.
2. Define the conversion, its value, the lookback window, and how direct visits, brand search, email to existing customers and view-through impressions are treated. Name the gaps that bias the result: consent and cookie loss, cross-device journeys, offline touchpoints, and channels that are not tracked at all (TV, podcasts, word of mouth).
3. Compute credit per channel under: last click (and last non-direct click), first click, linear, position-based (40% first, 40% last, 20% spread across the middle; single-touch journeys give 100% to that touch), and a data-driven view (a Markov-chain removal effect or Shapley values) when there are enough paths; with few paths, explain that data-driven estimates are unstable and skip or caveat them.
4. Put the models side by side: conversions and value credited per channel, share of total, and cost per conversion and return on ad spend where spend is supplied.
5. Interpret: channels that gain under first click are introducers; channels that gain under last click are closers or capture demand that already exists (brand search, retargeting, email). Name where all models agree, which is the safest conclusion, and where they disagree, which is where a budget decision rests on an assumption.
6. Translate into budget implications as ranges and conditions ("if brand search mostly captures existing demand, cutting it costs fewer conversions than last click suggests"), not as a confident reallocation.
7. Propose the incrementality tests that would settle the biggest disagreement: geo holdouts, platform conversion-lift studies, a timed pause of brand search in some regions, or a marketing mix model when spend history is long enough.
</task>

<constraints>
- Compute only from the data supplied; show the credit tables so they can be checked, and make each model's total equal the actual number of conversions.
- If the data is a sample or a description, give code (Python with pandas) that computes every model from a path table, and do not fill the tables with invented numbers.
- Never call an attribution model's output the causal effect of a channel.
- Keep spend and conversion units and periods aligned; flag when the spend period does not match the conversion period.
</constraints>

<output_format>
## Answer
Three sentences: what the models agree on, where they disagree, and the one test that would settle it.

## Data check
Bullets: data shape, conversion definition, lookback, known gaps.

## Credit by model
Table: Channel | Last click | Last non-direct | First click | Linear | Position-based | Data-driven, as conversions with share in brackets.

## Cost per conversion by model
Same layout with cost per conversion or ROAS, if spend was supplied.

## What each model implies
One or two sentences per model about the story it tells.

## Budget implications
Conditional statements with ranges.

## Tests to run
Up to three tests: design, duration, what result would change the budget.

## Code
pandas code that computes every model from a path table.
</output_format>
