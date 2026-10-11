---
schema: 1
id: find-themes-across-reports
kind: prompt
title: Find themes across many incident reports
description: Reads many incident, near-miss, complaint or inspection reports together and finds recurring causes, locations, times and conditions, with counts, examples and where the data is too thin to tell.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [operations-manager, manager, individual]
requires: [none]
inputs: [dataset, document]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [incident-reports, near-misses, trend-analysis, safety, recurring-issues]
pairs_with:
  prompts: [extract-recommendations-from-report, build-timeline-from-documents, extract-key-numbers]
args:
  - name: reports
    description: The reports, each with a date, place and description, pasted or exported. Remove names of staff, patients, pupils or customers first.
    type: text
    required: true
  - name: setting
    description: Where they come from and what you need (for example "warehouse near-miss log, Jan-Sep, for the safety committee", "school behaviour incidents this term").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Overview, Recurring themes, When and where, Contributing conditions, Reports worth reading in full, Limits of the data, Questions for follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read a batch of incident, near-miss, complaint or inspection reports the way a safety or quality lead does. Each report is investigated alone, so patterns across them are missed: the same loading bay at shift change, the same type of slip in the rain, the same complaint after a new rota, near misses that preview a serious incident. Good analysis codes each report by what happened, where, when and the conditions around it (staffing, equipment, weather, new starters), counts honestly, looks for clusters by time and place, separates the immediate event from contributing conditions, and resists blaming individuals. It also remembers that report counts reflect reporting culture: a rise can mean more reporting rather than more incidents.

<reports>
{{reports}}
</reports>

Setting and purpose: {{setting}}
</context>

<task>
1. Count the reports, the period covered, and the categories or severities used in the source.
2. Code each report by type of event, location, time of day and week, and conditions mentioned.
3. Group into recurring themes with counts, the date range and one or two short anonymised examples each.
4. Show clusters by time and place in a table.
5. List contributing conditions that recur across themes (staffing, training, equipment, layout, process changes), stated as possible factors to investigate.
6. Pick out single reports worth reading in full: serious outcomes, near misses with high potential, or new types of event.
7. State limits: missing fields, inconsistent categories, small numbers, possible under-reporting.
8. Draft questions or checks for follow-up investigation.
</task>

<constraints>
- Use only the reports. Do not invent counts, causes or outcomes.
- Present causes as possible contributing factors, not findings; a pattern is a reason to investigate, not proof.
- Do not identify or blame individuals; remove any names or identifying details that slipped through.
- Small counts stay small: do not turn 3 reports into a "trend" without saying how few they are.
- Where reports suggest an ongoing serious risk, say it should be raised with the responsible person now.
</constraints>

<output_format>
## Overview
Counts, period, severity mix.

## Recurring themes
Table: Theme | Count | Date range | Example (anonymised)

## When and where
Table of clusters by time and location.

## Contributing conditions
Bullets, each marked as a factor to investigate.

## Reports worth reading in full
Bullets with the report reference and why.

## Limits of the data
Bullets.

## Questions for follow-up
Numbered.
</output_format>
