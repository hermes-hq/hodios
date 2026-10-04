---
schema: 1
id: prepare-for-lab-session
kind: prompt
title: Prepare for a lab session
description: Prepares a student for a practical or lab session from the lab sheet with the aim, variables, method and why, hazards from the sheet, a results table ready to fill and predictions to test.
category: studying
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student]
subject: [chemistry, biology, physics]
requires: [none]
inputs: [document, text]
output: [checklist, table, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [practical-work, pre-lab, risk-assessment, results-table]
pairs_with:
  prompts: [structure-lab-report, give-lab-report-feedback]
args:
  - name: lab_sheet
    description: The lab sheet or practical instructions, pasted in full, including any hazard or risk-assessment section and pre-lab questions.
    type: text
    required: true
  - name: level
    description: School or first-year university, which sets the depth of the explanations and the results-table conventions.
    type: enum
    enum: [school, university]
    default: school
output_contract:
  format: markdown
  sections: [Aim, Variables, Method and why, Hazards, Results table, Predictions, Questions to ask]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student has a practical or lab session coming up ({{level}} level) and wants to arrive prepared. Unprepared students follow the sheet step by step without knowing why, run out of time, record data in a messy way and cannot explain their results afterwards. Prepared students know the aim in their own words, which variable they change, measure and control, why each step matters, the hazards, and have a results table ready with units and space for repeats. Pre-lab questions are often marked, so this sheet explains and prompts; it does not give their answers.
</context>

<task>
<lab_sheet>
{{lab_sheet}}
</lab_sheet>

1. Aim: restate it in one plain sentence, then leave a line for the student to write it in their own words.
2. Variables: independent (what is changed, and its values or range), dependent (what is measured, how and in what units), control variables (what is kept the same and how). If the sheet is not a variables-type investigation (a synthesis, a titration, a dissection), say what is being made, measured or observed instead.
3. Method and why: for each step, what to do and why it matters (accuracy, fair test, safety, reaction time). Flag steps where timing or order is critical and steps students often get wrong.
4. Hazards: list only the hazards and control measures in the sheet. If the sheet has none, say so and tell the student to ask the teacher or demonstrator before starting; do not invent hazard classifications.
5. Results table: column headings with units in the header (for example "Time / s"), columns for repeats and a mean where repeats are planned, values of the independent variable filled in, and a note on the number of decimal places to record from the instrument.
6. Predictions: write prompts that lead the student to their own prediction with a reason based on the theory ("What happens to the rate as temperature rises, and why, in terms of particles?"). Do not state the prediction.
7. Questions to ask the teacher before starting.
</task>

<constraints>
- Use only the lab sheet. Do not add steps, chemicals, quantities or equipment. If something in the sheet is unclear or looks unsafe, point it out and say to check with the teacher.
- Never encourage doing the practical outside the lab or changing the method without approval.
- If the sheet includes marked pre-lab questions, do not answer them; give a hint or point to the relevant step instead.
- Keep it to what fits on two pages.
</constraints>

<output_format>
## Aim
One sentence and a blank line for the student's version.

## Variables
Table: Type | Variable | How it is changed, measured or controlled | Units.

## Method and why
Table: Step | What to do | Why it matters. Critical steps marked "Watch".

## Hazards
Table: Hazard | Control measure (from the sheet). Or the "ask first" note.

## Results table
An empty markdown table ready to copy.

## Predictions
Two or three prompting questions with blank answer lines.

## Questions to ask
Two to four bullets.
</output_format>
