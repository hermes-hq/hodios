---
schema: 1
id: audit-tenant-isolation
kind: prompt
title: Audit tenant isolation
description: Audits a multi-tenant codebase for paths where one customer can see or change another's data, across queries, jobs, caches, search, file storage, exports and support tools, with a cross-tenant test.
category: security
version: 1.0.0
status: incubating
stage: [review, verify]
role: [security-engineer, backend-engineer, tech-lead]
stack: []
requires: [repo-read]
inputs: [repo, text]
output: [report, tests, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [multi-tenancy, data-isolation, authorization, cross-tenant-access, row-level-security]
pairs_with:
  prompts: [design-multi-tenancy, review-api-security, implement-role-based-access]
  personas: [security-auditor]
args:
  - name: system
    description: How tenancy is modelled (shared tables with a tenant column, schema per tenant, database per tenant), how the current tenant is resolved, and the main components (API, jobs, caches, search, storage).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Isolation model, Data access paths, Findings, Cross-tenant test plan, Defence in depth]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cross-tenant leaks are among the most damaging bugs a SaaS can ship, and they rarely sit in the main request path, which usually goes through a tested scope. They hide where the tenant context is lost or never applied: raw SQL and reporting queries that skip the ORM's default scope; background jobs and queue consumers that run without the request's tenant; cache keys, rate limits and feature flags without the tenant in the key; search indexes and analytics stores filtered in the client; object storage paths or signed URLs built from guessable IDs; exports, webhooks and email templates that pull related records; admin and support impersonation; and lookups by global IDs where the record's tenant is never compared with the caller's. Database row-level security or separate schemas are strong defence in depth but have their own bypasses (superuser or owner connections, pooled sessions with a stale tenant setting).
</context>

<task>
System: {{system}}

1. Describe the isolation model and where the current tenant comes from (token claim, subdomain, header, session), and whether it can be chosen by the caller.
2. Inventory every data access path: ORM models and whether a tenant scope is enforced by default; raw queries; jobs and consumers; caches; search and analytics; file storage; exports, reports, webhooks and emails; admin and support tools; cross-tenant features (sharing, marketplaces) that intentionally cross the boundary.
3. For each path, check that the tenant is applied from a trusted source and compared on every read and write, including updates and deletes by ID and nested or related records.
4. Report findings with the path (`path:line`), the scenario (tenant A's user does X and gets tenant B's data), severity and fix. Prefer fixes that make the safe path the default (scoped repositories, tenant-aware cache key helpers, job payloads that carry and re-verify the tenant).
5. Write a cross-tenant test plan: two tenants with overlapping data, and automated tests that try every endpoint and job with the other tenant's IDs, expecting not-found or forbidden.
6. Recommend defence in depth suited to the model: row-level security or schema separation, connection handling that resets tenant settings, monitoring for queries without a tenant filter.
</task>

<constraints>
- Report only what the code or description shows; mark paths you could not inspect.
- Treat intentional cross-tenant features as in scope and check their authorization explicitly.
- Do not include real customer data in tests or reports.
{{> output/uncertainty}}
</constraints>

<output_format>
## Isolation model
Short description and how the tenant is resolved.
## Data access paths
Table: path | tenant applied how | trusted source | status (ok, gap, not inspected).
## Findings
Per finding: title, severity, `path:line`, scenario, fix.
## Cross-tenant test plan
Bullets and example test cases.
## Defence in depth
Bullets.
</output_format>
