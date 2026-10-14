---
schema: 1
id: write-report-runbook
kind: prompt
title: Write a runbook for a recurring report
description: Writes the runbook that lets someone else produce a recurring report without its usual owner - sources, steps, checks, known quirks, sign-off and what to do when something breaks.
category: reporting
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-analyst, business-analyst, financial-analyst, operations-manager]
inputs: [notes, text, transcript]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [runbook, handover, key-person-risk, report-production]
pairs_with:
  prompts: [automate-recurring-report, design-report-template, write-data-methodology-note]
args:
  - name: process_notes
    description: "How the report is made today, in any form: the owner's notes, a walkthrough transcript, file and query names, spreadsheets used, timings, who it goes to and who signs it off."
    type: text
    required: true
  - name: known_issues
    description: Things that tend to go wrong (late data, manual fixes, fragile formulas) and how the owner handles them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Overview, Before you start, Steps, Checks before sending, Known quirks and fixes, Escalation, Gaps in this runbook]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many recurring reports live in one person's head. When that person is on leave or leaves, the report is late, wrong or quietly stops. A good runbook is written for a competent colleague who has never made this report: it says when it is due and to whom, what access they need before the day, every step in order with the exact file, query or tab, the manual adjustments the owner makes and why, and the checks that catch the usual errors (row counts, totals against last period, a known reconciliation). The undocumented quirks matter most: the source that arrives late on the first working day, the customer that must be excluded, the formula that breaks when a month has five weeks. A runbook also says when to stop and escalate rather than improvise.
</context>

<task>
<process_notes>
{{process_notes}}
</process_notes>
{{#known_issues}}

<known_issues>
{{known_issues}}
</known_issues>
{{/known_issues}}

1. Extract the report's purpose, audience, schedule, deadline and sign-off chain.
2. List prerequisites: access and permissions, files and locations, tools, and anything to request in advance.
3. Write the steps in order, each with the action, the exact location (file, tab, query, folder) as named in the notes, the expected result, and roughly how long it takes. Make every manual adjustment explicit with its reason.
4. Write the checks before sending: control totals, comparisons with last period with an expected range, reconciliation points, and visual checks.
5. Record known quirks and their fixes, and the conditions under which the runner must stop and escalate.
6. List the gaps: places where the notes are vague or rely on judgement, as questions for the current owner to answer before handover.
</task>

<constraints>
- Use only names, paths and steps found in the notes; write "[ask owner]" where a detail is missing rather than inventing one.
- Do not include passwords, keys or personal contact details; refer to where credentials are managed instead.
- Write steps as imperatives a newcomer can follow without the owner present.
- Keep explanations short; the runbook is used under deadline.
</constraints>

<output_format>
## Overview
Purpose, audience, schedule, deadline, owner, backup, sign-off.

## Before you start
Checklist of access and prerequisites.

## Steps
Numbered steps: action, location, expected result, time.

## Checks before sending
Checklist with expected values or ranges.

## Known quirks and fixes
Table: Symptom | Cause | Fix.

## Escalation
When to stop, whom to contact (role, not personal details), what to tell readers if the report will be late.

## Gaps in this runbook
Questions for the current owner.
</output_format>
