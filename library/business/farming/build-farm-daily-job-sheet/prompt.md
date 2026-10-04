---
schema: 1
id: build-farm-daily-job-sheet
kind: prompt
title: Build a farm daily job sheet
description: Turns the day's priorities, the weather and who is in into a farm job sheet with tasks by person, machine and field, safety notes and what must be done before evening checks.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, manager, operations-manager, individual]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [table, checklist, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [daily-planning, job-allocation, weather-window, farm-team, whiteboard]
pairs_with:
  prompts: [set-up-farm-lone-working-checks, build-staff-schedule]
args:
  - name: priorities
    description: Today's jobs in rough priority order, with fields, machines and deadlines, plus fixed routines (milking, feeding, stock checks). Rough notes or a voice-note transcript are fine.
    type: text
    required: true
  - name: people
    description: Who is in today and their hours, and what each can and cannot do (tickets, machines they drive, experience, anyone under 18 or new).
    type: text
    required: true
  - name: weather
    description: Optional. Today's forecast, for example "dry till 14:00, showers later, wind 25 km/h".
    type: string
  - name: format
    description: Where the sheet will be shown - a whiteboard (very short lines) or a group message (one message, readable on a phone).
    type: enum
    enum: [whiteboard, group-message]
    default: group-message
output_contract:
  format: markdown
  sections: [Today at a glance, Job sheet, Safety notes, Before evening checks, If plans change]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You turn a farmer's morning notes into a job sheet the whole team can read in a minute. Daily plans on farms fail in familiar ways: two jobs need the same tractor or telehandler at the same time; weather-critical work (spraying, baling, drilling) is put after a job that could wait; someone untrained is given a machine or a lone job; and the routine that must happen every day (feeding, water checks, evening stock checks) slips because the day ran long. A good sheet fixes the order around the weather window and the fixed routines, gives every task one named owner, and states what must be finished before evening.

Format: {{format}}
{{#weather}}Forecast: {{weather}}{{/weather}}
</context>

<task>
<priorities>
{{priorities}}
</priorities>

<people>
{{people}}
</people>

1. Lock in fixed routines first (milking, feeding, water, stock checks) with their times and owners.
2. Place weather-critical work in its window. Spraying only within the product label's wind, rain and temperature limits and by a person with the required certificate; if the forecast or certificate is unclear, say so instead of scheduling it.
3. Assign each remaining task to one named person who is competent for it. Never give a machine, chemical or livestock job to someone listed as untrained, new or under 18 without a named supervisor.
4. Check for clashes: one machine in two places, one person in two places, a field blocked by another job. Resolve by moving the lower priority task and say what moved.
5. Mark lone jobs and set a check-in time for each.
6. Write "before evening checks": what must be done by when, and who does the final round.
7. Write a short fallback: what happens if it rains early or a machine breaks.
8. Fit the format. Whiteboard: each line under about 40 characters, initials or first names, no reasoning. Group message: plain text that pastes into a messaging app, so no tables or markdown headings in the message itself; one line per task as "time - who - task - place (machine)", no emoji, short enough to read on a phone without scrolling far.
</task>

<constraints>
- Use only the people, machines, fields and times given; do not invent staff or kit. If a task has no capable person, list it as unassigned and say why.
- If priorities or people are missing, ask for them and stop.
- Keep the sheet short: one line per task, no explanations on the sheet itself; put reasoning in "If plans change".
</constraints>

<output_format>
## Today at a glance
Three lines: weather window, top priority, finish time.

## Job sheet
Whiteboard: a table with columns time | who | task | field or place | machine | done by. Group message: the same fields as one plain-text line per task, in time order, ready to paste. Fixed routines included either way.

## Safety notes
Up to five bullets specific to today: lone jobs and check-in times, supervision, machines, livestock, weather.

## Before evening checks
Checklist with times and owners.

## If plans change
Two to four bullets: rain plan, breakdown plan, unassigned tasks and clashes resolved.
</output_format>
