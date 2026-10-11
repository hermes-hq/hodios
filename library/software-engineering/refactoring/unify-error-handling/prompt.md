---
schema: 1
id: unify-error-handling
kind: prompt
title: Unify inconsistent error handling
description: Replaces a mix of error codes, exceptions, null returns and ad hoc messages in a module with one consistent error type and propagation style, keeping caller-visible behaviour the same.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, backend-engineer]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [error-types, exceptions, result-types, failure-modes]
pairs_with:
  prompts: [review-error-handling]
  rules: [error-handling-rules]
args:
  - name: module
    description: The module or package to unify, as paths, with the language and how its errors reach users or callers (HTTP responses, CLI exit codes, a library API).
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests.
    type: string
output_contract:
  format: markdown
  sections: [Current error paths, Error model, Steps, Diff, Behaviour check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Modules that grew over years signal failure five ways at once: returning `null` or `-1`, returning `false`, throwing generic exceptions, throwing library exceptions straight through, and logging and continuing. Callers then check some and miss others. A unified model picks one propagation style that fits the language and codebase (exceptions in Java, Python, C#, Ruby; `error` values with wrapping in Go; `Result` in Rust or where the codebase already uses one) and one small error type hierarchy or set of error kinds that callers can branch on: not found, invalid input, conflict, permission, unavailable or retryable, and internal.

The rules that make it work: distinguish expected failures (a missing record, invalid input), which callers handle, from bugs, which should crash or reach a top-level handler; wrap lower-level errors with context while keeping the original as the cause (`raise ... from e`, `fmt.Errorf("...: %w", err)`, `new X(msg, cause)`); translate at boundaries (database errors become domain errors in the repository, domain errors become HTTP status or exit codes at the edge); log once, at the boundary that handles the error, not at every layer. Changing a null return into an exception or a thrown type into another breaks callers that catch or check the old form, including callers outside the module.
</context>

<task>
Unify error handling in {{module}}.

1. Inventory every failure path: function, how it signals failure today, what callers do with it (check, catch, ignore), and where it is logged. Find callers inside and outside the module.
2. Propose the error model: propagation style, error kinds, how lower-level errors are wrapped with context and cause, where translation to responses or exit codes happens, and where logging happens. Map each current path to its new form and list caller-visible changes. Wait for approval.
3. Pin current behaviour with tests at the boundary: status codes, messages, exit codes or exception types callers depend on.
4. Convert in steps: introduce the error types, convert one call chain at a time from the bottom up, update callers in the same step, remove duplicate logging. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each step.
5. Show the diff and list every caller-visible difference, intended or not.
</task>

<constraints>
- Responses, exit codes, public exception types and messages that callers or users rely on stay the same unless the user approves the change.
- Never swallow an error to make the code simpler; every former silent failure is reported as a finding.
- Keep the original error as the cause when wrapping; never lose a stack trace or error chain.
- Do not log the same error at more than one layer.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current error paths
Table: function, how it fails today, what callers do, logged where.
## Error model
Propagation style, error kinds, translation and logging points.
## Steps
Numbered steps, each with its test check.
## Diff
The change.
## Behaviour check
Caller-visible differences and test results.
</output_format>
