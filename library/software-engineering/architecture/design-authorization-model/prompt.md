---
schema: 1
id: design-authorization-model
kind: prompt
title: Design an authorization model
description: Chooses RBAC, ABAC or relationship-based authorization for a product, models resources, sharing and inheritance, and decides where checks are enforced and how they are tested.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, security-engineer, tech-lead]
requires: [none]
inputs: [spec, text, document, repo]
output: [docs, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [authorization, rbac, abac, rebac, permissions-model]
pairs_with:
  personas: [software-architect]
  prompts: [spec-roles-and-permissions, implement-role-based-access, audit-tenant-isolation, threat-model-feature]
args:
  - name: product
    description: The product's resources (documents, projects, invoices), who uses them, and the access rules people describe in words, for example "editors can change pages in their space; guests see only shared pages".
    type: text
    required: true
  - name: current_state
    description: How permissions are checked today, if at all, and known problems such as role explosion or leaks.
    type: text
  - name: requirements
    description: Custom roles, sharing with external people, audit, performance needs for filtered lists, and compliance.
    type: text
output_contract:
  format: markdown
  sections: [Model choice, Resource and relationship model, Policies, Enforcement points, List filtering, Testing and audit, Migration, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most products start with a role column and if-statements, then hit the same walls: roles multiply for every exception (role explosion), sharing a single document with one person does not fit roles at all, and list endpoints leak objects because checks were written only on detail pages. The models differ in what they express. RBAC grants permissions through roles, ideally scoped to a resource container (admin of this workspace, not globally). ABAC decides from attributes of the user, resource and context (department, classification, time) and suits rule-heavy enterprise policies. Relationship-based access (ReBAC, as in Zanzibar-style systems) derives access from relationships such as owner, member of a group, parent folder, and handles sharing and inheritance naturally. Real products usually combine scoped roles with relationships. Two questions matter as much as the model: where checks run (every request path, including background jobs and exports) and how lists are filtered efficiently without loading every object and checking one by one.
</context>

<task>
<product>
{{product}}
</product>

{{#current_state}}
<current_state>
{{current_state}}
</current_state>
{{/current_state}}

{{#requirements}}
<requirements>
{{requirements}}
</requirements>
{{/requirements}}

1. If a repository is available, read how permissions are checked today (middleware, decorators, queries) and list the places that check and the places that do not. Say what you read.
2. Rewrite the access rules as precise statements (subject, action, resource, condition) and list the edge cases the rules do not settle yet.
3. Choose the model (scoped RBAC, ABAC, ReBAC or a combination) with the reason, naming which rules each part covers and what the simpler option could not express.
4. Model resources and relationships: resource hierarchy and inheritance, groups, ownership, sharing with internal and external users, and custom roles if required.
5. Write the policies for the main actions as a table or in the notation of the chosen approach, including default deny.
6. Define enforcement points: a single authorisation function or service called from every entry point (API, background jobs, exports, webhooks, admin tools), object-level checks, and how decisions are cached and invalidated when access changes.
7. Define list filtering: how searches and lists return only permitted objects efficiently (query filters derived from policy, precomputed access lists, or a lookup API), and the consistency trade-off.
8. Define testing and audit: a permission matrix test per role and relationship, negative tests for cross-tenant and cross-user access, logging of denied and sensitive decisions, and access review exports. Then plan the migration from today's checks.
</task>

<constraints>
- Default deny: any action not granted explicitly is refused.
- Do not rely on hiding UI elements as enforcement.
- Do not recommend adopting an external authorisation service without stating the operational and latency cost.
- Do not invent business rules; list unsettled rules as open questions for the product owner.
{{> output/uncertainty}}
</constraints>

<output_format>
## Model choice
In at most 6 lines.
## Resource and relationship model
Mermaid diagram plus bullets.
## Policies
Table: action, resource, who is allowed, conditions.
## Enforcement points
## List filtering
## Testing and audit
## Migration
Numbered steps.
## Open questions
Numbered.
</output_format>
