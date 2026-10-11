---
schema: 1
id: choose-first-products-to-sell
kind: prompt
title: Choose the first products to sell
description: Picks the launch range for a new shop or online seller from your candidate products, scored on demand evidence, margin after all costs, shipping, competition and stock risk.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, individual]
subject: [ecommerce]
requires: [none]
inputs: [text, dataset]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [launch-range, product-selection, landed-cost, opening-stock, hero-product]
pairs_with:
  prompts: [plan-online-store, plan-shop-opening, vet-new-supplier, estimate-startup-costs]
args:
  - name: candidates
    description: The products you are considering, with for each what you know - supplier cost, minimum order, size and weight, planned price, competitors' prices and any demand evidence.
    type: text
    required: true
  - name: setup
    description: Where you will sell (own website, marketplace, market stall, physical shop), the country, your budget for opening stock, and storage space.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Margin check, Scoring, Launch range, Stock plan, What to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help new sellers choose what to launch with. Beginners launch too many products, buy deep stock of untested items, and price from the supplier cost alone. Experienced retailers start with a small, coherent range around one or two hero products, check the margin after every cost that lands on a unit (shipping in, duties, packaging, platform and payment fees, outbound shipping or free-delivery subsidy, returns and breakage), and favour products that are light, sturdy, non-seasonal and easy to describe. They keep minimum order quantities inside a budget they can afford to lose, and plan a reorder only after sales data arrives.

<candidates>
{{candidates}}
</candidates>

<setup>
{{setup}}
</setup>
</context>

<task>
1. Margin check: for each candidate, compute landed cost per unit (supplier cost plus inbound shipping, duties and packaging), the fees and outbound costs per sale for the stated channel, and the contribution per unit and margin at the planned price. Mark any missing cost as `[needed]` and do not finish that margin silently.
2. Score each candidate 1-5 on demand evidence, contribution per unit, shipping and handling ease, competition and differentiation, stock risk (minimum order, shelf life, sizes and variants, seasonality), and regulatory or safety burden (electricals, cosmetics, children's products, food). Give a reason per score.
3. Choose a launch range of three to eight products, including one or two hero products and items that sell together. Explain why each is in or out.
4. Stock plan: units to buy of each for the first order, within the opening stock budget, with the reasoning (test quantities, minimum orders, lead times). Say when to reorder and which sales signal to wait for.
5. List what to verify before buying: samples, supplier checks, product safety or labelling rules for the country and channel, marketplace category restrictions, and real shipping quotes.
</task>

<constraints>
- Use only the costs and prices given. Do not invent supplier prices, fees or competitor prices; where a typical fee level matters, say it must be checked for the specific platform.
- Never treat a product as compliant; list product safety, labelling and certification as checks for the country of sale.
- Keep the first order inside the stated budget and storage space, and flag any minimum order that would force a large bet on one item.
- Say plainly if no candidate makes a workable margin at the planned price.
</constraints>

<output_format>
## Margin check
Table: Product | Landed cost | Price | Fees and outbound per sale | Contribution | Margin %.
## Scoring
Table: Product | Demand | Contribution | Shipping | Competition | Stock risk | Regulatory | Total, with short reasons.
## Launch range
Bullets: the chosen products, hero products marked, and why the others wait.
## Stock plan
Table: Product | First order units | Cost | Reorder signal.
## What to verify
Checklist.
</output_format>
