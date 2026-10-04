---
schema: 1
id: write-annotated-exemplars
kind: prompt
title: Write annotated exemplars
description: Writes original exemplar answers at several levels for one task, annotated against the success criteria, with a comparison table and an improve-it task for pupils.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [exemplars, success-criteria, worked-examples, assessment-for-learning, improvement]
pairs_with:
  prompts: [create-rubric, design-self-and-peer-assessment, plan-live-writing-model]
args:
  - name: task
    description: The task or question pupils answer, with any word limit or marks, e.g. "Describe how a volcano forms (6 marks)".
    type: string
    required: true
  - name: success_criteria
    description: The success criteria, rubric or mark scheme the exemplars are judged against.
    type: text
    required: true
  - name: year_group
    description: Year group or age, e.g. "Year 6".
    type: string
    required: true
  - name: levels
    description: How many exemplars at different quality levels (2 to 4).
    type: number
    default: 3
output_contract:
  format: markdown
  sections: [How to use these, Exemplars, What makes the difference, Improve-it task]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher wants pupils to see what quality looks like before and during a task, by comparing anonymous answers at different levels against the success criteria. Exemplars help when the differences between levels are clear and tied to the criteria, when the weaker ones show common real mistakes, and when pupils do something with them. They hurt when there is only one polished model (pupils copy it), when the levels differ only in length, or when the annotations are vague ("good detail").

Task: {{task}}
Year group: {{year_group}}
Number of levels: {{levels}}
</context>

<task>
<success_criteria>
{{success_criteria}}
</success_criteria>

1. Plan the levels: for each, which criteria it meets, partly meets or misses. Adjacent levels should differ in one or two criteria, not in everything. The weakest still has something to praise.
2. Write each exemplar as a realistic pupil answer for {{year_group}}: the vocabulary, sentence length and typical errors of that age, not adult prose. Base weaker answers on common mistakes for this task (describing instead of explaining, unsupported claims, missing units, muddled sequence). Keep lengths similar so length is not the difference.
3. Annotate each exemplar: quote the exact words, name the criterion, and say what it does well or what is missing. Mark any level or score only if the success criteria define one; otherwise use "working towards, meeting, exceeding" or letters A, B, C.
4. Write a comparison table showing for each criterion how each exemplar handles it.
5. Write an improve-it task: pupils take the weakest or middle exemplar and improve two named things, then apply the same check to their own work.
</task>

<constraints>
- Exemplars are original and anonymous; never copy real pupils' or exam board answers.
- Subject content must be accurate even in weaker answers, apart from deliberate, labelled errors that match a real misconception.
- Do not claim official grade boundaries or exam board marks; say the levels are based on the criteria supplied.
- If the task names a paper or question number without its text, ask for the question itself; do not reconstruct or claim to reproduce official papers, exemplars or examiner material.
- If the success criteria are missing or too vague to mark against, ask for them or propose three and mark them as suggestions.
- 2 to 4 levels; if {{levels}} is outside that range, use 3 and say so.
</constraints>

<output_format>
## How to use these
Three bullets: when to show them, how pupils compare, how to avoid copying.

## Exemplars
For each: heading "Exemplar A" (B, C...), the answer, then annotations as bullets (quote - criterion - comment).

## What makes the difference
Table: Criterion | Exemplar A | Exemplar B | Exemplar C.

## Improve-it task
Pupil instructions.
</output_format>
