---
schema: 1
id: calculate-grade-needed-on-final
kind: prompt
title: Calculate the grade needed on a final
description: Works out the score a student needs on a final exam or remaining work for a target course grade, from syllabus weights, current marks and any drop or replace rules.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text, document]
output: [table, explanation]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [grade-calculation, weighted-average, syllabus, final-exam, target-grade]
pairs_with:
  prompts: [calculate-gpa-and-target, recover-from-failed-midterm, create-study-plan]
args:
  - name: syllabus_weights
    description: The grading breakdown from the syllabus - each category and its weight, and the letter-grade cut-offs if you have them.
    type: text
    required: true
  - name: current_marks
    description: Every mark you have so far, by category, as points (for example 42/50) or percentages, and what is still to come.
    type: text
    required: true
  - name: target
    description: The course grade you are aiming for, as a letter or percentage, and optionally a fallback target (for example "B+, at least a C to pass").
    type: string
    required: true
  - name: grading_rules
    description: Optional special rules - lowest quiz dropped, final replaces the midterm if higher, extra credit, minimum score on the final to pass, curve.
    type: text
output_contract:
  format: markdown
  sections: [Inputs as read, Current standing, Score needed, Scenarios, What to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Online "final grade calculators" give a wrong answer whenever the course is not a simple weighted average: when categories are averaged by points rather than by assignment, when the lowest quiz is dropped, when the final replaces a low midterm, when some work is still ungraded, or when there is a minimum mark on the final itself. Students also confuse "my current grade" in the learning platform, which often counts only graded work, with their grade if everything else scored zero. A correct answer reads the rules, shows the maths, and gives the needed score for more than one target so the student can plan revision with real numbers.
</context>

<task>
Work out what the student needs.

<syllabus_weights>
{{syllabus_weights}}
</syllabus_weights>

<current_marks>
{{current_marks}}
</current_marks>

Target: {{target}}
{{#grading_rules}}
<grading_rules>
{{grading_rules}}
</grading_rules>
{{/grading_rules}}

1. Restate the inputs as you read them: each category, weight, marks so far and what remains. Check the weights sum to 100 percent; if not, say so and ask or state the assumption used. Say how each category average is computed (by points or by equal-weight assignments) and assume points if unspecified, marked as an assumption.
2. Apply the special rules (drops, replacements, extra credit) and show their effect.
3. Compute the current standing two ways: the average on graded work only (what the learning platform usually shows) and the guaranteed minimum if remaining work scored zero.
4. Solve for the score needed on the remaining work for the target, showing the equation: needed = (target - points already secured) / weight remaining. If several items remain, give the needed average and one realistic split.
5. Give scenarios: the needed score for the target, for the grade boundary below, and for passing; and the course grade if the student scores their recent typical level on the final.
6. If the target needs more than 100 percent, say so plainly, give the best grade still reachable, and mention any rule (a replacement policy, extra credit) that could change it, to confirm with the instructor.
7. List what to confirm with the instructor or syllabus.
</task>

<constraints>
- Show the arithmetic so the student can check it; round only at the end.
- Do not assume a curve, extra credit or grade cut-offs that the student did not give; use common cut-offs (for example 90/80/70/60) only as a labelled assumption.
- Do not promise an outcome; the instructor's gradebook is the authority.
</constraints>

<output_format>
## Inputs as read
A table: Category | Weight | Marks so far | Remaining.
## Current standing
## Score needed
The equation and the result.
## Scenarios
A table: Target | Score needed on remaining work | Reachable?
## What to confirm
</output_format>
