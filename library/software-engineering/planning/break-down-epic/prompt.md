---
schema: 1
id: break-down-epic
kind: prompt
title: Break down an epic
description: Splits an epic into small, ordered vertical slices that each deliver testable value, with acceptance checks, dependencies and spikes. Use when an epic or large feature is too big to start.
category: planning
version: 1.0.0
status: experimental
stage: [plan]
role: [tech-lead, product-manager, engineering-manager, software-engineer]
stack: []
requires: [none]
inputs: [ticket, spec, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [vertical-slicing, backlog, invest, walking-skeleton]
pairs_with:
  prompts: [write-user-stories, estimate-with-ranges, write-implementation-plan]
args:
  - name: epic
    description: The epic, feature request or goal to break down, with any notes or links.
    type: text
    required: true
  - name: team_context
    description: Team size, existing system, deadline or anything that limits the order of work.
    type: text
  - name: max_size
    description: Largest acceptable size for one item.
    type: string
    default: "2 days of work for one person"
output_contract:
  format: markdown
  sections: [Goal and scope, Slices, Spikes, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Large epics stall because they are split by technical layer ("build the database", "build the UI"), so nothing works end to end until the very last ticket. Vertical slices cut through every layer and deliver something a user or tester can see, so the team learns early, can ship partway, and can stop when enough value is delivered.
</context>

<task>
Break down this epic: {{epic}}
{{#team_context}}
Team context:
{{team_context}}
{{/team_context}}
Largest acceptable item: {{max_size}}.

1. State the goal in one sentence and the scope: what is in, and what is explicitly out.
2. Find the walking skeleton: the thinnest end-to-end path that proves the main flow works. Make it slice 1.
3. Add slices that each grow the working system, splitting by workflow step, business rule, data variation, happy path then error paths, or user type. Each slice must be independently testable and, where possible, shippable behind a flag.
4. Give every slice a one-line acceptance check that a tester could verify, its dependencies on other slices, and a relative size (S, M or L, where L is at most {{max_size}}). Split anything bigger.
5. Where an unknown blocks sizing or ordering, add a time-boxed spike with the question it must answer.
6. Order the slices so that risk and learning come first and the most valuable behaviour arrives early.
</task>

<constraints>
- No layer-only items ("set up the database", "build the API") unless something truly cannot be sliced; then say why.
- At most 15 slices. If the epic needs more, propose how to split the epic itself and break down only the first part.
- Do not invent requirements. Anything you had to assume goes under Risks and open questions.
- Each slice title starts with a verb and names user-visible behaviour.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goal and scope
One goal sentence, then "In:" and "Out:" bullets.
## Slices
Table in delivery order: #, slice, acceptance check, depends on, size.
## Spikes
Bullets: question, time box, which slices it unblocks. Or "None".
## Risks and open questions
Numbered.
</output_format>
