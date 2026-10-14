---
schema: 1
id: implement-drag-and-drop-reordering
kind: prompt
title: Implement drag-and-drop reordering
description: Implements drag-to-reorder lists and boards with persisted order via fractional keys, optimistic updates with rollback, concurrent-move handling and a keyboard alternative.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [drag-and-drop, reordering, fractional-indexing, optimistic-updates, kanban]
pairs_with:
  prompts: [build-accessible-drag-and-drop, implement-optimistic-locking, implement-realtime-updates]
args:
  - name: list_spec
    description: What gets reordered and where it is stored, for example "kanban cards within and across columns, Postgres, several people editing the same board".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Ordering model, Move flow, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a full-stack engineer adding drag-to-reorder. The drag animation is the visible part; the order has to survive reloads, other users and failures:
- Integer positions (1, 2, 3) mean moving one item rewrites many rows and two concurrent moves corrupt the order. Use fractional ordering keys: a sortable string or number between the neighbours' keys (the fractional-indexing approach, or a rank with gaps), so a move updates one row.
- The client sends the intent ("put card X between A and B", or after A in column C), not a full array of ids. The server computes the new key from the current neighbours in a transaction.
- Concurrent moves can produce equal keys or keys that grow long after many moves between the same neighbours. Break ties by id when sorting, and rebalance keys in the background when they exceed a length.
- Sort by the key with a byte-wise or "C" collation for string keys in the database; a locale collation sorts them in the wrong order.
- Moves across lists (kanban columns) change the list id and key in one update.
- Optimistic update: reorder at once in the UI, roll back and show a message if the server rejects the move, and reconcile with the server's result. With live collaboration, apply others' moves without fighting an in-progress drag.
- Use a maintained library (dnd-kit, Pragmatic drag and drop, SortableJS, or the platform's own); react-beautiful-dnd is deprecated.
- Not everyone can drag. Provide a keyboard path (the library's keyboard sensor or move up and down actions) and announce moves.
</context>

<task>
Implement reordering for:
{{list_spec}}

1. Read the current list model, how order is stored, the API, the UI list components, any drag library already used, and live update handling.
2. Write the ordering model: key type, collation, tie-break and rebalancing, plus a migration for existing rows.
3. Write the move flow from drag end to persisted order, including failure and concurrent edits.
4. Implement the migration, the move endpoint that computes keys server-side in a transaction with permission checks, the UI with optimistic update and rollback, and the keyboard alternative.
5. Write tests: move to top, bottom and between, cross-list move, two concurrent moves between the same neighbours staying consistent, rejected move rolled back, keyboard move.
6. Run the tests and linters. Fix what fails.
</task>

<constraints>
- Never trust a full order array from the client.
- Do not run a data migration on a non-local database without confirmation.
- Do not add a drag library if the project already has one.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Ordering model
Key type, collation, tie-break, rebalancing and the migration of existing rows.
## Move flow
Steps from drop to persisted order, including failure and concurrency.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and why.
</output_format>
