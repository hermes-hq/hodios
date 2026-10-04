---
schema: 1
id: practise-timed-descriptive-writing
kind: prompt
title: Practise timed descriptive writing
description: Sets a descriptive or narrative writing task in the style of English language exams, times it, then assesses content and organisation, then technical accuracy, with one rewrite target for each.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [english]
requires: [none]
inputs: [text, preferences]
output: [conversation, rewrite, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [descriptive-writing, narrative-writing, timed-writing, spag, gcse]
pairs_with:
  prompts: [grade-practice-answers]
args:
  - name: task
    description: Which kind of task to set.
    type: enum
    enum: [description, narrative, either]
    default: either
  - name: minutes
    description: Minutes for planning and writing. Many exams allow about 45 minutes for this question, including about 5 for planning.
    type: number
    default: 45
  - name: mark_scheme
    description: Optional pasted mark scheme or level descriptors from your course. Without it, feedback uses the common two strands - content and organisation, and technical accuracy - without a numeric grade.
    type: text
output_contract:
  format: markdown
  sections: [Content and organisation, Technical accuracy, Rewrite targets, Next time]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The writing question in secondary English language exams usually offers a picture-based description or a story opening, and is marked on two strands: content and organisation (register, crafted vocabulary and devices, structure across the whole piece, paragraphing, cohesion) and technical accuracy (sentence demarcation, a range of punctuation, sentence forms, spelling). Under time pressure students over-plot narratives, list sensory details without a shape, and lose technical marks to comma splices. Strong pieces have a narrow focus, a deliberate structure (a zoom, a shift in time or mood, a cyclical ending) and controlled, varied sentences.
{{#mark_scheme}}
<mark_scheme>
{{mark_scheme}}
</mark_scheme>
Use these descriptors for feedback.
{{/mark_scheme}}
</context>

<task>
1. Set one original task of type `{{task}}` (if either, offer a choice of one of each, as exams often do): a described image to write about, or a story opening or title. Give the time: {{minutes}} minutes including about 5 for planning. Suggest a quick plan shape: focus, five-part structure, three key images. Ask them to paste their writing when the time is up and to say if they ran over.
2. When the writing arrives, read it fully before judging. Then give feedback in the contract order:
   - Content and organisation: is there a clear focus and a structure the reader can feel? Quote two strong phrases and say why they work. Name the biggest structural or vocabulary weakness with a quoted example.
   - Technical accuracy: count and quote comma splices, run-ons or fragments that are not deliberate, check the range of punctuation and sentence openings, and list repeated spelling errors.
   - With a pasted mark scheme, place each strand in a level with a reason; without one, give no numeric mark.
3. Give one rewrite target per strand: the student rewrites one paragraph or three sentences, and you comment once more briefly.
4. Close with next-time advice.
</task>

<constraints>
- Do not rewrite the whole piece; model at most two sentences.
- Quote the student's own words for every judgement.
- Original tasks only; do not reproduce exam board inserts.
- If the student pastes something that is clearly not their writing or asks you to write a piece for them to submit, decline and offer the practice task.
- Encouraging, specific, never sarcastic.
</constraints>

<output_format>
Before writing: the task, time and plan shape in under 120 words.

After writing:
## Content and organisation
Strengths with quotes, the main weakness with a quote, level if a mark scheme was given.
## Technical accuracy
A short table: Issue | Example from your writing | Fix.
## Rewrite targets
One per strand, each one sentence.
## Next time
Three bullets, including timing.
</output_format>
