---
schema: 1
id: build-feedback-comment-bank
kind: prompt
title: Build a feedback comment bank
description: Builds a reusable bank of specific feedback comments keyed to rubric criteria and levels, each with a next step, plus whole-class feedback, to speed up marking a class set.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [text, spec]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [written-feedback, marking, grading, rubric, comment-bank]
pairs_with:
  prompts: [create-rubric, give-essay-feedback, write-report-card-comments]
args:
  - name: assignment_and_rubric
    description: The assignment brief and the rubric or success criteria it is marked against. Paste both.
    type: text
    required: true
  - name: student_level
    description: Optional grade, age or course, so comments use language students can act on, e.g. "Grade 6", "Year 12 English", "first-year undergraduate".
    type: string
  - name: tone
    description: Voice of the comments.
    type: enum
    enum: [warm, neutral, direct]
    default: warm
output_contract:
  format: markdown
  sections: [How to use the bank, Comment bank, Whole-class feedback, Re-draft tasks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teachers marking thirty scripts write the same ten comments thirty times, and fatigue turns them into "good effort" and "add more detail". Feedback changes learning when it is about the task rather than the person, says specifically what the work does and does not do against the criteria, and gives a next step the student can carry out, ideally straight away in a re-draft. A comment bank keyed to the rubric keeps that quality across the whole pile, as long as each comment leaves a slot for one detail from the student's own work so it never reads as generic.
</context>

<task>
Build a comment bank for this assignment.

<assignment_and_rubric>
{{assignment_and_rubric}}
</assignment_and_rubric>
{{#student_level}}Students: {{student_level}}.{{/student_level}}
Tone: {{tone}} (warm = encouraging and personal while still specific; neutral = matter-of-fact and concise; direct = brief, frank and action-first, never harsh).

1. List the rubric criteria and levels you are working from. If no rubric is given, derive 3 to 5 criteria from the brief, label them "derived", and use three levels (secure, developing, beginning).
2. For each criterion and level, write 2 or 3 comments. Each comment has:
   - **What the work does:** one sentence describing what is present or missing against the criterion, with a slot for a specific detail, e.g. "Your claim in paragraph [n] is clear and arguable."
   - **Next step:** one concrete action the student can take, phrased as an instruction or question ("Add one quotation that shows… and explain how it supports your claim").
   Give each comment a short code (for example C1-S1 for criterion 1, secure, comment 1) so a teacher can write codes on scripts.
3. Add comments for common issues that cut across criteria (presentation, length, missing sections, referencing) with the same structure.
4. Write a whole-class feedback sheet: three strengths seen across the class, three common errors with a short model of the fix, and a misconception to re-teach, written with placeholders the teacher fills after marking.
5. Write 3 to 5 short re-draft tasks students can do in 15 minutes of lesson time, each linked to comment codes.
</task>

<constraints>
- Comments address the work, not the student's personality or ability: no "you're so clever" or "you're lazy". Praise names the specific thing done well.
- Every next step is something the student can do without further explanation, in language at the students' reading level. No "add more detail" or "be more analytical" without saying what that looks like.
- Use the rubric's own vocabulary so comments, rubric and grade agree.
- Keep each comment under about 40 words. Avoid repeating sentence openers across a level.
- Do not assign grades or scores; the bank supports the teacher's judgement.
- If the brief or rubric is too thin to write specific comments, ask for what is missing (the task, the criteria, the level) and stop.
</constraints>

<output_format>
## How to use the bank
Three bullets: the code scheme, filling the slots, pairing with re-draft tasks.
## Comment bank
One table per criterion: Code | Level | What the work does | Next step.
Then a table for cross-cutting comments.
## Whole-class feedback
Strengths, common errors with model fixes, misconception to re-teach, with [placeholders].
## Re-draft tasks
Numbered tasks, each with the comment codes it serves.
</output_format>
