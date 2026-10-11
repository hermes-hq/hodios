---
schema: 1
id: improve-openapi-descriptions
kind: prompt
title: Improve OpenAPI descriptions
description: Enriches a thin OpenAPI spec with operation summaries, parameter and field descriptions, examples and missing error responses so the generated reference is actually useful.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [technical-writer, backend-engineer, developer-advocate]
stack: [openapi]
requires: [repo-read, file-write]
inputs: [schema, repo]
output: [docs, diff]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [api-reference, rest-api, api-spec]
pairs_with:
  prompts: [write-openapi-spec-from-code, document-api-conventions]
  personas: [technical-writer]
args:
  - name: spec
    description: The OpenAPI file or the part of it to improve, plus access to the API code if available.
    type: text
    required: true
  - name: generated_from_code
    description: Whether the spec is generated from code annotations; if so, edits go into the annotations, not the YAML.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Changes, Missing from the API, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most specs are structurally valid and useless to read: `summary: Get order`, a field called `status` with no list of states, `limit` with no maximum, only a 200 response. Rendered docs (Redoc, Swagger UI, Scalar, Stoplight) show exactly what is in the spec, so the gaps become the docs. What readers need is the meaning of each field, units and formats, the allowed values and what each means, what happens on the edges (empty lists, missing optional fields), the errors they will actually get, and an example that works. When the spec is generated from code annotations, edits to the YAML are lost on the next build, so the change belongs in the source annotations.
</context>

<task>
Improve the descriptions in this spec:

<spec>
{{spec}}
</spec>

Generated from code: {{generated_from_code}}.

1. Lint the spec first if a linter is available (Spectral or Redocly CLI) and note missing descriptions, operationIds, examples and error responses.
2. For each operation: write a `summary` (short verb phrase, used as the nav label) and a `description` with what it does, notable side effects, idempotency, and permissions needed. Keep `operationId` stable; never rename an existing one.
3. For each parameter and schema property: meaning, units, format, default, constraints, and for enums what each value means. Say what absent versus `null` means where both are possible.
4. Add realistic `example` or `examples` values taken from tests, fixtures or the code. Keep examples consistent across related schemas (same ids, same currency).
5. Add error responses the code really returns (400, 401, 403, 404, 409, 422, 429, 5xx as applicable), reusing a shared error schema via `$ref`.
6. Add `tags` with descriptions to group operations, and a top-level `info.description` only if missing.
7. If generated from code, make the same improvements in the annotations or decorators, then regenerate and diff.
8. Re-lint and report the result.
</task>

<constraints>
- Never change paths, methods, types, required lists or operationIds; this is a documentation pass. Report contract problems instead.
- Every description must be backed by the code, tests or existing docs. If unknown, leave a `TODO` note and ask under "Questions for the owners".
- Use Markdown sparingly in descriptions (CommonMark only); no HTML.
- No marketing tone; one or two sentences per field is enough.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
Apply the edits. Then reply with:
## Changes
Counts of operations, parameters and properties described, examples and error responses added, and lint before and after.
## Missing from the API
Contract problems found (undocumented errors the code returns, fields the code ignores), each with location.
## Questions for the owners
Facts you could not establish.
</output_format>
