---
schema: 1
id: design-backend-for-frontend
kind: prompt
title: Design a backend for frontend
description: Decides whether web, mobile or partner clients need a backend-for-frontend or gateway layer, and designs its responsibilities, ownership, aggregation, caching, auth and what must stay out of it.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, fullstack-engineer, mobile-engineer, frontend-engineer]
requires: [none]
inputs: [spec, text, schema]
output: [docs, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [backend-for-frontend, api-gateway, aggregation, mobile-backend, client-specific-api]
pairs_with:
  personas: [api-designer, software-architect]
  prompts: [design-api-contract, plan-caching-strategy, find-service-boundaries]
args:
  - name: clients
    description: The clients (web app, iOS, Android, smart TV, partners) and what each screen or integration needs, including network conditions and release cadence (mobile apps stay installed for months).
    type: text
    required: true
  - name: backends
    description: The services or APIs the clients call today, how many calls a typical screen makes, and the pain, for example "home screen makes 11 calls and over-fetches 400 KB on mobile".
    type: text
    required: true
  - name: teams
    description: Which teams own the clients and the services, and their skills.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Options compared, Responsibilities, Design, Ownership and operations, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A backend for frontend (BFF) is a thin server layer owned by a client team that shapes data for one experience: it aggregates several service calls into one round trip, trims payloads for mobile, and absorbs backend churn so old app versions keep working. It is not the same as a shared API gateway, which handles cross-cutting concerns (routing, auth, rate limits) for all clients. BFFs go wrong when business rules leak into them (the same discount logic duplicated in the web and mobile BFFs), when one BFF tries to serve every client and becomes a monolith, or when nobody on the client team can operate a server. GraphQL federation or a well-designed shared API can remove the need for a BFF entirely.
</context>

<task>
<clients>
{{clients}}
</clients>

<backends>
{{backends}}
</backends>

{{#teams}}
<teams>
{{teams}}
</teams>
{{/teams}}

1. Identify the actual problems: chatty screens, over-fetching, differing needs between clients, slow backend change cycles, old mobile versions, auth differences for partners.
2. Compare: no new layer (improve the existing APIs), a shared API gateway, one BFF per client experience, a shared GraphQL layer. Score against the problems, team ownership and operational cost. Recommend one.
3. If a BFF or gateway is recommended, define its responsibilities and its non-responsibilities in two lists. Business rules, persistence and authorisation decisions about domain data stay in the services; the BFF may do aggregation, shaping, response caching, protocol translation, client-specific feature flags and session handling.
4. Design it: per key screen, the BFF endpoint and the backend calls behind it (parallel where independent), partial-failure behaviour when one backend call fails, timeouts within the screen's budget, caching and what invalidates it, auth flow (token exchange, session cookies for web), and how it supports several app versions at once.
5. Ownership and operations: which team owns and is on call for each BFF, deploy cadence, observability (tracing through to backends), and the rule for when logic must move down into a service.
6. Draw the request flow for one screen as a Mermaid sequence diagram and list the risks with mitigations.
</task>

<constraints>
- Do not put domain business rules, writes to a database or authorisation decisions in the BFF.
- Do not recommend one BFF for all clients; if clients' needs are the same, recommend improving the shared API instead.
- Respect mobile realities: old versions in the field, flaky networks, payload size.
- Do not invent latency figures; reason from the given call counts or say what to measure.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
At most 5 lines.
## Options compared
Table: option, fixes which problems, ownership, operational cost, verdict.
## Responsibilities
Two lists: does, does not.
## Design
Per screen: endpoint, backend calls, failure behaviour, caching. Then a Mermaid sequence diagram.
## Ownership and operations
## Risks
Bullets with mitigations.
</output_format>
