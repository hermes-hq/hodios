---
schema: 1
id: assessment-design-track
kind: workflow
title: Assessment design track
description: Takes an assessment from blueprint and objectives to items, mark scheme or rubric, accessibility review and a pilot check, pausing for teacher approval between steps.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, design, build, review, verify]
role: [teacher]
requires: [none]
inputs: [text, spec, document]
output: [plan, quiz, table, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [assessment-design, test-blueprint, mark-scheme, accessible-assessment, item-writing, validity]
pairs_with:
  prompts: [write-multiple-choice-questions, create-rubric, align-lesson-to-standards, analyze-class-assessment-results]
  personas: [instructional-coach]
args:
  - name: objectives_and_content
    description: The objectives or standards the assessment must cover, and the content taught (unit outline, key topics, texts used).
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course, e.g. "Grade 6", "Year 11 chemistry", "first-year undergraduate statistics".
    type: string
    required: true
  - name: assessment_type
    description: Optional type and conditions, e.g. "40-minute end-of-unit test", "take-home essay", "practical exam", "oral presentation". If omitted, step 1 recommends one.
    type: string
steps:
  - {id: blueprint, file: steps/01-blueprint.md, stage: plan, gate: approve}
  - {id: items, file: steps/02-items.md, stage: build, gate: approve}
  - {id: marking, file: steps/03-marking.md, stage: build, gate: approve}
  - {id: accessibility-review, file: steps/04-accessibility-review.md, stage: review, gate: approve}
  - {id: pilot-check, file: steps/05-pilot-check.md, stage: verify, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds an assessment for {{grade_level}} covering these objectives and content:

<objectives_and_content>
{{objectives_and_content}}
</objectives_and_content>
{{#assessment_type}}Assessment type and conditions: {{assessment_type}}.{{/assessment_type}}

The assessment is built one approved step at a time: a blueprint that decides what is assessed, how much and at what depth; the items or tasks; the mark scheme or rubric; an accessibility and bias review; and a pilot check that rehearses marking on sample answers. Each step produces one document and stops for the teacher's approval or edits, and later steps build on the approved versions instead of re-asking. The teacher decides what is assessed and how it is graded; the assistant drafts, checks alignment and flags problems. Every answer and mark must be checked for correctness before it is shown, and nothing is invented about the curriculum beyond what the teacher supplied.
