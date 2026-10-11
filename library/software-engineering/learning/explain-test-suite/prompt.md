---
schema: 1
id: explain-test-suite
kind: prompt
title: Explain a project's test suite
description: Explains a project's test suite for a newcomer, covering test types and layout, fixtures and mocks, how to run one test or a subset, and which areas are well or barely covered.
category: learning
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [software-engineer, qa-engineer]
stack: []
requires: [repo-read]
inputs: [repo]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [test-layout, fixtures, mocking, new-joiner]
pairs_with:
  prompts: [explain-codebase, review-test-quality, map-repo-and-verify-setup]
args:
  - name: focus
    description: A feature or folder you are about to change, so the explanation shows which tests guard it.
    type: text
  - name: background
    description: Test tools you already know, such as "pytest yes, Playwright no".
    type: text
output_contract:
  format: markdown
  sections: [How testing works here, Layout, Fixtures and test doubles, Running tests, Coverage map, Before you change code, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A newcomer's first change usually breaks a test they did not know existed, or passes tests that never exercised it. Understanding the suite means knowing more than the framework name: which tests are unit, integration or end-to-end and what each needs running (a database, a browser, network); where shared fixtures and factories live and what state they create; what is mocked and therefore not really tested; how CI runs the suite differently from a laptop (environment variables, parallel shards, tags or markers that skip slow tests); and which parts of the code have no tests at all. Test names and folder layout often promise more than the assertions deliver.
</context>

<task>
Explain the test suite of the project in the working directory.
{{#focus}}
The reader is about to change: {{focus}}. Show which tests guard it.
{{/focus}}
{{#background}}
The reader already knows: {{background}}.
{{/background}}

1. Find the test frameworks and runners from manifests and config (pytest.ini, jest or vitest config, go test conventions, RSpec, JUnit, Playwright or Cypress config) and the CI workflow that runs tests.
2. Map the layout: where each type of test lives, naming conventions, how many files of each, and what each type needs to run (services, containers, browsers, seeded data, secrets).
3. Explain the fixtures, factories, test helpers and mocks: where they are defined, what state they set up and tear down, and what external systems are replaced by doubles. Note global setup files and auto-used fixtures that run silently.
4. Give the exact commands to run the whole suite, one file, one test by name, and a tagged subset, taken from the repo's scripts, Makefile or CI. Note differences between local and CI runs.
5. Build a coverage map by area of the code: well covered, thin, or none. Base it on which modules have tests and how strong their assertions look; if a coverage report exists in the repo, use it and say so.
6. For the focus area, or the most central area if none, list the tests that exercise it and what a change there would most likely break.
</task>

<constraints>
- Commands come from the repo; mark any you composed yourself as "(unverified)". Do not run tests or install anything unless the reader asks.
- Do not equate test count with coverage; say when tests exist but mostly assert on mocks.
- Explain; do not rewrite tests. Point to review-test-quality style concerns only as notes.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## How testing works here
Three or four sentences: frameworks, test types, where CI runs them.
## Layout
A table: test type, location, count, what it needs to run.
## Fixtures and test doubles
Bullets with file paths, including silent global setup.
## Running tests
A code block of commands: all, one file, one test, a subset. Local versus CI notes.
## Coverage map
A table: code area, coverage (good, thin, none), evidence.
## Before you change code
The tests guarding the focus area and what is likely to break.
## Questions
What the repo could not answer.
</output_format>
