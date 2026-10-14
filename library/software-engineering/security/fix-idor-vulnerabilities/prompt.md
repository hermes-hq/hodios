---
schema: 1
id: fix-idor-vulnerabilities
kind: prompt
title: Fix IDOR and missing object-level authorization
description: Adds object-level authorization to every handler that loads a record by id, scoping queries to the caller's user or tenant and adding a cross-account test per endpoint.
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
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [idor, broken-access-control, authorization, owasp]
pairs_with:
  prompts: [review-api-security, audit-tenant-isolation, write-authorization-tests, implement-role-based-access]
  personas: [security-auditor]
args:
  - name: target
    description: The API, routes, resources or report to fix.
    type: text
    required: true
  - name: ownership_rules
    description: Who may read and change each resource (owner, team, tenant, admin, shared links), if known.
    type: text
  - name: stack
    description: Language, framework and ORM. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Endpoint inventory, Changes, Tests, Verification, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Insecure direct object reference (IDOR, or broken object-level authorization) is the most common serious API flaw: the handler checks that the caller is signed in, then loads `Invoice.find(params[:id])` without checking the invoice belongs to them. Random ids such as UUIDs only make guessing harder; they leak in URLs, logs and shared links, so they are not access control. The bug also hides in nested routes (`/projects/1/tasks/99` where task 99 belongs to another project), in bulk endpoints that accept arrays of ids, in foreign keys inside request bodies (attaching someone else's file id to your message), in export and download links, in GraphQL resolvers and node lookups, and in background jobs triggered with an id. The durable fix scopes the query itself to the caller (`current_user.invoices.find(id)`, a tenant-scoped repository, a database row-level policy) so a missing check returns not found instead of data. Return 404 rather than 403 where existence itself is sensitive.
</context>

<task>
Fix object-level authorization in {{target}}.
{{#ownership_rules}}Ownership rules: {{ownership_rules}}{{/ownership_rules}}
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the auth middleware, how the current user and tenant are resolved, and any existing policy or scoping helpers. Reuse the existing pattern.
2. Inventory every handler and resolver that takes an object id from the path, query, body or GraphQL arguments, including nested resources, bulk endpoints, file downloads, exports and ids inside bodies that link records together.
3. For each, record how the record is loaded and whether the caller's right to it is checked. Where the ownership rule is unclear, write it down as an open question and apply the strictest reasonable rule.
4. Fix each handler by scoping the lookup to the caller (owner, membership or tenant) or calling the existing policy check before any read or write; check parent-child consistency on nested routes and check every id in bulk requests and request bodies.
5. Add one test per endpoint: user A cannot read, change or delete user B's object (expect 404 or 403 to match the app's convention), and A's own object still works. Include cross-tenant cases if the app is multi-tenant.
6. Run the full test suite and the linter.
</task>

<constraints>
- Never treat unguessable ids, hidden UI buttons or client-side checks as authorization.
- Do not loosen any existing check while refactoring.
- Keep response shapes the same except for the new denials.
- If an endpoint's intended access rule is unknown, do not guess silently; flag it.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Endpoint inventory
Table: method and route (or resolver), object loaded, check before fix, fix applied, test added.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test.
## Verification
Commands run and their actual results.
## Open questions
Endpoints whose intended access rule needs a human decision, with the rule applied for now.
</output_format>
