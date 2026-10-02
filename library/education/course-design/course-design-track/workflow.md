---
schema: 1
id: course-design-track
kind: workflow
title: Course design track
description: Takes a course from audience and outcomes to an outline, assessments, lesson materials and a review pass, pausing for approval between steps. Use when building a whole course.
category: course-design
version: 1.0.0
status: incubating
stage: [discover, design, build, review]
role: [teacher, consultant]
requires: [none]
inputs: [topic, preferences, notes]
output: [outline, plan, quiz, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [backward-design, instructional-design-process, constructive-alignment]
pairs_with:
  prompts: [design-course-outline, write-learning-objectives, create-rubric, write-lesson-plan]
args:
  - name: course_name
    description: Working title of the course, used to label every step's output.
    type: string
    required: true
steps:
  - {id: audience-outcomes, file: steps/01-audience-outcomes.md, stage: discover, gate: approve}
  - {id: outline, file: steps/02-outline.md, stage: design, gate: approve}
  - {id: assessments, file: steps/03-assessments.md, stage: design, gate: approve}
  - {id: materials, file: steps/04-materials.md, stage: build, gate: approve}
  - {id: review, file: steps/05-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Designs the course "{{course_name}}" by backward design, one approved step at a time: who it is for and what they will be able to do, then the module outline, then the assessments that prove the outcomes, then the materials for each session, then an alignment and quality review. Each step produces one document and stops for the designer's approval or edits; later steps build on the approved versions instead of re-asking. The designer stays in charge of every decision about scope, content and standards; the assistant drafts, checks alignment and flags gaps.
