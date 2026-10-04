---
schema: 1
id: plan-mixed-age-class-lesson
kind: prompt
title: Plan a mixed-age class lesson
description: Plans one lesson for a mixed-age or multi-grade class with a shared opener, year-group tasks that run without the teacher, a teacher-time rotation and a shared plenary.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, topic]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [multi-grade, small-schools, rural-schools, independent-work, rolling-programme]
pairs_with:
  prompts: [differentiate-lesson, design-station-rotation, write-teaching-assistant-briefing]
args:
  - name: subject_and_topic
    description: Subject and the topic or concept for this lesson, e.g. "science - forces and friction".
    type: string
    required: true
  - name: year_groups
    description: The year groups or ages in the class, how many pupils in each, the curriculum objective for each group if known, and any pupils with additional needs (initials only).
    type: text
    required: true
  - name: lesson_minutes
    description: Lesson length in minutes.
    type: number
    default: 60
  - name: other_adults
    description: Optional. Any teaching assistant or volunteer in the room and when.
    type: string
output_contract:
  format: markdown
  sections: [Lesson overview, Shared opener, Group tasks, Teacher time rotation, Shared plenary, Coverage notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher in a small or rural school teaches several year groups in one room. The usual traps: planning separate lessons for every year group and running between them so no group gets real teaching; pitching everything at the middle so the oldest coast and the youngest are lost; and relying on older pupils as unpaid helpers. A strong mixed-age lesson shares one big idea, gives each group work it can do without the teacher for 10 to 15 minutes, and plans deliberately where the teacher's direct time goes.

Subject and topic: {{subject_and_topic}}
Lesson length: {{lesson_minutes}} minutes
{{#other_adults}}Other adults: {{other_adults}}{{/other_adults}}
</context>

<task>
<year_groups>
{{year_groups}}
</year_groups>

1. Name one shared big idea or question for the whole class, then a specific objective for each year group, from the objectives given or, if none, a suggested objective marked [check against your curriculum].
2. Shared opener (about 10 minutes): a hook or retrieval that everyone can enter, with questions aimed at each group by name of the group.
3. Group tasks: for each group, a task with a clear success criterion, the resources, what to do when stuck (a help card, a worked example, ask three before me) and what to do when finished. Each task must run without the teacher for at least 10 minutes.
4. Teacher time rotation: a minute-by-minute table showing where the teacher (and any other adult) is. Start direct teaching with the group meeting new content; never leave the youngest group longest without an adult.
5. Shared plenary: each group contributes to the big idea, with one check of each group's objective.
6. Coverage notes: how this lesson fits a two-year rolling programme or cycle (if the class uses one), and what each group misses or repeats, so the teacher can track coverage.
</task>

<constraints>
- Ask for the year groups and numbers if missing; do not assume them.
- Do not invent curriculum objectives as fact; mark suggestions [check against your curriculum].
- Older pupils may explain to younger ones as part of their own learning (explaining is valuable), but never as a replacement for teaching or for most of the lesson.
- Timings must add up to {{lesson_minutes}} minutes.
- Name additional needs only by initials and only as given.
</constraints>

<output_format>
## Lesson overview
Big idea, then a table: Group | Pupils | Objective | Success criterion.

## Shared opener
Steps with timings and targeted questions.

## Group tasks
One sub-heading per group: task, resources, when stuck, when finished.

## Teacher time rotation
Table: Minutes | Teacher | Other adult | Group A | Group B | Group C (one column per group).

## Shared plenary
Steps and the check for each group.

## Coverage notes
Bullets.
</output_format>
