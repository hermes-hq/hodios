---
schema: 1
id: analyze-site-search-for-demand
kind: prompt
title: Analyse site search for unmet demand
description: Analyses on-site search queries to find unmet needs, missing products or content and zero-result terms, clusters them and ranks the fixes by search volume and business value.
category: user-feedback
version: 1.0.0
status: incubating
stage: [discover]
role: [product-manager, marketer, data-analyst, content-creator]
inputs: [dataset, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [site-search, zero-results, search-analytics, unmet-demand, query-clustering]
pairs_with:
  prompts: [mine-audience-questions, analyze-conversion-funnel, triage-feature-requests]
args:
  - name: queries
    description: Your site search export with a count per query, and if available results returned, clicks, exits after search and conversions. Paste CSV or a table; the more rows the better.
    type: text
    required: true
  - name: product
    description: What the site offers (catalogue, help centre, content or app), its main sections and anything you know is missing, so queries can be matched to what exists.
    type: text
    required: true
  - name: site_type
    description: The kind of site, which changes what a valuable fix looks like.
    type: enum
    enum: [ecommerce, saas-help, content, marketplace]
    default: ecommerce
output_contract:
  format: markdown
  sections: [Data check, Query clusters, Zero and low results, Unmet demand ranked, Quick fixes, Bigger bets, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product analyst who mines internal site search for demand. People typing into a search box are telling you, in their own words, what they want from you right now. Queries with zero results, or results nobody clicks, show four different problems that need different fixes: the thing exists but search cannot find it (a synonym, spelling or indexing problem), the thing exists but is named differently (a vocabulary gap), the thing does not exist but could (a product, content or feature gap), or the query is out of scope. Raw counts mislead until queries are normalised: "running shoes", "runing shoe" and "trainers for running" are one need.
</context>

<task>
Analyse these {{site_type}} site search queries for unmet demand.

<product>
{{product}}
</product>

<queries>
{{queries}}
</queries>

1. Data check: number of distinct queries and total searches, the date range if given, which columns exist (results, clicks, exits, conversions). If there are no counts at all, ask for an export with counts and stop.
2. Normalise and cluster: merge misspellings, plurals, word order and synonyms into clusters that express one need. Give each cluster a plain name, its member queries (top few), and total searches.
3. Zero and low results: list clusters where results were zero or clicks were very low relative to searches. For each, classify the cause: findability (exists, search misses it), vocabulary (exists under another name), gap (does not exist), or out of scope. Base "exists" only on what the product description says; otherwise mark it "check catalogue".
4. Unmet demand ranked: rank the gap and findability clusters by searches and by business value for a {{site_type}} site (for example likely purchase intent for ecommerce, support deflection for a help centre, engagement for content, liquidity for a marketplace). Explain the value reasoning in a few words.
5. Quick fixes: synonyms, redirects, spelling tolerance, renamed labels and pinned results that would fix findability and vocabulary problems this week.
6. Bigger bets: the gaps worth investigating as new products, content or features, each with the evidence and the question to answer before building.
7. Before replying, check that cluster totals add up from the member query counts and that every ranked item appears in the data.
</task>

<constraints>
- Use only the counts given; do not estimate revenue unless conversion data is provided, and then show the calculation.
- Queries may contain personal data (emails, order numbers, names); do not repeat it, and recommend excluding it from future exports.
- Searchers are a subset of visitors; say so instead of extrapolating to all users.
- Mark judgements about what exists on the site as based on the product description.
</constraints>

<output_format>
## Data check
## Query clusters
A table: Cluster | Example queries | Searches.
## Zero and low results
A table: Cluster | Searches | Results or clicks | Cause.
## Unmet demand ranked
Numbered: cluster, searches, value reasoning, fix type.
## Quick fixes
## Bigger bets
## Caveats
</output_format>
