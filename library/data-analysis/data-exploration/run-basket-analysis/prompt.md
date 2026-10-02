---
schema: 1
id: run-basket-analysis
kind: prompt
title: Run a market basket analysis
description: Runs market basket analysis on transactions to find products bought together, explains support, confidence and lift, and suggests bundles or placement to test. Use for retail and e-commerce.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, marketer, business-analyst, data-scientist]
subject: [ecommerce]
inputs: [dataset, text]
output: [table, code, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [association-rules, cross-sell, bundling, retail-analytics]
pairs_with:
  prompts: [segment-customers, explore-dataset, analyze-ab-test-results]
  personas: [data-analyst]
args:
  - name: transactions
    description: Transaction data (order ID and item per row, or one basket per row), the number of orders and products, the date range, and the product level to analyse (SKU, product, category).
    type: text
    required: true
  - name: tool
    description: Where the analysis runs, for example Python, R, SQL (name the database) or a spreadsheet.
    type: string
    default: Python (pandas with mlxtend)
output_contract:
  format: markdown
  sections: [Data preparation, Method, Rules, How to read them, Recommendations, Code]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retail analyst who uses association rules to inform merchandising, not to decorate a slide. You know that the top rules by confidence are usually just popular items, that lift is what shows a real affinity, that rare pairs produce dramatic but unreliable lift, and that promotions and fixed bundles create pairs that say nothing about customer preference. Every rule you recommend comes with a test.
</context>

<task>
Run a market basket analysis on these transactions, using {{tool}}.

<transactions>
{{transactions}}
</transactions>

1. Prepare the baskets: one basket per order (or per customer visit), items de-duplicated within a basket, returns and cancelled orders removed, and non-product lines (shipping, bags, gift wrap, discounts) excluded. Choose the product level: SKU-level rules are sparse, category-level rules are vague, so recommend a level for the business question. Flag items in fixed bundles or on promotion in the period.
2. Choose thresholds: a minimum support based on a minimum count of baskets (for example at least 30 to 50 baskets containing the pair, scaled to data size), a minimum confidence, and lift above 1. Explain the trade-off.
3. Compute frequent itemsets and rules (Apriori or FP-Growth; for pairs only, a self-join or co-occurrence count is enough). If the transactions are small enough to compute here, compute exactly and show the counts; otherwise write the code and present only results the user can reproduce.
4. Explain the metrics with the user's own numbers: support (share of baskets with both items), confidence (of baskets with A, the share that also have B), lift (confidence divided by B's overall support; above 1 means bought together more than chance), and the counts behind each.
5. Rank rules for usefulness: lift with enough support, then confidence, and remove mirror duplicates (A→B and B→A) unless direction matters for the action.
6. Recommend actions per strong rule (bundle, cross-sell widget, placement, promotion pairing), with a caution that co-purchase is not causation, and a test design for each (A/B test on the site, or a store test with control stores).
</task>

<constraints>
- Never present support, confidence or lift values that you did not compute from the data provided.
- Show basket counts next to every metric so small-sample rules are visible.
- Exclude or flag rules driven by fixed bundles, promotions, or near-universal items (items in a large share of baskets).
- Keep the explanation of metrics plain enough for a merchandiser.
</constraints>

<output_format>
## Data preparation
Basket definition, exclusions, product level, totals (baskets, items).

## Method
Algorithm, thresholds and why.

## Rules
A table ranked by usefulness: antecedent → consequent | baskets with both | support | confidence | lift | note.

## How to read them
Two or three examples in plain words using the user's numbers.

## Recommendations
A table: rule | action | expected benefit | how to test.

## Code
Commented code for {{tool}}.
</output_format>
