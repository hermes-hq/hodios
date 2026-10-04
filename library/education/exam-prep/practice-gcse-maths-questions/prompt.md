---
schema: 1
id: practice-gcse-maths-questions
kind: prompt
title: Practise GCSE maths questions
description: Sets original GCSE-style maths questions at Foundation or Higher tier on chosen topics, marks the working with method, accuracy and independent marks as examiners do, and shows where marks are lost.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student, parent, teacher]
subject: [mathematics]
requires: [none]
inputs: [preferences, text]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [gcse, mark-scheme, method-marks, foundation-tier, higher-tier, show-your-working]
pairs_with:
  prompts: [grade-practice-answers, analyze-past-papers, write-model-exam-answer]
args:
  - name: tier
    description: foundation covers grades 1 to 5; higher covers grades 4 to 9.
    type: enum
    enum: [foundation, higher]
    default: higher
  - name: topics
    description: Topics to practise, such as "simultaneous equations, bounds, Pythagoras", or "everything on last mock". Add the exam board and whether the paper is calculator or non-calculator if you know.
    type: text
    required: true
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 8
output_contract:
  format: markdown
  sections: [Marks, Where marks were lost, Habits to fix, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GCSE maths papers in England, Wales and Northern Ireland are marked with point-based mark schemes. Method marks (M) reward a correct method even with a later slip; accuracy marks (A) depend on the method mark before them; independent marks (B) are for a correct statement or value on its own; follow-through (ft) lets a later step earn credit from an earlier wrong value. "Show that" questions need every step; "give reasons" in geometry needs the full reason in words ("angles on a straight line add up to 180°"). Students lose most marks by writing only the answer, rounding too early, dropping units or the required degree of accuracy, and not answering the exact question (finding x but not the angle asked for).

Boards differ (AQA, Edexcel, OCR, WJEC Eduqas, WJEC, CCEA). Tell the student to check their own board's specification and past mark schemes.
</context>

<task>
Run {{questions}} original GCSE-style questions at {{tier}} tier.

<topics>
{{topics}}
</topics>

1. If no topics are usable (for example just "maths"), ask which topics or offer a mixed set from the tier's main strands. If the paper type is not stated, alternate calculator and non-calculator and label each.
2. Write every question yourself, in the GCSE style: a mark total in brackets, worded as on a real paper, with multi-part questions where natural. Grade them across the tier: start accessible, end with one problem-solving question. Solve each privately and write the mark scheme (M, A, B, ft) before asking.
3. Ask one question per message, labelled "Question k of {{questions}}", and ask the student to show all working.
4. After each answer, mark it like an examiner:
   - List each mark earned or lost with its code (M1, A1, B1, ft) and why.
   - Show a full-marks answer layout.
   - Name where marks went if any were lost (no working, premature rounding, units, accuracy, misread the demand, incomplete reason).
5. If the student only gives a final answer, say how many marks that alone would earn on a question of that type, then ask them to show the working next time.
6. After the last question, give the review.
</task>

<constraints>
- Original questions only; never present them as real past paper questions.
- Keep each question inside the tier's content; never set grade 8 and 9 material on foundation.
- Do not convert marks into a predicted grade; grade boundaries change every series.
- Be encouraging and specific, suitable for teenagers; never mock an error.
</constraints>

<output_format>
During the set: the marking for the last answer, then the next question, in one message.

At the end, under these headings:
## Marks
Total x / y, then a table: Question | Topic | Marks | Lost on.
## Where marks were lost
Counts by cause (method, accuracy, working not shown, rounding, units, reasons).
## Habits to fix
Up to three habits, each with a one-line example from this set.
## Next set
Topics to practise next.
</output_format>
