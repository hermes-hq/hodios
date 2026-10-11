---
schema: 1
id: analyze-competitor-price-data
kind: prompt
title: Analyse competitor price data
description: Matches your products to competitors' equivalents, builds a price index by category and competitor, and flags where you are priced out of line on the items shoppers actually compare.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [business-analyst, founder, marketer, data-analyst]
requires: [none]
subject: [ecommerce, retail]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [price-index, competitor-pricing, product-matching, price-positioning, key-value-items]
pairs_with:
  prompts: [estimate-price-elasticity, analyze-competitors, analyze-sales-data, analyze-price-realisation]
  personas: [data-analyst]
args:
  - name: price_data
    description: Your products with price, cost if known and sales volume, plus competitor prices collected (competitor, product name or code, price, date, in stock or not, delivery cost if online). Say how and when prices were collected.
    type: text
    required: true
  - name: positioning
    description: Where you mean to sit (for example "price match the main rival on essentials, premium on own brand", "cheapest in town on tyres") and the competitors that matter most.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Matching, Price index, Out-of-line items, Where you have room, Code, Next collection]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retail pricing analyst. Competitor price comparisons fail in two places. First, matching: comparing a 500 g pack with a 450 g pack, a branded item with a private label, or a price without the shipping fee that the shopper actually pays. Matches should be exact (same product code or model), equivalent (same size and grade, different brand) or not comparable, and only the first two go into an index. Second, weighting: a simple average of price gaps lets a hundred items nobody buys outweigh the twenty items shoppers use to judge whether a shop is cheap (key value items). A sales-weighted index, with key value items reported separately, shows how shoppers actually experience your prices.
</context>

<task>
Analyse this competitor price data.

<price_data>
{{price_data}}
</price_data>

{{#positioning}}Intended positioning: {{positioning}}{{/positioning}}

1. Data checks: collection dates (prices older than a few weeks or taken during a competitor's promotion distort the picture), out-of-stock items, promotional versus regular prices, unit sizes, prices including or excluding tax, and delivery fees or minimum orders for online competitors.
2. Matching: classify each pair as exact, equivalent (normalise to price per unit, kg or litre) or not comparable, with the rule used; report the match rate per competitor and category.
3. Price index: per competitor and category, your price divided by theirs times 100 on matched items, both unweighted and weighted by your sales revenue. Above 100 means you are dearer. Show the index for key value items separately (if not given, propose the top sellers and most-searched items as a starting list).
4. Out-of-line items: items more than a set threshold (state it, for example 10%) above the index target for their category, ranked by your sales value, and items far below competitors where you may be giving away margin.
5. Where you have room: categories or items where you are cheapest by a wide margin on low-attention products, with margin impact of a modest increase, stated as a range with volume risk.
6. Give runnable code (pandas or spreadsheet formulas) for matching by unit price and computing the weighted index.
7. Next collection: what to collect, how often and from which competitors to keep the index useful.
</task>

<constraints>
- Never infer a competitor's prices, costs or strategy beyond the data supplied.
- Exclude not-comparable pairs from the index and say how many were excluded.
- Price changes are the user's decision; give options with margin and volume trade-offs, not instructions. Note that coordinating prices with competitors is unlawful in most countries; analyse public prices only.
- Collecting competitor prices must respect the sites' terms and the law in the user's country; do not suggest bypassing access controls.
</constraints>

<output_format>
## Headline
Your weighted index against each main competitor and on key value items, in one or two sentences.

## Data checks
Bullets.

## Matching
Table: Competitor | Items collected | Exact | Equivalent | Not comparable.

## Price index
Table: Competitor | Category | Unweighted index | Sales-weighted index | KVI index.

## Out-of-line items
Table: Item | Your price | Competitor price | Gap | Your sales value | Note.

## Where you have room
Bullets with margin range.

## Code
One code block.

## Next collection
Bullets.
</output_format>
