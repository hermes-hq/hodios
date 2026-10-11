---
schema: 1
id: model-count-data
kind: prompt
title: Model count and rate data
description: Models counts or rates (complaints, defects, incidents) with Poisson or negative binomial regression, exposure offsets, overdispersion and zero-inflation checks, and rate ratios in plain words.
category: statistics
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, data-scientist, researcher, operations-manager]
subject: [statistics]
inputs: [dataset, text]
output: [code, table, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [poisson-regression, negative-binomial, count-data, rate-ratio, overdispersion, zero-inflation]
pairs_with:
  prompts: [run-regression-analysis, interpret-regression-output, check-normality-assumption]
  personas: [statistician]
args:
  - name: data
    description: "What is counted, what one row is, the exposure (time at risk, customers, kilometres, page views) and whether it varies between rows, the predictors, the mean and variance of the counts, and the share of zeros."
    type: text
    required: true
  - name: question
    description: "What you want to know: which factors are linked to higher rates, whether a change reduced incidents, or predicted counts for planning."
    type: text
    required: true
  - name: tool
    description: "Language for the code: R or Python."
    type: string
output_contract:
  format: markdown
  sections: [Data check, Model choice, Code, Diagnostics, Interpretation]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who models counts: complaints per branch, defects per batch, hospital admissions per month, bugs per release. You know linear regression on raw counts gives impossible negative predictions and wrong standard errors, and that comparing raw totals is meaningless when units differ in exposure (a branch with ten times the customers will have more complaints), which is why the log of exposure enters a Poisson-family model as an offset. You know real count data are almost always overdispersed (variance larger than the mean) and that a Poisson model then gives standard errors that are far too small, so negative binomial or quasi-Poisson is the usual choice. You also know many zeros are often explained by overdispersion alone; zero-inflated or hurdle models are justified only when there is a separate process producing structural zeros, and the choice should be checked against a negative binomial, not assumed.
</context>

<task>
Build a count model for this data.

<data>
{{data}}
</data>

<question>
{{question}}
</question>

{{#tool}}Language: {{tool}}{{/tool}}

1. Check the data: what is counted, the exposure and whether it varies (if it does, an offset of log(exposure) is required), the mean and variance of the counts (variance/mean well above 1 signals overdispersion), the share of zeros versus what a Poisson or negative binomial with that mean would predict, and whether rows are independent (repeated months per branch call for a mixed model or clustered errors).
2. Choose the model and justify it: Poisson only if the variance is close to the mean after adjusting for predictors; negative binomial (NB2) as the usual default; quasi-Poisson if only the standard errors need fixing; zero-inflated or hurdle only with a plausible structural-zero process, compared with negative binomial by AIC and a rootogram; a mixed-effects count model for repeated measures.
3. Write complete code that fits the model with the offset, prints rate ratios (exponentiated coefficients) with 95% CIs, and runs the checks.
4. Diagnostics: dispersion statistic (Pearson chi-square / residual df), a rootogram or observed-vs-predicted zero counts, residual plots, and influential units.
5. Interpret in plain words: each rate ratio as a percentage change in the rate per unit of exposure ("branches in region B have 35% more complaints per 1,000 customers, 95% CI 12% to 62%"), predicted rates for meaningful profiles, and limits (observational data, missing predictors).
</task>

<constraints>
- Never compare raw counts across units with different exposure; always model or report rates.
- Do not use Poisson standard errors when the data are overdispersed.
- Do not choose a zero-inflated model only because there are many zeros.
- Do not invent coefficients or rate ratios; the code must run on the user's data, and any example output must be labelled as illustrative.
- Do not describe rate ratios from observational data as causal effects.
</constraints>

<output_format>
## Data check
Exposure, dispersion, zeros, independence.

## Model choice
Model and reason in three or four sentences.

## Code
One code block.

## Diagnostics
What to check and how to read it.

## Interpretation
How to read each rate ratio, with a template sentence, and the limits.
</output_format>
