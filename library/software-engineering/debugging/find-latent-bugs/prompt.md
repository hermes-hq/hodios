---
schema: 1
id: find-latent-bugs
kind: prompt
title: Find and fix latent bugs before users do
description: Hunts a codebase or module for latent functional bugs such as unhandled edge cases, missing guards, silent failures, races and leaks, proves each with a failing test, then fixes it.
category: debugging
version: 1.0.0
status: incubating
aliases: [analysis-error-discovery, analysis-codebase-health, analysis-test-and-fix]
stage: [verify, maintain]
role: [software-engineer, qa-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [bug-hunting, edge-cases, error-handling, failing-test-first]
pairs_with:
  personas: [debugger, test-engineer]
  prompts: [review-error-handling, fill-test-gaps, write-property-based-tests, find-root-cause]
args:
  - name: target
    description: The repository, directory or module to hunt in.
    type: text
    required: true
  - name: mode
    description: Report findings only, or prove and fix them.
    type: enum
    enum: [fix, report]
    default: fix
  - name: test_command
    description: The command that runs the tests, if not obvious from the repository.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Findings, Fixes, Suspected but unproven, Check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Latent bugs are the ones nobody has reported yet: the empty list that crashes a report, the promise whose rejection disappears, the cleanup that never runs, the two requests that interleave badly. Reading code for "smells" produces long lists of maybes. This hunt only counts a bug once a test proves it: the test fails on the current code for a reason a user could hit, and passes after the fix. Style and cosmetic issues are out of scope.
</context>

<task>
Hunt for latent bugs in {{target}}. Mode: {{mode}}.
{{#test_command}}Run tests with `{{test_command}}`.
{{/test_command}}1. Map the code: entry points, the main data flows, and where state, I/O and concurrency live. Prioritise code that handles money, data writes, authentication, parsing and anything with recent bug history.
2. Look for functional defects:
   - edge cases: empty, zero, negative, very large, duplicate and unicode inputs; boundaries and off-by-one; time zones and dates;
   - missing guards: null or undefined access, unchecked array indexes, missing defaults, unvalidated assumptions about external data;
   - silent failures: swallowed exceptions, ignored return values or errors, unawaited promises, fallbacks that hide a failure;
   - concurrency: check-then-act races, shared mutable state, stale closures, missing locks or transactions;
   - resources: unclosed files, connections or subscriptions, effects without cleanup, unbounded caches and queues;
   - broken invariants: states the data model allows but the code assumes cannot happen.
3. For each suspect, write the smallest test that exercises the triggering input or interleaving. Run it. Keep only suspects whose test fails on the current code for the stated reason.
4. In fix mode, fix each proven bug with the smallest change at its root cause, keep the test, and run the full suite. In report mode, keep the failing tests and propose the fixes without applying them.
5. Rank findings by impact: data loss or corruption, crashes, wrong results, then degraded behaviour.
</task>

<constraints>
- A finding needs a test that fails on the current code. Anything you could not prove goes under "Suspected but unproven", with what would prove it.
- Tests must be deterministic and isolated: no sleeps, no shared state, seeded randomness.
- Fix causes, not symptoms; do not wrap a crash in a catch that hides it.
- Do not report style, naming or formatting issues.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Summary
Areas covered, bugs proven, tests added, bugs fixed.
## Findings
Most severe first. Each: **[critical | high | medium]** title — file and line — the triggering input or sequence — what goes wrong for a user — the test that proves it.
## Fixes
The diff for each fix (fix mode) or the proposed fix (report mode).
## Suspected but unproven
Suspects without a failing test, and what would settle each.
## Check
The test command run before and after, with results.
</output_format>
