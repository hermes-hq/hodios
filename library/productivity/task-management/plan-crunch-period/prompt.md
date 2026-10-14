---
schema: 1
id: plan-crunch-period
kind: prompt
title: Plan for a known crunch period
description: Prepares for a known busy stretch such as a launch, exam season, tax season or a big event, by front-loading tasks, pausing what can wait, setting minimum routines and planning the recovery after.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, student, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [busy-season, peak-workload, minimum-routines, front-loading, recovery-plan]
pairs_with:
  prompts: [plan-my-week, juggle-competing-deadlines, plan-burnout-recovery]
args:
  - name: crunch
    description: What the crunch is, its dates, how many hours a week you expect to work during it, and what usually goes wrong for you in busy times.
    type: text
    required: true
  - name: life
    description: Everything else that has to keep going (family, pets, bills, health, relationships, other projects), who can help, and how many weeks you have to prepare.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before it starts, Pause or hand off, Minimum routines, During the crunch, Warning signs, After it ends]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people get through a predictable crunch the way someone who has run many launches, audits or exam seasons would. Known busy stretches go badly for the same reasons: life admin piles up and lands as a crisis mid-crunch, sleep and food go first, people stop telling family and friends what is coming, and there is no plan to recover so the next stretch starts depleted. The fix is preparation: do the predictable chores and admin early, pause or hand off what can wait, agree minimum versions of routines (meals, sleep, movement, one call home) that are easy to keep, warn the people around you, and book the recovery before the crunch starts. Minimum routines beat ambitious ones because they survive bad weeks.

<crunch>
{{crunch}}
</crunch>

<life>
{{life}}
</life>
</context>

<task>
1. Before it starts: a checklist of what to do in the preparation weeks, ordered by date (bills and renewals that fall in the crunch, appointments to move, food in the freezer, birthdays and gifts, a tidy desk and task list, telling people).
2. Pause or hand off: commitments and projects to pause, shrink or hand to someone during the crunch, with short messages for anyone affected.
3. Minimum routines: the smallest version of sleep, food, movement, connection and household chores they will protect, specific enough to follow when tired.
4. During the crunch: a simple weekly shape (work hours cap, one half-day off if possible, a 15-minute weekly check), and how to handle new requests ("after the date").
5. Warning signs: their personal signs that the crunch is costing too much (from what usually goes wrong), with a pre-agreed response for each.
6. After it ends: recovery time booked in the calendar, a catch-up session for parked items, and a short review of what to do differently next time.
</task>

<constraints>
- Do not normalise unsafe hours; if the expected hours are extreme, say so and suggest raising workload with a manager, tutor or client.
- Use only helpers and resources they named.
- Keep routines realistic for a tired person; no ambitious new habits during the crunch.
- If they mention symptoms of burnout, panic or exhaustion that already affect daily life, suggest talking to a doctor or a mental health professional, kindly and without diagnosing.
</constraints>

<output_format>
## Before it starts
Checklist with dates.
## Pause or hand off
Table: Item | Pause, shrink or hand off | Message needed?
## Minimum routines
## During the crunch
## Warning signs
Table: Sign | What we do
## After it ends
</output_format>
