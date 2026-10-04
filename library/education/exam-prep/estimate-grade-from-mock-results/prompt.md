---
schema: 1
id: estimate-grade-from-mock-results
kind: prompt
title: Estimate a grade from mock results
description: Turns mock exam marks and the grade boundaries a user supplies into a likely grade range, the marks needed for the next grade and where the cheapest marks are, with the uncertainty shown plainly.
category: exam-prep
version: 1.0.0
status: incubating
stage: [review, plan]
role: [student, parent, teacher]
requires: [none]
inputs: [text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [mock-exams, grade-boundaries, marks-analysis, target-grades, exam-strategy]
pairs_with:
  prompts: [analyze-exam-mistakes, analyze-past-papers, plan-last-minute-revision]
args:
  - name: mock_marks
    description: Marks per paper, and per question or section if you have them, with the maximum for each, such as "Paper 1 52/80 (Q1-4 full, lost 14 on the 30-mark essay)".
    type: text
    required: true
  - name: grade_boundaries
    description: The boundaries you are comparing against, with the year and source, such as "June 2024 boundaries from the exam board site - 7 at 152/240, 6 at 128". Mock papers often have their own.
    type: text
    required: true
  - name: weeks_left
    description: Optional weeks until the real exam.
    type: number
output_contract:
  format: markdown
  sections: [Where you are now, Likely range, Gap to the next grade, Cheapest marks, Caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students, parents and teachers often read a mock total against last year's boundaries and treat the result as a prediction. It is not: boundaries move between years and between papers, mocks are often marked more harshly or generously than the real thing, some mocks cover only part of the course, and students typically gain marks between mocks and the real exam, unevenly. A useful estimate gives a range, says how far the student is from each boundary in raw marks, and turns that gap into specific marks to win, because a gap of 9 marks feels very different when two lost 6-mark questions are identified as fixable.
{{#weeks_left}}Weeks until the real exam: {{weeks_left}}.{{/weeks_left}}
</context>

<task>
<mock_marks>
{{mock_marks}}
</mock_marks>
<grade_boundaries>
{{grade_boundaries}}
</grade_boundaries>

1. Check the arithmetic: total each paper and the overall raw mark. If a paper's maximum is missing, ask for it rather than assuming one. If papers are weighted or scaled, apply only the weighting stated; if unclear, ask, or show the result under one clearly labelled assumption.
2. Place the total against the boundaries given. Report the grade it falls in and the distance in raw marks to the boundary below and above.
3. Give a range, not a single grade. Widen it when the student sits within about 3% of the total marks of a boundary, when the boundaries come from a different year or paper, when they are remembered or approximate ("about 110"), when only one grade's boundary is given, or when the mock covered only part of the course. State each reason.
4. Gap to the next grade: raw marks needed and what that is per paper.
5. Cheapest marks: from any per-question detail, rank where marks were lost by how fixable they are: blank or unattempted questions, low-tariff recall questions, misread command words, and missed units or working are usually cheapest; long evaluative answers gain marks more slowly. Estimate marks recoverable in each, conservatively.
6. If only totals are given, say what breakdown would help and give general levers by paper.
</task>

<constraints>
- Use only the marks and boundaries given. Never invent boundaries or guess this year's; if none are given, ask for them and stop.
- Do not present the estimate as a prediction or promise. Never say a student "will" get a grade.
- Show arithmetic so it can be checked; totals must add up exactly.
- Encouraging and factual; no comparison with other students.
{{> output/uncertainty}}
</constraints>

<output_format>
## Where you are now
Table: Paper | Mark | Max | %. Total row.

## Likely range
The range in one line, then the reasons it is this wide.

## Gap to the next grade
Raw marks needed overall and per paper, in two or three lines.

## Cheapest marks
Table: Where marks were lost | Marks lost | Realistically recoverable | How.

## Caveats
Bullets on what makes the estimate uncertain and what to check with the teacher.
</output_format>
