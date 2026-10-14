---
schema: 1
id: plan-secondary-data-analysis
kind: prompt
title: Plan a secondary data analysis
description: Plans a study using an existing dataset, checking fitness for the question, variable mapping, access, weights and missing data, with the analysis fixed before outcomes are seen.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student, data-scientist]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [secondary-analysis, existing-data, survey-weights, data-access, analysis-plan, codebook]
pairs_with:
  prompts: [write-preregistration, write-data-management-plan, write-ethics-application, design-research-study]
  personas: [research-methodologist, statistician]
args:
  - name: question
    description: Your research question and the main exposure or predictor, outcome and population.
    type: text
    required: true
  - name: dataset
    description: The dataset you plan to use (name, who collected it, design, years, sample) and its documentation or codebook extracts if you have them.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fitness for purpose, Variable mapping, Access and ethics, Design features to handle, Analysis plan, Risks and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Secondary analysis of existing data (national surveys, cohorts, administrative records, trial data, other researchers' shared data) is fast and cheap, but the data were collected for someone else's purpose. Experienced analysts read the documentation before the data: how the sample was drawn (clusters, strata, oversamples, weights), how and when each variable was measured, which questions changed between waves, how missing values and skips are coded, and what the licence allows. They map each concept in their question to an actual variable and judge how well it measures the concept. They also guard against the biggest hidden risk: with the data already in hand, analytic choices can be tuned to the results, so the analysis plan is written and ideally registered before outcome variables are examined. Ignoring survey design features gives wrong standard errors; treating "not applicable" codes as numbers gives wrong estimates; linking datasets can breach access conditions.
</context>

<task>
Plan a secondary analysis for:
<question>
{{question}}
</question>
<dataset>
{{dataset}}
</dataset>

1. Judge fitness for purpose: population and period coverage, sample size for the subgroups of interest, whether the design supports the type of claim (descriptive, associational, causal), and the main threats. Say clearly if the dataset cannot answer the question and what kind of data would.
2. Map each concept to candidate variables: variable name if given (otherwise "to find in codebook"), wording or source, waves available, coding issues, and a rating of how well it measures the concept.
3. List access and ethics steps: application or licence type, permitted uses, linkage and disclosure-control rules, whether ethics review or an exemption is needed, and data storage requirements. Mark these as items to confirm with the data provider.
4. List design features to handle: weights and which to use, clustering and strata for variance estimation, special missing codes, changes across waves, top-coding or suppression.
5. Write a pre-specified analysis plan: sample restrictions, models, covariates chosen in advance with reasons (for example from a causal diagram), missing data approach, sensitivity analyses, and what counts as exploratory. Recommend registering it before outcomes are examined and say what to declare if the data have already been looked at.
6. List checks: reproduce a published estimate from the documentation to confirm processing, inspect distributions and codes, and keep a syntax log.
</task>

<constraints>
- Do not invent variable names, sample sizes or dataset features; use only supplied information and mark the rest "to confirm in documentation".
- Do not claim access rules for a named dataset from memory; tell the user to confirm them with the provider.
- Match causal language to the design; observational survey data support associations unless a stated identification strategy applies.
- Say plainly when prior familiarity with the data limits how confirmatory the analysis can be.
</constraints>

<output_format>
## Fitness for purpose
Verdict and reasons.
## Variable mapping
A table: concept | candidate variable | measurement | waves | issues | fit (good, partial, poor).
## Access and ethics
Checklist of items to confirm.
## Design features to handle
Bullets.
## Analysis plan
Numbered plan.
## Risks and checks
Bullets.
</output_format>
