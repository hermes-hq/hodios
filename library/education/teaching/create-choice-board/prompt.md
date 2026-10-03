---
schema: 1
id: create-choice-board
kind: prompt
title: Create a choice board
description: Builds a choice board of tasks for one objective that vary in modality and challenge, with clear success criteria for each task and a simple tracking sheet.
category: teaching
version: 1.0.0
status: incubating
stage: [design]
role: [teacher]
requires: [none]
inputs: [topic]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [choice-board, differentiation, student-choice, learning-menu, success-criteria]
pairs_with:
  prompts: [differentiate-lesson, design-station-rotation, create-rubric]
args:
  - name: objective
    description: The one objective every task practises or shows, e.g. "explain how the water cycle moves water between the land, oceans and atmosphere".
    type: text
    required: true
  - name: grade_level
    description: Grade, year or age, plus subject if useful, e.g. "Grade 5 science".
    type: string
    required: true
  - name: board_size
    description: Layout of the board. 3x3 is a tic-tac-toe board; 2x3 is two rows (core and stretch); menu has must-do, may-do and extension sections.
    type: enum
    enum: [3x3, 2x3, menu]
    default: 3x3
output_contract:
  format: markdown
  sections: [Objective and success criteria, Rules, Board, Task cards, Tracking sheet, Teacher notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A choice board gives students agency over how they practise or show an objective while keeping everyone on the same learning goal. The usual failure is a board where tasks differ wildly in rigour (a poster next to an essay), where several tasks are about the topic but not the objective, or where the creative format takes more effort than the thinking. Good boards make every square an equivalent route to the same success criteria, vary the mode of working (writing, speaking, building, drawing, solving) for engagement and access, and vary the challenge deliberately so stretch is visible. Varying modality is about access and motivation, not about matching so-called learning styles, which research does not support.
</context>

<task>
Build a **{{board_size}}** choice board for **{{grade_level}}** on this objective:

<objective>
{{objective}}
</objective>

1. Write 2 to 4 student-facing success criteria ("I can…") that every task on the board must let students show.
2. State the rules for this layout:
   - 3x3: students complete three tasks in a line (row, column or diagonal). Design it so every possible line includes at least one more demanding task and two different modes. Make the centre square either a must-do core task or a free-choice square with criteria.
   - 2x3: the top row is core tasks (choose one or two), the bottom row is stretch tasks (choose one).
   - menu: must-do tasks everyone completes, may-do tasks to choose from, and extension tasks for those ready.
3. Write each task with: a short title, the mode (write, talk, build, draw, solve, digital), the challenge level (core or stretch), clear instructions in student language, the product, and an estimated time. Keep tasks roughly equal in time within each challenge level.
4. For 3x3, check the layout before writing the task cards: list all 8 lines (3 rows, 3 columns, 2 diagonals, or only the 4 lines through the centre if the centre is a must-do) with the three tasks in each, and confirm each line has a stretch task and at least two modes. Move tasks until every line passes.
5. Write a task card for each square with its success criteria checklist.
6. Make a tracking sheet students use to record the tasks chosen, when finished, and a self-assessment against the success criteria.
7. Add teacher notes: materials, how to introduce the board, how to check progress during work time, and how to assess fairly when products differ (use the shared success criteria, not the format).
</task>

<constraints>
- Every task targets the objective itself, not a loosely related topic.
- No task depends on equipment or home resources not every student has; give an alternative when a task needs technology.
- Do not mention learning styles or assign tasks by learning style.
- Keep reading demand suitable for {{grade_level}}.
- If the objective is too broad for one board, narrow it and say how.
</constraints>

<output_format>
## Objective and success criteria
The objective and "I can…" statements.
## Rules
How to choose for this layout.
## Board
The board as a table ({{board_size}} layout; for menu, one table per section), each cell with title, mode and level. For 3x3, follow it with the line check: Line | Tasks | Stretch task | Modes.
## Task cards
One short card per task with steps, product and checklist.
## Tracking sheet
A table students copy or print.
## Teacher notes
Materials, launch, monitoring, assessment.
</output_format>
