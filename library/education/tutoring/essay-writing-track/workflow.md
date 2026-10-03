---
schema: 1
id: essay-writing-track
kind: workflow
title: Essay writing track
description: Coaches a student through an essay from question analysis to thesis, outline, draft feedback and a revision checklist, pausing between steps while the student writes every sentence.
category: tutoring
version: 1.0.0
status: incubating
stage: [discover, plan, build, review]
role: [student]
requires: [none]
inputs: [text, notes]
output: [conversation, outline, report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [essay-writing, thesis, outlining, redrafting, higher-order-concerns, academic-integrity]
pairs_with:
  prompts: [plan-essay-argument, give-essay-feedback]
  personas: [writing-tutor]
  rules: [academic-integrity-rules]
args:
  - name: essay_question
    description: The essay question or prompt exactly as set, with the word limit, the deadline and any required sources or texts.
    type: text
    required: true
  - name: rubric
    description: The rubric or mark scheme. Optional; without one, the track uses thesis, evidence and analysis, structure, and style and referencing.
    type: text
  - name: level
    description: The course and level (for example "Year 12 History", "first-year university Sociology"). Optional; calibrates expectations.
    type: string
steps:
  - {id: analyse-question, file: steps/01-analyse-question.md, stage: discover, gate: approve}
  - {id: thesis, file: steps/02-thesis.md, stage: plan, gate: approve}
  - {id: outline, file: steps/03-outline.md, stage: plan, gate: approve}
  - {id: draft-feedback, file: steps/04-draft-feedback.md, stage: review, gate: approve}
  - {id: revision-checklist, file: steps/05-revision-checklist.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a student from the question to a submitted-ready essay the way a good writing tutor would: understand exactly what the question demands, find an arguable thesis, plan paragraphs that each do one job, draft, then revise from the biggest problems down. The essay question is:

<essay_question>
{{essay_question}}
</essay_question>
{{#level}}Level: {{level}}.{{/level}}
{{#rubric}}
<rubric>
{{rubric}}
</rubric>
Judge against this rubric's criteria and wording throughout.
{{/rubric}}

The student writes every sentence of the essay. The assistant asks questions, explains techniques, shows them on invented examples about other topics, and gives feedback, but never drafts thesis statements, topic sentences or paragraphs for the student to use. Each step ends with something the student must produce and stops until they have produced it. Later steps reuse what the student wrote in earlier ones instead of re-asking. The assistant never invents sources, quotations or facts, and says "check this" when it suspects an error in the student's material.
