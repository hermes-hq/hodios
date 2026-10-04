---
schema: 1
id: prepare-seminar-contribution
kind: prompt
title: Prepare to contribute in a seminar
description: Prepares a university student to speak in a seminar from their reading notes, with the argument in two lines, a point to agree with, one to push back on, a question and joining phrases.
category: studying
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [student]
requires: [none]
inputs: [notes, text]
output: [summary, questions, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [seminars, critical-reading, speaking-confidence, international-students]
pairs_with:
  prompts: [read-textbook-actively, prepare-office-hours-questions]
  personas: [study-coach]
args:
  - name: reading_notes
    description: Your notes on the set reading, with page numbers if you have them. Pasting key passages helps. Include the author and title.
    type: text
    required: true
  - name: seminar_question
    description: Optional question or task the tutor set for the seminar, e.g. "Is Weber's account of bureaucracy still useful?"
    type: string
output_contract:
  format: markdown
  sections: [The argument in two lines, How they argue it, Where I agree, Where I push back, My question, Ways to join in, Before the seminar]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many students do the reading and still stay silent in seminars: they are unsure their point is good enough, they cannot find a way into a fast discussion, or they are working in a second language. Tutors rarely want a summary of the reading. They want a view on it: what the author claims, whether it holds up, and a question worth discussing. Preparing three short, sayable contributions and a few phrases for joining in lowers the barrier more than rereading does.

The contribution must come from the student's own reading, so the preparation is short notes they can say in their own words, not a script.
{{#seminar_question}}

Seminar question: {{seminar_question}}
{{/seminar_question}}
</context>

<task>
<reading_notes>
{{reading_notes}}
</reading_notes>

1. State the author's central argument in two lines: the claim, and the main reason or evidence for it. If the notes do not make the argument clear, say what to look for when rereading (introduction, conclusion, topic sentences).
2. Note how the author argues: the type of evidence or method (case study, statistics, theory, archival sources, thought experiment) and one assumption the argument depends on.
3. Write one "agree and extend" point: what holds up, with a page reference from the notes if available, and how it connects to another reading, a lecture point or a real example the student might know.
4. Write one "push back" point: a limitation, missing perspective, weak evidence or counter-example, phrased as tentative ("I wonder whether...").
5. Write one open question for the group: not factual, not answered in the reading, and linked to the seminar question if given.
6. Give joining phrases in five groups: building on someone, disagreeing politely, asking for clarification, bringing in the reading, buying thinking time.
7. Give a short plan: speak once in the first 10 to 15 minutes using the easiest contribution, then use the question when discussion stalls.
</task>

<constraints>
- Use only what is in the notes for claims about the reading. Never invent quotations, page numbers or findings; if a page number is missing, leave "p. __".
- Each point fits in 2 or 3 short sentences the student could say aloud.
- Use plain international English; avoid idioms in the phrases unless explained.
- If the notes are too thin to identify an argument (a title or one line), ask for the main points or key passages and stop.
</constraints>

<output_format>
## The argument in two lines
Two lines.

## How they argue it
2 bullets: evidence or method; key assumption.

## Where I agree
The point, page reference, connection.

## Where I push back
The point, phrased tentatively.

## My question
One question, plus a follow-up if the group answers quickly.

## Ways to join in
Five short groups of 2 or 3 phrases each.

## Before the seminar
3 bullets: the plan, what to bring (notes with page numbers), one thing to listen for.
</output_format>
