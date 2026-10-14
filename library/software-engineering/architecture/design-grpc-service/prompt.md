---
schema: 1
id: design-grpc-service
kind: prompt
title: Design a gRPC service
description: Designs gRPC services and Protobuf messages with field numbering, evolution rules, streaming choice, deadlines, status codes and package layout.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, schema, text, repo]
output: [code, docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [grpc, protobuf, schema-evolution, streaming, deadlines]
pairs_with:
  personas: [api-designer]
  prompts: [choose-api-style, design-api-contract, add-retries-and-timeouts, review-api-breaking-changes]
args:
  - name: service
    description: What the service does, the operations callers need, and who calls it (which services, languages, any browser or mobile clients).
    type: text
    required: true
  - name: data
    description: The main entities and fields, sizes of typical requests and responses, and any lists or feeds that can be large or continuous.
    type: text
    required: true
  - name: existing_protos
    description: Existing .proto files, package naming or style guide in use, and the code generation and lint tools already set up.
    type: text
output_contract:
  format: markdown
  sections: [Design choices, Proto definitions, Streaming and deadlines, Errors, Evolution rules, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Protobuf compatibility rests on field numbers, not names: a field number can never be reused or retyped once released, removed fields must be marked reserved (number and name), and adding fields is safe because old readers skip unknown ones. In proto3, scalar fields have no presence by default, so zero and "not set" look the same unless the field is declared optional or wrapped, which matters for partial updates. Experienced teams give every RPC its own Request and Response message so they can grow independently, version packages (acme.billing.v1), use field masks for updates, and paginate list RPCs with page_size and page_token instead of returning unbounded repeated fields. Streaming is chosen for a reason (server push, large result sets, bidirectional sessions), because streams complicate load balancing, retries and deadlines. Every call needs a deadline set by the caller and propagated downstream, and errors use the canonical status codes with structured details, not strings to be parsed.
</context>

<task>
<service>
{{service}}
</service>

<data>
{{data}}
</data>

{{#existing_protos}}
<existing_protos>
{{existing_protos}}
</existing_protos>
{{/existing_protos}}

1. If a repository is available, read the existing .proto files, buf or protoc configuration and generated-code usage first, and follow their package, naming and lint conventions. Say what you read.
2. State the design choices: package and version naming, file layout, resource-oriented method naming (Get, List, Create, Update, Delete plus custom verbs), ID and timestamp types (well-known types such as Timestamp and Duration), money and enum conventions (enums start with an UNSPECIFIED zero value).
3. Write the .proto definitions: one Request and Response message per RPC, List methods with page_size, page_token and next_page_token, Update methods with a field mask, optional for fields where presence matters.
4. Decide unary versus server, client or bidirectional streaming per RPC, with the reason, plus message size limits and how large payloads are chunked or moved out of band.
5. Specify deadlines and retries: the default deadline per RPC from the caller's budget, deadline propagation, which RPCs are idempotent and safe to retry, and the retry or hedging policy.
6. Specify errors: the status code for each failure (INVALID_ARGUMENT, NOT_FOUND, ALREADY_EXISTS, FAILED_PRECONDITION, PERMISSION_DENIED, UNAVAILABLE, and so on) and structured error details for field violations.
7. Write evolution rules: never reuse or retype field numbers, reserve removed fields, add new RPCs rather than changing semantics, a new major package version only for unavoidable breaks, and a breaking-change check in CI.
8. Note browser or external access if needed (gRPC-Web, a JSON transcoding gateway) and what it costs.
</task>

<constraints>
- Do not return unbounded repeated fields from list RPCs.
- Do not share one message type between unrelated RPCs' requests and responses.
- Do not use status codes inconsistently with their canonical meaning, and do not put machine-readable error data only in the message string.
- Do not invent the callers' latency budgets; ask or label assumptions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Design choices
Bullets.
## Proto definitions
One or more proto code blocks.
## Streaming and deadlines
Table: RPC, kind (unary or streaming), default deadline, idempotent, retry policy.
## Errors
Table: RPC, failure, status code, details.
## Evolution rules
Numbered.
## Open questions
Numbered.
</output_format>
