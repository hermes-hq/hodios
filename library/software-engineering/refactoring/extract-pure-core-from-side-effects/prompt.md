---
schema: 1
id: extract-pure-core-from-side-effects
kind: prompt
title: Extract a pure core from side-effecting code
description: Separates calculations from IO in a module so the logic becomes pure functions with a thin imperative shell around them, making it testable without mocks.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, backend-engineer]
requires: [repo-read, file-write, shell]
inputs: [file]
output: [plan, diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [functional-core, imperative-shell, pure-functions, side-effects]
pairs_with:
  prompts: [decouple-for-testability, simplify-function]
args:
  - name: code
    description: The functions or module that mix logic and IO, as paths or pasted code, with the language and how they are tested today.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests.
    type: string
output_contract:
  format: markdown
  sections: [Effects and decisions, Core and shell, Diff, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Functional core, imperative shell": code that interleaves reading the database, deciding, calling an API, deciding again and writing can usually be reshaped into three phases: gather inputs (IO), decide (pure function from inputs to a result or a description of actions), and apply (IO). The pure core takes plain data and returns plain data, so it is tested with simple input and output tables, no mocks, and the shell is short enough to read and cover with a few integration tests.

Hidden effects are what stop a function from being pure: the current time (`now()`), random numbers and generated ids, environment variables and config reads, logging and metrics that tests assert on, global caches, and mutation of input objects. These become parameters (pass `now`, a seed, or the config values). Reshaping can change behaviour when the original interleaving mattered: a decision based on data read after a write, a loop that stops calling the API after the first failure, an early return that skips later reads, or reads that must be inside a transaction or lock with the decision. When the decision genuinely needs results of earlier effects, the core can return the next step instead of a final answer, or the shell can call two pure functions around the effect. Not every function is worth this: glue code with little logic is fine as it is.
</context>

<task>
Extract a pure core from {{code}}.

1. Read the code and list every effect (IO, time, randomness, config, logging, mutation of inputs) and every decision (branches, calculations), in execution order. Note where a decision depends on the result of an earlier effect.
2. Propose the core functions (inputs, outputs, including returned action descriptions where useful) and the shell that gathers inputs, calls the core and applies results. Note any change to effect ordering, reads that move relative to writes, or transaction scope, and keep them identical unless the user approves. If the function is mostly glue, say it is not worth extracting. Wait for approval.
3. Make sure current behaviour is covered: add a few tests at the existing entry point if there are none.
4. Extract the core, then rewrite the shell to use it. Write table-driven tests for the core covering each branch and boundary, with no mocks. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}.
5. Show the diff and the new tests, and say which old mock-heavy tests can now be simplified or removed.
</task>

<constraints>
- The entry point's signature, effects, their order, and transaction or lock scope stay the same unless approved.
- The core has no IO, no clock, no randomness and no global reads; pass them in.
- Do not convert the codebase to a functional style or add a library to do it.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Effects and decisions
Ordered list, marking dependencies between them.
## Core and shell
Function signatures and responsibilities.
## Diff
The change.
## Tests
New core tests and which old tests can be simplified.
## Check
Tests run and results.
</output_format>
