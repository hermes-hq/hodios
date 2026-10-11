---
schema: 1
id: document-permissions-matrix
kind: prompt
title: Document a permissions matrix
description: Reads a product's authorization checks and documents what each role can do as a reference table for admins and support, with every cell traced to code.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, technical-writer, security-engineer, product-manager]
stack: []
requires: [repo-read]
inputs: [repo]
output: [docs, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [roles-and-permissions, rbac, admin-docs, authorization, access-reference]
pairs_with:
  prompts: [spec-roles-and-permissions, write-support-enablement-doc, document-undocumented-module]
args:
  - name: scope
    description: The product area or whole app to cover, and where the roles are defined if you know.
    type: text
    required: true
  - name: audience
    description: Who reads the result - customer admins in public docs, internal support, or a security review.
    type: text
output_contract:
  format: markdown
  sections: [Roles, Permissions matrix, Special rules, Inconsistencies, Evidence]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Can a member delete a project?" is one of the most common questions admins and support ask, and the answer is usually spread across route guards, policy classes, decorators, database row filters and frontend checks that hide buttons. A permissions page written from memory or from the original spec is wrong in exactly the cases that matter. Experienced reviewers trace each action to the server-side check, because a hidden button is not a permission. They also look for the rules that do not fit a simple grid: ownership ("only the creator can edit"), plan or feature-flag gates, scoped roles (workspace admin versus project admin), and inherited or custom roles. Mismatches found along the way (UI hides an action the API still allows, or two endpoints for the same action with different checks) are security findings, not docs details.
</context>

<task>
Document who can do what in: {{scope}}
{{#audience}}Audience: {{audience}}{{/audience}}

1. Find how authorization is implemented: role definitions (enum, table, config), the permission or policy layer, middleware or decorators on routes, row-level filters, and frontend gating. Note whether roles are fixed, scoped (organisation, team, project) or customisable.
2. List the user-facing actions in scope (view, create, edit, delete, invite, export, change billing, manage settings and so on) by walking the routes, controllers or resolvers, not the UI alone.
3. For each action and role, determine the result from the server-side check: allowed, denied, allowed with a condition (own items only, plan required, flag enabled), or unknown. Record the file and line that decides it.
4. Compare with frontend gating and any existing docs. Record mismatches: UI hides but API allows, UI shows but API denies, docs say otherwise, or the same action checked differently on two paths.
5. Write the matrix for the stated audience using product terms rather than code names, with conditions as footnotes.
</task>

<constraints>
- Base every cell on server-side code you read. Mark cells you could not trace as "unknown", never as a guess.
- Do not publish security weaknesses in a customer-facing version: put them under inconsistencies for the owner, and leave them out of the public table text.
- Do not change code; this is documentation and a report.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Roles
Each role with scope, how it is assigned, and whether it can be customised.
## Permissions matrix
Table: action (rows) by role (columns) with allowed, denied, conditional (footnoted) or unknown.
## Special rules
Ownership, plan, feature-flag and inheritance rules in plain language.
## Inconsistencies
Mismatches between API, UI and docs, marked by severity, for the owner.
## Evidence
Table: action, role, file and line of the deciding check.
</output_format>
