---
schema: 1
id: turn-syllabus-into-rag-checklist
kind: prompt
title: Turn a syllabus into a RAG checklist
description: Turns an exam specification or syllabus into a red-amber-green learning checklist, orders revision by weakness and exam weight, and sets rules for re-rating after practice.
category: studying
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student]
requires: [none]
inputs: [document, text]
output: [checklist, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [personal-learning-checklist, rag-rating, revision-priorities, exam-specification]
pairs_with:
  prompts: [create-study-plan, analyze-past-papers, analyze-exam-mistakes]
args:
  - name: specification
    description: The exam specification, syllabus or topic list, pasted as given by the exam board or course (keep the numbering). Add paper names and marks or weightings if you have them.
    type: text
    required: true
  - name: self_ratings
    description: Optional. Any topics you already know you are strong or weak on, or results from recent tests.
    type: text
output_contract:
  format: markdown
  sections: [How to rate, Checklist, Revision order, Re-rating routine, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student wants to turn an official specification or syllabus into a personal learning checklist (sometimes called a PLC) they can rate red, amber or green. Done badly, this fails three ways: the items are too big ("Cell biology") so everything ends up amber; ratings are based on how familiar a topic feels after rereading, which overstates what the student can do under exam conditions; and the ratings never change, so the list is not used to steer revision. A good checklist breaks the specification into "I can..." statements about one lesson in size, defines each colour by what the student can do without notes, orders revision by exam weight and weakness, and changes ratings only on evidence from practice.
</context>

<task>
<specification>
{{specification}}
</specification>
{{#self_ratings}}
<self_ratings>
{{self_ratings}}
</self_ratings>
{{/self_ratings}}

1. Keep the specification's own numbering and wording as the reference. Split each point into one or more "I can..." statements using the specification's command words (state, explain, calculate, compare, evaluate). Each statement should take 20-40 minutes to learn or revise. Include required practicals, skills and maths requirements if listed.
2. Tag each statement with the paper or component and tier it belongs to, where the specification says so.
3. Define the colours by behaviour:
   - Green: I can answer an exam question on this from memory, with no notes, and get most of the marks.
   - Amber: I recognise it and get some of it right, but I am slow, unsure or make mistakes.
   - Red: I cannot do it, or have not covered it yet.
4. Pre-fill ratings only from the student's self-ratings or test results; leave the rest blank for the student.
5. Set the revision order: priority score = weight (3 for heavily weighted or frequently examined, 2 standard, 1 minor) x weakness (red 3, amber 2, green 1). Red items that others depend on go first. Mark ambers that are close to green as quick wins. Greens get a short spaced check rather than no revision.
6. Set re-rating rules: a rating only changes after a closed-book test of that item (exam question, flashcards, blurt), with the date and score recorded; a green that fails a later check drops back to amber.
</task>

<constraints>
- Do not add content the specification does not contain, and do not guess weightings. If marks per paper or topic weighting are missing, use "standard" for all, say so, and ask.
- If the input is only a short list of topic headings, still build the checklist but mark it [needs the full specification] and say which exam board document to look for.
- Keep wording close to the specification so the student can match it to exam questions.
- If the list would exceed about 120 statements, cover the first paper or unit fully and say how to continue.
</constraints>

<output_format>
## How to rate
The three colour definitions above, in two lines each, plus the re-rating rule.

## Checklist
One table per paper or unit: Ref | I can... | Paper or tier | Rating (R/A/G) | Evidence (date and score).

## Revision order
Table: Rank | Ref | Statement | Weight | Rating | Priority score | First action (for example "past-paper questions", "relearn from textbook").

## Re-rating routine
A short weekly routine: which items to test, how, and how to update the table.

## Questions
Missing weightings, unclear points and assumptions.
</output_format>
