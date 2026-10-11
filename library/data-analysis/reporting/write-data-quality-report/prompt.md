---
schema: 1
id: write-data-quality-report
kind: prompt
title: Write a data quality report for owners
description: Writes a data quality report for a system or dataset, scoring completeness, validity, uniqueness, consistency and timeliness by field, with trends, business impact and named owners.
category: reporting
version: 1.0.0
status: incubating
stage: [verify, operate]
role: [data-analyst, data-engineer, business-analyst, operations-manager]
inputs: [dataset, text, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-quality, data-stewardship, completeness, data-profiling, issue-log]
pairs_with:
  prompts: [write-data-quality-checks, reconcile-datasets, write-data-correction-notice]
args:
  - name: profile_results
    description: "Profiling or check results for the dataset: per-field null and blank counts, invalid values, duplicates, mismatches with other systems, load times, ideally for this period and earlier ones."
    type: text
    required: true
  - name: dataset_context
    description: "What the dataset is, which fields matter most and what they feed (billing, reporting, compliance), any agreed thresholds, and who owns which fields. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Scope and method, Scorecard, Issues by impact, Trends, Owners and actions, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A data quality report is written for the people who can fix the data, usually the business owners of the process that enters it, not only for engineers. It is useful when it measures quality along clear dimensions and ties each problem to a consequence. Completeness: missing values, including disguised ones such as "N/A", "unknown", "0000", 1900-01-01 or a default country. Validity: values in the right format, range and list. Uniqueness: duplicate records, often the same customer entered twice with spelling differences. Consistency: the same fact agreeing across systems. Timeliness: data arriving within its agreed delay. Accuracy, checked against a trusted reference or a sample, is the hardest and is often not measured; the report says so. A single overall score hides the problem: 98% complete overall can mean the one field billing depends on is 70% complete. So results are reported per critical field, against a threshold, with the trend, and the root cause usually sits in an entry screen, an integration or a missing validation rule, not in the data team.
</context>

<task>
<profile_results>
{{profile_results}}
</profile_results>
{{#dataset_context}}

<dataset_context>
{{dataset_context}}
</dataset_context>
{{/dataset_context}}

1. State the scope: dataset, period, record count, which checks were run, and which dimensions were not measured.
2. Classify each field as critical or not, using the context given (what it feeds). If no context is given, propose a classification and label it "proposed".
3. Build the scorecard per critical field and dimension: the measured rate, the threshold (agreed if given, otherwise a proposed one labelled as such), status, and change since the last period. Count disguised missing values as missing and say which ones you counted.
4. List issues ranked by business impact: what is wrong, how many records, what it breaks downstream, the likely root cause (labelled "likely" unless confirmed), and the fix (at source, in the integration, or a cleanup).
5. Describe trends: what is improving, what is worsening, and any step change with its date.
6. Assign each issue to an owner role (or the named owner if given), with a next action and a review date.
7. State the limits: dimensions not measured, sampling, and checks that could give false passes.
</task>

<constraints>
- Use only the measurements given; do not invent counts, thresholds presented as agreed, owners or root causes.
- Report rates with the record counts behind them.
- Do not roll everything into one overall quality score; if one is requested, show it alongside the per-field results.
- Do not include actual personal data values from the records in the report; describe patterns instead.
- Keep the tone factual and blame-free; describe processes, not people.
</constraints>

<output_format>
## Summary
Three bullets: overall state, the worst issue and its impact, the main action.

## Scope and method
## Scorecard
Table: field | dimension | rate | records affected | threshold | status | change.

## Issues by impact
Table: issue | records | downstream impact | likely root cause | fix.

## Trends
## Owners and actions
Table: issue | owner | next action | review date.

## Limits
</output_format>
