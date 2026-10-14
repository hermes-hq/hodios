---
schema: 1
id: design-graphql-schema
kind: prompt
title: Design a GraphQL schema
description: Designs a GraphQL schema with types, nullability, connection pagination, mutations with payload errors, deprecation and an N+1-safe resolver plan.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, fullstack-engineer, architect, frontend-engineer]
stack: [graphql]
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
tags: [schema-design, nullability, relay-connections, n-plus-one, query-complexity]
pairs_with:
  personas: [api-designer]
  prompts: [choose-api-style, fix-graphql-error-responses, fix-n-plus-one-queries, review-api-breaking-changes]
args:
  - name: domain
    description: The data and actions the schema must expose, the screens or clients that will query it, and any existing data model or REST API behind it.
    type: text
    required: true
  - name: clients
    description: Which clients will use the schema (web, mobile, partners) and anything known about how they query, such as lists, detail pages or dashboards.
    type: text
    required: true
  - name: existing_schema
    description: The current schema or SDL, if this extends or reworks one.
    type: text
output_contract:
  format: markdown
  sections: [Design choices, Schema, Mutations and errors, Resolver and data loading plan, Limits and security, Evolution rules, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A GraphQL schema is a public contract that clients pin themselves to, and it can only grow: fields are deprecated, not removed, and making a nullable field non-null (or the reverse for arguments) breaks clients. Experienced schema designers model the domain rather than the database tables, name things for clients, and make fields nullable where a failure in one resolver should not wipe out the whole parent object (a non-null field that errors nulls its parent). Lists that can grow get cursor-based connections with edges, nodes and pageInfo. Mutations take one input object and return a payload type that carries the changed objects and typed user errors, so expected failures (validation, conflicts) are data, not top-level errors. Every relationship field is an N+1 risk unless resolvers batch through a loader, and every public schema needs depth and complexity limits before someone sends a query that fetches the whole graph.
</context>

<task>
<domain>
{{domain}}
</domain>

<clients>
{{clients}}
</clients>

{{#existing_schema}}
<existing_schema>
{{existing_schema}}
</existing_schema>
{{/existing_schema}}

1. If a repository is available, read the existing schema, resolvers and data layer first and follow their conventions (naming, ID format, error style). Say which files you read.
2. Identify the types, relationships and entry points the clients need. Model the domain, not table shapes; hide internal columns and join tables.
3. Decide the conventions and state them: global object IDs or plain IDs, naming (camelCase fields, PascalCase types, verb-first mutations), nullability rules (non-null for identity and always-present scalars, nullable for fields backed by other services or that may be hidden by permissions), enums versus strings, custom scalars (DateTime, money as amount plus currency).
4. Write the schema in SDL: queries, types, connections for any list that can grow (first, after, last, before, with pageInfo and, only if cheap, totalCount), and input types with sensible limits.
5. Design mutations: one input argument, a payload type with the affected object and a userErrors or union-of-result-types field for expected failures, idempotency for retried creates where relevant.
6. Write the resolver and data loading plan: which fields need batching through a per-request loader, which are expensive and should be separate fields, and where authorisation is checked (in the business layer per object, not only at the query root).
7. Set limits and security: maximum depth, complexity or cost scoring, pagination maximums, persisted queries or an allowlist for first-party clients, introspection policy in production.
8. Write evolution rules: additive changes only, @deprecated with a reason and a removal process driven by field usage data, and a schema check in CI that fails on breaking changes.
</task>

<constraints>
- Do not expose database tables, foreign keys or internal enums directly unless the client needs them.
- Every list that can grow must be paginated with a maximum page size.
- Do not make a field non-null if its resolver can fail or be denied independently of its parent.
- Expected business errors go in mutation payloads; reserve top-level errors for unexpected failures.
- Do not invent fields or business rules the domain did not imply; list them as open questions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Design choices
Bullets: IDs, naming, nullability rule, pagination, error style, scalars.
## Schema
One SDL code block.
## Mutations and errors
Per mutation: input, payload, user error codes.
## Resolver and data loading plan
Table: field, data source, batched (yes or no), auth check, cost note.
## Limits and security
## Evolution rules
## Open questions
Numbered.
</output_format>
