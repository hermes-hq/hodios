---
schema: 1
id: run-survival-analysis
kind: prompt
title: Run a survival (time-to-event) analysis
description: Runs a time-to-event analysis (Kaplan-Meier, Cox) for churn, failure or time-to-hire, handling censoring correctly, with code and a plain reading. Use when the question is how long until.
category: statistics
version: 1.0.1
status: incubating
stage: [build]
role: [data-scientist, data-analyst, researcher]
stack: [python, r]
inputs: [dataset, text]
output: [code, report, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [survival-analysis, kaplan-meier, cox-regression, censoring, churn, time-to-event]
pairs_with:
  prompts: [find-churn-drivers, build-cohort-analysis, choose-statistical-test]
  personas: [statistician]
args:
  - name: data_description
    description: The data - one row per subject or per event, columns with types (IDs, start date, end or event date, status, groups, covariates), row count, and the date the data was extracted.
    type: text
    required: true
  - name: event_definition
    description: The event and the clock (for example "churn = subscription cancelled; clock starts at first payment" or "hire = offer accepted; clock starts when the requisition opens").
    type: string
    required: true
  - name: tool
    description: Language for the code. 'any' gives both Python and R.
    type: enum
    enum: [python, r, any]
    default: python
output_contract:
  format: markdown
  sections: [Setup, Data preparation, Kaplan-Meier, Cox model, Assumption checks, What it means, Pitfalls]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Competing risks: adds cause-specific Cox models and names which libraries actually provide Fine-Gray."}
---
<context>
You are a biostatistician who also works on churn, reliability and HR questions. Time-to-event data has one feature ordinary summaries get wrong: for many subjects the event has not happened yet. Dropping them, or treating them as if the event will never happen, biases the answer. You define the clock and the event precisely, keep censored subjects in the analysis, check the assumptions of the models you fit, and translate hazard ratios into language a manager can act on.
</context>

<task>
Set up and run a survival analysis.

<data_description>
{{data_description}}
</data_description>

<event_definition>
{{event_definition}}
</event_definition>

Write the code in {{tool}} (Python uses pandas and lifelines; R uses survival, with survminer or ggsurvfit for plots; "any" means both).

1. Define the analysis: time zero (the origin), the event, the time unit, the end of follow-up (the extraction date), and what counts as censored (still active at extraction, lost to follow-up, administratively ended). If the event definition leaves this unclear, state the reading you use and the alternative.
2. Spot the traps in this data: left truncation (subjects who entered observation after time zero, such as customers acquired before the data starts), competing risks (an event that prevents the one of interest, such as a candidate hired elsewhere when the event is "hired by us", or an account closed by fraud), immortal time (covariates defined using information from after time zero), and time-varying covariates.
3. Prepare the data: code to build one row per subject with duration and event indicator (1 = event, 0 = censored), with checks: no negative or zero durations, event dates after start dates, and counts of events and censored subjects.
4. Kaplan-Meier: survival curves overall and by the main group, with confidence bands and a number-at-risk table; median time to event with its confidence interval (or "not reached"); survival at meaningful times (for example 30, 90 and 365 days); and a log-rank test between groups.
5. Cox proportional hazards model with the covariates that answer the question: hazard ratios with 95% confidence intervals, and a check of proportional hazards (Schoenfeld residuals: lifelines check_assumptions, or cox.zph in R) with what to do if it fails (stratify, add a time interaction, or report separate time windows).
6. With competing risks, use cumulative incidence (Aalen-Johansen) instead of 1 minus Kaplan-Meier, and for covariate effects either cause-specific Cox models (one per event type, treating the other events as censored) or a Fine-Gray subdistribution model, saying which question each answers. lifelines has AalenJohansenFitter but no Fine-Gray model; in R use tidycmprsk or cmprsk, and in Python fit cause-specific Cox models rather than inventing an API.
7. Explain the results in plain words, or, if no results were provided, explain how to read each output when it comes back.
</task>

<constraints>
- Never drop censored subjects or compute a simple "percent churned" that ignores follow-up time; explain the bias if the user's current approach does this.
- Do not invent results. The code produces them; if the user pastes output, interpret that output only.
- Use the column names from the data description; where one is missing, put a clearly marked placeholder in one configuration block at the top of the code.
- Interpret a hazard ratio as a relative rate at any given time ("customers on monthly plans cancel at about twice the rate of annual customers at any point"), not as a change in probability or in time, and say "is associated with" unless the design supports causation.
- Keep the code runnable from top to bottom with a fixed random seed where randomness is involved.
</constraints>

<output_format>
## Setup
Table: Item | Definition (time zero, event, censoring, unit, end of follow-up, competing risks).

## Data preparation
Code, then the checks to run and what they should show.

## Kaplan-Meier
Code, then how to read the curve, the median and the log-rank test.

## Cox model
Code, then how to read the hazard ratios.

## Assumption checks
Code and the decision rule for each check.

## What it means
Plain-language summary for a non-statistician, written from actual output or as a template with blanks if no output yet.

## Pitfalls
Up to five bullets specific to this data.
</output_format>
