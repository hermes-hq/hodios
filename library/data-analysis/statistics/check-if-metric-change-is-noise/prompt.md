---
schema: 1
id: check-if-metric-change-is-noise
kind: prompt
title: Check if a metric change is just noise
description: Judges whether this period's rise or drop in a KPI is beyond normal variation, using its history, count-based intervals or control limits, and gives a plain verdict with what to check next.
category: statistics
version: 1.0.0
status: incubating
stage: [operate, verify]
role: [data-analyst, product-manager, manager, business-analyst]
subject: [statistics]
inputs: [dataset, text]
output: [explanation, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [kpi-movement, signal-vs-noise, natural-variation, weekly-review, binomial-interval]
pairs_with:
  prompts: [build-control-chart, explain-metric-discrepancy, find-change-points-in-series]
  personas: [statistician]
args:
  - name: change
    description: "The metric, its value this period and the comparison value, and for rates the numerator and denominator (for example 124 sign-ups from 4,000 visitors)."
    type: text
    required: true
  - name: history
    description: "Past values of the same metric (ideally 12 or more periods), plus seasonality, holidays, releases or tracking changes you know about."
    type: text
output_contract:
  format: markdown
  sections: [Verdict, How it was judged, Numbers, What to check next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analyst who sits in weekly business reviews and stops teams from explaining noise. Every metric moves from period to period; the question is whether this movement is larger than its usual movement. The best reference is the metric's own history: the typical period-to-period range, or control limits from an individuals chart (mean ± 2.66 × the average moving range). For rates and counts, sampling noise alone sets a floor: a conversion rate from a few thousand visitors moves by several tenths of a percentage point by chance, and small counts (complaints going from 4 to 9) are almost always noise. Real data usually vary more than the binomial or Poisson formula predicts, so history beats formulas when both exist. Comparing with the same period last year handles seasonality, while comparing with last week does not. Percent changes on small bases look dramatic. The most common cause of a sudden real-looking jump is a tracking or definition change, not customer behaviour. A run of several periods on one side of the average can be a signal even when no single point is extreme.
</context>

<task>
Judge whether this change is a real signal or normal variation.

<change>
{{change}}
</change>

{{#history}}
<history>
{{history}}
</history>
{{/history}}

1. Restate the change as an absolute and a relative difference, with the base sizes.
2. If history is given, compute the mean and the typical variation (standard deviation, or average moving range and natural process limits), and place the current value: inside the limits, outside them, or part of a run of several periods on one side of the mean.
3. For rates and counts, compute the sampling noise: for a proportion, the expected count and standard error √(n·p·(1−p)) using the usual rate, and a z-score; for counts, compare two Poisson counts with an exact conditional test. Show the working. Note that real variation often exceeds this.
4. Account for seasonality, calendar effects and known events, and ask whether anything changed in tracking or definitions.
5. Give a verdict in one of three words (signal, noise, unclear) with one sentence on why, and the smallest next step: wait one more period, check tracking, segment the change, or investigate.
</task>

<constraints>
- Do not invent history, limits or seasonality; compute only from what is given.
- Never call a movement significant from the percent change alone.
- Do not give a firm verdict without history or a denominator; say "unclear" and ask for what is missing.
- Do not suggest a business cause for the change; point to what to check.
- Keep the verdict short enough to paste into a meeting note.
</constraints>

<output_format>
## Verdict
Signal, noise or unclear, in one sentence.

## How it was judged
Method used and why.

## Numbers
The working: differences, limits or z-score.

## What to check next
Up to three concrete checks.
</output_format>
