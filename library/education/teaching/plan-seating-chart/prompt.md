---
schema: 1
id: plan-seating-chart
kind: prompt
title: Plan a classroom seating chart
description: Plans a seating chart from the room layout and student notes on needs, separations, language partners and behaviour, with the reason for each placement and a rotation plan.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [seating-plan, classroom-layout, behaviour-management, inclusion]
pairs_with:
  prompts: [design-classroom-management-plan, form-balanced-student-groups, write-class-handover-notes]
args:
  - name: layout
    description: The room layout, e.g. "6 tables of 4 in 2 rows of 3, board at front, door back-left, window side right" or "5 rows of 6 single desks".
    type: text
    required: true
  - name: students
    description: Student list with first names or initials and relevant notes (needs front seat for hearing, separate from X, Spanish speaker needs a buddy, left-handed). Share only what the seating needs.
    type: text
    required: true
  - name: goal
    description: Optional priority for this chart, e.g. "calmer start after half term", "more peer support in maths", "new class, first chart".
    type: string
output_contract:
  format: markdown
  sections: [Constraints applied, Seating chart, Placement reasons, Conflicts and trade-offs, Rotation and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Seating is one of the cheapest behaviour and learning tools a teacher has. Experienced teachers place the hard constraints first (medical, sensory, physical access, support plans that specify seating), then separations, then learning partnerships (a supportive partner for a student new to the language, mixed attainment pairs for discussion), and only then preferences. Students who find focus hard usually do better near the teacher's natural path, not isolated at the front; students with hearing or visual needs need a line of sight to the teacher and the board, away from noisy doors or glare. Charts work better when they are presented as the normal arrangement, not a punishment, and when they are reviewed after a few weeks.
</context>

<task>
Plan a seating chart for this room and class.
<layout>
{{layout}}
</layout>
<students>
{{students}}
</students>
{{#goal}}
Goal: {{goal}}
{{/goal}}

1. Sort the notes into hard constraints (access, medical, sensory, support-plan requirements), separations, partnerships and preferences. List them.
2. Place students in that priority order and draw the chart as a grid or table that matches the layout, with the front of the room marked.
3. For each student with a note, give a one-line reason for the placement. For students without notes, a reason is not needed.
4. Report any constraint that could not be met and the trade-off chosen, so the teacher can decide.
5. Suggest a rotation and review plan: when to review (e.g. after 3 weeks), what to watch for, and how to introduce the chart to the class calmly.
</task>

<constraints>
- Use only the identifiers given; do not add new information or labels about students.
- Never place students in a way that singles them out publicly (an isolated desk as punishment) unless the teacher's notes require it, and then say why it may backfire.
- Every student in the list appears exactly once; count them and check against the number of seats. If seats and students do not match, say so.
- Keep notes about students factual and minimal in the output; the chart may be seen by cover teachers.
</constraints>

<output_format>
## Constraints applied
Hard constraints · Separations · Partnerships · Preferences.
## Seating chart
A grid or table matching the room, front marked.
## Placement reasons
Student → reason.
## Conflicts and trade-offs
Bullets, or "None".
## Rotation and review
Bullets.
</output_format>
