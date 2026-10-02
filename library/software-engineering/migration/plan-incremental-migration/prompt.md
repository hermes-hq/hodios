---
schema: 1
id: plan-incremental-migration
kind: prompt
title: Plan an incremental migration
description: Plans a framework, platform or system migration as small reversible phases using the strangler fig pattern, with data strategy, verification and rollback per phase. Use instead of a big-bang rewrite.
category: migration
version: 1.0.0
status: experimental
stage: [plan, design]
role: [architect, tech-lead, engineering-manager, software-engineer]
stack: []
requires: [none]
inputs: [text, document, repo]
output: [plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [strangler-fig, branch-by-abstraction, expand-contract, parallel-run]
pairs_with:
  personas: [software-architect]
  prompts: [write-adr, plan-spike]
args:
  - name: current
    description: The system, framework or platform you are moving away from.
    type: text
    required: true
  - name: target
    description: What you are moving to.
    type: text
    required: true
  - name: context
    description: Size of the system, traffic, team, deadline, data involved, and what must not break.
    type: text
output_contract:
  format: markdown
  sections: [Goal and definition of done, Current state, Approach, Phases, Data, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Big-bang migrations freeze feature work, pile up risk until a single cutover, and are hard to undo. Incremental migrations move one slice at a time behind a seam, run old and new side by side where needed, and keep every step shippable and reversible. The plan has to make each step's verification and rollback explicit, because that is where migrations actually fail.
</context>

<task>
Plan the migration from {{current}} to {{target}}.
{{#context}}
Context:
{{context}}
{{/context}}

1. Goal: state why the migration is happening, the definition of done (including when the old system is switched off), and the non-goals.
2. Current state: inventory the parts to move (modules, endpoints, jobs, data stores, integrations), how they depend on each other, and who owns them. If you can read the repository, build this from the code; otherwise use the context and mark gaps.
3. Approach: choose the seam technique for each part and say why: routing proxy (strangler fig), branch by abstraction, adapter or anti-corruption layer, or parallel run with result comparison. Say when a full rewrite of a part is cheaper, and why.
4. Phases: order the slices so the first one is thin, end to end and low risk but teaches the most. For each phase give entry criteria, the work, how it is verified (tests, shadow traffic, comparing outputs, metrics), how it is rolled back, and exit criteria.
5. Data: plan any data move with expand and contract steps (add new, dual write or backfill, verify, switch reads, remove old), how consistency is checked, and the point after which rollback needs a data fix.
6. Decommissioning: what gets deleted and when, so the old system does not live forever.
</task>

<constraints>
- Every phase must leave production working and be reversible. Call out any one-way step explicitly, with what makes it safe.
- No big-bang cutover unless the part is small enough that a rollback is cheap; justify it when you choose one.
- Do not invent system sizes, traffic or dates. Use the numbers given and mark assumptions.
- Keep feature work possible during the migration, or say plainly when it must pause and for how long.
{{> output/uncertainty}}
</constraints>

<output_format>
## Goal and definition of done
## Current state
Bullets or a small table, with gaps marked.
## Approach
Per part: technique — reason.
## Phases
Numbered. Each: goal — entry criteria — work — verification — rollback — exit criteria.
## Data
Expand and contract steps, consistency checks, point of no easy return.
## Risks and open questions
Numbered: risk or question — what it affects — mitigation or who answers it.
</output_format>
