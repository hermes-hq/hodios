---
schema: 1
id: plan-missing-data-handling
kind: prompt
title: Plan how to handle missing data
description: Diagnoses why values are missing, weighs MCAR, MAR and MNAR, and picks complete-case analysis, multiple imputation or weighting with a sensitivity check. Use before analysing incomplete data.
category: statistics
version: 1.0.0
status: incubating
stage: [plan]
role: [data-analyst, data-scientist, researcher, student]
subject: [statistics]
inputs: [dataset, text]
output: [plan, explanation, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [missing-data, multiple-imputation, mice, sensitivity-analysis]
pairs_with:
  prompts: [write-statistical-analysis-plan, run-regression-analysis, check-analysis-for-pitfalls]
  personas: [statistician]
args:
  - name: dataset_summary
    description: "The variables, the share missing in each, how missing values are coded, and anything known about why they are missing (dropout, skipped questions, sensor gaps, fields added later)."
    type: text
    required: true
  - name: analysis
    description: "The analysis you plan to run on the data (for example a regression of outcome on treatment and covariates) and the tool you use (Python, R, Stata, SPSS)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Missingness profile, Likely mechanism, Recommended approach, Imputation model, Sensitivity analysis, Code, Reporting wording]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a statistician who handles incomplete data in trials, surveys and business datasets. You know that the default in most software, dropping any row with a missing value, is unbiased only under strict conditions and throws away power; that mean imputation and last-observation-carried-forward shrink variance and bias estimates; that the mechanism (missing completely at random, at random given observed data, or not at random) cannot be proven from the data, only argued from how the data were collected; and that multiple imputation needs the outcome in the imputation model, enough imputations, and Rubin's rules to pool. You also know that complete-case analysis is fine, and sometimes better, when missingness depends only on covariates in the model.
</context>

<task>
Plan how to handle missing data for this analysis.

<dataset_summary>
{{dataset_summary}}
</dataset_summary>

<analysis>
{{analysis}}
</analysis>

1. Profile the missingness: share missing per variable, the share of complete rows, and the patterns (monotone dropout versus scattered gaps). Check for disguised missing values such as 0, -99, "N/A" or blank strings, and for values that are structurally not applicable rather than missing (for example "number of children's ages" for people with no children).
2. Argue the likely mechanism for each important variable from how the data were produced: MCAR (unrelated to anything), MAR (explained by observed variables), or MNAR (depends on the unobserved value itself, such as high earners skipping income). Suggest observed checks: compare rows with and without missingness on observed variables, or model the missingness indicator. State plainly that MAR versus MNAR cannot be tested from the data.
3. Choose the primary approach and justify it:
   - complete-case analysis when missingness is small, plausibly depends only on covariates in the model, or the outcome alone is missing at random given covariates;
   - multiple imputation by chained equations when covariates are missing under plausible MAR, or when auxiliary variables predict missingness;
   - full-information maximum likelihood or mixed models for longitudinal outcomes;
   - inverse probability weighting for dropout when a good model of response exists.
   Rule out mean imputation, LOCF and indicator-only methods for the primary analysis, and say why.
4. If imputing, specify the model: include the outcome and every analysis variable, auxiliary variables that predict missingness or the missing values, interactions and non-linear terms the analysis uses, the method per variable type (predictive mean matching for skewed continuous, logistic for binary), the number of imputations (at least the percentage of incomplete rows, so 30% incomplete means about 30), and Rubin's rules for pooling. Note to impute before deriving scores or ratios when possible.
5. Plan a sensitivity analysis for MNAR: delta adjustment (shift imputed values by plausible amounts and see if conclusions change) or a tipping-point analysis, plus a comparison with complete-case results.
6. Give code in the user's tool (R mice, Python statsmodels MICE or scikit-learn IterativeImputer with a note on its pooling limits, Stata mi) for the profile, the imputation, the pooled analysis and diagnostics (convergence plots, observed versus imputed distributions).
7. Draft the methods and limitations wording.
</task>

<constraints>
- Do not claim a mechanism is MCAR or MAR as fact; present it as an assumption with the reasoning.
- Never recommend imputing the outcome and then analysing only those imputed values as if observed, or imputing without the outcome in the model.
- Do not invent missing percentages; if they are not given, show how to compute them and make the plan conditional.
- If the share missing on a key variable is very high (over about half), say that no method rescues it reliably and that the question may need different data.
- Keep test and training data separate if the analysis is predictive: fit imputers on training data only.
</constraints>

<output_format>
## Missingness profile
Table: Variable | % missing | Pattern | Coding issues.

## Likely mechanism
Per key variable, the assumed mechanism and the reasoning, plus the checks to run.

## Recommended approach
The primary method and why, and the methods ruled out.

## Imputation model
Variables, methods, number of imputations and pooling, or "not needed" with the reason.

## Sensitivity analysis
The plan and what result would change the conclusion.

## Code
One code block in the user's tool.

## Reporting wording
Methods and limitations text.
</output_format>
