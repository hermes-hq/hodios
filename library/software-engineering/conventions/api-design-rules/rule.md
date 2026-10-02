---
schema: 1
id: api-design-rules
kind: rule
title: HTTP API design rules
description: Rules for HTTP APIs covering resource naming, status codes, problem+json errors, cursor pagination, idempotency keys and versioning. Load when designing or changing HTTP endpoints.
category: conventions
version: 1.0.0
status: experimental
stage: [design, build]
role: [backend-engineer, fullstack-engineer, architect, software-engineer]
requires: [none]
risk: read-only
invocation: model
tags: [rest, problem-details, pagination, idempotency]
pairs_with:
  rules: [sql-style-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you design or change an HTTP API in this project, apply these rules. Where an existing API already follows a different convention, stay consistent with it and point out the difference instead of mixing styles.

**Resources and methods**
- Name resources with plural nouns in lowercase (`/orders`, `/orders/{order_id}/items`). Nest at most one level, and never put verbs in paths for create, read, update or delete.
- Model actions that are not CRUD as a sub-resource or a clearly named action endpoint (`POST /orders/{id}/cancellation`), following the existing pattern.
- `GET` is safe and has no body. `PUT` replaces and is idempotent. `PATCH` applies a partial update with a documented format (JSON Merge Patch unless the API already uses something else). `DELETE` is idempotent.
- Use one field casing across the whole API, matching what exists.

**Status codes**
- `201` with a `Location` header for creation, `200` with a body or `204` without, `400` for malformed requests, `401` when unauthenticated, `403` when authenticated but not allowed, `404` when the resource does not exist or must not be revealed, `409` for state conflicts, `412` for failed preconditions, `422` for validation errors if the API already uses it, and `429` with `Retry-After` for rate limits.
- Never return `200` with an error body, or a `5xx` for a client mistake.

**Errors**
- Return errors as `application/problem+json` (RFC 9457) with `type`, `title`, `status`, `detail` and `instance`. Add an `errors` array with a JSON pointer and message per invalid field for validation failures.
- Make `type` a stable identifier clients can branch on. Never expose stack traces, SQL or internal hostnames.

**Collections**
- Paginate every collection that can grow. Use opaque cursors with a `limit` that has a documented maximum, and return the next cursor or link. Use offset pagination only for small, stable sets.
- Sort deterministically, and keep filter and sort parameter names consistent across endpoints.

**Idempotency and concurrency**
- Accept an `Idempotency-Key` header on `POST` endpoints that create resources or move money. Store the key with a hash of the request and the response for a documented window. Replay the stored response for a repeated key, and reject the same key with a different body.
- Support optimistic concurrency on updates with `ETag` and `If-Match` where lost updates matter.

**Data formats**
- Timestamps are RFC 3339 strings in UTC. Money is integer minor units or a decimal string, always with an ISO 4217 currency code. Identifiers are strings.
- Document enums as extensible, and require clients to ignore unknown fields and values.

**Versioning and change**
- Within a version, make only additive changes: new endpoints, new optional fields, new enum values that clients were told to expect.
- Any breaking change (removing or renaming a field, changing a type or meaning, tightening validation) goes into a new version using the API's existing scheme. Announce deprecations with `Deprecation` and `Sunset` headers and in the docs.

**Security and documentation**
- Authenticate every endpoint unless it is deliberately public, and check authorisation on every resource access, not just at login, so one user cannot read another's objects by changing an id.
- Never put secrets or personal data in URLs.
- Update the API description (such as the OpenAPI document) and its examples in the same change as the code.
