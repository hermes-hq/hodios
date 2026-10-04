---
schema: 1
id: plan-retail-shelf-launch
kind: prompt
title: Plan a retail shelf launch
description: Plans launching a physical product into shops - the sell-in pitch, terms to check, shelf-ready packaging, in-store material, staff briefing, stock and the first 12 weeks of rate-of-sale reviews.
category: product-launch
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [founder, product-manager, marketer, sales-rep]
subject: [retail]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sell-in, rate-of-sale, listing-fees, shelf-ready-packaging, point-of-sale, replenishment]
pairs_with:
  prompts: [set-product-cost-target, plan-seasonal-product-calendar, brief-frontline-staff-on-release]
args:
  - name: product_and_retailers
    description: The product, price, what is different about it, current sales (online, markets, independents), and the retailers you are pitching or have been listed with, with store count and any terms offered.
    type: text
    required: true
  - name: launch_date
    description: Optional. The date the product should be on shelf, if known.
    type: string
  - name: budget
    description: Optional. Money available for listing fees, promotions, in-store material, samples and demos.
    type: text
output_contract:
  format: markdown
  sections: [Launch summary, Sell-in pitch, Terms to check, Shelf readiness, In-store activation, Stock plan, First 12 weeks, Budget and risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan retail launches for consumer-goods founders, food and drink brands and makers moving from markets and online into shops. Getting a listing is the start, not the finish: retailers judge a new product on its rate of sale (units per store per week) against the products around it, and slow sellers are delisted at the next range review. Launches fail when the brand spends everything on getting in and nothing on getting the product off the shelf, when stock runs out in week three, and when terms such as listing fees, promotional funding, deductions and payment terms quietly wipe out the margin.
{{#launch_date}}
Target on-shelf date: {{launch_date}}
{{/launch_date}}
{{#budget}}
Budget: {{budget}}
{{/budget}}
</context>

<task>
Product and retailers:

<product_and_retailers>
{{product_and_retailers}}
</product_and_retailers>

1. Sell-in pitch for the buyer, in their language: the category opportunity, who the shopper is and why this product brings new or more valuable shoppers, evidence of demand (the user's sales data), margin for the retailer, the marketing support you will fund, and supply reliability. One page.
2. Terms to check before signing, as questions: listing or slotting fees, promotional funding expected, sale-or-return, payment terms, deductions for damages, compliance or late delivery, barcode and product data requirements, delivery to stores or distribution centre, minimum service levels.
3. Shelf readiness: packaging that works at shelf distance (name, flavour or variant and price point visible), shelf-ready outer cases, barcodes, labelling to confirm for the country, case sizes the retailer accepts.
4. In-store activation: point-of-sale material the retailer allows, sampling or demos, a short briefing for store staff, and the first promotion with its cost.
5. Stock plan: initial order per store, weeks of cover, replenishment lead time, safety stock, and what happens if it sells faster or slower than planned.
6. First 12 weeks: a target rate of sale and how it was set (retailer guidance or the user's benchmark; if none, ask the buyer), weekly tracking, review points at weeks 4, 8 and 12 with actions for each outcome (behind, on track, ahead).
7. Budget and risks: where the money goes, and the risks with mitigations.
</task>

<constraints>
- Do not invent retailer terms, fees, margins or rates of sale. Use the user's; otherwise ask, or show a placeholder [X] with a note to get it from the buyer.
- Labelling, food or product safety and barcode rules are items to confirm for the country, not statements of regulation.
- Show stock and margin arithmetic so it can be checked.
- Be honest when the terms or budget make the listing unprofitable; say so and suggest a smaller trial (fewer stores, one region).
- If the product or target retailers are missing, ask for them and stop.
</constraints>

<output_format>
## Launch summary
Five bullets: retailer, stores, on-shelf date, target rate of sale, biggest risk.

## Sell-in pitch
The one-page pitch.

## Terms to check
Checklist of questions for the buyer.

## Shelf readiness
Checklist.

## In-store activation
Table: activity | timing | cost | owner placeholder.

## Stock plan
Table: stores | units per store | weeks of cover | reorder point | lead time, with arithmetic.

## First 12 weeks
Table: week | measure | target | action if behind | action if ahead.

## Budget and risks
Budget table, then risks with mitigations.
</output_format>
