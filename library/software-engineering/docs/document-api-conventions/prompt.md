---
schema: 1
id: document-api-conventions
kind: prompt
title: Document API conventions
description: Writes the API fundamentals page covering pagination, errors, rate limits, idempotency, versioning, timestamps and IDs, checked against how the real endpoints behave.
category: docs
version: 1.0.0
status: incubating
stage: [build, ship]
role: [technical-writer, backend-engineer, developer-advocate]
requires: [repo-read, file-write]
inputs: [repo, spec]
output: [docs, report]
risk: edits-files
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [api-reference, pagination, rate-limiting, idempotency, api-versioning]
pairs_with:
  prompts: [document-error-codes, write-api-authentication-guide, write-openapi-spec-from-code]
args:
  - name: api
    description: The API code, middleware and spec to read, or notes on how it behaves.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Page written, Inconsistencies found, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every API has cross-cutting rules that per-endpoint reference pages never explain: how pagination works, what an error body looks like, which rate limits apply and how to back off, how to retry a POST safely, how versions and breaking changes are handled, what format timestamps, amounts and IDs use. Integrators look for a single "API fundamentals" page and build their client around it. The trap is documenting the convention the team intended while some endpoints behave differently: one returns `next_cursor`, another `page`; one error uses `{error: {code}}`, an older one `{message}`. The page must describe reality and surface the exceptions.
</context>

<task>
Write the API conventions page for:

<api>
{{api}}
</api>

1. Read the shared middleware, base controllers, serializers and the spec. Then sample several endpoints of different ages to check each convention is actually followed.
2. Cover each topic that applies, with an example request and response:
   - Base URL, content types, required headers, request ID header.
   - Pagination: style (cursor, offset, page), parameter names, default and maximum page size, how to detect the last page, ordering, consistency under concurrent writes.
   - Errors: the error body shape, the meaning of each field, HTTP status usage, and a link to the error code catalog if one exists.
   - Rate limits: limits per key or user, the headers sent (for example `RateLimit-*`, `Retry-After`), the 429 response, and recommended backoff with jitter.
   - Idempotency and retries: which methods are idempotent, the idempotency key header, its lifetime and conflict behaviour, and which errors are safe to retry.
   - Versioning: how the version is selected, what counts as a breaking change, the deprecation notice period and signals (for example `Deprecation` and `Sunset` headers).
   - Data formats: timestamps and time zones, money (minor units and currency), IDs (opaque strings, prefixes), null versus absent fields, enums that may grow.
   - Filtering, sorting and field expansion, if supported.
3. Mark each convention that has exceptions with the list of endpoints that differ.
4. Verify examples against a running instance or tests where possible.
</task>

<constraints>
- Describe how the API behaves, not the intended standard. Never paper over inconsistencies.
- Never invent rate limits, retention windows or deprecation periods; mark them "to confirm" if not in code or config.
- Advise clients to treat enums as open and IDs as opaque only if the API's contract allows it; otherwise ask.
- Do not change the API.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the page. Then reply with:
## Page written
Path and the topics covered.
## Inconsistencies found
Each convention with the endpoints that break it, as a table: Convention | Expected | Endpoint | Actual.
## Questions for the owners
Facts to confirm (limits, deprecation policy).
</output_format>
