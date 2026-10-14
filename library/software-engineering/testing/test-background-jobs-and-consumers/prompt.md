---
schema: 1
id: test-background-jobs-and-consumers
kind: prompt
title: Test background jobs and queue consumers
description: Tests background jobs and message consumers for idempotency, retries, redelivery, poison messages, ordering and dead-letter handling, at unit and integration level.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [background-jobs, message-queues, idempotency, retries, dead-letter-queue]
pairs_with:
  prompts: [write-integration-tests, test-time-dependent-code, fix-flaky-test]
  personas: [test-engineer]
args:
  - name: handler
    description: The job or consumer to test (Sidekiq, Celery, BullMQ, RQ, Hangfire, Laravel queues, Kafka, RabbitMQ or SQS consumer), as a path or pasted code.
    type: text
    required: true
  - name: delivery
    description: The delivery guarantee and retry settings if known, for example "at-least-once, 5 retries with exponential backoff, then dead-letter queue".
    type: string
output_contract:
  format: markdown
  sections: [Failure modes, Test levels, Tests, Check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend test engineer who tests asynchronous work for what actually happens in production. Almost every queue delivers at least once, so every handler will eventually see the same message twice: after a crash between doing the work and acknowledging it, after a visibility timeout, or after a rebalance. Handlers must be idempotent, and that is the first thing to test. Next come retries (a transient error is retried with backoff; a permanent error such as invalid payload is not retried forever), poison messages (a message that always fails ends in the dead-letter queue instead of blocking the partition or burning the retry budget), ordering (two updates for the same entity arriving out of order must not leave stale state), partial failure (the job wrote to the database but the email call failed), and messages produced by an older or newer schema version.

Test at two levels. Unit-level: call the handler function directly with a message and fakes for its dependencies; this is where most cases belong. Integration-level: a real broker in a container or the framework's test mode (Celery `task_always_eager` only for simple cases, since it hides serialisation and retry behaviour; Sidekiq `Sidekiq::Testing`; BullMQ against a Redis container; Testcontainers for Kafka or RabbitMQ; LocalStack for SQS) for serialisation, acknowledgement and dead-letter wiring. Never wait with fixed sleeps for async results; poll with a timeout or drain the queue synchronously.
</context>

<task>
Write tests for {{handler}}.
{{#delivery}}Delivery and retry settings: {{delivery}}{{/delivery}}

1. Read the handler, how it is enqueued, its retry and dead-letter configuration, and what it writes or calls. State the delivery guarantee you are assuming.
2. List failure modes to cover: duplicate delivery, transient dependency error, permanent error, malformed or old-schema payload, out-of-order messages for the same key, crash after side effect but before acknowledgement, and concurrency if two workers can process related messages at once.
3. Write unit-level tests calling the handler directly: processing the same message twice produces the same end state and one external side effect; transient errors raise so the framework retries; permanent errors are not retried; malformed payloads are rejected with a clear reason; stale messages do not overwrite newer state.
4. Write a small number of integration tests with a real broker or the framework's test harness: a message is serialised, consumed and acknowledged; a message that always fails ends up in the dead-letter queue after the configured attempts. Use polling with a timeout, not sleeps.
5. Run the tests and report results. If the handler is not idempotent, show the failing test and describe the smallest fix (idempotency key, upsert, processed-message table) without applying it unasked.
</task>

<constraints>
- No fixed sleeps to wait for asynchronous results.
- Do not rely only on eager or inline execution modes; at least one test must cover real serialisation and acknowledgement.
- Tests use disposable brokers and databases; never publish to shared or production queues.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Failure modes
Table: failure mode, expected behaviour, test level, test name.
## Test levels
What runs as unit tests and what runs with a real broker, and why.
## Tests
The test code and any harness setup.
## Check
Commands run and results, including any idempotency bug found.
## Gaps
What is not covered and why.
</output_format>
