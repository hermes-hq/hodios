---
schema: 1
id: write-openapi-spec-from-code
kind: prompt
title: Write an OpenAPI spec from code
description: Writes an OpenAPI 3 spec for an existing REST API from its routes, handlers and models, with schemas, errors, auth and examples checked against what the code really does.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, software-engineer, technical-writer]
stack: [openapi]
requires: [repo-read, file-write]
inputs: [repo, file]
output: [docs, config]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rest-api, api-reference, api-spec]
pairs_with:
  prompts: [improve-openapi-descriptions, document-api-conventions]
args:
  - name: target
    description: The service or router to describe, and the base path or server URL if known.
    type: text
    required: true
  - name: version
    description: The OpenAPI version to target.
    type: enum
    enum: ["3.0", "3.1"]
    default: "3.1"
output_contract:
  format: markdown
  sections: [Spec written, Coverage, Gaps and guesses, API inconsistencies]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A hand-written spec that disagrees with the API is worse than none: client generators, contract tests and partners all trust it. The facts live in several places: the router (paths, methods), middleware (auth, rate limits, body size), validators and models (request schemas, required fields, formats, enums), serializers (the real response shape, which often differs from the database model), and error handlers (the actual error body and status codes). Common mistakes are marking every field optional, missing `nullable` versus absent, forgetting error responses, documenting the ORM model instead of the serializer, and inventing examples. If the framework can generate a spec (FastAPI, NestJS Swagger, springdoc, drf-spectacular), extending the generator beats writing a parallel file that will drift.
</context>

<task>
Write an OpenAPI {{version}} spec for {{target}}.

1. Check whether the framework already emits a spec or has a plugin for it. If so, say so and propose using it, then still produce the spec only if the user wants a standalone file.
2. List every route: method, path, path parameters, the handler, and the middleware applied (auth, rate limiting, content types). Skip internal or admin routes unless they are in scope, and list what you skipped.
3. For each operation, derive from the code: `operationId` (from the handler name), query, header and path parameters with types and constraints, request body schema from the validator, success responses from the serializer, and every error status the handler or shared error middleware can return with its body shape.
4. Put shared shapes under `components/schemas` and reuse them with `$ref`. Mark `required` fields and nullability exactly as the validator and serializer enforce them. Use `enum`, `format`, `minimum`, `maxLength` only where the code enforces them.
5. Define `securitySchemes` from the auth middleware and apply `security` per operation, including public endpoints as `security: []`.
6. Add examples taken from tests, fixtures or real responses. If you can run the service or its tests, compare a few real responses against the spec and fix mismatches.
7. Validate the file with a linter if available (for example Spectral or Redocly CLI) and report the result.
</task>

<constraints>
- Describe what the code does, not what would be nice. Never invent endpoints, fields, status codes or limits.
- Where the code is ambiguous (dynamic routes, untyped responses), add the best-supported shape with `x-todo` or a description note and list it under "Gaps and guesses".
- Do not change the API code. Report inconsistencies (for example two error formats) instead of hiding them in the spec.
- Keep descriptions short in this pass; the goal is a correct contract.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the spec file (for example `openapi.yaml`). Then reply with:
## Spec written
Path, OpenAPI version, number of operations and schemas, lint result.
## Coverage
Routes included and routes skipped, with why.
## Gaps and guesses
Every place where the spec is inferred rather than read from code.
## API inconsistencies
Differences in naming, error formats, pagination or status codes across endpoints. Write "None" if there are none.
</output_format>
