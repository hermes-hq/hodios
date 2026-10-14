---
schema: 1
id: implement-optimistic-locking
kind: prompt
title: Prevent lost updates with optimistic locking
description: Prevents lost updates with version columns or ETags, conflict responses and a user path to reload or merge. Use when two people or processes can edit the same record.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [optimistic-locking, concurrency-control, etag, lost-update, orm]
pairs_with:
  prompts: [build-rest-endpoint, resolve-database-deadlocks]
  personas: [backend-engineer]
args:
  - name: resource
    description: The record or records that get overwritten, how they are edited (form, API, background job) and what users currently see when it happens.
    type: text
    required: true
  - name: stack
    description: Language, framework, ORM, database and frontend. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer fixing lost updates: two people load a record, both save, and the second save silently erases the first. Optimistic locking detects this instead of blocking readers. What to get right:
- Use an integer version column incremented on every update; the update runs `WHERE id = ? AND version = ?` and zero affected rows means a conflict. Timestamps make weak versions because of clock precision and equal values. Most ORMs support this natively: JPA and Hibernate `@Version`, Rails `lock_version`, EF Core concurrency tokens or `rowversion`, Laravel and Django need a filtered update or a package. Use the native mechanism when it exists.
- Bulk updates, raw SQL and some ORM `update` methods bypass the version check and increment. Find them.
- If an aggregate's children are edited through the parent, bump the parent's version too, or two child edits can conflict silently.
- Over HTTP, return the version as an `ETag` on `GET` and require `If-Match` on `PUT` and `PATCH`; a mismatch returns 412 Precondition Failed, and a missing header can return 428 Precondition Required. If the API already carries the version in the body, a mismatch returns 409 Conflict. Follow the project's existing convention.
- The user path matters as much as detection: tell the user someone else changed the record, show what changed, and let them reload or reapply their edits. Never retry a user's edit automatically on top of new data; that recreates the lost update. Automatic retry is fine for machine read-modify-write loops that recompute from fresh data.
- Pessimistic locks (`SELECT ... FOR UPDATE`) suit short, high-contention server-side sections, not edits that span a user's think time.
</context>

<task>
Add optimistic locking for:
{{resource}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the model, every code path that writes it (endpoints, jobs, admin tools, bulk updates), and the edit UI.
2. State the design: version mechanism, HTTP contract, conflict status code, which write paths get the check, and the user-facing conflict handling.
3. Add the migration (backfilling existing rows), the ORM configuration, the conditional updates for paths that bypass the ORM, the conflict-to-HTTP mapping, and the frontend handling: send the version, show a conflict message with reload and a view of the other changes.
4. Write tests that simulate two concurrent edits, then run them and the type check.
</task>

<constraints>
- Do not switch to pessimistic locks held across user think time.
- Do not auto-merge or auto-retry user edits without asking.
- Write migrations that are safe on a populated table; flag any that lock large tables.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed. List any write paths that still bypass the check.
## Tests
One line per test. Cover at least: the second of two concurrent saves gets a conflict, a save with the current version succeeds and increments it, a missing `If-Match` is handled as decided, and bulk or job writes respect the version.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the team, with the default chosen.
</output_format>
