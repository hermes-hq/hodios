---
schema: 1
id: plan-guided-math-group
kind: prompt
title: Plan guided maths groups
description: Plans small-group maths teaching from assessment data, with groups, a focused task and manipulatives per group, independent rotations, teacher prompts and quick checks.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [dataset, notes]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [mathematics]
tags: [guided-math, small-group-instruction, manipulatives, maths-rotations]
pairs_with:
  prompts: [analyze-class-assessment-results, design-station-rotation, plan-concrete-pictorial-abstract-lesson]
args:
  - name: topic
    description: The maths skill or standard, e.g. "two-digit subtraction with regrouping".
    type: string
    required: true
  - name: grade_level
    description: Grade or age.
    type: string
    required: true
  - name: assessment_data
    description: Results from a pre-assessment or exit tickets, by student (first names or initials) with scores or notes on errors.
    type: text
    required: true
  - name: block_minutes
    description: Length of the maths block in minutes.
    type: number
    default: 60
output_contract:
  format: markdown
  sections: [Groups, Group lessons, Independent rotations, Schedule, Quick checks and regrouping]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Guided maths groups work when groups are formed on what students currently can and cannot do on the specific skill, not on a general "low, middle, high" label, and when groups change as soon as the data changes. Each teacher-led group gets 10 to 15 minutes with a tight focus: the struggling group often needs concrete materials and a step back to the prerequisite skill, the on-track group needs guided practice with the representation moving from pictures to symbols, and the ready group needs reasoning and problem solving, not just more of the same at higher numbers. Rotations fail when independent tasks are too hard to do without the teacher, or are busywork that keeps students quiet.
</context>

<task>
Plan guided maths groups for **{{topic}}** in **{{grade_level}}**, in a {{block_minutes}}-minute block, from this data.
<assessment_data>
{{assessment_data}}
</assessment_data>

1. Read the data for error patterns, not only scores (e.g. regrouping from the wrong place, subtracting smaller from larger in each column). Name the patterns.
2. Form 3 or 4 groups by need, listing students by the identifiers given, with a one-line reason per group. Flag students the data does not clearly place and how to check them.
3. For each group plan a 10 to 15 minute teacher-led lesson: the focus, manipulatives or representations (concrete, pictorial, abstract), a short sequence with the exact problems, the questions to ask, the misconception to address, and a one- or two-item quick check at the end.
4. Plan 2 or 3 independent rotations students can do without help (practice at their level, a maths game, a fluency or reasoning task), with how they know they are done and what to do if stuck.
5. Lay out a rotation schedule for the block, including transitions, so each group meets the teacher at least once and the timings add to {{block_minutes}}.
6. Explain how to use the quick checks to regroup next lesson.
</task>

<constraints>
- Base groups only on the data given; do not invent scores or notes. If the data is too thin to group well, say what to collect.
- Use the student identifiers exactly as given; do not add labels about ability in student-facing materials.
- Problems and answers must be correct and at the right level; show the answers.
- Independent tasks must be doable without the teacher.
</constraints>

<output_format>
## Groups
Error patterns, then groups with students and reasons; students to check.
## Group lessons
One subsection per group: focus, materials, sequence with problems, questions, misconception, quick check with answers.
## Independent rotations
Each rotation: task, done when, if stuck.
## Schedule
A table: Time | Teacher table | Rotation A | Rotation B | Rotation C, adding to {{block_minutes}}.
## Quick checks and regrouping
How to use the results.
</output_format>
