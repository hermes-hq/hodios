---
schema: 1
id: test-concurrent-code
kind: prompt
title: Test concurrent code
description: Writes tests for concurrent code - shared state, locks, queues, worker pools, database races - using controlled interleavings, stress loops and race detectors, so races fail tests reliably.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, backend-engineer]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [concurrency, race-condition, thread-safety, stress-testing]
pairs_with:
  prompts: [debug-race-condition, test-asynchronous-code, find-lock-contention]
  personas: [test-engineer]
args:
  - name: target
    description: The concurrent code to test (type, function, worker, endpoint) and the invariant it must keep, for example "balance never negative", "each job processed once".
    type: text
    required: true
  - name: language
    description: Language and runtime, if not obvious from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Invariants and shared state, Tests, Tools used, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A concurrency test that passes once proves almost nothing: the bad interleaving may happen once in ten thousand runs. Effective tests make the dangerous interleaving likely or certain. Techniques, from cheapest: run the language's race detector over the tests (Go `-race`, ThreadSanitizer for C, C++ and Rust, Java tools such as jcstress for memory-model questions); force interleavings with latches, barriers or injected hooks so two operations reach the critical section at the same moment; stress with many goroutines, threads or tasks in a loop and assert the invariant afterwards; use deterministic schedulers or model checkers where the ecosystem has one (loom for Rust, for example) to explore orderings systematically. Database races (check-then-insert, lost updates, double processing of a queue row) need real concurrent transactions against a real database, not an in-memory fake, and assertions on the final rows. Every test asserts an invariant, not just "no crash".
</context>

<task>
Write concurrency tests for:
{{target}}
{{#language}}
Language and runtime: {{language}}
{{/language}}

1. Read the code and identify the shared state (fields, caches, maps, files, database rows, external resources), how access is synchronised (locks, atomics, channels, transactions, isolation levels, unique constraints), and the invariants that must hold.
2. List the risky interleavings: check-then-act, read-modify-write, lazy initialisation, iteration while modifying, lock ordering that could deadlock, double delivery or double processing, lost wakeups.
3. For each risky interleaving, write a test:
   - a deterministic one where possible, using latches, barriers or test hooks to line up the two operations at the critical point;
   - a stress test that runs many concurrent operations in a loop with a bounded duration and asserts the invariant at the end (totals, uniqueness, no lost updates);
   - for database races, concurrent transactions on a real database (container or test instance) asserting on final rows.
4. Enable the race detector or sanitizer for these tests in the test command and CI if the language has one.
5. Add a timeout to every concurrent test so a deadlock fails the test instead of hanging the suite, and report the threads or goroutines on timeout if the framework allows.
6. Run the tests many times (for example 100 iterations or with a count flag). If a test exposes a race, keep it, report it with the evidence, and propose a fix without applying it unless asked.
7. If the code is already correct, prove the tests are capable of failing by temporarily removing the synchronisation, confirming the failure, and restoring it.
</task>

<constraints>
- Every concurrency test asserts an invariant and has a timeout.
- No sleeps to arrange interleavings; use synchronisation primitives or hooks.
- Do not claim code is race-free from passing runs; state how many runs and which tools were used.
- Restore any temporary changes made to prove the tests.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Invariants and shared state
Bullets: state, synchronisation, invariants, risky interleavings.

## Tests
Diffs of the new tests and any test hooks.

## Tools used
Race detector or sanitizer, stress settings, and CI changes.

## Verification
Iterations run, failures seen, races found and the proof the tests can fail.
</output_format>
