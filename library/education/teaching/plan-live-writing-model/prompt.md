---
schema: 1
id: plan-live-writing-model
kind: prompt
title: Plan a live writing model
description: Plans live modelling of a writing task with a think-aloud script, the decisions to narrate, a shared "we do" section and scaffolded independent writing, for any subject.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, topic]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [live-modelling, think-aloud, shared-writing, i-do-we-do-you-do, disciplinary-writing]
pairs_with:
  prompts: [write-annotated-exemplars, create-rubric, design-self-and-peer-assessment]
args:
  - name: writing_task
    description: The writing task pupils will do, e.g. "a paragraph explaining why the Treaty of Versailles angered Germany" or "a conclusion to a physics practical write-up".
    type: string
    required: true
  - name: year_group
    description: Year group or age, e.g. "Year 9".
    type: string
    required: true
  - name: success_criteria
    description: Optional. The success criteria or mark scheme points for the task, and what pupils usually get wrong.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and setup, I do, We do, You do, Checks and feedback]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher wants to model a piece of writing live in front of the class, so pupils see how an expert in the subject makes decisions, not just the finished product. Live modelling works when the teacher writes in real time under a visualiser or on the board, narrates their choices (what to include, which word, why this order), makes and fixes a mistake on purpose, and keeps the model short. It fails when the teacher reads out a pre-written answer, when the model is too long for pupils to follow, or when pupils go straight from watching to writing alone with nothing in between.

Writing task: {{writing_task}}
Year group: {{year_group}}
</context>

<task>
{{#success_criteria}}
<success_criteria>
{{success_criteria}}
</success_criteria>
{{/success_criteria}}

1. Purpose and setup: the two or three writing decisions this model will make visible (for example choosing evidence, linking a cause to an effect, using subject vocabulary precisely), linked to the success criteria. Choose a parallel topic or question for the model, close enough to transfer but not the same, so pupils cannot copy it.
2. I do: a think-aloud script for the teacher, written as the teacher would say it, with the sentences they write shown separately. Include: planning out loud (what the question is really asking), at least three narrated choices, one deliberate error or weak sentence that the teacher spots and improves, and rereading against the success criteria. Keep the written model to one paragraph or about 100 to 150 words for younger classes.
3. We do: shared writing on another parallel question, where the class supplies ideas and the teacher asks "which is better and why?" between options. Give the questions to ask and likely pupil suggestions, strong and weak.
4. You do: the pupils' task, with scaffolds that fade: a sentence starter list for those who need it, the model left visible, and a short checklist. Say who gets which scaffold.
5. Checks and feedback: how the teacher circulates in the first five minutes (look for the narrated decisions), a mid-point stop to share one good example under the visualiser, and a self-check against the criteria.
</task>

<constraints>
- Subject content in the model must be accurate; if you are not sure of a fact, mark it [check] for the teacher.
- Write at a level that is a stretch but reachable for {{year_group}}; say what to simplify for younger or less confident writers.
- Do not write pupils' answers to the actual task.
- If no success criteria are given, propose three and mark them as suggestions.
</constraints>

<output_format>
## Purpose and setup
Decisions to make visible, parallel question, resources.

## I do
Two columns as a table: What the teacher says | What the teacher writes.

## We do
Shared question, prompts, likely suggestions.

## You do
Task, scaffolds by group, checklist.

## Checks and feedback
Bullets with timings.
</output_format>
