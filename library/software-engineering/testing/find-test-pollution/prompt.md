---
schema: 1
id: find-test-pollution
kind: prompt
title: Find test pollution
description: Finds tests that pass alone but fail when run with others, by bisecting test order to the polluting test and fixing the leaked state, environment or database rows.
category: testing
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [software-engineer, qa-engineer]
requires: [repo-read, file-write, shell]
inputs: [logs, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [test-isolation, order-dependent-tests, shared-state, flaky-tests]
pairs_with:
  prompts: [fix-flaky-test, speed-up-test-suite, refactor-test-suite]
  personas: [test-engineer]
args:
  - name: victim
    description: The test that fails in the full run but passes alone, and how the suite is run (command, parallelism, random order or not).
    type: text
    required: true
  - name: failure_log
    description: The failure output from the full run.
    type: text
output_contract:
  format: markdown
  sections: [Reproduction, Polluter, Leaked state, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A test that passes alone and fails in the suite is usually not random: another test (the polluter) leaves state behind that the failing test (the victim) depends on, or the victim depends on state a "state-setter" test happens to create. Common leaks are module-level globals and singletons, caches and memoisation, environment variables and current working directory, monkeypatches or mocks not restored, clocks left frozen, database rows not rolled back (especially with code that commits inside a transaction-wrapped test), files and temp dirs, registered event handlers, and locale or timezone settings. Guessing wastes hours; the reliable method is to fix the order, then bisect the tests that run before the victim until a single polluter remains. The fix belongs in the polluter or in shared setup, so the whole class of leak stops, not in making the victim tolerate it.
</context>

<task>
Find and fix the pollution affecting:
{{victim}}
{{#failure_log}}

Failure:
{{failure_log}}
{{/failure_log}}

1. Read the victim test, its fixtures and setup, and the test configuration (ordering plugins, parallel workers, shared fixtures, database transaction handling).
2. Reproduce: run the victim alone (expect pass), then in the order that fails. If the suite uses random ordering, find and reuse the seed of a failing run. If it runs in parallel, reproduce with a single worker first. Record the exact commands.
3. Get the list of tests that ran before the victim in the failing run. Bisect: run the first half followed by the victim, then narrow to the half that still fails, until one test reproduces the failure when run just before the victim. Use the framework's tooling for this if it has some (for example a bisect or detect-pollution plugin), and say which.
4. Confirm the pair: polluter then victim fails, victim alone passes, polluter alone passes.
5. Identify the leaked state by reading the polluter: what it changes and does not restore. Confirm by inspecting that state between the two tests if needed.
6. Fix at the source: restore or isolate the state in the polluter (use the framework's scoped fixtures, teardown, monkeypatch, transaction rollback, temp directories), or fix shared setup so every test starts clean. If the victim also relies on state it never sets up, fix that too.
7. Verify with the reproducing order, then the full suite several times in random order if the framework supports it.
</task>

<constraints>
- Do not "fix" by forcing test order, marking tests to run alone, retrying or skipping.
- Do not reset or drop shared databases, or delete files outside the test's temp space, without asking first.
- If the cause is product code holding global state, say so; fixing the test isolation is still needed, but report the design issue.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Reproduction
Commands and results for victim alone and in the failing order.

## Polluter
The polluting test and the bisection steps that found it.

## Leaked state
What leaked and how it breaks the victim.

## Fix
The diff and why it removes the leak for all tests, not only this pair.

## Verification
Runs after the fix, including random-order runs and their seeds.
</output_format>
