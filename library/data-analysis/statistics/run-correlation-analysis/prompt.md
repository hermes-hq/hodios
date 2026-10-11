---
schema: 1
id: run-correlation-analysis
kind: prompt
title: Run and report a correlation analysis
description: Runs Pearson, Spearman or partial correlations with confidence intervals, checks scatterplots for outliers, nonlinearity and subgroups, and words the result without causal claims.
category: statistics
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, researcher, student, business-analyst]
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
tags: [pearson-correlation, spearman-correlation, partial-correlation, scatterplot, fisher-z]
pairs_with:
  prompts: [run-regression-analysis, check-analysis-for-pitfalls, correct-for-multiple-comparisons]
  personas: [statistician]
args:
  - name: data
    description: "The paired values of the two (or more) variables, or the correlation output you have with n, plus what each variable measures and its units."
    type: text
    required: true
  - name: question
    description: "What you want to know (for example 'is time on site related to spend?'), any variable you want to control for, and how the data were collected."
    type: text
    required: true
  - name: tool
    description: "Where you will run it: Excel, R, Python, SPSS, jamovi."
    type: string
output_contract:
  format: markdown
  sections: [Scatterplot check, Coefficient choice, Result, Wording, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who reviews correlation claims. You know that a correlation coefficient without a scatterplot is unreliable: Anscombe's quartet has four very different patterns with the same r, a single extreme point can create or destroy a correlation, a curved relationship can have r near zero, and pooling two subgroups can produce a correlation that exists in neither (or reverse it, as in Simpson's paradox). You know Pearson measures linear association and is sensitive to outliers, Spearman measures monotonic association on ranks, and a restricted range (only top applicants, only adults) shrinks correlations. You give intervals because r from 30 people is very imprecise, and you know "statistically significant" for r only means it is probably not exactly zero.
</context>

<task>
Analyse the correlation in this data.

<data>
{{data}}
</data>

<question>
{{question}}
</question>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Inspect the relationship before computing anything: describe or request the scatterplot and check for outliers or high-leverage points, curvature, clusters or subgroups, restricted range, and many tied or capped values. Say what each would do to r.
2. Choose the coefficient: Pearson for a roughly linear relation without extreme points; Spearman (or Kendall's tau for small samples with many ties) for monotonic, ordinal or outlier-prone data; partial correlation when a named third variable should be held constant; point-biserial when one variable is binary. For curved relationships, say a correlation is the wrong summary and suggest a fitted curve.
3. Compute it, by hand when data or r and n are given: r, n, the 95% CI via the Fisher z transformation (z = atanh(r), SE = 1/√(n − 3)), and the p-value for r = 0. Report r² as shared variance only where it helps.
4. Run a sensitivity check: the coefficient with and without any influential point, and Pearson vs Spearman. If they disagree, explain why and which to report.
5. If several correlations were computed (a correlation matrix), note the multiple-testing problem and how to handle it.
6. Word the result: strength and direction, the interval, the population it applies to, and a sentence on what it does not show (causation, direction, effect of changing one variable).
7. Give code for the chosen tool (default Python scipy.stats.pearsonr and spearmanr with seaborn scatterplot, or R cor.test and ggplot2).
</task>

<constraints>
- Use only the supplied data; do not invent coefficients or p-values.
- Never infer causation or direction from a correlation; name plausible confounders or reverse causation.
- Do not label strength with fixed cut-offs alone; relate it to the field and the decision.
- Do not report a correlation for data with obvious curvature or subgroups without saying so.
- If the data are time series, warn that shared trends create spurious correlations and suggest correlating changes instead.
</constraints>

<output_format>
## Scatterplot check
What the plot shows or what to look for, and any issues found.

## Coefficient choice
Coefficient and reason.

## Result
Table: Pair | Coefficient | n | 95% CI | p, then the sensitivity check.

## Wording
A paragraph ready for a report, including what it does not show.

## Code
One code block.
</output_format>
