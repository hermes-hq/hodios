---
schema: 1
id: implement-state-machine
kind: prompt
title: Implement a state machine
description: Models a business process such as an order, booking or approval as an explicit state machine with states, transitions, guards and side effects, then implements it with exhaustive tests.
category: implementation
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, software-engineer, fullstack-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests, diagram]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [state-machine, finite-state-machine, status-flags, business-rules, optimistic-locking]
pairs_with:
  personas: [backend-engineer]
  prompts: [design-database-schema, write-property-based-tests, extract-module]
args:
  - name: process
    description: The business process and its rules, or the code that currently manages it with status fields and flags.
    type: text
    required: true
  - name: stack
    description: Language and framework. Leave empty to detect it from the repo.
    type: string
  - name: persistence
    description: How the entity is stored, for example "Postgres via SQLAlchemy" or "DynamoDB". Leave empty to detect it.
    type: string
output_contract:
  format: markdown
  sections: [State model, Open questions, Changes, Tests, Migration notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Business processes usually grow as a pile of booleans and status strings (`is_paid`, `is_shipped`, `cancelled_at`, `status = 'pending_review'`) checked in scattered `if` statements. The result is impossible combinations (shipped but not paid), transitions that skip a step, side effects that fire twice, and two requests that both move the same order from "pending" at the same moment. An explicit state machine makes the legal states and transitions a single table that can be read, tested exhaustively and enforced at the database, with side effects attached to transitions instead of sprinkled around.
</context>

<task>
Model and implement this process as an explicit state machine:

<process>
{{process}}
</process>

{{#stack}}
Stack: {{stack}}
{{/stack}}
{{#persistence}}
Persistence: {{persistence}}
{{/persistence}}

1. If you were given code, read every place that reads or writes the status fields and flags, and list the combinations that actually occur. Do not assume the process description matches the code; note differences.
2. Model the machine:
   - **States:** a closed set with one-line meanings; terminal states marked. Replace combinations of flags with single states where they represent one; keep orthogonal concerns (for example payment versus fulfilment) as separate machines only if they truly vary independently.
   - **Events and transitions:** a table of from-state, event, guard, to-state and side effects. Every transition not in the table is illegal.
   - **Guards:** conditions that must hold (for example "payment captured", "actor is an approver"), evaluated with the data at transition time.
   - **Side effects:** what happens on each transition (emails, charges, events, stock changes), and whether each must run inside the transaction or after commit (through an outbox or a background job), so that a rolled-back transition never sends an email.
   - **Timeouts:** transitions triggered by time (for example "unpaid after 30 minutes → expired") and what runs them.
   Draw it as a Mermaid `stateDiagram-v2`.
3. Ask about any rule the process does not specify (can a shipped order be cancelled? who can reopen a rejected request?). List them under Open questions with a proposed default; implement the default only if it is the conservative choice (the transition stays illegal), and mark it.
4. Implement it following the repo's patterns: the transition table as data or as explicit code in one module, a single `transition(entity, event, context)` entry point that checks the current state and guard, applies the change and records it, and a typed error for illegal transitions. Use a state machine library only if the repo already uses one or the user asked for it.
5. Make transitions safe under concurrency: a conditional update (`UPDATE … SET state = :to WHERE id = :id AND state = :from`, or a version column) and a check of the affected row count, so that two concurrent requests cannot both make the same transition. Record each transition in a history table (from, to, event, actor, time) for audit and debugging.
6. Enforce the closed set of states at the storage level where possible (an enum type or a check constraint).
7. Write tests: a table-driven test over every state and event pair that checks legal transitions succeed and every illegal one is rejected; each guard's pass and fail case; side effects fire exactly once and only after a successful commit; the concurrent double-transition case; and timeout transitions with a controllable clock.
8. Replace the scattered flag checks in the code you were given with calls to the state machine, keeping behaviour identical except where you fixed a documented impossible state. Run the tests and report the real results.
</task>

<constraints>
- Do not change business behaviour silently. Every behaviour difference from the current code is listed with the reason.
- If existing data contains combinations of flags that map to no state, write the mapping query and stop for a decision before migrating it.
- Keep the change as small as possible around the state machine; do not refactor unrelated code.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## State model
The Mermaid state diagram, then the transition table: from, event, guard, to, side effects, in or after transaction.
## Open questions
Table: question, proposed default, implemented as.
## Changes
One line per file.
## Tests
One line per test group and the real result of the run.
## Migration notes
How existing rows map to the new states, the data migration, and anything that needs a decision first.
</output_format>
