---
schema: 1
id: spec-roles-and-permissions
kind: prompt
title: Specify roles and permissions for a feature
description: Specifies who can see and do what in a feature as a role-by-action matrix, with ownership rules, inherited access, what denied users see and how access changes mid-session.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, backend-engineer, security-engineer]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [table, docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [permissions, access-control, rbac, requirements]
pairs_with:
  prompts: [list-feature-edge-cases, write-acceptance-criteria, spec-share-link-feature]
args:
  - name: feature_description
    description: The feature, the objects it creates or shows, and the actions people take on them.
    type: text
    required: true
  - name: existing_roles
    description: The roles and plans the product already has, and any current access rules the feature must respect.
    type: text
output_contract:
  format: markdown
  sections: [Roles and assumptions, Permission matrix, Ownership and inheritance, Denied and changed access, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Access bugs rarely come from a missing check on the main screen. They come from rules nobody wrote down: whether the creator of an item keeps edit rights after being downgraded, whether a viewer can see an item in a list, a search result, a count or an export even though the detail page is blocked, whether a removed member's items stay, move or disappear, and whether the public API and background jobs follow the same rules as the UI. A good permission spec separates role-based access from ownership and from explicit sharing, names every action rather than "manage", says what a denied user sees (hidden, disabled with a reason, or a not-found page that does not confirm the item exists), and states that the server enforces every rule, not only the interface.
</context>

<task>
<feature>
{{feature_description}}
</feature>
{{#existing_roles}}
<existing_roles>
{{existing_roles}}
</existing_roles>
{{/existing_roles}}

1. List the roles that touch this feature, plus non-members: guests, invited but not accepted users, deactivated users, API tokens, support staff and automated jobs. State any role you assumed.
2. List the objects and break actions into specific verbs: view in list, view detail, create, edit own, edit others', delete, restore, share, export, comment, change settings, see audit history. Drop verbs the feature does not have.
3. Fill a matrix of role by action with allowed, denied, own-only or conditional, and write every condition out under the table.
4. Write ownership and inheritance rules: who owns a new item, transfer of ownership, access inherited from a parent such as a project or folder, and which rule wins when role, ownership and sharing disagree.
5. Specify denied and changed access: what the UI shows for each denied action, how leaks through search, counts, notifications, exports and the API are closed, and what happens to open sessions, scheduled jobs and owned items when someone is downgraded or removed.
6. List the decisions the product owner must still make, each with a recommended default marked as a proposal.
</task>

<constraints>
- Never use vague verbs such as "manage" or "full access" in the matrix; every cell maps to a named action.
- State that every rule must be enforced server-side; UI hiding alone is never a permission.
- Do not invent roles or plans the product does not have; mark assumptions clearly.
- Where access depends on law or contracts (data protection, regulated records, customer agreements), say who should confirm it instead of deciding.
- If the feature description does not name the objects or actions, ask for them before drafting a matrix.
</constraints>

<output_format>
## Roles and assumptions
Bullets: role, who it is, assumptions.
## Permission matrix
Table: action rows, role columns, cells allowed / denied / own-only / conditional (n), with numbered conditions below.
## Ownership and inheritance
Numbered rules, including the precedence order.
## Denied and changed access
Bullets per case: what the user sees, and what happens on downgrade or removal.
## Open questions
Numbered: question, recommended default (proposal), why it matters.
</output_format>
