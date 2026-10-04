---
schema: 1
id: implement-role-based-access
kind: prompt
title: Implement role-based access control
description: Implements role-based access control with roles and permissions, checks at the API boundary and on each object, admin tooling, per-permission tests and a migration for existing users.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, spec, text]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [rbac, authorization, permissions, least-privilege, multi-tenancy]
pairs_with:
  personas: [backend-engineer]
  prompts: [review-auth-flow, review-api-security, implement-audit-log]
args:
  - name: roles
    description: The roles and what each may do, for example "owner (everything, incl. billing), admin (manage users and projects), member (edit own projects), viewer (read only)".
    type: text
    required: true
  - name: resources
    description: The resources and actions to protect, for example "projects (create, read, update, delete, share), invoices (read, pay), users (invite, remove, change role)".
    type: text
    required: true
  - name: stack
    description: Language, framework and database, plus how users and tenants are modelled today, for example "FastAPI, PostgreSQL, users belong to one organisation, is_admin flag on users".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Permission matrix, Design, Changes, Migration, Tests]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Access control usually breaks at the edges, not in the role table: checks scattered through handlers as `if user.role == "admin"`, so adding a role means editing fifty files; endpoints that check the role but not whether the object belongs to the user's organisation, so changing an id in the URL reads someone else's data; list endpoints that filter in the UI but return everything from the API; admins able to grant themselves a higher role; the last owner able to demote themselves and lock everyone out; permissions cached forever after a role is revoked; and a migration that leaves existing users with no role, or with more access than they had. Good role-based access denies by default, checks named permissions in one place, enforces object ownership on every request and is proved by a test for each cell of the permission matrix.
</context>

<task>
Implement role-based access control for:

<roles>
{{roles}}
</roles>

<resources>
{{resources}}
</resources>

Stack: {{stack}}

1. Inspect the code: how users authenticate and how the current user reaches handlers, how tenants or organisations are modelled, every existing authorisation check (role flags, ad-hoc conditions, middleware), every endpoint and background entry point touching the listed resources, and any existing authorisation library. Authentication itself is out of scope; do not change login, sessions or tokens. If the roles conflict, leave an action unassigned, or leave open whether a role applies globally or per organisation or project, ask and stop.
2. Write the permission matrix: permissions named `resource:action`, every role mapped to a set of permissions, and any conditions such as "own projects only". Deny everything that is not explicitly granted.
3. Model it: roles, permissions and role assignments stored so they can change without a deploy (or defined in code if the roles are fixed, said explicitly), with assignments scoped to the tenant or organisation if the app is multi-tenant.
4. Enforce at the boundary: one authorisation function or policy layer (for example `authorize(user, "project:update", project)`) called from middleware, guards or policies on every endpoint and job that touches a protected resource. Code checks permissions, never role names. Every request for a single object also checks that the object belongs to the user's tenant and meets the role's conditions, and list endpoints filter in the query, not after loading. Decide and document the response for denied access: 403, or 404 where revealing that the object exists would leak information.
5. Admin tooling: endpoints or screens to view roles, assign and revoke them, with guards so that no one can grant a role with more permissions than their own, and the last owner of a tenant cannot be removed or demoted. Record role changes in the audit log if the app has one.
6. Caching: if permissions are cached, invalidate the cache on assignment changes, or keep the time-to-live short and documented.
7. Migrate existing users: map current flags or implied access to the new roles in an idempotent migration or backfill that never grants more than users had, set a default role for new users and invitations, and keep old checks working behind a flag until the new layer is verified, if the change is risky to switch in one step.
8. Write tests generated from the permission matrix (a table-driven test over every role and permission, asserting allowed or denied), plus: an unauthenticated request; cross-tenant access to an object by id; list endpoints returning only permitted objects; privilege escalation through role assignment; removing the last owner; and the migration producing the expected roles for existing users. Run them and report the real result.
</task>

<constraints>
- Deny by default; every new endpoint must call the authorisation layer, and say how that is enforced (a lint, a test that lists routes, or a base class).
- Hiding buttons in the UI is not access control; the server enforces every rule.
- The migration must never widen anyone's access.
- Ask before adding an authorisation library or a policy engine.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Permission matrix
Table: permission down the side, roles across the top, allowed, denied or a condition in each cell.
## Design
Data model, where checks run, object-level and list filtering, and the denied-access response, in bullets.
## Changes
One line per file.
## Migration
How existing users map to roles, the default for new users, and the rollout steps.
## Tests
One line per test group and the real result of the run.
</output_format>
