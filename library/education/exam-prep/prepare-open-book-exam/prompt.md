---
schema: 1
id: prepare-open-book-exam
kind: prompt
title: Prepare for an open-book exam
description: Builds an open-book or take-home exam strategy with a tabbed index, summary sheets, a time plan, rules for when to look things up and a timed practice run.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student]
requires: [none]
inputs: [document, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [open-book, take-home-exam, exam-index, summary-sheets, time-management-exam]
pairs_with:
  prompts: [create-cheat-sheet, analyze-past-papers, plan-exam-day-strategy]
  workflows: [exam-prep-track]
args:
  - name: course
    description: The course and exam, for example "Second-year Contract Law", "Intro Statistics final".
    type: string
    required: true
  - name: materials
    description: The materials allowed or available (textbook, lecture notes, statutes, formula book, own notes), with page counts or a table of contents if possible.
    type: text
    required: true
  - name: exam_format
    description: Optional format details such as duration, number and type of questions, marks, whether it is timed in a room or take-home over hours or days, printed or digital materials, and any collaboration or AI rules.
    type: text
output_contract:
  format: markdown
  sections: [What is allowed, Index, Summary sheets, Time plan, Lookup rules, Practice run]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students often do worse in open-book exams than in closed-book ones because they prepare less and spend the exam searching. Open-book questions are written to test application and analysis, so there is no time to learn the material during the exam; the materials are there to check exact details, not to understand topics for the first time. Strong candidates know the content, have built a fast way to find things (tabs, an index, summary sheets), and follow a rule about when a lookup is worth the time. Take-home exams add a different risk: time sprawls, and collaboration or AI rules are strict.
</context>

<task>
Build an open-book exam strategy for {{course}}.

<materials>
{{materials}}
</materials>
{{#exam_format}}
<exam_format>
{{exam_format}}
</exam_format>
{{/exam_format}}

1. State what is allowed and the assumptions you are making. If it is unclear whether materials may be annotated, tabbed, printed or digital, or whether the exam is timed in a room or take-home, list the questions to check with the course team. If the materials or format say the exam is closed book, say so and recommend a closed-book approach instead.
2. Design the index system:
   - A tab scheme for the main material: one colour per topic or question type, tabs at section starts and at the pages used most (key tables, formulas, definitions, leading cases).
   - A one-page master index, alphabetical by term, case, formula or concept, each pointing to a page or summary sheet. Explain how to build it while revising, not the night before.
3. Plan summary sheets, one per major topic: what goes on each (definitions in the student's own words, formulas with when to use them, step-by-step methods, key cases or examples with one-line principles, common traps), and how long each should be.
4. Make a time plan: a minutes-per-mark budget, reading and planning time, a cap on lookup time per question (for example two minutes, then answer from memory and mark it to check later), and time at the end for checking. For take-home exams, a block-by-block schedule across the available hours with breaks, a drafting and checking phase, and a stop time before the deadline.
5. Set lookup rules: look up exact values, precise wording, citations and formulas you know exist; do not look up to learn a topic; answer from understanding first and verify after.
6. Plan a practice run: a past or practice paper under the real conditions using the index and sheets, timing every lookup, then fixing the index where lookups were slow.
</task>

<constraints>
- Do not assume what is permitted. Anything not stated is an assumption to check, and the plan must work if the stricter answer turns out to be true.
- For take-home exams, state the integrity points to check: whether collaboration, online sources or AI tools are allowed, and how sources must be cited.
- If the materials or format say when the exam is, fit the index, summary sheets and practice run into the days left and say what to cut if time is short; otherwise give a rough number of hours each part takes to build so the student can schedule it.
- Do not write exam answers or summary sheet content beyond short illustrative examples.
</constraints>

<output_format>
## What is allowed
Stated rules, assumptions, and questions to check.
## Index
The tab scheme as a table: Colour | Topic | Where the tabs go. Then how to build the master index.
## Summary sheets
A table: Sheet | Contents | Length.
## Time plan
A table of the exam timeline with minutes per section and lookup caps.
## Lookup rules
4 to 6 short rules to memorise.
## Practice run
Steps and what to adjust afterwards.
</output_format>
