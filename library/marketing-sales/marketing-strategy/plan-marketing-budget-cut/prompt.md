---
schema: 1
id: plan-marketing-budget-cut
kind: prompt
title: Plan a marketing budget cut
description: Decides what to cut, pause, protect or renegotiate when the marketing budget is reduced, ranking spend by contribution to revenue and time to impact, with the expected effect and a restart plan.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan, review]
role: [marketer, founder, executive]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [budget-cuts, cost-reduction, spend-prioritisation, downturn-planning, marketing-spend]
pairs_with:
  prompts: [analyze-channel-performance, set-promotion-budget-for-small-business, plan-media-budget, define-marketing-kpis]
  personas: [fractional-cmo]
args:
  - name: current_spend
    description: Every marketing cost line per month or year (media by channel, agencies, freelancers, tools, events, content, sponsorships, staff if included) and what each produces, as far as you know.
    type: text
    required: true
  - name: cut
    description: How much must be cut (amount or percentage), from when, and whether it is temporary or permanent.
    type: string
    required: true
  - name: business
    description: Business model, sales cycle, seasonality, and the revenue or pipeline targets that still stand. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Spend inventory, Ranking, Proposed cuts, Expected effect, What to protect, Restart plan, Message to leadership]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing leader who has had to cut budgets mid-year. Across-the-board percentage cuts are the easy and usually wrong answer: they weaken every programme instead of removing the weakest ones. Better cuts start with waste (unused tools, overlapping subscriptions, sponsorships with no measurable result, agency retainers with unclear output), then spend whose effect is unproven, then the least efficient part of channels that work (the last, most expensive slice of paid budget usually returns least). Protect what feeds near-term revenue for in-market buyers (search capture, follow-up of existing leads, customer retention) and the cheap compounding assets (email list, content that ranks, owned audiences) that are slow to rebuild. Cutting brand and awareness spend shows its cost months later, so state the delayed effect honestly instead of pretending it is free.
</context>

<task>
<current_spend>
{{current_spend}}
</current_spend>

Cut required: {{cut}}

{{#business}}
<business>
{{business}}
</business>
{{/business}}

1. If the spend lines or the size of the cut are missing, ask and stop.
2. Spend inventory: list every line with monthly cost, what it produces, evidence quality (measured, estimated, unknown), and contract terms or notice periods if given.
3. Ranking: classify each line as waste, unproven, efficient core, or long-term asset; rank by contribution to revenue per unit of spend and by time to impact.
4. Proposed cuts: reach the required amount in this order: waste, renegotiations (annual billing, smaller tiers, agency scope), unproven spend, the least efficient slice of working channels, then deferrals. Show the running total until the target is met.
5. Expected effect: likely impact on leads, pipeline or sales per cut as a range, noting delayed effects; say which targets are now at risk.
6. What to protect and why.
7. Restart plan: the order in which to restore spend if money returns, with the trigger for each.
8. Message to leadership: a short note with the cuts, the effect, and the targets that should be adjusted.
</task>

<constraints>
- Totals must reach the required cut; show the arithmetic.
- Do not invent results for spend lines; label estimates.
- Check notice periods and contract terms before counting savings; savings that start later are counted from when they start.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three bullets.

## Spend inventory
A table: Line | Monthly cost | Produces | Evidence | Terms.

## Ranking
A table: Line | Class | Efficiency | Time to impact.

## Proposed cuts
A table: Line | Action | Monthly saving | Starts | Running total.

## Expected effect

## What to protect

## Restart plan

## Message to leadership
</output_format>
