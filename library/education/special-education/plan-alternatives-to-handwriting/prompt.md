---
schema: 1
id: plan-alternatives-to-handwriting
kind: prompt
title: Plan alternatives to handwriting
description: Plans how a pupil who finds handwriting very hard can record their learning - keyboarding, speech-to-text, scribing, frames, less copying - matched to each task, with exam considerations.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, parent]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [education-sector]
tags: [handwriting-difficulties, assistive-technology, touch-typing, speech-to-text, recording-methods]
pairs_with:
  prompts: [request-exam-access-arrangements, modify-test-for-access-needs]
  personas: [special-education-advisor, assistive-technology-specialist]
args:
  - name: pupil
    description: About the pupil (initials only) - age, what happens when they write (speed, legibility, pain or fatigue, avoidance), what their ideas are like when they speak, any occupational therapist or specialist advice, equipment available, and subjects most affected.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the evidence shows, Recording options by task, Teaching the new method, Keep building handwriting where useful, Exams and assessments, Review, Questions for specialists]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a teacher or family when handwriting stops a pupil showing what they know. When writing is slow, painful or illegible, pupils produce a fraction of their ideas, avoid tasks and get marked on presentation rather than thinking. Experienced teachers separate the purpose of each task: if the goal is handwriting, practise handwriting; if the goal is composing, explaining or showing working, choose the recording method that removes the barrier. Common errors: handing over a laptop with no keyboarding teaching (hunt-and-peck typing can be slower than handwriting), using a scribe for everything so the pupil never builds independence, and setting up an approach in class that will not be allowed in exams. An occupational therapist's advice on motor needs, posture and tools comes first where available.

Pupil: {{pupil}}
</context>

<task>
1. What the evidence shows: summarise the barrier from the information given (speed, legibility, pain or fatigue, spelling, organisation) and the gap between spoken and written ideas. Name missing information, such as a handwriting speed sample or occupational therapy advice.
2. Recording options by task: for the pupil's main task types (copying from the board, note-taking, extended writing, maths working, worksheets, homework, quick answers), recommend the best method (reduced or no copying, printed notes, keyboarding, speech-to-text, word prediction, mind maps, writing frames, cloze sheets, photos of work, oral answers recorded, scribe) and why.
3. Teaching the new method: how and when to teach keyboarding or speech-to-text skills (short daily practice, target speeds as a guide not a rule), editing skills, and routines for getting devices out quickly in class.
4. Keep building handwriting where useful: a small, functional handwriting goal (for example signing a name, short notes, forms) if appropriate, with comfortable tools and posture as advised by the therapist.
5. Exams and assessments: which arrangements to consider (word processor, scribe, extra time, rest breaks), noting that each exam body has its own rules and evidence requirements and that the method should be the pupil's normal way of working.
6. Review: how to measure whether the change works (amount and quality of written output, pupil's view) after six weeks.
7. Questions for specialists.
</task>

<constraints>
- Do not diagnose (for example dyspraxia or dysgraphia) or interpret reports beyond what is given; if a motor or other need seems unassessed, suggest asking the appropriate specialist.
- Do not recommend specific paid products by brand; describe tool types and say to check what the school already has.
- Exam rules differ by exam body and country; say to check them and do not promise an arrangement will be granted.
- Initials only.
</constraints>

<output_format>
## What the evidence shows
## Recording options by task
Table: Task | Method | Why.
## Teaching the new method
## Keep building handwriting where useful
## Exams and assessments
## Review
## Questions for specialists
</output_format>
