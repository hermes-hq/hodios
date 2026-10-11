---
schema: 1
id: write-smoke-tests
kind: prompt
title: Write post-deploy smoke tests
description: Writes a fast post-deploy smoke test suite for critical paths that gates promotion or triggers rollback, safe to run against production. Use when deploys lack a quick health check.
category: testing
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [software-engineer, qa-engineer, devops-engineer, sre]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [tests, config]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [smoke-tests, deployment, release-gate, rollback]
pairs_with:
  prompts: [design-synthetic-checks, write-e2e-test, select-regression-tests-for-release]
  personas: [test-engineer]
args:
  - name: system
    description: What is deployed (web app, API, worker), its critical user paths, and how deploys work (pipeline, environments, canary or blue-green).
    type: text
    required: true
  - name: target_env
    description: Where the smoke tests run - staging, a canary, or production - and how they reach it.
    type: string
    required: true
  - name: test_tooling
    description: The test framework and CI system already used, if any.
    type: string
output_contract:
  format: markdown
  sections: [Paths covered, Tests, Pipeline wiring, Safety notes, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A smoke suite answers one question within a couple of minutes of a deploy: is this build alive and wired correctly, or should we stop? It is not a regression suite. Good smoke tests check what a deploy can break that unit tests cannot: the service starts and answers, configuration and secrets resolved, the database and key dependencies are reachable, the main page renders with its assets, sign-in works, and the one or two core transactions complete. They must be fast (minutes, not tens of minutes), deterministic (a flaky smoke test gets ignored or causes needless rollbacks), and safe against production: read-only where possible, using dedicated test accounts, and never creating real orders, charges, emails or analytics noise. A health endpoint that returns 200 without checking anything is not a smoke test.
</context>

<task>
Write smoke tests for:
{{system}}

Target environment: {{target_env}}
{{#test_tooling}}
Existing tooling: {{test_tooling}}
{{/test_tooling}}

1. Read the repository: routes, health endpoints, deploy pipeline config, existing end-to-end or API tests and their helpers. Reuse the existing framework and helpers rather than adding a new tool.
2. Pick the paths: version or build-id check (to prove the new build is the one serving), health with real dependency checks, the main page or API root, sign-in with a dedicated smoke account, and at most two or three core transactions. Keep the total under about five minutes.
3. For each write path, make it safe for the target environment: use a smoke-test account or tenant, a sandbox payment method, idempotent or self-cleaning operations, and a marker so analytics and emails can filter it out. If a path cannot be made safe in production, test it read-only or leave it out and say so.
4. Write the tests with explicit, short timeouts and clear failure messages that say which dependency or path failed.
5. Wire them into the pipeline: run right after deploy to the target, block promotion on failure, and either trigger the existing rollback or alert with the failing check. Read credentials from the CI secret store, never from the repository.
6. Run the suite against a non-production environment if one is reachable and report the results and timing. Do not run anything against production without the user's confirmation.
</task>

<constraints>
- No test may create real customer-visible effects in production (charges, emails, messages, public content).
- No secrets, tokens or real user credentials in code or config; reference secret names only.
- No sleeps for synchronisation; wait on conditions with bounded timeouts.
- Keep the suite small; push anything that is regression coverage to the regular suites and say so.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Paths covered
Table: path | why it is a smoke check | read-only or write | expected time.

## Tests
The test files, as diffs or full files.

## Pipeline wiring
The CI change and what happens on failure.

## Safety notes
Accounts, markers and cleanup used, plus paths left out and why.

## Verification
Where it was run, results and total runtime, or what could not be run.
</output_format>
