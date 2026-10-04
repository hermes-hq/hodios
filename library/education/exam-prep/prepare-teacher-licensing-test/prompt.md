---
schema: 1
id: prepare-teacher-licensing-test
kind: prompt
title: Prepare for a teacher licensing test
description: Plans preparation for a teacher certification test such as Praxis or a state content test, with a content map from the official outline, original practice items and a pedagogy method.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [student, teacher]
subject: [education-sector]
requires: [none]
inputs: [document, preferences]
output: [plan, table, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [teacher-certification, praxis, content-knowledge, pedagogy-questions, test-outline]
pairs_with:
  prompts: [prepare-certification-exam, analyze-exam-mistakes]
args:
  - name: test
    description: The test name and code if known, and the state or country, such as "Praxis 5165 Mathematics, Virginia" or "Praxis Core Reading".
    type: string
    required: true
  - name: official_outline
    description: Optional pasted content outline or study companion from the test provider, with category names and percentages. Strongly recommended.
    type: text
  - name: weeks
    description: Weeks until the test date.
    type: number
    default: 8
  - name: hours_per_week
    description: Realistic study hours per week alongside coursework or placement.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Test at a glance, Content map, Week-by-week plan, How to answer pedagogy questions, Sample items, Before test day]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Trainee teachers usually face either a content test (does the candidate know the subject at the level they will teach, and slightly beyond), a basic skills test (reading, writing, maths) or a pedagogy test (principles of learning and teaching). The best plans start from the provider's official content outline, because category weights tell you where the marks are, and from a diagnostic, because trainees tend to over-study what they already teach comfortably. Pedagogy and scenario items reward a consistent lens: the student-centred, evidence-informed, legally and ethically safe choice that a mentor would endorse, not the quickest fix. Passing scores differ by state or country and change, so they must be checked with the licensing body.

Test: {{test}}. Weeks left: {{weeks}}. About {{hours_per_week}} hours a week.
</context>

<task>
{{#official_outline}}
<official_outline>
{{official_outline}}
</official_outline>
{{/official_outline}}

1. Test at a glance: format, sections and timing as given in the outline. If no outline was pasted, describe the test only in general terms you are sure of, mark every detail "verify on the provider's site" and ask for the outline.
2. Content map: list each content category with its weight (from the outline only), the sub-topics, and a self-rating column (confident / shaky / new) for the trainee to fill in. Point out topics trainees often under-prepare, such as content above the grade band they teach.
3. Plan {{weeks}} weeks at {{hours_per_week}} hours: week 1 a timed diagnostic using an official practice test if one is available; then weeks weighted by category weight x weakness; a mixed review every third week; a second full timed practice two to three weeks out; the last week light review and error log only.
4. Pedagogy method: a four-step routine for scenario items (identify the student need, rule out answers that are punitive, generic or unsafe, prefer answers grounded in assessment data and differentiation, choose the most immediate appropriate step), with one worked original example.
5. Write five original practice items across the weightiest categories, with answers and a one-line rationale each.
6. Before test day: registration, ID rules, allowed calculator or materials, and score-reporting to the right state, all to verify.
</task>

<constraints>
- Never state passing scores, test codes, fees or percentages as fact unless they appear in the pasted outline. Tell the trainee where to check.
- Write original items; never reproduce published or retired test questions.
- Keep the plan within {{hours_per_week}} hours a week.
- If the test is unknown to you, say so and build the plan around the pasted outline, or ask for it and stop.
</constraints>

<output_format>
## Test at a glance
Short table: Section | Questions or tasks | Time | Source (outline or "verify").

## Content map
Table: Category | Weight | Sub-topics | Self-rating.

## Week-by-week plan
Table: Week | Focus | Activities | Hours | Checkpoint.

## How to answer pedagogy questions
The four steps and the worked example.

## Sample items
Five numbered items with options, then an answer key with rationales.

## Before test day
Checklist of things to verify, with where.
</output_format>
