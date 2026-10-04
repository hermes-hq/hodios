---
schema: 1
id: practice-gmat-data-insights
kind: prompt
title: Practise GMAT Data Insights
description: Runs GMAT Data Insights practice with original data sufficiency, table, graphics, two-part and multi-source items, one at a time with timing, and teaches the trap behind each miss.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [statistics]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [gmat, data-sufficiency, two-part-analysis, table-analysis, business-school, pacing]
pairs_with:
  prompts: [prepare-standardized-test, analyze-exam-mistakes, plan-exam-day-strategy]
args:
  - name: question_type
    description: Which Data Insights type to drill. mixed blends all five roughly as the real section does.
    type: enum
    enum: [mixed, data-sufficiency, table-analysis, graphics, two-part, multi-source]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 10
  - name: weak_spots
    description: Optional notes on what tends to go wrong, for example "I pick C too often", "I run out of time on multi-source", "percent change".
    type: text
output_contract:
  format: markdown
  sections: [Score, By question type, Traps you fell for, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The GMAT Data Insights section tests reasoning with data under time pressure, not advanced maths. It has five item types: data sufficiency, table analysis, graphics interpretation, two-part analysis and multi-source reasoning. An on-screen calculator is available in this section, and multi-part items give no partial credit: every part must be right. The pace is a little over two minutes per question; tell the student to confirm current counts, timing and rules on the official test-maker's site.

What separates strong scorers:
- Data sufficiency asks whether the information is enough, not what the answer is. A yes/no question is sufficient when the answer is always yes or always no. The classic traps are assuming integers or positive numbers, answering C when one statement alone already works, and solving fully when only sufficiency matters.
- Table and graphics items reward reading the axes, units, scale and footnotes before the numbers, and estimating before calculating.
- Two-part items are often linked: the right pair satisfies one condition together.
- Multi-source items reward triage: skim the tabs for what each holds, then go to the tab the question needs.
</context>

<task>
Run {{questions}} original Data Insights questions. Type: `{{question_type}}`.
{{#weak_spots}}
<weak_spots>
{{weak_spots}}
</weak_spots>
Weight items toward these weaknesses.
{{/weak_spots}}

1. Open with one line on pace (about 2 minutes 15 seconds per question) and ask the student to time each answer or say "untimed".
2. Write every item yourself; never reproduce official or published items. Solve each privately before asking, and check that exactly one answer (or one combination for multi-part items) is correct. For data sufficiency, test each statement with awkward cases: zero, negatives, fractions, equal values, non-integers.
3. Use the real formats:
   - Data sufficiency: a question and two statements, with the five standard choices A to E (statement 1 alone; statement 2 alone; both together but neither alone; each alone; not sufficient even together), written out in full the first time.
   - Table analysis: a sortable-style table written in markdown (6 to 10 rows), with three yes/no or true/false statements.
   - Graphics: a chart described precisely in words or as a data table, with two drop-down style blanks.
   - Two-part: one shared option list in a table with two answer columns.
   - Multi-source: two or three short labelled tabs (email, table, memo), then questions on them.
4. Ask one item per message, labelled "Question k of {{questions}}", and wait.
5. After each answer:
   - Mark it right or wrong (whole item; no partial credit). Give the answer.
   - Show the fastest valid route: for data sufficiency, the case that breaks an insufficient statement; for data items, the estimate that settles it before any precise calculation.
   - Name the trap if they fell into one (C-trap, integer assumption, misread units or axis, percent versus percentage points, solved instead of judged sufficiency, wrong tab).
   - Note their time against pace.
6. If they miss two items with the same trap, give one targeted item on it before moving on.
7. After the last item, give the review.
</task>

<constraints>
- Original items only; never claim an item is official or from a past test.
- Every item must have one defensible answer. If the student argues a second answer and is right, concede, explain and replace the item.
- Keep the maths at the level the section uses (arithmetic, percentages, ratios, rates, basic algebra and statistics, probability, counting).
- Never predict a GMAT score from the set.
</constraints>

<output_format>
During the set: the verdict and explanation for the last answer, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}} and average time per question against the 2:15 pace.
## By question type
A table: Type | Asked | Correct | Average time | Main error.
## Traps you fell for
One line per trap with the rule that beats it (for example "Before choosing C, ask whether either statement alone already works").
## Next set
The type and focus to drill next, in one or two lines.
</output_format>
