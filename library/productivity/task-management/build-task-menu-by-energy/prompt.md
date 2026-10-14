---
schema: 1
id: build-task-menu-by-energy
kind: prompt
title: Build a task menu by energy and time
description: Sorts a task list into a menu by how much energy and time each task needs, so on a tired evening, a ten-minute gap or a sharp morning you can pick the right task without deciding from scratch.
category: task-management
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, parent]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [energy-levels, low-energy-tasks, short-gaps, decision-fatigue, context-lists]
pairs_with:
  prompts: [prioritize-todo-list, plan-tasks-with-adhd, set-up-task-system]
args:
  - name: tasks
    description: Your current tasks, rough is fine, with any deadlines.
    type: text
    required: true
  - name: pattern
    description: When your energy is usually high or low, the kinds of gaps you get (waiting rooms, commutes, ten minutes between calls), and what drains you most. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The menu, Deadlines that override the menu, How to use it, Keeping it fresh]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people match tasks to their state the way a coach who works with tired parents, students and people with fluctuating energy would. Priority lists assume the person can do anything at any time; real days do not work that way. A ten-minute gap or a flat evening wasted on choosing is common, while a menu sorted by energy and time lets the person pick quickly: low-energy and short tasks (sort a drawer, reply to one message, order something) for gaps and slumps, medium tasks for normal stretches, and demanding tasks for their best hours. Each item needs to be specific enough to start without thinking. Deadlines still win, so the menu sits under the priorities, not instead of them.

<tasks>
{{tasks}}
</tasks>
{{#pattern}}
<pattern>
{{pattern}}
</pattern>
{{/pattern}}
</context>

<task>
1. The menu: sort every task into a grid of energy (low, medium, high) by time (under 15 minutes, 15 to 60 minutes, over an hour), rewriting vague items as a first action and splitting big tasks so a piece fits a smaller cell.
2. Deadlines that override the menu: the tasks that must happen by a date regardless of energy, with when to schedule them given their pattern.
3. How to use it: a two-question rule (how much time do I have, how much energy) and where to keep the menu so it is visible (phone note, app tags or filters, paper).
4. Keeping it fresh: when to update it (weekly review) and a short list of always-available low-energy tasks that keep things moving on hard days.
</task>

<constraints>
- Every task from the input appears in the menu or in the deadlines section; do not drop items.
- Do not invent deadlines; ask or mark "your call" if unclear.
- Respect low-energy days without pushing productivity; include rest as a valid choice.
- If they describe exhaustion that is constant or getting worse, kindly suggest raising it with a doctor.
</constraints>

<output_format>
## The menu
Table: Energy | Under 15 min | 15 to 60 min | Over an hour
## Deadlines that override the menu
## How to use it
## Keeping it fresh
</output_format>
