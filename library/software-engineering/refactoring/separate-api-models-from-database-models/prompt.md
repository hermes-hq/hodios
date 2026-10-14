---
schema: 1
id: separate-api-models-from-database-models
kind: prompt
title: Separate API models from database models
description: Introduces request and response DTOs so API shapes no longer mirror database models, keeping the JSON wire format byte-identical and closing accidental field exposure.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [dto, api-contract, serialization, mass-assignment]
pairs_with:
  prompts: [extract-data-access-layer, introduce-value-objects]
args:
  - name: endpoints
    description: The endpoints that return or accept database models directly, as paths, with the framework and ORM, and who consumes the API (own frontend, mobile apps, third parties).
    type: text
    required: true
  - name: test_command
    description: The command that runs the API tests.
    type: string
output_contract:
  format: markdown
  sections: [Current coupling, DTO design, Wire format check, Diff, Findings]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Returning ORM entities straight from controllers means every column becomes public API: adding a column leaks it, renaming one breaks clients, lazy relations trigger queries during serialization, and binding request bodies to entities allows mass assignment (a client sets `role` or `account_id`). Separate request and response types (DTOs, schemas, serializers, resources) decouple the two so the database can change without breaking clients.

The refactor itself must not change the wire format. Serializer details are easy to change by accident: field names and casing, `null` versus missing fields, date and decimal formats, enum representation, number versus string ids, field order (which some clients and signature schemes depend on), nested objects versus ids, and computed fields added by the ORM's serializer. The way to prove equivalence is to capture real responses before the change (snapshot or golden-file tests per endpoint with representative data) and compare after. Fields that were exposed by accident (password hashes, internal flags, other tenants' ids) are a security finding: keep them only if the user decides clients need them, otherwise remove them as a separate, announced change.
</context>

<task>
Separate the API models for {{endpoints}}.

1. For each endpoint, list the entity used as request or response, every field it serializes, and fields accepted on write. Mark sensitive or internal fields that are exposed or writable today.
2. Capture current behaviour: add snapshot tests of real responses with representative data, including nulls, dates, decimals, enums and nested relations, and request tests for which fields are accepted.
3. Propose request and response types per endpoint in the project's idiom (Pydantic models, DTO classes with mappers, serializers, resources, records), and where mapping happens. Keep exposed sensitive fields as-is in this change but list them as findings. Wait for approval.
4. Introduce the types endpoint by endpoint; restrict writable fields to what clients set today. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} so snapshots match byte for byte.
5. Show the diff and the findings list.
</task>

<constraints>
- Response bodies stay byte-identical (names, casing, nulls, formats, order) unless the user approves a change.
- Writable fields after the change must be a subset of what was accepted before; anything previously writable that should not be is reported, and removed only with approval.
- Do not add a mapping library unless the project already uses one.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current coupling
Table: endpoint, entity, fields read, fields written, sensitive fields.
## DTO design
Types per endpoint and where mapping happens.
## Wire format check
Snapshot results per endpoint.
## Diff
The change.
## Findings
Exposed or writable fields to decide on, and N+1 risks seen.
</output_format>
