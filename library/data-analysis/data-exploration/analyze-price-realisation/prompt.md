---
schema: 1
id: analyze-price-realisation
kind: prompt
title: Analyse price realisation and discount leakage
description: Analyses list versus net price by customer, sales rep and product with a price waterfall, to find where negotiated discounts and off-invoice deductions leak margin without a reason.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, review]
role: [business-analyst, financial-analyst, sales-rep, executive]
requires: [none]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [price-waterfall, pocket-price, discount-leakage, b2b-pricing, price-band]
pairs_with:
  prompts: [analyze-discount-effectiveness, decompose-revenue-change, analyze-customer-profitability, estimate-price-elasticity]
  personas: [data-analyst]
args:
  - name: invoice_data
    description: Invoice lines with customer, product, quantity, list price, invoice price and discounts, plus any off-invoice items (rebates, free freight, payment terms discounts, marketing funds). Say the period and number of lines.
    type: text
    required: true
  - name: pricing_policy
    description: How prices are supposed to work - list or price book, discount authority by role, volume tiers, contract prices - so deviations can be judged.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Price waterfall, Price band, Leakage by rep and customer, Explained and unexplained discounts, Recovery opportunity, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a B2B pricing analyst. Most margin leakage is not in list prices but in the gap between list and what the business actually keeps: on-invoice discounts, then off-invoice rebates, freight, early-payment discounts and promotional funds that never appear on the invoice. The net figure after all of these is the pocket price, and the waterfall from list to pocket shows where money goes. The tell-tale sign of leakage is a wide price band: customers of similar size buying the same product at very different pocket prices. Some spread is justified by volume or strategic accounts; the rest is negotiation habit.
</context>

<task>
Analyse price realisation in this data.

<invoice_data>
{{invoice_data}}
</invoice_data>

{{#pricing_policy}}Pricing policy: {{pricing_policy}}{{/pricing_policy}}

1. Data checks: credit notes and returns (net them to the original line where possible), free-of-charge lines, currency, list prices that changed during the period (use the list price in force on the invoice date), and off-invoice items that need to be allocated to lines. State the allocation rule (for example a customer's annual rebate spread by revenue).
2. Price waterfall: total and per unit, from list price through each on-invoice discount to invoice price, then each off-invoice element to pocket price, as amounts and percentages of list.
3. Price band: for each major product, the spread of pocket price as a percentage of list across customers (for example 10th to 90th percentile), plotted or tabled against customer annual volume. A healthy pattern slopes down with volume; a cloud means discounts are not tied to volume.
4. Leakage by rep and customer: average discount and its spread by sales rep, region and customer, with volume. Flag customers getting deeper discounts than larger customers, and reps whose discounts sit well above peers selling similar products to similar customers.
5. Explained and unexplained discounts: model expected discount from volume tier and contract terms (a simple tier table or regression), and report the unexplained portion by rep and customer.
6. Recovery opportunity: what pocket margin would be recovered by bringing outliers to, say, the median of their volume band, with the assumption about lost volume stated and a range rather than one figure.
7. Give runnable code (SQL or pandas) for the waterfall and price band.
</task>

<constraints>
- Do not name a rep as a problem on discount level alone; account for product mix, customer size and contract terms, and present findings as questions for a conversation.
- Do not invent off-invoice amounts; if they are missing, say the analysis shows invoice price realisation only and that pocket price will be lower.
- Recovery figures are estimates with stated volume-loss assumptions, never guaranteed savings.
- Check competition or pricing law constraints in the user's country before advising coordinated price changes across customers; do not give legal conclusions.
</constraints>

<output_format>
## Headline
Average pocket price as a percentage of list, the biggest waterfall element, and the size of unexplained leakage.

## Data checks
Bullets, including the off-invoice allocation rule.

## Price waterfall
Table: Element | Amount | Per unit | Percent of list.

## Price band
Table per product: P10 | Median | P90 pocket price percent, and the volume relationship.

## Leakage by rep and customer
Tables with volume and discount spread.

## Explained and unexplained discounts
Method and results.

## Recovery opportunity
Range with assumptions.

## Code
One code block.
</output_format>
