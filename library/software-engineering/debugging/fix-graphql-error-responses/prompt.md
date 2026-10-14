---
schema: 1
id: fix-graphql-error-responses
kind: prompt
title: Fix GraphQL null fields and partial errors
description: Fixes GraphQL responses with unexpected null fields, a nulled parent object or entries in the errors array by tracing resolver errors, schema nullability, DataLoader batching and auth checks.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [backend-engineer, frontend-engineer, fullstack-engineer]
stack: [graphql]
requires: [none]
inputs: [text, schema, file, logs]
output: [explanation, diff]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [resolvers, nullability, dataloader, api-errors, partial-responses]
pairs_with:
  prompts: [debug-network-request, design-api-contract]
args:
  - name: response
    description: The query or mutation sent, with variables, and the full JSON response including the errors array with its path and extensions.
    type: text
    required: true
  - name: server
    description: The server library (Apollo Server, GraphQL Yoga, Hot Chocolate, graphql-java, Strawberry, gqlgen or other), the relevant schema types and the resolver code for the fields that come back null. Include server logs for the request if you have them.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the response says, Cause, Fix, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an API engineer who reads GraphQL responses the way the spec defines them. What people miss:
- GraphQL usually answers HTTP 200 even when fields fail. The `errors` array, with each error's `path`, says exactly which field failed; clients that only check the status code never see it.
- When a resolver throws or returns null for a non-null field (a type ending in an exclamation mark, such as String!), the null propagates up to the nearest nullable parent. One failing non-null User.email inside a non-null list of non-null users can null the whole list, or the whole `data`. The field that is null is often not the field that failed.
- A null with no error usually means the resolver returned undefined: a wrong property name between the database row and the schema (`created_at` versus `createdAt`), a default resolver looking for a field that is not on the parent object, a missing `await`, or a DataLoader batch function that returns results in a different order or length than the keys.
- Production servers often mask error messages ("Internal server error") while the real exception is in the server log; masking is correct, so read the log rather than turning it off.
- Authorization in resolvers that returns null instead of throwing looks identical to missing data.
- Validation errors (unknown field, wrong variable type) fail the whole operation before execution and have no `path`.
</context>

<task>
Find why this GraphQL response has nulls or errors.

Request and response:
{{response}}

Server, schema and resolvers:
{{server}}

1. If you can read the repository, open the schema definition for every type on the error path and the resolvers for those fields before answering.
2. Read the response: list each error with its path and message, and say whether it is a validation error or an execution error. Mark which nulls were caused by propagation from a non-null child and which field actually failed.
3. For the failing field, trace the resolver: the parent object it receives, what it returns, whether it awaits, whether a DataLoader batch function returns one result per key in key order, and whether an auth check returns null.
4. If the real exception is masked and no log is given, say where the server logs it and ask for it, then stop.
5. Name the cause and give the smallest fix as a diff: correct field mapping, a resolver for a renamed field, an awaited call, a DataLoader that maps results back to keys, an explicit error instead of a silent null, or a nullability change in the schema when the data really can be missing (and say that this is a breaking change for clients).
6. Give a check: the same query returning the expected data, plus a test for the resolver or loader.
</task>

<constraints>
- Do not recommend turning off error masking in production; read the server log or use a development environment instead.
- Do not make fields nullable just to hide resolver bugs; change nullability only when the data can genuinely be absent, and flag the client impact.
- Do not invent schema types or resolver names that were not shown.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What the response says
Each error with path, kind, and which nulls are propagation.
## Cause
The failing resolver and why, or what is needed to decide.
## Fix
Diff with a reason per change.
## Check
Query to rerun and a test.
</output_format>
