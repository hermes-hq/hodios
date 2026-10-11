---
schema: 1
id: plan-customer-migration-program
kind: prompt
title: Plan a customer migration program
description: Plans moving all customers from a legacy product, platform or version to a new one in waves, with cohort rules, readiness gates, support capacity, communications and rollback rules.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [product-manager, engineering-manager, project-manager, operations-manager]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [customer-migration, migration-waves, cohorts, readiness-gates, legacy-platform, rollback]
pairs_with:
  prompts: [plan-feature-sunset, plan-staged-feature-rollout, plan-system-go-live-cutover, write-roadmap-update]
args:
  - name: migration
    description: What customers move from and to, why, what changes for them (features, prices, workflows, data), and any hard end date for the old version.
    type: text
    required: true
  - name: customers
    description: The customer base - number, segments, plan types, notable large or regulated accounts, integrations or customisations in use.
    type: text
    required: true
  - name: resources
    description: Optional. Support and success capacity, engineering capacity, and tools available (feature flags, migration scripts, account-level switches).
    type: text
output_contract:
  format: markdown
  sections: [Migration goals and constraints, Cohorts and waves, Readiness gates, Support and success capacity, Communications, Rollback and exceptions, Tracking]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan the program that moves an entire customer base from an old product, platform or version to a new one: a rebuilt app, a new pricing and billing system, a v2 API, a new data platform. The engineering work is often the easy part; migrations stall because the long tail of customers with custom setups, integrations or contracts never moves, because support is flooded when too many accounts switch at once, and because the old system has to be kept running at full cost for years. Good programs move in waves: friendly and simple customers first to learn, then the broad middle, then complex and high-value accounts with hands-on help, with gates between waves based on measured outcomes (error rates, ticket volume, churn signals), a clear rule for opt-outs and exceptions, and an end date for the old version that is announced early and held.
{{#resources}}
Resources: {{resources}}
{{/resources}}
</context>

<task>
Migration:

<migration>
{{migration}}
</migration>

Customers:

<customers>
{{customers}}
</customers>

1. State the goals and constraints: why the migration matters, what success looks like (share migrated, retention, support load), the end date for the old version, and parity gaps customers will notice.
2. Define cohorts by complexity and risk (integrations, customisations, size, regulation, contract terms) and sequence them into waves, starting with low-risk customers who will give feedback. Size each wave against support capacity.
3. Set readiness gates between waves: the measures that must hold (for example migration success rate, ticket volume per migrated account, critical bugs open) and who signs off.
4. Plan support and success capacity per wave: self-serve guides, office hours, white-glove help for complex accounts, and extra staffing for switch weeks.
5. Plan communications per cohort: first notice, reminders, the migration date, what changes, and what to do if something breaks, with lead times appropriate to contracts.
6. Set rollback and exception rules: when an account can be moved back, how long the old version stays available, who can grant an exception, and the cost of extended support.
7. Define tracking: a migration dashboard with counts per wave, blockers by reason, and the long-tail list.
</task>

<constraints>
- Use only the customer data and dates given; do not invent customer names, counts or contract terms.
- Do not plan a single big-bang switch for everyone unless the user insists, and then state the risks.
- Contract notice periods and data obligations vary by agreement and jurisdiction; flag them for legal or account owners to confirm rather than assuming.
- Never move customers' data in a way that removes their ability to get it back without saying so clearly.
{{> output/uncertainty}}
</constraints>

<output_format>
## Migration goals and constraints
Bullets.

## Cohorts and waves
Table: wave | cohort | criteria | approx. accounts | timing | help model.

## Readiness gates
Table: gate | measure | threshold | sign-off.

## Support and success capacity
Bullets per wave.

## Communications
Table: when | audience | message | channel.

## Rollback and exceptions
Bullets.

## Tracking
Bullets.
</output_format>
