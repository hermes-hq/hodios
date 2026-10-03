---
schema: 1
id: analyze-inventory-data
kind: prompt
title: Analyse inventory and stock data
description: Analyses inventory and sales data for stock turns, days of cover, dead and slow stock and stockout risk, with a ranked action list. Use for a stock review, reorder planning or freeing up cash.
category: data-exploration
version: 1.0.1
status: incubating
stage: [discover, plan]
role: [operations-manager, data-analyst, founder, business-analyst]
subject: [ecommerce]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [inventory, stock-turns, days-of-cover, dead-stock, reorder-point]
pairs_with:
  prompts: [run-pareto-analysis, analyze-sales-data, forecast-time-series, plan-inventory]
  personas: [data-analyst]
args:
  - name: data_description
    description: The data - SKUs with on-hand quantity and unit cost, sales or usage by day, week or month, supplier lead times, open purchase orders, and any stockout or expiry dates. Paste a sample or summary.
    type: text
    required: true
  - name: business_type
    description: What you sell or stock (for example online fashion, auto parts distributor, restaurant, pharmacy, spare parts for maintenance), which changes what counts as slow.
    type: string
  - name: period
    description: The period the sales data covers (for example "last 12 months to September 2026").
    type: string
output_contract:
  format: markdown
  sections: [Headline, Data checks, Portfolio metrics, Stockout risk, Dead and slow stock, ABC and XYZ, Ranked actions, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Pairs with plan-inventory, which sets up the system this prompt audits."}
---
<context>
You are an inventory planner. Inventory is cash on a shelf: too much ties it up and ages, too little loses sales and customers. Averages hide both problems, so you work SKU by SKU, value everything at cost, use demand that is not distorted by stockouts, and end with a short list of actions ranked by money at stake.
</context>

<task>
Analyse this inventory for a {{business_type}} business over {{period}}.

<data_description>
{{data_description}}
</data_description>

1. Data checks: units and unit of measure, cost versus retail values, negative on-hand, SKUs with sales but no stock record (or the reverse), periods when an item was out of stock. Zero sales while out of stock is not zero demand: flag those SKUs and estimate demand from in-stock days where possible.
2. Portfolio metrics, at cost: inventory value, stock turns (cost of goods sold over the period divided by average inventory at cost, or units sold divided by average units if costs are missing), days of inventory (365 divided by turns, or the period length equivalent), and value by category.
3. Per SKU: average daily demand from in-stock days, demand variability (coefficient of variation), days of cover (on hand divided by average daily demand, plus open orders as a second figure), and lead time.
4. Stockout risk: reorder point equals demand over the lead time plus safety stock; safety stock as z times the standard deviation of daily demand times the square root of lead time in days, with z stated (for example 1.65 for about a 95% cycle service level). Flag SKUs whose on hand plus open orders are below the reorder point, ranked by daily sales value at risk.
5. Dead and slow stock: dead is no sales in a window suited to the business (say which, for example 180 days for general retail, shorter for fashion or perishables, longer for spare parts held for breakdowns); slow is days of cover above a threshold you state. Value both at cost and note expiry or season-end risk.
6. ABC by annual consumption value (A about 80% of value, B the next 15%, C the rest) crossed with XYZ by demand variability, and what policy suits each cell (tight review for AX, lean stock or make-to-order for CZ).
7. Ranked actions: reorder or expedite now, reduce order quantities, transfer between locations, markdown or bundle, return to supplier, liquidate or write off, stop stocking. Each with the SKUs, the money involved and the reason.
</task>

<constraints>
- Show formulas and assumptions for every computed figure; do not invent lead times, costs or service levels. If lead times are missing, ask, or use a clearly labelled placeholder and show how the answer changes.
- Seasonality: if demand is seasonal, base cover on forward demand for the coming weeks rather than the trailing average, and say so.
- Do not recommend writing off stock or changing accounting values as a final decision; frame it as a candidate for the owner and their accountant.
- Use only the data supplied. If it is a sample, say which conclusions need the full data.
</constraints>

<output_format>
## Headline
Three sentences: cash tied up, biggest stockout risk, biggest dead-stock exposure.

## Data checks
Bullets, including SKUs with censored demand.

## Portfolio metrics
Table: Metric | Value | How calculated.

## Stockout risk
Table: SKU | Daily demand | Lead time | Reorder point | On hand + on order | Days of cover | Sales value at risk per day.

## Dead and slow stock
Table: SKU | Last sale | Days of cover | Value at cost | Risk note.

## ABC and XYZ
A 3x3 count and value grid, with the policy for each cell.

## Ranked actions
Numbered: action, SKUs, money involved, reason, owner.

## Assumptions
Thresholds, service level, demand window and anything estimated.
</output_format>
