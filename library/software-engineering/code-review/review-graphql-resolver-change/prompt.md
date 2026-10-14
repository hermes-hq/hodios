---
schema: 1
id: review-graphql-resolver-change
kind: prompt
title: Review a GraphQL schema and resolver change
description: Reviews GraphQL schema and resolver changes for nullability mistakes, per-field authorisation gaps, unbounded or costly queries, N+1 resolver fan-out and DataLoader misuse.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, fullstack-engineer]
stack: [graphql]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [resolvers, dataloader, authorization, query-complexity, pull-request]
pairs_with:
  personas: [backend-engineer]
  prompts: [review-pull-request, review-api-breaking-changes]
  rules: [api-design-rules]
args:
  - name: diff
    description: The schema (SDL or code-first types) and resolver diff with file paths, plus where context, auth and DataLoaders are created.
    type: text
    required: true
  - name: context
    description: Server library (Apollo Server, GraphQL Yoga, graphql-java, Strawberry, Hot Chocolate and so on), whether the API is public or used only by your own clients, persisted queries, and existing depth or cost limits.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GraphQL moves decisions from the endpoint to the field, so review has to follow the graph. Nullability: when a non-null field's resolver fails, the null propagates up to the nearest nullable parent, so a non-null field deep in a list can wipe out the whole list or the whole response; non-null is a promise that the resolver can always keep. Authorisation must hold for every path to a field, not just the root query: if `Query.me` checks the user but `Post.author` returns the same `User` type, then `User.email` is readable by anyone who can read a post. The global `node(id:)` lookup is a common bypass. Cost: a list field without a required page size, nested lists (`users { posts { comments } }`), and aliases that repeat an expensive field many times in one request let one query do unbounded work; depth, cost or complexity limits and persisted queries bound it, and aliases also enable brute-force batching of mutations such as login. Fan-out: a resolver that queries the database per parent object makes N+1 queries per level. DataLoader fixes it, but the batch function must return results in the same order and length as the keys, missing keys must map to null or an error, and loaders must be created per request; a loader shared across requests caches one user's data for another. Error messages from resolvers reach the client, so internal exceptions leak stack details unless masked. Mutations should return payload types that can carry errors and the changed object.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open the changed schema types and resolvers in full, every other field that returns the changed types, and the code that builds the request context, auth and DataLoaders, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. Check nullability: new non-null fields whose resolvers can fail or return nothing (and how far the null would propagate), non-null items in lists, nullable fields that clients must now null-check, and input fields made required (also a breaking change for existing clients).
3. Check authorisation per field and per path: list every way a client can reach the changed types (root queries, relationships, `node` lookups, mutation payloads) and confirm each sensitive field is protected wherever it is resolved, not only at the root.
4. Check cost: list fields without enforced limits, nested list combinations, expensive fields that aliases can repeat, missing depth or cost limits on a public API, and mutations that can be batched through aliases without rate limits.
5. Check resolver efficiency: per-parent database or HTTP calls (N+1), DataLoader batch functions that return results out of order or with the wrong length, loaders or caches created outside the request scope, and resolvers that load whole objects to return one field.
6. Check errors and contracts: internal exception messages returned to clients, errors thrown where a typed payload error is expected, IDs exposing raw database keys where the schema promises opaque ids, and resolvers whose returned shape does not match the schema type.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (fields readable without authorisation through another path, cross-user data from a shared loader, unbounded queries on a public API), medium (null propagation wiping responses, N+1 on common queries, leaked internals), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Tie library-specific advice (error masking, complexity plugins, DataLoader APIs) to the server library given; ask when unknown.
- For each authorisation finding, write the exact query a client could send to reach the field.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the type and field, the defect, the query (or mutation) that triggers it, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
