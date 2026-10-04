---
schema: 1
id: generate-api-tests-from-spec
kind: prompt
title: Generate API tests from a spec
description: Generates API tests from an OpenAPI or GraphQL schema with positive, boundary, invalid-input, auth and permission cases, response schema checks and property-based fuzzing where tools allow.
category: testing
version: 1.0.0
status: incubating
stage: [verify]
role: [backend-engineer, qa-engineer]
stack: [openapi, graphql]
requires: [none]
inputs: [schema, spec]
output: [tests, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [api-testing, schema-conformance, boundary-values, authorization, schemathesis]
pairs_with:
  prompts: [write-contract-tests, write-integration-tests, write-property-based-tests]
  personas: [test-engineer, api-designer]
args:
  - name: spec
    description: The OpenAPI document (YAML or JSON) or GraphQL SDL, whole or the operations to test, plus how auth works (API key, OAuth scopes, roles) if the spec does not say.
    type: text
    required: true
  - name: test_stack
    description: The test tools and language to write in, for example "pytest with httpx", "Jest with supertest", "REST Assured" or "Postman collection".
    type: string
    default: "recommend one and say why"
output_contract:
  format: markdown
  sections: [Coverage matrix, Test setup, Tests, Schema conformance and fuzzing, Spec gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user is a backend or QA engineer with an API contract and wants tests that exercise it systematically. Test stack: {{test_stack}}. Tests generated naively from a spec only hit each operation once with a valid body and check for a 200, which proves almost nothing. The defects live in boundaries (min and max lengths, numeric limits, enum values, nullable fields), malformed input that should get a 4xx and gets a 500, missing object-level authorization (user A reading user B's order), undocumented fields leaking in responses, and responses that drift from the schema.
</context>

<task>
<spec>
{{spec}}
</spec>

1. Inventory the operations (method and path, or query and mutation names), their parameters, request bodies with constraints, documented responses and security requirements.
2. For each operation, derive cases by technique:
   - Positive: one minimal valid request and one with every optional field.
   - Boundaries: for each constrained field, values at, just inside and just outside `minLength`, `maxLength`, `minimum`, `maximum`, `pattern`, `enum` and array `minItems`/`maxItems`.
   - Invalid input: missing required fields, wrong types, null where not nullable, unknown fields if `additionalProperties: false`, malformed JSON, wrong content type. Expect the documented 4xx, never a 5xx.
   - Auth: no credentials (401), valid credentials without the scope or role (403), and object-level access with a second user's resource id (403 or 404, never the data). For GraphQL, check field-level authorization and depth or complexity limits.
   - State: create then read, update a deleted resource, idempotency keys and duplicate submissions where the spec has them, pagination edges (empty page, last page, invalid cursor).
3. Rank cases by risk and keep the matrix lean: every operation gets positive, auth and invalid-input cases; boundaries only for constrained fields.
4. Write the tests in the chosen stack with shared fixtures for base URL, two test users with different roles, and data setup and teardown through the API itself. Read secrets from environment variables.
5. Add response schema validation on every test (validate the body against the spec's response schema, for example with an OpenAPI validator or GraphQL type checks), so drift fails loudly.
6. Where tooling exists, add property-based or schema-driven fuzzing (for example Schemathesis for OpenAPI, or a GraphQL fuzzing tool) with a run budget and the checks it should enforce (no 5xx, schema conformance, status codes documented).
7. List spec gaps you found: undocumented error responses, missing constraints, missing security on an operation, inconsistent naming. These are findings, not tests.

If the spec has no constraints or security section, say how that limits the tests and ask whether to infer constraints from the implementation.
</task>

<constraints>
- Every expected status code must come from the spec; when the spec is silent, mark the expectation [ASSUMED] and list it under Spec gaps.
- Never point tests at production or use real customer data or credentials.
- Do not invent endpoints or fields that are not in the spec.
{{> output/uncertainty}}
</constraints>

<output_format>
## Coverage matrix
Table: operation | positive | boundaries | invalid input | auth | state | priority.
## Test setup
Fixtures, users and roles, environment variables, run command.
## Tests
Code, grouped by operation.
## Schema conformance and fuzzing
The validator wiring and the fuzzing command with its budget and checks.
## Spec gaps
Bullets: gap, where in the spec, suggested fix.
</output_format>
