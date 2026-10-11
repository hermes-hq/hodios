---
schema: 1
id: set-up-error-tracking
kind: prompt
title: Set up error tracking for an app
description: Sets up an error tracking tool such as Sentry with release tagging, source maps or symbols, useful grouping, PII scrubbing, sampling and alert rules that do not drown the team.
category: incident
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, frontend-engineer, mobile-engineer, sre]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [code, config, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [error-tracking, exception-monitoring, source-maps, release-health, pii-scrubbing]
pairs_with:
  prompts: [instrument-service-observability, decode-minified-stack-trace, design-alerting-rules]
  personas: [site-reliability-engineer]
args:
  - name: tool
    description: The error tracking tool to set up (for example Sentry, Bugsnag, Rollbar, Honeybadger, or a self-hosted equivalent) and whether a project and DSN or API key already exist.
    type: string
    required: true
  - name: app
    description: What to instrument - the app or apps, platforms (web front end, backend, mobile), how releases are built and deployed, and any existing logging or error handling.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What I found, Changes, Configuration, Alert rules, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up error tracking in a codebase so the team sees real exceptions with enough context to fix them. Installing the SDK is the easy part; what makes it useful is the rest. Release tagging: every event carries the release version and environment, so a new error can be tied to the deploy that introduced it. Readable stack traces: upload source maps for minified JavaScript, dSYMs for iOS, ProGuard or R8 mapping files for Android, as part of the build, matching the release name exactly. Grouping: errors with dynamic IDs in messages split into thousands of issues unless messages are parameterised or fingerprints set. Privacy: by default some SDKs capture request bodies, cookies, headers or user IPs; scrub tokens, passwords, personal data and payment fields before sending, and turn off default PII collection unless the team decided otherwise. Noise: browser extension errors, bots, cancelled requests and expected 4xx handling flood the inbox if not filtered. Sampling controls cost for performance traces, not errors, which are usually kept at full rate. Alerts belong on new issues in production, regressions and sharp rate increases, not on every event.
</context>

<task>
Set up {{tool}} for:

<app>
{{app}}
</app>

1. Read the code first: entry points, framework, existing error handlers and logging, build and deploy configuration, and how the release version is known at build time. Check whether an SDK is already partly installed.
2. Install and initialise the SDK the way the project's package manager and framework expect, reading the DSN or key from configuration or an environment variable, never hard-coded.
3. Set environment and release on every event, using the same release identifier the deploy uses.
4. Capture errors at the framework's error boundaries and middleware without swallowing errors the existing handlers need, and attach useful context (route, user ID as an opaque identifier if allowed, tenant, feature flag state).
5. Configure scrubbing of secrets and personal data: request bodies, headers such as Authorization and Cookie, query parameters with tokens, and fields such as password, card number and email unless the team allows them.
6. Add build steps to upload source maps or debug symbols for the release, and keep public source maps off the production site if they are not already public.
7. Add filters for known noise and set trace sampling if performance monitoring is enabled.
8. Propose alert rules: new issue in production, regression of a resolved issue, and an error rate spike, routed to the owning team.
9. Verify: build, run the tests, and trigger a test error in a non-production environment to confirm it arrives with release, readable stack trace and scrubbed fields. Report what you could and could not verify.
</task>

<constraints>
- Never commit DSNs with secrets, auth tokens for symbol upload or API keys; use the CI secret store and environment variables.
- Do not change error handling behaviour users see; error tracking observes, it does not alter responses.
- Do not send events from local development or tests unless the user asks.
- Ask before adding a paid feature or raising sampling that has cost implications.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What I found
Framework, entry points, existing handling, release naming.

## Changes
Files changed and why.

## Configuration
Environment variables and CI secrets the team must set.

## Alert rules
Rule | Condition | Route.

## Verification
What was run and the real result; what could not be verified.

## Follow-ups
Remaining work, such as ownership rules or issue triage routine.
</output_format>
