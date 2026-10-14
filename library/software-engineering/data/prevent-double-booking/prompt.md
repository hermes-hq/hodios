---
schema: 1
id: prevent-double-booking
kind: prompt
title: Prevent double booking and overselling
description: Stops two requests from claiming the same seat, room, time range or last unit of stock, using exclusion or unique constraints, conditional updates or row locks, proven with a concurrency test.
category: data
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, fullstack-engineer]
stack: [sql]
requires: [repo-read, file-write, shell]
inputs: [repo, schema, text]
output: [code, tests, explanation]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [double-booking, overselling, exclusion-constraints, conditional-updates, race-conditions, inventory-reservation]
pairs_with:
  prompts: [implement-appointment-booking, implement-optimistic-locking, resolve-database-deadlocks]
  personas: [concurrency-specialist]
args:
  - name: resource
    description: What is being claimed (seats, rooms by date range, time slots, stock units, coupon redemptions), how claims are made in code today, and the engine and version.
    type: text
    required: true
  - name: symptom
    description: Optional. What went wrong (two confirmed bookings for one room, negative stock after a flash sale) and the volume at peak.
    type: text
output_contract:
  format: markdown
  sections: [The race, Chosen guarantee, Schema changes, Code changes, Concurrency test, Check, Clean-up of existing conflicts]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The classic bug is check-then-act: read availability, see it is free, insert the booking. Two requests do the read at the same time and both insert. Application-level checks and the default read committed isolation cannot stop this; the database must enforce the rule. Choose by the shape of the resource. Discrete slots (seat 14A on flight X, a 30-minute slot) fit a unique constraint on (resource, slot), with the loser getting a unique violation. Overlapping ranges (room bookings by dates) fit a Postgres exclusion constraint with `tstzrange` or `daterange` and `&&`, which needs the `btree_gist` extension for the equality part; MySQL has no exclusion constraints, so lock the resource row (`SELECT ... FOR UPDATE` on the room) before checking and inserting. Counted stock fits an atomic conditional update: `UPDATE stock SET available = available - 1 WHERE sku = ? AND available >= 1`, checking the affected row count. Serializable isolation also works but requires retrying on serialisation failures. Holds that expire (seat held for 10 minutes during checkout) need a status and expiry that the constraint respects.
</context>

<task>
Resource: {{resource}}
{{#symptom}}Symptom: {{symptom}}{{/symptom}}

1. Read the code path that makes a claim and the related schema. Write out the race as two interleaved requests.
2. Choose the guarantee: unique constraint, exclusion constraint, conditional update, row lock or serializable transaction, and explain why it fits this resource and engine. Include how cancelled bookings and expiring holds are excluded (for example a partial constraint on active status).
3. Write the schema change as a migration, noting lock impact and that it will fail if conflicting rows already exist.
4. Change the code: perform the claim through the guarantee, map the constraint violation or zero-row update to a clear "no longer available" result, retry only where it is safe.
5. Write a concurrency test that fires many simultaneous claims for the last unit or the same range (threads, parallel requests or two database sessions) and asserts exactly one wins. Run it against a local or disposable database.
6. Give a read-only query to find existing conflicts and a plan for resolving them before the constraint is added.
</task>

<constraints>
- Do not rely on an application-level check, a cache or a client-side lock for correctness.
- Run migrations and tests only against local or disposable databases unless the user confirms otherwise.
- Do not delete or modify existing bookings; conflict resolution is a plan for people to decide.
- Mark engine and version specifics (btree_gist, range types) as to verify.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## The race
Two-column timeline of the interleaving.

## Chosen guarantee
Choice and reason in a few lines.

## Schema changes
Migration with file path and lock notes.

## Code changes
Diffs with file paths.

## Concurrency test
Code with file path.

## Check
Test runs and their real results.

## Clean-up of existing conflicts
Read-only query and the decision needed.
</output_format>
