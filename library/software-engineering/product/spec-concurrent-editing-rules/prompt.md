---
schema: 1
id: spec-concurrent-editing-rules
kind: prompt
title: Specify concurrent editing rules
description: Specifies what happens when two people or a person and an automation change the same record at once, with conflict detection, lock or merge rules per field, user messages and edge cases.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, fullstack-engineer, backend-engineer]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [edit-conflicts, collaboration, data-integrity, requirements]
pairs_with:
  prompts: [list-feature-edge-cases, spec-record-status-lifecycle, spec-roles-and-permissions]
args:
  - name: feature_description
    description: The records people edit (orders, tickets, documents, schedules), who edits them, how often at the same time, and any automations or integrations that also write to them.
    type: text
    required: true
  - name: context
    description: How the product saves today (save button, autosave, offline mobile), known complaints about lost changes, and what the data is used for downstream.
    type: text
output_contract:
  format: markdown
  sections: [Collision scenarios, Strategy per record and field, Detection and saving rules, What the user sees, Edge cases, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most products have no stated rule for simultaneous edits, so they get the accidental one: last write wins, silently. Two support agents update the same ticket and one reply vanishes; a planner changes a shift while a sync job overwrites it from the HR system; a mobile user edits offline and their save replaces a week of colleagues' changes. The fix is a product decision before it is a technical one, and it differs by data. Free text often tolerates last-write-wins with a warning; money, stock levels, status changes and anything with approval or audit meaning usually needs detection (the save is rejected if the record changed since it was opened) plus a clear choice for the user; long documents edited together may need live co-editing or section locks. Hard locks feel safe but cause stale locks when someone walks away. A good spec states the strategy per record type and per field, what counts as a conflict, what each person sees, and how automations, imports and offline clients are treated, because they are the writers people forget.
</context>

<task>
<feature>
{{feature_description}}
</feature>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. List realistic collision scenarios: two people, a person and an automation or integration, a person on two devices, an offline client returning, and a bulk import, with how often each is likely and the harm if a change is lost.
2. Choose a strategy per record type and, where they differ, per field group: last write wins with notice, detect and ask, automatic field-level merge when fields do not overlap, append-only (comments, history), pessimistic lock with timeout, or live co-editing. Justify each by the cost of a lost change.
3. Specify detection and saving rules: what "changed since you opened it" means, whether non-overlapping field edits merge silently, how counters and quantities are adjusted rather than overwritten, how locks are taken, shown, expire and are broken, and who may break them.
4. Specify what the user sees: presence indicators if any, the conflict message, a side-by-side of their change and the current value, the choices offered (keep mine, take theirs, merge, copy my text), and that unsaved text is never discarded without a way to recover it.
5. Cover edge cases: status transitions that are no longer valid, deleted or permission-changed records, automations that should yield to people or vice versa, notifications and audit history for overwritten values.
6. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Do not prescribe the implementation (version columns, CRDTs, specific libraries); state the behaviour and the requirement.
- Never accept silent loss of a user's typed text as a default; if the user wants last-write-wins, still require a way to recover the overwritten value.
- Treat money, stock, status and approval fields separately from free text; do not apply one rule to everything.
- If the product's saving model (manual save, autosave, offline) is unknown, state the assumption or ask, since the rules depend on it.
- Do not invent usage numbers; give likelihood as a judgement and mark it as one.
</constraints>

<output_format>
## Collision scenarios
Table: scenario, writers, likelihood (judgement), harm if a change is lost.
## Strategy per record and field
Table: record or field group, strategy, reason.
## Detection and saving rules
Numbered rules, including locks and merges.
## What the user sees
Bullets, with draft message copy for the conflict and lock states.
## Edge cases
Table: case, expected behaviour.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
