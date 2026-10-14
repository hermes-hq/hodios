---
schema: 1
id: design-organization-account-model
kind: prompt
title: Design a B2B account and membership model
description: Designs the account model for a B2B SaaS with users, organisations, workspaces, memberships, invitations, ownership and billing, including users in several orgs and moving between them.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, fullstack-engineer, founder]
subject: [saas]
requires: [none]
inputs: [spec, text, schema, repo]
output: [docs, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [account-model, organisations, memberships, invitations, seat-billing]
pairs_with:
  personas: [software-architect]
  prompts: [design-multi-tenancy, design-authorization-model, design-enterprise-sso, design-database-schema]
args:
  - name: product
    description: The product, how customers buy it (self-serve, sales-led, per seat, per workspace), and how people collaborate in it.
    type: text
    required: true
  - name: current_model
    description: The current user and account tables or description, if the product exists, and the problems it causes.
    type: text
  - name: scenarios
    description: Specific situations the model must handle, such as freelancers in several client orgs, company acquisitions merging orgs, or personal accounts becoming team accounts.
    type: text
output_contract:
  format: markdown
  sections: [Model summary, Entities and relationships, Key flows, Ownership and billing, Edge cases, Migration, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many B2B products begin with "a user belongs to one account" (an account_id on the users table) and later need painful migrations: a consultant needs access to three client organisations with one login, a personal sign-up must turn into a team, two customer organisations merge, an employee leaves and their content must stay with the company. The model that survives separates identity (a person who logs in, owns credentials and a primary email) from membership (that person's role in an organisation or workspace) and from the organisation itself (which owns data, billing and settings). Data belongs to the organisation, not to the user who created it. Invitations, domain-based auto-join, ownership transfer, the last-owner rule and seat counting all hang off memberships. Getting this right early is far cheaper than retrofitting it.
</context>

<task>
<product>
{{product}}
</product>

{{#current_model}}
<current_model>
{{current_model}}
</current_model>
{{/current_model}}

{{#scenarios}}
<scenarios>
{{scenarios}}
</scenarios>
{{/scenarios}}

1. If a repository is available, read the user, account and permission models and the code that resolves "current account", and say what you read.
2. Summarise the recommended model: levels (organisation, optional workspace or project), and whether a user can belong to several organisations.
3. Define entities and relationships: user identity, organisation, workspace if needed, membership with role and status, invitation, and which entity owns data, billing, settings, SSO configuration and API keys. Draw it.
4. Describe key flows: sign-up (personal versus joining or creating an organisation), invitations and domain-based auto-join with verified domains, switching organisations in the UI and API, leaving and removal, and ownership transfer.
5. Define ownership and billing: who can pay and manage billing, seat counting from memberships, the rule that an organisation always has at least one owner, and what happens to content when a member leaves.
6. Work through edge cases: one person in several organisations with different emails, email change, personal account turned into a team, merging two organisations, splitting one, deleting a user versus deleting an organisation, and data export.
7. Plan migration from the current model, if one exists, in safe steps that keep existing users working.
</task>

<constraints>
- Data and billing belong to organisations, not individual users, unless the product is explicitly single-user.
- Never auto-join users to an organisation based on an unverified email domain.
- Do not let an organisation end up with no owner.
- Do not invent the product's pricing model; ask if it changes the design.
{{> output/uncertainty}}
</constraints>

<output_format>
## Model summary
In at most 6 lines.
## Entities and relationships
Mermaid entity-relationship diagram plus a table: entity, key fields, owns.
## Key flows
Numbered flows.
## Ownership and billing
## Edge cases
Table: case, behaviour.
## Migration
Numbered steps.
## Open questions
Numbered.
</output_format>
