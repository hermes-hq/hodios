---
schema: 1
id: design-station-rotation
kind: prompt
title: Design a station rotation lesson
description: Designs a station rotation lesson with a task card for each station, timing, grouping, materials, transition routines and a teacher-led station that differs by group.
category: teaching
version: 1.0.0
status: incubating
stage: [design]
role: [teacher]
requires: [none]
inputs: [topic, notes]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [station-rotation, small-group-instruction, blended-learning, classroom-routines, grouping]
pairs_with:
  prompts: [differentiate-lesson, design-classroom-activity, create-choice-board, design-formative-assessment]
  personas: [instructional-coach]
args:
  - name: objective
    description: What all students should be able to do by the end, e.g. "find the area of composite rectilinear shapes" or "identify the main idea and two supporting details in an informational text".
    type: text
    required: true
  - name: grade_level
    description: Grade, year or age, plus anything useful about the class, e.g. "Grade 4, 28 students, 6 laptops".
    type: string
    required: true
  - name: stations
    description: Number of stations (and therefore groups).
    type: number
    default: 4
  - name: minutes
    description: Total lesson length in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Overview and timing, Groups, Station cards, Teacher station by group, Rotation schedule, Materials, Routines, Closure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Station rotation earns its complexity for one reason: it lets the teacher work with a small group at a time while everyone else practises productively. It fails when independent stations need the teacher (so the teacher station is constantly interrupted), when stations are busywork unrelated to the objective, when transitions eat ten minutes, or when the teacher station is the same lesson repeated to every group. A well-designed rotation has groups formed from recent evidence, independent tasks students can complete and self-check without help, a visible product at every station, a tight transition routine, and a teacher station planned separately for each group's needs.
</context>

<task>
Design a {{stations}}-station rotation lesson of {{minutes}} minutes for **{{grade_level}}** with the objective:

<objective>
{{objective}}
</objective>

1. Do the timing maths first: a launch (about 5 minutes), {{stations}} rotations, transitions (about 1 minute each), and closure (about 5 minutes). Show the calculation and the minutes per station. If the result is under 8 minutes per station, say that the rotation is too fragmented and recommend fewer stations or splitting the rotation across two days, then plan the better option.
2. Propose how to form groups from evidence (a pre-check or the last exit ticket) and describe each group's profile, for example "secure", "nearly there", "needs reteach of prerequisite", without labelling students publicly. Suggest a neutral name for each group (colours, shapes).
3. Design each station, all aligned to the objective:
   - One teacher-led station.
   - Independent or collaborative stations that practise, apply or extend the objective in different ways (for example guided practice with an answer key, a hands-on or visual task, a partner discussion or game, a short digital or reading task).
   For each independent station, write a student-facing task card: the goal in one line, numbered steps, what to produce, how to check their own work, and what to do when stuck or finished. Choose tasks students can do without the teacher.
4. Plan the teacher station separately for each group: the starting point, the questions or examples used, and the quick check that ends it. The group needing the most support should meet the teacher first, if possible, so they practise afterwards.
5. Give the rotation schedule as a table so every group visits every station.
6. List materials per station and anything to prepare in advance.
7. Write the routines: the signal to rotate, the transition (who moves, what is left behind, a 60-second target), noise level per station, how students get help without interrupting the teacher (ask three before me, a help card).
8. Close with a whole-class check against the objective and how the results form tomorrow's groups.
</task>

<constraints>
- Every station serves the objective; no filler colouring or unrelated games.
- Use only materials typical for the classroom described. If technology is not mentioned, plan at most one device station and give a no-device alternative.
- Make the task cards readable for {{grade_level}}: short sentences, numbered steps.
- If the objective is unclear or too large for one lesson, narrow it and say how in the Overview.
</constraints>

<output_format>
## Overview and timing
The objective, assumptions, and the timing calculation.
## Groups
How to form them and each group's profile.
## Station cards
One subsection per station with the student-facing task card.
## Teacher station by group
One block per group: focus, examples or questions, quick check.
## Rotation schedule
Table: Time | Group A | Group B | … with station names.
## Materials
Per station.
## Routines
Signal, transitions, getting help, early finishers.
## Closure
Whole-class check and how it feeds the next lesson.
</output_format>
