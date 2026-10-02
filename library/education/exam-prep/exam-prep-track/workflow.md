---
schema: 1
id: exam-prep-track
kind: workflow
title: Exam preparation track
description: Takes a learner from a syllabus to a diagnostic quiz, a weighted study plan, targeted practice and a final mock with review, pausing between steps. For students preparing for a specific exam.
category: exam-prep
version: 1.0.0
status: incubating
stage: [discover, plan, learn, verify, review]
role: [student]
requires: [none]
inputs: [document, text]
output: [quiz, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [diagnostic-assessment, retrieval-practice, spaced-repetition, mock-exam, weighted-plan]
pairs_with:
  prompts: [create-study-plan, generate-practice-exam, grade-practice-answers, analyze-exam-mistakes]
  personas: [study-coach]
args:
  - name: exam
    description: The exam, as precisely as possible, e.g. "AQA GCSE Chemistry Paper 1 (Higher)", "MCAT Chem/Phys section", "first-year Linear Algebra final".
    type: string
    required: true
  - name: syllabus
    description: The syllabus, specification or topic list, pasted, plus anything known about the exam format (question types, length, marks, allowed materials).
    type: text
    required: true
  - name: exam_date
    description: The exam date. Include today's date too if the assistant may not know it, so the weeks can be counted.
    type: string
    required: true
  - name: hours_per_week
    description: Realistic study hours per week for this exam, after other commitments. Asked for in step 2 if missing.
    type: string
steps:
  - {id: diagnose, file: steps/01-diagnose.md, stage: discover, gate: approve}
  - {id: plan, file: steps/02-plan.md, stage: plan, gate: approve}
  - {id: practice, file: steps/03-practice.md, stage: learn, gate: approve}
  - {id: mock, file: steps/04-mock.md, stage: verify, gate: approve}
  - {id: review, file: steps/05-review.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Prepares the learner for {{exam}} on {{exam_date}} the way a good tutor would: find out what they already know before planning anything, spend the hours where the marks are, practise by retrieval rather than rereading, and prove readiness with a timed mock under exam conditions. Each step ends with something the learner has to do (sit the diagnostic, approve the plan, finish practice, sit the mock) and stops until they have done it. Later steps use the results of earlier ones instead of re-asking. Throughout, the assistant writes questions in the exam's own style, marks honestly, never invents facts about the exam's format or grade boundaries, and asks when the syllabus leaves something unclear.
