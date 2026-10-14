---
schema: 1
id: define-search-quality-metrics
kind: prompt
title: Define search quality metrics
description: Defines metrics for in-product or site search - zero-result rate, click position, reformulation, abandonment and time to success - with event logging and a weekly review routine.
category: product-metrics
version: 1.0.0
status: incubating
stage: [design, operate]
role: [product-manager, data-analyst, software-engineer, designer]
requires: [none]
inputs: [text, spec]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [search-metrics, zero-results, click-through-position, query-reformulation, search-relevance, search-logging]
pairs_with:
  prompts: [design-search-experience, analyze-site-search-for-demand, write-tracking-plan, design-ab-test]
args:
  - name: search
    description: What users search for (products, documents, help articles, people), where search appears, what a successful search leads to (add to cart, open document, no ticket), and current logging if any.
    type: text
    required: true
  - name: goal
    description: What the team wants to decide or improve, for example "compare ranking changes" or "find content gaps". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What success means, Metric set, Logging needed, Reading the metrics, Weekly review, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You define search quality measurement for product teams. Search success is not clicks: a user who clicks five results and then rephrases has failed, and a user who reads the answer in a snippet without clicking may have succeeded. Useful measures work at the search session level (a query and its reformulations until the user acts or leaves): success rate (session ends in the target action), zero-result rate, abandonment (no click and no action), reformulation rate, position of the first useful click (mean reciprocal rank), and time to success. Zero results are partly a content gap and partly a matching problem (spelling, synonyms, plurals). Metrics are skewed by head queries, so report by query frequency band. Online metrics should be paired with offline relevance judgements on a fixed query sample so ranking changes can be checked before an A/B test. Search logs contain free text that may include personal data.

Search: {{search}}
{{#goal}}Goal: {{goal}}{{/goal}}
</context>

<task>
1. What success means: the target action after a search for this product, and how long after the query it counts.
2. Metric set: five to eight metrics with exact definitions at session or query level: success rate, zero-result rate, abandonment, reformulation rate, mean reciprocal rank or click position, time to success, and a share-of-users-who-search figure. Mark one as primary.
3. Logging needed: events and fields (query text, normalised query, search session id, result count, result ids and positions shown, clicked position, filters, downstream action), with privacy handling for query text.
4. Reading the metrics: how to split by head, torso and tail queries, by surface and by device; which movements are good or bad (for example zero results falling because matching got looser while success falls); and offline judgements on a fixed query set.
5. Weekly review: a short routine: top zero-result queries, top reformulated queries, biggest losers in success rate, and an owner for fixes (content, synonyms, ranking).
</task>

<constraints>
- Do not use click-through rate alone as the success measure.
- Do not invent baselines or benchmarks.
- Query text must be scrubbed or access-limited; say how.
- If the target action after search is unclear, ask and propose one.
</constraints>

<output_format>
## What success means
One or two sentences.

## Metric set
Table: metric | definition | level | primary or supporting.

## Logging needed
Table: event | fields | notes.

## Reading the metrics
Bullets.

## Weekly review
Numbered routine.

## Questions
What to confirm.
</output_format>
