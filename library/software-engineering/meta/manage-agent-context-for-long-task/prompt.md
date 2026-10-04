---
schema: 1
id: manage-agent-context-for-long-task
kind: prompt
title: Plan context for a long agent task
description: Plans how a coding agent works through a long task without losing the plot, with a task ledger, checkpoint notes, what to keep in context, what to re-read and when to hand off.
category: meta
version: 1.0.0
status: incubating
stage: [plan, build]
role: [software-engineer]
requires: [none]
inputs: [text, ticket]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [context-window, long-running-tasks, task-ledger, checkpoints, coding-agents]
pairs_with:
  prompts: [write-agent-handoff, write-subagent-brief]
args:
  - name: task
    description: The long task, with its goal, size and constraints, for example "migrate 140 API handlers from Express to Fastify in a TypeScript monorepo without changing responses; tests exist for about half".
    type: text
    required: true
  - name: agent_limits
    description: Known limits of the agent or environment, for example "context fills after roughly 30 files read", "sessions time out after two hours", "no subagents", "can write files in the repository". Leave empty if unknown.
    type: text
output_contract:
  format: markdown
  sections: [Task shape, Ledger, Working loop, Context budget, Checkpoints, Handoff triggers, Ledger template, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Long agent tasks fail in predictable ways once the working context fills up or a session ends: the agent forgets the original constraints, redoes finished work or skips items, re-reads the same large files, trusts a stale memory of a file it has since changed, declares success without checking every item, or drifts into adjacent improvements. The remedy is to keep the durable state outside the conversation, in files the agent writes and re-reads (a ledger of items and their status, decisions, and verification evidence), work in small verified batches, and plan the moments to compact, restart or hand off before quality drops rather than after.
</context>

<task>
Plan how a coding agent should carry out this task across one or more sessions:

<task_description>
{{task}}
</task_description>

{{#agent_limits}}
Known limits: {{agent_limits}}
{{/agent_limits}}

1. Task shape: break the task into a list of units of work that can each be finished and verified independently (files, endpoints, modules, tickets). Estimate their number and how many fit in one session given the limits, and note dependencies that fix the order.
2. Ledger: design a task ledger file kept in the repository working tree (or wherever the agent can write) that holds the goal and definition of done, the user's constraints quoted, each unit with its status (todo, in progress, done-verified, done-unverified, blocked) and evidence, decisions with reasons, and rejected approaches. Say when the agent updates it: after every unit, never in batches.
3. Working loop: the per-unit routine, for example re-read the ledger, pick the next unit, read only the files it needs, change, run the narrow check, record evidence, update the ledger, commit or checkpoint if the workflow allows.
4. Context budget: what must stay in context at all times (goal, constraints, the current unit), what to re-read fresh instead of remembering (any file before editing it, the ledger at the start of each unit), what to summarise and drop (finished units, long logs and test output), and how to avoid reading large files whole (search first, read ranges).
5. Checkpoints: at fixed intervals (for example every five to ten units), run the full test suite, compare the ledger against the actual repository state, and fix drift before continuing.
6. Handoff triggers: the signs that it is time to compact, start a fresh session or hand off (context nearly full, repeated mistakes, re-reading the same files, session time limit approaching), and what the handoff note must contain so a fresh session can resume from the ledger alone.
7. Provide a ready-to-use ledger template in Markdown.
8. Before answering, check that every constraint stated in the task appears in the ledger template, and that the plan works without any specific tool's memory or subagent features (mention them only as optional).

If the task description lacks a definition of done or a way to verify units (no tests and no other check), say so first and propose a verification approach before the rest of the plan.
</task>

<constraints>
- Tool-agnostic: describe capabilities, not products.
- Prefer files the user can read and edit over hidden agent memory.
- Keep the routine simple enough that the agent will actually follow it on unit 90 as on unit 1.
</constraints>

<output_format>
## Task shape
Units of work, estimated count, per-session capacity and ordering constraints.
## Ledger
Where it lives, what it holds and when it is updated.
## Working loop
Numbered per-unit routine.
## Context budget
Three lists: always keep, re-read fresh, summarise and drop.
## Checkpoints
When and what is verified.
## Handoff triggers
Signals, and the contents of a handoff note.
## Ledger template
A fenced Markdown template.
## Risks
What could still go wrong and how the plan catches it.
</output_format>
