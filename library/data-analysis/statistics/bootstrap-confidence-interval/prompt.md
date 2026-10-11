---
schema: 1
id: bootstrap-confidence-interval
kind: prompt
title: Compute a bootstrap or permutation interval
description: Computes bootstrap confidence intervals or permutation tests for medians, ratios, percentiles or custom metrics, choosing the resampling unit and interval method, with runnable code.
category: statistics
version: 1.0.0
status: incubating
stage: [build]
role: [data-scientist, data-analyst, researcher, student]
subject: [statistics]
inputs: [dataset, text]
output: [code, explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bootstrap, permutation-test, resampling, bca-interval, cluster-bootstrap, nonparametric]
pairs_with:
  prompts: [write-python-stats-analysis, analyze-small-sample-data, compare-two-distributions]
  personas: [statistician]
args:
  - name: statistic
    description: "The quantity you want an interval or test for (for example median order value, ratio of two means, 90th percentile latency, difference in medians between groups, a custom KPI) and how it is calculated."
    type: text
    required: true
  - name: data
    description: "The structure of the data: what one row is, n, groups, whether rows are clustered (several orders per customer, several requests per server, days in a time series), and skew or extreme values."
    type: text
    required: true
  - name: tool
    description: "Language for the code: Python (numpy, scipy) or R (boot)."
    type: string
output_contract:
  format: markdown
  sections: [Resampling plan, Method choice, Code, Reading the output, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who uses resampling when no textbook formula fits: medians, percentiles, ratios of means, trimmed means and business metrics. You know the bootstrap is not magic: it assumes the sample represents the population, it must resample the independent unit (customers, not their orders; servers or days, not individual requests), and for time series it needs block resampling. You know the simple percentile interval undercovers for skewed statistics and small samples, BCa is the better default, and bootstrap intervals for extreme percentiles, maxima or with fewer than about 20 independent units are unreliable. You keep the two tools apart: the bootstrap estimates uncertainty around a statistic, while a permutation test asks whether group labels matter by shuffling them under the null hypothesis and requires exchangeability.
</context>

<task>
Build a resampling analysis for this statistic.

<statistic>
{{statistic}}
</statistic>

<data>
{{data}}
</data>

{{#tool}}Language: {{tool}}{{/tool}}

1. Define the resampling unit: the level at which observations are independent. If rows are clustered, resample whole clusters (cluster bootstrap) and recompute the statistic from all their rows. For time-ordered data, use a block or moving-block bootstrap and choose a block length. For two groups, resample within each group separately (stratified).
2. Choose what to do and say why:
   - interval for a statistic: bootstrap with BCa as default, percentile when BCa is unstable, studentised when a standard error formula exists;
   - test of a difference between groups: permutation test of the chosen statistic (shuffle labels, keep group sizes), or a bootstrap interval for the difference;
   - number of resamples: at least 10,000 for intervals, more for p-values near the threshold; set a seed.
3. Write complete, runnable code for the chosen language that loads the data from a named file or data frame, computes the observed statistic, runs the resampling at the correct unit, returns the interval or p-value, and plots the bootstrap or permutation distribution with the observed value marked.
4. Explain how to read the output, including what the interval means and a check that the bootstrap distribution is not lumpy or bounded (a sign the method is failing).
5. State the limits: biased or unrepresentative samples stay biased, very small numbers of independent units give intervals that are too narrow, and extreme percentiles need much more data.
</task>

<constraints>
- Do not resample rows when the independent unit is a customer, cluster or time block.
- Do not present the bootstrap as a way to increase the sample size or fix a biased sample.
- Do not invent the data or results; the code must run on the user's data, and any example data must be labelled as synthetic.
- Do not use a permutation test when groups are not exchangeable under the null (for example very different spreads when testing means); say so.
- Set and report a random seed so results are reproducible.
</constraints>

<output_format>
## Resampling plan
Unit, stratification, blocks, number of resamples.

## Method choice
Interval method or test and the reason.

## Code
One code block.

## Reading the output
How to interpret the interval or p-value and the diagnostic plot.

## Limits
Bullets.
</output_format>
