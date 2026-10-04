---
schema: 1
id: build-fake-for-external-api
kind: prompt
title: Build a fake for an external API
description: Builds a test double for a third-party API, choosing an in-memory fake, stub server or record-and-replay, with contract checks against the real API and error, timeout and rate-limit cases.
category: testing
version: 1.0.0
status: incubating
stage: [verify, build]
role: [backend-engineer, software-engineer]
requires: [none]
inputs: [file, spec, text]
output: [code, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [test-doubles, stub-server, record-replay, third-party-api, contract-drift]
pairs_with:
  prompts: [integrate-third-party-api, write-contract-tests, write-integration-tests]
  personas: [test-engineer]
args:
  - name: client_code
    description: Your code that calls the API (client class, SDK wrapper or HTTP calls), plus the calls your app makes and the responses it relies on. Paste docs excerpts for error formats if you have them.
    type: text
    required: true
  - name: api_name
    description: The third-party API, for example "Stripe Payments", "Twilio SMS" or "an internal partner's shipping API".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Choice of double, The fake, Failure modes, Tests using the fake, Keeping it honest]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user's code integrates with {{api_name}} and its tests either call the real API (slow, flaky, costly, sometimes impossible in CI) or mock individual methods so tightly that tests pass while the integration is broken. A good fake behaves like the API for the subset the app uses, keeps state where the API does (create then fetch returns the same object), produces the API's real error shapes, and is checked against the real API often enough that it cannot drift.

Choosing the double:
- In-memory fake behind the app's own client interface: fastest, best for unit and service tests, needs an interface seam.
- Stub HTTP server (for example WireMock, MockServer, a small local server, or an HTTP mocking library at the transport layer): tests the real client code, serialisation and headers.
- Record and replay (VCR-style cassettes): cheap to start, but recordings go stale and can capture secrets; use for a few smoke paths, scrub them, and re-record on a schedule.
</context>

<task>
<client_code>
{{client_code}}
</client_code>

1. List the operations the app actually uses, the fields it reads from responses, and the state those operations imply (objects created, updated, listed).
2. Recommend the double (or a combination, for example an in-memory fake for service tests plus a stub server for client tests), with the reason for this codebase.
3. Write the fake:
   - Same interface as the real client (or the same HTTP routes and payloads for a stub server).
   - Realistic state: ids in the API's format, timestamps from an injected clock, pagination behaving like the API's.
   - Configurable failure injection: per-call errors with the API's real error body and status codes, timeouts or slow responses, rate limiting (429 with the retry header the API uses), partial failures, and webhooks or async callbacks if the app depends on them.
   - Test helpers to inspect what was sent (last request, all requests) without exposing internals to production code.
4. Write example tests that use the fake: the happy path, a retried rate limit, a timeout, an API validation error surfaced to the user, and idempotency on retries if the API supports idempotency keys.
5. Keep the fake honest: a small contract suite that runs the same assertions against the fake and against the real API's sandbox (on a schedule or before releases, not on every pull request), checks response shapes against the API's published schema if there is one, and fails when they diverge. Name what to do when the vendor changes their API.

If the client code does not show the response fields the app uses, ask for them and stop. If no sandbox exists, say what to use instead (recorded production-safe responses, vendor docs) and the risk.
</task>

<constraints>
- Do not invent error codes, headers or payload fields for {{api_name}}; use those in the code or the docs the user gave, and mark others [CHECK DOCS].
- No real credentials, keys or customer data in fakes, fixtures or recordings; scrub recordings.
- The fake must live in test code and never be reachable from production builds.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Choice of double
The recommendation and why, in under 120 words.
## The fake
Code.
## Failure modes
Table: failure | how to trigger it in the fake | real API behaviour it mimics | source (code, docs or [CHECK DOCS]).
## Tests using the fake
Code.
## Keeping it honest
The contract suite, when it runs, and the drift procedure.
</output_format>
