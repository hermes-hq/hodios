---
schema: 1
id: screen-variables-for-relationships
kind: prompt
title: Screen variables for relationships with an outcome
description: Screens which variables relate to an outcome using correlations, group comparisons and plots, flagging confounding, nonlinearity, leakage and chance findings before anyone acts on them.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, business-analyst, researcher, product-manager]
requires: [none]
inputs: [dataset, text]
output: [report, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [correlation, bivariate-analysis, confounding, multiple-comparisons, feature-screening]
pairs_with:
  prompts: [explore-dataset, find-churn-drivers, write-analysis-plan]
  personas: [data-analyst]
args:
  - name: outcome
    description: The outcome you care about and how it is measured (for example "order value in euros", "renewed yes/no", "days to resolve a ticket"), and when it is recorded relative to the other variables.
    type: text
    required: true
  - name: data_description
    description: The dataset - rows, columns with types, a sample or summary statistics, how it was collected and the period it covers. Paste a sample, a schema or a data dictionary.
    type: text
    required: true
  - name: decision
    description: What you will do with the result (for example "pick variables for a model", "decide which segments to investigate"), which decides how strict the screening should be.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Method, Screening results, Warnings, What to check next, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a careful applied statistician doing a first screen of which variables move with an outcome. Screening is cheap and useful, but it is where most false stories start: one correlation coefficient hides curves and thresholds, a variable recorded after the outcome looks predictive because it is a consequence of it, a third variable drives both sides, and with 40 variables two or three will look "significant" by chance alone. The job is a ranked shortlist with the right caveats attached, not conclusions about cause.
</context>

<task>
Screen the variables in this dataset for relationships with {{outcome}}.

<data_description>
{{data_description}}
</data_description>

{{#decision}}The result will be used to: {{decision}}{{/decision}}

1. Data checks: outcome type (continuous, binary, count, time-to-event), its distribution and missingness; each candidate variable's type, missingness and cardinality; rows that should be excluded. Flag any variable recorded at or after the outcome, or derived from it (leakage), and drop it from the screen with a note.
2. Choose the measure per pair and say why: Spearman for skewed continuous pairs (Pearson only when roughly linear without heavy outliers), difference in means or medians with an effect size for categorical predictors, difference in rates or a risk ratio for binary outcomes, and binned plots (deciles of the predictor against the outcome mean or rate) for every continuous predictor to expose nonlinearity and thresholds.
3. Rank variables by effect size, not by p-value. Report the size in the outcome's own units where possible ("customers with 3+ logins renew at 82% versus 61%"), with group sizes.
4. Correct for multiple comparisons: state how many pairs were screened, how many would look notable by chance at the threshold used, and apply a correction (Benjamini-Hochberg is a sensible default) if p-values are reported.
5. Look for confounders: for the top variables, check whether they are strongly related to each other or to an obvious driver such as tenure, size, region or time period, and show one stratified comparison for the strongest candidate.
6. Check Simpson's paradox risk where groups differ greatly in size or mix, and check whether any relationship rests on a handful of extreme rows.
7. List what to check next: which relationships deserve a proper model or experiment, and what extra data would separate cause from correlation.
8. Give runnable code (pandas and a plotting library, or SQL plus a spreadsheet method if the user is not coding) that reproduces the screen.
</task>

<constraints>
- Never describe a screened relationship as a cause or a driver; use "associated with" and say what would test causation.
- Do not invent coefficients or values. If only a description or sample is given, give the method and code, and mark any figures computed from a sample as provisional.
- Keep variables with weak overall correlation but a clear threshold or U-shape in the binned plot; say so explicitly.
- If the sample is small (under about 100 rows, or groups under about 30), say which comparisons are too noisy to rank.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
Two or three sentences: the strongest associations, and the biggest caveat.

## Data checks
Bullets, including any leakage variables removed.

## Method
The measure used for each variable type and the multiple-comparison approach.

## Screening results
Table: Variable | Measure | Effect in outcome units | Group sizes | Shape (linear, threshold, U-shaped, none) | Confidence note.

## Warnings
Confounding, Simpson's paradox, outliers, chance findings.

## What to check next
Numbered list, each with the test or data needed.

## Code
One code block that reproduces the screen.
</output_format>
