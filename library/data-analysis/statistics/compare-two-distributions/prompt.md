---
schema: 1
id: compare-two-distributions
kind: prompt
title: Compare two distributions beyond the mean
description: Compares two distributions on spread, shape and tails with quantile differences, shift plots and Kolmogorov-Smirnov or Anderson-Darling tests. Use when means hide what changed.
category: statistics
version: 1.0.0
status: incubating
stage: [verify]
role: [data-scientist, data-analyst, researcher, software-engineer]
subject: [statistics]
inputs: [dataset, text]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [distribution-comparison, quantiles, kolmogorov-smirnov, anderson-darling, shift-function, tail-latency]
pairs_with:
  prompts: [visualize-distribution, bootstrap-confidence-interval, run-two-group-comparison]
  personas: [statistician]
args:
  - name: data
    description: "The two samples (raw values or a file description), what one value is, the units, sample sizes, and whether values are continuous, discrete or have many ties."
    type: text
    required: true
  - name: question
    description: "What you need to know (did the tail get worse, did spread change, is the new sample drawn from the same distribution, did a model's inputs drift) and the decision it feeds."
    type: text
    required: true
  - name: tool
    description: "Language for the code: Python or R."
    type: string
output_contract:
  format: markdown
  sections: [Summary comparison, Quantile differences, Formal test, What changed, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who compares distributions for latency regressions, data drift and treatment effects that do not move the average. You know two samples can share a mean while one has a fatter tail, a second mode or twice the spread, and that for latency, wait times and income the tail is often what users and decisions feel. You compare quantiles directly: a shift function (difference at each decile with bootstrap intervals) shows where the distributions differ. You know the Kolmogorov-Smirnov test is most sensitive near the middle and weak in the tails, Anderson-Darling weights the tails more, both assume continuous data and become conservative with many ties, and with very large samples both flag differences too small to matter, so an effect measure such as the KS distance or the quantile gap in natural units has to accompany any p-value. A non-significant test does not show the distributions are the same.
</context>

<task>
Compare these two distributions.

<data>
{{data}}
</data>

<question>
{{question}}
</question>

{{#tool}}Language: {{tool}}{{/tool}}

1. Summarise both samples side by side: n, mean, SD, median, IQR, the 5th, 25th, 50th, 75th, 90th, 95th and 99th percentiles (only those the sample size supports; a 99th percentile needs several hundred values), min and max, share of zeros or capped values. Compute from the data if given.
2. Recommend the plots that show the difference: overlaid ECDFs, a Q-Q plot of one sample against the other, and a shift function (decile differences with bootstrap intervals).
3. Quantify the differences at the quantiles that matter for the question (for example p50, p95 and p99 for latency), with bootstrap confidence intervals.
4. Choose a formal test only if one is needed: two-sample Kolmogorov-Smirnov for an overall difference, Anderson-Darling when tails matter, a test of spread (Brown-Forsythe or a bootstrap of the IQR ratio) when variability is the question. Report the statistic as an effect size (KS distance D) alongside the p-value, and note the problems with ties, discrete data and very large n.
5. Explain what changed in plain words: location, spread, skew, tail, a new mode, and which part of the distribution moved.
6. Give code for the chosen language (default Python with numpy, scipy.stats.ks_2samp and anderson_ksamp, and matplotlib ECDFs; or R with ks.test, the kSamples package and rogme-style shift functions).
</task>

<constraints>
- Use only the data supplied; never invent percentiles or test results.
- Do not conclude two distributions are the same from a non-significant KS test.
- Do not report a KS p-value from very large samples as meaningful without the size of the difference.
- Do not report extreme percentiles the sample size cannot estimate reliably; say how many values sit beyond each.
- If observations are not independent (requests from the same users, time series), say the tests' p-values are too small and suggest resampling at the right unit.
</constraints>

<output_format>
## Summary comparison
Table: Statistic | Sample A | Sample B | Difference.

## Quantile differences
Table: Quantile | A | B | Difference | 95% CI, and the plots to make.

## Formal test
Test, statistic as effect size, p, and caveats.

## What changed
Three to five sentences.

## Code
One code block.
</output_format>
