---
schema: 1
id: build-rest-endpoint
kind: prompt
title: Build a REST endpoint end to end
description: Implements one HTTP endpoint with route, input validation, handler, error mapping and tests in the project's own framework and conventions. Use when adding an API route.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [rest-api, http, input-validation, authorization]
args:
  - name: endpoint_spec
    description: Method, path, request and response shape, and business rules for the endpoint.
    type: text
    required: true
  - name: framework
    description: Web framework, for example Express, FastAPI, Spring or Rails. Leave empty to detect it from the repo.
    type: string
  - name: auth
    description: Who may call it and on which resources, for example "logged-in user, own orders only". Leave empty to follow the surrounding routes.
    type: text
output_contract:
  format: markdown
  sections: [Contract, Changes, Tests, Decisions, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A new endpoint is a public contract. Clients will depend on its status codes and error bodies, and attackers will probe its validation and authorization. The usual failures are: validation that trusts types but not ranges, an ownership check that is missing because the route is authenticated, errors that leak stack traces, a handler that duplicates business logic already living in a service, and tests that cover only the happy path.
</context>

<task>
Implement this endpoint:

{{endpoint_spec}}

Framework: {{framework}} (if empty, detect it from the dependency manifest and existing routes).
Authorization: {{auth}} (if empty, copy the policy of the closest existing route and say which one).

1. Study two or three existing routes. Note how they register routes, validate input, call services, map errors, shape error bodies, log, paginate, and test. Follow that pattern exactly.
2. Write the contract first: method, path, request schema with types, required fields, ranges and string limits, success response, and every error response. Use the method's semantics: GET is safe; PUT and DELETE are idempotent; POST creating a resource returns 201 with a `Location` header if the project does that elsewhere.
3. Validate at the boundary. Reject bad input with the project's validation error status (400 or 422, whichever it already uses). Follow the project's policy on unknown fields. Cap page sizes and list lengths.
4. Authorize the resource, not just the caller. Load the object and check the caller may act on it (broken object-level authorization is the most common API flaw). Use 401 for no or invalid credentials and 403 for authenticated but not allowed; use 404 instead where the project hides resources the caller does not own.
5. Keep the handler thin: parse, authorize, call the existing domain or service layer, map the result. Map domain errors to HTTP in the project's central place. If there is none, use RFC 9457 problem details.
6. If the repo has an OpenAPI or other schema file, update it in the same change.
7. Write tests for the happy path, each validation rule, missing auth (401), another user's resource (403 or 404), not found, and any conflict (409) or precondition (412) the spec implies.
8. Run the tests and the type check.
</task>

<constraints>
- No stack traces, SQL, internal ids or secrets in error responses. Log them server-side with the request id instead, and keep personal data out of logs.
- Do not add a new validation, HTTP or error library if the project already has one.
- Wrap multi-step writes in a transaction if the project uses them elsewhere.
- If the spec conflicts with existing conventions (for example camelCase versus snake_case fields), follow the conventions and record the conflict under Decisions.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Contract
`METHOD /path`, then a table: Case | Status | Body shape. Then the request schema.

## Changes
One line per file: `path`, what changed.

## Tests
One line per test: the case it covers.

## Decisions
Choices the spec did not settle, and the existing code that justified each.

## Verification
Commands run and actual results.
</output_format>
