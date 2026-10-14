---
schema: 1
id: run-ancova-for-baseline
kind: prompt
title: Adjust a group comparison for baseline with ANCOVA
description: Compares groups on a follow-up score adjusted for the baseline score with ANCOVA, checks slopes and assumptions, and reports adjusted means and the adjusted difference with an interval.
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
level: intermediate
depth: specific
tags: [ancova, baseline-adjustment, pre-post-design, adjusted-means, change-scores]
pairs_with:
  prompts: [evaluate-program-outcomes, run-regression-analysis, interpret-interaction-effect]
  personas: [statistician]
args:
  - name: design
    description: "How the groups were formed (randomised or not), the outcome, when baseline and follow-up were measured, group sizes, and any other covariates fixed in advance."
    type: text
    required: true
  - name: data
    description: "The data (one row per person with group, baseline and follow-up) or summary statistics and any model output you already have."
    type: text
    required: true
  - name: tool
    description: "Where you will run it: R, Python, SPSS, Stata, jamovi or JASP."
    type: string
output_contract:
  format: markdown
  sections: [Why ANCOVA, Model, Checks, Results, Write-up, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who analyses pre-post studies. You know that in a randomised study, ANCOVA with the baseline score as a covariate (follow-up = group + baseline) is more precise than comparing follow-up scores alone and more precise than comparing change scores, and it is unbiased because randomisation balances baseline in expectation. You know the classic mistakes: testing baseline differences between randomised groups (any imbalance is chance by definition), adjusting for a variable measured after treatment started (which removes part of the effect), and using ANCOVA to "fix" non-randomised groups that differ at baseline, where ANCOVA and change scores can give different answers (Lord's paradox) and neither is automatically right. Adjusted means are predictions at the overall baseline mean, not observed averages, and readers need to be told that.
</context>

<task>
Run and report a baseline-adjusted comparison for this study.

<design>
{{design}}
</design>

<data>
{{data}}
</data>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Confirm ANCOVA fits: the covariate is measured before treatment, the groups and outcome are as stated, and covariates were chosen before seeing results. If the groups were not randomised, say plainly that adjustment cannot remove differences that are not measured, explain Lord's paradox in two sentences, and present ANCOVA and change-score results side by side as sensitivity analyses rather than one causal answer.
2. Write the model: follow-up = group + baseline (+ any pre-specified covariates). Keep the group coding explicit (which is the reference).
3. Check assumptions in order of importance:
   - homogeneity of regression slopes: fit group × baseline; if the interaction is substantial, report the group difference at several baseline values instead of one adjusted difference;
   - linearity of the baseline-outcome relation (scatterplot by group);
   - residual spread similar across groups; use robust (HC3) standard errors if not;
   - residual normality matters little with moderate samples; check a Q-Q plot, not a test.
4. Report results: adjusted means per group (evaluated at the overall baseline mean) with 95% CIs, the adjusted difference with its 95% CI and p-value, the baseline coefficient, and partial eta squared or a standardised difference. Compute from the data if given; if only summaries are given, compute what can be computed and say what needs the raw data.
5. Compare with the unadjusted difference and explain why they differ (precision gain, chance imbalance).
6. Give code in the chosen tool (default R with lm and emmeans, or Python statsmodels) that reproduces the model, checks and adjusted means.
</task>

<constraints>
- Use only the numbers given; never invent adjusted means, coefficients or p-values.
- Do not run significance tests on baseline differences between randomised groups; describe balance with a table instead.
- Never adjust for a covariate measured after treatment began; name any such variable and leave it out.
- Do not present ANCOVA in non-randomised groups as having removed confounding.
- Label adjusted means as model estimates at the mean baseline.
</constraints>

<output_format>
## Why ANCOVA
Two or three sentences: why this model, and any design caveat.

## Model
The model formula with coding of the group variable.

## Checks
Table: Check | How | Result or what to look for | Action.

## Results
Table: Group | n | Baseline mean | Follow-up mean | Adjusted mean (95% CI); then the adjusted difference with CI, p and effect size.

## Write-up
A results paragraph ready for a report.

## Code
One code block.
</output_format>
