---
schema: 1
id: write-weekly-lesson-plan
kind: prompt
title: Write a weekly lesson plan
description: Writes a week of lessons for one class as a sequence, with daily objectives, activities, assessment checkpoints, homework and materials, filled into the teacher's required template.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, document, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [weekly-planning, lesson-sequence, planning-template, lesson-design]
pairs_with:
  prompts: [write-lesson-plan, design-unit-plan, align-lesson-to-standards]
args:
  - name: topic
    description: What the class is learning this week, and where it sits in the unit, e.g. "week 2 of fractions, adding and subtracting like denominators".
    type: string
    required: true
  - name: grade_level
    description: Grade, age or course.
    type: string
    required: true
  - name: schedule
    description: Days and lesson lengths this week, including interruptions, e.g. "Mon–Thu 55 min, Friday assembly so 35 min".
    type: string
    required: true
  - name: template
    description: Optional headings or fields your school requires (paste them). Without them, a standard weekly format is used.
    type: text
  - name: standards
    description: Optional standards or objectives the week must cover.
    type: text
output_contract:
  format: markdown
  sections: [Week overview, Weekly plan, Assessment checkpoints, Materials and preparation, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A weekly plan is a sequence, not five separate lessons: each day builds on the last, ideas are revisited, and there is a planned checkpoint mid-week so Thursday and Friday can respond to what students actually learned. Many schools require weekly plans in a fixed template for administrators, so the plan must fit the required fields exactly while still being useful to teach from. Common weaknesses: every day is the same lesson shape, no time for practice or reteaching, objectives copied from standards without being made teachable, and timings that ignore the real timetable.
</context>

<task>
Write a week of lessons on **{{topic}}** for **{{grade_level}}**. Schedule: {{schedule}}.
{{#standards}}
<standards>
{{standards}}
</standards>
{{/standards}}
{{#template}}
Fill this required template exactly, field for field:
<template>
{{template}}
</template>
{{/template}}

1. Write the week's goal and how the days progress (introduce, practise, apply, check, consolidate or reteach).
2. For each day give: objective (measurable) and success criteria, a do-now or retrieval opener, the main teaching and activity with key questions, practice, a check for understanding, closure, homework if any, and differentiation notes. Match each day's length to the schedule.
3. Place one formal checkpoint mid-week (a short quiz or exit ticket) and say how its results change the rest of the week: what to reteach and to whom.
4. Plan Friday (or the last day) as consolidation or flexible reteach, not new content, unless the teacher's schedule says otherwise.
5. List materials and preparation for the whole week, by day.
6. If a template was given, use its fields and order exactly; put anything that does not fit in Assumptions rather than adding fields.
</task>

<constraints>
- Timings per day must fit the schedule given, including shortened days.
- Do not cite standard codes unless given; describe the content instead.
- Write the actual key questions and example problems or prompts, not "teacher explains".
- Keep it scannable: a teacher should be able to read a day in under a minute.
</constraints>

<output_format>
## Week overview
Goal, progression, standards.
## Weekly plan
If a template was given, the template filled in. Otherwise a table: Day | Objective | Opener | Main activity | Check | Homework | Differentiation, then key questions and examples by day below it.
## Assessment checkpoints
The mid-week check and how results change later days.
## Materials and preparation
By day.
## Assumptions
What was assumed.
</output_format>
