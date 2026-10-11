---
schema: 1
id: plan-my-month
kind: prompt
title: Plan my month
description: Builds a forward plan for the coming month from deadlines, events and goals - a weekly focus, busy weeks spotted early, prep pulled forward and what will not happen this month.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, manager, student, parent]
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
tags: [monthly-planning, month-ahead, weekly-focus, deadlines, busy-weeks, forward-planning]
pairs_with:
  prompts: [plan-my-week, run-monthly-review, plan-personal-quarter]
args:
  - name: month
    description: Which month, and the dates if it matters (for example "November, starting Monday 3rd").
    type: string
    required: true
  - name: fixed
    description: Deadlines, events, travel, appointments, birthdays and anything else already fixed this month, with dates.
    type: text
    required: true
  - name: goals
    description: What you want to move forward this month at work and outside it, with any monthly targets. Optional.
    type: text
  - name: capacity
    description: Your normal working week and anything unusual (leave, visitors, school holidays). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Month at a glance, Three outcomes, Week by week, Pull forward, Not this month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan a month ahead so the busy weeks are seen coming. Weekly plans alone miss the shape of a month: three deadlines and a trip crowd into one week while the week before is quiet, birthdays and renewals arrive as surprises, and goals get pushed every week because each week has its own urgent work. A month plan makes the shape visible, gives each week one main focus, pulls preparation for crowded weeks into the lighter ones, and decides at the start what will not happen this month so it stops nagging.

Month: {{month}}

Fixed this month:
<fixed>
{{fixed}}
</fixed>
{{#goals}}Goals: {{goals}}{{/goals}}
{{#capacity}}Capacity: {{capacity}}{{/capacity}}
</context>

<task>
1. Lay the fixed items on the calendar by week and rate each week's load (light, normal, heavy) from them and from any capacity notes.
2. Choose three outcomes that would make the month a success, from deadlines and goals.
3. Give each week one main focus and its key items, placing goal work in the lighter weeks.
4. List preparation to pull forward from heavy weeks into lighter ones (gifts before a birthday, slides before a conference, packing before a trip, bookings that fill up).
5. List what will not happen this month and when it will be looked at again.
6. Add a five-minute check for the start of each week to adjust the plan.
</task>

<constraints>
- Use only the dates the user gave; do not invent events, holidays or deadlines. If the month's dates are unclear, state the assumption about which weekday the month starts on.
- Keep heavy weeks lighter on new commitments; do not schedule goal work in them.
- Keep the plan at week level; it is not a daily timetable.
- If the user lists more goals than the month can hold, pick and say what moves to next month.
</constraints>

<output_format>
## Month at a glance
Table: Week (dates) | Fixed items | Load.

## Three outcomes
1 to 3, one line each.

## Week by week
One heading per week: focus, key items.

## Pull forward
Table: Prep task | Do in week | Because.

## Not this month
Bullets with a review date. Then the weekly five-minute check.
</output_format>
