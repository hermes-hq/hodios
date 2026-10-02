---
schema: 1
id: build-webhook-handler
kind: prompt
title: Build a webhook handler
description: Implements a webhook receiver with signature checks, replay protection, idempotent processing, fast acknowledgement, async work, retries and tests. Use when integrating Stripe, GitHub or similar.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [spec, document, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [webhooks, hmac-signature, idempotency, replay-protection, payments-integration]
pairs_with:
  personas: [backend-engineer]
  prompts: [integrate-third-party-api, implement-background-job, review-pr-for-security]
args:
  - name: provider
    description: Who sends the webhooks, for example Stripe, GitHub, Shopify, Twilio or an internal service.
    type: string
    required: true
  - name: events
    description: The event types to handle and what the app must do for each.
    type: text
    required: true
  - name: stack
    description: Language and framework, for example "Python FastAPI with Celery". Leave empty to detect it from the repo.
    type: string
  - name: signature_scheme
    description: How the provider signs requests (header names, algorithm, what is signed, timestamp tolerance), pasted from its docs. Needed for providers the assistant cannot verify.
    type: text
output_contract:
  format: markdown
  sections: [Signature scheme, Design, Changes, Tests, Configuration, Operational notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Webhook endpoints are public URLs that move money, permissions or data, so they fail in costly ways: a framework parses the JSON before the signature is checked and the raw bytes are gone, so verification never works and someone disables it; a forged or replayed request is accepted; the provider retries after a slow response and the order ships twice; events arrive out of order and an old "subscription.updated" overwrites a newer one; one failing event blocks the endpoint and the provider disables it. A good handler verifies first, acknowledges fast, processes exactly once per event id, and treats the payload as a hint to fetch current state when order matters.
</context>

<task>
Implement a webhook receiver for {{provider}}.
{{#stack}}
Stack: {{stack}}
{{/stack}}
If no stack is given, detect the language, framework and job queue from the repo and follow their conventions.

Events to handle:
<events>
{{events}}
</events>

{{#signature_scheme}}
Signature scheme from the provider's docs:
<signature_scheme>
{{signature_scheme}}
</signature_scheme>
{{/signature_scheme}}

1. Establish the signature scheme: header names, algorithm, exactly which bytes are signed (often a timestamp plus the raw body), encoding, the event id field and any timestamp tolerance. Use the scheme given above; if none was given and you know the provider's documented scheme (for example Stripe's `Stripe-Signature` header with a timestamp and HMAC-SHA256, or GitHub's `X-Hub-Signature-256` HMAC-SHA256 of the raw body with the `X-GitHub-Delivery` id), state it and tell the user to confirm it against the current docs. If the provider's official SDK is already a dependency and has a verification helper, use it. If you do not know the scheme, stop and ask for it.
2. Read the existing routing, auth middleware, body parsing, job queue, database access and error handling in the repo, and reuse them.
3. Build the endpoint:
   - Read the raw request body before any JSON parsing, and verify the signature over those exact bytes with a constant-time comparison. Reject with 400 or 401 and no detail on failure.
   - Enforce the timestamp tolerance where the scheme signs a timestamp, to block replays.
   - Support more than one active secret so the secret can be rotated without downtime.
   - Enforce a body size limit and accept only the expected content type.
   - Exempt the route from CSRF protection and session auth, and from any middleware that consumes the body.
4. Make processing idempotent and fast:
   - Record the event id in a table with a unique constraint; if it already exists, acknowledge with 2xx and do nothing.
   - Persist the event and enqueue the work, then return 2xx quickly (well within the provider's timeout); do the real work in a background job.
   - In the job, handle each listed event type in its own function; ignore and log unknown types with 2xx so new provider events do not cause retries.
   - Guard against out-of-order delivery: compare the event's created time or object version with what is stored, or fetch the current object from the provider's API before acting when order matters.
   - Make the side effects themselves idempotent (upserts, state checks, idempotency keys on outbound calls).
5. Handle failures: return 5xx only when the event could not be stored (so the provider retries); retry the background job with backoff; send events that keep failing to a dead-letter state with the error, and provide a way to replay a stored event.
6. Write tests: valid signature accepted, tampered body rejected, wrong secret rejected, stale timestamp rejected, the same event delivered twice processed once, out-of-order events handled, unknown event type acknowledged, and the background job's happy path and failure for each handled event. Build test signatures with a test secret, never a real one.
7. Run the tests and the linter, and report the real results.
</task>

<constraints>
- Never log the raw signature, the secret or full payloads that contain personal or payment data; log the event id and type.
- Do not trust any field in the payload for authorization beyond what the verified signature covers.
- Do not invent provider headers, event names or fields. Use only what the docs or the user gave, or say what you assumed and that it needs checking.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Signature scheme
What is signed, the headers, algorithm and tolerance, and the source (user-provided, SDK, or from memory: confirm against the provider's docs).
## Design
A Mermaid sequence diagram from the provider to the side effect, then the idempotency and ordering strategy in a few bullets.
## Changes
One line per file.
## Tests
One line per test and the real result of the run.
## Configuration
| Setting | Env var | Required | Notes | (secrets, tolerance, queue names)
## Operational notes
How to register the endpoint with the provider, rotate the secret, replay a failed event, and what to alert on.
</output_format>
