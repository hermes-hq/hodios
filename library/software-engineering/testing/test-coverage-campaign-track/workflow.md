---
schema: 1
id: test-coverage-campaign-track
kind: workflow
title: Raise meaningful test coverage across a codebase
description: Raises test coverage where it reduces risk, measuring first, writing behaviour tests for risky untested code and checking them with sampled mutation testing. Use for a coverage push that must count.
category: testing
version: 1.0.0
status: incubating
stage: [discover, plan, build, verify]
role: [software-engineer, qa-engineer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [test-coverage, risk-based-testing, mutation-testing, churn-analysis]
pairs_with:
  prompts: [fill-test-gaps, run-mutation-testing, add-characterization-tests, review-test-quality]
  personas: [test-engineer]
args:
  - name: coverage_command
    description: The command that runs the tests with coverage, for example "npm test -- --coverage", "pytest --cov=src --cov-report=json" or "go test -coverprofile=cover.out ./...".
    type: string
    required: true
  - name: target
    description: What success means. "risk-based" ranks untested code by risk; or give a goal such as "branch coverage of src/billing to 80%".
    type: string
    default: risk-based
  - name: budget_files
    description: The most test files the campaign may add or change before it stops and reports.
    type: number
    default: 15
steps:
  - {id: measure, file: steps/01-measure.md, stage: discover, gate: none, artifact: "coverage-campaign/01-measure.md"}
  - {id: risk-map, file: steps/02-risk-map.md, stage: plan, gate: approve, artifact: "coverage-campaign/02-targets.md"}
  - {id: write-tests, file: steps/03-write-tests.md, stage: build, gate: none}
  - {id: mutation-check, file: steps/04-mutation-check.md, stage: verify, gate: none}
  - {id: report, file: steps/05-report.md, stage: verify, gate: none, artifact: "coverage-campaign/05-report.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a coverage campaign that buys real safety. Line coverage is easy to inflate with tests that execute code but assert nothing, and a campaign judged by percent drifts there. This track measures, picks the untested code where a bug would hurt most, writes tests that pin down behaviour, then checks a sample with mutation testing to prove the tests would catch a real change. Target: {{target}}.

Rules for every step:
- Every number in an artifact comes from a command actually run: `{{coverage_command}}`, git history, or the mutation tool.
- Tests go through public behaviour (inputs, outputs, side effects at boundaries), not private helpers or call counts, unless the boundary itself is the behaviour.
- When a new test exposes a bug, do not write the test to expect the buggy result. Mark it as a known failure in the way the project allows (or leave it out), record the bug, and do not fix production code in this campaign unless the user asks.
- Stop and report before adding or changing more than {{budget_files}} test files.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
