---
schema: 1
id: design-api-contract
kind: prompt
title: Design an API contract
description: Designs an API contract before implementation, with operations, schemas, errors, pagination, idempotency and evolution rules. Use when adding an API that other teams or clients will call.
category: architecture
version: 1.0.0
status: experimental
stage: [design]
role: [backend-engineer, architect, fullstack-engineer, tech-lead]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [code, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [api-design, contract-first, rest, idempotency, versioning]
pairs_with:
  personas: [software-architect]
  prompts: [write-adr]
args:
  - name: capability
    description: What the API must let its clients do, in plain words or as user stories.
    type: text
    required: true
  - name: consumers
    description: Who calls the API (web app, mobile app, partners, internal services) and their constraints.
    type: text
  - name: style
    description: API style. auto picks one and justifies it.
    type: enum
    enum: [auto, rest, graphql, grpc]
    default: auto
  - name: conventions
    description: Existing API conventions to follow (naming, error format, auth, pagination), or a sample of an existing endpoint.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Operations, Contract, Errors, Evolution and compatibility, Assumptions and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An API contract is a promise that outlives its first implementation: once clients depend on it, every field name, error shape and default is expensive to change. Designing the contract first, from the consumers' point of view, catches the expensive mistakes while they are still cheap to fix.
</context>

<task>
Design the API contract for: {{capability}}
{{#consumers}}
Consumers and their constraints:
{{consumers}}
{{/consumers}}
{{#conventions}}
Existing conventions to follow exactly:
{{conventions}}
{{/conventions}}
Style: {{style}}. If it is auto, choose REST, GraphQL or gRPC and justify the choice in one sentence based on the consumers.

1. Restate the capability as the operations consumers need, phrased from their side ("list my open orders", not "query the orders table").
2. Model the resources (or types, or services) and the operations on them. Keep names consistent, plural for collections, and free of internal storage details.
3. Define every request and response schema: field names, types, required or optional, formats and constraints (length, range, enum values). Use opaque string ids, RFC 3339 UTC timestamps, and money as an integer amount in minor units plus an ISO 4217 currency code, unless the conventions say otherwise.
4. Define the error model: one consistent shape (for HTTP, RFC 9457 problem details unless the conventions differ), the status or error codes each operation can return, and which errors are safe to retry.
5. Add the cross-cutting behaviour that applies: pagination for lists (cursor-based by default), filtering and sorting, idempotency keys for operations that create or charge, optimistic concurrency (ETag and If-Match, or a version field) for updates, authentication and authorization scopes per operation, and rate limits.
6. Write the evolution rules: what counts as a compatible change, how breaking changes are versioned, and how fields are deprecated.
</task>

<constraints>
- Design the contract only. No server implementation code.
- Do not invent business rules (limits, states, permissions, pricing). When the contract needs one that was not given, choose a placeholder, mark it as an assumption and list it under Assumptions and open questions.
- Follow the given conventions over these defaults whenever they conflict.
- Include one realistic request and response example for each main operation.
- Prefer fewer, well-shaped operations over one endpoint per screen.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Style chosen and why, the resources, and the main design choices, in at most 6 lines.
## Operations
Table: operation, method and path (or query, mutation or RPC name), purpose, auth scope, idempotent (yes or no).
## Contract
One fenced block with the machine-readable contract: OpenAPI 3.1 YAML for REST, SDL for GraphQL, proto3 for gRPC. Include the examples.
## Errors
Table: code, when it happens, retryable (yes or no).
## Evolution and compatibility
Bullets.
## Assumptions and open questions
Numbered. Each assumption says what it affects.
</output_format>
