---
schema: 1
id: build-postgres-job-queue
kind: prompt
title: Build a job queue on Postgres
description: Builds a job queue in Postgres with FOR UPDATE SKIP LOCKED, leases that expire, retries with backoff, dead jobs, cleanup and tests, and says when to move to a real broker.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [postgres]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [code, tests, explanation]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [skip-locked, job-queue, transactional-outbox, worker-leases, retry-backoff]
pairs_with:
  prompts: [implement-background-job, implement-message-queue-consumer, fix-table-bloat-and-vacuum]
args:
  - name: requirements
    description: Job types, expected jobs per minute at peak, how long a job runs, ordering or priority needs, and the app's language and database library.
    type: text
    required: true
  - name: existing
    description: Optional. Any current queue code or library already in the project (for example an existing jobs table, or a library such as a Postgres-backed job runner).
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Schema, Enqueue and claim, Worker loop, Retries and dead jobs, Maintenance, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Postgres-backed queue is a good choice when the app already has Postgres and jobs number in the thousands per minute rather than the hundreds of thousands: enqueue can be part of the same transaction as the business write, which removes a whole class of lost or phantom jobs. The core is a claim query: `SELECT ... WHERE status = 'queued' AND run_at <= now() ORDER BY priority, run_at FOR UPDATE SKIP LOCKED LIMIT n`, then marking those rows as running with a lease expiry, in one short transaction. Holding the row lock for the whole job instead ties a connection up and breaks when jobs take minutes. Workers crash, so leases must expire and be reclaimed; jobs then run at least once and must be idempotent. A queue table is a high-churn table: without a partial index on ready jobs, regular deletion of finished rows and autovacuum keeping up, it bloats and the claim query slows. `LISTEN/NOTIFY` can wake workers but is not a delivery guarantee. Mature libraries exist for most languages; using one is often better than writing the queue.
</context>

<task>
Requirements: {{requirements}}
{{#existing}}
<existing>
{{existing}}
</existing>
{{/existing}}

1. Read the project: database access layer, migrations, how workers or processes run, and any existing queue. If a maintained Postgres-backed queue library fits the stack, recommend it and explain what it already handles; continue only if the user wants a custom one or the library does not fit.
2. Fit check: compare the stated volume and latency needs with what a Postgres queue handles comfortably; say when they should move to a broker.
3. Schema: jobs table with id, type, payload (JSONB), status, priority, run_at, attempts, max_attempts, locked_until, locked_by, last_error, timestamps; a partial index on ready jobs matching the claim query.
4. Enqueue inside the caller's transaction, with an optional unique key to prevent duplicate jobs.
5. Claim: one short transaction using `FOR UPDATE SKIP LOCKED` that sets status running and `locked_until`; run the job outside that transaction; mark done or failed afterwards. Reclaim jobs whose lease expired.
6. Retries with exponential backoff and jitter via `run_at`, a dead status after max attempts with the error kept, and a way to retry dead jobs by hand.
7. Maintenance: delete or archive finished jobs on a schedule, autovacuum settings for the table if needed, and metrics (queue depth, oldest ready job age, dead count).
8. Tests: concurrent workers never run the same job at once, a crashed worker's job is reclaimed, retries back off, enqueue rolls back with its transaction. Run them against a local or disposable Postgres.
</task>

<constraints>
- Run migrations and tests only against local or disposable databases unless the user confirms otherwise.
- Never hold the claim transaction open for the duration of a job.
- State plainly that delivery is at least once and job handlers must be idempotent.
- Do not add a new dependency without saying so and why.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Fit check
Three to five lines, including library recommendation.

## Schema
Migration SQL with file path.

## Enqueue and claim
Code with file path.

## Worker loop
Code with file path.

## Retries and dead jobs
Code and rules.

## Maintenance
Cleanup job, vacuum notes, metrics.

## Tests
Code with file path.

## Check
Commands run and their real results.
</output_format>
