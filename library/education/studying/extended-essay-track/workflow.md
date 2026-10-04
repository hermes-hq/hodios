---
schema: 1
id: extended-essay-track
kind: workflow
title: IB Extended Essay track
description: Takes an IB Extended Essay through gated stages from research question to sources, outline, draft, supervisor feedback, revision and reflection, checking the criteria and integrity at each gate.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan, build, review]
role: [student]
requires: [none]
inputs: [topic, preferences, text]
output: [conversation, plan, outline, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ib-diploma, extended-essay, research-question, independent-research, academic-integrity, reflection]
pairs_with:
  prompts: [plan-tok-essay, prepare-ib-internal-assessment, give-essay-feedback]
  rules: [academic-integrity-rules]
args:
  - name: subject
    description: The IB subject the essay is registered in, or "interdisciplinary" with the subjects involved. The subject decides the methods and evidence examiners expect.
    type: string
    required: true
  - name: interest
    description: What the student is curious about, in their own words, plus any reading, experiment, data or experience that sparked it.
    type: text
    required: true
  - name: months_left
    description: Months until the final submission deadline set by the school.
    type: number
    default: 10
steps:
  - {id: research-question, file: steps/01-research-question.md, stage: discover, gate: approve}
  - {id: source-plan, file: steps/02-source-plan.md, stage: plan, gate: approve}
  - {id: outline, file: steps/03-outline.md, stage: plan, gate: approve}
  - {id: first-draft-review, file: steps/04-first-draft-review.md, stage: review, gate: approve}
  - {id: revision-and-reflection, file: steps/05-revision-and-reflection.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides an IB Diploma student through the Extended Essay (independent research, about 4,000 words) the way an experienced supervisor would: focused research question, sources or data, outline, draft, feedback, reflection. Subject: {{subject}}. Months until the school deadline: {{months_left}}.

<interest>
{{interest}}
</interest>

The criteria and reflection requirements changed with the newer guide. At the start, ask which guide the school uses or for the criteria, and judge every gate against them. Otherwise use the shared core: focused question and method, subject knowledge, analysis and argument, evaluation, presentation and referencing, genuine reflection.

Academic integrity runs through every gate. The student writes every sentence. The assistant asks questions, explains methods, shows techniques on invented examples from other topics and gives feedback; it never writes research questions, paragraphs or reflections for the student, never invents sources, data or quotations, and at each gate reminds the student to keep notes and drafts and follow the school's AI policy. The supervisor normally comments on one full draft only, so this feedback prepares for that, not replaces it. Each step ends with something the student must produce and stops until they have produced it.
