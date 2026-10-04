---
schema: 1
id: drill-case-study-recall
kind: prompt
title: Drill case study recall
description: Drills the case studies a student must know as place, figures, causes, effects and responses, from their own notes, then has them apply each case to an exam question. For geography and business.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [geography, economics, social-sciences]
requires: [none]
inputs: [notes, text]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
tags: [case-studies, retrieval-practice, named-examples, exam-application, recall-drill]
pairs_with:
  prompts: [create-memory-aids, write-model-exam-answer]
  personas: [geography-tutor]
args:
  - name: case_studies
    description: Your case study notes as you were taught them - names, places, dates, figures, causes, effects, responses. The drill only uses what you paste.
    type: text
    required: true
  - name: exam_board
    description: Optional exam board, course and paper, such as "AQA GCSE Geography Paper 1" or "Edexcel A-level Business Theme 4", to shape the questions.
    type: string
output_contract:
  format: markdown
  sections: [Recall scoreboard]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Case-study questions reward specific, located detail: a named place, a date, two or three figures, and causes, effects and responses linked to the question asked. Students lose marks in two ways: they remember the case vaguely ("lots of people died"), or they remember it well but tell the whole story instead of selecting what answers the question. This drill trains both: precise recall, then selection and application.
{{#exam_board}}Course: {{exam_board}}.{{/exam_board}}
</context>

<task>
<case_studies>
{{case_studies}}
</case_studies>

1. List the case studies found in the notes and, for each, the fact frame: place and scale, date or period, key figures, causes, effects (split as the course does: social, economic, environmental; or primary and secondary; or stakeholders), responses or outcomes. Do not show the details yet. Ask the student which to start with or begin with the first.
2. Round 1, recall: ask for one slot at a time ("Three effects of the Nepal 2015 earthquake, with at least one figure"). Mark against the notes only: ✓ exact, ~ vague (say what detail would make it precise), ✗ missing or wrong (give the note's version).
3. Round 2, mix-up: ask quick-fire questions across cases so the student separates similar ones (two earthquakes, two companies).
4. Round 3, apply: set one original exam-style question that needs this case, such as "Evaluate the effectiveness of the responses to a tectonic hazard in a lower-income country". Ask for a 4-6 sentence answer. Mark whether they selected relevant detail, linked each point to the question and reached a judgement; show one improved sentence.
5. Re-ask any ✗ items at the end of each case. Stop when the student says, then give the scoreboard.
</task>

<constraints>
- Use only facts in the pasted notes. Do not add figures or details from memory; if the notes look incomplete or a figure seems doubtful, say "check this in your textbook" rather than correcting it.
- If the notes are just case names with no detail, ask for the details and stop.
- One question per message; keep feedback under 80 words.
- Original questions; do not claim they are past paper items.
</constraints>

<output_format>
Per turn: the question in bold, or the mark with ✓, ~ or ✗ and the precise version.

At the end:
## Recall scoreboard
Table: Case study | Slot | ✓ / ~ / ✗ | Fix. Then the three facts to learn tonight and one application tip.
</output_format>
