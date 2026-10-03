---
schema: 1
id: plan-co-teaching
kind: prompt
title: Plan a co-taught lesson
description: Plans a co-taught lesson by choosing a co-teaching model, splitting both teachers' roles minute by minute and planning support for students with additional needs.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [co-teaching, inclusion, special-education, collaboration, small-group-instruction]
pairs_with:
  prompts: [differentiate-lesson, design-station-rotation, write-lesson-plan]
  personas: [special-education-advisor]
args:
  - name: lesson_objective
    description: What students should be able to do by the end of the lesson, e.g. "write a thesis statement for a literary analysis essay".
    type: text
    required: true
  - name: teachers
    description: Who is co-teaching and their strengths, e.g. "Ms A, science teacher; Mr B, special education teacher, strong at breaking down tasks; first term together".
    type: text
    required: true
  - name: student_needs
    description: Optional needs in the class, without names, e.g. "6 students with IEPs for reading, 2 with attention needs, 4 multilingual learners".
    type: text
  - name: minutes
    description: Lesson length in minutes.
    type: number
    default: 50
output_contract:
  format: markdown
  sections: [Model choice, Lesson flow, Support for additional needs, Data to collect, Co-planning checklist, Debrief]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Co-teaching puts two qualified adults in one classroom, usually a subject teacher and a specialist such as a special education or language-support teacher. It pays off only when both adults are teaching. The most common pattern, "one teach, one assist", leaves the specialist circling the room as a helper and is the least effective use of two teachers when it becomes the default. The six common models are: one teach, one observe; one teach, one assist; station teaching; parallel teaching (the class split in two, same content); alternative teaching (one teacher takes a small group for pre-teaching, reteaching or enrichment); and team teaching (both lead together). The choice should follow the lesson's purpose and the students' needs, and can change within a lesson. Both teachers need visible, equal roles so students see two teachers, not a teacher and a helper.
</context>

<task>
Plan a {{minutes}}-minute co-taught lesson for this objective:

<lesson_objective>
{{lesson_objective}}
</lesson_objective>

<teachers>
{{teachers}}
</teachers>
{{#student_needs}}
<student_needs>
{{student_needs}}
</student_needs>
{{/student_needs}}

1. **Model choice:** choose the co-teaching model or models for each part of the lesson and justify each choice in one or two lines with reference to the objective, the needs and the teachers' strengths. Avoid one teach, one assist as the main model unless you explain why it is the best option here.
2. **Lesson flow:** a minute-by-minute table where both teachers have an active role in every phase. Include what each teacher says or does, what students do, the grouping, and where each adult stands.
3. **Support for additional needs:** for each need described, the specific support built into the lesson (pre-teaching, a modified organiser, chunked instructions, a check-in, a sensory break plan), which teacher provides it, and when. Supports should happen inside the lesson flow, not by removing students for long periods.
4. **Data to collect:** what each teacher records during the lesson (for example one teacher records responses to the hinge question; the other notes which students used the organiser), and how it will be used to plan the next lesson.
5. **Co-planning checklist:** the decisions the two teachers must agree beforehand: signals, who handles behaviour, who grades what, how they talk to each other in front of the class, materials, and how each introduces themselves as a teacher of all students.
6. **Debrief:** 3 or 4 questions for a 5-minute debrief after the lesson.
7. Timings in the lesson flow must add up to exactly {{minutes}} minutes.
</task>

<constraints>
- Both teachers have parity: both lead instruction at some point, and the specialist is not used only for students with plans.
- Groupings are flexible and based on the lesson's data, not fixed by label; avoid a permanent "special group" at the back.
- Respect confidentiality: no student names, and no discussion of individual plans in front of the class.
- If the teacher information or objective is too vague to plan meaningfully, state your assumptions at the top.
</constraints>

<output_format>
## Model choice
Phase → model → why.
## Lesson flow
Table: Minutes | Phase | Model | Teacher 1 | Teacher 2 | Students | Grouping.
## Support for additional needs
Table: Need | Support | Who | When.
## Data to collect
Bullets per teacher.
## Co-planning checklist
Checklist.
## Debrief
Questions.
</output_format>
