---
schema: 1
id: plan-wholesale-pricing
kind: prompt
title: Plan wholesale and distributor pricing
description: Sets wholesale and distributor prices and trade terms from your retail price and costs - margin chain, minimum orders, payment terms and conflicts with your own direct sales.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, sales-rep]
requires: [none]
inputs: [text, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [wholesale-pricing, trade-terms, margin-chain, distributor-margin, channel-conflict]
pairs_with:
  prompts: [pitch-to-stockists, write-wholesale-line-sheet, recruit-resellers, choose-distribution-channels]
  personas: [small-business-advisor]
args:
  - name: products
    description: Your products with unit cost (materials, making, packaging), current retail or direct price, and any shipping or fulfilment cost per order.
    type: text
    required: true
  - name: channels
    description: Who you plan to sell to - independent shops, chains, distributors, online marketplaces - what margins they expect if you know, typical order sizes, and how much you sell direct today.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Margin chain, Price list, Trade terms, Channel conflict, Risks and checks, Questions to resolve]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help makers and brands price for trade. The common mistake is setting the retail price first from cost, then discovering there is no room for a shop's margin, let alone a distributor's. Wholesale pricing works backwards from the price the end customer will pay: retailers commonly expect to roughly double the wholesale price (keystone), and distributors take their own margin on top, but these expectations vary a lot by sector and country, so treat them as guides to confirm. The brand must still make a healthy margin at the lowest price in the chain. Trade terms (minimum order, payment terms, carriage paid threshold, returns, exclusivity) are as important as price. And selling direct cheaper than your stockists sell is the quickest way to lose them.
</context>

<task>
Plan wholesale pricing for:

<products>
{{products}}
</products>

<channels>
{{channels}}
</channels>

1. For each product, build the margin chain backwards from the recommended retail price: retailer margin, distributor margin if used, your wholesale and distributor prices, and your own margin at each, against full unit cost (including packaging and the share of shipping you pay). Show arithmetic.
2. Flag products where your margin at the distributor price is too thin to sustain, and give options: raise the retail price, cut cost, sell those items direct only, or set a higher minimum order.
3. Propose a price list: wholesale price, recommended retail price (as a recommendation, not a requirement), and distributor price, with volume tiers only if they still leave enough margin.
4. Propose trade terms: minimum first order and reorder, payment terms for new and established accounts, carriage paid threshold, returns and damaged goods, samples and testers, exclusivity (if any) with conditions.
5. Channel conflict: compare your direct price, any marketplace price, and stockists' retail price; set a rule so you do not undercut stockists (for example keep direct prices at the recommended retail price and avoid deep direct-only discounts).
6. Risks and checks: cash flow from payment terms, minimums that block small shops, and the legal point that in many countries you can recommend but not dictate resale prices.
7. List questions to resolve before publishing the price list.
</task>

<constraints>
- Use only the costs and prices given. Margin expectations not supplied are `assumption` and labelled as varying by sector and country.
- Show every calculation so the user can redo it in a spreadsheet.
- Do not tell the user to fix stockists' resale prices; recommended prices only, and suggest checking competition law locally.
- If unit cost is missing, ask for it before pricing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Margin chain
Table per product: Level | Price | Margin to that party | Our margin.

## Price list
Table: Product | Wholesale | Distributor | Recommended retail | Notes.

## Trade terms
Bullets.

## Channel conflict
Rule and the price comparison behind it.

## Risks and checks
Bullets.

## Questions to resolve
Bullets.
</output_format>
