---
schema: 1
id: speed-up-test-suite
kind: prompt
title: Speed up a slow test suite
description: Cuts test suite runtime from timing reports and setup code by fixing slow fixtures, sleeps, database resets and isolation-safe parallelism. Use when the tests themselves, not the CI config, are slow.
category: testing
version: 1.0.0
status: incubating
stage: [maintain, verify]
role: [software-engineer, qa-engineer, backend-engineer]
requires: [none]
inputs: [logs, file, text]
output: [report, diff]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [test-runtime, fixtures, parallel-tests, test-isolation, feedback-loop]
pairs_with:
  prompts: [speed-up-ci-pipeline, fix-flaky-test, refactor-test-suite]
  personas: [test-engineer]
args:
  - name: timings
    description: Per-test or per-file durations (for example pytest --durations, Jest --verbose output, JUnit XML, Go test -v output), total runtime, and the slow fixtures or setup code you suspect.
    type: text
    required: true
  - name: test_stack
    description: Language, test runner and what the tests depend on (database, containers, browsers), for example "pytest 8, Django, Postgres in Docker".
    type: string
    default: "infer from the output and say what you assumed"
output_contract:
  format: markdown
  sections: [Where the time goes, Ranked fixes, Changes, Isolation risks, How to measure]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's test suite takes too long locally or in CI, and the cause lives in the tests: setup, fixtures, waits and data handling. Stack: {{test_stack}}. (Caching dependencies and splitting CI jobs is a separate job; mention it only if the timings show the suite itself is already fast.)

Suites are usually slow because of a few patterns, not because there are many tests: fixed sleeps; expensive setup repeated per test (app boot, migrations, container start, browser launch); truncating or recreating the database instead of rolling back a transaction; real network calls and retries with backoff; end-to-end tests covering what a unit test could; and a runner that uses one core. The usual trap is making it fast by sharing state, which brings back order-dependent, flaky tests.
</context>

<task>
<timings>
{{timings}}
</timings>

1. Analyse the timings: total, the top 10 tests or files and their share, the distribution (a long tail of slow tests or uniformly slow), and setup versus test-body time where visible. Do the arithmetic: say what share of the runtime the top items hold.
2. Classify each hotspot: sleep or polling, per-test expensive setup, database reset strategy, external call, heavy test level, large data generation, slow collection or import time, or serial execution.
3. For each, propose the fix and its expected saving as a range, ranked by seconds saved per effort:
   - Sleeps: replace with condition waits or a fake clock.
   - Setup: widen fixture scope only for read-only or immutable resources (session-scoped container or app, per-test transaction).
   - Database: wrap each test in a transaction rolled back at the end, or use templated databases per worker; avoid truncating all tables per test.
   - External calls: fakes or recorded responses at the boundary; disable retries and backoff in tests.
   - Test level: move logic checks down to unit tests; keep a few end-to-end tests for the wiring.
   - Parallelism: the runner's workers (pytest-xdist, Jest workers, `go test -p`, JUnit parallel, RSpec parallel), with a resource per worker (database, port, temp directory).
   - Selection: run tests affected by changed files locally, keeping the full suite on the main branch.
   - Import or collection time: lazy imports, narrower test paths.
4. Show the code changes for the top three fixes.
5. For every change, state the isolation risk and how to guard it: randomised test order, running each file alone, and a check that no test depends on another's data.
6. Give the measurement plan: the command to time the suite, three runs before and after, and the per-test duration report to keep in CI.

If the timings do not include per-test durations, give the command that produces them for this runner and stop.
</task>

<constraints>
- Never trade isolation for speed silently; each shared resource must be immutable or reset.
- Do not delete or skip tests to save time without listing them and asking.
- Savings are estimates until measured; label them as such.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Where the time goes
Table: test or file | seconds | share of total | cause class.
## Ranked fixes
Table: fix | tests affected | estimated saving | effort | isolation risk.
## Changes
Code for the top three fixes.
## Isolation risks
Bullets with the guard for each.
## How to measure
Commands and what to record.
</output_format>
