---
schema: 1
id: secure-supabase-project
kind: prompt
title: Audit a Supabase project for exposure
description: Audits a Supabase project for tables without RLS, service role key exposure, views and functions that bypass policies, storage bucket access and edge function auth, then fixes them.
category: security
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [fullstack-engineer, backend-engineer, security-engineer]
stack: [supabase]
requires: [repo-read, file-write, shell]
inputs: [repo, schema, config]
output: [diff, report, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [row-level-security, service-role-key, security-definer, storage-policies, edge-functions]
pairs_with:
  prompts: [write-row-level-security-policies, build-supabase-backend, find-secrets-exposed-to-client]
  personas: [security-auditor]
args:
  - name: project
    description: What the app does, its users and roles, and whether the repo holds the migrations (`supabase/migrations`) or only client code.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Exposure map, Findings, Migration, Tests, Verification, Dashboard settings]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Every table, view and function in a schema Supabase exposes through its API (by default `public`) can be called by anyone holding the anon key, which ships in every client and is public by design. So the database's own controls are the authorization layer. The recurring holes: tables with RLS disabled, or enabled with a policy like `using (true)`; policies that trust `auth.jwt() -> 'user_metadata'`, which users can edit themselves; views, which run with the owner's rights and ignore RLS unless created with `security_invoker = true`; `security definer` functions in exposed schemas that anon can call through `rpc()` because `execute` is granted to `public` by default; the `service_role` key, which bypasses RLS, ending up in client bundles, mobile apps or public env variables; public storage buckets holding private files, or `storage.objects` policies not scoped to the owner's folder; and edge functions deployed with JWT verification off and no other check. Supabase's built-in security advisor catches some of these but not the logic of each policy.
</context>

<task>
Audit and fix this Supabase project: {{project}}

1. Read the migrations or a schema dump (`supabase db dump --schema-only` against the local stack, not production) and list every table, view, function and bucket in exposed schemas.
2. For each table: RLS enabled, and each policy's `using` and `with check` reviewed per operation against the intended access. Flag `true` policies, policies on `user_metadata`, missing `with check` on insert or update, and missing policies that make a feature fail silently.
3. Views: recreate with `security_invoker = true` or move them out of the exposed schema.
4. Functions: list `security definer` functions in exposed schemas; set `search_path`, revoke `execute` from `anon` and `public` where not needed, and add explicit checks on `auth.uid()` inside.
5. Keys: search client code, env files, build config and mobile projects for the service role key or database password (report by file, never print values). Confirm it is used only in server code.
6. Storage: list buckets, flag public ones that hold user files, and write `storage.objects` policies scoped to `auth.uid()` folders with size and type limits set on the bucket.
7. Edge functions: check each for JWT verification or its own auth, input validation, and use of the service role key only after an authorization check.
8. Write a migration with the fixes and SQL or pgTAP tests that run as `anon`, as user A and as user B, proving cross-user access is denied. Run them against the local Supabase stack.
</task>

<constraints>
- Work against the local stack or a branch database; never run changes against production.
- Never print keys or passwords; refer to them by name and location.
- If the service role key was exposed, say it must be rotated and that rotation will break servers using it until they are updated.
- Keep legitimate queries working; list any client query the new policies will change.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Exposure map
Table: object, type, exposed to anon (yes or no), RLS or check, verdict.
## Findings
Ranked list: severity, object, attack, fix.
## Migration
The SQL migration in a code block.
## Tests
One line per test and the role it runs as.
## Verification
Commands run and actual results.
## Dashboard settings
Settings to change outside the repo (auth, API exposed schemas, key rotation), as a checklist.
</output_format>
