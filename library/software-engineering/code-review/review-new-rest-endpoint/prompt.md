---
schema: 1
id: review-new-rest-endpoint
kind: prompt
title: Review a new REST endpoint implementation
description: Reviews the code of a new HTTP endpoint for status codes, input validation, authorisation, pagination, idempotency, error shape and consistency with sibling endpoints.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, fullstack-engineer]
requires: [none]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rest-api, http, validation, endpoints, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-api-design, build-rest-endpoint, review-api-breaking-changes]
args:
  - name: diff
    description: The route, handler, request and response models, and tests, with file paths. Include one existing sibling endpoint if it is not in the diff.
    type: text
    required: true
  - name: context
    description: API conventions the team follows (error format, pagination style, naming, versioning), framework, and who calls the endpoint.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Endpoint summary, Findings, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A new endpoint is reviewed twice: once for whether it works, and once for whether it behaves like every other endpoint clients already use. Defects reviewers catch: authentication applied but object-level authorisation missing (any logged-in user can read `/invoices/123` of another account); validation that accepts unknown fields or trusts IDs in the body over the path; 200 returned for creates (should be 201 with a location or the resource), 500 for validation errors, 404 versus 403 chosen inconsistently; list endpoints with no limit, an unbounded `page_size`, or offset pagination over a changing table; POST without an idempotency mechanism where clients retry (payments, orders); PUT that behaves like PATCH or the reverse; error bodies in a different shape from the rest of the API; timestamps without zones; internal IDs, stack traces or ORM fields leaked through a response that serialises the whole model; and N+1 queries in the serializer. Consistency matters as much as correctness, because clients write generic code against the conventions.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Summarise the endpoint: method, path, auth, request schema, response schema, status codes, side effects. If you can read the repository, find two sibling endpoints and note their conventions.
2. Check access: authentication, object-level and tenant-level authorisation on every ID the request references, role checks, rate limiting where siblings have it.
3. Check input: validation of types, ranges, lengths and formats; unknown fields rejected or ignored consistently; path versus body ID conflicts; mass assignment of fields the client should not set (role, owner, price).
4. Check semantics: correct method and status codes for success and each failure, PUT versus PATCH behaviour, idempotency for retried POSTs, behaviour on concurrent updates (ETag, version).
5. Check output: response built from an explicit schema rather than the full model, no sensitive or internal fields, consistent naming, date and money formats, error body shape matching the rest of the API.
6. Check collections: pagination present and bounded, stable ordering, filters validated against an allow-list, query count per item.
7. Check tests: success, validation failure, unauthorised, forbidden on another account's object, not found, and pagination edges.
8. Report each inconsistency with a sibling endpoint, citing the sibling.
</task>

<constraints>
- Missing object-level authorisation is critical and listed first.
- Cite the sibling endpoint or the stated convention for every consistency finding; do not impose personal API style.
- API design questions beyond this endpoint (resource modelling, versioning strategy) go in one line pointing to an API design review.
- At most 10 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Endpoint summary
Method and path, auth, request, response, status codes, side effects.
## Findings
Numbered: severity, `path:line`, problem, example request and wrong response, fix.
## Tests to add
Bullets: the request and expected status for each missing case.
</output_format>
