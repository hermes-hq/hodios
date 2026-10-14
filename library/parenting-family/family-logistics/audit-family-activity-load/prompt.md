---
schema: 1
id: audit-family-activity-load
kind: prompt
title: Audit the family's activity load
description: Audits all the children's clubs and lessons together for hours, driving, cost and clashes, and helps the family decide what to keep, swap or drop so the week has room to breathe.
category: family-logistics
version: 1.0.0
status: incubating
stage: [review]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [after-school-clubs, overscheduling, family-time, driving-time, activity-costs, weekly-load]
pairs_with:
  prompts: [choose-extracurricular-activities, coordinate-family-calendar, plan-school-run-carpool]
args:
  - name: activities
    description: Every regular club, lesson or practice for each child with day, time, location, travel time, cost and who drives.
    type: text
    required: true
  - name: family
    description: Children's ages, adults' work hours, and what feels wrong, for example "we eat dinner in the car three nights a week".
    type: text
    required: true
  - name: priorities
    description: What the family wants to protect, for example "one free weekend day, dinner together 4 nights, under 300 a month". Optional.
    type: text
output_contract:
  format: markdown
  sections: [The load in numbers, Pressure points, Each activity weighed, Options, A lighter week, Talking to the children]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a family that feels overstretched look at all the children's activities at once. Each club usually made sense when it was added; the problem is the total: hours of driving, dinners in the car, a parent who never has an evening, siblings dragged to waiting rooms, and costs that crept up. Families rarely add up the real numbers (activity hours plus travel plus waiting, per adult, per week) and they tend to cut the wrong thing: the activity the child loves instead of the one that costs the most driving. A good audit counts first, then weighs each activity by what the child gets from it against what the family pays in time, money and stress, and treats the child's voice as a real input.

<activities>
{{activities}}
</activities>
<family>
{{family}}
</family>
{{#priorities}}Priorities: {{priorities}}{{/priorities}}
</context>

<task>
1. The load in numbers: total per week, per child and per adult: activity hours, driving and waiting hours, evenings out, monthly cost, and family dinners lost. Show the sums.
2. Pressure points: the specific days and times where the week breaks: back-to-back pickups, siblings waiting, late bedtimes on school nights, a single adult doing most of the driving.
3. Each activity weighed: for each, rate what the child gets (joy, friends, skill, commitment to a team) against the cost in time, money and stress, noting where you need the child's view.
4. Options: for the heaviest items, offer alternatives before cutting: a closer venue, a carpool, moving to a day that stacks with a sibling's, pausing for a term, a cheaper version, or dropping. Check each option against the priorities.
5. A lighter week: one or two redesigned weekly schedules that meet the priorities, with the new totals.
6. Talking to the children: how to involve each child in the decision by age, including how to let a child stop something without it feeling like failure, and keeping commitments to a team until a natural break such as the end of a season.
</task>

<constraints>
- Do not judge the family for the number of activities; work from their priorities.
- Do not invent venues, prices or timetables; use what is given.
- Treat the child's view as an input to collect, not something to override silently.
- Check the sums: totals must add up from the inputs.
</constraints>

<output_format>
## The load in numbers
Table: Child or adult | Activity hours | Travel and waiting | Evenings out | Monthly cost.
## Pressure points
## Each activity weighed
Table: Activity | Child gets | Costs the family | Verdict to discuss.
## Options
## A lighter week
Table: Day | Child | Activity | Driver, then new totals.
## Talking to the children
</output_format>
