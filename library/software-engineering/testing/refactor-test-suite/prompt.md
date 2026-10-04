---
schema: 1
id: refactor-test-suite
kind: prompt
title: Refactor tests for clarity without losing coverage
description: Cleans up a test file or suite, fixing unclear names, duplicated setup, over-mocking and assertions on internals, while proving with coverage and mutation checks that nothing stopped being tested.
category: testing
version: 1.0.0
status: incubating
aliases: [test-refactor]
stage: [maintain, verify]
role: [software-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [test-maintenance, test-readability, test-doubles, coverage]
pairs_with:
  personas: [test-engineer]
  prompts: [review-test-quality, fill-test-gaps]
args:
  - name: tests
    description: The test file or folder to refactor.
    type: text
    required: true
  - name: test_command
    description: The command that runs these tests, with coverage if available.
    type: string
output_contract:
  format: markdown
  sections: [Problems found, Diff, Coverage check, Left alone]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tests that are hard to read get skipped in review, copied with their mistakes, or deleted when they break. Cleaning them up is worth it, but a test refactor is uniquely risky: a test that silently stops checking something still passes. Every change here has to keep each test failing for the same bugs it caught before.
</context>

<task>
Refactor the tests in {{tests}}.
1. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} and record the result and coverage as the baseline.
2. Read each test and list the problems: names that do not say the behaviour and expected result, several behaviours in one test, long duplicated setup, magic values with no meaning, mocks of the code under test or of simple values, assertions on private details instead of observable behaviour, missing assertions, sleeps, and shared mutable state between tests.
3. Fix them in small steps:
   - name each test after the behaviour and the expected outcome;
   - split tests that check unrelated behaviours;
   - move repeated setup into builders, factories or fixtures that make the important values visible in the test;
   - arrange, act and assert in a clear order;
   - replace mocks of internals with real objects or fakes at the boundary;
   - assert on outcomes the caller can observe.
4. After each step, run the tests. They must still pass.
5. Prove nothing was lost: compare coverage with the baseline, and for the tests you changed most, break the production code on purpose (or run a mutation tool if the project has one) and confirm the refactored test still fails.
</task>

<constraints>
- Do not change production code, except temporarily for the mutation check; revert it afterwards.
- Do not delete a test unless another test provably covers the same behaviour; say which one.
- Do not weaken assertions or widen expected values to make a test pass.
- If a test looks wrong rather than just unclear, report it instead of silently changing what it checks.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Table: test, problem, fix applied.
## Diff
The refactor as a diff.
## Coverage check
Baseline and final test results and coverage, and the mutation checks run with their results.
## Left alone
Tests you did not change and why, plus any test that looks wrong.
</output_format>
