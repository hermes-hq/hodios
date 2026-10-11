---
schema: 1
id: fix-fastapi-validation-errors
kind: prompt
title: Fix unexpected 422 errors in FastAPI
description: Fixes unexpected 422 Unprocessable Entity responses in FastAPI by reading the error detail's loc and type, then fixing body, query, form, file or Pydantic schema mismatches on the right side.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: [fastapi]
requires: [repo-read, file-write, shell]
inputs: [logs, file, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [pydantic, request-validation, http-422, api-errors, request-body]
pairs_with:
  prompts: [fix-serialization-mismatch, debug-network-request, migrate-pydantic-v1-to-v2]
  personas: [python-engineer]
args:
  - name: response
    description: The 422 response body (the "detail" list) and the request as sent (method, URL, headers including Content-Type, and body), from the browser, client or logs.
    type: text
    required: true
  - name: code
    description: The endpoint signature and the Pydantic models it uses, or their paths.
    type: text
output_contract:
  format: markdown
  sections: [What failed validation, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a FastAPI engineer. A 422 comes from FastAPI's request validation before the endpoint runs, and its body says exactly what failed: each item in `detail` has `loc` (where: `["body", "items", 0, "price"]`, `["query", "page"]`, `["path", "id"]`), `type` (`missing`, `int_parsing`, `string_type`, `extra_forbidden`, `json_invalid`, `model_attributes_type`) and `msg`, plus `input` in Pydantic v2. Reading it first beats guessing. How FastAPI decides where a parameter comes from causes most surprises:
- A parameter declared as a Pydantic model is read from the body; a single plain parameter (`name: str`) not in the path is a query parameter, even on POST. To read one scalar from a JSON body, use `Body(embed=True)` or a model.
- With one model parameter, the body is the model itself; with two model parameters, or `Body(embed=True)`, the body must be an object keyed by parameter names. A client sending the wrong shape gets `loc: ["body", "<name>"]` missing.
- `Form(...)` and `File(...)` need `multipart/form-data` or `application/x-www-form-urlencoded` (and the `python-multipart` package); sending JSON to a form endpoint, or form data to a JSON endpoint, fails. The client must not set `Content-Type: multipart/form-data` by hand without the boundary; let the browser or library set it.
- A missing or wrong `Content-Type: application/json` header makes the body unreadable as JSON.
- Pydantic v2 is stricter than v1 in some places (no coercion of numbers to strings, `None` not accepted unless the field is `Optional` or has a default) and different aliases (`alias`, `validation_alias`, `populate_by_name`) change which key names are accepted. `extra="forbid"` rejects unknown fields.
- Query lists need `Query()` (`tags: list[str] = Query([])`) and repeated keys (`?tags=a&tags=b`).
- Dates and enums must match the declared format and values exactly.
Decide whether the client or the server is wrong based on the API contract (OpenAPI docs at `/docs`), not on which is easier to change.
</context>

<task>
Fix this 422 error.

Response and request:
{{response}}
{{#code}}

Code:
{{code}}
{{/code}}

1. List each validation error: its location, type and the input received.
2. Compare with the endpoint signature and models: where FastAPI expects each parameter (path, query, body, form, file), the expected body shape, aliases, required fields, types and model config.
3. Name the mismatch and say which side is wrong according to the intended contract and the OpenAPI schema. If the request as sent is not in the input, ask for it (network tab or client logging) and stop.
4. Fix the right side: the client's body shape, Content-Type or encoding, or the endpoint's parameter declaration or model (`Body(embed=True)`, `Form`, `Query` for lists, `Optional` with defaults, aliases). If the server changes, check other clients of the endpoint.
5. Verify with a test using `TestClient` that sends the corrected request and asserts 2xx, plus a test that the old invalid input still returns 422 if it should.
</task>

<constraints>
- Do not catch `RequestValidationError` to return 200 or turn off validation; fix the mismatch.
- Do not loosen field types to `Any` or `dict` to make errors go away.
- Do not change a public API contract silently; call out breaking changes for other clients.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What failed validation
Each error's loc, type and input.
## Cause
The mismatch and which side is wrong.
## Fix
The client or server diff.
## Verification
The tests and their results.
</output_format>
