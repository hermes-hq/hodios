---
schema: 1
id: write-integration-tests
kind: prompt
title: Write integration tests with real dependencies
description: Writes integration tests that run against real dependencies such as databases and queues in containers, with fixtures, isolation between tests and cleanup. Use when mocks hide bugs at the boundary.
category: testing
version: 1.0.1
status: incubating
aliases: [test-integration]
stage: [verify, build]
role: [backend-engineer, software-engineer, qa-engineer, fullstack-engineer]
stack: [docker]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, config]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [integration-tests, testcontainers, test-isolation, fixtures, real-dependencies]
pairs_with:
  personas: [test-engineer]
  prompts: [write-unit-tests, write-contract-tests, fix-flaky-test, write-docker-compose]
args:
  - name: code
    description: The code under test (repository, service, handler or worker) and how it is wired, or the path to it.
    type: text
    required: true
  - name: dependencies
    description: The real dependencies to run, with versions matching production, for example "Postgres 16, Redis 7, RabbitMQ 3.13".
    type: string
output_contract:
  format: markdown
  sections: [Test plan, Setup, Tests, How to run, Notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id test-integration."}
---
<context>
Integration tests exist to catch what mocks cannot: SQL that only fails on the real engine, transaction and locking behaviour, migrations, serialisation across a queue, unique constraints, time zones and encodings. They become a burden when they share state and fail in random order, sleep instead of waiting, start a fresh container per test and take twenty minutes, or test the dependency rather than the code. Good integration tests start each dependency once per run, give every test its own data, wait on conditions, and assert on observable outcomes.
</context>

<task>
Write integration tests for:
<code>
{{code}}
</code>
{{#dependencies}}
Dependencies: {{dependencies}}
{{/dependencies}}

1. Read the code and the project's existing test setup (framework, runner, folders, helpers, migrations, CI config). Follow what exists. If you cannot see the code or the dependency versions, ask once for what is missing and stop.
2. Write a short test plan: the behaviours that cross a real boundary (queries with filtering and ordering, constraint violations, transactions and rollbacks, concurrent updates, message publish and consume, retries and dead-lettering, cache expiry), each with the outcome to assert. Leave pure logic to unit tests.
3. Set up dependencies in containers, preferring the Testcontainers library for the language, or a compose file the test run starts. Pin image versions to match production. Start each container once per test run or suite, not per test. Apply the real schema migrations, not a hand-written schema.
4. Isolate tests. Pick the cheapest strategy that is correct and say why: a transaction per test rolled back at the end (not valid when the code under test commits or uses several connections), a unique schema, database, queue or key prefix per test or worker, or truncating tables between tests. Make tests safe to run in parallel or mark them serial.
5. Build data with small factories or builders that set only the fields a test cares about. No shared mutable fixtures.
6. Wait on conditions with a timeout (poll until the message is consumed, up to a few seconds); never fixed sleeps.
7. Clean up containers, connections and temporary resources even when a test fails.
8. Run the tests and report the real result. If you cannot run them (no container runtime), say so plainly.
</task>

<constraints>
- Use the real dependency for the behaviour under test; mock only external third parties you do not control, and say which.
- Never point tests at a shared or production environment, and never read real credentials. Use container-generated connection settings.
- Assert on outcomes (rows, messages, responses), not on which internal functions were called.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Test plan
A table: behaviour, dependency, assertion.
## Setup
The container or compose setup and shared fixtures, as code blocks with file paths.
## Tests
The test files, as code blocks with file paths.
## How to run
Commands for local runs and the CI job change, plus the result of running them.
## Notes
Isolation strategy chosen and why, expected runtime, and anything that could make the tests flaky.
</output_format>
