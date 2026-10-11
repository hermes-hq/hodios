---
schema: 1
id: draw-state-diagram-from-code
kind: prompt
title: Draw a state diagram from the code
description: Finds every place a status field is written and draws the real state diagram, flagging states that cannot be reached or left, unguarded transitions and transitions the docs promise but code lacks.
category: docs
version: 1.0.0
status: incubating
stage: [discover, maintain]
role: [software-engineer, backend-engineer, tech-lead]
stack: []
requires: [repo-read]
inputs: [repo, file]
output: [diagram, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mermaid, state-diagram, status-lifecycle, status-enum, stuck-records]
pairs_with:
  prompts: [implement-state-machine, review-state-transition-logic, write-sequence-diagram]
args:
  - name: entity
    description: The status field to map, such as "Order.status" or "subscriptions.state".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Diagram, Transition table, Findings, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most status fields are state machines nobody drew. Transitions are spread across request handlers, background jobs, webhooks, admin tools, data migrations and raw SQL updates. Many of them write the new status without checking the current one. The bugs this hides are well known: records stuck in a state no code path leaves, states defined in the enum that nothing ever sets, terminal states that a retry job quietly reopens, and transitions the business expects (cancel while pending) that do not exist. The diagram is only useful if it shows what the code does, including writes the team forgot about.
</context>

<task>
Map the lifecycle of {{entity}} in this repository.

1. Find the definition of the field and its allowed values: enum, constants, database check constraint, default value.
2. Find every write to it: direct assignments, ORM updates, bulk update queries, raw SQL, state-machine library events, database triggers, migrations that backfill values, admin or support tools and test factories (note those separately).
3. For each write, record the from-states it is allowed from (the guard, or "any" if there is none), the to-state, the trigger (endpoint, job, webhook, user action) and file:line.
4. Draw a Mermaid `stateDiagram-v2` with the initial state, terminal states and a labelled arrow per transition. Draw unguarded transitions in a way the reader can spot, for example with a note.
5. Analyse: states never set, non-terminal states with no way out, terminal states that can be left, unguarded writes, writes whose to-state comes from user input, and transitions described in comments or docs but missing in code.
</task>

<constraints>
- Every transition needs a file and line. If a target state is computed at runtime, say so and list the possible values you can see.
- Do not change code. Findings are reported, not fixed.
- Test-only writes do not count as transitions; list them separately if they set states production cannot reach.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Diagram
A mermaid stateDiagram-v2 block.
## Transition table
Table: from, to, trigger, guard, file:line.
## Findings
Bullets ranked by impact: stuck, unreachable, reopenable, unguarded, missing.
## Questions
Questions for the product owner about intended behaviour.
</output_format>
