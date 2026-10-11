---
schema: 1
id: design-two-way-data-sync
kind: prompt
title: Design a two-way data sync with another system
description: Designs two-way sync between your system and a CRM, ERP or other SaaS, with ID mapping, change detection, conflict rules, loop prevention and reconciliation.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, data-engineer]
requires: [none]
inputs: [spec, text, document]
output: [docs, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [integration, data-sync, conflict-resolution, crm-integration, reconciliation]
pairs_with:
  personas: [software-architect]
  prompts: [build-webhook-handler, implement-background-job, design-anti-corruption-layer, implement-idempotency-keys]
args:
  - name: systems
    description: The two systems, which records sync (contacts, companies, orders, products) and which fields, and what the external system's API offers (webhooks, change feeds, modified-since queries, bulk APIs, rate limits).
    type: text
    required: true
  - name: business_rules
    description: Which system owns which fields, who edits what in practice, and what must never be overwritten.
    type: text
  - name: scale
    description: Record counts, change volume per day, and how quickly changes must appear on the other side.
    type: text
output_contract:
  format: markdown
  sections: [Ownership map, Identity mapping, Change detection, Conflict rules, Loop prevention, Failure handling and reconciliation, Initial load, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Two-way sync between systems is one of the most underestimated integration jobs. The usual failure modes are echo loops (your write to the CRM triggers its webhook, which writes back to you, forever), lost updates when both sides edit the same record, duplicates when matching rules are vague, deletes that propagate when they should not, and silent drift when a webhook is missed. Experienced integrators decide ownership per field rather than per record wherever possible, because one-way-per-field sync removes most conflicts. They keep a mapping table of local id to external id with sync metadata (last synced versions or hashes, timestamps), detect changes with webhooks plus a periodic modified-since sweep because webhooks get lost, ignore their own writes by comparing against what they last sent, apply explicit conflict rules, and run a scheduled reconciliation that compares both sides and reports or repairs drift.
</context>

<task>
<systems>
{{systems}}
</systems>

{{#business_rules}}
<business_rules>
{{business_rules}}
</business_rules>
{{/business_rules}}

{{#scale}}
<scale>
{{scale}}
</scale>
{{/scale}}

1. If the external system's API capabilities or field ownership are unknown, ask up to five questions and stop. Otherwise continue and label assumptions about the external API, which must be checked against its documentation.
2. Build the ownership map: per entity and field, the owner system, the direction of sync, and fields that never sync. Push for one-way-per-field wherever the business allows.
3. Design identity mapping: the mapping table, how existing records are matched the first time (and what happens on ambiguous matches), merges and splits, and where the external id is stored.
4. Design change detection on both sides: webhooks or events where available, a modified-since sweep as a safety net with its interval, ordering and how out-of-order updates are handled using versions or timestamps.
5. Write conflict rules for fields that both sides can change: owner wins, last-writer-wins with which clock, or flagging for manual review, plus delete and archive semantics on each side.
6. Design loop prevention: recording what was last written per field or a content hash, ignoring echoes, and not relying on a "changed by integration user" flag alone if the API does not guarantee it.
7. Design failure handling: rate limit handling and backoff, a retry queue with dead letters, idempotent writes, alerting, and a scheduled reconciliation job that compares counts and samples or full hashes, then reports or repairs drift.
8. Plan the initial load and cutover: backfill order, matching dry run with a report for humans, and enabling live sync afterwards.
</task>

<constraints>
- Do not assume the external API supports webhooks, bulk endpoints or particular limits; state them as assumptions to verify.
- Never propagate deletes automatically without an explicit business rule.
- Do not design matching that auto-merges records on weak keys such as name alone.
{{> output/uncertainty}}
</constraints>

<output_format>
## Ownership map
Table: entity, field, owner, direction, notes.
## Identity mapping
## Change detection
## Conflict rules
Table: field or case, rule, reason.
## Loop prevention
## Failure handling and reconciliation
## Initial load
Numbered steps.
## Open questions
Numbered.
</output_format>
