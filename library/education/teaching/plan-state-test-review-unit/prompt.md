---
schema: 1
id: plan-state-test-review-unit
kind: prompt
title: Plan a test review unit
description: Plans a review period before a state or national test from item analysis, with priority standards, spiralled practice, test-format familiarity and calm routines that limit anxiety.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [dataset, notes]
output: [plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [test-review, standardised-tests, item-analysis, spiralled-practice]
pairs_with:
  prompts: [analyze-class-assessment-results, create-review-game, write-retrieval-practice-starters]
args:
  - name: test
    description: The test and subject, e.g. "Grade 8 state maths assessment", "Year 6 national reading test".
    type: string
    required: true
  - name: weeks
    description: Weeks until the test and lessons per week available for review.
    type: string
    required: true
  - name: data
    description: Results from a mock, benchmark or past test by standard or question type, with any notes on individual students (initials only).
    type: text
    required: true
  - name: test_format
    description: Optional format notes, e.g. "computer-based, includes drag-and-drop and short constructed response, 2 sessions".
    type: text
output_contract:
  format: markdown
  sections: [Priorities, Weekly plan, Daily review routine, Test-format practice, Targeted support, Wellbeing and test day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Effective test review is selective: re-teaching everything gives each standard too little time, so the strongest plans prioritise standards that are both heavily weighted on the test and weak in the class data, and spiral the rest through short retrieval practice. Students also lose marks on format (misreading constructed-response demands, not knowing the tools in a computer-based test, poor pacing) rather than content, so a little format practice pays off. What does not work: weeks of full practice tests with no reteaching, drilling only the "bubble" students while others coast, and building anxiety with constant talk about stakes.
</context>

<task>
Plan review for **{{test}}** over {{weeks}}.
<data>
{{data}}
</data>
{{#test_format}}
Format: {{test_format}}
{{/test_format}}

1. Analyse the data: rank standards or question types by class weakness. Where the teacher has not given test weighting, say that weighting should come from the official test blueprint and mark the ranking as provisional.
2. Pick the 3 to 5 priority standards for reteaching and explain the choice; put the rest into a spiral review.
3. Lay out a weekly plan: which priority standard is retaught when, with a different approach from the first teaching, and when short mixed practice or a partial mock happens.
4. Design a daily review routine of 10 to 15 minutes (mixed retrieval questions across standards, quick self-marking, a tracker).
5. Plan format practice: question types, the tools in the test platform if computer-based, reading constructed-response demands, pacing and checking strategies.
6. Plan targeted support for students the data identifies, with small groups by need, and stretch for secure students, so no group is ignored.
7. Add wellbeing and test-day routines: how to talk about the test calmly, a pre-test routine, and how to involve families without adding pressure.
</task>

<constraints>
- Do not invent test weightings, cut scores, blueprints or official rules; tell the teacher where to check them.
- Base priorities only on the data given; if data is missing for a standard, say so.
- Keep full-length mock tests to a minimum and always followed by reteaching.
- Use only the initials or identifiers given for students.
- Follow test security rules: do not suggest using live or secure test items.
</constraints>

<output_format>
## Priorities
Ranked standards with data, chosen priorities and reasons.
## Weekly plan
A table: Week | Reteach focus | Spiral review | Assessment.
## Daily review routine
Structure and an example day's questions.
## Test-format practice
Bullets.
## Targeted support
Groups and plans, including stretch.
## Wellbeing and test day
Bullets.
</output_format>
