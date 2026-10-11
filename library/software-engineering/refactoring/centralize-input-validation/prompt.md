---
schema: 1
id: centralize-input-validation
kind: prompt
title: Centralize scattered input validation
description: Replaces ad hoc input checks scattered through server code with declared schemas at the API boundary (Zod, Pydantic, Bean Validation and similar), keeping error responses the same.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [plan, diff, table]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [input-validation, schema-validation, request-parsing, api-boundary]
pairs_with:
  prompts: [extract-cross-cutting-concerns-to-middleware, introduce-value-objects]
args:
  - name: endpoints
    description: The endpoints or handlers whose validation is scattered, as paths, with the framework and any validation library already in the project.
    type: text
    required: true
  - name: test_command
    description: The command that runs the API tests.
    type: string
output_contract:
  format: markdown
  sections: [Current checks, Schemas, Response compatibility, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Parse, don't validate": input should be checked once, at the boundary, into a typed value, so code behind it never re-checks or trusts raw data. Scattered validation looks like `if (!body.email)` in a handler, a length check in a service, a regex in a repository, and nothing at all on the third endpoint that takes the same field. The fix is a declared schema per request shape in the project's library (Zod or Valibot in TypeScript, Pydantic in FastAPI, serializers or forms in Django, Bean Validation in Spring, FluentValidation or data annotations in .NET, JSON Schema with Ajv), applied by the framework before the handler runs.

The compatibility traps: schemas are often stricter than the old checks (rejecting unknown fields, coercing "1" to 1 or refusing it, trimming whitespace, treating empty string differently from missing), which breaks clients that sent sloppy input that used to work. Error response shape and status (400 or 422, field paths, messages) change unless mapped back to the old format. Validation that needs the database (unique email, existing foreign key) and business rules (refund under order total) are not schema validation and stay in the service. Checks repeated deeper in the code can be removed only when every path into that code goes through a schema; internal callers and jobs may not.
</context>

<task>
Centralize validation for {{endpoints}}.

1. Inventory every check on request input across the handlers, services and repositories: field, rule, where it lives, the error status and body it produces. Mark fields with no check and checks that disagree between endpoints.
2. Propose a schema per request shape in the project's existing library (or the framework's default if none), shared field definitions for repeated fields, and an error mapper that produces today's status codes and body shape. Decide, with the user, unknown-field handling, coercion and trimming so existing clients keep working. List checks that stay in services because they need data or are business rules. Wait for approval.
3. Pin current behaviour with tests: valid requests, each invalid field, missing versus empty values, with exact status and body.
4. Apply schemas endpoint by endpoint, remove the now-redundant checks only on paths fully covered by a schema, and run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}.
5. Report the response compatibility table and the diff.
</task>

<constraints>
- Valid requests that work today must keep working; any request that changes from accepted to rejected, or the reverse, is listed for approval.
- Error status codes and body shape stay the same unless the user approves a change.
- Do not move database-dependent checks or business rules into request schemas.
- Do not remove a deeper check that non-HTTP callers still rely on.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current checks
Table: field, rule, location, error produced, endpoints.
## Schemas
Schemas and shared fields, plus checks that stay in services.
## Response compatibility
Table: input case, response before, response after.
## Diff
The change.
## Check
Tests run and results.
</output_format>
