---
schema: 1
id: graphql-schema-rules
kind: rule
title: GraphQL schema rules
description: Standing rules for GraphQL schemas and resolvers covering naming, nullability, Relay connections, input and payload types, errors, deprecation, DataLoader against N+1 and query limits.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, architect]
stack: [graphql]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
tags: [schema-design, nullability, dataloader, relay-connections, resolvers]
applies_to: ["**/*.graphql", "**/*.gql", "**/resolvers/**", "**/schema/**"]
pairs_with:
  rules: [api-design-rules]
  prompts: [design-graphql-schema, review-graphql-resolver-change, secure-graphql-api]
  personas: [api-designer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change a GraphQL schema or resolvers in this project:

**Know the setup first**
- Check whether the project is schema-first (`.graphql` files) or code-first (Nexus, Pothos, Strawberry, graphql-java annotations, Hot Chocolate), which server it uses, and whether it is federated. Follow its conventions and codegen.

**Naming**
- Types, enums and inputs in `PascalCase`; fields and arguments in `camelCase`; enum values in `SCREAMING_SNAKE_CASE`.
- Name mutations verb first for the domain action (`cancelOrder`, `addCartItem`), not CRUD on tables (`updateOrder` with every field optional).
- Name fields for what clients need, not database columns. Do not expose internal ids, join tables or storage details.

**Nullability**
- Make a field non-null only if it can never be null for any client, now and later, including when a resolver behind it fails. A non-null field that errors nulls its parent, which can blank a whole page.
- Lists are usually `[Item!]!`. Arguments that are required are non-null; optional arguments have defaults where sensible.

**Lists and pagination**
- Paginate every list that can grow: use Relay-style connections (`edges`, `node`, `pageInfo`, `first`, `after`) unless the project has another standard. Enforce a maximum `first`.
- Never return an unbounded list from a root field.

**Mutations and errors**
- Each mutation takes a single `input` argument of a dedicated input type and returns a dedicated payload type (`CancelOrderPayload`) so fields can be added without breaking clients.
- Model expected business failures (validation, not found, conflict) as typed results in the payload, such as a `userErrors` list or a union of success and error types, following the project's existing pattern. Use top-level GraphQL errors for unexpected failures and auth.
- Never leak stack traces or database messages in error messages.

**Evolving the schema**
- Make additive changes. Removing a field, changing its type or making a nullable argument required breaks clients: deprecate with `@deprecated(reason: "Use x instead")` first and remove only when usage is gone.
- Add descriptions to every type and non-obvious field.

**Resolvers and performance**
- Resolvers stay thin and call domain services; authorization checks live in the domain or a shared directive or middleware, applied per field where data is sensitive, not only at the root query.
- Batch related-object loads with DataLoader (or the framework's batching) created per request. Never query the database per item in a list resolver.
- Protect the server with depth and complexity limits, a timeout, and persisted queries or an allow-list if the project uses them. Disable introspection in production if the API is private.

**Before you finish**
- Run schema linting and codegen, check for breaking changes against the published schema if the project has a check, and run resolver tests including one that asserts the number of database calls for a list query. Say what you ran.
