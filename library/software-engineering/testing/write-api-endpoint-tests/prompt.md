---
schema: 1
id: write-api-endpoint-tests
kind: prompt
title: Write API endpoint tests from the code
description: Writes HTTP-level tests for API endpoints with the framework's test client, covering authentication, authorisation, validation, status codes, response shape and side effects.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, fullstack-engineer, qa-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [api-tests, http, test-client, authorization, status-codes]
pairs_with:
  prompts: [generate-api-tests-from-spec, write-integration-tests, write-test-data-factories]
  personas: [test-engineer]
args:
  - name: endpoints
    description: The routes or controller to test, as paths or pasted code, for example "the orders controller in app/api/orders.py".
    type: text
    required: true
  - name: framework
    description: The web framework and test tools if not obvious, for example "FastAPI with pytest and httpx", "NestJS with supertest", "Rails request specs".
    type: string
output_contract:
  format: markdown
  sections: [Endpoint matrix, Setup, Tests, Check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a backend test engineer. Endpoint tests sit at the most valuable level for most APIs: they go through routing, middleware, serialisation, validation, auth and the database the way a client does, but run in-process and fast with the framework's test client (FastAPI `TestClient` or `httpx.AsyncClient`, Django and DRF `APIClient`, Flask `test_client`, supertest for Express and NestJS, Rails request specs, Spring `MockMvc` or `WebTestClient`, ASP.NET Core `WebApplicationFactory`, Go `httptest`).

The bugs that ship are rarely on the happy path. They are authorisation holes (user A can read or change user B's resource by changing the id, which is the most common serious API flaw), missing validation on optional fields, wrong status codes (200 with an error body, 500 for bad input), leaking internal fields in responses, and side effects that do not happen or happen twice. A good test asserts the status, the body shape and key values, and the side effect in the database or outbox, and builds its data with factories so every test is independent.
</context>

<task>
Write endpoint tests for {{endpoints}}{{#framework}} using {{framework}}{{/framework}}.

1. Read the routes, handlers, validation schemas, auth middleware and existing tests. Follow the project's existing test style, fixtures and factories.
2. Build an endpoint matrix: for each endpoint, the happy path, unauthenticated (401), authenticated but not allowed including another user's or tenant's resource (403 or 404, matching the project's policy), invalid input for each validated field (400 or 422), not found (404), conflicts or duplicates (409) where relevant, and pagination or filtering limits for list endpoints.
3. Set up: the test client, an isolated test database with transactions or truncation between tests, factories for data, and a helper for authenticated requests as a given user or role.
4. Write the tests, one behaviour per test with a descriptive name. Assert status, response body (shape, key values, absence of sensitive fields such as password hashes or internal ids) and side effects (rows created or unchanged, events or emails queued). Check that rejected requests change nothing.
5. Run the tests and report results. If a test exposes a real bug, keep the test, mark it clearly as failing for that reason, and describe the bug instead of fixing production code unasked.
</task>

<constraints>
- Every endpoint that takes a resource id gets a cross-user or cross-tenant access test.
- Tests must not depend on each other or on order, and must not call real external services; stub them at the boundary.
- Do not assert on full response bodies that include timestamps or generated ids without normalising them.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Endpoint matrix
Table: endpoint, case, expected status, side effect checked.
## Setup
Client, database isolation, factories and auth helper.
## Tests
The test code.
## Check
Commands run and results, plus any bugs found.
## Gaps
Endpoints or cases not covered and why.
</output_format>
