---
schema: 1
id: plan-product-integration-after-acquisition
kind: prompt
title: Plan product integration after an acquisition
description: Plans how to combine an acquired product with your own - overlap map, keep, merge or retire decisions, customer migration, a unified roadmap and naming.
category: product-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, executive]
requires: [none]
inputs: [text, notes, document]
output: [plan, report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [acquisition, product-merger, overlap-map, customer-migration, unified-roadmap]
pairs_with:
  prompts: [plan-acquisition-integration, consolidate-team-roadmaps, plan-legacy-product-strategy, rationalize-product-line]
args:
  - name: products
    description: Both products - what each does, customers and overlap, revenue, pricing, technology, teams, and strengths customers cite.
    type: text
    required: true
  - name: deal_thesis
    description: Why the acquisition was made (new segment, technology, customers, removing a competitor) and any commitments made to customers or staff at announcement.
    type: text
    required: true
  - name: constraints
    description: Timelines, budgets, key people, contractual or regulatory limits, and leadership expectations. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Deal thesis check, Overlap map, Integration model, Component decisions, Customer impact and migration, Unified roadmap, Naming and packaging, Risks and early warnings]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product leader who has integrated acquired products. Product integration should follow the deal thesis: if the company was bought for its customers in a new segment, forcing them onto the acquirer's product destroys the value; if it was bought for technology, the technology must be absorbed into the core. There are a few models: keep standalone and connect (shared login, data sync, cross-sell); merge into one product over time; or replace one with the other and migrate. Customers of the acquired product are anxious and competitors target them in the first months, so early clarity matters more than speed. Common failures include announcing a migration before the target product has parity, running two roadmaps that drift, rebuilding the acquired product's best feature worse, and losing the acquired team's key people.

<products>
{{products}}
</products>

<deal_thesis>
{{deal_thesis}}
</deal_thesis>
{{#constraints}}

<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Check the deal thesis: what value must be protected and what would destroy it.
2. Overlap map: capabilities, customer segments and technology, marking overlap, complement and gaps.
3. Integration model: standalone and connect, merge over time, or replace; recommend one with reasons tied to the thesis.
4. Component decisions: for each overlapping capability, keep A, keep B, merge or retire, with reasons.
5. Customer impact and migration: who is affected, parity requirements before any migration, incentives, notice and timeline.
6. Unified roadmap: first 90 days (quick wins such as shared login or cross-sell), then 6 to 18 months.
7. Naming and packaging: product names, plans and pricing alignment, with grandfathering for acquired customers.
8. Risks and early warnings: churn signals, key-person retention, competitor targeting, technical blockers.
</task>

<constraints>
- Do not invent revenue, customer counts or capability details; mark them as questions.
- Honour commitments made at announcement; flag any recommendation that conflicts with them.
- Do not recommend migrating customers before the target product meets their critical needs.
- Note that contract changes and data transfers may need legal and privacy review, which varies by jurisdiction.
{{> output/uncertainty}}
</constraints>

<output_format>
## Deal thesis check
## Overlap map
| Capability or segment | Our product | Acquired product | Overlap type |
## Integration model
## Component decisions
## Customer impact and migration
## Unified roadmap
## Naming and packaging
## Risks and early warnings
</output_format>
