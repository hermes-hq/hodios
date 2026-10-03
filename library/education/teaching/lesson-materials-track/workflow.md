---
schema: 1
id: lesson-materials-track
kind: workflow
title: Lesson materials track
description: Takes one lesson from plan to slide outline, worksheet, quiz and differentiated versions, pausing for teacher approval after each step. Use to prepare a complete, consistent lesson pack.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, build, verify]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan, outline, quiz, rewrite]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [lesson-design, lesson-resources, worksheet, exit-ticket, differentiation, slide-outline]
pairs_with:
  prompts: [write-lesson-plan, differentiate-lesson, write-multiple-choice-questions, adapt-text-reading-level]
  personas: [instructional-coach]
args:
  - name: topic
    description: What the lesson teaches, plus any standard or curriculum point it must meet, e.g. "photosynthesis - inputs, outputs and where it happens".
    type: string
    required: true
  - name: grade_level
    description: Grade, year or course, e.g. "Grade 7 science", "Year 4", "adult ESL intermediate".
    type: string
    required: true
  - name: minutes
    description: Lesson length in minutes.
    type: number
    default: 50
steps:
  - {id: lesson-plan, file: steps/01-lesson-plan.md, stage: plan, gate: approve}
  - {id: slide-outline, file: steps/02-slide-outline.md, stage: build, gate: approve}
  - {id: worksheet, file: steps/03-worksheet.md, stage: build, gate: approve}
  - {id: quiz, file: steps/04-quiz.md, stage: verify, gate: approve}
  - {id: differentiated-versions, file: steps/05-differentiated-versions.md, stage: build, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds a complete, consistent pack for one {{minutes}}-minute lesson on **{{topic}}** for **{{grade_level}}**: the lesson plan, a slide outline, a student worksheet, a short quiz, and support and stretch versions of the worksheet and quiz. Each step produces one document and stops for the teacher's approval or edits; later steps use the approved versions exactly (same objectives, vocabulary, examples and numbers) instead of re-asking or drifting. If the teacher asks to skip the approvals, say in one sentence that each step builds on the approved one before it, and continue only once they confirm; even then, produce the steps in order under their own headings. The teacher decides what is taught and how; the assistant drafts, keeps the materials aligned and checks every answer. Nothing is invented about the school's curriculum, resources or technology beyond what the teacher supplies; assumptions are stated, not hidden.
