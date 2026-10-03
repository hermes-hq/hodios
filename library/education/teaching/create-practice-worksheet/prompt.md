---
schema: 1
id: create-practice-worksheet
kind: prompt
title: Create a practice worksheet
description: Creates a printable practice worksheet for one skill with a worked example, graduated difficulty, mixed formats, an extension task and a checked answer key.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, parent]
requires: [none]
inputs: [topic]
output: [quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [worksheet, independent-practice, worked-example, answer-key, printable]
pairs_with:
  prompts: [write-lesson-plan, differentiate-lesson, create-review-game]
args:
  - name: skill
    description: One specific skill, e.g. "rounding to the nearest 10 and 100", "using commas in lists", "balancing chemical equations".
    type: string
    required: true
  - name: grade_level
    description: Grade, age or course, e.g. "Grade 3", "Year 9", "adult numeracy level 1".
    type: string
    required: true
  - name: item_count
    description: Number of practice items, not counting the worked example and extension.
    type: number
    default: 12
output_contract:
  format: markdown
  sections: [Worksheet, Answer key, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A worksheet works when it practises one skill deliberately: a worked example students can refer back to, early items that build fluency and confidence, later items that vary the surface so students cannot answer on autopilot, a few that require reasoning or spotting an error, and something for students who finish early. Worksheets that jump straight to hard items, repeat the same item twelve times, or mix in skills that were not taught produce frustration or false confidence. And a wrong answer key is worse than none.
</context>

<task>
Create a printable worksheet on **{{skill}}** for **{{grade_level}}** with {{item_count}} practice items.

1. Header: title, Name and Date lines, and a one-sentence "Today I am practising…" goal in student language.
2. Worked example: one fully worked item showing every step, with a short note on the step students most often get wrong.
3. Practice items in three sections of graduated difficulty, totalling {{item_count}}:
   - **Section A, warm-up (about a third):** straightforward items close to the worked example.
   - **Section B, practice (about half):** varied numbers, wording or contexts; at least two formats (for example fill in the blank, matching, multiple choice, short answer, sort or label).
   - **Section C, think harder (the rest):** a word problem or application, and one "spot the mistake" item showing a typical wrong answer for students to correct and explain.
4. Extension: one challenge task for early finishers that deepens the same skill rather than introducing a new one.
5. Self-check: 3 short "I can…" statements students tick at the end.
6. Answer key: every answer, with working for multi-step items and the misconception behind the "spot the mistake" item.
</task>

<constraints>
- Stay on the one skill; any prerequisite skill used must be one students at {{grade_level}} would already have.
- Work out every answer and check it before writing the key. Avoid items with more than one defensible answer unless the format allows it.
- Leave writing space after each item ("________" lines or a working box), and keep instructions to one short sentence per section.
- Contexts must be familiar, inclusive and culturally varied; avoid money, food or brand contexts that assume particular family circumstances.
- Format for plain black-and-white printing: no colour cues, no images that the worksheet depends on. Where a diagram is essential, describe it in brackets for the teacher to draw.
- If the skill is too broad for one worksheet (for example "fractions"), narrow it, say how in the teacher notes, and write for the narrowed skill.
</constraints>

<output_format>
## Worksheet
The student-facing worksheet in the order above, numbered continuously, ready to copy.
## Answer key
Numbered answers matching the worksheet, with working where needed.
## Teacher notes
The skill as narrowed (if it was), prerequisite knowledge, and which items to use as a quick check if time is short.
</output_format>
