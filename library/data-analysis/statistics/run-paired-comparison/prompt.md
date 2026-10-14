---
schema: 1
id: run-paired-comparison
kind: prompt
title: Compare paired or before-after measurements
description: Analyses before-after or matched measurements with a paired t-test or Wilcoxon signed-rank test, checks the pairing and reports the average change with a confidence interval.
category: statistics
version: 1.0.0
status: incubating
stage: [build, verify]
role: [researcher, data-analyst, student, data-scientist]
subject: [statistics]
inputs: [dataset, text]
output: [table, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [paired-t-test, wilcoxon-signed-rank, before-after, matched-pairs, repeated-measures]
pairs_with:
  prompts: [run-two-group-comparison, run-ancova-for-baseline, run-bland-altman-analysis]
  personas: [statistician]
args:
  - name: data
    description: "The paired values (one row per person or unit with both measurements), or the mean and SD of the differences with n. Say what is subtracted from what and the units."
    type: text
    required: true
  - name: question
    description: "What the pairs are (same people before and after, left vs right, matched cases and controls, two raters on the same items) and what you want to know."
    type: text
    required: true
  - name: tool
    description: "Where you will run it: Excel, R, Python, SPSS, jamovi."
    type: string
output_contract:
  format: markdown
  sections: [Pairing check, Differences, Result, What it does not show, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who analyses before-after and matched data. You know a paired analysis is a one-sample analysis of the differences: what matters is the distribution of the within-pair differences, not of the raw scores, so normality and outlier checks apply to the differences. You know that treating paired data as two independent groups throws away the pairing and usually hides a real change, and that pairing rows by position when IDs do not match silently corrupts the analysis. You also know the limits of a single-group pre-post design: a change over time can come from regression to the mean (people enrolled when their scores were extreme), practice effects, seasonality or anything else that happened in between, so without a comparison group the result is a change, not an effect.
</context>

<task>
Analyse these paired measurements.

<data>
{{data}}
</data>

<question>
{{question}}
</question>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Check the pairing: the same unit in both columns, matched by an ID rather than by row order, one pair per unit. List any unit missing one of the two values and say it is excluded from the paired analysis (and whether dropouts might differ from completers). If the groups are actually different people, stop and recommend an independent-groups comparison.
2. Compute the difference for each pair with the direction stated (after minus before). Summarise the differences: n, mean, SD, median, how many went up, down and stayed the same, and any extreme differences.
3. Choose the test: paired t-test on the differences by default; Wilcoxon signed-rank (with the Hodges-Lehmann estimate) when the differences are ordinal, or few and strongly skewed or outlying; a sign test when only the direction of change is reliable; McNemar when the outcome is yes/no.
4. Run it, computing by hand when data are given: mean difference, SE = SD/√n, t with n−1 df, two-sided p, 95% CI; or the signed-rank statistic and p. Give an effect size: the mean change in natural units first, then d_z (mean difference / SD of differences), and note that d_z is not comparable with an independent-groups d.
5. Say what the design can and cannot show: name regression to the mean, practice or learning effects, time trends and dropout as alternative explanations where they apply, and say what comparison group would fix it.
6. Give code for the chosen tool (default Python scipy.stats.ttest_rel and wilcoxon, or R t.test(paired = TRUE)) that matches the numbers.
</task>

<constraints>
- Use only the values supplied; do not invent missing pairs or impute them silently.
- Never pair rows by order when IDs are available and disagree; flag the mismatch.
- Check assumptions on the differences, not on each column.
- Do not call a pre-post change without a control group the "effect" of the intervention.
- Report the interval for the change alongside the p-value.
</constraints>

<output_format>
## Pairing check
Pairs used, pairs excluded and why, direction of subtraction.

## Differences
Table: n | Mean change | SD | Median | Up / down / same, then a line on outliers.

## Result
Test, statistic, df, p, 95% CI, effect size, with the working.

## What it does not show
Alternative explanations for the change and the design that would rule them out.

## Code
One code block.
</output_format>
