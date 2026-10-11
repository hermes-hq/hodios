---
schema: 1
id: audit-meta-ads-account
kind: prompt
title: Audit a Meta ads account
description: Audits a Meta ads account for tracking, structure fragmentation, audience overlap, creative fatigue, placements and settings, with fixes ranked by expected impact.
category: advertising
version: 1.0.0
status: incubating
stage: [review]
role: [marketer, consultant, founder]
requires: [none]
inputs: [dataset, text, image]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [meta-ads, account-audit, creative-fatigue, audience-overlap, event-match-quality, wasted-spend]
pairs_with:
  prompts: [structure-meta-ads-account, diagnose-ad-fatigue, set-up-server-side-conversions, analyze-ad-performance]
  personas: [paid-media-specialist]
  workflows: [ad-account-turnaround-track]
args:
  - name: account_data
    description: Exports or screenshots of campaigns, ad sets and ads for the last 30 to 90 days with spend, results, cost per result, CPM, CTR, frequency and ROAS, plus settings (objective, optimisation event, budget type, attribution, targeting, placements).
    type: text
    required: true
  - name: business
    description: What you sell, target cost per result or ROAS, and how results compare with sales in your own systems.
    type: text
    required: true
  - name: tracking_notes
    description: Pixel and Conversions API setup, Events Manager diagnostics, event match quality, and any recent tracking changes. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Tracking, Structure and delivery, Audiences, Creative, Fixes ranked by impact]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user wants an honest audit of a Meta (Facebook and Instagram) ads account. Most underperforming Meta accounts share the same problems, in roughly this order of cost: tracking that misses or double-counts conversions (no Conversions API, broken deduplication, wrong event as the optimisation goal); too many small ad sets stuck in learning; prospecting and retargeting audiences overlapping so the account bids against itself; too few creatives, or the same concept in many sizes, so frequency climbs and results decay; budgets spread evenly instead of following results; and settings left on defaults that do not fit (attribution window, placements, objective). An audit is useful only if it puts a money figure or a clear impact estimate on each finding and says what to do first.
</context>

<task>
Business: {{business}}
<account_data>
{{account_data}}
</account_data>
{{#tracking_notes}}Tracking: {{tracking_notes}}{{/tracking_notes}}

1. If the data lacks results, costs or settings needed for a section, say which and continue with what is there.
2. Tracking: compare reported results with the business's own numbers if given; check Conversions API and deduplication, event match quality, optimisation event choice and attribution setting. Mark tracking findings as blockers when other conclusions depend on them.
3. Structure and delivery: count campaigns and ad sets with spend, estimate weekly optimisation events per ad set, flag those likely stuck in learning, check budget type and distribution, objective fit, and duplicated or competing campaigns.
4. Audiences: overlap between ad sets, missing exclusions (purchasers in prospecting, existing customers), audiences too narrow for the budget, use of broad or Advantage+ audience, and special ad category correctness.
5. Creative: number of active ads and distinct concepts, spend concentration, frequency and CTR trends per ad, signs of fatigue, format and placement coverage (vertical video for Reels and Stories), and missing angles.
6. Fixes ranked by impact: each fix with the evidence, the expected effect (money saved or results gained, estimated from the data and labelled as an estimate), effort, and order. Separate quick wins from structural changes, and say what not to change at the same time.
</task>

<constraints>
- Base every finding on the data supplied; label estimates and assumptions; do not invent benchmarks for CPM, CTR or ROAS.
- Do not state Meta thresholds or policies as fact; tell the user to confirm in Meta's current help.
- Do not recommend restructuring everything at once; sequence changes so results can be attributed and learning is not reset across the whole account.
- If the account data shows a tracking failure, say that performance conclusions are unreliable until fixed.
</constraints>

<output_format>
## Summary
Five lines: overall health, the biggest problem, the estimated waste or upside, and the first three actions.

## Tracking
Findings with evidence and severity.

## Structure and delivery
Findings with a table: Campaign or ad set | Spend | Weekly events | Issue.

## Audiences
Findings with evidence.

## Creative
Findings with a table: Ad | Spend share | Frequency | CTR trend | Verdict.

## Fixes ranked by impact
A table: Rank | Fix | Evidence | Expected impact | Effort | When.
</output_format>
