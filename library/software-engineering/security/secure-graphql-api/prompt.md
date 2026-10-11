---
schema: 1
id: secure-graphql-api
kind: prompt
title: Secure a GraphQL API
description: Secures a GraphQL API against abuse with depth and cost limits, field-level authorization, introspection policy, batching and alias limits, persisted queries and safe errors.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, fullstack-engineer, security-engineer]
stack: [graphql]
requires: [repo-read, file-write, shell]
inputs: [repo, schema]
output: [diff, report, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [query-cost, depth-limiting, field-authorization, introspection, persisted-queries]
pairs_with:
  prompts: [review-api-security, review-graphql-resolver-change, design-graphql-schema]
  personas: [security-auditor]
args:
  - name: api
    description: The GraphQL server (Apollo, GraphQL Yoga, Hot Chocolate, graphql-java, Strawberry, etc.), who calls it (own web app only, mobile apps, public partners) and how users authenticate.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Exposure, Findings, Limits chosen, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GraphQL moves REST's endpoint-level risks into the query. One request can nest relations until the database falls over (`user { friends { friends { friends ... } } }`), use aliases to run the same expensive field or login mutation hundreds of times, or send an array of operations in one HTTP request, which bypasses per-request rate limits and brute-force counters. Authorization is the bigger issue: checks put on a top-level query are skipped when the same type is reached through another path (`order.customer.paymentMethods`), so checks belong on the type or field resolver or in a shared authorization layer, not only on entry points. Introspection and "did you mean" suggestions hand an attacker the full schema; disabling introspection hides it a little but is not a control. For APIs used only by your own clients, persisted queries (an allowlist of operation hashes) remove arbitrary queries altogether. Error messages and stack traces often leak SQL and internal paths.
</context>

<task>
Secure this GraphQL API: {{api}}

1. Read the schema and server setup. Note which plugins or middleware already exist for depth, complexity, rate limiting and auth, and whether the API is public, partner-only or first-party only.
2. Map authorization: for each type with sensitive fields, find every path that reaches it and check that the check runs at the type or field level (directive, resolver guard or policy layer), including object ownership on node or id lookups.
3. Add query limits using the server's ecosystem tools: maximum depth, cost or complexity analysis with pagination arguments counted (`first`/`limit` multiplies cost), a cap on aliases and on operations per batch request, and a maximum page size enforced in resolvers.
4. Set introspection and field suggestions off in production for non-public APIs; keep them on in development.
5. For first-party-only APIs, propose persisted queries or an operation allowlist and how clients register operations at build time.
6. Rate limit by authenticated user and cost, not just by IP and request count; protect login and other sensitive mutations from alias and batch brute force.
7. Mask errors in production: generic messages with a correlation id, details only in logs.
8. Write tests: an over-deep query, an alias flood, a batch of mutations, a forbidden field reached through a nested path, and an over-sized page, each rejected. Run them and the existing tests.
</task>

<constraints>
- Choose limit numbers from the real schema and the deepest legitimate query the clients send; state the numbers and how you derived them.
- Do not break existing client queries; list any that exceed the new limits.
- Do not present disabled introspection as a security fix on its own.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Exposure
Who can call the API and what is already in place.
## Findings
Ranked list: severity, type or field, attack, fix.
## Limits chosen
Table: limit, value, reason.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Verification
Commands run and actual results.
</output_format>
