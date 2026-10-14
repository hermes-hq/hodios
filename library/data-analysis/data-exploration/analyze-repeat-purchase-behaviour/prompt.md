---
schema: 1
id: analyze-repeat-purchase-behaviour
kind: prompt
title: Analyse repeat purchase behaviour
description: Analyses repeat purchase rate, time to second order and reorder intervals from order data, broken down by first product, channel and cohort, to show what turns buyers into regulars.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, marketer, founder, business-analyst]
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
depth: specific
tags: [repeat-purchase, second-order, purchase-interval, retention, first-product]
pairs_with:
  prompts: [build-cohort-analysis, run-basket-analysis, segment-customers, calculate-customer-lifetime-value]
  personas: [data-analyst]
args:
  - name: order_data
    description: Orders with customer id, order date, products or categories, revenue, discount code and acquisition channel. Say how many customers and the period covered. A sample or summary is fine.
    type: text
    required: true
  - name: product_context
    description: What you sell and how often a customer would naturally need it again (for example coffee every 3 to 4 weeks, sofas every few years), and any subscription or replenishment offer.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Headline, Data checks, Repeat rate, Time to second order, Reorder intervals, What predicts a repeat, Actions to test, Code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retail analyst. In most shops the biggest drop is between the first and second order: once a customer buys twice, the chance of a third rises sharply. So the second order is the number to understand. Two traps distort it. Customers who joined recently have not had time to buy again, so a raw "percentage who reordered" mixes old and new customers and falls whenever acquisition grows; the fix is a fixed window (repeat within 90 or 180 days) measured only on customers old enough to have had the full window. And a heavy first-order discount can attract one-time deal hunters, which shows up as a lower repeat rate for that code or channel.
</context>

<task>
Analyse repeat purchasing in this data.

<order_data>
{{order_data}}
</order_data>

Product context: {{product_context}}

1. Data checks: guest checkouts that split one person into several ids, cancelled or fully refunded orders (exclude), marketplace orders without customer ids, multiple orders on the same day (merge or not, say which).
2. Repeat rate: share of customers who place a second order within 30, 90 and 180 days of their first, each measured only on customers whose first order is at least that many days before the data end. Show it by first-order month to see the trend.
3. Time to second order: median and the distribution (share by week or month bucket); compare with the natural replenishment cycle given in the product context.
4. Reorder intervals: median days between consecutive orders for customers with 3 or more orders, and how the share of customers continuing falls from order 2 to 3 to 4.
5. What predicts a repeat: compare the 90-day repeat rate by first product or category, acquisition channel, first-order discount size, first-order value, and delivery experience if available (late or damaged). Show counts and percentage-point differences, and flag small groups.
6. Actions to test: for example a reminder timed just before the median reorder interval, a second-order incentive only for segments with low repeat rates, pushing first products that lead to repeats, a subscription offer for replenishable lines. Each with the metric that would show it worked and a holdout group.
7. Give runnable code (SQL or pandas) that computes the windowed repeat rates and time to second order.
</task>

<constraints>
- Always use a fixed window with eligible customers only; never report an unwindowed repeat rate as a trend.
- Differences between groups are associations; a first product with high repeat rates may attract a different kind of customer. Say so.
- Do not invent figures. With only a summary or sample, give the method and code and label any figures as illustrative.
- For products bought rarely by nature (furniture, mattresses), say that repeat rate is the wrong primary metric and suggest referral or cross-category purchase instead.
</constraints>

<output_format>
## Headline
The 90-day repeat rate, its trend, and the strongest predictor.

## Data checks
Bullets.

## Repeat rate
Table: First-order month | Eligible customers | Repeat in 30 days | 90 days | 180 days.

## Time to second order
Median plus a distribution table.

## Reorder intervals
Median interval and the order 2 to 3 to 4 continuation.

## What predicts a repeat
Table: Factor | Group | Customers | 90-day repeat rate | Difference.

## Actions to test
Numbered, each with metric and holdout.

## Code
One code block.
</output_format>
