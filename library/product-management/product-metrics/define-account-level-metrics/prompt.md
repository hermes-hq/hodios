---
schema: 1
id: define-account-level-metrics
kind: prompt
title: Define account-level product metrics
description: Defines B2B product metrics at account level - active accounts, seat utilisation, breadth and depth of use, champion and admin activity - with rollup rules from users to accounts and risk signals.
category: product-metrics
version: 1.0.0
status: incubating
stage: [design, plan]
role: [product-manager, data-analyst, support-agent, founder]
subject: [saas]
requires: [none]
inputs: [text, schema]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [b2b-products, account-metrics, seat-utilisation, breadth-of-use, champion-risk, user-to-account-rollup]
pairs_with:
  prompts: [define-engagement-metric, design-customer-health-score, analyze-net-revenue-retention, define-product-qualified-lead]
args:
  - name: product
    description: What the product does, how accounts are structured (workspaces, organisations, sub-teams), how it is priced (seats, usage, flat), and the roles inside an account (admin, buyer, end users).
    type: text
    required: true
  - name: data
    description: How users map to accounts in the data, available events, seat and billing data. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Rollup rules, Account metric set, Risk and expansion signals, Reporting, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You define product metrics for B2B products, where the customer who renews is an account, not a user. User-level metrics mislead here: a large account with 2,000 users can dominate active-user counts while a hundred small accounts quietly stop using the product. Account-level measures answer different questions: is the account active (enough of its users doing the core action, not one person logging in), how many paid seats are used (utilisation drives both churn risk and expansion), how broadly the product is used across teams and features, and whether the champion and admins are still active, since a champion leaving is one of the strongest churn warnings. Rollups need rules: what counts as an active account, how to handle multiple workspaces per customer, trials, and users who belong to several accounts. These metrics feed customer success health scores, but they are product definitions first.

Product: {{product}}
{{#data}}Data: {{data}}{{/data}}
</context>

<task>
1. Rollup rules: how users, workspaces and billing entities map to one account, how to treat multi-workspace customers, internal and test accounts, and users in several accounts.
2. Account metric set: definitions for active account (threshold of active users or core actions per period, scaled to account size), seat utilisation (active users divided by paid seats), breadth (teams or departments using it, share of key features used), depth (core actions per active user), and admin and champion activity.
3. Risk and expansion signals: falling utilisation, champion or admin inactivity, shrinking breadth, near-full seats or limits, new teams appearing; each with a rule and the team that acts on it.
4. Reporting: account counts by size band (so large accounts do not hide small ones), revenue-weighted versus logo-weighted views, and how often to review.
</task>

<constraints>
- Do not define account activity as "any user logged in".
- Make thresholds depend on account size or seats; do not use one fixed number for all.
- Do not invent thresholds as fact; propose starting values and say how to calibrate them against renewals.
- Keep personal data use to what is needed for product and account health.
</constraints>

<output_format>
## Rollup rules
Bullets.

## Account metric set
Table: metric | definition | period | why it matters.

## Risk and expansion signals
Table: signal | rule | owner | action.

## Reporting
Bullets.

## Questions
What to confirm.
</output_format>
