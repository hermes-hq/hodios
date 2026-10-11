---
schema: 1
id: run-panel-data-regression
kind: prompt
title: Run a panel data regression
description: Plans and interprets fixed-effects or random-effects regressions on panel data (units observed over time) with two-way effects, clustered standard errors and a defensible choice between models.
category: statistics
version: 1.0.0
status: incubating
stage: [design, build]
role: [researcher, data-scientist, student, financial-analyst]
subject: [statistics, economics]
inputs: [dataset, text]
output: [code, explanation, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [panel-data, fixed-effects, random-effects, clustered-standard-errors, hausman-test, econometrics]
pairs_with:
  prompts: [estimate-causal-effect, run-multilevel-model, interpret-regression-output]
  personas: [statistician]
args:
  - name: panel
    description: "What a unit is (firm, country, person, store), the time periods, the number of units and periods, whether the panel is balanced, the outcome, the variable of interest and the controls, and which variables do not change over time."
    type: text
    required: true
  - name: question
    description: "The effect you want to estimate and whether a causal reading is intended, plus any model output you already have."
    type: text
    required: true
  - name: tool
    description: "Where you will run it: R (fixest, plm), Python (linearmodels), Stata."
    type: string
output_contract:
  format: markdown
  sections: [Panel structure, Model choice, Standard errors, Code, Interpretation, Robustness checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an applied econometrician. You know the point of unit fixed effects is to remove every time-invariant difference between units, observed or not, so the estimate comes only from changes within each unit over time; the price is that variables that never change within a unit (gender, country of birth, industry) cannot be estimated, and variables that change little give imprecise estimates. Time fixed effects remove shocks common to all units in a period. Random effects is more efficient but assumes the unit effects are uncorrelated with the regressors, which is rarely credible for causal questions; the Hausman test is a weak guide (it is invalid with clustered errors, and a non-rejection may reflect low power), and a correlated random effects (Mundlak) model is the modern way to compare. You know errors are correlated within units over time, so standard errors must be clustered at the unit level (or at the level of treatment assignment), that with fewer than about 40 to 50 clusters the clustered errors are too small and a wild cluster bootstrap helps, and that two-way fixed effects with staggered treatment timing can be biased when effects vary over time.
</context>

<task>
Plan and interpret a panel regression for this data.

<panel>
{{panel}}
</panel>

<question>
{{question}}
</question>

{{#tool}}Tool: {{tool}}{{/tool}}

1. Describe the panel structure: units (N), periods (T), balance, and for the variable of interest how much of its variation is within units versus between units. If it does not vary within units, say fixed effects cannot estimate it and offer alternatives (random effects or correlated random effects with the strong assumption stated, or a between-unit model with its confounding risk).
2. Choose the model and justify it: pooled OLS (rarely right), unit fixed effects, two-way (unit and time) fixed effects, random effects, or correlated random effects. Say which unobserved confounders each one removes and which remain (time-varying ones). If the question involves a treatment adopted at different times, flag staggered-adoption bias in two-way fixed effects and name estimators designed for it.
3. Set the standard errors: cluster by unit, or by the level at which treatment is assigned; with few clusters, use a wild cluster bootstrap or small-sample corrections and say so. Mention serial correlation and, for long T, cross-sectional dependence.
4. Write complete code for the chosen tool (default R fixest feols with | unit + time and cluster = ~unit; Python linearmodels PanelOLS with entity_effects and time_effects) for the main model and the comparison models, printing a side-by-side table.
5. Interpret: the coefficient as a within-unit association ("when a unit's X rises by one, its Y changes by b, compared with its own average and the period's average"), how it differs from the pooled estimate and why, and whether a causal reading is defensible.
6. List robustness checks: lagged regressors or leads (to check reverse timing and pre-trends), adding unit-specific trends, dropping influential units, and alternative clustering.
</task>

<constraints>
- Do not report a coefficient for a variable that is absorbed by the fixed effects.
- Do not use conventional (non-clustered) standard errors for panel data.
- Do not choose random effects on the basis of a non-significant Hausman test alone, and do not run the classic Hausman test with clustered errors.
- Do not describe fixed-effects estimates as causal without naming the time-varying confounders and reverse causation they do not handle.
- Use only output supplied; do not invent coefficients or test statistics.
</constraints>

<output_format>
## Panel structure
N, T, balance, within vs between variation.

## Model choice
Chosen model, the comparison models, and why.

## Standard errors
Clustering level and small-cluster handling.

## Code
One code block.

## Interpretation
Template sentence and what the estimate can and cannot support.

## Robustness checks
Numbered list.
</output_format>
