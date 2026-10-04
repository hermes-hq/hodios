---
schema: 1
id: build-compare-contrast-table
kind: prompt
title: Build a compare and contrast table
description: Builds a comparison table of two to five theories, models, periods or processes across criteria suited to the course, then writes recall questions on the differences students confuse.
category: studying
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [psychology, social-sciences, biology, history]
requires: [none]
inputs: [text, notes]
output: [table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [comparison-table, discrimination, commonly-confused, revision-grid]
pairs_with:
  prompts: [build-concept-map, make-flashcards, generate-elaborative-questions]
args:
  - name: items_to_compare
    description: The two to five things to compare, e.g. "behaviourist, cognitive and psychodynamic approaches" or "mitosis and meiosis".
    type: text
    required: true
  - name: notes
    description: Optional notes or textbook extracts on the items. Strongly recommended; cells not supported by them are marked to verify.
    type: text
  - name: course
    description: Optional course and level, e.g. "A-level Psychology" or "first-year sociology", so the criteria match what the exam asks.
    type: string
output_contract:
  format: markdown
  sections: [Criteria, Comparison table, Key similarities, Easily confused, Recall questions, Answer key]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Exam questions often ask students to compare or to choose between related ideas, and students lose marks by mixing up neighbours: mitosis and meiosis, functionalism and Marxism, classical and operant conditioning. A comparison table helps when its criteria are the dimensions the course actually assesses and when it highlights the small differences that cause confusion, not only the obvious ones. Its value comes from testing it: blanking cells and asking which item matches a description.
{{#course}}

Course: {{course}}.
{{/course}}
</context>

<task>
<items>
{{items_to_compare}}
</items>
{{#notes}}

<notes>
{{notes}}
</notes>
{{/notes}}

1. Check there are 2 to 5 items of the same kind. If there are more than 5, suggest a split into groups; if the items are not comparable, say so.
2. Choose 5 to 8 criteria that suit the type of item, for example:
   - theories and approaches: core assumption, key concepts, method or evidence base, key studies or thinkers, strengths, criticisms, applications
   - processes: where it happens, inputs, outputs, stages, purpose, outcome
   - periods or events: dates, causes, key figures, main changes, consequences
   Prefer criteria named in the course or exam wording if known. Say in one line why each criterion is there.
3. Fill each cell in 15 words or fewer. Use the notes as the source; for cells you fill from general knowledge, add [verify]. Do not leave a cell blank silently; write "not covered in notes" if needed.
4. Write the key similarities (2 to 4).
5. Identify the 3 to 5 differences students most often confuse, and for each give a one-line way to tell them apart.
6. Write recall questions of four kinds: "Which item...?" discrimination questions, same-or-different statements, a partly blanked version of the table to fill in, and two "spot the mistake" statements that mix up items.
</task>

<constraints>
- Do not invent studies, dates, thinkers or statistics. Anything not in the notes carries [verify]; if no notes are given, say once at the top that the whole table should be checked against course materials.
- Keep cells parallel across columns so the comparison is fair (same kind of information in each row).
- If the items are missing or only one item is given, ask what to compare it with and stop.
</constraints>

<output_format>
## Criteria
Bullets: criterion and why it is there.

## Comparison table
Rows are criteria, columns are items.

## Key similarities
Bullets.

## Easily confused
Table: Confusion | How to tell them apart.

## Recall questions
Numbered, grouped by kind; include the blanked table.

## Answer key
Answers by question number.
</output_format>
