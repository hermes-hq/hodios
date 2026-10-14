---
schema: 1
id: document-protobuf-api
kind: prompt
title: Document a Protobuf and gRPC API
description: Documents gRPC services and Protobuf messages with comments on every service, RPC, message, field and enum, the status codes each RPC returns, and generated reference pages.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, software-engineer]
requires: [repo-read, file-write]
inputs: [schema, repo]
output: [docs, diff]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [grpc, protobuf, api-reference, proto-comments]
pairs_with:
  prompts: [document-public-api]
args:
  - name: protos
    description: The .proto files to document, plus the server implementation if available.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Changes, Status codes by RPC, Reference generation, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Comments directly above a service, RPC, message, field or enum value in a `.proto` file are leading comments; they flow into generated code in every language and into reference generators (protoc-gen-doc, Buf Schema Registry). Proto3 has quirks readers must be told about: scalar fields have no presence by default, so 0, "" and false are indistinguishable from unset unless the field is `optional` or a wrapper type; enums need a zero value that means unspecified; `oneof` means at most one is set. Error behaviour is not in the proto at all: which gRPC status codes an RPC returns (NOT_FOUND, INVALID_ARGUMENT, FAILED_PRECONDITION, ALREADY_EXISTS, UNAVAILABLE) and whether it is safe to retry lives only in server code and must be documented in the RPC comment. Field numbers and names are the wire and JSON contract, so a docs pass must never touch them.
</context>

<task>
Document these Protobuf definitions:

<protos>
{{protos}}
</protos>

1. Read the server implementation for each RPC: validation, the status codes returned and when, side effects, idempotency, deadlines and pagination.
2. Add leading `//` comments on each service (purpose, auth), RPC (what it does, status codes and their conditions, retry safety, idempotency key if any), message (what it represents), field (meaning, units, format, required by the server or not, what the zero value means, presence), and every enum value (meaning; first value documented as unspecified).
3. For `oneof`, `map` and `repeated` fields, document ordering and limits the server enforces.
4. For `google.protobuf.Timestamp`, `Duration` and `FieldMask` usage, state the semantics (for example which fields an update mask accepts).
5. Mark deprecated fields with `[deprecated = true]` only if they already are; otherwise note candidates. Mention `reserved` numbers in a comment if the reason is known.
6. Set up or run reference generation if the repo uses buf or protoc plugins (for example protoc-gen-doc or the Buf Schema Registry), and run `buf lint` or the project's proto checks.
</task>

<constraints>
- Comments only. Never change field numbers, names, types, options or package names.
- Status codes and retry advice must come from the server code; mark anything unconfirmed.
- Use leading comments, not trailing ones, so generators pick them up.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Apply the edits. Then reply with:
## Changes
Files and elements documented.
## Status codes by RPC
Table: RPC | Code | When | Retry safe.
## Reference generation
What generates the reference, the command, and lint results.
## Questions for the owners
Unknown behaviour and contract issues (missing UNSPECIFIED enum values, presence problems).
</output_format>
