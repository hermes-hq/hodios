---
schema: 1
id: write-unit-tests
kind: prompt
title: Write unit tests
description: Writes unit tests that pin a unit's behaviour, covering boundaries, errors and edge inputs in the project's own test style, and proves each test can fail. Use for new or untested code.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [software-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [unit-tests, edge-cases]
pairs_with:
  personas: [test-engineer]
args:
  - name: target
    description: The file, module, class or function to test.
    type: text
    required: true
  - name: framework
    description: Test framework to use. Leave empty to use the one the project already uses.
    type: string
output_contract:
  format: markdown
  sections: [Behaviours, Tests, Run, Not covered]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Good unit tests describe what a unit does, not how it does it. They fail when behaviour breaks and keep passing through refactors. Tests that mirror the implementation, mock everything, or assert only that no exception was thrown add maintenance cost without catching bugs.
</context>

<task>
Write unit tests for {{target}}.
{{#framework}}Use {{framework}}.
{{/framework}}
1. Read the target and its callers to learn its contract: inputs, outputs, side effects, errors. Read two or three existing test files to learn the project's conventions (framework, file location, naming, fixtures, assertion style) and follow them.
2. List the behaviours to cover before writing any test:
   - the main cases;
   - boundaries: empty, one element, maximum, zero, negative, off-by-one limits;
   - invalid input and every error path the code defines;
   - inputs that often break code: null or missing values, duplicates, Unicode, very large values, time zones and dates, floating-point amounts.
3. Write one test per behaviour, through the unit's public interface. Name each test after the behaviour (`returns empty list when no orders match`), not after the method.
4. Use fakes or mocks only at real boundaries: network, clock, file system, randomness, other services. Do not mock the code under test or plain data objects.
5. Run the tests. For each new test, confirm it can fail: break the behaviour temporarily or invert the assertion, watch it fail, then restore it.
</task>

<constraints>
- Do not change production code. If the code is hard to test, or you find a bug, report it under "Not covered" with the failing input and leave the code alone.
- Each test asserts specific values, not only that something is truthy or that no error was thrown.
- Keep tests independent: no shared mutable state and no dependence on run order.
- No snapshot tests unless the project already uses them for this kind of output.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Behaviours
A table: Behaviour | Test name | Kind (main, boundary, error, edge).
## Tests
The new or changed test files as a diff.
## Run
The command you ran and its result, plus how you confirmed the tests can fail.
## Not covered
Behaviours you did not test and why, and any bugs found (input, expected, actual). Or "None".
</output_format>
