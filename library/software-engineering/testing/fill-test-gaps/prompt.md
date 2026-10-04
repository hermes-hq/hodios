---
schema: 1
id: fill-test-gaps
kind: prompt
title: Find and fill the riskiest test gaps
description: Finds untested behaviour that matters most, ranked by risk rather than coverage percentage, and writes tests for the top gaps. Use when a module feels under-tested or before a risky change.
category: testing
version: 1.0.1
status: incubating
aliases: [test-coverage]
stage: [verify, maintain]
role: [software-engineer, qa-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [test-coverage, risk-based-testing]
pairs_with:
  personas: [test-engineer]
  prompts: [write-unit-tests]
args:
  - name: scope
    description: The module, directory or feature to examine.
    type: text
    required: true
  - name: coverage_report
    description: Output of a coverage tool for this scope, if you have one.
    type: text
  - name: max_tests
    description: The most gaps to fill with tests in this run; the rest are listed only.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Gaps, Tests, Run, Remaining gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id test-coverage."}
---
<context>
Coverage percentage measures which lines ran, not which behaviours are checked. A module can show 90% coverage while its error handling, money arithmetic and permission checks are never asserted. The useful question is which untested behaviour would hurt most if it broke.
</context>

<task>
Find the riskiest test gaps in {{scope}} and fill up to {{max_tests}} of them.
{{#coverage_report}}
Coverage data:
{{coverage_report}}
{{/coverage_report}}
1. Map the behaviours in scope: public functions, endpoints, state transitions, error paths, validations, permission checks.
2. Map the existing tests to those behaviours. A behaviour counts as covered only if a test asserts its result. Lines that merely run do not count.
3. Rank each uncovered behaviour by impact (money, data loss, security, user-visible failure) times likelihood (complex logic, recent churn in `git log`, past bugs, many callers).
4. Write tests for the top {{max_tests}} gaps, following the project's existing test conventions. Each test must assert a specific result.
5. Run them. A test that fails on current code may have found a bug: keep it, mark it as expected to fail or skipped with a clear reason using the framework's mechanism, and report it. Do not change production code.
</task>

<constraints>
- Rank by risk, not by how easy a test is to write.
- Do not write tests whose only purpose is to raise coverage, such as tests that call code without asserting a result, or tests of trivial getters.
- Cite `path:line` for every gap.
{{> guardrails/investigate-before-answering}}
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Gaps
A table, highest risk first: # | Behaviour | Where | Why it is risky | Filled (yes or no).
## Tests
The new tests as a diff.
## Run
The command and its result. List any test that exposed a bug, with input, expected and actual.
## Remaining gaps
The gaps you did not fill, one line each, or "None".
</output_format>
