---
schema: 1
id: optimize-shopping-feed
kind: prompt
title: Optimise a shopping product feed
description: Rewrites shopping-ad feed fields (titles, descriptions, product type, custom labels) from a feed sample, front-loading what buyers search, and sets labels for margin and best-sellers to split bidding.
category: advertising
version: 1.0.0
status: incubating
stage: [build, operate]
role: [marketer, founder]
subject: [ecommerce]
requires: [none]
inputs: [dataset, text]
output: [table, rewrite]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [product-feed, shopping-ads, feed-titles, custom-labels, merchant-center, product-taxonomy]
pairs_with:
  prompts: [write-product-description, calculate-break-even-roas, plan-marketplace-ads]
  personas: [paid-media-specialist]
args:
  - name: feed_sample
    description: Ten to fifty rows of your product feed (CSV or pasted) with at least id, title, description, brand, product type or category, price, and any attributes (colour, size, material, gender, age group, GTIN). Add margin or sales rank columns if you have them.
    type: text
    required: true
  - name: store_category
    description: What the shop sells and to whom, for example "women's running shoes", "spare parts for coffee machines", "handmade furniture, UK".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Feed health, Title formula, Rewritten rows, Product type and labels, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user runs shopping ads (product listing ads) driven by a product feed. There are no keywords: the platform matches searches to the feed, mostly from the title, so the feed is the targeting. Most small-shop feeds copy the website's product names ("The Aurora"), which say nothing a buyer types. Strong titles front-load the attributes buyers search for this category in the right order (for apparel: brand, gender, product type, key attribute, colour, size; for parts: brand, part type, compatible model, part number), keep the most important words in the first roughly 70 characters that are shown, and stay truthful. Custom labels let the advertiser split campaigns by margin, best-seller status, season or price band, so bids can reflect what each product earns.
</context>

<task>
<feed_sample>
{{feed_sample}}
</feed_sample>

Store category: {{store_category}}

1. If the sample lacks titles or prices, or has fewer than five rows, ask for a fuller sample in one message and stop.
2. Feed health: missing or weak fields (GTIN or MPN, brand, colour, size, gender, age group, product category), duplicate or vague titles, promotional text in titles ("Free shipping", "SALE", all caps) that is usually disallowed, and descriptions that are too short or stuffed.
3. Title formula for this category: the attribute order, with a one-line reason, and what to drop.
4. Rewrite every row in the sample: new title (keep within about 150 characters with the key terms in the first 70), a short description lead sentence if the current one is weak, and product type path (Category > Subcategory > Type) built from how the shop would group products for bidding.
5. Custom labels (up to five): propose a scheme such as label 0 margin band (high, medium, low from the margin column or price band if no margin), label 1 best-seller or new, label 2 season, label 3 price band, label 4 clearance; assign them to the sample rows where the data supports it, and mark [NEEDED] where it does not.
6. Next steps: how to apply changes at scale (spreadsheet formula, feed rules, supplemental feed), campaign split by label, and what to watch in the product-level report after two to four weeks.
</task>

<constraints>
- Never add attributes that are not in the data or obvious from it (no invented sizes, materials or compatibility); mark gaps with [NEEDED].
- No promotional text, prices or shop names in titles unless the brand is the shop's own; keep claims truthful.
- Label character limits and allowed fields as typical, to be confirmed with the platform's current product data specification.
- Keep product ids unchanged.
</constraints>

<output_format>
## Feed health
A table: Issue | Rows affected | Fix.

## Title formula
The formula and reason.

## Rewritten rows
A table: id | Old title | New title (chars) | Product type | Notes.

## Product type and labels
The label scheme and a table: id | label 0 | label 1 | label 2 | label 3 | label 4.

## Next steps
Numbered list.
</output_format>
