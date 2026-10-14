---
schema: 1
id: automate-manual-test-cases
kind: prompt
title: Automate manual test cases
description: Chooses which manual test cases are worth automating and converts them into API, integration or end-to-end tests at the lowest level that still catches the defect.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [qa-engineer, software-engineer]
requires: [repo-read, file-write, shell]
inputs: [document, text, repo]
output: [tests, table]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [test-automation, manual-testing, test-levels, regression]
pairs_with:
  prompts: [write-manual-test-cases, write-e2e-test, write-integration-tests]
  personas: [test-engineer]
args:
  - name: manual_cases
    description: The manual test cases or regression checklist to consider, with steps and expected results.
    type: text
    required: true
  - name: context
    description: The app, the test frameworks already in the repo, and how often each manual case is run today.
    type: text
output_contract:
  format: markdown
  sections: [Automation decisions, Tests written, Left manual, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Translating manual cases one-to-one into browser scripts is the most common way to build a slow, flaky automation suite. A manual case clicks through the UI because a human has no other way in; automation does. Most manual checks are really checking a business rule or an API response, and belong at the API or integration level, with only a thin end-to-end test proving the UI is wired. Some cases should stay manual: visual judgement, one-off exploratory work, things run once a year, and flows whose automation would cost more to maintain than it saves. A good conversion also removes the manual habits that make automation brittle: long chains of dependent steps, shared accounts and data set up by hand.
</context>

<task>
Automate the worthwhile cases from:
{{manual_cases}}
{{#context}}

Context: {{context}}
{{/context}}

1. Read the repository's existing test suites, helpers, fixtures and data factories. Note the frameworks and patterns in use; new tests must follow them.
2. For each manual case decide: automate or keep manual. Automate when it runs often, checks deterministic behaviour, and is stable. Keep manual when it needs human judgement, runs rarely, or targets a part of the UI that is still changing. Give a one-line reason per case.
3. For each case to automate, pick the lowest level that would catch the defect the case exists for: unit or integration for rules and calculations, API for workflows and permissions, end-to-end only for what needs a real browser or the full stack wired together. Merge cases that test the same rule at different values into one parameterised test.
4. Write the tests: each sets up its own data through factories or the API, asserts on outcomes rather than intermediate screens, and is independent of the others. Map each test back to the manual case ids it replaces.
5. Run the new tests and make them pass against the current code. If a test fails because the app behaves differently from the manual case's expected result, stop and report it as a possible defect or outdated case; do not change the assertion to match.
6. Summarise which manual cases can be retired from the manual pack once the tests are in CI.
</task>

<constraints>
- Do not automate every case by default; justify each decision.
- Do not chain tests so one depends on another's state.
- No fixed sleeps; use the framework's waiting mechanisms.
- Never weaken an expected result to make a test pass.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Automation decisions
Table: manual case | decision | level | reason.

## Tests written
The new test files as diffs, each test mapped to case ids.

## Left manual
Cases kept manual, with the reason.

## Verification
Commands run, results, and any mismatches reported as possible defects.
</output_format>
