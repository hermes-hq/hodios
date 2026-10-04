---
schema: 1
id: map-email-automation-flows
kind: prompt
title: Map email automation flows
description: Decides which automated email flows a small shop or service business should build first, ranked by expected impact and effort for its volume, with triggers, exits and conflicts between flows.
category: email-marketing
version: 1.0.0
status: incubating
stage: [plan, design]
role: [founder, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [text]
output: [plan, table, diagram]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [email-automation, flow-priority, triggers, exit-conditions, build-order]
pairs_with:
  prompts: [write-email-sequence, write-abandoned-cart-emails, write-browse-abandonment-emails, write-service-reminder-emails]
args:
  - name: business
    description: What you sell or do, online or in person, average order value, how often customers come back, list size and the email platform.
    type: text
    required: true
  - name: monthly_orders
    description: Orders or bookings per month and monthly site visitors if known, for example "about 300 orders, 12,000 visits". Optional.
    type: string
  - name: existing_flows
    description: Automated emails already running and how they perform, if any. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Flow ranking, Flow specs, Conflicts and priorities, Build order, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small business owner decide which automated emails to build and in what order. Automations keep earning after one setup, but owners often build the wrong one first (a browse flow for a shop with 40 visitors a day), build five at once and never finish them, or switch on several that overlap so one customer gets a welcome, a cart reminder and a promo in the same hour. Expected value depends on how many people enter each flow per month, not on how popular the flow is in blog posts.
</context>

<task>
<business>
{{business}}
</business>

{{#monthly_orders}}Volume: {{monthly_orders}}{{/monthly_orders}}
{{#existing_flows}}<existing_flows>
{{existing_flows}}
</existing_flows>{{/existing_flows}}

1. List the candidate flows that fit this business model: welcome, abandoned checkout or cart, browse abandonment, post-purchase (thank-you, how to use, review request), replenishment or service reminder, win-back, booking or appointment follow-up, birthday or anniversary, back-in-stock. Drop any that do not fit (no cart for a phone-booking salon, no replenishment for one-off purchases).
2. For each remaining flow, estimate monthly entries from the volumes given (for example new subscribers per month for welcome, checkouts started minus orders for cart, counting only checkouts where the email is known), the likely value per entry as a low and high assumption, and the setup effort (low, medium, high) for a non-technical owner. Show the arithmetic and label every assumption.
3. Rank by expected monthly value ÷ effort, adjusted for what already exists. Welcome usually comes first because every new subscriber passes through it; say if this business is an exception.
4. Spec the top three to five flows: trigger, entry filters, number of emails and timing, exit conditions (purchase, booking, unsubscribe, entering a higher-priority flow) and the one metric to judge it by.
5. Set conflict rules: flow priority order, a cap on total emails per person per day or week, campaign suppression while someone is in a high-priority flow, and how a contact moves from one flow to another.
6. Give a build order over 4-8 weeks with one flow live and checked before the next starts.
</task>

<constraints>
- Do not state industry conversion figures as facts; use the user's numbers or ranges labelled as assumptions.
- Only flows for contacts with appropriate consent; transactional messages (receipts, booking confirmations) are not marketing flows and must not carry heavy promotion.
- If the business type or rough volume is missing, ask for it and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
Two to three sentences: the first flow to build and why.

## Flow ranking
Table: Rank | Flow | Monthly entries (estimate) | Value per entry (low-high, assumption) | Effort | Status (new, improve, skip).

## Flow specs
For each top flow: trigger, filters, emails and timing, exits, metric.

## Conflicts and priorities
Priority order list, caps and suppression rules; a simple text diagram of how contacts move between flows.

## Build order
Week-by-week list.

## Questions
What would change the ranking.
</output_format>
