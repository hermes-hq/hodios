---
schema: 1
id: redact-secrets-from-logs
kind: prompt
title: Redact secrets and personal data from logs
description: Finds tokens, passwords and personal data written to logs, traces and error reports across a codebase, and adds central redaction with tests so new leaks are caught.
category: security
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [backend-engineer, sre, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, logs]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [log-redaction, sensitive-data, structured-logging, error-tracking, pii]
pairs_with:
  prompts: [review-diff-for-personal-data, respond-to-leaked-secret, find-secrets-exposed-to-client]
  rules: [logging-rules]
  personas: [data-privacy-engineer]
args:
  - name: system
    description: The service or repo, its logging library, tracing and error-reporting tools (OpenTelemetry, Sentry, Datadog, etc.), and where logs are shipped.
    type: text
    required: true
  - name: sample
    description: A few real log lines or a trace that showed sensitive data, with the values already masked. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Leak sources, Redaction design, Changes, Tests, Already-shipped data, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Logs are copied to more places, kept longer and read by more people than the database, so a token or password in a log is a leak with a long tail. The usual sources are not individual `log.info(password)` calls but generic ones: request and response logging middleware that dumps headers (`Authorization`, `Cookie`, `Set-Cookie`) and bodies; HTTP client debug logging; error handlers that log the whole request or exception context; ORM or query logging with bound parameters; tracing auto-instrumentation that records full URLs with tokens in query strings and database statements; and error trackers that attach request data and local variables by default. Fixing call sites one by one does not last. The durable fix is central: structured logging with a redaction step keyed on field names (deny list) or, for high-risk services, an allowlist of fields that may be logged, plus the redaction hooks of the tracing and error-reporting SDKs. Pattern-based scrubbing of free text catches some tokens but misses many and can be slow, so it is a backstop.
</context>

<task>
Stop sensitive data reaching logs in {{system}}.
{{#sample}}Observed leak: {{sample}}{{/sample}}

1. Find leak sources: request and response logging middleware, HTTP client logging, error handlers, ORM and query logging, log calls that pass whole objects (`user`, `req`, `body`, `headers`, `config`), tracing instrumentation config, and error-tracker initialisation and `before_send` hooks.
2. List which sensitive fields can flow through each: credentials and tokens (Authorization, cookies, API keys, session ids, reset and magic-link tokens, URL query tokens), passwords, payment data, and personal data the team classifies as sensitive.
3. Design central redaction for the logging library (formatter, processor, serializer or `redact` option) with a shared list of sensitive keys matched case-insensitively at any depth, and value patterns as a backstop (bearer tokens, JWTs, known key prefixes).
4. Configure the tracing and error SDKs: strip sensitive headers and query parameters from URLs, turn off sending default personal data and request bodies unless needed, and scrub in their hooks.
5. Fix individual call sites that log whole objects by logging the specific fields needed.
6. Write tests that log a request with every sensitive header, a body with a password, a URL with a token, and a nested object, and assert the output contains only redaction markers. Add one for the error tracker hook.
7. Run the tests and the app locally, and show a before and after log line with fake data.
8. List where already-shipped logs live and the retention, so the team can decide on deletion and on rotating any credentials that were logged.
</task>

<constraints>
- Use fake values in tests and examples; never paste real log contents containing secrets into the output.
- Do not reduce logging that is needed for debugging; redact values, keep keys and structure.
- Do not delete existing logs or rotate credentials yourself; describe the steps.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Leak sources
Table: file:line or config, what leaks, destination (logs, traces, error tracker).
## Redaction design
Where redaction runs, the key list and patterns, and the allowlist decision.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Already-shipped data
Where existing sensitive logs live, retention, and credentials that should be rotated.
## Verification
Commands run, before and after log lines with fake data, and test results.
</output_format>
