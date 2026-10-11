---
schema: 1
id: test-asynchronous-code
kind: prompt
title: Test asynchronous code reliably
description: Writes tests for promises, callbacks, event emitters, streams and eventually consistent results without sleeps, unawaited assertions or false passes.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer, frontend-engineer]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [async, promises, event-driven, eventual-consistency]
pairs_with:
  prompts: [test-time-dependent-code, fix-flaky-test, test-concurrent-code]
  personas: [test-engineer]
args:
  - name: target
    description: The asynchronous code to test (function, handler, job, stream, component) and the behaviour that matters.
    type: text
    required: true
  - name: problem
    description: What goes wrong today, if anything - tests that pass when they should fail, sleeps, timeouts, unhandled rejections.
    type: text
output_contract:
  format: markdown
  sections: [Async patterns found, Tests, How each test waits, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Asynchronous tests fail in two opposite ways. False passes: the test returns before the promise settles, an assertion inside a callback never runs, an expected rejection is not awaited, or an error is swallowed by an event emitter, so the test is green no matter what the code does. Flakiness: the test sleeps for a guessed duration and the work takes longer under load, or asserts before a background job or eventually consistent read model catches up. The fixes are mechanical once named: always await or return the promise, use the framework's rejection assertions (`await expect(p).rejects`, `pytest.raises` inside an async test, `assertThrows` around a blocking get), count assertions or use `done`-style callbacks only where the API is callback-based, convert events to promises with a timeout, drive time with fake timers, and poll for eventual results with a bounded condition wait instead of sleeping. Making background work awaitable from the test (returning a handle, flushing a queue, running the job inline in tests) beats waiting on it from outside.
</context>

<task>
Write reliable tests for:
{{target}}
{{#problem}}

Current problem: {{problem}}
{{/problem}}

1. Read the code under test and existing tests. Identify each asynchronous pattern: promises or async/await, callbacks, event emitters or observables, streams, timers, background jobs or queues, eventually consistent reads, and the language's concurrency primitives (futures, coroutines, channels).
2. For existing tests, find false-pass risks: missing await or return, assertions inside callbacks with no guarantee they run, unawaited rejections, sleeps, catch blocks that swallow failures. Show each with a line reference.
3. Write or fix tests so each one waits on the exact completion it depends on:
   - promises: await and assert on the resolved value; assert rejections with the framework's rejects or raises helper;
   - callbacks and events: wrap in a promise that resolves on the event and rejects on error or a bounded timeout;
   - streams: consume to completion and assert on the collected output and on error events;
   - timers: use fake timers and advance them;
   - background jobs: run them inline or flush the queue in tests, or expose a completion handle;
   - eventual consistency: poll a condition with a bounded wait and a clear failure message.
4. Cover the asynchronous failure modes: rejection or error, timeout, cancellation or abort, and out-of-order completion where order matters.
5. Prove the tests can fail: temporarily break the code (for example remove the await in the implementation or return the wrong value) and confirm the tests catch it, then restore.
6. Run the tests repeatedly (for example 20 times) and in parallel with the suite to confirm they are stable.
</task>

<constraints>
- No fixed sleeps for synchronisation.
- Every assertion must be guaranteed to run; use assertion counts or awaited wrappers where needed.
- Fail on unhandled rejections or errors rather than ignoring them.
- Restore any temporary breakage made to prove the tests.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Async patterns found
Bullets with locations, plus false-pass risks in existing tests.

## Tests
Diffs of new or fixed tests.

## How each test waits
Table: test | waits on | timeout bound.

## Verification
Repeated-run results and the deliberate-breakage check.
</output_format>
