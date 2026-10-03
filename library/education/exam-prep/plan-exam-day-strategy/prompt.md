---
schema: 1
id: plan-exam-day-strategy
kind: prompt
title: Plan an exam-day strategy
description: Plans exam-day timing, question order, a checking routine, what to do when stuck and how to recover after a bad question, ending in a one-page rules card. Use in the week before an exam.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [exam-technique, time-budget, checking-routine, exam-nerves, question-order]
pairs_with:
  prompts: [analyze-exam-mistakes, plan-last-minute-revision, prepare-open-book-exam]
  workflows: [exam-prep-track]
args:
  - name: exam_format
    description: The exam's structure, for example sections, number and type of questions, total marks, reading time, whether there is negative marking, and allowed materials.
    type: text
    required: true
  - name: duration_minutes
    description: The exam's length in minutes, excluding any separate reading time.
    type: number
    required: true
  - name: known_weaknesses
    description: Optional exam habits that cost marks, for example "run out of time on the essay", "careless arithmetic", "panic when I see an unfamiliar question", "misread command words".
    type: text
output_contract:
  format: markdown
  sections: [Time budget, Question order, Checking routine, When you are stuck, After a bad question, The day itself, Rules card]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many marks are lost not to missing knowledge but to how the exam is sat: too long on one question, a section never reached, a misread command word, an unchecked slip, or one hard question that rattles the rest of the paper. A plan made in advance removes those decisions from the exam room. It works best when it is specific to the paper's structure and the student's own habits, and short enough to memorise.
</context>

<task>
Plan an exam-day strategy for a {{duration_minutes}}-minute exam.

<exam_format>
{{exam_format}}
</exam_format>
{{#known_weaknesses}}
<known_weaknesses>
{{known_weaknesses}}
</known_weaknesses>
{{/known_weaknesses}}

1. Time budget: reserve 5 to 10 percent of the time for a final check, then work out minutes per mark from the rest, and give a time allowance per section and per question. Turn it into checkpoints ("by minute 45 you should be starting Section B"). If the total marks are not given, ask, or estimate and label it.
2. Question order: recommend an order for this paper and say why. Typical options are a quick first pass for secure marks, starting with the section the student is strongest in, or doing the high-mark extended question while fresh. For multiple choice, a two-pass approach with flagging. Adapt to any weaknesses given.
3. Checking routine: a short, specific list matched to the paper type and the student's weaknesses (every part answered, command word met, units and significant figures, re-substituting answers, numbering on the answer sheet, a final scan of flagged questions).
4. When stuck: a time limit per question before moving on, writing down what is known for method or partial marks, skipping and flagging, and the rule for returning.
5. After a bad question: a reset routine of a few seconds (breathe, put the pen down, look at the next question number), and the reminder that marks are added up question by question, so one bad answer costs only its own marks.
6. Guessing: if there is no negative marking, never leave a multiple-choice question blank; if there is, give the rule for when a guess is worth it (for example, only after eliminating at least one or two options, depending on the penalty).
7. The day itself: the night before (materials packed, sleep, no new topics), the morning (food, arrival time, a 10-minute warm-up of key facts), and the first two minutes in the room (read instructions, note the checkpoints on the paper if allowed).
8. Rules card: condense everything into 6 to 8 lines to memorise.
</task>

<constraints>
- Use only the structure given; do not invent sections or marks. Label every assumption.
- Keep advice practical and specific to this paper; no generic "stay calm" lines without a concrete action.
- If the weaknesses mention severe anxiety or panic attacks, include practical in-exam techniques and suggest talking to the school or university's support or wellbeing service about access arrangements.
</constraints>

<output_format>
## Time budget
A table: Section | Marks | Minutes | Checkpoint (clock time from start).
## Question order
The order and the reason.
## Checking routine
A numbered list.
## When you are stuck
## After a bad question
## The day itself
## Rules card
6 to 8 short lines in a quote block.
</output_format>
