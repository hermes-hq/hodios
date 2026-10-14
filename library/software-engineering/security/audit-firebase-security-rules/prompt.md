---
schema: 1
id: audit-firebase-security-rules
kind: prompt
title: Audit Firebase security rules
description: Audits existing Firestore, Realtime Database and Cloud Storage security rules for open reads and writes, missing ownership checks and client-trusted fields, with emulator-tested fixes.
category: security
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [mobile-engineer, fullstack-engineer, security-engineer]
stack: [firebase]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, report, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [firestore, realtime-database, cloud-storage, authorization, emulator-tests]
pairs_with:
  prompts: [write-firestore-security-rules, review-mobile-app-security, audit-tenant-isolation]
  personas: [security-auditor]
args:
  - name: project
    description: What the app does, which Firebase products it uses, and who should read and write what (owners, team members, admins, public).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Data and rules map, Findings, Fixed rules, Tests, Verification, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
In Firebase the client talks to the database directly, so the security rules are the whole backend authorization layer, and anyone can extract the project config from the app and query it with their own script. The usual holes: test-mode rules (`allow read, write: if true` or a time-based rule that was extended), `if request.auth != null` used as if it meant "the owner" (any signed-up user, including anonymous auth, passes), writes that accept any field so a user can set `role: "admin"` or `credits: 9999`, ownership taken from `request.resource.data.ownerId` on create without comparing it to `request.auth.uid`, `list` queries allowed where only `get` should be, Realtime Database rules where a `.read` higher in the tree cascades down and cannot be revoked by children, and Storage buckets open for any authenticated write with no size or content type limit. Rules are not filters: a query must be constrained so it can only return allowed documents. Admin SDK code on servers bypasses rules entirely, so those paths need their own checks.
</context>

<task>
Audit the rules for: {{project}}

1. Read `firestore.rules`, `database.rules.json`, `storage.rules` and `firebase.json`, and the client code that reads and writes data, to build a map of collections or paths, who accesses them and how.
2. For each match block or path, decide whether reads (`get` and `list` separately) and writes (`create`, `update`, `delete` separately) match the intended access. Flag catch-all matches (`/{document=**}`), `if true`, auth-only checks, cascading RTDB grants, and expired or soon-to-expire time-based rules.
3. Check writes for field control: allowed keys (`request.resource.data.keys().hasOnly(...)` or `diff().affectedKeys()`), types and sizes, immutable fields (owner, created time, role), and server-owned fields such as balances or roles that clients must never set.
4. Check Storage paths for owner scoping, size limits and content type checks.
5. Note any Cloud Functions or server code using the Admin SDK on user input, since rules do not protect those paths, and whether App Check is enabled.
6. Write fixed rules using helper functions (`isSignedIn`, `isOwner`, `hasRole`) and the smallest change that keeps legitimate client queries working.
7. Write emulator tests with `@firebase/rules-unit-testing` covering an allowed and a denied case per rule, including another user's document, privilege-field writes and unauthenticated access. Run them with the emulator.
</task>

<constraints>
- Do not deploy rules; give the deploy command for the user to run after review.
- Do not test against the live project or other people's projects.
- Do not suggest hiding the config as protection.
- Do not invent the app's access model; ask when the intended access for a path is unclear.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data and rules map
Table: path, intended access, current rule, verdict.
## Findings
Ranked list: severity, path, what an attacker can do, fix.
## Fixed rules
The full revised rules files in code blocks.
## Tests
One line per test case.
## Verification
Emulator commands run and actual results.
## Rollout
Order of deployment and which client queries to check before deploying.
</output_format>
