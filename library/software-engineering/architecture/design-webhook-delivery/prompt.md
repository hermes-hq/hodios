---
schema: 1
id: design-webhook-delivery
kind: prompt
title: Design outbound webhook delivery
description: Designs the sending side of webhooks with event selection, signing, retries with backoff, ordering, endpoint disabling, replay and a delivery log customers can see.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, tech-lead]
subject: [saas]
requires: [none]
inputs: [spec, text, repo]
output: [docs, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [webhooks, event-delivery, retries, hmac-signing, ssrf]
pairs_with:
  personas: [software-architect]
  prompts: [document-webhook-events, build-webhook-handler, design-event-driven-system, implement-background-job]
args:
  - name: product
    description: What the product is, which events customers want to be told about, and roughly how many customers and events per day.
    type: text
    required: true
  - name: current_state
    description: How notifications to customers work today, if at all, and the stack available (queue, database, job runner).
    type: text
  - name: requirements
    description: Anything customers or sales have asked for, such as ordering, a delivery dashboard, IP allowlists or retries for a set period.
    type: text
output_contract:
  format: markdown
  sections: [Event model, Delivery pipeline, Security, Retries and endpoint health, Ordering and duplicates, Customer tooling, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Sending webhooks looks like "POST some JSON when something happens" and becomes a distributed delivery system: customer endpoints are slow, down, misconfigured or hostile. The mature pattern is to write the event in the same transaction as the business change (an outbox), fan it out to subscribed endpoints through a queue, and deliver with short timeouts, retries with exponential backoff and jitter over hours or days, and automatic disabling of endpoints that keep failing, with an email to the owner. Payloads are signed (HMAC over a timestamp and the raw body, with a per-endpoint secret that can be rotated with an overlap period) so receivers can verify origin and reject replays. Delivery is at least once and usually unordered, so every event needs a stable id and receivers must deduplicate. Because customers supply the URLs, the sender must block requests to private and metadata addresses (SSRF) and follow no redirects. Customers judge the feature by its tooling: a delivery log with request and response, manual redelivery and a test event.
</context>

<task>
<product>
{{product}}
</product>

{{#current_state}}
<current_state>
{{current_state}}
</current_state>
{{/current_state}}

{{#requirements}}
<requirements>
{{requirements}}
</requirements>
{{/requirements}}

1. If a repository is available, read how domain events or notifications are produced today and which queue and job tools exist, and reuse them. Say what you read.
2. Define the event model: event type naming (resource.action), the envelope (id, type, created timestamp, API version, data), thin versus full payloads and why, and how event versions relate to API versions.
3. Design the delivery pipeline: capture via outbox or the same transaction, fan-out per subscribed endpoint, worker pool with per-endpoint concurrency limits so one slow customer cannot starve others, request timeout, and what counts as success (2xx only).
4. Design security: per-endpoint signing secret, signature header format with timestamp, secret rotation with overlap, HTTPS only, SSRF protection (resolve and block private, loopback, link-local and metadata ranges at connect time, no redirects), published source IPs if customers need allowlists.
5. Design retries and endpoint health: backoff schedule with jitter and total retry window, which responses are retried, when an endpoint is marked failing and then disabled, and how the owner is notified and re-enables it.
6. Specify ordering and duplicates: at-least-once guarantee, stable event ids for deduplication, whether per-resource ordering is offered and its cost, and guidance to receivers to fetch current state when order matters.
7. Specify customer tooling: endpoint management with event type filters, a delivery log with attempts, status and truncated responses, manual and bulk redelivery for a time range, a test event, and retention of logs and events.
8. List metrics and alerts for the operators: queue age, success rate per endpoint, disabled endpoints.
</task>

<constraints>
- Never deliver from a request thread in the business transaction; delivery must be asynchronous and retryable.
- Never promise exactly-once delivery.
- Do not let one customer's failing or slow endpoint delay other customers' deliveries.
- Do not log full payloads or secrets where support staff or customers of other tenants can see them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Event model
Envelope as a JSON example, then naming and versioning rules.
## Delivery pipeline
A Mermaid sequence or flow diagram, then the steps.
## Security
Bullets, including the signature scheme.
## Retries and endpoint health
Table: attempt, delay, cumulative time; then disabling rules.
## Ordering and duplicates
## Customer tooling
## Open questions
Numbered.
</output_format>
