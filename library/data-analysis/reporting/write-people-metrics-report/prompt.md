---
schema: 1
id: write-people-metrics-report
kind: prompt
title: Write a quarterly people metrics report
description: Writes a quarterly people report for leadership with headcount, hiring, attrition and absence, using standard formulas and small-group privacy rules, and flags what needs attention.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [manager, executive, operations-manager, data-analyst]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [hr-metrics, attrition, headcount, absence-rate, people-analytics]
pairs_with:
  prompts: [define-hr-metrics, analyze-workforce-data, apply-small-number-suppression, forecast-headcount]
args:
  - name: people_data
    description: "Aggregated figures for the quarter: headcount and FTE at start and end, hires, leavers split voluntary and involuntary, leavers in their first year, hires over the last 12 months, absence days and available days, open roles, by department. Previous quarters if available. No names."
    type: text
    required: true
  - name: plan_and_context
    description: "Headcount plan or budget, reorganisations, layoffs or acquisitions in the quarter, the minimum group size your organisation uses for reporting, the country or countries covered, and who reads the report. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Headcount and movement, Hiring, Attrition, Absence, Watch items, Data and privacy notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Leadership reads a people report to see whether the organisation has the people it planned for and whether it is keeping them. HR analysts know the details that make the numbers comparable. Headcount and FTE differ, and contractors are in or out by a stated rule. Attrition is leavers divided by average headcount over the period, and a quarterly rate must be annualised (times four) before it is compared with annual figures or benchmarks; voluntary, involuntary and regretted leavers tell different stories, and first-year attrition (leavers with under 12 months' service divided by hires over the previous 12 months) points at hiring or onboarding rather than culture at large. Restructures and layoffs distort attrition and should be shown separately. Absence rate is days lost divided by days available, and a few long-term cases can dominate it, so short-term and long-term absence are reported apart. A recurring report is read quarter against quarter, so the same definitions are used every time and any change is called out, and it is judged against the headcount plan. Small groups are the main privacy risk: a 50% attrition rate in a team of two identifies people, so figures for groups below the organisation's threshold (commonly 5 to 10) are suppressed or rolled up, and no individual health, performance or protected-characteristic detail appears.

{{#plan_and_context}}Plan and context: {{plan_and_context}}{{/plan_and_context}}
</context>

<task>
<people_data>
{{people_data}}
</people_data>

1. Check the data for definitions (headcount or FTE, contractors, leaver dates) and for any group below the reporting threshold; if no threshold is given, use 5 and say so.
2. Reconcile headcount movement: start plus hires minus leavers plus transfers equals end, by department where given, and compare with plan.
3. Compute attrition for the quarter and annualised, split voluntary, involuntary and first-year, with restructure effects shown separately, and compare with previous quarters.
4. Summarise hiring: hires against plan, open roles and how long they have been open.
5. Compute absence rate, separating short-term and long-term absence where the data allows.
6. Where a watch item needs a deeper cut (tenure, representation, drivers by manager or level), name it as a follow-up analysis rather than doing it inside this report.
7. Pick out three to five watch items, such as a department with rising voluntary attrition or first-year leavers, each with the figure and a question leadership should ask.
</task>

<constraints>
- Suppress or combine any figure for a group below the threshold, and never show data that lets a reader work out an individual.
- Do not speculate about why named or identifiable people left, and do not include individual health or performance information.
- Always say whether an attrition rate is quarterly or annualised.
- Do not cite external benchmarks unless they were supplied; employment law and reporting norms differ by country.
- Compute only from the data given and show the formula for each rate once.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: headcount against plan, attrition trend, the main concern.

## Headcount and movement
Table: Department | Start | Hires | Leavers | Transfers | End | Plan | Variance.

## Hiring
Hires against plan, open roles and age.

## Attrition
Table: Measure | Quarter | Annualised | Previous quarter. Measures: total, voluntary, involuntary, first-year; restructure shown apart.

## Absence
Absence rate, short-term and long-term, trend.

## Watch items
Numbered: item, figure, question for leadership.

## Data and privacy notes
Bullets: definitions, threshold used, what was suppressed, data gaps.
</output_format>
