---
schema: 1
id: forecast-school-enrollment
kind: prompt
title: Forecast school enrolment
description: Forecasts pupil numbers by year group for a school or district for the next few years using cohort survival ratios, intake from births or feeder schools, and housing, with a range for planning.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, operations-manager, data-analyst, executive]
subject: [education-sector, public-sector]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [enrolment, cohort-survival, pupil-projections, school-places]
pairs_with:
  prompts: [forecast-time-series, present-forecast-uncertainty, review-forecast-assumptions]
args:
  - name: enrolment_history
    description: "Pupil numbers by year group (grade) for at least three past years, the school's or district's capacity by year group, and its admission rules."
    type: text
    required: true
  - name: intake_drivers
    description: "What drives the entry year: births in the catchment four or five years earlier, feeder school numbers, applications and offers, and any planned housing. Optional but important."
    type: text
  - name: horizon
    description: How many years ahead to forecast and what decision it informs (staffing, classrooms, budget, admissions limit).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Method, Forecast by year group, Range and scenarios, Decisions and triggers, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
School and district planners use the cohort survival (grade progression) method: each year group moves up a grade next year, and the ratio of pupils in grade g+1 this year to grade g last year captures net moves in and out, repeat years and transfers. Averaging these ratios over three to five years and applying them to today's cohorts projects the existing pupils well for a few years. The hard part is the entry year, which has no previous cohort: it is projected from births in the catchment several years earlier times a capture rate, from feeder school numbers, or from applications, and new housing adds pupils with a lag that depends on the type and size of dwellings. Errors compound with horizon, small schools have volatile ratios, and capacity caps or admission limits mean forecast demand and forecast roll are not the same thing. Planners report a central figure with a range and name the trigger points (for example, if entry applications exceed X by a date, open another class).

Horizon and decision: {{horizon}}
</context>

<task>
<enrolment_history>
{{enrolment_history}}
</enrolment_history>
{{#intake_drivers}}

<intake_drivers>
{{intake_drivers}}
</intake_drivers>
{{/intake_drivers}}

1. Compute grade progression ratios for each transition and each year available, and their average and spread. Flag unusual years (a closure nearby, a boundary change) and decide whether to exclude them.
2. Project existing cohorts forward with the average ratios.
3. Project the entry year from the drivers supplied (births times capture rate, feeder numbers, or applications trend). If no driver is given, use the recent intake trend and say it is the weakest part of the forecast.
4. Add housing-driven pupils if planned housing is given, with the assumptions on yield per dwelling and timing stated as assumptions to confirm locally.
5. Compare forecast demand with capacity and admission limits by year group.
6. Give a range (from the spread of ratios and a low and high intake scenario) and the decision triggers.
</task>

<constraints>
- Compute only from figures supplied and show the ratios table.
- Do not invent birth figures, housing yields or capture rates; any assumption is labelled and its effect shown.
- Separate demand (pupils who would attend) from roll (pupils admitted within capacity).
- For small year groups, warn that ratios are volatile and widen the range.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Total roll and entry-year forecast for each year of the horizon, with the main risk.

## Method
Ratios table: Transition | Year 1 | Year 2 | Year 3 | Average | Spread.

## Forecast by year group
Table: Year group | Now | +1 | +2 | +3 ... | Capacity.

## Range and scenarios
Low, central, high totals with assumptions.

## Decisions and triggers
Bullets: decision, trigger value, date to check.

## Caveats
Bullets.
</output_format>
