---
schema: 1
id: choose-api-style
kind: prompt
title: Choose an API style
description: Chooses REST, GraphQL, gRPC or tRPC for an API from its clients, data shape, caching and team skills, and says what each choice will cost later.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, tech-lead, fullstack-engineer]
requires: [none]
inputs: [spec, text, document]
output: [adr, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [rest, grpc, trpc, api-style, http-api]
pairs_with:
  personas: [api-designer]
  prompts: [design-api-contract, design-graphql-schema, design-grpc-service, write-adr]
args:
  - name: api_purpose
    description: What the API does and the main operations, for example "mobile and web app backend for a booking product".
    type: text
    required: true
  - name: clients
    description: Who calls it (your own web or mobile apps, internal services, third-party developers, partners), in what languages, and how many.
    type: text
    required: true
  - name: constraints
    description: Team skills, existing stack, latency or bandwidth limits, caching or CDN needs, browser support, and anything already decided.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Comparison, Costs of the choice, What would change the answer, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
API style is chosen once and paid for for years, and it is usually chosen by fashion. The useful questions are about clients, not technology. Public APIs for unknown third parties favour REST over HTTP with JSON: every language can call it, HTTP caching and CDNs work, and tooling (OpenAPI, curl, API gateways) is universal. GraphQL pays off when several first-party clients need different shapes of a connected data graph and the team will invest in schema governance, query cost limits and N+1-safe resolvers; it gives up simple HTTP caching and makes rate limiting by request meaningless. gRPC fits internal service-to-service calls with strict contracts, streaming and low latency, but browsers need a proxy (gRPC-Web) and debugging needs special tools. tRPC is excellent when one TypeScript team owns both the client and the server in one repository, and a poor fit as soon as a non-TypeScript or external client appears. Mixing styles is normal: gRPC inside, REST or GraphQL at the edge.
</context>

<task>
<api_purpose>
{{api_purpose}}
</api_purpose>

<clients>
{{clients}}
</clients>

{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. If the clients are unclear (who they are, whether third parties will ever call the API), ask up to four questions and stop. Otherwise continue and label assumptions.
2. List the forces that decide the style here: client types and languages, public versus first-party, data shape (resource-oriented, graph-like, streaming, command-like), caching and CDN needs, payload and latency limits, team skills, and existing tooling such as gateways, auth and observability.
3. Compare REST, GraphQL, gRPC and tRPC (and any style the team already uses) against those forces. Drop options that fail a hard constraint and say which constraint.
4. Recommend one style per boundary when they differ, for example internal versus public, and explain why in terms of these clients.
5. State the long-term costs of the recommendation: versioning and evolution approach, caching, rate limiting and abuse controls, error model, documentation and SDK generation, observability, and the skills to hire for.
6. Say what would change the answer, such as third-party developers arriving or a second client language.
</task>

<constraints>
- Decide from the stated clients and constraints, not from popularity. Do not recommend GraphQL or gRPC for a public API for unknown developers without naming what those developers lose.
- Do not claim performance numbers for a style without measurements; describe the direction and what drives it.
- If the team already has a working style and no forcing reason, say that staying put is a valid recommendation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The style per boundary and the main reason, in at most 5 lines.
## Comparison
Table: force, REST, GraphQL, gRPC, tRPC, with the winner per row.
## Costs of the choice
Bullets: versioning, caching, rate limiting, errors, docs and SDKs, observability, skills.
## What would change the answer
Bullets: the trigger and the style it would point to.
## Open questions
Numbered.
</output_format>
