---
schema: 1
id: design-bulk-api-operations
kind: prompt
title: Design bulk and async API operations
description: Designs batch and long-running API operations with async jobs, status polling or callbacks, partial failure reporting, size limits and safe retries.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, fullstack-engineer]
requires: [none]
inputs: [spec, text, repo]
output: [docs, code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [batch-api, async-jobs, long-running-operations, partial-failure, api-design]
pairs_with:
  personas: [api-designer]
  prompts: [design-api-contract, implement-background-job, implement-idempotency-keys, spec-bulk-import-feature]
args:
  - name: operations
    description: The bulk or slow operations needed, for example "create up to 10,000 contacts", "export all orders as CSV", "recalculate prices for a catalogue", and who calls them.
    type: text
    required: true
  - name: constraints
    description: Request size and timeout limits of your gateway or platform, expected volumes, and the job or queue tools available.
    type: text
  - name: existing_api
    description: Conventions of the current API (style, error format, pagination), so the new operations match.
    type: text
output_contract:
  format: markdown
  sections: [Pattern per operation, Request and response contracts, Job lifecycle, Partial failures, Limits and retries, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Clients ask for bulk endpoints because one call per item is too slow, and then bulk endpoints fail in new ways: requests hit gateway timeouts and body limits, half the items fail validation, a client retries after a timeout and creates everything twice, and nobody can tell what happened. The standard answer separates two patterns. Small synchronous batches (tens to a few hundred items, bounded time) return a per-item result array with each item's status, id or error, never a single success flag. Anything that may take longer than a few seconds becomes a long-running operation: the API accepts the request with 202 and a job resource, the client polls the job (or receives a webhook) for state, progress and per-item results, and large outputs such as exports are delivered as a file at a temporary download link. Retried submissions must be idempotent through an idempotency key, and clients need to know whether the batch is all-or-nothing or applies item by item.
</context>

<task>
<operations>
{{operations}}
</operations>

{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

{{#existing_api}}
<existing_api>
{{existing_api}}
</existing_api>
{{/existing_api}}

1. If a repository is available, read the existing API conventions, job runner and file storage setup first, and reuse them. Say what you read.
2. For each operation, choose synchronous batch or async job, from expected size, duration and the platform's timeouts, with the arithmetic.
3. Write the request and response contracts: the batch request shape, per-item results (index or client reference, status, created id, error code and message), the 202 response with a job id and status location for async work, and how large inputs are uploaded (inline, multipart, or upload to storage first).
4. Define the job lifecycle: states (queued, running, succeeded, failed, partially succeeded, cancelled), progress reporting, how results and error reports are fetched or downloaded, cancellation, webhook or polling with a recommended interval, and how long jobs and results are kept.
5. Decide atomicity per operation: all-or-nothing or per-item, and justify it from the business meaning. For per-item, say how the client retries only the failed items.
6. Set limits and retries: maximum items and bytes per request, concurrent jobs per account, idempotency keys for submissions, and rate limits that count items rather than requests where load depends on items.
</task>

<constraints>
- Never return only an overall success or failure for a batch that applies items independently.
- Do not design an endpoint that can run longer than the platform timeout synchronously.
- Do not invent the platform's limits; ask or label assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Pattern per operation
Table: operation, sync batch or async job, max size, reason.
## Request and response contracts
HTTP examples with JSON bodies.
## Job lifecycle
State list and transitions, then polling, webhooks, cancellation and retention.
## Partial failures
## Limits and retries
## Open questions
Numbered.
</output_format>
