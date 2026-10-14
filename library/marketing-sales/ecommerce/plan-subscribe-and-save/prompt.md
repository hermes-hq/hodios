---
schema: 1
id: plan-subscribe-and-save
kind: prompt
title: Plan a subscribe-and-save offer
description: Plans repeat-delivery subscriptions for consumable products in an online shop - which products, delivery intervals, discount, skip and cancel rules, stock planning and the numbers that show it works.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, marketer, operations-manager]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, notes]
output: [plan, table, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [subscriptions, replenishment, repeat-purchase, retention, recurring-orders, consumables]
pairs_with:
  prompts: [write-post-purchase-emails, plan-order-fulfilment, set-free-shipping-threshold]
args:
  - name: products
    description: Products you might offer on subscription, price, margin, how long one unit typically lasts, and current repeat purchase rate and time between orders if known.
    type: text
    required: true
  - name: setup
    description: Store platform and subscription app if any, countries you sell to, fulfilment setup and payment methods. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Offer design, Customer rules, Economics, Operations, Launch and measure, Rules to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retention lead for consumer brands selling consumables online. Subscribe-and-save works for products people run out of on a predictable cycle (coffee, pet food, supplements, razors, cleaning refills) and fails for things bought occasionally or by mood. The common failures: an interval that does not match real usage, so boxes pile up and customers cancel; a discount large enough to eat the margin on customers who would have reordered anyway; and cancellation made hard, which drives chargebacks, complaints and, in many countries, legal trouble. Good programmes default to the typical usage interval, make skip, swap and pause easy, send a reminder before each charge, and track retention by cohort rather than counting sign-ups.

<products>
{{products}}
</products>
{{#setup}}

Setup: {{setup}}
{{/setup}}
</context>

<task>
1. Fit check: which products suit subscription and which do not, using the usage cycle and repeat data given.
2. Offer design: intervals to offer (default first), the discount or perk (discount, free shipping, a gift on the third delivery), whether to allow mixing products, and the minimum commitment, if any, with reasons.
3. Customer rules: skip, pause, swap, change interval and cancel, all self-service; pre-charge reminder timing; failed-payment handling; and what is shown at checkout.
4. Economics: per subscriber, margin per delivery after the discount, expected deliveries before cancel (from the user's data or a stated assumption), and compare to the margin from normal repeat buyers to show the discount's real cost. Show formulas.
5. Operations: stock forecasting from the subscriber base, batching orders by billing date, and what happens when a product is out of stock on a renewal.
6. Launch and measure: who to offer it to first, messaging, and metrics (take rate, cohort retention at deliveries 2, 3 and 6, skip rate, margin per subscriber, support contacts).
7. Rules to check: automatic renewal, cancellation and reminder rules differ by country; list what to confirm.
</task>

<constraints>
- Use only the numbers given; mark assumptions like average deliveries before cancel.
- Cancellation must be at least as easy as signing up; never design "dark pattern" retention flows.
- Do not state country-specific law as fact; list it to check.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fit check
## Offer design
## Customer rules
## Economics
| Item | One-off buyer | Subscriber |
## Operations
## Launch and measure
## Rules to check
</output_format>
