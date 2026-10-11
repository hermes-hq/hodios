---
schema: 1
id: design-quasi-experimental-study
kind: prompt
title: Design a quasi-experimental study
description: Designs a quasi-experimental evaluation before data collection, choosing difference-in-differences, interrupted time series, regression discontinuity or matching, with what each needs.
category: research-methods
version: 1.0.0
status: incubating
stage: [design]
role: [researcher, data-scientist]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [quasi-experiment, difference-in-differences, interrupted-time-series, regression-discontinuity, programme-evaluation, natural-experiment]
pairs_with:
  prompts: [build-causal-diagram, estimate-causal-effect, write-statistical-analysis-plan, plan-secondary-data-analysis]
  personas: [research-methodologist]
args:
  - name: intervention
    description: The policy, programme or change, how units were assigned to it (who got it and why), when it started, and what data exist or could be collected before and after.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assignment mechanism, Design options, Recommended design, Data needed, Assumption checks, Limits of the claim]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When randomisation is impossible, the strength of a causal claim depends on how treatment was assigned and on choosing the design that exploits it. Regression discontinuity needs a cut-off on a measured score that decides who gets the intervention; interrupted time series needs many data points before and after a clearly timed change; difference-in-differences needs a comparison group whose trend would have matched the treated group's without the intervention, with several pre-periods to check it; synthetic control fits few treated units with many potential donors; matching or weighting only handles measured confounders. Recent work showed that difference-in-differences with staggered adoption and a simple two-way fixed effects model can give badly biased answers, so the design should plan a suitable estimator. The decisive choices (comparison group, number of pre-periods, outcome definition, data source) are made before any analysis, and they are the ones evaluators most often get wrong by taking whatever data are at hand.
</context>

<task>
Design a quasi-experimental evaluation of:
<intervention>
{{intervention}}
</intervention>

1. Describe the assignment mechanism: who received the intervention, decided by whom and on what basis, and when. Identify what this implies for confounding.
2. Assess each candidate design (difference-in-differences, event study for staggered timing, interrupted time series with or without a control series, regression discontinuity, synthetic control, matching or weighting with a comparison group) for fit to this assignment and data.
3. Recommend one design, plus a second as a robustness check, and explain why.
4. Specify the data needed: units, outcome definition, time points (with a minimum number of pre-periods), comparison group and its selection, covariates, and possible sources. Say what to collect now if the intervention has not started.
5. List the key identifying assumption(s) and how each will be checked (pre-trend plots, placebo tests, density test at the cut-off, falsification outcomes).
6. Identify threats: concurrent events, anticipation, spillovers to the comparison group, changes in measurement, composition changes.
7. State what the design can and cannot claim, and what to say in the report.
</task>

<constraints>
- Do not claim a design identifies a causal effect without its assumption holding; say what would make it fail here.
- Fix the outcome, comparison group and analysis before looking at post-intervention outcomes.
- Flag staggered timing and recommend estimators designed for it rather than a naive two-way fixed effects model.
- Do not invent data availability; mark sources as possible, to confirm.
</constraints>

<output_format>
## Assignment mechanism
Short paragraph and implications.
## Design options
A table: design | requirement | met here? | main threat.
## Recommended design
The choice, the robustness design and reasons.
## Data needed
A table: element | definition | source | time points.
## Assumption checks
Bullets: assumption | check | what failure looks like.
## Limits of the claim
What can and cannot be concluded.
</output_format>
