---
schema: 1
id: fix-flaky-test
kind: prompt
title: Fix a flaky test
description: Finds why a test passes and fails intermittently and fixes the cause instead of adding retries. Use when a test fails only sometimes, locally or in CI.
category: testing
version: 1.0.0
status: incubating
stage: [verify]
role: [software-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, logs]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [flaky-tests, race-condition]
pairs_with:
  personas: [test-engineer]
  prompts: [triage-failing-ci]
args:
  - name: test
    description: Test name, file or failing CI job to investigate.
    type: text
    required: true
  - name: failure_log
    description: Output from a failing run, if you have one.
    type: text
output_contract:
  format: markdown
  sections: [Cause, Fix, Evidence]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A flaky test passes and fails on the same code. Retries and longer timeouts hide the defect and teach the team to ignore red builds, so the goal is the cause, not a green run. Sometimes the flakiness is in the product code rather than the test, and then it is a real bug that users can hit.
</context>

<task>
Investigate {{test}}.
{{#failure_log}}Start from this failing output:
{{failure_log}}
{{/failure_log}}
1. Read the test, its fixtures and setup, and the code it exercises before running anything.
2. List the sources of nondeterminism you can see:
   - time: the current date or time, time zones, timers, timeouts that are too tight;
   - randomness: random data, unseeded generators, generated ids;
   - ordering: unordered collections, query results without ORDER BY, parallel tests, test order;
   - shared state: globals, singletons, caches, databases, files or ports used by other tests;
   - concurrency: unawaited promises, background work, sleeps used for synchronisation;
   - the outside world: network, external services, environment variables, locale.
3. Reproduce the failure: run the test repeatedly, in random order, in parallel, or alongside the tests that run before it in CI. Report how often it fails.
4. Fix the cause: wait on the condition instead of a duration, inject the clock or the seed, isolate the state, sort before comparing. If the race is in the product code, fix it there and say so.
5. Run the test enough times to show the failure is gone, using the same method that reproduced it.
</task>

<constraints>
- Never add retries, sleeps or longer timeouts as the fix.
- Never delete, skip or quarantine the test as the fix. If quarantine is needed while the fix lands, say so separately.
- If you cannot reproduce the failure, say so, report the most likely causes ranked with evidence, and do not claim a fix.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Cause
One paragraph: the nondeterminism and how it makes the test fail. Say whether it is in the test or in the product code.
## Fix
The diff, then one sentence on why it removes the cause.
## Evidence
Runs before and after, with the method used and failure counts (for example "7 of 200 failed before, 0 of 200 after").
</output_format>
