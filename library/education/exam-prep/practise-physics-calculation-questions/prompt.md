---
schema: 1
id: practise-physics-calculation-questions
kind: prompt
title: Practise physics calculation questions
description: Sets exam-style physics calculations on a chosen topic and marks them as examiners do, checking equation choice, substitution, rearrangement, units and significant figures, and naming each mark lost.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [physics]
requires: [none]
inputs: [topic, preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [method-marks, unit-conversion, significant-figures, error-carried-forward, gcse, a-level]
pairs_with:
  prompts: [analyze-exam-mistakes]
  personas: [science-tutor]
args:
  - name: topic
    description: The topic, such as "electric circuits", "projectile motion", "specific heat capacity", "radioactive decay".
    type: string
    required: true
  - name: level
    description: Course level, which sets difficulty and equation sheet conventions.
    type: enum
    enum: [gcse, a-level, ib, ap]
    default: a-level
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Set review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Physics calculations are marked step by step: a mark for choosing or quoting the right relationship, a mark for correct substitution (often with unit conversion), a mark for a correct rearrangement, and a final mark for the answer with a correct unit and sensible significant figures. Students who know the physics still drop marks by not converting (kJ to J, cm to m, minutes to seconds), skipping working so method marks cannot be awarded, rounding too early, or giving too many significant figures. Error carried forward means a later step can still earn marks after an early slip, but only when the working is shown.

Topic: {{topic}}. Level: {{level}}. Questions: {{questions}}.
</context>

<task>
1. Set {{questions}} original questions on {{topic}} at {{level}} standard, rising in difficulty: single-step, then multi-step with a unit conversion, then one combining two relationships, and one "show that" if the level uses them. Give mark tariffs, all data needed and constants with units. Solve each privately first.
2. One question per message, labelled "Question k of {{questions}} [n marks]". Ask the student to show every line of working.
3. Mark like an examiner: award each mark or not, saying which (equation, substitution, rearrangement, answer with unit). Apply error carried forward where it would apply. Then show a model solution with units on every line.
4. Name the slip in one phrase when marks were lost: "no conversion from g to kg", "rounded too early", "unit missing", "4 s.f. when data given to 2".
5. If the same slip happens twice, give a 30-second rule and a quick check question before moving on.
6. After the last question, give the review.
</task>

<constraints>
- Use only standard relationships and constants you are sure of; state constants used. If an exam board's equation sheet might differ, say so.
- Write original questions; do not claim they are past paper items.
- Do not give the answer before the student attempts it, unless they ask to skip.
- Significant figures: accept the answer to the least precise data given, plus or minus one, unless the question says otherwise.
- If the topic is outside {{level}} physics, say so and offer the nearest topic.
</constraints>

<output_format>
Questions as above. Marking as a short list: Mark 1 to Mark n with ✓ or ✗ and a few words, then the model solution as numbered lines.

At the end:
## Set review
**Score:** x out of the total marks.
Table: Question | Marks | Slip type.
**Your top slip:** the one to fix first and a habit that prevents it.
</output_format>
