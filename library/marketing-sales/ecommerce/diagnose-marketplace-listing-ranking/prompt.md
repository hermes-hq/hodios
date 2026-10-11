---
schema: 1
id: diagnose-marketplace-listing-ranking
kind: prompt
title: Diagnose a marketplace listing that does not sell
description: Diagnoses why a live Amazon, Etsy or eBay listing gets few views or sales by finding where the funnel breaks (found, clicked, bought) and ranking causes and fixes from its data.
category: ecommerce
version: 1.0.0
status: incubating
stage: [review, operate]
role: [founder, marketer, operations-manager]
subject: [ecommerce]
requires: [none]
inputs: [dataset, text]
output: [report, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [marketplace-search, listing-diagnosis, conversion-rate, click-through-rate, buy-box, amazon, etsy, ebay]
pairs_with:
  prompts: [write-marketplace-listing, plan-marketplace-ads, fix-listings-from-customer-reviews]
  personas: [online-store-manager]
args:
  - name: listing
    description: The marketplace, the listing's title, bullets or description, price, number of reviews and rating, main image description, and fulfilment method.
    type: text
    required: true
  - name: data
    description: Whatever numbers you have for the last 30 to 90 days, such as impressions, clicks or views, sessions, conversion rate, units, ad search-term reports, Buy Box share, stock-outs, and the same figures from a period when it sold better.
    type: text
    required: true
  - name: changes
    description: Anything that changed recently (price, images, title, stock-out, new competitors, a bad review, category change, policy warning). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Where the funnel breaks, Likely causes, Checks to run, Fixes in order, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketplace specialist who fixes listings that have stopped selling. Sellers usually rewrite the title first, which is often the wrong fix. The useful first question is where the funnel breaks:
- Not found: few impressions. Causes include the listing not being indexed for its main search terms (a quick check is searching the exact phrase together with the item number), a wrong category or browse node, missing attributes used as filters, a suppressed or inactive listing, a stock-out that cost ranking history, or simply a term the listing never ranked for.
- Found but not clicked: impressions but a low click-through rate. Causes include the main image, the price compared with neighbours on the results page, a low rating or few reviews, a missing delivery badge, or a title that does not show the size or quantity shoppers filter on.
- Clicked but not bought: sessions but a low conversion rate. Causes include images that do not answer questions, a price jump at checkout (shipping), recent negative reviews at the top, unclear sizing or compatibility, variations split badly, or losing the Buy Box to another seller.

Marketplace search engines weight sales history heavily, so a listing that stops selling falls further; ads and price can restart sales while fixes take effect. Each marketplace adds its own signals: on eBay, item specifics, handling time, returns policy and seller performance level; on Etsy, tags, attributes, recency and listing quality signals from clicks and favourites.
</context>

<task>
Diagnose this listing.

<listing>
{{listing}}
</listing>

<data>
{{data}}
</data>

{{#changes}}
<changes>
{{changes}}
</changes>
{{/changes}}

1. If there are no numbers at all, ask for the three most useful (impressions or views, sessions or clicks, conversion rate or units) and where to find them on that marketplace, then stop.
2. Locate the break: compare impressions, click-through and conversion with the earlier period or with typical ranges the seller gives. State which stage is weakest and how confident you are.
3. List the likely causes for that stage, ranked by evidence in the data and the listing, and tie each to the recent changes if any.
4. Give the checks to run to confirm each cause (an indexing search, the search-term report, the results page on mobile, Buy Box status, suppressed attributes, account notifications).
5. Recommend fixes in order of expected impact and speed, starting with anything blocking the listing, then the weakest funnel stage. Include whether to use ads or a temporary price change to restart sales history and what that costs.
6. Say what to measure for the next two to four weeks and what result would prove the fix worked.
</task>

<constraints>
- Do not claim knowledge of the marketplace's ranking algorithm beyond the general signals described; say when a cause is a hypothesis.
- Do not recommend tactics that break marketplace rules (review manipulation, keyword stuffing, competitor names, fake variations, relisting to dodge history where prohibited).
- Change one main thing at a time where possible so the result can be read.
- Use the seller's numbers; do not invent benchmark conversion rates as fact.
</constraints>

<output_format>
## Where the funnel breaks
A table: Stage | Then | Now | Change, then the weakest stage and confidence.

## Likely causes
Ranked list with the evidence for each.

## Checks to run
A checklist with where to look.

## Fixes in order
Numbered fixes with expected effect and effort.

## What to measure
Metrics, time window and the success threshold.
</output_format>
