---
schema: 1
id: add-characterization-tests
kind: prompt
title: Add characterization tests to legacy code
description: Pins down what untested legacy code does today with characterization and golden-master tests, bugs included, so it can be changed safely. Use before refactoring or modifying code with no tests.
category: testing
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [software-engineer, tech-lead]
stack: []
requires: [repo-read]
inputs: [file, repo]
output: [tests, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [legacy-code, golden-master, approval-tests, safety-net]
pairs_with:
  prompts: [split-large-module]
  personas: [test-engineer]
args:
  - name: code
    description: The legacy code to pin down, pasted or as a path.
    type: text
    required: true
  - name: entry_points
    description: Functions, endpoints, commands or jobs through which the code is used, if you know them.
    type: text
output_contract:
  format: markdown
  sections: [Behaviour inventory, Seams, Tests, Suspicious behaviour, Coverage and gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A characterization test records what the code actually does, not what it should do. It is a safety net for a later change: if a refactor alters any output, a test fails. That means the tests must pin current behaviour exactly, including odd and probably wrong behaviour, and must fail when the behaviour changes. Tests that only check "no exception" or that assert what the author guessed the code does give false confidence.
</context>

<task>
Write characterization tests for:
{{code}}
{{#entry_points}}Known entry points: {{entry_points}}{{/entry_points}}

1. Find the entry points (from the list above, or from callers in the repository) and test through the highest-level one that is practical to call. Avoid testing private helpers that a refactor will move.
2. Find the seams that make the code nondeterministic or hard to call: current time, randomness, generated ids, environment, file system, network, database, global state. For each, choose the least invasive way to control it: an existing parameter or injection point first, then a test double at the module boundary, then a minimal seam (extract a parameter with the current value as its default). Name any production change you need; keep it behaviour-preserving.
3. Choose inputs that exercise every branch you can see: typical values, boundaries, empty and missing values, error paths, and combinations of flags. Read the conditionals to derive them.
4. Capture current outputs:
   - for small outputs, assert exact values;
   - for large or structured outputs (reports, HTML, JSON, files), write a golden-master or approval test that stores the output in a snapshot file, with scrubbers that normalise timestamps, ids and unordered collections so the snapshot is stable;
   - record side effects too: calls to collaborators, rows written, messages sent, exceptions raised.
   Derive expected values by running the code where you can. If you cannot run it, derive them by tracing the code and mark those tests "traced, confirm on first run".
5. Check the net catches change: for each important branch, describe a small mutation (flip a comparison, drop a line) and confirm a test would fail. Add inputs where none would.
</task>

<constraints>
- Do not fix bugs. Pin the current behaviour and list it under "Suspicious behaviour", with the test name, so a human decides later.
- Do not refactor production code beyond the minimal seams named in step 2.
- Name tests by behaviour (`returns_zero_discount_when_cart_empty`), not by number.
{{> guardrails/investigate-before-answering}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Behaviour inventory
Table: Entry point | Input class | Current output or side effect.
## Seams
Bullets: the nondeterminism or dependency, and how the tests control it (including any production change).
## Tests
The complete test file or files, with snapshot files if any.
## Suspicious behaviour
Table: Behaviour | Test that pins it | Why it looks wrong. Or "None".
## Coverage and gaps
Branches covered, branches not covered and why, and the mutations you checked.
</output_format>
