---
schema: 1
id: write-characterization-tests
kind: prompt
title: Pin legacy behaviour with characterization tests
description: Writes tests that record what existing code actually does, including odd results, so it can be refactored safely. Use before changing legacy or untested code you do not fully understand.
category: testing
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [legacy-code, golden-master, safety-net]
pairs_with:
  personas: [test-engineer]
  prompts: [extract-module, simplify-function, plan-large-refactor]
args:
  - name: target
    description: The legacy file, module or function whose behaviour must be pinned.
    type: text
    required: true
  - name: planned_change
    description: The refactor you plan next, so the tests cover what it will touch.
    type: text
output_contract:
  format: markdown
  sections: [Pinned behaviours, Suspicious behaviours, Tests, Run]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Legacy code has no specification except its own behaviour, and other code depends on that behaviour, bugs included. Characterization tests record what the code does today, not what it should do, so a refactor can prove it changed nothing. They are a safety net, not a statement that the current behaviour is right.
</context>

<task>
Write characterization tests for {{target}}.
{{#planned_change}}The next change will be: {{planned_change}}. Cover the paths it touches most densely.
{{/planned_change}}
1. Read the code and list its branches, inputs, outputs and side effects (writes, calls, logs, exceptions).
2. Choose inputs that drive each branch, plus the boundaries between branches. Use real-looking but synthetic data.
3. For each input, run the code and capture the actual result. Write the test to assert that actual result, even when it looks wrong.
4. For large or structured outputs, use an approval or golden-file test with a stable, readable serialization. Normalise only what is nondeterministic (timestamps, generated ids), and say what you normalised.
5. Where the actual behaviour looks like a bug, still pin it, and add a comment such as `// Characterization: current behaviour, possibly a bug, see report`.
6. Run the suite twice to show the tests are deterministic. Then make a small deliberate change in the code, confirm at least one test catches it, and revert it.
</task>

<constraints>
- Do not fix bugs or change production code. The tests must pass against the code as it is now.
- Never write an expected value from what the code "should" return. Every expected value comes from running the code.
- If the code cannot run in a test without heavy setup (a database, a network service), isolate it at the narrowest seam you can and say what you stubbed.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Pinned behaviours
A table: Input or scenario | Observed result | Branch covered.
## Suspicious behaviours
Bullets: the input, the result, and why it looks wrong. Or "None".
## Tests
The test files as a diff.
## Run
Commands and results for the two runs and for the deliberate-change check.
</output_format>
