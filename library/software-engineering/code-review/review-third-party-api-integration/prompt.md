---
schema: 1
id: review-third-party-api-integration
kind: prompt
title: Review a third-party API integration
description: Reviews code that calls an external API for missing timeouts, unhandled pagination and rate limits, unsafe retries, weak error mapping and unverified webhooks.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer]
requires: [none]
inputs: [diff, url]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [api-integration, rate-limits, pagination, webhooks, retries, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-error-handling, build-webhook-handler, build-fake-for-external-api]
args:
  - name: diff
    description: The integration code (client setup, calls, response handling, webhook handlers), with file paths.
    type: text
    required: true
  - name: provider_docs
    description: The provider name and the relevant parts of its documentation, such as rate limits, pagination style, idempotency keys, error codes and webhook signing.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Call inventory, Findings, Questions for the provider docs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Third-party APIs fail in ways a local test never shows. Many HTTP clients have no default timeout, so a slow provider ties up every worker. Lists are paginated, and code that reads one page works until the customer has 101 records. Rate limits return 429 with a `Retry-After` header that the code ignores, or they apply per account across all your servers. Retrying a POST that timed out can create a second charge or a second shipment unless the provider supports an idempotency key and the code sends one. Providers return 200 with an error in the body, change field nullability, add enum values, and send money as strings in minor units. Webhooks arrive late, twice and out of order, and anyone can POST to the URL unless the signature is checked against the raw body with a constant-time compare and a timestamp tolerance. Secrets end up in logs through request dumps. The review must read the code against what the provider actually documents, not against assumptions.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#provider_docs}}
<provider_docs>
{{provider_docs}}
</provider_docs>
{{/provider_docs}}

1. Inventory every outbound call and inbound webhook: endpoint, method, whether it changes state at the provider, and where it is called from (request path, job, consumer).
2. Check resilience: connect and read timeouts set, retries only on retryable errors with backoff and a cap, idempotency keys on state-changing retries, circuit breaking or graceful degradation when the provider is down, no provider call inside a database transaction.
3. Check limits and pagination: every list call follows the provider's pagination to the end (cursor, page token, link header), rate limit responses handled with `Retry-After`, concurrency bounded against per-account limits.
4. Check response handling: status codes and in-body error fields both checked, unknown enum values and missing fields tolerated, amounts and dates parsed in the provider's units and zones, provider errors mapped to the app's own errors without leaking provider internals to users.
5. Check webhooks: signature verified on the raw body before parsing, timestamp tolerance against replay, duplicate and out-of-order delivery handled, fast acknowledgement with work done asynchronously.
6. Check secrets and data: keys from configuration not code, no tokens or personal data in logs, sandbox versus production configuration.
7. Check testability: a fake or recorded responses for the provider rather than live calls in tests.
8. Where the provider's documented behaviour is not supplied, list the question instead of guessing.
</task>

<constraints>
- Do not state a provider's limits, error codes or behaviour from memory as fact; cite the supplied docs or list it under Questions.
- Every finding names the failure (timeout, page 2, 429, duplicate webhook, forged webhook) and its effect.
- Treat unverified webhooks and retried non-idempotent payments as critical.
- At most 10 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Call inventory
Table: call or webhook, changes state (yes/no), timeout, retry, idempotency, pagination.
## Findings
Numbered: severity, `path:line`, failure, effect, fix.
## Questions for the provider docs
Bullets: behaviour to confirm before merging.
</output_format>
