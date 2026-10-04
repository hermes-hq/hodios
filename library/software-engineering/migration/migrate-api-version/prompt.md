---
schema: 1
id: migrate-api-version
kind: prompt
title: Plan a breaking API version change
description: Plans a breaking API version change with a deprecation timeline, compatibility shims, a client migration guide and adoption telemetry. Use before changing anything clients rely on.
category: migration
version: 1.0.0
status: incubating
stage: [plan, design]
role: [backend-engineer, architect, tech-lead, developer-advocate]
stack: []
requires: [none]
inputs: [schema, spec]
output: [plan, docs, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [api-versioning, deprecation, breaking-changes, backward-compatibility]
pairs_with:
  prompts: [design-api-contract, write-migration-guide]
args:
  - name: current_api
    description: The current API - an OpenAPI or GraphQL schema excerpt, the versioning scheme in use, and public or internal audience.
    type: text
    required: true
  - name: changes
    description: The changes you want to make and why.
    type: text
    required: true
  - name: clients
    description: Known clients - SDKs, mobile apps with slow update cycles, partners, internal services - and what you know about their usage.
    type: text
output_contract:
  format: markdown
  sections: [Change classification, Avoid the break, Versioning, Compatibility layer, Timeline, Telemetry, Client migration guide, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Breaking an API costs every client time and trust, so the best breaking change is the one avoided: additive fields, accepting both old and new forms, expand-then-contract. When a break is necessary, it succeeds when there is one implementation behind a translation layer, a published timeline with machine-readable deprecation signals, telemetry that shows exactly who still uses the old behaviour, and a migration guide good enough that clients can upgrade without opening a support ticket.
</context>

<task>
Plan this API change.
Current API:
{{current_api}}
Changes wanted:
{{changes}}
{{#clients}}
Known clients:
{{clients}}
{{/clients}}

1. Classify each change as breaking or non-breaking. Breaking includes removed or renamed fields and endpoints, type or format changes, new required inputs, stricter validation, changed defaults, changed status or error codes, changed pagination, ordering or semantics, and authentication changes.
2. For each breaking change, look for a non-breaking route first: add the new field beside the old one, accept both inputs, or put the new behaviour behind an opt-in. Only what remains needs a new version.
3. Versioning: follow the scheme already in use (URL path, header, media type or dated versions). Bundle the remaining breaks into one version rather than several.
4. Compatibility layer: keep one implementation and translate old requests and responses at the edge, so the old version costs little to keep. Say which changes cannot be translated.
5. Timeline: announcement, the new version available, deprecation signals on old-version responses (the `Deprecation` and `Sunset` HTTP headers plus a link to the guide), brownouts (short scheduled failures to surface forgotten clients), and the sunset date. Size the window to the slowest client: mobile apps and partner integrations need far longer than internal services.
6. Telemetry: usage by version, endpoint and client identity, plus use of the specific fields or behaviours being removed. Set adoption targets for each milestone and a plan for contacting the clients who lag behind.
7. Write the client migration guide: for each change, before and after examples of requests and responses, the code change, how to test, and the dates.
</task>

<constraints>
- Do not invent clients or usage numbers. If clients are unknown, make adding telemetry the first milestone and give no sunset date until data exists.
- Never move the sunset date earlier once announced.
- Write the guide for the client developer: plain language and examples, no internal reasoning.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Change classification
A table: change, breaking (yes/no), who it affects, why.
## Avoid the break
For each breaking change, the non-breaking alternative or why there is none.
## Versioning
The decision and the version identifier.
## Compatibility layer
What is translated, where, and what cannot be.
## Timeline
A table: milestone, timing relative to announcement, what happens, communication.
## Telemetry
Metrics, dimensions, dashboards and adoption targets.
## Client migration guide
A ready-to-publish draft.
## Risks
Bullets with mitigations.
</output_format>
