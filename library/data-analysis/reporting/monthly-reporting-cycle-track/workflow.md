---
schema: 1
id: monthly-reporting-cycle-track
kind: workflow
title: Monthly reporting cycle track
description: Runs a monthly reporting cycle in gated steps from data pull and quality checks to metric calculation, variance commentary, review with metric owners and distribution.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, verify, build, review, ship]
role: [data-analyst, operations-manager, business-analyst, financial-analyst]
requires: [none]
inputs: [dataset, text, notes]
output: [checklist, report, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [month-end, recurring-reporting, data-quality, variance-commentary, sign-off]
pairs_with:
  prompts: [write-monthly-business-review, compare-period-performance, explain-metric-discrepancy, automate-recurring-report, write-data-methodology-note]
  personas: [data-analyst]
args:
  - name: report
    description: What is reported, to whom and in what form, for example "operations KPI pack for the leadership team - 12 metrics, slides plus a spreadsheet".
    type: text
    required: true
  - name: sources
    description: The systems or files each metric comes from, their owners, and when the month's data are complete.
    type: text
    required: true
  - name: deadline_day
    description: The working day of the new month by which the report must be distributed.
    type: number
    default: 5
steps:
  - {id: pull, file: steps/01-pull.md, stage: operate, gate: approve}
  - {id: quality, file: steps/02-quality.md, stage: verify, gate: approve}
  - {id: metrics, file: steps/03-metrics.md, stage: build, gate: approve}
  - {id: commentary, file: steps/04-commentary.md, stage: build, gate: approve}
  - {id: owner-review, file: steps/05-owner-review.md, stage: review, gate: approve}
  - {id: distribute, file: steps/06-distribute.md, stage: ship, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one month's cycle for this report, due by working day {{deadline_day}}:

<report>
{{report}}
</report>

Each step produces one artifact and stops for approval; later steps build on the approved artifacts. Start by laying out the working-day schedule back from day {{deadline_day}}, with the owner of each step.

Rules for every step: use only data, query results and notes the user supplies, and never invent a number, a driver or an owner's explanation; when you cannot run a query, give it and continue from the pasted output. Keep a cycle log of issues, fixes and decisions, and carry unresolved items forward to next month's cycle. If a gate is skipped, note it in the log and continue.
