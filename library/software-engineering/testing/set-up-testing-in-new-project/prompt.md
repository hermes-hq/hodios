---
schema: 1
id: set-up-testing-in-new-project
kind: prompt
title: Set up testing in a project
description: Sets up a test framework in a project that has none or a broken one - config, folder layout, a first real test, coverage, watch mode and a CI job - following the stack's conventions.
category: testing
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, fullstack-engineer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [config, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [test-setup, ci, test-framework, coverage]
pairs_with:
  prompts: [write-unit-tests, set-up-coverage-gate, write-test-strategy]
  personas: [test-engineer]
args:
  - name: project
    description: The project to set up, or anything to know about it (language, framework, package manager, monorepo or not). Leave mostly empty to let the agent read the repo.
    type: text
    required: true
  - name: ci
    description: The CI system to add a test job to (for example GitHub Actions, GitLab CI), or "none".
    type: string
output_contract:
  format: markdown
  sections: [Choices, Changes, How to use, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most projects without tests do not lack the will; they lack a working setup, and the first test is the hardest because the configuration fights back: ESM versus CommonJS, path aliases, TypeScript transforms, environment variables, a database or framework that needs bootstrapping. The best choice is the framework the ecosystem expects and the project's build tool already supports (for example Vitest with a Vite project, pytest for Python, the built-in testing package for Go, JUnit 5 for Java), configured to reuse the project's existing aliases and settings rather than duplicating them. The setup is done when one meaningful test of real code runs locally and in CI with a single command, not when a sample "1 + 1 = 2" test passes.
</context>

<task>
Set up automated testing for:
{{project}}
{{#ci}}
CI: {{ci}}
{{/ci}}

1. Read the project: language and version, package manager and lockfile, build tool, framework, module system, path aliases, existing scripts, any leftover or broken test config, and existing CI config. Do not assume.
2. Choose the test framework: if one is partly configured, fix it rather than replacing it. Otherwise pick the ecosystem default that fits the build tool. Add any needed helpers only when the project needs them now (for example a DOM environment for UI code, a test database for data code).
3. Install with the project's package manager as dev dependencies, pinning to the lockfile.
4. Configure: reuse existing aliases, transforms and env loading; set test file patterns; follow the ecosystem's conventional layout (co-located or a tests folder, matching any existing convention).
5. Add scripts or targets: run once, watch mode, and coverage, using the project's existing task runner.
6. Write one or two real tests for a small, pure, important piece of existing code, so the setup is proven against actual project code. Do not change production code to do this.
7. Add a CI job that installs with the lockfile, caches dependencies, and runs the tests (with coverage reporting but no threshold yet), if a CI system was named or already exists.
8. Run the tests locally and report. Add a short "Testing" section to the existing README or contributing doc only if one exists and has a development section.
</task>

<constraints>
- Do not replace an existing framework that can be fixed.
- Do not add more libraries than the first tests need.
- Do not change production code, build config behaviour or unrelated CI jobs.
- Never commit secrets; tests that need credentials read them from the environment.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Choices
Framework and helpers chosen, and why, in a few bullets.

## Changes
Diffs of config, scripts, CI and the first tests.

## How to use
The commands to run tests, watch and coverage.

## Verification
Local run output summary, and anything not verified (for example the CI job before it runs).
</output_format>
