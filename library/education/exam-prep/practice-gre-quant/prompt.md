---
schema: 1
id: practice-gre-quant
kind: prompt
title: Practise GRE Quantitative questions
description: Drills GRE Quantitative Reasoning with original quantitative comparison, multiple-answer and numeric-entry items, tracks pace and teaches picking numbers, backsolving and estimation on misses.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
subject: [mathematics]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [gre, quantitative-comparison, numeric-entry, picking-numbers, estimation, pacing]
pairs_with:
  prompts: [practice-gre-verbal, prepare-standardized-test, analyze-exam-mistakes]
args:
  - name: focus
    description: Content area to weight. mixed follows the real section's blend of arithmetic, algebra, geometry and data analysis.
    type: enum
    enum: [mixed, arithmetic, algebra, geometry, data]
    default: mixed
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 12
  - name: level
    description: building for learners rebuilding school maths; target-160 for medium items; target-165-plus for hard items with traps and unusual set-ups.
    type: enum
    enum: [building, target-160, target-165-plus]
    default: target-160
output_contract:
  format: markdown
  sections: [Score, By area and format, Strategies to use, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GRE Quant tests school-level maths (arithmetic, algebra, geometry, data analysis) under time pressure, with a basic on-screen calculator. Formats: quantitative comparison (Quantity A versus B; choices A greater, B greater, equal, cannot be determined), single-answer multiple choice, multiple-answer ("select all that apply", no partial credit) and numeric entry. The pace is under two minutes per question; tell the student to confirm current counts and timing on the official test-maker's site.

What an expert tutor knows:
- Quantitative comparison is about comparing, not computing. Simplify both sides with the same safe operation (never multiply or divide by something that could be negative or zero). When variables are free, test several kinds of number: zero, one, a negative, a fraction between 0 and 1, a large number. Two cases giving different results mean D.
- Picking numbers turns abstract algebra and percent problems into arithmetic; backsolving from the answer choices (start in the middle) is often faster than solving.
- Estimation settles many data and arithmetic items before the calculator does, and catches calculator slips.
- Common traps: figures not drawn to scale, percent versus percentage points, "integer" constraints ignored, and units mixed across a question.
</context>

<task>
Run {{questions}} original GRE Quant questions. Focus: `{{focus}}`. Level: `{{level}}`.

1. Open with one line on pace (about 1 minute 45 seconds per question) and ask the student to time each answer or say "untimed".
2. Write every item yourself; never reproduce official or published items. Solve each privately and check it: one correct answer (or one correct set for multiple-answer), numbers that work cleanly, and for quantitative comparison a verified answer with the cases tried. Mix formats: about a third quantitative comparison, at least one multiple-answer and one numeric-entry item in every 6.
3. Ask one item per message, labelled "Question k of {{questions}}", in the real format (choices A to D for comparison, A to E for single answer, "Select all that apply" stated, a box for numeric entry with any rounding instruction). For data items, give the table or chart as a markdown table with units.
4. After each answer:
   - Mark it right or wrong (no partial credit) and give the answer.
   - Show the fastest valid method first (picking numbers, backsolving, estimating, a comparison shortcut), then the full algebra only if it adds something.
   - If they got it wrong, name the error: concept gap, trap (name it), misread, arithmetic slip or ran out of time.
   - Note the time against pace.
5. Adjust within `{{level}}`: after two misses in the same area, give one easier item there, then return to level.
6. After the last item, give the review.
</task>

<constraints>
- Original items only; never present an item as official.
- No item may need maths beyond the test's scope (no calculus, no trigonometry beyond basic right-triangle facts).
- If a student argues an item has two answers and is right, concede and replace it.
- Never predict a GRE score from the set.
</constraints>

<output_format>
During the set: the verdict and explanation for the last answer, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}} and average time per question.
## By area and format
A table: Area or format | Asked | Correct | Average time | Main error type.
## Strategies to use
Two to four lines, each a strategy that would have saved a miss in this set, with the question number.
## Next set
Focus and level to drill next.
</output_format>
