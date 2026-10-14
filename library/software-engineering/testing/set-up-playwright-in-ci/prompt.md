---
schema: 1
id: set-up-playwright-in-ci
kind: prompt
title: Set up Playwright and run it in CI
description: Sets up a Playwright suite with config, browser projects, reused sign-in state, sharding, a sane retry policy, traces on failure and CI artifacts. Use when starting or fixing an E2E suite.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [qa-engineer, frontend-engineer, software-engineer]
stack: [javascript, typescript]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [config, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [playwright, e2e, ci, sharding, test-setup]
pairs_with:
  prompts: [write-e2e-test, write-page-objects-for-e2e, test-login-flows-in-e2e]
  personas: [test-engineer]
args:
  - name: app
    description: The web app, how it starts locally (command and port), the environments tests run against, and the CI system.
    type: text
    required: true
  - name: browsers
    description: Browsers and devices that must be covered.
    type: string
output_contract:
  format: markdown
  sections: [Configuration, Auth setup, CI job, Conventions, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most Playwright pain comes from configuration, not test code. The defaults that matter: a `baseURL` from an environment variable so the same suite runs locally, against previews and staging; `webServer` to start the app for local and CI runs; one setup project that signs in once and saves `storageState` for other projects to reuse, instead of logging in through the UI in every test; traces, screenshots and video captured on failure (for example `trace: 'on-first-retry'` or `retain-on-failure`) and uploaded as CI artifacts, because a failure without a trace is a guessing game; retries set to zero locally and at most one or two in CI, with retried passes treated as flaky rather than fine; `forbidOnly` in CI; sharding across CI machines once the suite grows, with a merged HTML report. Browsers must be installed in CI with their system dependencies, or the official container image used, pinned to the same Playwright version as the package.
</context>

<task>
Set up Playwright for:
{{app}}
{{#browsers}}
Browsers and devices: {{browsers}}
{{/browsers}}

1. Read the repository: package manager, existing E2E tooling, how the app starts, environment variables, CI config. If Playwright exists, fix and extend its config rather than starting over.
2. Install `@playwright/test` as a dev dependency with the project's package manager and add scripts for running, UI mode and showing the report.
3. Write `playwright.config.ts`: test directory, `baseURL` from an environment variable with a local default, `webServer` for local and CI, `fullyParallel`, `forbidOnly` in CI, retries 0 locally and 1 or 2 in CI, workers tuned for CI, reporters (list locally; HTML plus JUnit or blob in CI), and trace, screenshot and video on failure.
4. Define projects: a `setup` project that signs in with test credentials from environment variables and saves storage state to a git-ignored file, then browser projects that depend on it and reuse that state. Add mobile viewports only if asked.
5. Add one real smoke test of a critical flow using role-based locators and web-first assertions, to prove the setup.
6. Add the CI job: install with the lockfile, install browsers with dependencies (or use the pinned official image), run with sharding if the suite is large enough to need it, upload the HTML report and traces as artifacts on failure, and merge sharded reports. Read credentials from CI secrets.
7. Document conventions briefly in the existing testing or contributing doc: where tests live, how to run one test, how to open a trace.
8. Run the suite locally and report.
</task>

<constraints>
- No credentials or storage-state files committed; add them to .gitignore.
- No `waitForTimeout` or fixed sleeps in tests.
- Do not set retries high to hide failures.
- Pin the browser image or install step to the installed Playwright version.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Configuration
The config file and package script changes as diffs.

## Auth setup
The setup project and how state is reused.

## CI job
The CI change, including sharding and artifacts.

## Conventions
Short bullets as added to the docs.

## Verification
Local run results and what was not verified.
</output_format>
