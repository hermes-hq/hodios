---
schema: 1
id: spec-plan-limits-and-entitlements
kind: prompt
title: Specify plan limits and entitlements
description: Specifies what each pricing plan unlocks and limits, how usage is counted, what happens near and over a limit, and how upgrades, downgrades and trials change access to existing data.
category: product
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, business-analyst, fullstack-engineer, founder]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [saas]
tags: [entitlements, usage-limits, pricing-plans, requirements]
pairs_with:
  prompts: [design-free-tier, spec-change-for-existing-users, list-feature-edge-cases]
args:
  - name: plans
    description: The plans and what the business intends each to include, as a pricing page draft or notes.
    type: text
    required: true
  - name: context
    description: How billing works (per seat, per usage, monthly or yearly), current customers, and features that are hard to take away.
    type: text
output_contract:
  format: markdown
  sections: [Entitlement table, Counting rules, At and over the limit, Plan changes, Existing customers, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A pricing page says "5 projects" or "10,000 API calls"; engineering needs to know what exactly counts, when the counter resets, and what the product does at 4, 5 and 6. Unspecified limits cause the worst support tickets: work silently blocked mid-task, archived items that still count, a downgrade that leaves a customer with 12 projects on a 5-project plan and no rule for which ones lock, or a trial that ends and hides data the customer thinks is theirs. Good entitlement specs separate feature flags (on or off by plan) from quantity limits (counted), define soft limits (warn, allow temporary overage) versus hard limits (block), never destroy data because of a plan change, and give one source of truth for the entitlement matrix so the UI, API and billing system agree.
</context>

<task>
<plans>
{{plans}}
</plans>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Build an entitlement table: every feature and quantity limit as rows, plans as columns, separating on/off features from counted limits.
2. Write counting rules for each limit: what counts (active only, archived, deleted in trash, shared from others), per what (user, workspace, organisation), the reset period and its anchor date, and how concurrent actions near the limit are handled.
3. Specify behaviour at and over each limit: warnings and at which thresholds, soft or hard limit, grace amount or period, what is blocked and what stays usable (always allow reading and exporting), the exact message, and who is told (the user who hit it, the admin, the billing contact).
4. Specify plan changes: upgrade timing (immediate), downgrade timing (period end or immediate), what happens when existing usage exceeds the new plan's limit (read-only, choose what to keep, lock newest), trial start and end, failed payment, and re-upgrade restoring access.
5. Specify how existing customers move onto the new limits: grandfathering, notice, and exceptions handled by sales or support.
6. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Never specify deleting customer data because of a plan change or trial end; at most make it read-only or locked, with export kept available.
- Do not set prices or recommend price levels; this spec is about behaviour.
- Any limit enforced only in the UI is a bug; state that the API and background jobs enforce the same counts.
- Where notice periods or consumer rules may apply to changing what paying customers get, flag it for legal review instead of deciding.
- If plan contents are not given, ask for them instead of inventing tiers.
</constraints>

<output_format>
## Entitlement table
Table: feature or limit, type (feature/limit), one column per plan.
## Counting rules
Table: limit, what counts, scope, reset, notes.
## At and over the limit
Table: limit, warn at, soft or hard, what is blocked, what stays usable, message, who is told.
## Plan changes
Numbered rules per change type.
## Existing customers
Bullets.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
