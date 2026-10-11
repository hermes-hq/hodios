---
schema: 1
id: plan-finals-week-revision
kind: prompt
title: Plan revision for finals week
description: Plans revision across several exams in one finals or exam period, weighing dates, grade weight and weak topics, with a day-by-day schedule, interleaved subjects, protected sleep and a triage list.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [finals-week, exam-timetable, revision-schedule, exam-triage, spaced-practice, sleep-protection]
pairs_with:
  prompts: [plan-last-minute-revision, plan-exam-day-strategy, generate-practice-exam]
args:
  - name: exams
    description: Each exam with its date and time, how much it counts toward the grade, the format, and how confident you feel per topic.
    type: text
    required: true
  - name: today
    description: Today's date, so the plan starts from the right day.
    type: string
    required: true
  - name: constraints
    description: Optional. Work shifts, other commitments, hours you can study per day, when you focus best, and any study resources you have (past papers, notes, practice tests).
    type: text
output_contract:
  format: markdown
  sections: [Priorities, Day-by-day plan, Before each exam, What to drop if time runs out, Daily check-in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help students plan a period with several exams close together. The usual mistakes: revising one subject until its exam and leaving the rest, so the last exams get one panicked day; spending most time on the favourite subject; rereading notes instead of doing practice questions; studying all night before an early exam; and forgetting that a later exam with heavy weight may need more time than the next one. Better plans rank subjects by how much an hour of study can still change the grade (weight, distance from target, weakness), mix two or three subjects each day so later exams are not abandoned, use active recall and past papers, give the day before each exam mostly to that exam, and protect sleep, since memory consolidation and performance on the day depend on it.

Today: {{today}}
<exams>
{{exams}}
</exams>
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. **Priorities:** rank exams by need: grade weight, gap between current confidence and target, number of weak topics, and how much time remains before each. Show the reasoning in one line each, and the rough share of total study hours each gets.
2. **Day-by-day plan:** a table from today to the last exam, with study blocks (subject, specific topics, method such as practice paper, flashcards, timed questions), breaks, and time off. Mix subjects each day; put hard topics in the user's best focus hours; keep the evening before each exam lighter and the night free for sleep.
3. **Before each exam:** for the day before and the morning of each exam, what to do (a short review sheet, a few practice questions, logistics: room, time, materials, ID) and what not to do.
4. **What to drop if time runs out:** for each subject, the low-value topics to skip first and the topics never to skip.
5. **Daily check-in:** a short routine to adjust the plan each evening when a day goes badly.
</task>

<constraints>
- Use the dates and times given; never invent exam dates. If any exam lacks a date, ask for it before planning, or plan the rest and leave it marked.
- Respect the hours available; if the plan does not fit, say so and show the trade-off instead of adding more hours.
- Sleep of at least seven hours a night is built in; no all-nighters.
- Do not predict grades.
- If the student mentions panic, exhaustion or feeling unable to cope, acknowledge it, keep the plan lighter, and suggest talking to someone at their school's student support or wellbeing service.
</constraints>

<output_format>
## Priorities
Table: Exam | Date | Weight | Need | Share of hours | Why.
## Day-by-day plan
Table: Day | Block 1 | Block 2 | Block 3 | Notes.
## Before each exam
Bullets per exam.
## What to drop if time runs out
Table: Subject | Drop first | Never drop.
## Daily check-in
Three to five steps.
</output_format>
