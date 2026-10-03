---
schema: 1
id: write-reflective-account
kind: prompt
title: Write a reflective account
description: Structures a placement or practice experience into a reflective account using Gibbs, Kolb or Driscoll, keeping the student's own words, anonymising people and marking what they must add.
category: studying
version: 1.0.0
status: incubating
stage: [build, review]
role: [student]
requires: [none]
inputs: [text, notes]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [reflective-practice, gibbs-cycle, placement, nursing, teacher-training, anonymisation]
pairs_with:
  prompts: [understand-assignment-brief]
  personas: [writing-tutor]
  rules: [academic-integrity-rules]
args:
  - name: experience
    description: What happened on placement or in practice, in the student's own words, including what they felt, what they did, the outcome and anything they learned or would change. Rough notes are fine.
    type: text
    required: true
  - name: model
    description: The reflective model the course asks for. gibbs has six stages, kolb has four, driscoll asks What? So what? Now what?
    type: enum
    enum: [gibbs, kolb, driscoll]
    default: gibbs
  - name: word_limit
    description: The word limit for the account.
    type: number
    default: 800
output_contract:
  format: markdown
  sections: [Reflective account, What you need to add, Your words and mine, Before you submit]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Nursing, midwifery, social work, teaching, medicine and allied health courses ask students to reflect on practice using a model such as Gibbs (description, feelings, evaluation, analysis, conclusion, action plan), Kolb (concrete experience, reflective observation, abstract conceptualisation, active experimentation) or Driscoll (What? So what? Now what?). Markers reward critical reflection: moving beyond what happened to why, connecting it to theory or guidance, and a specific change in future practice. They penalise long description, generic learning points, and any breach of confidentiality. The account must stay the student's own: their experience, feelings and learning, in their voice.
</context>

<task>
Structure this experience into a reflective account using the {{model}} model, within {{word_limit}} words.

<experience>
{{experience}}
</experience>

1. Read the experience and identify what the student actually wrote for each stage of the model. List the stages that are thin or missing (most often feelings, analysis, and a specific action plan).
2. Anonymise: replace names of patients, service users, pupils, families, staff and placement sites with roles ("a patient in her 70s", "my practice supervisor", "a Year 4 class"), and remove dates, bed or room numbers and other identifying details.
3. Draft the account under the model's headings, in the first person. Use the student's own words and phrases wherever they work, smoothing grammar without changing meaning. Allocate words so description is short (about 15 percent) and analysis and learning are the largest parts.
4. Where the student gave no material for a stage, write a bracketed prompt in place of content, for example "[Add: how you felt when the family raised their voices, and why]". Do not invent feelings, events, outcomes or learning.
5. In the analysis stage, show where theory or guidance belongs with bracketed reference prompts naming the kind of source, for example "[Add a reference: your professional code on communication, or a source on de-escalation]". Do not fabricate citations.
6. Make the action plan specific: what the student will do differently, when, and how they will know it worked, drawn from their own learning points.
7. Report the word count, and list what the student must add, what came from their words and what you rephrased.
</task>

<constraints>
- Never invent experiences, feelings, conversations or learning points, and never fabricate references.
- Keep confidentiality: no real names or identifying details of people or settings, even if the student included them.
- Keep the student's voice: plain, first person, reflective. No grand claims they did not make.
- Remind the student once that they are responsible for following their institution's rules on AI assistance and for checking every sentence is true to their experience.
- If the experience is too short to reflect on (one line with no events or feelings), ask the specific questions for each stage of the model and stop.
</constraints>

<output_format>
## Reflective account
Under the model's stage headings, with bracketed prompts where content is missing. End with "Word count: N (limit {{word_limit}})".
## What you need to add
Numbered, by stage.
## Your words and mine
Two short lists: phrases kept from the student, and places where you rephrased or restructured.
## Before you submit
A checklist: anonymised, every bracket filled, references added in the course's style, word limit met, institution's AI-use rules followed.
</output_format>
