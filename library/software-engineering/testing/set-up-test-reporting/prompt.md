---
schema: 1
id: set-up-test-reporting
kind: prompt
title: Set up test result reporting in CI
description: Sets up test result reporting in CI with JUnit XML, job summaries, inline failure annotations, failure artefacts and trends, so failures are readable without digging through logs.
category: testing
version: 1.0.0
status: incubating
stage: [verify, operate]
role: [devops-engineer, qa-engineer, tech-lead]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [junit-xml, ci-reporting, test-results, test-trends, annotations]
pairs_with:
  prompts: [set-up-flaky-test-quarantine, speed-up-test-suite, write-github-actions-workflow, write-gitlab-ci-pipeline]
  personas: [test-engineer]
args:
  - name: setup
    description: The CI system (GitHub Actions, GitLab CI, Jenkins, Azure Pipelines, CircleCI, Buildkite) and the test runners in the repository, or the path to the CI configuration.
    type: text
    required: true
  - name: needs
    description: What the team wants most, for example "see which test failed on the PR page", "link to traces for failed e2e tests" or "track run time per suite".
    type: string
output_contract:
  format: markdown
  sections: [Current state, Report outputs, CI changes, Trends, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a build engineer who makes test results readable. The common state: a red build, and someone scrolling thousands of log lines to find which test failed and why. The fix is mostly configuration. Almost every runner can write JUnit XML (pytest `--junitxml`, Jest and Vitest JUnit reporters, Go via `gotestsum`, Maven Surefire and Gradle by default, `dotnet test --logger junit` or trx, RSpec and PHPUnit formatters, Playwright's junit reporter), and almost every CI system can read it: GitLab `artifacts:reports:junit` shows results in merge requests, Jenkins `junit` step, Azure `PublishTestResults`, CircleCI `store_test_results`, and on GitHub Actions a test-report action or a job summary written to `GITHUB_STEP_SUMMARY`, with failure annotations on the changed lines.

Details that matter: upload reports even when tests fail (`if: always()` or `when: always`), keep stable test names so history works, include file and line for annotations, attach traces, screenshots or videos for end-to-end failures, keep reports from parallel shards separate and merge them, and keep retried attempts in the report rather than overwriting them, so a test that passed only on retry stays visible. Detecting, quarantining and owning flaky tests is a separate job (set-up-flaky-test-quarantine); this setup only makes the data available. Trend tracking (duration and failure rate per test over time) can use the CI system's built-in analytics, a reporting tool, or a simple stored history; choose based on what the team will actually look at.
</context>

<task>
Set up test result reporting for this repository:

{{setup}}

{{#needs}}Priorities: {{needs}}{{/needs}}

1. Read the CI configuration and test commands. List each test job, its runner, whether it produces any machine-readable report today, how failures currently appear, and whether jobs are sharded or retried.
2. Configure each runner to write JUnit XML (or the CI system's native format) to a predictable path, with stable test names and file paths, keeping console output readable.
3. Change the CI configuration to publish results on every run including failures, merge shard reports, show a summary on the pull or merge request page, annotate failures at the right file and line where supported, and upload artefacts (traces, screenshots, logs) for failed end-to-end tests with a sensible retention period.
4. Add duration and failure-rate trends per test and per suite using the CI system's features or a lightweight stored history, and make sure retried attempts appear in the report and summary rather than being overwritten. Do not build flaky test detection or quarantine here; point to that as a follow-up if the data shows it is needed.
5. Validate the CI configuration syntax locally if a tool exists, explain how to confirm it on the next run (including a deliberately failing test on a throwaway branch), and report what you could and could not verify.
</task>

<constraints>
- Do not add retries or filter results to hide failures; reports show every failed attempt.
- Prefer built-in CI features and well-maintained, pinned actions or plugins; pin third-party actions to a version or commit.
- Do not upload artefacts that may contain secrets or personal data without the user's agreement.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Current state
Table: job, runner, report today, how failures appear.
## Report outputs
Runner configuration changes and report paths.
## CI changes
The CI configuration diff.
## Trends
Where duration and failure-rate history is kept and how the team reads it.
## Check
What was validated, and how to confirm on the next run.
</output_format>
