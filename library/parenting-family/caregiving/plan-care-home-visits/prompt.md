---
schema: 1
id: plan-care-home-visits
kind: prompt
title: Plan meaningful care home visits
description: Plans visits to a relative in a care home that feel worthwhile for both of you, with activities matched to their abilities, bringing children, short visits that work, and spotting changes to raise.
category: caregiving
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [care-homes, visiting, dementia, family-time, connection]
pairs_with:
  prompts: [plan-dementia-conversations, write-life-story-profile-for-care, raise-concern-about-care]
  personas: [eldercare-advisor]
args:
  - name: person
    description: Who you visit, what they can still enjoy, how they communicate, memory, hearing or sight, energy, and how visits go now.
    type: text
    required: true
  - name: visitors
    description: Who visits and how often, including children and their ages, and what you find hard about visits. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What a good visit looks like, Visit ideas, Visiting with children, When visits are hard, Noticing changes, A visiting rhythm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families make care home visits worthwhile, the way an experienced activities coordinator would. Many visitors sit making small talk, asking "what did you do today?" to someone who cannot remember, then leave feeling useless. What works: doing something together rather than only talking (hand care, music, photos, sorting, a walk, a shared snack); following the person's lead and mood; using the senses when words are harder; shorter, more frequent visits for people who tire; timing visits for their best part of the day; and leaving well, with a calm goodbye rather than slipping out. A visit is also when families notice changes in weight, mood, hygiene or how staff interact, which are worth raising early.

<person>
{{person}}
</person>
{{#visitors}}Visitors: {{visitors}}{{/visitors}}
</context>

<task>
1. What a good visit looks like: for this person, the best time of day, a good length, where to sit (quiet corner, garden, their room), and what success means (a shared moment, not a long conversation).
2. Visit ideas: eight to twelve activities matched to their abilities and history, grouped as talk, hands, senses and outings, each with what to bring and how to adapt it on a low day.
3. Visiting with children: how to prepare children for what they will see by age, short jobs that give them a role (showing drawings, music, a simple game), and how to handle upsetting moments.
4. When visits are hard: what to do when they do not recognise you, ask to go home, are angry or asleep; going along with their reality where kind, and when to end a visit early without guilt.
5. Noticing changes: a short checklist to glance over during visits (weight and eating, clothes and hygiene, glasses and hearing aids in use, injuries, mood, room and personal items), and how to raise a concern with staff calmly.
6. A visiting rhythm: a weekly or monthly rhythm across the family so visits are spread out, with a shared note of how each visit went.
</task>

<constraints>
- Keep every idea within what the home allows; suggest checking with staff about food, outings, pets and visiting times.
- Do not suggest foods or drinks without checking diet, swallowing and allergy needs with staff.
- Avoid quizzing the person or correcting their memory; protect their dignity.
- If the visitor describes neglect, injuries or fear of staff, point them to raising it with the manager and safeguarding services promptly.
</constraints>

<output_format>
## What a good visit looks like
## Visit ideas
Table: Idea | Type | What to bring | On a low day.
## Visiting with children
## When visits are hard
## Noticing changes
Checklist.
## A visiting rhythm
</output_format>
