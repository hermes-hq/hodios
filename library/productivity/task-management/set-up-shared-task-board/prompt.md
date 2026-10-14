---
schema: 1
id: set-up-shared-task-board
kind: prompt
title: Set up a shared task board
description: Sets up a simple shared task board for a small non-software group such as a household, committee, club or small business, with columns, owners, a weekly check-in and rules that keep it used.
category: task-management
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, manager, operations-manager, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [shared-board, group-tasks, committee, ownership, check-in-rhythm]
pairs_with:
  prompts: [set-up-task-system, split-mental-load-fairly, write-project-plan]
args:
  - name: group
    description: Who the group is (household, volunteer committee, club, small shop team), how many people, how comfortable they are with apps, what work needs coordinating, and what keeps going wrong now.
    type: text
    required: true
  - name: tool
    description: The tool you want or already have (a shared app, a spreadsheet, a whiteboard, a group chat). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the board is for, Board layout, What a good card says, Owners and rules, Weekly check-in, Launch message]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small groups coordinate work the way an experienced volunteer coordinator or office manager would. Shared boards fail in small groups for human reasons, not tool reasons: too many columns, cards nobody owns, tasks written so vaguely that no one knows when they are done, one keen person doing all the updating, and members who never open the app. What works is a board as simple as the group's least techy member can manage (three or four columns), one named owner per card, a due date only when it is real, a short weekly check-in where the board is the agenda, and a clear rule for where requests go so the group chat stops being the task list. A whiteboard on the fridge is a valid board.

<group>
{{group}}
</group>
{{#tool}}
Tool: {{tool}}
{{/tool}}
</context>

<task>
1. What the board is for: one or two lines on what goes on it and what does not (for example, chat for quick questions, board for anything that takes more than a few minutes or needs an owner).
2. Board layout: three or four columns with names and what each means, plus any labels worth having, set up in their tool or suggested if none was given (keep the suggestion to the simplest fitting option).
3. What a good card says: a template with an action title, owner, due date if real, and what done looks like, with two examples from their work.
4. Owners and rules: one owner per card, how to take or hand back a card, how to add a request, how long a card can sit untouched before it is raised, and who keeps the board tidy (rotating if possible).
5. Weekly check-in: a 15-minute agenda that walks the board (done, stuck, new, unowned), at a time that suits the group.
6. Launch message: a short message to the group explaining the board, the two or three rules, and the first check-in.
</task>

<constraints>
- Keep the setup as simple as the least techy member can manage; do not add columns, automations or integrations they did not ask for.
- Do not invent app features; say "check in your app" when unsure.
- Use only the people and roles they describe; do not assign work to named people without their input, instead suggest owners to confirm.
- For software teams or engineering work, suggest a different approach rather than this one.
</constraints>

<output_format>
## What the board is for
## Board layout
Table: Column | Means
## What a good card says
Template and two examples.
## Owners and rules
## Weekly check-in
Agenda.
## Launch message
</output_format>
