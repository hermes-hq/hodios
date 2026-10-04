---
schema: 1
id: error-handling-rules
kind: rule
title: Error handling rules
description: Standing rules for error handling in code an assistant writes, covering no swallowed errors, added context, failing fast on bugs, retryable versus fatal, safe user messages and logging once.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, backend-engineer, frontend-engineer, fullstack-engineer]
requires: [none]
risk: read-only
level: intermediate
tags: [exceptions, error-messages, retries, logging, resilience]
pairs_with:
  prompts: [review-error-handling]
  rules: [python-style-rules, go-style-rules, secure-coding-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code that can fail:

**Never lose an error**
- Do not swallow errors: no empty catch blocks, no `catch` that only logs and continues as if nothing happened, no ignored return values or rejected promises, no `_ = err` without a comment explaining why it is safe.
- Catch only what you can handle at that point. Let everything else propagate.
- Every async call is awaited or has its failure handled; no fire-and-forget without an explicit error handler.

**Add context, keep the cause**
- When rethrowing or wrapping, add what was being attempted and the key identifiers (`"loading invoice 4821 for account 77"`), and keep the original error as the cause (`raise ... from err`, `fmt.Errorf("...: %w", err)`, `new Error(msg, { cause })`).
- Use the project's existing error types and patterns before inventing new ones. Create a new type only when callers need to tell it apart.

**Programmer errors versus operational errors**
- Fail fast on programmer errors and broken invariants (null where it cannot be, impossible state, invalid arguments from internal callers): assert or throw immediately, do not try to limp on.
- Handle operational errors (network failures, timeouts, missing files, invalid user input, conflicts) explicitly at the layer that can decide what to do.
- Validate external input at the boundary and return a clear validation error; do not let it fail deep inside.

**Retryable versus fatal**
- Classify failures: retry only transient ones (timeouts, connection resets, rate limits, 5xx from idempotent calls), never validation errors, authorisation failures or other 4xx.
- Retries use a bounded number of attempts, exponential backoff with jitter, and respect `Retry-After`. Only retry operations that are idempotent or protected by an idempotency key.
- Set timeouts on every network and I/O call; no unbounded waits.

**What users and callers see**
- User-facing messages say what happened and what to do next, in plain words, without stack traces, SQL, file paths, internal hostnames or secrets.
- APIs return a consistent error shape with a stable machine-readable code, using the project's format (for example problem details) and the correct status code.
- Include a correlation or request ID in the response and the logs so support can find the details.

**Logging**
- Log an error once, at the boundary where it is handled (request handler, job runner, top-level loop), not at every layer it passes through.
- Log with structured fields, the cause chain and the correlation ID, at the right level (expected operational failures as warning, unexpected failures as error).
- Never log passwords, tokens, full request bodies or personal data.

**Cleanup**
- Release resources on every path with the language's construct (`finally`, `with`, `defer`, `using`, RAII) and leave partial work consistent: roll back transactions, delete temp files, do not leave half-written records.

**Tests**
- Add a test for each new failure path you handle, asserting the error type or code and the message the caller sees.
