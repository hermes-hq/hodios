---
schema: 1
id: write-row-level-security-policies
kind: prompt
title: Write row-level security policies
description: Writes and tests Postgres row-level security policies for tenant or user isolation, covering roles, USING and WITH CHECK clauses, bypass risks, indexes for policy filters and a test matrix.
category: data
version: 1.0.0
status: incubating
stage: [build, review]
role: [backend-engineer, dba, security-engineer]
stack: [postgres]
requires: [none]
inputs: [schema, text]
output: [code, tests]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [row-level-security, tenant-isolation, authorization, access-policies, least-privilege, supabase-auth]
pairs_with:
  prompts: [design-multi-tenancy, design-database-schema]
  personas: [database-administrator]
args:
  - name: schema
    description: DDL for the tables to protect, including tenant or owner columns and relationships.
    type: text
    required: true
  - name: access_rules
    description: Who may read and write which rows, in plain words, and how the app identifies the user and tenant (session setting, JWT claims, database role per user).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Access model, Policies, Bypass risks, Performance, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Row-level security moves authorisation into Postgres so a forgotten `WHERE tenant_id = ...` in application code no longer leaks data. It fails in ways that are easy to miss. Table owners and superusers bypass policies unless the table uses `FORCE ROW LEVEL SECURITY`, and roles with `BYPASSRLS` always bypass, so the app must connect as a non-owner role. Policies are permissive by default and OR together, so one broad policy opens everything; restrictive policies AND together. `USING` filters which existing rows are visible or affected; `WITH CHECK` limits what new or updated rows may contain, so without it a user can move a row into another tenant. `SECURITY DEFINER` functions and views (unless `security_invoker` is set) run with their owner's rights and can bypass policies. The tenant identity usually comes from `current_setting('app.tenant_id')` set per transaction or from JWT claims (as in Supabase's `auth.uid()` and `auth.jwt()`); with a transaction-mode pooler it must be set with `SET LOCAL` inside the transaction. Policy subqueries run per row, so policy columns need indexes and helper functions should be `STABLE`.
</context>

<task>
<schema>
{{schema}}
</schema>
<access_rules>
{{access_rules}}
</access_rules>

1. Restate the access model as a table of role, operation (SELECT, INSERT, UPDATE, DELETE) and which rows, and point out gaps or contradictions in the rules.
2. Write the SQL: the application role and its grants, `ENABLE` and `FORCE ROW LEVEL SECURITY` on each table, one policy per role and operation with explicit `USING` and `WITH CHECK`, helper functions for the current user and tenant (`STABLE`, with a safe `search_path`), and child tables protected through their own tenant column or a join to the parent.
3. List bypass risks in this design: owner connections, `BYPASSRLS` roles, `SECURITY DEFINER` functions and views, missing tenant setting (make the policy fail closed when the setting is null), pooler session leakage, and admin or background jobs that need explicit separate roles.
4. Cover performance: indexes on policy columns, avoiding per-row subqueries where a direct column works, and how to read the plan to confirm the policy filter is used.
5. Write tests as SQL that can run in CI: for each role, set the identity, try each operation on own and other tenants' rows, and assert the expected row counts or errors, including an attempt to update a row into another tenant.
</task>

<constraints>
- Policies must fail closed: no tenant setting means no rows.
- Do not grant `BYPASSRLS` or table ownership to the application role.
- Mark platform-specific helpers (for example Supabase auth functions) and version-dependent options as "to verify" for the user's version.
- Do not weaken the stated rules for convenience; raise conflicts as questions.
{{> output/uncertainty}}
</constraints>

<output_format>
## Access model
Table: Role | Operation | Rows allowed. Then gaps.

## Policies
SQL code block.

## Bypass risks
Bullets with the mitigation for each.

## Performance
Indexes and plan checks.

## Tests
SQL test script.
</output_format>
