---
schema: 1
id: project-growth-to-milestone
kind: prompt
title: Project when a metric hits a target
description: Estimates when a growing metric (users, revenue, subscribers, followers) will reach a target by comparing linear, exponential and S-curve fits, and gives a date range, not one date.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, product-manager, data-analyst, marketer]
subject: [statistics]
inputs: [dataset, text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [growth-curves, time-to-target, compound-growth, saturation, run-rate]
pairs_with:
  prompts: [present-forecast-uncertainty, review-forecast-assumptions, forecast-subscription-revenue]
args:
  - name: history
    description: "The metric over time (at least 4-6 points, with dates), what it counts, and anything that changed its growth (launches, paid campaigns, price changes)."
    type: text
    required: true
  - name: target
    description: The value to reach, and why the date matters (funding milestone, break-even, capacity limit).
    type: string
    required: true
  - name: ceiling
    description: "A natural limit if one exists: market size, capacity, population of potential users. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Growth so far, Three projections, Which is most plausible, Date range, Signals to watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"When will we hit 50,000?" depends almost entirely on the growth shape assumed. Linear growth adds a steady amount per period: time = (target - current) / average addition. Exponential growth multiplies by a steady rate: time = ln(target / current) / ln(1 + rate). An S-curve (logistic) grows fast and then slows as it approaches a ceiling such as market size. Early-stage metrics often look exponential but are usually linear in absolute additions once paid or launch effects fade, and every real metric eventually bends toward a ceiling. The quick test experts use: if the absolute additions per period are roughly constant, growth is linear; if the percentage growth is roughly constant, it is exponential; if the percentage is falling steadily, an S-curve or damped growth fits better. The answer is a range across plausible shapes, plus the early signals that tell which one is happening.
</context>

<task>
Estimate when the metric reaches {{target}}.

<history>
{{history}}
</history>
{{#ceiling}}

<ceiling>
{{ceiling}}
</ceiling>
{{/ceiling}}

1. Tabulate the history with absolute additions and percentage growth per period. Note one-offs (a viral spike, a bulk import) and whether the recent trend differs from the early one.
2. Project three ways and show the arithmetic:
   - Linear: average recent addition, time to target.
   - Exponential: average compound rate (from first to last value, (last / first)^(1/periods) - 1), time = ln(target / current) / ln(1 + rate).
   - S-curve: if a ceiling is given or implied, a logistic fit or a damped-growth projection; if none is known, say what ceiling would make the target unreachable.
3. Judge plausibility with the additions-versus-percentages test from the context and any known changes ahead.
4. Give a date range: the most plausible projection as the central date, with early and late dates from the other shapes or from the spread of past growth rates.
5. If the target must be hit by a fixed date, compute the growth needed (per period, linear and compound) and compare it with what has been achieved.
6. List leading signals that would move the date earlier or later.
</task>

<constraints>
- Show formulas and numbers; label hand calculations as approximate.
- Never give a single exact date as a promise; give a range and the shape assumption behind each end.
- With fewer than four data points, say the shape cannot be told apart and give only a wide range.
- Do not invent a market size or ceiling; use one given or show the result for a few clearly labelled values.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The central date and the range in one or two sentences.

## Growth so far
Table: period | value | addition | percent growth.

## Three projections
Table: shape | rate used | periods to target | date.

## Which is most plausible
Reasoning from the data.

## Date range
Early, central and late dates with their assumptions; growth needed if there is a deadline.

## Signals to watch
Bullets.
</output_format>
