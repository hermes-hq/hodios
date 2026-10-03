---
schema: 1
id: plan-meta-analysis
kind: prompt
title: Plan and interpret a meta-analysis
description: Plans and interprets a meta-analysis, deciding whether to pool, the effect measure and model, heterogeneity, subgroup and sensitivity analyses, publication-bias checks and certainty. For review teams.
category: literature-review
version: 1.0.0
status: incubating
stage: [design, review]
role: [researcher, student, data-scientist]
requires: [none]
inputs: [text, dataset, document]
output: [plan, report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [meta-analysis, heterogeneity, random-effects, publication-bias, grade, evidence-synthesis]
pairs_with:
  prompts: [extract-data-for-meta-analysis, write-systematic-review-protocol, appraise-study-quality]
  personas: [statistician, research-methodologist]
args:
  - name: included_studies_summary
    description: One line or row per included study - design, population, intervention or exposure, comparator, outcome measure and time point, sample sizes, risk of bias - and pooled results if you already ran the analysis.
    type: text
    required: true
  - name: question
    description: The review question and the planned outcomes, ideally as registered in the protocol.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Should these studies be pooled, Analysis plan, Heterogeneity and subgroups, Sensitivity and small-study effects, Interpretation, Reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A meta-analysis is only as meaningful as the decision to combine the studies. Experienced reviewers first ask whether the studies answer the same question closely enough to pool, then choose an effect measure that suits the outcome and is comparable across studies, and a model that matches their assumptions: a random-effects model when true effects are expected to vary (usually), with REML or Paule-Mandel estimates of between-study variance and, with few studies, the Hartung-Knapp-Sidik-Jonkman adjustment. Heterogeneity is described with tau², a prediction interval and I² with its confidence interval, never I² alone. Subgroup analyses and meta-regression are few, pre-specified and interpreted as observational. Funnel-plot methods need roughly ten or more studies and detect small-study effects, not proof of publication bias. Certainty is rated with GRADE.
</context>

<task>
Plan a meta-analysis for this question and, if pooled results are given, interpret them.
<question>
{{question}}
</question>
<included_studies>
{{included_studies_summary}}
</included_studies>

1. Decide whether pooling is appropriate: compare populations, interventions, comparators, outcomes, designs and risk of bias. If some studies should not be combined, say which and why, and propose separate analyses or a structured narrative synthesis (SWiM).
2. Choose the effect measure for each outcome (mean difference, standardised mean difference with Hedges' correction, risk ratio, odds ratio, risk difference, hazard ratio) and explain the choice, including how to handle different scales, change versus final scores and mixed binary and continuous reporting.
3. Choose the model and estimator, and the confidence-interval method, with the reason, and say what changes if there are fewer than about five studies.
4. Handle dependencies: multi-arm trials, cluster and crossover designs, and several effect sizes per study (choose one by rule, or use a multilevel model or robust variance estimation).
5. Plan heterogeneity assessment and at most a few subgroup analyses or meta-regressions tied to a stated rationale, with the minimum number of studies per covariate.
6. Plan sensitivity analyses: excluding high risk-of-bias studies, influence and leave-one-out diagnostics, alternative estimators or models, and imputed or converted data.
7. Plan small-study and publication-bias checks suitable for the number of studies, and say which ones not to run if there are too few.
8. If pooled results are provided, interpret them: the effect and its CI in plain words, the prediction interval, clinical or practical importance against a stated threshold, how heterogeneity and bias limit the conclusion, and a provisional GRADE rating per domain.
</task>

<constraints>
- Do not recommend pooling studies just because the software allows it; a precise average of incompatible studies is misleading.
- Never present a fixed-effect result as the main analysis when heterogeneity is expected, without justification.
- Do not invent study results or pooled numbers. If you illustrate, label numbers as hypothetical.
- If a decision should have been pre-specified in the protocol, say so, and treat post hoc choices as exploratory.
- Name software options generically (for example the metafor or meta packages in R, Stata, RevMan) only as examples.
</constraints>

<output_format>
## Should these studies be pooled
Verdict and reasons, with any studies to analyse separately.
## Analysis plan
A table: outcome | effect measure | model and estimator | CI method | dependency handling.
## Heterogeneity and subgroups
What to report and the pre-specified subgroups with rationale.
## Sensitivity and small-study effects
The analyses and when each applies.
## Interpretation
Only if results were given: plain-language reading, prediction interval, importance, limits, provisional GRADE table.
## Reporting
The PRISMA 2020 items this plan feeds, and the forest and funnel plots to produce.
</output_format>
