---
schema: 1
id: test-failure-paths
kind: prompt
title: Test failure and error paths
description: Tests how code handles dependency failures - timeouts, errors, malformed and partial responses, retries and fallbacks - by injecting faults at the boundary. Use when only happy paths are tested.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer, sre]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [error-handling, fault-injection, resilience, retries, timeouts]
pairs_with:
  prompts: [build-fake-for-external-api, write-integration-tests, test-app-under-bad-network]
  personas: [test-engineer]
args:
  - name: target
    description: The code to test (service, function, client wrapper, job) and the dependencies it calls (HTTP APIs, database, queue, file system, cache).
    type: text
    required: true
  - name: expected_behaviour
    description: What should happen on failure, if specified - retry policy, fallbacks, error messages, idempotency, alerts.
    type: text
output_contract:
  format: markdown
  sections: [Failure modes, Tests, Defects found, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Error-handling code is the least tested code in most systems and the code that runs during incidents. Typical defects hide there: retries without backoff or limits that amplify an outage, retrying non-idempotent calls that double-charge, timeouts never set so threads hang, exceptions swallowed and logged as success, partial writes left behind when the second of two calls fails, fallbacks that return stale or wrong data silently, and error messages that leak internals. Testing these needs faults injected at the boundary the code talks to: a fake or stub client that returns errors, delays past the timeout, malformed bodies, truncated responses, or fails on the Nth call; a network-level fake for HTTP; or a real dependency stopped in a container for integration tests. The assertions are about the system's behaviour under failure: what the caller receives, what state remains, what is retried and how often, what is logged or emitted.
</context>

<task>
Test the failure paths of:
{{target}}
{{#expected_behaviour}}

Expected behaviour on failure: {{expected_behaviour}}
{{/expected_behaviour}}

1. Read the code and its dependencies' client wrappers. List every external call and, for each, the error handling present: timeouts, retries and backoff, catch blocks, fallbacks, transactions or compensation, error mapping to callers.
2. Build a failure-mode list per call: connection refused, timeout, error status or exception by class (client error, server error, rate limited), malformed or unexpected response, partial response, slow response just under and over the timeout, failure on the second of several calls, and repeated failure exhausting retries.
3. Choose the injection point that matches existing test patterns: fakes or stubs at the client interface for unit tests, an HTTP-level fake or interceptor for client wrappers, a stopped or misbehaving container for integration tests. Reuse existing fakes.
4. Write tests per important failure mode asserting: what the caller gets (error type, message without internals, status), the state afterwards (no partial writes, or compensated), retry count and backoff (with a controlled clock), idempotency of retried operations, and logs or metrics emitted where they are part of the contract.
5. Where expected behaviour is not specified, test what the code does now only if it is clearly safe; otherwise list it as a question instead of locking it in.
6. Run the tests. When a test exposes a real defect (missing timeout, unsafe retry, swallowed error), keep the test, mark it according to the project's convention for known failures only if the user agrees, and report the defect.
</task>

<constraints>
- Inject faults at the boundary; do not mock the code under test.
- Use a controlled clock for timeouts and backoff; no real waiting for long timeouts.
- Do not lock in unsafe behaviour (double charging, silent data loss) as expected; report it.
- Do not change production code unless asked; report defects with the failing test as evidence.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Failure modes
Table: call | failure mode | current handling | tested?

## Tests
Diffs of new tests and any fakes.

## Defects found
Each with the failing test, the behaviour and the risk. "None" if none.

## Verification
Commands and results.
</output_format>
