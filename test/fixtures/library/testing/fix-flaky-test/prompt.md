---
schema: 1
id: fix-flaky-test
kind: prompt
title: Fix a flaky test
description: Finds why a test passes and fails intermittently and fixes the cause instead of adding retries. Use when a test fails only sometimes, locally or in CI.
category: testing
version: 1.0.0
status: experimental
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
authorship: human
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A flaky test passes and fails on the same code. Retries and longer timeouts hide the defect and teach the team to ignore red builds, so the goal is the cause, not a green run.
</context>

<task>
Investigate {{test}}.
{{#failure_log}}Start from this failing output:
{{failure_log}}
{{/failure_log}}
1. Read the test and the code it exercises before running anything.
2. List the sources of nondeterminism you can see: time, randomness, ordering, shared state, concurrency, network, environment.
3. Reproduce the failure by running the test repeatedly or in a different order. Report how often it fails.
4. Fix the cause, then run the test enough times to show the failure is gone.
</task>

<constraints>
- Never add retries, sleeps or longer timeouts as the fix.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Cause
One paragraph: the nondeterminism and how it makes the test fail.
## Fix
The diff, then one sentence on why it removes the cause.
## Evidence
Runs before and after, with failure counts.
</output_format>
