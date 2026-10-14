---
schema: 1
id: make-answer-key-with-worked-solutions
kind: prompt
title: Make an answer key with worked solutions
description: Writes the answer key for a teacher's worksheet or test with worked solutions, accepted alternative answers, common wrong answers and partial-credit guidance for each question.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [answer-key, worked-solutions, mark-scheme, partial-credit]
pairs_with:
  prompts: [create-practice-worksheet, mark-student-work-against-rubric, write-short-answer-questions]
args:
  - name: questions
    description: The worksheet, quiz or test questions, exactly as students see them, with marks per question if known.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course, so solutions use methods students know.
    type: string
    required: true
  - name: methods
    description: Optional methods students have been taught, e.g. "column subtraction, not number lines", "use SOH CAH TOA".
    type: text
output_contract:
  format: markdown
  sections: [Answer key, Questions to check, Marking notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An answer key is only useful if it is right and if it helps with marking real student work. Teachers lose time when a key gives only final answers (so method marks are guesswork), ignores equally valid answers students will give, or contains a mistake that the teacher only spots after marking thirty papers. A strong key shows the solution in the method students were taught, lists accepted alternatives (equivalent forms, rounding, units, valid synonyms), names the predictable wrong answers so the teacher recognises them, and says how partial credit is awarded. Questions that are ambiguous or have no single answer should be flagged before the test, not discovered during marking.
</context>

<task>
Write an answer key for these questions, for **{{grade_level}}**.
<questions>
{{questions}}
</questions>
{{#methods}}
Methods taught: {{methods}}
{{/methods}}

1. Solve every question carefully. For calculations, work each answer out step by step and check it a second way (estimate, substitute back, reverse operation) before writing it down.
2. For each question give: the final answer, a worked solution in the method taught (brief for one-step items), accepted alternatives (equivalent forms, rounding tolerance, units, wording), and the most common wrong answer with the error that produces it.
3. If marks are given, say how they split (method, accuracy, communication) and what earns partial credit. If marks are not given, suggest a split and label it as a suggestion.
4. For open or written-answer questions, list the creditable points and an example full-mark answer instead of one "correct" answer.
5. Flag any question that is ambiguous, has more than one defensible answer, contains an error, or needs information it does not give, and suggest a fix.
</task>

<constraints>
- Accuracy first: never state an answer you have not worked through. If you cannot determine an answer (for example, a question refers to a diagram or text not provided), say so instead of guessing.
- Use the methods and notation taught at this level; do not solve with methods students have not met unless offered as an alternative.
- Keep the student's question numbering exactly.
</constraints>

<output_format>
## Answer key
Per question: **Q#** answer · worked solution · accepted alternatives · common wrong answer · marks.
## Questions to check
Ambiguous, flawed or unanswerable questions with suggested fixes, or "None found".
## Marking notes
General guidance (units, rounding, follow-through marks).
</output_format>
