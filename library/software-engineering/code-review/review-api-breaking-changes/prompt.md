---
schema: 1
id: review-api-breaking-changes
kind: prompt
title: Review an API change for breaking changes
description: Reviews an API diff or spec for changes that break existing clients, such as removed fields, changed semantics, new defaults, error changes and versioning gaps. Use before releasing.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, tech-lead, architect, developer-advocate]
stack: []
requires: [none]
inputs: [diff, spec, schema]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [breaking-change, backward-compatibility, versioning, public-api, openapi-spec]
pairs_with:
  personas: [backend-engineer]
  prompts: [write-api-deprecation-notice, migrate-api-version, write-contract-tests, design-api-contract]
args:
  - name: diff_or_spec
    description: The diff of the API definition (OpenAPI, GraphQL SDL, protobuf, JSON Schema) or of handler code, or the before and after specs.
    type: text
    required: true
  - name: clients
    description: Who calls the API and how tolerant they are, for example public developers, mobile apps that cannot force upgrades, or internal services deployed together.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Breaking changes, Risky changes, Safe changes, Recommended path, Tests to add]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Schema diff tools catch removed fields and renamed operations. They miss the changes that break clients quietly: a field that is still there but now nullable, a default that changed, a new required request field, an enum value older clients cannot parse, a list that is now paginated, an error code that moved from 404 to 403, a stricter validation rule, or a different ordering that a client relied on. Whether a change breaks depends on the clients: an old mobile app version in the field cannot be upgraded, while internal services deployed in lockstep can absorb more.
</context>

<task>
Review this API change for client compatibility:
<diff_or_spec>
{{diff_or_spec}}
</diff_or_spec>
{{#clients}}
Clients: {{clients}}
{{/clients}}

Go through every change and classify it as breaking, risky (breaks some reasonable clients) or safe. Check at least:
1. **Removed or renamed:** operations, endpoints, fields, query parameters, enum values, headers, GraphQL types and fields, proto fields (and whether removed proto field numbers are marked `reserved`).
2. **Type and shape:** type changes, int to string ids, number precision, nullable or optional changes in either direction (response field becoming optional breaks readers; request field becoming required breaks writers), object to array, wrapping in an envelope, pagination added.
3. **Semantics:** a changed default, units, time zone, rounding, sort order, idempotency, side effects, or meaning of an existing field.
4. **Validation:** stricter formats, lengths, ranges, or newly rejected values.
5. **Errors:** changed status codes, error body shape or error codes clients branch on; new error cases on existing operations.
6. **Enums:** new values in responses (break clients that switch exhaustively unless they were told to expect unknown values).
7. **Auth and limits:** new scopes or permissions required, lower rate limits, smaller maximum page or payload sizes.
8. **Versioning:** whether the change is shipped behind a new version, a feature flag or a header, and whether the deprecation of the old behaviour is signalled.
For each breaking or risky change, give the specific client code that would fail and a compatible alternative (add a new field instead of changing one, accept both forms during a transition, version the operation, keep the old error code).
</task>

<constraints>
- Cite the exact location (path, operation, field or line) for every change you classify.
- Judge tolerance from the clients given; if none are given, assume external clients that cannot be upgraded in lockstep and say so.
- Do not call a change safe because a diff tool would; reason about semantics.
- Do not flag pure additions of optional request fields or new operations as breaking.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: compatible | compatible with risks | breaking, and whether a version bump is required.
## Breaking changes
A table: location, change, which clients break and how, compatible alternative.
## Risky changes
Same columns.
## Safe changes
Bullets.
## Recommended path
Numbered steps to ship the intent without breaking clients, or the versioning and deprecation plan if a break is unavoidable.
## Tests to add
Contract or compatibility tests that would catch these in CI next time.
</output_format>
