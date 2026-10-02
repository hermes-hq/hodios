---
schema: 1
id: review-error-handling
kind: prompt
title: Review error handling
description: Reviews failure paths for swallowed errors, lost context, unsafe retries, missing timeouts and internal details leaking to users, with ranked fixes. Use on code that calls I/O or external services.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, backend-engineer, tech-lead]
stack: []
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [error-handling, retries, resilience, exceptions]
pairs_with:
  personas: [backend-engineer, code-reviewer]
args:
  - name: code
    description: The code, diff or file paths to review.
    type: text
    required: true
  - name: language
    description: Language and framework, if not obvious from the code.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Findings, Fixes, What is done well]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Error-handling defects stay invisible until production: an empty catch turns an outage into silent data loss, a retry loop around a non-idempotent call charges a customer twice, a missing timeout lets one slow dependency exhaust every worker, and a raw exception message shows a SQL query to an end user. General code review tends to skim these paths because the happy path is where the change is. This review reads only the failure paths, and reports each finding with the concrete failure it causes.
</context>

<task>
Review the error handling in:
{{code}}
{{#language}}Language and framework: {{language}}{{/language}}

For every call that can fail (I/O, network, database, parsing, external services, user input), follow what happens on failure and check:
1. **Swallowed errors:** empty catch or except blocks, ignored return values or error results, promises without a rejection handler, `catch` that logs and continues where the caller needs to know, fallbacks that hide failure (returning an empty list on error).
2. **Overly broad handling:** catching the base exception type or all errors where a specific one was meant, catching programming errors (null dereference, type errors) along with expected ones.
3. **Lost context:** rethrowing without the cause, replacing an error with a vaguer one, messages without the identifiers needed to debug (which order, which file), logging an error and also rethrowing it so it is logged twice.
4. **Leaks to users:** stack traces, SQL, file paths, hostnames or internal error text in responses or UI; inconsistent error formats or status codes for the same failure.
5. **Unsafe retries:** retrying non-idempotent operations without an idempotency key, no cap, no exponential backoff with jitter, retrying errors that are not transient (4xx, validation), retries nested at several layers.
6. **Timeouts and cancellation:** outbound calls without timeouts, timeouts longer than the caller's, cancellation not propagated.
7. **Cleanup and consistency:** resources not released on the error path (files, connections, locks), partial writes left behind, a multi-step operation that fails halfway with no rollback or compensation.
8. **Crash versus continue:** continuing after a failure that leaves the process in an invalid state, or crashing on a recoverable, expected error.

Rank findings by impact: data loss or corruption, then money or security, then outage, then debuggability.
</task>

<constraints>
- Each finding needs a location and a concrete failure scenario. If you cannot describe the input or condition that triggers it, drop it.
- Report at most 12 findings. Do not comment on style, naming or the happy path.
- Fixes must follow the language's idioms (wrapping with a cause, `errors.Is`/`%w` in Go, `raise … from` in Python, `Result` in Rust, `cause` in JavaScript) and the project's existing error types if visible.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Summary
One or two sentences: overall state and the most serious risk.
## Findings
Numbered, most severe first. Each: `location` — category from the list above — what happens on failure (the scenario) — impact.
## Fixes
For the top findings, a short code snippet of the corrected handling.
## What is done well
Bullets, or "Nothing notable".
</output_format>
