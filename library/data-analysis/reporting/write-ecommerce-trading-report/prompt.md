---
schema: 1
id: write-ecommerce-trading-report
kind: prompt
title: Write a weekly online store trading report
description: Writes a weekly trading report for an online store with sales split into traffic, conversion and order value, margin after discounts, top and falling products, returns and stock risks.
category: reporting
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, manager, marketer, operations-manager]
subject: [ecommerce, retail]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [trading-report, average-order-value, conversion-rate, weeks-of-cover, product-performance]
pairs_with:
  prompts: [decompose-revenue-change, analyze-inventory-data, write-weekly-metrics-update, compare-period-performance]
args:
  - name: trading_data
    description: "The week's figures: sessions, orders, conversion rate, revenue gross and net of discounts and returns, average order value, units, gross margin if known, sales by product with stock on hand, and the same week last year and last week."
    type: text
    required: true
  - name: context
    description: "Promotions, launches, email sends, ad spend changes, stock-outs, site problems or holidays this week and last year's equivalent week; sales channels included (own site, marketplaces). Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Headline numbers, Sales drivers, Products, Stock risks, Actions for next week, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Online retailers run the business on a weekly trading report, and the good ones read it the same way every week. Revenue is broken into its drivers, sessions times conversion rate times average order value, so a fall can be traced to traffic, to the site or offer, or to basket size. The fair comparison is the same week last year aligned by weekday and by promotion calendar, because Black Friday or a public holiday landing in different weeks makes a raw comparison meaningless. Revenue bought with discounts is not the same as full-price revenue, so trading margin after discounts, and net sales after returns, matter as much as the top line. Product performance is judged on sales and margin, and falling bestsellers are often a stock problem rather than a demand problem: a product that sold out mid-week shows lower sales while demand was fine. Stock risk is expressed as weeks of cover (stock on hand divided by recent weekly unit sales), with bestsellers under a few weeks of cover and lead time flagged, and slow lines with many months of cover flagged for markdown.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<trading_data>
{{trading_data}}
</trading_data>

1. Report the headline numbers against last week and the same week last year: revenue gross and net, orders, sessions, conversion rate, average order value, units, discount rate and margin where given.
2. Decompose the change in revenue into traffic, conversion and average order value effects and say which drove it.
3. Link movements to the context supplied (promotions, sends, stock-outs, site problems); where none fits, say the cause is not in the data.
4. List the top products and the biggest fallers by revenue and margin, checking whether fallers were out of stock.
5. Compute weeks of cover for key products, flag bestsellers at risk of selling out within lead time and slow lines with excess cover.
6. Give three to five actions for next week tied to the numbers.
</task>

<constraints>
- Compute only from the data given; show the arithmetic for the driver decomposition.
- Do not compare with last year without checking the promotion and holiday calendar alignment; say when weeks are not comparable.
- Do not read a stock-out as falling demand.
- Do not invent margins, lead times or benchmarks; if margin or lead time is missing, say what the reader should supply.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three sentences: revenue against last year and last week, the main driver, the top action.

## Headline numbers
Table: Measure | This week | Last week | Same week last year | Change against last year.

## Sales drivers
Decomposition: traffic, conversion and order value effects, with one sentence on the cause.

## Products
Table: Product | Revenue | Units | Margin | Change | Note (stock-out, promotion).

## Stock risks
Table: Product | Stock | Weekly units | Weeks of cover | Risk.

## Actions for next week
Numbered actions with the figure behind each.

## Data notes
Bullets: comparability, missing data, channel coverage.
</output_format>
