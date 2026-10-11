---
schema: 1
id: spec-third-party-integration
kind: prompt
title: Specify a third-party integration
description: Specifies a product integration with an outside service, covering connect and disconnect, access requested, field mapping, sync direction and timing, conflicts and what users see when it breaks.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, backend-engineer]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [integrations, data-sync, field-mapping, requirements]
pairs_with:
  prompts: [list-feature-edge-cases, define-non-functional-requirements, spec-support-admin-tools]
args:
  - name: integration_goal
    description: Which outside service, what users want to achieve with the connection, and who sets it up.
    type: text
    required: true
  - name: known_constraints
    description: What you know about the other service's API, plans or limits, and data the two products share.
    type: text
output_contract:
  format: markdown
  sections: [Integration scope, Connection lifecycle, Data mapping, Sync rules, Failure handling, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Integrations are features whose behaviour depends on a system you do not control. Most integration complaints are about things the spec never decided: a field that exists on one side and not the other, a record edited in both products between syncs, a connection that silently stopped because the person who connected it left the company or their token expired, a rate limit hit by the largest customer, and duplicates created on the first sync because there was no matching rule. A good integration spec starts from the user job and the smallest data that serves it, chooses one direction and one source of truth per field, defines the first sync separately from ongoing sync, says what users see when the other side fails, and asks for only the access the job needs.
</context>

<task>
<integration_goal>
{{integration_goal}}
</integration_goal>
{{#known_constraints}}
<known_constraints>
{{known_constraints}}
</known_constraints>
{{/known_constraints}}

1. State the integration scope: the user job, who sets it up (individual or admin, per user or per workspace), which plans get it, and what is explicitly out of scope for the first version.
2. Specify the connection lifecycle: connect flow, access requested and why each is needed, what happens when the connecting person leaves or loses access, reconnect, disconnect, and what data stays or is removed on each side after disconnect.
3. Write a data mapping table: object and field on each side, direction, source of truth, transformation (formats, enums, units, time zones), and behaviour when a field is missing on one side.
4. Write sync rules: first sync (backfill scope and matching to avoid duplicates), ongoing sync trigger and expected delay, conflict resolution when both sides change, deletes, and limits for very large accounts.
5. Specify failure handling: expired access, rate limits, the other service down, validation errors on one record, partial sync; what the user sees, where a sync log is shown, retry behaviour, and who is alerted.
6. List open questions, separating those for the other service's documentation or partnership team from product decisions, each with a recommended default marked as a proposal.
</task>

<constraints>
- Do not state the other service's API capabilities, scopes, rate limits or pricing as fact unless the user supplied them; mark them as "verify in the provider's documentation".
- Request the least access that serves the job, and say which access would need a security or privacy review.
- Every field has exactly one source of truth or an explicit conflict rule; no "keep in sync" without saying how.
- If the user job is unclear, ask what the user wants to achieve before mapping fields.
</constraints>

<output_format>
## Integration scope
Bullets, including out of scope.
## Connection lifecycle
Numbered steps and rules.
## Data mapping
Table: our field, their field, direction, source of truth, transformation, if missing.
## Sync rules
Bullets: first sync, ongoing sync, conflicts, deletes, scale.
## Failure handling
Table: failure, what the user sees, retry, who is alerted.
## Open questions
Two numbered lists: to verify with the provider, product decisions (with recommended defaults as proposals).
</output_format>
