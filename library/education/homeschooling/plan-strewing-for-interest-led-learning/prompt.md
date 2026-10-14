---
schema: 1
id: plan-strewing-for-interest-led-learning
kind: prompt
title: Plan strewing for interest-led learning
description: Plans strewing for an interest-led or unschooling family, choosing books, materials and invitations around a child's current interests and noting what learning follows, without lessons.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, notes]
output: [plan, ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [self-directed-learning, strewing, interest-led, curiosity, observation]
pairs_with:
  prompts: [choose-homeschool-approach, design-homeschool-unit-study]
args:
  - name: child_profile
    description: "Child's age, reading level, and how they react to suggestions."
    type: text
    required: true
  - name: interests
    description: "What the child is into right now and what you have noticed them do, ask or avoid."
    type: text
    required: true
  - name: space_budget
    description: "Optional: space at home and monthly budget for materials."
    type: string
output_contract:
  format: markdown
  sections: [Connections, Rotation 1, Rotation 2, Rotation 3, Learning that may follow, Observation log, Free and cheap sources]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families who learn in an interest-led or unschooling way. Strewing means leaving interesting things where a child will find them (books, objects, tools, games, a documentary queued up, a question on the table) without requiring anything. Done well, it widens a child's interests and brings in reading, maths, science and writing through the child's own curiosity. Experienced unschoolers know the traps: strewing with an agenda the child can smell, strewing too much at once, pushing when something is ignored, and forgetting to notice and record what happened. Good strewing starts from close observation of the child, connects one interest to neighbouring fields, rotates a few items at a time, and treats ignored items as information. Parents also need a light way to note learning for themselves or for any records they keep.

Child: {{child_profile}}
Current interests and what you have noticed: {{interests}}
{{#space_budget}}Space and budget: {{space_budget}}{{/space_budget}}
</context>

<task>
1. Read the interests: for each, list the neighbouring fields it connects to (for example dinosaurs to geology, maps, measurement, museums, drawing, reading non-fiction).
2. Plan three rotations of strewing (about one to two weeks each), each with four to six items: books at the right reading level and a little above, objects or tools, a game, something to watch or listen to, an outing, and one open question or invitation.
3. For each item, say where to leave it and what the parent does if the child picks it up (join in, answer questions, offer the next thing) and if it is ignored (leave it, then rotate out).
4. Show the learning that might follow in plain terms, mapped loosely to areas (literacy, numeracy, science, and so on), without turning it into lessons.
5. Give a light observation log the parent can fill in a minute a day.
6. List cheap or free sources (library, second-hand, household items, nature).
</task>

<constraints>
- No required tasks, worksheets or quizzes; everything is optional for the child.
- Do not invent book titles or authors; describe the kind of book to look for, or mark a title suggestion as one to check at the library.
- Keep to the space and budget given; favour borrowed and household items.
- Respect safety for tools and science materials by age.
</constraints>

<output_format>
## Connections
Table: Interest | Neighbouring fields.
## Rotation 1
## Rotation 2
## Rotation 3
Each rotation as a table: Item | Where to leave it | If picked up | If ignored.
## Learning that may follow
## Observation log
## Free and cheap sources
</output_format>
