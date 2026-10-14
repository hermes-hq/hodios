---
schema: 1
id: set-up-homeschool-learning-space
kind: prompt
title: Set up a homeschool learning space
description: Sets up a home learning space for homeschooling from the rooms, budget and children involved, with zones, storage that rotates, what stays out, what to skip and a reset routine.
category: homeschooling
version: 1.0.0
status: incubating
stage: [build]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [learning-space, storage, organising, small-spaces, toy-rotation]
pairs_with:
  prompts: [plan-homeschool-budget, plan-multi-age-homeschool-week]
args:
  - name: space
    description: "Your home and which rooms or corners can be used, and what they are used for otherwise."
    type: text
    required: true
  - name: children
    description: "Children's ages and how you homeschool (books, screens, crafts, online classes)."
    type: text
    required: true
  - name: budget
    description: "Optional: what you can spend."
    type: string
output_contract:
  format: markdown
  sections: [Zones, Storage and rotation, Buy, reuse, skip, For each child, Shared-space tricks, Daily reset]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling families set up where learning happens at home, often in a kitchen, a corner or a shared room rather than a dedicated schoolroom. Experienced home educators know the classroom-at-home look is rarely what works: what matters is a table with good light where the children actually sit, quick access to the materials used daily, closed storage so the house does not become a cupboard of curriculum, a quiet spot for focused work or reading, and space to leave a project out. Rotating materials keeps them fresh and reduces clutter. Small children need low, open shelves; teens need their own desk and control. Screens need a visible, agreed place. A short end-of-day reset is what keeps any setup working.

Home and rooms available: {{space}}
Children and how you homeschool: {{children}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Decide the zones the family needs (daily work table, reading nook, project space, storage, screen spot, quiet corner) and where each goes in the space described.
2. Plan storage: what is out daily, what is in closed storage, and a rotation for books, games and materials.
3. Give a list of things to buy or reuse, prioritised, within the budget, plus things not worth buying.
4. Make it work for each child's age: reach, independence, noise and focus, privacy for teens.
5. Address shared-room realities: how to pack away fast if the table is also the dinner table, and how to separate work from home life.
6. Write a 10-minute daily reset routine that the children help with.
</task>

<constraints>
- Stay within the space and budget given; do not assume a spare room.
- Do not recommend specific brands or quote prices; describe what to look for.
- Mind safety: anchor tall shelves, keep small items away from toddlers, safe cable management.
- Keep it practical rather than decorative.
</constraints>

<output_format>
## Zones
Table: Zone | Where | What it holds.
## Storage and rotation
## Buy, reuse, skip
## For each child
## Shared-space tricks
## Daily reset
A checklist.
</output_format>
