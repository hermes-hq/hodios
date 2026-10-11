---
schema: 1
id: make-time-for-personal-project
kind: prompt
title: Make time for a personal project
description: Finds realistic weekly hours for a side project, course or creative goal around a full-time job and family, cuts the project to fit those hours, and sets a minimum version for busy weeks.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, writer, artist]
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
tags: [side-projects, creative-goals, spare-time, online-course, consistency, minimum-version]
pairs_with:
  prompts: [audit-time-use, plan-my-week, break-down-big-task]
args:
  - name: project
    description: What you want to make time for and what finished or progress looks like (for example "finish a 60-hour online course", "write a novel draft", "learn guitar well enough to play at a family party").
    type: text
    required: true
  - name: week
    description: Your typical week - work hours, commute, caring duties, fixed activities, when you are tired - and any time you already lose to scrolling or TV if you want to count it.
    type: text
    required: true
  - name: deadline
    description: Any date you want to reach it by. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Hours you really have, Weekly slots, Project cut to fit, Busy-week minimum, Protecting the time, First month]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with full lives make steady progress on something of their own. Plans fail when they assume the person's best week (an hour every evening after a draining job) and when the project stays the size of the original dream. What works: find two to four specific, repeatable slots that survive normal weeks, often short ones (early mornings, a lunch break, one weekend block); size the project to those hours and say honestly how long it will take; agree the time with anyone it affects; and keep a tiny minimum version for bad weeks so the streak survives. Consistency beats intensity.

Project:
<project>
{{project}}
</project>

Typical week:
<week>
{{week}}
</week>
{{#deadline}}Target date: {{deadline}}{{/deadline}}
</context>

<task>
1. Map the week and find candidate slots, marking each as reliable or fragile, and the energy level likely in each. Count only reliable slots.
2. Pick two to four weekly slots and total the hours. Do not exceed what the week shows is free without cutting something else; if the user must give something up, name the trade.
3. Estimate the project's total hours (marked as estimate) and the time it takes at the weekly rate. If a target date was given and it does not fit, cut scope: smallest version that still counts as success, then extras later.
4. Match work to slots: hard thinking in the best-energy slot, easy tasks (practice, admin, reading) in tired slots.
5. Set a busy-week minimum (for example ten minutes, one page, one exercise) and a rule for skipped weeks.
6. Give ways to protect the time: tell household or partner, prepare materials in advance, a start ritual, and what to do when work runs over.
7. Plan the first month week by week.
</task>

<constraints>
- Do not take time from sleep below about seven hours or from caring duties; if the only time is there, say so.
- Do not assume motivation will grow; plan for normal tiredness.
- Show the arithmetic from slots to finish date.
- If the project is very large for the time available (for example a 2-year goal at 2 hours a week), say so plainly and offer a smaller milestone.
</constraints>

<output_format>
## Hours you really have
Table: Slot | Day and time | Reliable or fragile | Energy.

## Weekly slots
The chosen slots and total hours.

## Project cut to fit
Total hours (est.), weeks needed, scope cuts if any.

## Busy-week minimum
One or two lines and the skipped-week rule.

## Protecting the time
Bullets.

## First month
Week 1 to 4, one or two targets each.
</output_format>
