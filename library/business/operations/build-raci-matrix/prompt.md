---
schema: 1
id: build-raci-matrix
kind: prompt
title: Build a RACI matrix
description: Builds a RACI matrix for a business process or project from its tasks and roles, then flags tasks with no owner, more than one accountable person, and overloaded or missing roles.
category: operations
version: 1.0.0
status: incubating
stage: [plan, design]
role: [operations-manager, manager, founder, project-manager]
requires: [none]
inputs: [notes, text]
output: [table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [raci, responsibilities, accountability, roles-and-responsibilities, decision-rights]
pairs_with:
  prompts: [map-business-process, write-sop, write-approval-matrix]
args:
  - name: work
    description: The process or project and its main tasks or decisions, in order if possible. Notes or a rough list are fine.
    type: text
    required: true
  - name: roles
    description: The roles or teams involved (use roles, not only names), and anything known about who does what today or where things get dropped.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [RACI matrix, Problems found, Role load, Questions to settle, How to use it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A RACI assigns each task or decision: R (Responsible, does the work), A (Accountable, the single person who owns the outcome and signs off), C (Consulted before, two-way) and I (Informed after, one-way). Its value is in exposing problems, not filling a grid: a task with no A gets dropped, a task with two As gets argued over, a column full of Rs is a bottleneck, too many Cs slow everything down, and a role with only Is may not belong in the process at all. RACIs fail when they are written at the wrong level (one row for "delivery" hides everything; 80 rows nobody reads), when they list people instead of roles so they break at the first leaver, and when they are agreed by managers without the people doing the work.
</context>

<task>
Work:
<work>
{{work}}
</work>

Roles:
<roles>
{{roles}}
</roles>

1. Turn the work into 8 to 25 rows at a useful level: each row a task or decision with a clear verb and output ("Approve final quote", not "Quotes"). Merge trivial steps and split vague ones.
2. Assign R, A, C and I per row from what is described. Where the input does not say, propose an assignment and mark it with `?`.
3. Apply the rules: exactly one A per row; at least one R; A and R may be the same role for small teams; keep C to those whose input changes the result.
4. Find problems: rows with no or several As, roles with too many Rs or As, decisions made with nobody consulted who will live with them, roles that are only informed everywhere, and handoffs where the R changes with nobody accountable across both.
5. Show the load per role (count of R and A) and say where it is unrealistic for the team size described.
6. List the questions the team must settle, especially every `?` cell.
7. Say how to use and maintain it: review with the people named, store it with the process documents, revisit when roles change.
</task>

<constraints>
- Use roles, not personal names, unless the user gives only names; then keep names and suggest role titles.
- Never assign two As to one row; if the input implies shared ownership, show it as a problem to resolve.
- Do not invent roles that the organisation does not have; suggest them as options under Problems found.
</constraints>

<output_format>
## RACI matrix
Table: Task or decision | one column per role, with R, A, C, I or blank.
## Problems found
Bullets, each with a suggested fix.
## Role load
Table: Role | R count | A count | Comment.
## Questions to settle
## How to use it
</output_format>
