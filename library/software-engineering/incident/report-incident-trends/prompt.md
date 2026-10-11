---
schema: 1
id: report-incident-trends
kind: prompt
title: Report incident trends for a quarter
description: Analyses a period's incidents for frequency, severity, detection and recovery times, recurring causes and repeat services, and writes a reliability review with honest caveats and a few priorities.
category: incident
version: 1.0.0
status: incubating
stage: [operate, review]
role: [sre, engineering-manager, tech-lead]
stack: []
requires: [none]
inputs: [dataset, document]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [reliability-review, mttr, incident-analysis, quarterly-review, systemic-themes]
pairs_with:
  prompts: [audit-postmortem-action-items, define-slos, write-postmortem, prune-noisy-alerts]
  personas: [site-reliability-engineer]
args:
  - name: incident_records
    description: The incidents in the period, as an export or table with at least date, severity, service, start, detection, mitigation and resolution times, and cause or contributing factors if recorded. Postmortem summaries help.
    type: text
    required: true
  - name: period_and_audience
    description: The period covered and who reads the report, for example "Q3 2026, for the engineering leadership review".
    type: string
    required: true
  - name: previous_period
    description: The same figures or report for the previous period, if you want a comparison.
    type: text
---
<context>
You turn a period's incident records into a reliability review. Experienced reviewers know the numbers mislead easily: mean time to recovery is dominated by one or two long incidents, so medians and the distribution matter more; incident counts rise when a team gets better at declaring incidents; severity is assigned inconsistently; small samples make quarter-on-quarter swings noise. The useful output is not the averages but the patterns: the same service, dependency, change type or detection gap showing up again, and whether earlier action items addressed them. A review that asks leadership to fund three things gets more done than one that lists twelve.

Period and audience: {{period_and_audience}}

<incident_records>
{{incident_records}}
</incident_records>

{{#previous_period}}
<previous_period>
{{previous_period}}
</previous_period>
{{/previous_period}}
</context>

<task>
1. Check the data first: count records, find missing timestamps, inconsistent severity labels, duplicates and incidents still open. State what can and cannot be computed.
2. Compute, by severity: count, median and worst time to detect, median and worst time to mitigate, and customer-impact duration where recorded. Show how you defined each interval. Use medians and ranges, and note when a single incident drives a number.
3. Break incidents down by service, trigger type (deploy, config, dependency, capacity, data, unknown) and detection source (alert, customer, employee). Highlight what share was found by customers.
4. Find recurring themes: the same service or dependency, the same trigger type, repeated detection or rollback problems. Link each theme to the incidents that show it.
5. If a previous period is given, compare, and say whether differences are large enough to mean anything given the counts.
6. Pick at most three priorities for the next period, each tied to a theme, with the expected effect and a measure that would show progress.
7. Write a short executive summary for the stated audience.
</task>

<constraints>
- Compute only from the records. Never invent incidents, times or causes; where cause is missing, count it as unknown.
- Show sample sizes next to every rate or median. Do not claim a trend from a handful of incidents.
- Do not rank teams or individuals by incident count; frame findings as system and process patterns.
- Flag where a better number might reflect less reporting rather than better reliability.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Five sentences or fewer for the audience.
## Data quality
Bullets.
## Key figures
Table: severity | count | median detect | worst detect | median mitigate | worst mitigate. Definitions below the table.
## Breakdown
Tables by service, trigger and detection source.
## Recurring themes
Each theme with linked incidents.
## Compared with last period
Bullets, or "No previous data".
## Priorities for next period
Up to three, each with theme, expected effect and measure.
</output_format>
