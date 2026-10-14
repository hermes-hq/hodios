---
schema: 1
id: find-leading-indicators
kind: prompt
title: Find leading indicators for a product outcome
description: Finds early user or account behaviours that predict a lagging outcome like retention, conversion or revenue, checks the link holds across cohorts and segments, and picks which to manage week to week.
category: product-metrics
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [product-manager, data-analyst, data-scientist, founder]
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
depth: specific
tags: [leading-indicators, input-metrics, early-signals, predictive-behaviours, metric-tree, retention-prediction]
pairs_with:
  prompts: [define-activation-metric, challenge-feature-retention-correlation, define-north-star-metric, forecast-with-leading-indicators]
args:
  - name: outcome
    description: The lagging outcome (for example 90-day retention, renewal, paid conversion), how it is measured, and how long it takes to observe.
    type: text
    required: true
  - name: data
    description: Candidate early behaviours measured in a fixed early window (first 7 or 14 days, first month of a contract) and the outcome for past cohorts, by segment if available. Counts, rates or a table description.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Outcome and window, Candidate indicators, Stability check, Chosen indicators, How to manage them, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help product teams find leading indicators: behaviours measured early that predict an outcome observed much later, so the team can steer weekly instead of waiting a quarter. A useful indicator is measured in a fixed early window, predicts the outcome with real lift over the base rate, holds across cohorts and segments rather than in one lucky slice, is something the team can influence, and is not just a restatement of the outcome (for example "active in week 12" for 90-day retention). Predictive does not mean causal: many indicators mark motivated users rather than create them, so before managing a number the team should test whether moving it moves the outcome. Thresholds are best chosen where the outcome curve bends and where a meaningful share of users are on both sides. Novices pick the indicator with the biggest correlation without checking it is just tenure, plan size or channel in disguise.
</context>

<task>
<outcome>
{{outcome}}
</outcome>

<data>
{{data}}
</data>

1. Outcome and window: restate the outcome, the early observation window, and the cohorts used. Flag cohorts that have not yet matured.
2. Candidate indicators: for each behaviour, the share of users who did it, the outcome rate with and without it, and lift over base rate; suggest a threshold where the data shows a bend.
3. Stability check: does the link hold across signup cohorts and main segments (plan, channel, size)? Mark candidates that are confounded or that restate the outcome.
4. Chosen indicators: one to three indicators to manage, each with definition, threshold, window, current level and why it was chosen over others.
5. How to manage them: how to report weekly, what experiment would show that moving the indicator moves the outcome, and when to re-check the link (indicators decay as the product changes).
</task>

<constraints>
- Use only the numbers given; show arithmetic for lift.
- Do not claim causation; label chosen indicators as predictive until tested.
- Exclude indicators that are part of the outcome definition.
- If outcomes for non-performing users are missing, explain what cannot be computed and ask.
{{> output/uncertainty}}
</constraints>

<output_format>
## Outcome and window
Bullets.

## Candidate indicators
Table: behaviour | share doing it | outcome with | outcome without | lift.

## Stability check
Table: behaviour | holds across cohorts | holds across segments | issue.

## Chosen indicators
Numbered: definition | threshold | window | current level | reason.

## How to manage them
Bullets.

## Questions
What to confirm.
</output_format>
