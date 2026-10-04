---
schema: 1
id: migrate-test-framework-track
kind: workflow
title: Migrate a test suite to another framework
description: Moves a test suite between frameworks, such as Jest to Vitest or unittest to pytest, in batches with codemods, manual fixes, pass-count parity checks and CI updates. Use for any test framework switch.
category: migration
version: 1.0.0
status: incubating
stage: [discover, build, ship]
role: [software-engineer, qa-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [test-framework, codemod, parity-check, jest, vitest, pytest]
pairs_with:
  prompts: [upgrade-major-dependency, plan-incremental-migration]
  personas: [test-engineer]
args:
  - name: from_framework
    description: The framework the suite uses today, for example Jest, Mocha, Jasmine, unittest, nose or JUnit 4.
    type: string
    required: true
  - name: to_framework
    description: The framework to move to, for example Vitest, Node's built-in test runner, pytest or JUnit 5.
    type: string
    required: true
  - name: test_command
    description: The command that runs the whole suite today.
    type: string
    required: true
  - name: batch_size
    description: How many test files to migrate per batch after the first, smaller batch.
    type: number
    default: 25
steps:
  - {id: inventory, file: steps/01-inventory.md, stage: discover, gate: none, artifact: "test-migration/01-inventory.md"}
  - {id: first-batch, file: steps/02-first-batch.md, stage: build, gate: approve, artifact: "test-migration/02-first-batch.md"}
  - {id: remaining-batches, file: steps/03-remaining-batches.md, stage: build, gate: none}
  - {id: cutover, file: steps/04-cutover.md, stage: ship, gate: none, artifact: "test-migration/04-report.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Migrates the test suite from {{from_framework}} to {{to_framework}} without losing a single test along the way. The danger in a framework switch is silent loss: a test file the new runner never picks up, a test that now passes because a mock no longer applies, an assertion that changed meaning. So the whole track is organised around parity: the same tests, found by name, with the same results, before the old framework is removed.

Rules for every step:
- Record per-file test counts (passed, failed, skipped) from real runs of both frameworks, and compare them by test name, not just totals. When conversion renames tests (unittest methods to pytest functions, nested describe blocks flattened), keep an old-name to new-name map so every test can still be matched.
- Never change production code to suit the new framework. If a test only passed because of old-framework behaviour (auto-mocking, global leakage, fake timers enabled by default), say so and fix the test setup, not the assertion.
- Keep both frameworks runnable side by side until cutover.
- If both arguments name the same framework at different versions, this is an upgrade, not a migration: say so, and follow the framework's official migration notes with one before-and-after run instead of this track.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
