---
schema: 1
id: spec-change-for-existing-users
kind: prompt
title: Specify a change for existing users
description: Specifies how a behaviour or data model change reaches users and records that already exist, with defaults, backfill, grandfathering, opt-outs, communication and what happens to work in progress.
category: product
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, business-analyst, backend-engineer, tech-lead]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [backfill, grandfathering, rollout, requirements]
pairs_with:
  prompts: [write-prd, spec-plan-limits-and-entitlements, write-customer-change-notice]
args:
  - name: change
    description: The new behaviour or rule, and how it differs from what users have today.
    type: text
    required: true
  - name: existing_base
    description: Who and what already exists - number and type of users, records created under the old rule, integrations or automations that depend on it.
    type: text
output_contract:
  format: markdown
  sections: [Change and affected population, Transition rules by segment, Existing data, Work in progress, Communication, Rollback, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most specs describe a feature as if every user were new. The hard part of changing a live product is the people and data that already exist: thousands of records created under the old rule, users whose habits or automations depend on the old behaviour, settings that were never chosen and now need a default, and items halfway through a process when the switch happens. Experienced teams decide explicitly whether old records are migrated, left as they are, or converted on next edit; whether existing users get the new behaviour, keep the old one (grandfathering) or choose; how users are told before it changes; and how to roll back without corrupting data written under the new rule.
</context>

<task>
<change>
{{change}}
</change>
{{#existing_base}}
<existing_base>
{{existing_base}}
</existing_base>
{{/existing_base}}

1. Describe the change in one before-and-after pair and identify every affected population: user segments, records, settings, integrations, reports, and support content.
2. Write transition rules by segment: new behaviour immediately, at a set date, on opt-in, or kept old (grandfathered) and until when; default values for settings users never chose.
3. Specify what happens to existing data: migrated in a backfill, left untouched and shown differently, or converted when next edited; how historical reports and totals stay consistent.
4. Specify work in progress at the switch moment: drafts, open orders, pending approvals, scheduled jobs and running sessions.
5. Plan communication: who is told, what, how far in advance, and through which channel (in-product, email, help article, account manager), scaled to the impact.
6. Define rollback: how to switch back, what happens to data created under the new rule, and the signal that would trigger rollback.
7. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Never silently change data users created; any rewrite of existing records needs an explicit rule and, where meaningful, notice.
- Do not state legal notice periods as fact; where contracts or consumer law may require notice, flag it for review.
- Rollback must address data written after the switch, not just the code path.
- If the existing base is unknown, list what to measure first (counts per segment, dependent integrations) instead of guessing.
</constraints>

<output_format>
## Change and affected population
Before / after, then a table: population, how affected.
## Transition rules by segment
Table: segment, behaviour, from when, until when.
## Existing data
Numbered rules.
## Work in progress
Table: in-flight item, what happens at the switch.
## Communication
Table: audience, message, timing, channel.
## Rollback
Bullets: trigger, steps, data written under the new rule.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
