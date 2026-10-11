---
schema: 1
id: implement-idempotency-keys
kind: prompt
title: Implement idempotency keys for an API
description: Makes POST endpoints safe to retry with Idempotency-Key storage, request fingerprints, locking and replayed responses. Use when retries or double clicks create duplicate orders or charges.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, repo, text]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [idempotency, rest-api, retries, duplicate-requests, distributed-systems]
pairs_with:
  prompts: [add-retries-and-timeouts, integrate-payments, build-webhook-handler, build-rest-endpoint]
  personas: [backend-engineer]
args:
  - name: endpoints
    description: The endpoints to protect and what they do, for example "POST /orders creates an order and charges the card".
    type: text
    required: true
  - name: stack
    description: Language, framework, database and any cache. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer making non-idempotent endpoints safe to retry. Networks drop responses after the server has acted, so clients retry, and without protection a retry creates a second order or a second charge. The pattern popularised by payment APIs, and described in the IETF draft for the `Idempotency-Key` header:
- The client sends a unique key (usually a UUID) per logical operation and reuses it on every retry of that operation.
- The server stores, per key and per caller: a fingerprint of the request (method, path, hash of the body), a status (in progress or completed), the response status and body, and timestamps. Keys are scoped to the authenticated caller so one client cannot read another's replayed response.
- The first request claims the key atomically (an insert against a unique constraint, not check-then-insert). A concurrent request with the same key while the first is still running gets 409 Conflict (or waits briefly); a request with the same key but a different body gets 422.
- When the operation completes, store the response in the same database transaction as the business write where possible. Otherwise a crash between the two leaves an order without a recorded response, and the retry repeats the work.
- Replays return the stored status and body, typically with a header marking them as replayed. Keys expire after a window such as 24 hours.
- Failures before any side effect release the key so the client can retry. Failures after a partial side effect need a recovery point, not a blind retry. Pass the same key, or a derived one, to downstream providers that support idempotency, such as payment APIs.
- A natural unique constraint (one order per cart id) is sometimes simpler and stronger; say so if it fits.
</context>

<task>
Add idempotency keys to these endpoints:
{{endpoints}}

{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the endpoints, their transactions and any downstream calls. Note where side effects happen and whether a natural unique constraint would already prevent duplicates.
2. State the design: header name, required or optional, key scope, storage (table or cache, and why), fingerprint, status codes for concurrent and mismatched reuse, expiry, which outcomes are stored, and how downstream calls receive keys.
3. Implement it as reusable middleware or a decorator in the project's style, with the storage migration, atomic claim, response capture and replay, and a cleanup job for expired keys.
4. Write tests including real concurrency (two requests at once), then run them and the type check.
</task>

<constraints>
- Never implement the claim as a read followed by a separate write without a unique constraint or lock.
- Never replay a stored response to a different caller.
- Do not store more of the response than needed, and keep secrets and card data out of it.
- Never invent library functions; if unsure, say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test. Cover at least: a retry returns the same response without a second side effect, concurrent duplicates produce one side effect, the same key with a different body is rejected, keys are isolated per caller, a failure before side effects allows retry, and expired keys are cleaned up.
## Verification
Commands run and their actual results.
## Open questions
Choices left to the team, with the default chosen.
</output_format>
