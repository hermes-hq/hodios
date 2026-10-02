---
schema: 1
id: review-test-quality
kind: prompt
title: Review test quality
description: Reviews a test suite or diff for weak assertions, over-mocking, hidden coupling, sleeps, nondeterminism and tests that cannot fail, with a concrete rewrite for each problem. Use when reviewing tests.
category: testing
version: 1.0.0
status: experimental
stage: [review]
role: [software-engineer, qa-engineer, tech-lead, maintainer]
requires: [repo-read]
inputs: [diff, file]
output: [report, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [test-smells, mocking, assertions, nondeterminism, mutation-testing]
pairs_with:
  prompts: [fix-flaky-test, write-unit-tests, fill-test-gaps]
  personas: [test-engineer]
  rules: [test-writing-rules]
args:
  - name: tests
    description: The tests to review, as a diff or files.
    type: text
    required: true
  - name: code_under_test
    description: The production code the tests exercise. Needed to judge what a test should catch.
    type: text
  - name: framework
    description: Test framework and language, if not obvious (for example Jest, pytest, JUnit 5, Go testing).
    type: string
output_contract:
  format: markdown
  sections: [Verdict, Findings, Bugs these tests would miss, Rewrites]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A test earns its maintenance cost only if it fails when the behaviour it covers breaks and passes otherwise. Many tests do neither: they assert that a result is "not null", verify that a mock was called with whatever the mock returned, pass because an async assertion never ran, break when an internal method is renamed, depend on the order the suite runs in, or sleep and hope. Coverage numbers do not reveal any of this. The quickest way to judge a test is to ask which plausible bug in the code under test it would catch.
</context>

<task>
Review these tests{{#framework}} ({{framework}}){{/framework}}:

<tests>
{{tests}}
</tests>
{{#code_under_test}}

<code_under_test>
{{code_under_test}}
</code_under_test>
{{/code_under_test}}

1. For each test, state in one line the behaviour it claims to check, judged from its name and body.
2. Look for tests that cannot fail: no assertion; assertions inside callbacks, loops or branches that may never run; un-awaited promises or async assertions; exceptions swallowed by `try`/`catch`; expected values computed with the same logic as the code; and comparisons of a mock's return value with itself.
3. Look for weak assertions: checking only existence, type, length or "truthy"; large snapshots nobody reads; asserting a subset when the whole result matters; and error tests that accept any exception instead of the specific one.
4. Look for over-mocking: mocking the unit under test or its pure collaborators, mocking types the project does not own instead of wrapping them, asserting call sequences instead of outcomes, and mocks whose behaviour differs from the real dependency (say how).
5. Look for hidden coupling: shared mutable fixtures, order dependence, global state, tests of private methods or internal structure, and one test covering several behaviours so a failure does not say what broke.
6. Look for nondeterminism: sleeps and fixed timeouts, real clocks and time zones, randomness without a seed, network or file-system dependence, unordered collections compared as ordered, concurrency without synchronisation, and locale-dependent formatting.
7. Mutation check: for the most important tests, name two or three small, realistic bugs in the code under test (an off-by-one, a flipped condition, a missing null check, a dropped field) and say whether each test would catch them. If the code under test was not provided, say what you infer and mark it as an inference.
8. Rewrite each problem test in the same framework and style, keeping its intent, so that it fails for the bug it should catch.

If the tests are fine, say so plainly and do not invent problems.
</task>

<constraints>
- Every finding cites the test name and line, the smell, the concrete bug it lets through or the false failure it causes, and the fix.
- Do not comment on naming or formatting unless it hides what is tested.
- Rewrites stay in the project's framework, helpers and conventions; no new test libraries unless one is clearly needed, and then say why.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: solid | usable with fixes | gives false confidence. Then the main reason.

## Findings
Numbered, most harmful first. Each: `test name:line` - smell - what it lets through or breaks on - fix.

## Bugs these tests would miss
Table: plausible bug | caught? | by which test, or which test should catch it.

## Rewrites
Code blocks with the corrected tests, one per finding that needs code.
</output_format>
