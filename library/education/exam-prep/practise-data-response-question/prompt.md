---
schema: 1
id: practise-data-response-question
kind: prompt
title: Practise data response questions
description: Sets an original data response question with a table or chart for economics, geography, biology or business, then marks how the student quotes, manipulates and explains the data.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [economics, geography, biology]
requires: [none]
inputs: [topic]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [data-response, data-interpretation, percentage-change, trend-and-anomaly, use-of-evidence]
pairs_with:
  prompts: [drill-exam-command-words, grade-practice-answers, analyze-past-papers]
args:
  - name: subject
    description: Subject and level, such as "A-level economics", "GCSE geography", "IB biology", "A-level business".
    type: string
    required: true
  - name: topic
    description: The topic the data should test, such as "inflation and interest rates", "population pyramids", "enzyme activity and temperature", "market share".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Marks, Use of data, Model answer points, Next practice]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Data response questions reward three skills that examiners mark separately from subject knowledge: quoting the data precisely (figure, unit, year or category), manipulating it (difference, percentage change, rate, ratio, average) and linking it to theory or explanation. Students lose marks by describing a trend without numbers, quoting a figure without its unit or period, confusing percentage change with percentage points, ignoring an anomaly, and explaining from memory instead of from the data shown. Higher-mark parts often reward commenting on the limits of the data (sample, period, source, correlation not causation).
</context>

<task>
Set and mark one original data response question on {{topic}} for {{subject}}.

1. Invent a realistic dataset and label it clearly as fictional practice data. Present it as a markdown table (6 to 12 data points) or a precisely described chart with the values listed. Include units, a time period or categories, a source line marked "fictional", and one anomaly or turning point.
2. Write three or four parts with rising demand, each with marks in brackets:
   - (a) a single-figure read-off or calculation (1 to 2 marks)
   - (b) describe the trend or pattern, using data (2 to 4 marks)
   - (c) explain the pattern using theory (4 to 6 marks)
   - (d) for upper levels, evaluate or assess, including the limits of the data (8 to 12 marks)
   Draft the mark scheme privately before showing the question.
3. Present the data and all parts. Ask the student to answer all parts in one message, and to show calculations.
4. Mark each part against your scheme:
   - Marks awarded and why.
   - Use of data: did they quote with units and periods, manipulate correctly, and refer to the anomaly?
   - Correct any calculation, showing the working (for example percentage change = (new - old) / old x 100).
5. Give model answer points for each part (bullets, not essays), then suggest what to practise next.
</task>

<constraints>
- The data is fictional and must say so; never present invented figures as real statistics.
- Keep theory accurate to the level; if a subject or level is unfamiliar, ask the student for an example question from their course.
- If the student asks for real current statistics, say you cannot supply them reliably and point them to their country's official statistics office or the source their course uses.
</constraints>

<output_format>
First message: the data, the parts with marks, and the instruction to answer.

After their answer, under these headings:
## Marks
A table: Part | Marks | Comment. Then the total.
## Use of data
Three lines: quoting, manipulation, linking to theory, each rated strong, partial or missing with an example from their answer.
## Model answer points
Bullets per part.
## Next practice
One line.
</output_format>
