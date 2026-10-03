---
schema: 1
id: write-iep-progress-report
kind: prompt
title: Write IEP goal progress notes
description: Writes IEP or support-plan goal progress notes from supplied data in objective, parent-readable language with the trend, status, next steps and any needed team discussion.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [dataset, notes]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [iep, special-education, progress-monitoring, progress-report, family-communication, inclusion]
pairs_with:
  prompts: [write-iep-goals, plan-intervention-group, prepare-parent-teacher-conference]
  personas: [special-education-advisor]
args:
  - name: goals
    description: The annual goals (and short-term objectives, if any) exactly as written in the plan, numbered.
    type: text
    required: true
  - name: progress_data
    description: The data collected for each goal (dates and scores, probe results, frequency counts, rubric levels, work-sample notes), labelled with the goal number. Use the student's initials.
    type: text
    required: true
  - name: reporting_period
    description: Optional period covered, e.g. "Term 2, January to March" or "second quarter".
    type: string
output_contract:
  format: markdown
  sections: [Summary, Goal progress, Next steps, For team discussion, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A progress report on a support-plan goal should let a parent understand, in a minute, where their child started, where they are now, whether they are on track to meet the goal, and what happens next. Weak reports say "making progress" with no numbers, use jargon, or describe effort rather than the measured skill. Strong ones state the baseline and the latest data in the goal's own measure, describe the trend honestly (including flat or uneven data), give a clear status, and say what the team will keep doing or change. The report is a factual record; decisions about changing goals or services belong to the plan team with the family.
</context>

<task>
Write progress notes{{#reporting_period}} for **{{reporting_period}}**{{/reporting_period}} for these goals.

<goals>
{{goals}}
</goals>

<progress_data>
{{progress_data}}
</progress_data>

1. For each goal, find the baseline (from the goal text or earliest data point), the most recent data, and the target. Compute the change and, where there are at least three data points, describe the trend (rising, flat, falling, variable) and whether the student is on pace to meet the target by the goal date. Show the numbers you used.
2. Assign one status per goal: **Goal met**, **On track**, **Progress, but not yet on track**, **Little or no progress**, or **Not enough data**. Use "Not enough data" when there are fewer than three data points or the data is not in the goal's measure, and say what data is needed.
3. Write a parent-readable note per goal: 3 to 5 sentences, plain language, any term defined in brackets the first time (for example "words correct per minute (how many words read correctly in one minute)"), starting with what the student can now do.
4. Give next steps per goal: what continues, any change in teaching or support the teacher is planning, and how families can help at home if useful.
5. List items for team discussion: goals met early (new goal needed), goals with little progress or not on track (whether to change the instruction, the intensity, or the goal), and any data gaps.
</task>

<constraints>
- Use only the data provided. Never invent scores, dates or observations, and do not round in a way that changes the picture.
- Describe the skill, not the child's character ("reads 62 words correctly per minute", not "is a weak reader"); strengths first, honest about slow progress.
- Do not diagnose, suggest new disability categories, or interpret medical or psychological information.
- Do not decide changes to goals, placement or services; frame them as questions for the team.
- Use the student's initials only, even if the data includes a full name.
- Formats and legal requirements differ by country, state and school; remind the teacher to transfer the notes into the required form.
</constraints>

<output_format>
## Summary
2 or 3 sentences across all goals.
## Goal progress
For each goal: the goal (abbreviated), a line "Baseline → Latest → Target", Status, Trend with the numbers, then the parent-readable note.
## Next steps
Per goal.
## For team discussion
Bullets.
## Data notes
Data gaps, inconsistencies and the local-format reminder.
</output_format>
