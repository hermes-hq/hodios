---
schema: 1
id: find-critical-path
kind: prompt
title: Find the critical path
description: Takes a task list with estimates and dependencies, finds the critical path and slack, spots work that can run in parallel, and shows which tasks actually decide the finish date.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, engineering-manager, project-manager]
stack: []
requires: [none]
inputs: [text, notes]
output: [table, plan, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [critical-path, scheduling, task-dependencies, parallel-work]
pairs_with:
  prompts: [break-down-epic, estimate-with-ranges, map-cross-team-dependencies]
args:
  - name: tasks
    description: Tasks with an estimate each (days or a range), what each depends on, and who can do it if that is fixed.
    type: text
    required: true
  - name: people
    description: How many people can work in parallel and any skill limits, for example "3 engineers, only Ana knows iOS".
    type: string
    default: unlimited parallel work assumed
output_contract:
  format: markdown
  sections: [Dependency graph, Schedule, Critical path, Resource conflicts, Ways to shorten, Watch list]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The finish date of a project is decided by its longest chain of dependent tasks, not by the total amount of work. Speeding up a task off that chain changes nothing, while a one-day slip on it moves the whole date. Teams miss this in three ways: they assume tasks can overlap that cannot, they ignore that one person can only do one thing at a time (the resource-constrained critical path is often longer than the task-only one), and they forget hidden dependencies such as environments, reviews, approvals and data. Near-critical paths with little slack matter almost as much as the critical one.
</context>

<task>
<tasks>
{{tasks}}
</tasks>
People: {{people}}

1. Check the input: flag cycles, missing estimates, dependencies on tasks that are not listed, and likely hidden dependencies (environments, reviews, sign-offs, data) as questions.
2. Draw the dependency graph as a Mermaid flowchart.
3. Compute a forward and backward pass: earliest start, earliest finish, latest start and slack for each task, using the midpoint of any range and stating that choice.
4. Name the critical path and its length, and any near-critical paths with two days of slack or less.
5. Apply the people limits: show where one person is booked on two tasks at once, and the resulting resource-constrained finish.
6. Suggest ways to shorten the path: split a critical task, start part of it earlier against a stub or contract, move a non-critical person onto it, or remove a dependency. Give the days saved and the risk of each.
7. List the tasks to watch daily because a slip there moves the date.
</task>

<constraints>
- Show the arithmetic in the schedule table so it can be checked; do not state dates without it.
- Do not add tasks or estimates of your own; put suggested missing tasks in questions.
- Use working days unless calendar dates and holidays are given.
- If there is a cycle, stop the calculation and explain how to break it.
</constraints>

<output_format>
## Dependency graph
A mermaid code block.
## Schedule
Table: task | estimate | depends on | ES | EF | LS | slack.
## Critical path
The chain and its length, plus near-critical paths.
## Resource conflicts
Bullets and the resource-constrained finish.
## Ways to shorten
Table: change | days saved | risk.
## Watch list
Bullets.
</output_format>
