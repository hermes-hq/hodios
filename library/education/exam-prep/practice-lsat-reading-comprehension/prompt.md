---
schema: 1
id: practice-lsat-reading-comprehension
kind: prompt
title: Practise LSAT reading comprehension
description: Runs original LSAT-style reading comprehension passages, including comparative passages, with passage mapping first and explanations by question type for every answer choice.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [law, philosophy, social-sciences]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [lsat, reading-comprehension, comparative-passages, passage-mapping, author-attitude, law-school-admissions]
pairs_with:
  prompts: [practice-lsat-logical-reasoning, prepare-standardized-test, analyze-exam-mistakes]
args:
  - name: passages
    description: Number of passages in the set.
    type: number
    default: 2
  - name: type
    description: single is one passage; comparative is a pair of shorter passages on one topic; mixed includes both.
    type: enum
    enum: [mixed, single, comparative]
    default: mixed
  - name: timed
    description: true gives a time target per passage and asks for the student's time; false is untimed accuracy work.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Score, By question type, Mapping, Next set]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
LSAT Reading Comprehension uses dense passages on law, humanities, social science and natural science, each with five to eight questions, and one set per section is usually a comparative pair of shorter passages. Question types repeat: main point, primary purpose, author's attitude, what a passage states, what can be inferred, the function of a word or paragraph, analogy (which situation is most like one described), principle, strengthen or weaken an argument in the passage, and for comparative passages the relationship between the two (agreement, disagreement, how one author would respond). The habit that separates strong scorers is reading for structure: whose view each part presents, where the author's own view appears, and how paragraphs relate, then answering from the text. Wrong options are typically too strong, out of scope, a half-right mix, a view from the passage attributed to the wrong person, or reasonable but unsupported. Since August 2024 the LSAT has no logic games section, so Reading Comprehension is one of three scored sections alongside two Logical Reasoning sections and carries more weight than before. Students should check the current test format on the official LSAC site.

Type: {{type}}. Timed: {{timed}}.
</context>

<task>
Run {{passages}} original LSAT-style reading comprehension sets.

1. Write each passage yourself: 420 to 500 words in four or so paragraphs (or two passages of about 250 words for comparative), with at least two viewpoints and the author's own position signalled through qualified language. Never reproduce published LSAT passages.
2. Write five to seven questions per set, with five options A to E, covering several question types. For comparative sets, include at least two relationship questions. Solve each privately; each key must be supportable from specific lines.
3. Present the passage and stop. Ask for a quick map: one line per paragraph, the main point, and the author's attitude. If timed, give the target time per set and ask them to start the clock.
4. Give brief feedback on the map, then show the questions.
5. After they answer:
   - Mark each and give the key.
   - Name each question's type.
   - Cite the lines that decide it.
   - For each miss, name the trap they chose.
6. Present the next set. After the last, give the review.
</task>

<constraints>
- Answers are judged only against the passage; say so if the student argues from outside knowledge.
- Do not attribute invented quotations to real scholars or cases; invented authors and studies are fine when clearly part of the passage.
- No score predictions.
- If the student convincingly defends another option, re-read and correct the key if needed.
</constraints>

<output_format>
Passage with paragraph numbers in brackets. Questions numbered, options A to E.

At the end, under these headings:
## Score
x / total{{#timed}}, with time per set against target{{/timed}}.
## By question type
Table: Type | Asked | Correct | Most common trap.
## Mapping
One strength and one fix.
## Next set
Question type or passage type to drill next.
</output_format>
