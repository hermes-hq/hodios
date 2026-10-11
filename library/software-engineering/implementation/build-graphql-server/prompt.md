---
schema: 1
id: build-graphql-server
kind: prompt
title: Build a GraphQL server
description: Implements a GraphQL server from a schema with resolvers, per-request DataLoader batching, field-level authorisation, error mapping and query limits. Works with Apollo, Strawberry or graphql-java.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [graphql]
requires: [repo-read, file-write, shell]
inputs: [schema, spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [resolvers, dataloader, n-plus-one, authorization, api]
pairs_with:
  prompts: [design-graphql-schema, speed-up-graphql-api, review-graphql-resolver-change]
  personas: [backend-engineer]
  rules: [graphql-schema-rules]
args:
  - name: schema_or_spec
    description: The GraphQL schema (SDL) to implement, or the types and operations to build, plus who may see what.
    type: text
    required: true
  - name: server_library
    description: The server library if not obvious from the repo, for example "Apollo Server", "GraphQL Yoga", "Strawberry", "graphql-java with Spring".
    type: string
output_contract:
  format: markdown
  sections: [Resolver map, Data loading, Authorisation, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend engineer implementing a GraphQL server. A GraphQL server that works in the playground can still fall over in production:
- N+1: every field resolver runs per parent object. A list of 50 posts each resolving `author` makes 50 queries. Batch with DataLoader (or the library's equivalent) and create the loaders per request in the context; a global loader caches data across users.
- Authorisation belongs in resolvers or the business layer they call, per type and field, not only at the HTTP layer. Every path to an object counts: `node(id:)`, nested fields and mutations' returned objects all reach the same data.
- Nullability is behaviour: an error in a non-null field nulls its parent, up to the nearest nullable field. Implement what the schema declares and do not make a field non-null to avoid null checks.
- Errors: expected failures (validation, not found, conflict) in mutations are better returned as typed payload errors when the schema has them; unexpected errors are logged with detail and returned masked, with a stable `extensions.code`. Never return stack traces or SQL errors to clients in production.
- Limits: cap list arguments (`first` at most 100), set query depth and complexity limits, and consider persisted queries for public APIs. A schema with cycles lets one query fetch millions of rows.
- Context is built per request: authenticated user, loaders, request id.
- Schema-first or code-first: follow the project. In TypeScript, generate resolver types from the schema (GraphQL Code Generator) so resolvers cannot drift from it.
</context>

<task>
Implement this GraphQL API:
{{schema_or_spec}}
{{#server_library}}

Server library: {{server_library}}
{{/server_library}}

1. Read the server setup, existing schema, resolvers, context creation, data access and tests. Follow the existing approach and library.
2. Map every field that needs a resolver and how it loads data. Mark each lookup by parent id that needs a loader.
3. Implement resolvers, per-request loaders, the context, authorisation checks per type and field, error mapping with codes, and list and depth limits.
4. Write tests that execute operations against the schema with a test context: happy paths, a nested query asserting the number of database calls, a field the user may not see, a not-found, a masked internal error, and an over-limit query.
5. Run the tests, type checks and codegen if present. Fix what fails.
</task>

<constraints>
- Never share a DataLoader instance across requests.
- Never rely only on gateway or route-level auth for field data.
- Do not change the schema's public contract without listing the change.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Resolver map
A table: Type.field | Data source | Loader | Auth rule.
## Data loading
The loaders and the query count for the main nested operation before and after batching.
## Authorisation
Where each rule is enforced, including `node` lookups.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
</output_format>
