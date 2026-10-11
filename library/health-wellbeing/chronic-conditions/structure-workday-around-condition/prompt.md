---
schema: 1
id: structure-workday-around-condition
kind: prompt
title: Structure a workday around a condition
description: Redesigns a working day around the energy and symptom pattern of a long-term condition, placing demanding work in better hours and building in breaks, buffers, commute and evening recovery.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [work-schedule, energy-management, fatigue, remote-work, time-blocking, fluctuating-conditions]
pairs_with:
  prompts: [plan-activity-pacing, work-around-brain-fog, decide-whether-to-disclose-condition]
args:
  - name: pattern
    description: Your condition and how your energy, pain or other symptoms change through a typical day and week (for example "stiff and slow until 11, crash around 3pm, worse on Thursdays and Fridays"), and when you take medicines if relevant.
    type: text
    required: true
  - name: job
    description: Your job, hours, which tasks are hardest (meetings, deep focus, phone calls, physical work, travel), what you control in your calendar, the commute, any adjustments already agreed, and what your evenings look like after work.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your pattern, Matching tasks to hours, Your template day, Your template week, Protecting the edges, What to ask for, Review in two weeks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with long-term conditions arrange the working day they already have, inside what they control, so work stops using up the energy needed for the rest of life. The common pattern is boom and bust at the scale of a week: full days Monday to Wednesday, a crash by Thursday, and evenings and weekends spent recovering. What helps is matching the most demanding work to the hours symptoms are usually lightest (morning stiffness in inflammatory arthritis or a medicine that takes time to work often means later starts suit better), batching meetings, protecting focus blocks, changing posture and task type regularly, keeping a buffer before deadlines, counting the commute as work, and keeping something in reserve for the evening. Adjustments such as a later start or home working may need agreement from the employer; that request is a separate step.

<pattern>
{{pattern}}
</pattern>

<job>
{{job}}
</job>
</context>

<task>
1. Your pattern: summarise their daily and weekly pattern in two or three lines and ask them to correct it.
2. Matching tasks to hours: a table placing each kind of task they mentioned into "best hours", "OK hours" and "avoid if possible", with a one-line reason.
3. Your template day: an hour-by-hour plan for a typical working day within what they control, with breaks and movement or rest built in.
4. Your template week: which days carry the heaviest load, a lighter day or half-day of easier work if possible, and where to put recovery.
5. Protecting the edges: the commute, the first and last hour, lunch, and the evening, with practical ways to keep some energy back.
6. What to ask for: changes that would need agreement (flexible start, home days, meeting-free blocks, a different desk or chair), described plainly so they can raise them later.
7. Review in two weeks: three things to track to see if the new structure helps.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not change medicine timing to suit work; if timing matters, list it as a question for the prescriber.
- Work within what they said they control; label anything needing employer agreement.
- Do not assume they have disclosed their condition at work.
- Avoid filling every freed hour with more work; the goal is sustainability, not productivity.
</constraints>

<output_format>
## Your pattern
## Matching tasks to hours
Table: Task | Best hours | Why.
## Your template day
## Your template week
## Protecting the edges
## What to ask for
## Review in two weeks
</output_format>
