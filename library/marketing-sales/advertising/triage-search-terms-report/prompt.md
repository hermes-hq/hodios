---
schema: 1
id: triage-search-terms-report
kind: prompt
title: Triage a search terms report
description: Sorts a search ads search-terms export into add as keyword, add as negative (with match type and level), watch and ignore, by cost and intent, and builds a reusable negative list.
category: advertising
version: 1.0.0
status: incubating
stage: [operate, review]
role: [founder, marketer, consultant]
requires: [none]
inputs: [dataset, text]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [search-terms, negative-keywords, match-types, search-intent, wasted-spend]
pairs_with:
  prompts: [audit-search-ads-account, write-google-ads, plan-ad-conversion-tracking]
  personas: [local-ads-advisor, paid-media-specialist]
  workflows: [first-search-campaign-track]
args:
  - name: search_terms
    description: The search terms export (CSV or pasted rows) with at least search term, campaign or ad group, matched keyword if available, clicks, cost and conversions. Include the date range.
    type: text
    required: true
  - name: business
    description: What you sell or do, where, what you do not offer (for example "no emergency call-outs", "no wholesale", "UK only"), and price level.
    type: string
    required: true
  - name: target_cpa
    description: The most you can pay per conversion, for example "60 EUR per booked job". Optional; used to set the cost thresholds.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Add as negatives, Add as keywords, Watch, Reusable negative list, Next review]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs search ads for a small business or a client and has exported the search terms report: the real queries that triggered their ads. It is the single best source of wasted spend and new keyword ideas. Triage goes wrong in three ways: adding one-word negatives that block good traffic ("free" also blocks "free quote"), adding negatives as exact match when a phrase would catch the whole family of bad queries (or the reverse), and judging terms on a handful of clicks. The expert sorts by money and intent, not by row order.
</context>

<task>
<search_terms>
{{search_terms}}
</search_terms>

Business: {{business}}
{{#target_cpa}}Target cost per conversion: {{target_cpa}}{{/target_cpa}}

1. If the export lacks cost or conversions, or the business's exclusions are unclear, ask for them in one message and stop; you may name terms whose intent is plainly wrong (jobs, courses, DIY) without costing them. Note the date range; under about 30 days of data, be cautious with "add as keyword".
2. Group terms by intent: buyer intent for this business, research or how-to, jobs and careers, free or DIY, wrong product or service, wrong location, competitor names, and own brand.
3. Set thresholds: a term with no conversions and cost above the target cost per conversion (or, without a target, above the export's average cost per conversion) is waste; under that, it goes to Watch unless the intent is clearly wrong.
4. Add as negatives: for each, the negative to add (often a shorter root rather than the full term), match type (phrase for a family of bad queries, exact to block one query while keeping its relatives, broad only for single unambiguous words), and level (account list, campaign, or ad group to stop two ad groups competing). Check every proposed negative against the terms that converted so it does not block them; flag conflicts.
5. Add as keywords: converting or high-intent terms not yet covered by a keyword, with match type and the ad group they belong in.
6. Watch: promising or ambiguous terms with too little data, and what result would move them.
7. Reusable negative list: generic negatives for this trade or shop type drawn from the patterns (jobs, salary, course, free, DIY, second-hand, wholesale, out-of-area places), each marked as seen in the data or suggested.
</task>

<constraints>
- Work only from the rows supplied; do not invent search volumes or costs.
- Never propose a negative that would block a term that converted; if a root is risky, use exact match on the bad term instead.
- Treat own-brand and competitor terms separately and do not negative them by default; say which decision is needed.
- Totals: state the cost in the export that the proposed negatives would have blocked.
</constraints>

<output_format>
## Summary
Three to five lines: total cost in the export, cost on terms you would block, top waste theme, top opportunity.

## Add as negatives
A table: Negative | Match type | Level | Example terms blocked | Cost blocked | Reason.

## Add as keywords
A table: Keyword | Match type | Ad group | Evidence.

## Watch
A table: Term | Clicks | Cost | Why watch | What would decide it.

## Reusable negative list
Grouped bullets ready to paste into a shared list.

## Next review
When to rerun (usually every one to two weeks for new accounts, monthly once stable) and what to look for.
</output_format>
