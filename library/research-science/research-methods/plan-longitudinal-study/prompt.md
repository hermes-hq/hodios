---
schema: 1
id: plan-longitudinal-study
kind: prompt
title: Plan a longitudinal study
description: Plans a longitudinal or panel study with the number and timing of waves, measures that stay comparable over time, retention tactics, attrition handling and a matching analysis plan.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher]
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
tags: [longitudinal-research, panel-study, cohort-study, attrition, retention, repeated-measures]
pairs_with:
  prompts: [design-sampling-plan, plan-missing-data-handling, run-multilevel-model, write-data-management-plan]
  personas: [research-methodologist]
args:
  - name: study
    description: What change or development you want to study, in whom, over what period, the measures you have in mind, and budget or staff limits.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Change question, Wave schedule, Measures over time, Retention plan, Attrition and missing data, Analysis, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Longitudinal studies answer questions about change, trajectories and temporal order that cross-sectional data cannot. Their design choices are hard to fix later. The timing and number of waves must match how fast the process changes: two waves can show change but not its shape, and at least three are needed to model a trajectory; intervals that are too long miss transitions, too short add burden. Measures must stay comparable across waves and age groups, and changing an item mid-study breaks the series. Attrition is rarely random, so retention is designed in from the start (contact details for several people, tracing consent, between-wave contact, flexible modes, incentives that grow over waves) and the analysis plans for missing data under explicit assumptions. Repeated testing and conditioning effects, cohort and period effects, and the move of participants (new address, school, job) also need planning.
</context>

<task>
Plan a longitudinal study for:
<study>
{{study}}
</study>

1. Restate the question as a question about change: within-person change, between-person differences in change, timing of events, or temporal order of variables. Say which longitudinal design fits (panel, prospective cohort, accelerated or cohort-sequential, intensive repeated measures).
2. Set the wave schedule: number of waves, interval and its rationale, baseline timing, and the windows for each wave.
3. Plan measures: what is measured at every wave versus once, time-varying versus fixed covariates, how comparability is kept (same items, mode, recall periods), and how age-appropriate changes will be bridged.
4. Plan sample size with attrition: expected retention per wave as an assumption, the resulting sample at the final wave, and the starting sample needed.
5. Write the retention plan: contact and tracing consent, between-wave contact, incentives, mode flexibility, reducing burden, and tracking procedures.
6. Plan for attrition and missing data: what to record about dropouts, auxiliary variables, and the missing data approach (for example multiple imputation or full information maximum likelihood) with its assumption.
7. Match the analysis to the question: multilevel growth models, latent growth curves, cross-lagged or random-intercept cross-lagged models, survival or event history models, and note the minimum waves each needs.
8. List risks (panel conditioning, measurement change, cohort and period effects, funding gaps) with mitigations.
</task>

<constraints>
- Do not invent retention rates; mark them as assumptions to check against similar studies.
- Do not propose a trajectory model with fewer waves than it needs.
- Data linkage and long-term storage require consent planned at baseline; say so.
- Keep burden per wave realistic for the population.
</constraints>

<output_format>
## Change question
The question and design type.
## Wave schedule
A table: wave | timing | window | mode | main measures.
## Measures over time
A table: measure | waves | fixed or time-varying | comparability notes.
## Retention plan
Bullets by phase.
## Attrition and missing data
Sample calculation in a code block and the missing data approach.
## Analysis
Models matched to questions with wave requirements.
## Risks
A table: risk | mitigation.
</output_format>
