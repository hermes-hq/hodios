---
schema: 1
id: write-sprint-demo-script
kind: prompt
title: Write a sprint review demo script
description: Writes the script for a sprint review demo that shows user outcomes rather than tickets, orders the items, prepares data and fallbacks, and ends with the questions you need stakeholders to answer.
category: writing
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, product-manager]
requires: [none]
inputs: [ticket, notes]
output: [script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [sprint-review, demo, stakeholders, agile, stakeholder-questions]
pairs_with:
  prompts: [write-shipped-this-week-update, prepare-product-demo, outline-tech-talk-with-live-demo]
args:
  - name: completed_work
    description: Tickets or stories finished this sprint, with a line on what each changes for users, and anything not finished.
    type: text
    required: true
  - name: audience
    description: Who attends (product, sales, support, customers, executives) and how long the demo slot is.
    type: text
    required: true
  - name: environment
    description: Where you will demo (staging, local, production with feature flag) and known rough edges.
    type: text
output_contract:
  format: markdown
  sections: [Running order, Script, Not done yet, Prep checklist, Questions for the room]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sprint reviews go wrong in predictable ways: engineers walk through tickets in board order, show admin screens and JSON instead of what a user sees, demo on empty or fake-looking data, lose five minutes to a login or a broken environment, and leave no time for the feedback that is the point of the meeting. A good demo starts with the user problem, shows each item as a short before-and-after story on realistic data, is honest about what is not done or behind a flag, and ends with specific questions that only the people in the room can answer.
</context>

<task>
Write a demo script for the sprint review.

<completed_work>
{{completed_work}}
</completed_work>

<audience>
{{audience}}
</audience>
{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. Pick the items worth showing to this audience and order them as a story (biggest user impact first or a single user journey). List items that should be mentioned in one line rather than demoed, such as refactors and internal fixes.
2. For each demoed item write: the one-sentence user problem, the clicks or steps to show, what to say while showing it, and the expected result. Give a time per item that fits the slot with at least a quarter left for discussion.
3. State honestly what is incomplete, behind a flag or not yet in production, and when it will be.
4. Write a preparation checklist: accounts and logins, realistic test data to seed, flags to switch on, tabs to pre-open{{#environment}}, and the rough edges to avoid in this environment{{/environment}}.
5. Give a fallback per item (screenshots, recording, or describing it) if the environment fails.
6. Write two to four specific feedback questions for the audience.
</task>

<constraints>
- Do not claim features are released or finished beyond what the input says.
- No ticket ids or internal component names in the spoken lines unless the audience is engineers.
- Keep the spoken parts short; this is a script to glance at, not to read aloud word for word.
- If the work list has nothing user-visible, say so and suggest a short, honest format instead of forcing a demo.
</constraints>

<output_format>
## Running order
Table: item, time, demo or mention.

## Script
Per item: problem, steps, what to say, expected result, fallback.

## Not done yet
## Prep checklist
## Questions for the room
</output_format>
