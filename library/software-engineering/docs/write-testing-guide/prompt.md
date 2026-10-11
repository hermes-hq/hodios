---
schema: 1
id: write-testing-guide
kind: prompt
title: Write a repository testing guide
description: Writes a repository's testing guide covering how to run each suite or a single test, required services, where new tests go, fixtures and mocking conventions, snapshots and debugging failures.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, qa-engineer, maintainer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [docs]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [test-suites, fixtures, mocking, flaky-tests, contributor-guide]
pairs_with:
  prompts: [write-onboarding-guide, write-contributing-guide, write-readme]
args:
  - name: notes
    description: What the repo does not show, such as known flaky suites, tests that need credentials or team rules about coverage.
    type: text
output_contract:
  format: markdown
  sections: [Commands verified, Files changed, Not verified, Gaps in the test setup]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
New contributors lose hours to tests, not code. They find the full-suite command in CI but not how to run one test, discover the integration suite needs a database only after a timeout, write a unit test where the team expects an integration test, mock something the team never mocks, or commit regenerated snapshots by accident. A testing guide answers those in the order people hit them. How do I run everything, one file, one test? What do I need running? Where does my new test go and what does a good one look like here? Which fixtures and factories exist? What gets mocked? How do I update snapshots or golden files on purpose? How do I debug a failure that happens only in CI? It is only trustworthy if the commands have been run.
</context>

<task>
Write the testing guide for this repository.
{{#notes}}
Notes from the team: {{notes}}
{{/notes}}

1. Read the test configuration (runner configs, markers or tags, setup files), package scripts or Makefile targets, CI workflows (which suites run where, services, env vars, parallelism, retries), docker-compose files used for tests, and a sample of existing tests in each layer.
2. Identify the suites (unit, integration, end-to-end, contract, others), what each needs to run, and roughly how long each takes if CI logs or config show it.
3. Learn the conventions from existing tests: file naming and location, fixture and factory helpers, how time, randomness, network and external services are handled, snapshot or golden file updates, and test data cleanup.
4. Run the fast suite and one single test to confirm the commands. Run slower suites only if their services are available locally; do not start external services that cost money or touch shared environments.
5. Write TESTING.md (or a testing section in CONTRIBUTING.md if the repo keeps contributor docs there): quick reference commands, prerequisites per suite, where to put a new test with a short example in the house style, fixtures and mocking rules, updating snapshots, debugging (verbose output, running a single test in a debugger, reproducing CI locally), and how flaky tests are handled.
</task>

<constraints>
- Only document commands you ran or found in config. Mark unverified ones as "not run locally".
- Conventions must come from existing tests, not general preferences. If tests are inconsistent, describe the dominant pattern and note the exceptions.
- Do not change test code or configuration.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Commands verified
Each command run and its real result (pass count, time).
## Files changed
The file written or edited.
## Not verified
Commands documented but not run, and why.
## Gaps in the test setup
Problems noticed, such as no way to run one test or suites missing from CI. Or "None".
</output_format>
