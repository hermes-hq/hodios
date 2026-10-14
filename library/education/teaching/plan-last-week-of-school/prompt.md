---
schema: 1
id: plan-last-week-of-school
kind: prompt
title: Plan the last week of school
description: Plans the last week of the school year day by day with meaningful reflection, celebration, classroom wrap-up jobs and routines that keep behaviour steady when structure loosens.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [preferences]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [end-of-year, reflection, classroom-routines, celebration]
pairs_with:
  prompts: [plan-first-week-of-school, write-class-handover-notes, write-report-card-comments]
args:
  - name: grade_level
    description: Grade or age.
    type: string
    required: true
  - name: days
    description: Number of days and anything already fixed, e.g. "5 days; sports day Wednesday; finish at noon Friday".
    type: string
    required: true
  - name: notes
    description: Optional notes, e.g. "secondary, I see each class 3 times", "some students leaving the school", "budget is zero", "class gets unsettled easily".
    type: text
output_contract:
  format: markdown
  sections: [Principles for the week, Day-by-day plan, Wrap-up jobs, Behaviour and wellbeing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The last week is hard: assessment is done, the timetable is broken up, rooms are being packed and students sense that the rules have relaxed. Behaviour problems and anxiety both rise, especially for students who rely on school structure, who are moving schools, or who face a long holiday without support. Experienced teachers keep the daily routine visible, give each day a purpose students can see, mix reflection with low-cost celebration, and use students to help with classroom wrap-up. They also avoid activities that exclude (expensive gifts, parties around food some students cannot eat) and prepare students for the transition to next year.
</context>

<task>
Plan the last week for **{{grade_level}}**: {{days}}.
{{#notes}}
Notes: {{notes}}
{{/notes}}

1. State 4 or 5 principles for the week (keep routines, purposeful days, inclusive celebration, preparing for next year).
2. Plan each day with a theme, a timed outline that keeps the usual start and end routines, and activities drawn from: reflection on the year (letters to next year's class, "then and now" portfolios, best-work gallery), looking ahead (questions for next year's teacher, summer reading or project choices), community (class awards that name a strength for every student, gratitude notes), and short learning that still matters (a fun review, a mini project). Work around the fixed events given.
3. List wrap-up jobs students can help with, how to assign them, and what the teacher must do alone (records, confidential papers).
4. Plan for behaviour and wellbeing: keeping expectations visible, structuring free-ish time, supporting students who find endings hard or who are leaving, and a calm final goodbye routine. Any worry about a student's welfare over the holiday goes to the school's safeguarding lead before the term ends.
</task>

<constraints>
- Every student must receive positive recognition; no awards that rank or embarrass.
- No activities that require families to spend money, and note allergy and dietary checks for any food.
- Keep films or free time to a small, purposeful part of the plan.
- Fit the plan to the days and fixed events given; do not add events.
</constraints>

<output_format>
## Principles for the week
Bullets.
## Day-by-day plan
One subsection per day: theme and a time table.
## Wrap-up jobs
Student jobs and teacher-only tasks.
## Behaviour and wellbeing
Bullets.
</output_format>
