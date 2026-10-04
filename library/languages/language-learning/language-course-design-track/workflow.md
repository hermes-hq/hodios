---
schema: 1
id: language-course-design-track
kind: workflow
title: Design a language course
description: Designs a language course in gated steps, from a needs analysis of the learners' real situations to CEFR can-do goals, a unit-by-unit syllabus, one sample lesson and an assessment plan.
category: language-learning
version: 1.0.0
status: incubating
stage: [discover, plan, design, build, verify]
role: [teacher, manager]
requires: [none]
inputs: [notes, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [needs-analysis, syllabus-design, cefr, can-do-statements, course-planning, assessment-plan]
pairs_with:
  prompts: [build-placement-test-for-intake, write-speaking-assessment-rubric, plan-task-based-language-lesson, plan-vocabulary-recycling-across-unit]
  personas: [language-assessment-specialist, language-teacher-trainer]
args:
  - name: target_language
    description: The language the course teaches, with the variety if it matters.
    type: string
    required: true
  - name: learners_and_constraints
    description: Who the learners are, why they are learning, their level(s), group size, where and how the course runs (in person, online), budget or materials, and any exam or funder requirements. Rough notes are fine.
    type: text
    required: true
  - name: course_length
    description: Total length and rhythm (for example "12 weeks, 2 x 90 minutes a week").
    type: string
    required: true
steps:
  - {id: needs, file: steps/01-needs-analysis.md, stage: discover, gate: approve, artifact: "course/01-needs-analysis.md"}
  - {id: goals, file: steps/02-can-do-goals.md, stage: plan, gate: approve, artifact: "course/02-can-do-goals.md"}
  - {id: syllabus, file: steps/03-syllabus.md, stage: design, gate: approve, artifact: "course/03-syllabus.md"}
  - {id: sample-lesson, file: steps/04-sample-lesson.md, stage: build, gate: approve, artifact: "course/04-sample-lesson.md"}
  - {id: assessment, file: steps/05-assessment-plan.md, stage: verify, gate: none, artifact: "course/05-assessment-plan.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Designs a {{target_language}} course the way an experienced course designer would: start from what these learners must do with the language in their real lives, turn that into can-do goals at realistic levels, build a syllabus that recycles language, test the design with one full lesson, and plan how progress will be shown. Each step writes one artifact and stops for approval; later steps build on what was approved.

<learners_and_constraints>
{{learners_and_constraints}}
</learners_and_constraints>

Course length: {{course_length}}

Rules for every step:
- Use only facts the user gave or confirmed. Ask for missing essentials (level, hours, why learners are learning) and mark gaps as [X].
- Keep goals realistic for the hours available; say plainly when a goal will not fit, and propose what to drop.
- Do not invent exam rules, funder requirements or official level descriptors; say what to check with the exam board or funder.
- Write original materials; do not reproduce coursebook or exam content.
- Treat learners as capable adults or young people with their own goals; avoid stereotypes about any group.
- End each artifact with open questions.
