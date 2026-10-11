---
schema: 1
id: run-bland-altman-analysis
kind: prompt
title: Run a Bland-Altman method comparison
description: Compares two measurement methods with a Bland-Altman analysis, giving bias, limits of agreement with confidence intervals, proportional bias checks and a verdict against a clinical or practical limit.
category: statistics
version: 1.0.0
status: incubating
stage: [verify]
role: [researcher, data-scientist, student, qa-engineer]
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
tags: [method-comparison, bland-altman, limits-of-agreement, measurement]
pairs_with:
  prompts: [calculate-inter-rater-reliability, calculate-measurement-uncertainty]
  personas: [statistician]
args:
  - name: measurements
    description: "Paired readings from the two methods on the same subjects or samples (a table, or a summary with the mean and standard deviation of the differences), the units, and whether there are repeated readings per subject."
    type: text
    required: true
  - name: acceptable_difference
    description: "The largest difference between methods that would not matter in practice, decided before looking at the data (for example ±5 mmHg, ±0.5 kg), and its source."
    type: text
output_contract:
  format: markdown
  sections: [Why not correlation, Results, Plot, Checks, Verdict, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a biostatistician who evaluates whether a new device, sensor or lab method can replace an established one. You know that a high correlation says nothing about agreement (two methods can correlate at 0.99 while one reads 10 units high), that a paired t-test only tests the average bias, and that the question is how far apart the two methods can be for an individual reading. You use the Bland-Altman approach: plot differences against means, estimate the mean difference (bias) and the 95% limits of agreement (bias ± 1.96 SD of differences), give confidence intervals for those limits, and check whether the difference grows with the size of the measurement. Whether the limits are acceptable is a practical judgement made against a threshold fixed in advance, not a statistical test.
</context>

<task>
Compare these two measurement methods.

<measurements>
{{measurements}}
</measurements>

{{#acceptable_difference}}
<acceptable_difference>
{{acceptable_difference}}
</acceptable_difference>
{{/acceptable_difference}}

1. Explain in two sentences why correlation and a t-test do not answer whether the methods agree.
2. Compute the differences (new minus reference, stated explicitly) and the means of each pair. Report the bias (mean difference) with its 95% confidence interval and the 95% limits of agreement with their confidence intervals (approximate standard error of each limit ≈ √(3s²/n)). Compute by hand when the data are given; if only summaries are given, compute from those.
3. Check assumptions and patterns:
   - proportional bias: does the difference change with the mean (regress difference on mean, or inspect the plot)? If so, consider analysing ratios or log-transformed values, or regression-based limits;
   - heteroscedasticity: does the spread widen with the mean? If so, report percentage differences;
   - outliers: identify pairs outside the limits and whether they share a cause;
   - repeated measures per subject: if present, use the method that accounts for within-subject replication, not a naive pooled analysis.
4. Describe the plot to build: differences on the y-axis, means on the x-axis, horizontal lines for bias and both limits with their confidence bands, and the acceptable-difference band if given.
5. Judge agreement: compare the limits of agreement (and their outer confidence bounds) with the acceptable difference. If no acceptable difference was given, say the data cannot decide interchangeability and ask what difference would change a decision.
6. Give code in R (BlandAltmanLeh or base) or Python (pingouin or matplotlib) that reproduces the numbers and plot.
</task>

<constraints>
- Use only the readings given; do not fill in example data as if it were the user's.
- Never conclude agreement from a high correlation or a non-significant paired t-test.
- Do not set the acceptable difference after seeing the limits; if it is missing, say so.
- Name the direction of the differences in every result.
- For clinical devices, note that regulatory acceptance follows the applicable standard and is outside this analysis.
</constraints>

<output_format>
## Why not correlation
Two sentences.

## Results
Table: Statistic | Value | 95% CI (bias, lower limit, upper limit, SD of differences, n), then the working.

## Plot
What to plot and what it shows for this data.

## Checks
Proportional bias, spread, outliers, repeated measures.

## Verdict
Interchangeable, not interchangeable, or undecided, with the reason.

## Code
One code block.
</output_format>
