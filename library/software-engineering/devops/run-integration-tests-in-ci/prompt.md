---
schema: 1
id: run-integration-tests-in-ci
kind: prompt
title: Run integration tests in CI
description: Gets existing integration tests running in CI against real Postgres, Redis or brokers via service containers or Testcontainers, with readiness waits, seeding and logs on failure.
category: devops
version: 1.0.0
status: incubating
stage: [build, verify]
role: [devops-engineer, backend-engineer, qa-engineer]
stack: [github-actions, gitlab-ci, docker]
requires: [repo-read, file-write, shell]
inputs: [repo, logs]
output: [config]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [integration-tests, service-containers, testcontainers, ci]
pairs_with:
  prompts: [write-integration-tests, fix-flaky-test, write-github-actions-workflow]
args:
  - name: tests
    description: Which integration tests to run, what they need (database, cache, broker, versions) and how they run locally today.
    type: text
    required: true
  - name: symptom
    description: What happens in CI now, if anything, for example "connection refused on the first test" or "passes locally, times out in CI".
    type: text
output_contract:
  format: markdown
  sections: [Setup, Changes, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Integration tests that pass on a laptop fail in CI for a short list of reasons: the test starts before the database accepts connections, the host name differs (a service container is `localhost` for a job running on the runner but the service name for a job running in a container), the CI runner has no Docker socket so Testcontainers cannot start, the schema is hand-made instead of produced by the real migrations, or parallel jobs share one database and trample each other. When they fail, nobody can see why because the service logs were never captured. Service containers suit simple fixed dependencies; Testcontainers suits tests that need per-suite isolation or many versions, but needs Docker available on the runner.
</context>

<task>
Make these integration tests run reliably in CI:
<tests>
{{tests}}
</tests>
{{#symptom}}
Current symptom: {{symptom}}
{{/symptom}}

1. Read the test setup, how tests locate their dependencies (environment variables, config files, Testcontainers), the migrations, and the existing CI configuration. Run the tests locally if a shell and Docker are available, to know the baseline.
2. Choose service containers or Testcontainers. Keep what the tests already use unless it cannot work on the runner (for example Testcontainers on a runner without Docker); explain any switch.
3. Pin each dependency image to the version production uses. Configure readiness: a health check on the service container (`pg_isready`, `redis-cli ping`) and, in the test bootstrap or a step, a bounded wait for the port before tests start.
4. Point tests at the right host and port for how the job runs (runner versus job container), through environment variables, never by editing test code to hard-code CI values.
5. Prepare data the way production does: run the real migrations, then seed only what the tests need. Isolate parallel jobs or shards with separate databases or schemas.
6. On failure, dump service container logs and upload test reports as artifacts. Add a job `timeout-minutes` or `timeout`.
7. Make the change, run the provider's linter if available, and if you can trigger or simulate the job, report the real result.
</task>

<constraints>
- Do not weaken or skip tests to make CI green; if a test is genuinely flaky, say so and leave it as is.
- Do not use production credentials or production data; test credentials can be plain values in CI config only when they are throwaway and local to the job.
- Do not add sleep-based waits without a bound and a readiness check.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Setup
Mechanism chosen, image versions, how readiness and isolation work.

## Changes
Each file changed with a diff or full contents.

## Verify
What ran and its real result, or which check could not be run.

## Follow-ups
Flaky tests noticed, version mismatches with production, runner changes needed. "None" if empty.
</output_format>
