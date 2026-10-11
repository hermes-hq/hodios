---
schema: 1
id: migrate-task-app
kind: prompt
title: Move to a new task app
description: Plans moving tasks from one app or notebook to another without losing anything, cleaning up on the way, mapping lists, tags and recurring tasks, and running both in parallel for a short, set time.
category: task-management
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual, manager, student]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [app-switch, task-app, data-migration, recurring-tasks, list-triage]
pairs_with:
  prompts: [set-up-task-system, reset-overdue-task-list, run-weekly-review]
args:
  - name: from_to
    description: The app or system you are leaving and the one you are moving to (for example paper notebook to Things, Trello to Todoist, Notion to Apple Reminders), and why you are switching.
    type: text
    required: true
  - name: current_setup
    description: How the old system is organised (lists, projects, tags, recurring tasks, shared lists, attachments, notes), roughly how many items, and anything shared with other people.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Why you are switching, Clean before you move, Mapping, Moving it over, Cutover, Things to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people switch task apps the way someone who has done it many times would. The common failures: importing everything and recreating the old mess in a new place, losing recurring tasks and reminders that do not survive import, breaking shared lists that other people relied on, attachments and notes left behind, and running two systems "for a while" until neither is trusted. A good move cleans first (most people can delete or park a third of their tasks), maps the old structure to the new app's own concepts rather than copying it, moves active work by hand or by import depending on size, re-creates recurring items deliberately, and sets a fixed cutover date after which the old system is read-only. Imports and features differ between apps and versions, so the plan names what to check rather than assuming.

<from_to>
{{from_to}}
</from_to>

<current_setup>
{{current_setup}}
</current_setup>
</context>

<task>
1. Why you are switching: restate the reasons in one or two lines and name what the new setup must do better, so the move fixes the real problem; if the reason is mainly that the old list became untrustworthy, say that cleaning matters more than the new app.
2. Clean before you move: a short triage pass (delete, park in someday, keep active), and a rule for what not to bring over.
3. Mapping: a table mapping each old structure (lists, boards, tags, labels, due dates, priorities, recurring tasks, shared lists) to the nearest concept in the new app, marked "check in your version" where unsure.
4. Moving it over: whether to import or re-enter by hand given the item count, the order (recurring items and shared lists first, then active projects, then the rest), and how to bring over notes and attachments.
5. Cutover: a fixed date, a short parallel period, what to tell anyone who shared lists with them, and making the old system read-only or archived.
6. Things to check: a checklist after the move (every recurring task fires, reminders arrive on all devices, shared lists work for others, nothing left in the old inbox).
</task>

<constraints>
- Do not invent import tools, integrations or app features; say "check whether the app offers an import from X" when unsure.
- Do not recommend deleting the old data permanently until the checks pass; suggest an export or archive first.
- If they have not chosen a new app, suggest choosing with the task system design first rather than picking for them.
</constraints>

<output_format>
## Why you are switching
## Clean before you move
## Mapping
Table: Old | New | Notes
## Moving it over
Numbered steps.
## Cutover
## Things to check
Checklist.
</output_format>
