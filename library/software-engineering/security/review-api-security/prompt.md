---
schema: 1
id: review-api-security
kind: prompt
title: Review an API against the OWASP API Top 10
description: Reviews an API design or implementation against the OWASP API Security Top 10, from object-level authorization and mass assignment to rate limits and SSRF, with attack paths and fixes.
category: security
version: 1.0.0
status: experimental
stage: [review, design]
role: [backend-engineer, security-engineer, architect, software-engineer]
requires: [repo-read]
inputs: [spec, file, repo]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [owasp, api-security, bola, mass-assignment, rate-limiting]
pairs_with:
  prompts: [review-auth-flow, threat-model-feature, review-pr-for-security, design-api-contract]
  personas: [security-auditor]
args:
  - name: api_spec_or_code
    description: An OpenAPI or GraphQL schema, route handlers and middleware, or both. Include how handlers load objects and which fields they accept.
    type: text
    required: true
  - name: auth_model
    description: How callers authenticate (sessions, OAuth tokens, API keys, mTLS), the roles and tenants, and who may access which objects.
    type: text
  - name: exposure
    description: Who can reach the API. Public raises the bar on rate limits, enumeration and abuse of business flows.
    type: enum
    enum: [internal, partner, public]
    default: public
output_contract:
  format: markdown
  sections: [Verdict, Coverage, Findings, Endpoint matrix, Fix plan, Not reviewed]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
APIs are breached through logic, not exotic exploits: an id in the URL changed to someone else's, a JSON field like `role` or `account_id` accepted on update, an admin route that only hides its link, a search endpoint with no page limit, a "fetch this URL" feature that reaches the cloud metadata service. Scanners rarely find these because they depend on who owns which object. The OWASP API Security Top 10 (2023 edition) names the recurring classes; a useful review applies each one to the actual endpoints and authorization model, and reports only what a real caller could do.
</context>

<task>
Review this API, exposed to {{exposure}} callers:

<api>
{{api_spec_or_code}}
</api>
{{#auth_model}}

Authentication and authorization model: {{auth_model}}
{{/auth_model}}

1. Inventory the endpoints (or GraphQL queries and mutations): method, path, authentication required, the objects they read or change, and the identifiers they accept from the caller.
2. Check each endpoint against the OWASP API Security Top 10 (2023):
   - API1 Broken object level authorization: every object loaded by a caller-supplied id is checked against the caller's ownership or tenant, in the query or right after loading, including nested and bulk endpoints.
   - API2 Broken authentication: token validation (signature, expiry, audience, issuer), credential endpoints protected against stuffing, password reset and API key handling.
   - API3 Broken object property level authorization: mass assignment (fields like `role`, `is_admin`, `owner_id`, `price`, `status` bound from input) and excessive data exposure (responses returning internal or other users' fields).
   - API4 Unrestricted resource consumption: rate limits per caller, page size limits, payload, upload and query complexity limits (GraphQL depth and cost), timeouts, and costly downstream calls (email, SMS, paid APIs).
   - API5 Broken function level authorization: admin or privileged operations checked on the server by role, not by URL obscurity or the client.
   - API6 Unrestricted access to sensitive business flows: flows that cause harm when automated (sign-up, checkout, coupon redemption, booking), and the anti-automation they need.
   - API7 Server-side request forgery: any endpoint that fetches a caller-supplied URL or host (webhooks, imports, previews) and whether it blocks internal ranges, metadata endpoints and redirects.
   - API8 Security misconfiguration: CORS, verbose errors and stack traces, missing TLS, unnecessary HTTP methods, debug endpoints.
   - API9 Improper inventory management: old versions, undocumented or test endpoints, and environments with weaker controls.
   - API10 Unsafe consumption of APIs: data from third-party APIs trusted without validation, and redirects or callbacks followed blindly.
3. For each finding, write the attack path: the attacker's starting access, the request (method, path and the relevant part of the body), and what they get. Use the code where available; for a spec alone, say what must be confirmed in the implementation.
4. Give the fix in the API's own framework and patterns: where the check goes, the allowlist of bindable fields, the limit values as starting points, and a test that would catch a regression.

If authorization rules are not described and cannot be inferred from the code, ask who may access which objects, because most findings depend on it. Review the rest meanwhile.
</task>

<constraints>
- Report only findings with a concrete attack path from the input; put things you could not verify under "Not reviewed" or as questions.
- Rank by impact and ease: cross-tenant data access and privilege escalation first.
- Keep proof-of-concept requests minimal and against the described API only; never include payloads for third-party systems.
- Do not restate the OWASP descriptions; apply them.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: ready to expose | fix before exposing | do not expose. Then the top risk in one sentence.

## Coverage
Table: OWASP category | status (finding, ok, not applicable, not verifiable from input).

## Findings
Numbered, most severe first. Each: severity - OWASP id - endpoint - attack path - fix - regression test.

## Endpoint matrix
Table: endpoint | auth | object checks | bindable fields | rate limit | notes.

## Fix plan
Ordered list of changes, smallest high-impact fixes first.

## Not reviewed
What the input did not cover and what to send to finish the review.
</output_format>
