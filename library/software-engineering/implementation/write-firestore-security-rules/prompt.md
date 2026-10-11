---
schema: 1
id: write-firestore-security-rules
kind: prompt
title: Write Firestore and Storage security rules
description: Writes Firebase Firestore and Cloud Storage security rules from the data model, with per-role access, field validation and emulator tests that prove both allowed and denied cases.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer, mobile-engineer, backend-engineer]
stack: [firebase]
requires: [repo-read, file-write, shell]
inputs: [spec, repo, schema]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [firestore, access-control, emulator, custom-claims, validation]
args:
  - name: data_model
    description: Collections and documents, their fields, and who may read or write them.
    type: text
    required: true
  - name: roles
    description: How roles are known, for example "admin custom claim", "members map on the team document". Leave empty to follow the code.
    type: text
output_contract:
  format: markdown
  sections: [Access matrix, Rules, Query changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Firebase clients talk to the database directly, so security rules are the whole backend authorization layer. What people miss: test-mode rules (`allow read, write: if true` or a date cutoff) shipped to production; rules are not filters, so a query the rules cannot prove safe fails entirely, and client queries must include the same constraint the rule checks (for example `where('ownerId', '==', uid)`); `allow write` covers create, update and delete together, so a user who may edit a field may also delete the document; without validating `request.resource.data`, a user can set `role: 'admin'` on their own profile; and `get()`/`exists()` lookups cost a read each and are capped per request. Storage rules are a separate file with the same pitfalls.
</context>

<task>
Write security rules for this data model:

{{data_model}}

{{#roles}}
Roles: {{roles}}
{{/roles}}

1. Read `firestore.rules`, `storage.rules`, `firebase.json`, and the client code that reads and writes each collection. List every query the app runs, because each must pass the rules.
2. Build an access matrix: for each collection and role, which of get, list, create, update and delete is allowed and under what condition.
3. Start from default deny. Write `match` blocks per collection with granular methods (`get`, `list`, `create`, `update`, `delete`) instead of broad `read`/`write`.
4. Add helper functions: `isSignedIn()`, `isOwner(uid)`, `hasRole(role)` from `request.auth.token` custom claims or a membership document. Prefer custom claims for roles checked on every request, to avoid extra document reads.
5. Validate writes: `request.resource.data.keys().hasOnly([...])` and `hasAll` for required fields, types (`is string`, `is timestamp`), lengths and ranges, server timestamps equal to `request.time`, and immutable fields (`ownerId`, `createdAt`) unchanged on update using `diff().affectedKeys()`.
6. Write Storage rules for each path: owner-only paths keyed by uid, content type and size limits on upload.
7. Where a client query would be rejected because it does not carry the rule's constraint, change the query and list it under Query changes.
8. Write tests with `@firebase/rules-unit-testing` against the emulator: for each matrix cell, one allowed and one denied case, including another user's document, a forbidden field like `role`, and an unauthenticated request. Run them with `firebase emulators:exec`.
</task>

<constraints>
- Never leave `if true` or a time-based open rule on any path holding user data.
- Do not deploy rules (`firebase deploy --only firestore:rules`) without the user's confirmation; deploying replaces the live rules immediately.
- Do not set custom claims from client code; that belongs in trusted server code with the Admin SDK.
- Rules do not hide individual fields from readers. If some fields must be private, move them to a separate document or subcollection and say so.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Access matrix
Table: Path | Role | get | list | create | update | delete | Condition.

## Rules
The full `firestore.rules` and `storage.rules` in code blocks, or the diffs if small.

## Query changes
Client queries changed to satisfy the rules, or "None".

## Tests
One line per test case.

## Verification
Commands run and their real results; say that nothing was deployed.
</output_format>
