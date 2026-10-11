---
schema: 1
id: set-up-rainbow-spreadsheet
kind: prompt
title: Set up a rainbow spreadsheet
description: Sets up a rainbow spreadsheet for a team watching usability sessions, with observation rows, one colour column per participant, logging rules, tallies and a same-day review into findings.
category: ux-research
version: 1.0.0
status: incubating
stage: [verify]
role: [ux-researcher, designer, product-manager]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [rainbow-spreadsheet, collaborative-analysis, observation-notes, session-tallies, team-observation]
pairs_with:
  prompts: [brief-usability-test-observers, synthesize-usability-findings, write-usability-test-plan]
  personas: [ux-researcher]
args:
  - name: study
    description: The tasks, number of participants and their segments, and who on the team will observe.
    type: text
    required: true
  - name: expected_issues
    description: Issues the team already suspects, to seed the first rows. Optional.
    type: text
  - name: notes
    description: Observations from sessions already run, to fill the sheet. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How the sheet works, Sheet layout, Seed rows, Logging rules, During sessions, Review and findings]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A rainbow spreadsheet, popularised by Tomer Sharon, lets a team analyse usability sessions together as they happen. Each row is an observation, each participant gets a column and a colour, and observers mark a cell when that participant shows the observation. Patterns become visible as colour bands across rows, so the team leaves the last session with shared, counted findings rather than five private sets of notes. It works only if rows record what people did or said, not interpretations or solutions ("did not see the promo code field", not "field should be bigger"); if similar observations are merged rather than duplicated with different wording; if one person owns the sheet's structure; and if counts are read as how many of this small group, not as percentages of all users.
</context>

<task>
<study>
{{study}}
</study>
{{#expected_issues}}

<expected_issues>
{{expected_issues}}
</expected_issues>
{{/expected_issues}}
{{#notes}}

<notes>
{{notes}}
</notes>
{{/notes}}

1. How the sheet works: a short explanation for observers.
2. Sheet layout: columns (ID, task, observation, type such as behaviour, quote, error or positive, one column per participant with colour, total, severity, notes) and grouping of rows by task.
3. Seed rows: rows from expected issues, written as neutral observations to confirm or reject; if notes are given, fill rows and marks from them.
4. Logging rules: observation, not interpretation; one observation per row; check for an existing row before adding; who can add rows versus mark cells; quotes in quotation marks with participant ID.
5. During sessions: roles (sheet owner, observers), how to handle disputes, and a 10-minute tidy-up between sessions to merge duplicates.
6. Review and findings: after the last session, sort by total, agree severity together, group rows into findings, and note what the counts can and cannot show.
</task>

<constraints>
- Do not invent observations or marks; seed rows from expected issues are labelled as unconfirmed until observed.
- Rows must not contain proposed solutions; keep those in a separate notes column or list.
- Do not report counts as percentages of the whole user base.
</constraints>

<output_format>
## How the sheet works
## Sheet layout
| ID | Task | Observation | Type | P1 | P2 | P3 | P4 | P5 | Total | Severity | Notes |
## Seed rows
## Logging rules
## During sessions
## Review and findings
</output_format>
