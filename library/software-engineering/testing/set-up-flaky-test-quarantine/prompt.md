---
schema: 1
id: set-up-flaky-test-quarantine
kind: prompt
title: Set up flaky test detection and quarantine
description: Sets up detection, quarantine, ownership and tracking of flaky tests so the main suite stays trusted, with an exit path that fixes tests instead of hiding them.
category: testing
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [software-engineer, devops-engineer, tech-lead, qa-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, config, logs]
output: [config, docs]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [flaky-tests, quarantine, ci-reliability, test-ownership]
pairs_with:
  prompts: [fix-flaky-test, find-test-pollution, speed-up-test-suite]
  personas: [test-engineer]
args:
  - name: setup
    description: Test frameworks, CI system, how often builds fail for reasons unrelated to the change, and any retry or quarantine practice today.
    type: text
    required: true
  - name: history
    description: CI results history or test reports (JUnit XML) available, and where.
    type: text
output_contract:
  format: markdown
  sections: [Detection, Quarantine mechanism, Ownership and tracking, Exit rules, Changes, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Once a few tests flake, people learn to click "re-run" and stop reading red builds, and real failures slip through. Blanket retries make it worse: they hide new flakiness and real intermittent bugs. A working system has four parts. Detection: a test that fails and then passes on the same commit is flaky by definition, so record results (JUnit XML or the framework's report) per test across runs instead of relying on memory. Quarantine: flaky tests move out of the blocking gate into a non-blocking job that still runs and reports, through a single visible list or annotation, never by deleting or commenting them out. Ownership: every quarantined test gets an owner and an issue. Exit: a deadline after which the test is fixed or deliberately deleted, plus a cap on how many tests can sit in quarantine. Retries, if used at all, should only label tests as flaky, not turn them green.
</context>

<task>
Set up flaky test handling for:
{{setup}}
{{#history}}

History: {{history}}
{{/history}}

1. Read the CI config and test configuration. Note current retries, how results are reported, and any existing skip lists.
2. Detection: make every CI test job emit per-test results in a machine-readable format. Add detection of tests that failed then passed on the same commit (in-run retry or re-run), recorded with the test id, commit and job. If history is available, produce an initial list of likely flaky tests with failure rates.
3. Quarantine mechanism: choose one visible place to list quarantined tests (a file in the repo, a tag or annotation the framework supports, or the CI tool's built-in quarantine feature). Configure the blocking job to exclude them and a separate non-blocking job to run only them and publish results.
4. Retries: if retries exist, restrict them so a pass-on-retry is reported as flaky and counted, not silently green. Do not add blanket retries.
5. Ownership and tracking: each quarantine entry carries an owner (team), an issue link and a date added. Provide a template for the issue.
6. Exit rules: a deadline (for example 14 days) after which the test must be fixed or deliberately deleted with the owner's agreement, a cap on quarantine size, and a periodic report of quarantined tests and their age. Tests that pass consistently in the quarantine job for a set number of runs are proposed for release back into the gate.
7. Write a short contributor note in the existing testing or contributing doc: how to quarantine, the rules, and how to un-quarantine.
8. Verify the configuration by running the blocking and quarantine jobs locally or in a branch with one test listed, and report what you could and could not check.
</task>

<constraints>
- Never delete, comment out or permanently skip tests as part of quarantine.
- Do not add blanket retries to make CI green.
- Keep the quarantine list in one place and visible in review.
- Do not change CI for unrelated jobs, and ask before changing branch protection or required checks.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Detection
How flaky tests are detected and recorded, plus the initial list if history was available.

## Quarantine mechanism
Where the list lives and how jobs use it.

## Ownership and tracking
Required fields and the issue template.

## Exit rules
Deadline, cap, reporting and release back into the gate.

## Changes
Diffs of CI, test config and docs.

## Verification
What was run and the results.
</output_format>
