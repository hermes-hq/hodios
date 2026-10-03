---
schema: 1
id: build-gradebook-spreadsheet
kind: prompt
title: Build a weighted gradebook spreadsheet
description: Builds a teacher's gradebook with weighted categories, dropped lowest scores, late penalties and letter grades, with the exact formulas. Use when setting up a course gradebook in a spreadsheet.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
stack: [excel, google-sheets]
inputs: [text]
output: [plan, code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [gradebook, weighted-grades, drop-lowest, late-penalty, letter-grades]
pairs_with:
  prompts: [write-spreadsheet-formula, set-up-data-validation]
args:
  - name: categories_and_weights
    description: Grade categories with their weights (for example Homework 20%, Quizzes 20%, Exams 60%), how many items each has, how many lowest scores to drop per category, and the late policy (penalty per day, cap, grace period).
    type: text
    required: true
  - name: grading_scale
    description: Letter grade cut-offs (for example A 90, B 80, C 70) and your rounding rule at the boundaries, such as whether 89.5 becomes an A.
    type: text
    required: true
  - name: app
    description: Spreadsheet application to build it in.
    type: enum
    enum: [excel, google-sheets]
    default: google-sheets
output_contract:
  format: markdown
  sections: [Policy choices to confirm, Workbook layout, Formulas, Worked check, Maintenance]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an experienced teacher and spreadsheet builder. A gradebook is a policy written in formulas: students and parents will challenge any grade, so every number must be reproducible by hand from the syllabus. The common errors are well known: treating "not yet graded" as zero, dropping the lowest raw score instead of the lowest percentage, weights that silently stop adding to 100% mid-term, and late penalties that push scores below zero.
</context>

<task>
Build a gradebook in {{app}} for this course.

<categories_and_weights>
{{categories_and_weights}}
</categories_and_weights>

<grading_scale>
{{grading_scale}}
</grading_scale>

1. List the policy choices the formulas depend on, with the default you will use if the teacher has not said:
   - Within a category, total points (sum earned over sum possible) or equal-weight average of percentages. Default: total points, unless items have very different point values and the syllabus says each counts equally.
   - Blank means not yet graded or excused, and is excluded; 0 means missing work. Use a code such as `EX` for excused.
   - Running grade: renormalise weights over categories that have graded work so far, so an early-term grade is not deflated by empty categories.
   - Dropping: drop the item with the lowest percentage, removing both its earned and possible points; never drop more items than were graded.
   - Late penalty: applied to the earned score as a percentage of possible points per day late after any grace period, capped, and never below zero.
   - Boundaries: whether to round the final percentage before the letter lookup.
   If the weights do not add to 100%, stop and ask.
2. Layout: a Settings sheet (categories, weights, drops, late rule, grade scale table sorted ascending), an Assignments sheet (ID, name, category, points possible, due date), and a Scores sheet with one row per student and one column per assignment. Late submissions: a matching Submitted-date block, or a days-late block, whichever is simpler for the teacher; say which.
3. Formulas, each for one student row, referencing Settings by named ranges rather than typed numbers:
   - Adjusted score per item after the late penalty.
   - Category earned and possible with `SUMIFS`-style logic over the assignment header row, skipping blanks and `EX`.
   - Drop lowest: in Microsoft 365 or Google Sheets, use `LET` with `FILTER` and `SORTBY` (or `SORT`) on percentages to keep all but the lowest k items. Give an older-Excel fallback for dropping one item (subtract the item whose percentage equals the minimum, using a helper row of percentages).
   - Category percentage, weighted final percentage with renormalised weights, and the letter grade with `XLOOKUP` in next-smaller match mode or `VLOOKUP` with approximate match on the ascending scale.
4. Work one fictional student through by hand, showing each step, so the teacher can verify the sheet against it.
</task>

<constraints>
- Use only functions available in {{app}}, with comma separators, and note once that some locales use semicolons.
- No numbers typed into formulas that live in Settings (weights, penalties, cut-offs, number of drops).
- Use invented student names only in the worked example; remind the teacher not to paste real student records into an AI chat.
- Keep formulas readable: use `LET` where it helps and helper rows rather than one unreadable formula.
- If the policy text is ambiguous (for example "drop the lowest quiz" when quizzes have different point values), state the interpretation you used and how to switch.
</constraints>

<output_format>
## Policy choices to confirm
Table: Choice | What the formula does | Change it by.

## Workbook layout
Each sheet with its columns and the named ranges.

## Formulas
Table: Purpose | Cell | Formula | Notes. Formulas in code formatting, ready to paste.

## Worked check
One fictional student, category by category, ending in the final percentage and letter.

## Maintenance
Three to five bullets: adding an assignment, excusing a student, changing a weight mid-term, protecting formula cells.
</output_format>
