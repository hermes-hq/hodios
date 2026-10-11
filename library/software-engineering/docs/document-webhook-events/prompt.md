---
schema: 1
id: document-webhook-events
kind: prompt
title: Document webhook events
description: Writes the webhook reference for an API, with an event catalog and example payloads, delivery and retry rules, ordering and duplicates, signature verification, endpoint requirements and testing.
category: docs
version: 1.0.0
status: incubating
stage: [build]
role: [technical-writer, backend-engineer, developer-advocate]
stack: []
requires: [none]
inputs: [schema, text, repo]
output: [docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [webhooks, event-catalog, api-reference, signature-verification]
pairs_with:
  prompts: [document-public-api, document-error-codes, write-code-samples, write-explanation-page]
  personas: [technical-writer]
args:
  - name: webhook_source
    description: How your webhooks work - event types and their payload schemas or examples, the sending code or config, retry and timeout settings, signature scheme, headers, and how customers register endpoints.
    type: text
    required: true
  - name: languages
    description: Languages for the signature verification samples, for example "Node.js and Python".
    type: string
---
<context>
You write the webhook documentation for an API. Integrators build on what the docs promise, so the gaps they hit in production are the delivery semantics: whether delivery is at-least-once (so duplicates happen), whether order is guaranteed (usually not), how long the sender waits for a response and how it retries, when an endpoint is disabled after failures, whether the payload is a full object or a thin notification to fetch, and how to verify signatures against the raw request body with a constant-time comparison and a timestamp tolerance against replays. Most webhook support tickets come from parsing the JSON before verifying, slow handlers that time out and trigger retries, and assuming order.

<webhook_source>
{{webhook_source}}
</webhook_source>

{{#languages}}Sample languages: {{languages}}{{/languages}}
</context>

<task>
1. Extract from the source: every event type, its trigger, payload shape, delivery timeout, retry schedule, disabling rules, headers, signature algorithm and secret handling, IP ranges or other security features, and testing tools. List what is missing.
2. Write an overview page: what webhooks are for in this API, the delivery model, and a minimal handler outline (verify, record the event id, respond quickly, process asynchronously).
3. Write the event catalog: one entry per event with name, when it is sent, payload fields with types and whether they are always present, and a realistic example payload with fake values.
4. Write delivery semantics: response codes that count as success, timeout, retries with timing, duplicates and how to deduplicate using the event id, ordering and how to handle it, and when endpoints are disabled and re-enabled.
5. Write signature verification: the exact steps from the source, with samples in the requested languages that use the raw body, a constant-time comparison and a timestamp check if the scheme includes one.
6. Write endpoint requirements and testing: HTTPS, response time, how to send test events and replay failed ones, and what to log.
7. List gaps and contradictions in the source that need an engineer's answer.
</task>

<constraints>
- Document only behaviour the source supports. Never invent retry counts, timeouts, header names or algorithms; mark missing items as [to confirm].
- Example payloads use obviously fake ids, emails and amounts.
- Signature samples must verify the raw body before parsing and must not log the secret.
- If the source shows behaviour that will surprise integrators (for example ordering not guaranteed), state it prominently.
{{> output/uncertainty}}
</constraints>

<output_format>
## Overview
Markdown page.
## Event catalog
One section per event.
## Delivery and retries
Markdown page.
## Verifying signatures
Steps and code samples.
## Endpoint requirements and testing
Markdown page.
## Gaps to confirm
Bullets.
</output_format>
