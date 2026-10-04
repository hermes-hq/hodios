---
schema: 1
id: review-api-design
kind: prompt
title: Review an API's design for consistency
description: Reviews an existing or proposed API endpoint by endpoint for consistent names, errors, pagination, versioning and backward compatibility, with a recommended change and rationale for each issue.
category: architecture
version: 1.0.0
status: incubating
aliases: [arch-api-design]
stage: [review, design]
role: [backend-engineer, architect, tech-lead, developer-advocate]
stack: []
requires: [none]
inputs: [spec, schema, file]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [api-design, rest-api, consistency, versioning, error-responses]
pairs_with:
  personas: [backend-engineer]
  prompts: [design-api-contract, review-api-breaking-changes, review-api-security, document-public-api]
  rules: [api-design-rules]
args:
  - name: api
    description: The API to review, as an OpenAPI or GraphQL schema, route files, or a list of endpoints with examples.
    type: text
    required: true
  - name: status
    description: Whether the API is already used by clients, which limits what can change.
    type: enum
    enum: [proposed, in-use]
    default: in-use
  - name: conventions
    description: Your organisation's API guidelines, if any.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Conventions observed, Endpoint review, Cross-cutting issues, Change plan]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An API is used by people who cannot read its code, so inconsistency costs every client: one endpoint returns `userId`, another `user_id`; one signals errors with 200 and an `error` field, another with 422; one paginates with pages, another with cursors. This review looks at the whole surface for consistency and long-term evolvability. It differs from designing a new contract from scratch and from checking a single diff for breaking changes, though it flags both kinds of risk.
</context>

<task>
Review this API (status: {{status}}):
{{api}}
{{#conventions}}
Organisation guidelines:
{{conventions}}
{{/conventions}}
1. Infer the conventions the API mostly follows: naming case, resource naming and pluralisation, ids, timestamps and money formats, error shape, status code use, pagination, filtering and sorting, versioning, and authentication. Where the organisation has guidelines, use those as the standard.
2. Review each endpoint or operation against those conventions and good practice:
   - resource modelling: nouns, nesting depth, actions that should be resources;
   - methods and status codes: safe and idempotent methods used correctly, specific error codes;
   - errors: one consistent machine-readable shape with a code and a human message;
   - collections: pagination on every list, stable ordering, limits;
   - writes: idempotency for retried creates, partial update semantics, validation errors per field;
   - evolution: versioning strategy, additive changes, fields clients cannot rely on.
3. Collect cross-cutting issues that appear in several endpoints.
4. For each issue, recommend the change and the reason. If the API is in use, give a backward-compatible path (add the new field, deprecate the old one, version only when unavoidable).
</task>

<constraints>
- Judge against the API's own dominant conventions or the stated guidelines, not personal taste.
- For an API in use, never recommend a breaking change without a migration path for clients.
- Do not demand features the API's use does not need, such as HATEOAS links or GraphQL federation.
- Quote the endpoint and field for every issue.
</constraints>

<output_format>
## Verdict
One line: consistent | minor fixes | needs rework, and the main reason.
## Conventions observed
The conventions the API follows, and where they come from.
## Endpoint review
Table: endpoint, issue, severity (high, medium, low), recommended change, compatibility (safe, needs migration).
## Cross-cutting issues
Issues that repeat, with the single fix that covers them.
## Change plan
The order to make changes in, with deprecation steps for an API in use.
</output_format>
