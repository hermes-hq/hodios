---
schema: 1
id: respond-to-competitor-price-cuts
kind: prompt
title: Respond to a competitor's price cut
description: Decides per product how an online shop responds when a competitor undercuts it - hold, match, partly match, bundle or add value - from break-even volume maths, how much shoppers compare, and margin.
category: ecommerce
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, marketer, operations-manager]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, notes]
output: [table, report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [price-war, competitor-pricing, price-matching, break-even-volume, key-value-items, margin]
pairs_with:
  prompts: [analyze-competitor-price-data, price-products-for-online-store, design-product-bundles]
  personas: [online-store-manager]
args:
  - name: situation
    description: Which competitor cut which prices, by how much, since when, on which channels, and what you know about why (clearance, new entrant, marketplace promotion).
    type: text
    required: true
  - name: products
    description: For each affected product, your price, unit contribution or margin, monthly units before and since the cut, stock level, and whether it is the same item or a comparable one.
    type: text
    required: true
  - name: strengths
    description: What you offer that the competitor does not (delivery speed, service, warranty, range, reviews, loyalty). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Situation by product, Break-even maths, Options compared, Recommendation by product, Monitoring and triggers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retail pricing adviser. The reflex to match every cut is expensive: a price cut must win a lot of extra volume to pay for itself. With a contribution margin m (as a share of price) and a price cut c (as a share of price), unit sales must rise by c / (m - c) just to keep the same profit. At a 30 percent margin, a 10 percent cut needs 50 percent more units. If the competitor's cut is temporary (clearance, a marketplace event, a new entrant buying share), matching it costs margin for nothing once they return to normal.

Not every product deserves the same answer. Shoppers compare prices closely on a small set of identical, well-known items (the same branded product, sold on the same marketplace page), and rarely on unique, own-brand or bundled items. Matching on the few items shoppers compare while holding the rest protects both perception and margin. Other responses are often better than price: a bundle or gift with purchase, faster delivery, a stronger guarantee, or shifting ad spend away from terms where the competitor now wins. On marketplaces, automated repricing between sellers can spiral down to cost; set floors.
</context>

<task>
Decide how to respond.

<situation>
{{situation}}
</situation>

<products>
{{products}}
</products>

{{#strengths}}
<strengths>
{{strengths}}
</strengths>
{{/strengths}}

1. If margins or unit sales are missing for the affected products, ask for them and stop.
2. For each product, classify: identical item or comparable; heavily compared by shoppers or not; the cut looks temporary or lasting, and why.
3. Measure the damage so far from unit sales before and since the cut.
4. For each product, calculate the break-even volume uplift for a full match and for a partial match, and the profit if you hold and keep losing volume at the current rate.
5. Compare the options per product: hold, full match, partial match, match on one channel only, bundle or add value, temporary promotion, shift ad spend.
6. Recommend one option per product with the reason, the price floor below which you will not go, and how long to run it before reviewing.
7. Set monitoring: what to track weekly and the triggers that change the decision.
</task>

<constraints>
- Show the break-even arithmetic for each recommendation.
- Do not recommend going below unit cost or the stated floor without naming it as a deliberate, time-limited choice with its cost.
- Do not suggest coordinating prices with competitors or contacting them about prices; that is illegal in most countries.
- Do not assume the cut is permanent or temporary without saying what evidence points each way.
</constraints>

<output_format>
## Situation by product
A table: Product | Identical or comparable | Shopper comparison | Cut temporary or lasting | Volume change so far.

## Break-even maths
A table: Product | Margin | Cut needed to match | Volume uplift needed | Profit if hold.

## Options compared
Short notes per product on the viable options.

## Recommendation by product
A table: Product | Response | Price floor | Review date | Reason.

## Monitoring and triggers
Weekly metrics and the triggers that change each decision.
</output_format>
