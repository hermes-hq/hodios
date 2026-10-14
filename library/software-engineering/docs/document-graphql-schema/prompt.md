---
schema: 1
id: document-graphql-schema
kind: prompt
title: Document a GraphQL schema
description: Writes descriptions for every GraphQL type, field, argument and enum value, with deprecation reasons, nullability meaning and example queries that run against the real schema.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, fullstack-engineer, technical-writer]
stack: [graphql]
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
tags: [api-reference, schema-descriptions, deprecation]
pairs_with:
  prompts: [document-public-api]
args:
  - name: schema
    description: The SDL files or code-first type definitions to document, with resolver code if available.
    type: text
    required: true
  - name: audience
    description: Who reads the docs in GraphiQL or the docs site.
    type: enum
    enum: [internal-frontend, public-api]
    default: internal-frontend
output_contract:
  format: markdown
  sections: [Changes, Example queries, Questions for the owners, Schema concerns]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In GraphQL the schema is the documentation: descriptions written in SDL (`"""..."""`) or code-first config show up in GraphiQL, Apollo Sandbox, generated types and IDE autocomplete. What readers miss most is what the type system cannot say: why a field is nullable (not found, not permitted, or a partial failure), what a field costs (N+1 or slow resolvers), pagination behaviour of connections, which arguments interact, what each enum value means, and what replaces a deprecated field. `@deprecated(reason:)` with a concrete replacement is the only deprecation signal tools show. Code-first libraries (Nexus, Pothos, TypeGraphQL, graphql-ruby, Strawberry, gqlgen config) each have their own `description` option; the descriptions belong there, not in a separate file.
</context>

<task>
Document this GraphQL schema for {{audience}} readers:

<schema>
{{schema}}
</schema>

1. Detect whether the schema is SDL-first or code-first and where descriptions belong.
2. Read the resolvers for each field you describe: data source, authorization checks, null cases, errors raised, and cost (batched with DataLoader or not).
3. Write descriptions for each type (what it represents, identity), field (meaning, units, format of custom scalars, why null can appear), argument (effect, defaults, limits such as `first` max), input field, and every enum value.
4. For connections, document ordering, page size limits and cursor stability.
5. For deprecated fields, ensure `@deprecated(reason: "Use X instead.")` names the replacement; for fields that should be deprecated, list them under "Schema concerns" rather than deprecating them yourself.
6. Write 3 to 5 example operations covering the main use cases, with variables, and validate them against the schema (run them if a server or schema check is available).
7. Print or build the schema and check that descriptions appear (for example via introspection or the schema printer).
</task>

<constraints>
- Edit descriptions only; do not change types, nullability, arguments or resolvers.
- Never describe behaviour the resolvers do not have. Unknowns go to "Questions for the owners".
- Descriptions are Markdown rendered in tools: keep them short, first sentence a complete summary.
- For a public API, do not mention internal service names, tables or team names in descriptions.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Apply the edits. Then reply with:
## Changes
Types and fields documented, with counts.
## Example queries
The validated example operations in `graphql` code blocks.
## Questions for the owners
Behaviour you could not determine.
## Schema concerns
Nullability, naming or pagination issues and fields that look like they should be deprecated. Write "None" if there are none.
</output_format>
