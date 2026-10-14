---
schema: 1
id: implement-with-tdd
kind: prompt
title: Implement a feature with TDD
description: Implements a feature test-first in small red-green-refactor cycles, showing each failing test before the code that makes it pass. Use when you want behaviour pinned by tests as you build.
category: testing
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, backend-engineer, frontend-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, ticket, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [tdd, test-first, red-green-refactor]
pairs_with:
  prompts: [write-unit-tests, derive-test-cases-from-requirements, refactor-test-suite]
  personas: [test-engineer]
args:
  - name: feature
    description: The behaviour to implement - the spec, ticket or acceptance criteria, and where in the code it belongs if known.
    type: text
    required: true
  - name: test_command
    description: The command that runs the relevant tests, if not obvious from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Test list, Cycles, Final diff, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Test-driven development is valuable for its feedback loop, not for the tests it leaves behind. Assistants usually fake it: they write the implementation and the tests together, so no test was ever seen failing, which means no test is proven to detect anything. Real TDD keeps a list of behaviours, picks the simplest next one, writes one test and runs it to watch it fail for the right reason (an assertion, not an import error), writes the least code that passes, then refactors with the tests green. Tests describe behaviour through the public interface, so refactoring does not break them. Starting with degenerate cases (empty, zero, one) and moving to general ones lets the design emerge; jumping to the full algorithm in the first cycle defeats the method.
</context>

<task>
Implement test-first:
{{feature}}
{{#test_command}}
Run tests with: {{test_command}}
{{/test_command}}

1. Read the relevant code, existing tests and conventions (framework, file layout, naming, fixtures). Run the existing tests once to confirm a green baseline; if they are not green, report that and stop.
2. Write a test list: the behaviours the feature needs, one line each, ordered from simplest to most complex, including edge and error cases. Show it before coding.
3. For each item, do one cycle:
   - Red: write one test through the public interface. Run it and show the failure output. Confirm it fails for the expected reason; if it fails for another reason (syntax, missing import) fix that first, and if it passes immediately, say so and question whether the test is needed.
   - Green: write the minimum code that makes it pass. Run the tests and show they pass.
   - Refactor: remove duplication and improve names in code and tests while green. Run the tests again.
4. Add new behaviours to the list as you discover them; do not implement anything without a failing test that demands it.
5. When the list is done, run the full relevant test suite plus the linter and type checker if the project has them.
</task>

<constraints>
- Never write production code before a failing test requires it; never write several tests at once.
- Show the actual test output for each red and green step; do not describe output you did not get.
- Test behaviour through public interfaces, not private methods or internal calls.
- Keep cycles small; if a step needs more than a few lines of production code, split the behaviour.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Test list
Checklist, ticked as cycles finish.

## Cycles
For each cycle: the test, the failure output (trimmed), the code change, the passing output, and any refactor.

## Final diff
The complete diff of tests and code.

## Verification
Full-suite, lint and type-check commands and results.
</output_format>
