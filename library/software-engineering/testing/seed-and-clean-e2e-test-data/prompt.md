---
schema: 1
id: seed-and-clean-e2e-test-data
kind: prompt
title: Seed and clean up E2E test data
description: Sets up test data for end-to-end tests through API seeding, unique per-run data and reliable cleanup, so tests run in parallel and against shared environments.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [qa-engineer, software-engineer, frontend-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [tests, code]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [e2e, test-data, test-isolation, parallel-tests]
pairs_with:
  prompts: [write-test-data-factories, write-e2e-test, set-up-playwright-in-ci]
  personas: [test-engineer]
args:
  - name: suite
    description: The end-to-end suite and framework, the environments it runs against (local, ephemeral preview, shared staging), and how data is created today.
    type: text
    required: true
  - name: data_needs
    description: The kinds of data tests need, for example users with roles, products, orders in specific states, feature flags.
    type: text
output_contract:
  format: markdown
  sections: [Current problems, Data strategy, Changes, Cleanup, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
End-to-end suites become flaky and slow when tests create data by clicking through the UI, share fixed records ("testuser1") that other tests and other people modify, or depend on whatever happens to be in the environment. Reliable suites create the data each test needs through the fastest trustworthy path (a public or internal API, or a test-only seeding endpoint enabled only in non-production environments), make every record unique per run so parallel workers and concurrent pipelines cannot collide (unique emails, names with a run id), and clean up on a best-effort basis while not depending on cleanup for correctness, because cleanup does not run when a job is killed. A periodic sweeper deleting tagged test data older than a day handles the leftovers. Direct database inserts are fast but bypass business rules and break when the schema changes, so they are a last resort.
</context>

<task>
Set up test data handling for:
{{suite}}
{{#data_needs}}

Data needed: {{data_needs}}
{{/data_needs}}

1. Read the suite, its fixtures, helpers and config, and the app's API routes or seeding scripts. List how each test gets its data today and which tests share records.
2. Choose the creation path per data type: existing API endpoints first, then a test-only seeding endpoint or CLI if the API cannot create the needed state, and direct database writes only where nothing else exists (say why). Any test-only endpoint must be disabled in production by configuration and protected by a secret.
3. Write data builders or helpers that create records through that path with unique values per test and run (a run id plus a counter), tagged as test data (prefix, flag or dedicated tenant), and return the created ids.
4. Wire them into the framework's fixture mechanism so each test declares what it needs and gets its own records; sign-in for created users should reuse the suite's auth approach.
5. Add cleanup: per-test teardown that deletes what the test created, tolerant of already-deleted records, plus a sweeper job or script that deletes tagged test data older than a threshold. Tests must not assume a clean environment.
6. Migrate the tests that share records to the new helpers, starting with the ones that collide in parallel runs.
7. Run the migrated tests in parallel, twice in a row, and report results.
</task>

<constraints>
- No test may depend on data created by another test or left from a previous run.
- Seeding endpoints must never be enabled in production; show how that is enforced.
- Cleanup and sweepers delete only tagged test data, and must not run against production; ask before running a sweeper anywhere shared.
- No real personal data in seeded records.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current problems
Shared records and slow UI-based setup found.

## Data strategy
Table: data type | creation path | uniqueness | cleanup.

## Changes
Diffs of builders, fixtures and migrated tests.

## Cleanup
Teardown and sweeper, with safeguards.

## Verification
Parallel run results.
</output_format>
