---
schema: 1
id: fix-mass-assignment
kind: prompt
title: Fix mass assignment
description: Replaces blind binding of request bodies to models with allowlisted fields per role (strong params, serializers, DTOs) so users cannot set roles, prices, owner ids or flags.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, fullstack-engineer, software-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [mass-assignment, input-validation, privilege-escalation, owasp]
pairs_with:
  prompts: [review-api-security, fix-idor-vulnerabilities, write-authorization-tests]
  personas: [security-auditor]
args:
  - name: target
    description: The endpoints, models or scanner findings to fix.
    type: text
    required: true
  - name: stack
    description: Framework and ORM. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Write endpoints, Changes, Tests, Verification, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Mass assignment happens when a handler copies the whole request body into a model: `User.update(req.body)`, `Model(**request.json)`, `@ModelAttribute` binding an entity, `$model->fill($request->all())`, Rails permit! with no field list, a serializer with `fields = '__all__'`, or a spread of the body into an ORM create call. Any column the client is not meant to touch becomes writable: `role`, `is_admin`, `email_verified`, `account_id` or `owner_id`, `price`, `balance`, `status`, `created_at`. Denylisting fields fails as soon as someone adds a column. The fix is an explicit allowlist of writable fields per operation and per role, with sensitive fields set only by server code (owner from the session, price from the catalogue). Separate input types (DTOs, form objects, serializers) make the allowlist visible and testable. Watch for nested writes (`accepts_nested_attributes_for`, nested serializers, Prisma nested `connect`) which can reassign related records, and for admin and user endpoints sharing one serializer.
</context>

<task>
Fix mass assignment in {{target}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read how the codebase validates input today (DTOs, serializers, strong parameters, schemas) and follow that pattern.
2. Find every create and update handler that passes request data to the ORM without an explicit field list, including nested writes and bulk updates.
3. For each model, list the sensitive fields: anything about privileges, ownership, tenancy, money, verification state, workflow status and timestamps.
4. Fix each handler with an explicit allowlist of writable fields for that operation; use separate allowlists or input types for admin and normal users; set ownership and tenancy from the authenticated context; restrict nested writes to the fields and relations that are intended.
5. Decide how to treat unknown fields consistently with the codebase: reject with a 400 (preferred for APIs) or drop silently, and say which.
6. Add tests per endpoint: sending a sensitive field (`role`, `owner_id`, `price`) does not change it, and normal fields still update.
7. Run the tests and the type check.
</task>

<constraints>
- Never fix with a denylist of fields.
- Do not change which fields legitimate clients can set without listing it; check the frontend for fields it sends.
- Keep admin abilities working through their own allowlist rather than by widening the user one.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Write endpoints
Table: method and route, model, binding before fix, sensitive fields exposed, allowlist applied.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Verification
Commands run and their actual results.
## Not fixed
Anything left, why, and the proposed follow-up.
</output_format>
