---
schema: 1
id: write-school-data-report-for-governors
kind: prompt
title: Write a school data report for governors
description: Writes a termly or annual school data report for governors, trustees or a school board on attainment, progress and attendance by pupil group, with context and questions to ask.
category: reporting
version: 1.0.0
status: incubating
stage: [build, review]
role: [teacher, data-analyst, manager, executive]
inputs: [dataset, text, notes]
output: [report, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [school-governance, attainment, attendance, pupil-groups, board-report]
pairs_with:
  prompts: [analyze-school-attendance-data, apply-small-number-suppression, write-monthly-business-review]
args:
  - name: school_data
    description: "Aggregated results for the period: attainment and progress measures, attendance and persistent absence, exclusions or suspensions if relevant, by year group and pupil group, with earlier years and any local or national comparison figures. No pupil names."
    type: text
    required: true
  - name: school_context
    description: "Country or education system, school type and size, the school's improvement priorities, and what the board asked to see. Optional but needed for correct terms and thresholds."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Context, Attainment and progress, Attendance, Pupil groups, Against priorities, Questions for governors, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Governors, trustees and school boards hold leaders to account; they need data that helps them ask good questions, not every spreadsheet the school produces. Experienced school data leads know where these reports mislead. Cohorts are small: in a group of 8 pupils, one pupil moves a percentage by 12.5 points, so year-to-year swings for small groups are mostly noise and three-year trends say more. Attainment (the level reached) and progress (the gain from a starting point) tell different stories; a school with a low-attaining intake can show strong progress. Gaps should be compared like for like: the school's disadvantaged pupils against all pupils nationally or against the same group nationally, stated clearly. Attendance is best reported as overall absence and persistent absence, whose threshold differs by system (in England, missing 10% or more of sessions), with the reasons and the pupils' groups. Teacher assessments made during the year are less reliable than external results. Any group small enough to identify a child is suppressed. The report connects the numbers to the school's own improvement priorities and ends with the questions governors should put to leaders.
</context>

<task>
<school_data>
{{school_data}}
</school_data>
{{#school_context}}

<school_context>
{{school_context}}
</school_context>
{{/school_context}}

1. Set the context: system, school type, cohort sizes for each year group and group reported, and which measures are external results, internal assessments or provisional.
2. Report attainment and progress against the previous years and the comparison figures given, using the system's own measures and terms. Say which differences are within the range a cohort of that size would show by chance.
3. Report attendance: overall absence, persistent absence using the threshold for the stated system, the trend, and the groups most affected. If the system is not stated, use a clearly labelled assumed threshold and ask.
4. Compare pupil groups (for example disadvantaged, special educational needs, language background, sex) like for like, stating the comparison used, with cohort sizes. Suppress any group under the threshold given or under 5 pupils, and any figure that would let someone identify a child.
5. Link the results to the school's improvement priorities: on track, some progress, or concern, with the evidence.
6. Write five to eight questions governors could ask leaders, each tied to a specific number, focused on strategy, impact and next steps rather than operational detail.
7. Write the summary last: three to five sentences a governor could repeat accurately.
</task>

<constraints>
- Never include pupil names or details that could identify a pupil, even if present in the input; report only aggregates.
- Do not invent national or local comparison figures, thresholds or inspection judgements; use only those given and say which are missing.
- Use the education system's terms when stated; otherwise use plain neutral terms and say so.
- Avoid ranking or blaming individual teachers or classes.
- Write for non-specialists: define every measure in one line.
</constraints>

<output_format>
## Summary
## Context
Table: group or year | cohort size | measure type (external, internal, provisional).

## Attainment and progress
Table: measure | this year | last year | two years ago | comparison | note. Then short commentary.

## Attendance
## Pupil groups
Table: group | cohort size | measure | school | comparison used | gap. Suppressed cells marked.

## Against priorities
Table: priority | status | evidence.

## Questions for governors
Numbered list, each linked to a figure.

## Data notes
Definitions, sources, suppression and caveats.
</output_format>
