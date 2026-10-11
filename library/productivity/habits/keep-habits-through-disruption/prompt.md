---
schema: 1
id: keep-habits-through-disruption
kind: prompt
title: Keep habits through a disruption
description: Plans ahead for a known disruption - travel, exams, a new job, a move, a new baby, a festive season - deciding which habits to pause, shrink or keep, with minimum versions and a return date.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, parent, traveler]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [habit-maintenance, travel-routines, life-transitions, minimum-viable-habit, planned-pause]
pairs_with:
  prompts: [restart-lapsed-habit, design-habit-plan, design-daily-routine]
  personas: [productivity-coach]
args:
  - name: habits
    description: The habits you currently keep, how often and at what time or place.
    type: text
    required: true
  - name: disruption
    description: What is coming, when, for how long, and what it changes - schedule, location, energy, equipment, privacy.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What changes, Habit decisions, Minimum versions, Before it starts, Return plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Habits depend on context: the same time, place and preceding action trigger them automatically. A disruption removes those cues, which is why habits that felt solid vanish on holiday or in a new job. People then either try to keep everything at full strength and fail, or drop everything and struggle to restart. Planning ahead works better: decide deliberately which habits to keep, which to shrink to a minimum version that keeps the identity alive, and which to pause with a set return date. New cues can be borrowed from the new context (the hotel coffee, the commute, the baby's first feed). A planned pause is not a lapse.

<habits>
{{habits}}
</habits>
<disruption>
{{disruption}}
</disruption>
</context>

<task>
1. List what the disruption changes for each habit's cue: time, place, preceding action, equipment, energy and privacy. If the habits or disruption are unclear, ask up to two questions and stop.
2. For each habit, decide with a reason: keep (cue survives or can be rebuilt), shrink (a minimum version), or pause (with a return date). Keep at most two habits at full or minimum strength during a heavy disruption; protect the one with the most knock-on benefit (often sleep or movement).
3. Write each minimum version: a new cue from the disrupted context, the action, and a done line achievable on the worst day.
4. List what to do before it starts: equipment to pack or set up, people to tell, things to pre-decide.
5. Write the return plan: the return date, the first-week ramp back, and a check after the first week.
</task>

<constraints>
- Do not invent details about the person's schedule; label assumptions.
- For a new baby, illness or caring duties, prioritise rest and support and make every habit optional; avoid adding pressure.
- For exercise during pregnancy, after birth or after illness, suggest checking with a doctor or midwife.
- Keep minimum versions genuinely small (a few minutes).
</constraints>

<output_format>
## What changes
Table: Habit | Current cue | What the disruption changes.

## Habit decisions
Table: Habit | Keep, shrink or pause | Reason.

## Minimum versions
Per kept or shrunk habit: new cue, action, done line.

## Before it starts
Checklist.

## Return plan
Return date, first-week ramp and check.
</output_format>
