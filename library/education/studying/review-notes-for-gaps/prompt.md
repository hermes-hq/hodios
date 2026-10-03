---
schema: 1
id: review-notes-for-gaps
kind: prompt
title: Review notes for gaps
description: Compares a student's notes against the syllabus or textbook to find missing topics, errors and shallow areas, and says exactly what to add, in priority order. Use before revision starts.
category: studying
version: 1.0.0
status: incubating
stage: [review]
role: [student]
requires: [none]
inputs: [notes, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [coverage-check, syllabus, revision-notes, accuracy]
pairs_with:
  prompts: [convert-lecture-notes-to-cornell, make-study-guide, make-flashcards]
  personas: [study-coach]
args:
  - name: notes
    description: The student's notes for the unit or course, pasted as they are.
    type: text
    required: true
  - name: syllabus_or_source
    description: The reference to check against, either the syllabus or specification (learning outcomes, topic list) or the textbook chapter or lecture slides the notes come from.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Coverage, Errors, Shallow areas, Missing, Add these next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students revise from their own notes, so anything missing or wrong in them is missing or wrong in the exam. Notes usually fail in three ways: whole topics were never written down (a missed lecture), topics are present but shallow (a definition with no mechanism, example or application), and a few points are simply incorrect. A syllabus says what must be covered and to what depth; a textbook says what is correct. The job is a coverage audit, not a rewrite.
</context>

<task>
Audit these notes against the reference.

<notes>
{{notes}}
</notes>

<reference>
{{syllabus_or_source}}
</reference>

1. Decide what the reference is: a syllabus (tells you what to cover and how deeply, through verbs like "describe", "explain", "evaluate") or source material (tells you what is correct). Say which, because it limits what you can check.
2. Break the reference into a checklist of items: learning outcomes or headings, with the depth each implies.
3. Map the notes to each item and rate it:
   - Covered: present at the depth required.
   - Shallow: present but missing the depth required (for example, the outcome says "explain" and the notes only define).
   - Missing: not in the notes.
4. Check the accuracy of what the notes say. With source material, check against it and cite where it says otherwise. With only a syllabus, check against well-established knowledge, and mark each correction "verify in your textbook".
5. Note material in the notes that is not in the reference; say it may be off-syllabus, but do not tell the student to delete it.
6. Prioritise what to add: errors first, then missing items that carry the most weight or appear most in the reference, then shallow areas. For each, say specifically what to add (the missing step, mechanism, example or distinction) in one or two lines and where to find it in the source if given.
</task>

<constraints>
- Do not rewrite the notes or produce full replacement notes. Give targeted additions the student writes themselves.
- Quote the student's note when reporting an error or a shallow point.
- Do not mark something wrong unless you are confident; if unsure, flag it as "check" with the reason.
- If the notes and the reference are about different topics, or either is too short to audit, say so and stop.
</constraints>

<output_format>
## Coverage
A table: Reference item | Status (covered, shallow, missing) | Note.
Then one line: the counts of each status.
## Errors
Numbered: the quoted note, what is wrong, the correct idea, the source location or "verify in your textbook".
## Shallow areas
Each: the item, what depth is needed, what to add.
## Missing
Each: the item and what to add.
## Add these next
The top 5 to 8 additions in priority order, each one line, ending with a two-question self-test on the most important missing item.
</output_format>
