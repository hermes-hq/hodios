---
schema: 1
id: design-multi-tenancy
kind: prompt
title: Design a multi-tenant architecture
description: Chooses a silo, pool or bridge tenancy model for a SaaS product and specifies data isolation, tenant routing, noisy-neighbour limits, per-tenant config and the migration path.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, tech-lead, founder]
subject: [saas]
requires: [none]
inputs: [spec, text, document]
output: [docs, diagram, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [multi-tenancy, tenant-isolation, noisy-neighbour, row-level-security, data-residency]
pairs_with:
  personas: [software-architect]
  prompts: [write-adr, threat-model-feature, design-database-schema, plan-incremental-migration]
args:
  - name: product
    description: What the SaaS product does and the main components (API, workers, database, search, file storage).
    type: text
    required: true
  - name: tenant_profile
    description: Number of tenants today and expected, size distribution (for example "2,000 small, 30 enterprise with 100x the data"), plans and what enterprise tenants ask for.
    type: text
    required: true
  - name: compliance
    description: Regulatory or contractual needs, for example data residency, SOC 2, HIPAA, customer-managed keys, dedicated infrastructure clauses.
    type: text
  - name: current_architecture
    description: How tenancy works today, if the product exists, including database layout and how requests know their tenant.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Model comparison, Data isolation, Tenant routing and identity, Noisy-neighbour controls, Per-tenant configuration, Operations, Migration path, Assumptions and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The tenancy model is one of the hardest SaaS decisions to reverse. A pure silo (a stack or database per tenant) gives strong isolation and simple per-tenant compliance but multiplies cost and operational work with every tenant. A pure pool (shared everything, tenant id on every row) is cheap and simple to deploy but one missing filter leaks data across tenants and one heavy tenant can slow everyone. Most mature products end up with a bridge: pooled by default, with siloed tiers or components for the tenants and data that need it. The design has to hold at the tenant count expected in two to three years, not only today's.
</context>

<task>
Design the multi-tenancy model for:

<product>
{{product}}
</product>

<tenant_profile>
{{tenant_profile}}
</tenant_profile>

{{#compliance}}
Compliance and contractual needs:
{{compliance}}
{{/compliance}}
{{#current_architecture}}
Current architecture:
{{current_architecture}}
{{/current_architecture}}

1. If the tenant counts, size distribution or compliance needs are too vague to choose a model, ask up to five questions and stop. Otherwise continue, labelling each assumption.
2. Compare silo, pool and bridge for this product on: isolation strength, blast radius of a bug or breach, cost per tenant at today's and the expected tenant count (relative, with the reasoning shown), operational load (deploys, migrations, backups and monitoring per tenant), onboarding time, noisy-neighbour risk and fit with the compliance needs. Decide per component where it matters: compute, primary database, cache, search, file storage, queues and analytics.
3. Specify data isolation for the chosen model: for pooled data, a tenant id on every tenant-owned table and in every key, enforced by the database where possible (for example row-level security policies) plus a data-access layer that cannot run an unscoped query, and tests that try cross-tenant reads; for siloed data, the database or schema per tenant, how connections are pooled, and how schema migrations roll out across many databases. Cover caches, search indexes, object storage prefixes, queues, logs and backups too, because leaks often happen there. Cover encryption, including per-tenant keys if compliance requires them.
4. Specify tenant routing and identity: how a request is resolved to a tenant (subdomain, token claim, header), where that is validated, how the tenant context is propagated to workers and async jobs, how admin and support access across tenants is controlled and audited, and how a tenant is pinned to a region or cell if residency or scale requires it.
5. Specify noisy-neighbour controls: per-tenant rate limits and quotas, fair scheduling of background work, connection and query limits, per-tenant usage metering, and the trigger for moving a heavy tenant to a dedicated tier.
6. Specify per-tenant configuration: feature flags and plan entitlements, custom domains, SSO settings and limits, where they are stored and cached, and how changes are audited.
7. Specify operations: onboarding and offboarding (including verified data deletion and export), per-tenant backup and restore, per-tenant observability (metrics and logs tagged with tenant id), and cost attribution.
8. Give the migration path from the current architecture (or from the simplest starting point for a new product) in phases, each shippable on its own with a verification and rollback, including how to move a single tenant between pool and silo.
</task>

<constraints>
- Recommend the simplest model that meets the stated needs. Do not recommend silo-per-tenant for thousands of small tenants without saying what it will cost to operate.
- Treat cross-tenant data access as the most serious failure: every component in the design must say how it prevents it.
- Do not invent compliance requirements or claim a design is certified for a standard; say what a standard typically requires and that it needs confirming with the compliance owner.
- Do not invent cloud limits or prices. When a number matters, show the reasoning or say how to find it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The model (silo, pool or bridge, per component where it differs) and why, in at most 6 lines.
## Model comparison
Table: criterion, silo, pool, bridge, with the winner per row.
## Data isolation
Per component: how tenant data is separated and enforced, and the cross-tenant test.
## Tenant routing and identity
A Mermaid diagram of a request from the edge to the data, then the rules.
## Noisy-neighbour controls
Table: resource, limit or mechanism, default, how it is enforced.
## Per-tenant configuration
## Operations
## Migration path
Numbered phases, each with its verification and rollback.
## Assumptions and open questions
Numbered. Each says what it affects.
</output_format>
