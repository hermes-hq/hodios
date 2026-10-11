---
schema: 1
id: fix-background-worker-not-processing
kind: prompt
title: Fix a background worker that is not processing jobs
description: Finds why Celery, Sidekiq, BullMQ or similar workers do not pick up or finish jobs, checking queue names, broker config, serialisation, crashes, visibility timeouts and concurrency.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, software-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [logs, config, file, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [job-queues, celery, sidekiq, bullmq, message-broker]
pairs_with:
  prompts: [fix-scheduled-job-not-running, implement-background-job]
args:
  - name: symptom
    description: What happens to the jobs, for example "enqueued but never run", "stuck in active", "run twice", "worker idle while the queue grows", and since when.
    type: text
    required: true
  - name: setup
    description: The queue library and version, broker (Redis, RabbitMQ, SQS), how jobs are enqueued and how workers are started (command, Procfile, compose or Kubernetes spec), and any worker logs.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Where the job stops, Checks to run, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer who debugs job queues by following one job from enqueue to acknowledgement. A job can stop at each hop, and the cause differs:
- Never reaches the broker: enqueue inside a database transaction that rolls back, enqueue before commit so the worker cannot find the row, a different broker URL or Redis database number in the web app and the worker, a missing `await` on the enqueue call.
- On the broker but no worker consumes it: the job is routed to a queue the worker does not listen on (Celery `task_routes` and `-Q`, Sidekiq queue list and weights, BullMQ queue name or prefix), the worker process is not running in that environment, or it runs an old code version without the task registered ("unregistered task").
- Picked up but fails: serialisation (pickle versus JSON, objects that are not serialisable, Sidekiq arguments that must be simple JSON types), import errors in the worker, missing environment variables that the web process has.
- Stuck or duplicated: a long job exceeding the visibility timeout or lock duration so the broker hands it to another worker (SQS visibility timeout, Celery with Redis `visibility_timeout`, BullMQ stalled jobs), prefetch holding jobs on a busy worker, a worker killed by the OOM killer mid-job, a blocking call starving an async worker's event loop.
- Silent loss: acknowledgement before work finishes (`acks_late` off), retries exhausted into a dead set or failed queue no one watches.
</context>

<task>
Find why jobs are not being processed.

Symptom:
{{symptom}}

Setup:
{{setup}}

1. If you can read the repository, open the enqueue call, the task or job definition, the queue and routing config, and the worker start command before answering.
2. State where the job most likely stops (not enqueued, enqueued but not consumed, consumed but failing, stuck, lost) and why the evidence points there.
3. Give the checks that confirm the hop, cheapest first: queue length and queue names on the broker, the worker's startup log listing queues and registered tasks, the failed or dead queue, worker memory and restarts, the broker URL each process actually resolves. Show the commands for the library in use and ask for the output if the cause is not certain; then stop.
4. Name the cause.
5. Give the smallest fix: matching queue names, enqueue after commit, aligned broker settings, JSON-safe arguments (pass ids, not objects), a visibility timeout longer than the longest job, late acknowledgement with idempotent jobs, or a worker deployment for the missing environment. Show it as a diff or config.
6. Say how to confirm: enqueue one job and watch it reach completion in the logs or the queue UI.
</task>

<constraints>
- Do not suggest flushing Redis, purging queues or deleting dead-letter jobs without saying what data is lost and asking first.
- If the fix makes jobs retry or run late, say whether the job is safe to run twice; if not, say what makes it idempotent.
- Do not invent configuration keys; name them for the library and version given, and say when a setting changed between versions.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Where the job stops
The hop and the evidence.
## Checks to run
Commands for this library and broker, with how to read them.
## Cause
The cause, or "Waiting for check results".
## Fix
Diff or config change.
## Check
How to confirm one job completes.
</output_format>
