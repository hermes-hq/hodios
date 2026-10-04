---
schema: 1
id: decide-restaurant-delivery-channels
kind: prompt
title: Decide restaurant delivery channels
description: Compares delivery apps, own drivers, collection-only and no delivery for a restaurant or takeaway on margin per order, kitchen load and customer ownership, and recommends a channel mix.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
subject: [hospitality]
requires: [none]
inputs: [text, dataset]
output: [table, report, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [takeaway, delivery-apps, commission, click-and-collect, contribution-margin, channel-mix]
pairs_with:
  prompts: [plan-delivery-routes, plan-owner-led-price-rise, test-capacity-before-growth, assess-platform-dependence-risk]
  personas: [hospitality-revenue-manager, hospitality-manager]
args:
  - name: restaurant
    description: What you serve, seats, opening times, average order value, food cost percentage, kitchen capacity at peak, and where customers live relative to you.
    type: text
    required: true
  - name: current_sales
    description: Current sales split by dine-in, collection and delivery (by channel if you use apps), with orders per week. Optional.
    type: text
  - name: commission_rates
    description: Commission and fees for each app or delivery option you use or are offered, plus any marketing or promotion fees, and what an own driver would cost per hour. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, Margin per order by channel, Kitchen and service impact, Customer ownership, Recommended mix, Trial and measures, Assumptions and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a restaurant or takeaway owner choose how to sell beyond the dining room: delivery apps, their own drivers, collection only, or none. The decision is often made on sales rather than profit. App commissions plus promotions can take a large share of each order, so an order that looks the same as a dine-in order may earn a fraction of the margin; packaging adds cost; peak-time delivery orders can slow the dining room and hurt reviews; and on apps the customer relationship belongs to the platform. Own drivers keep the customer but bring idle time, vehicles, insurance and employment duties. Collection is often the most profitable off-premise channel and the least promoted. You compare contribution per order, not sales.
</context>

<task>
<restaurant>
{{restaurant}}
</restaurant>

{{#current_sales}}
<current_sales>
{{current_sales}}
</current_sales>
{{/current_sales}}

{{#commission_rates}}
<commission_rates>
{{commission_rates}}
</commission_rates>
{{/commission_rates}}

1. Margin per order by channel: for a typical order, price (including any app menu mark-up), minus food cost, packaging, commission and fees, card fees, and driver cost per delivery for own delivery (driver cost per hour / realistic deliveries per hour plus vehicle cost). Show contribution in money and as a share of the order. Compare with a dine-in order of the same food, and note that dine-in also carries table, service and drinks.
2. Menu pricing on apps: whether to price higher on apps to recover commission, by how much, and the trade-off with app ranking and customer perception. Say which menu items travel badly and should be left off.
3. Kitchen and service impact: peak overlap between dining room and off-premise orders, ticket times, and a cap or pause rule.
4. Customer ownership: what data and repeat business each channel gives, and how to move app customers to direct ordering (in-bag cards, own ordering page, loyalty) within platform rules.
5. Recommended mix: which channels to use, with app scope (one or two, delivery radius, hours), own delivery only if volume per hour justifies it, and collection promoted.
6. Trial and measures: an eight-week trial with weekly contribution per channel, ticket times, reviews and repeat rate, and stop or scale rules.
7. Check the arithmetic before answering.
</task>

<constraints>
- Use the given commissions and costs. Never state current platform commission rates from memory; if missing, use placeholders [X] and say to check the contract.
- Label assumed deliveries per hour and packaging costs.
- Note that driver employment status, insurance and food-safety rules for delivery differ by country and need checking; do not state them.
- If the average order value or food cost is missing, ask for it and stop; show the method with placeholders.
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Two or three sentences.
## Margin per order by channel
Table: Line | Dine-in | Collection | App delivery | Own delivery. Contribution row in money and percent.
## Kitchen and service impact
Bullets with the cap rule.
## Customer ownership
Table: Channel | Customer data | Repeat potential | How to move to direct.
## Recommended mix
Bullets.
## Trial and measures
Table: Measure | Target | Stop or scale rule.
## Assumptions and questions
Bullets.
</output_format>
