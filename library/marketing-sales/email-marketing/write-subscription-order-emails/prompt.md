---
schema: 1
id: write-subscription-order-emails
kind: prompt
title: Write subscribe-and-save order emails
description: Writes the recurring-order notices for a subscribe-and-save or box subscription - upcoming order, skip, swap, delay, price change and card expiry - each with one clear action.
category: email-marketing
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, operations-manager]
subject: [ecommerce]
requires: [none]
inputs: [text]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [subscribe-and-save, recurring-orders, subscription-box, order-notifications, retention]
pairs_with:
  prompts: [plan-subscribe-and-save, write-dunning-emails, write-post-purchase-emails]
args:
  - name: subscription
    description: What is delivered and how often, the subscriber discount, what customers can change themselves (skip, swap, change date, pause, cancel) and where, and the shop's voice.
    type: text
    required: true
  - name: events
    description: Which notices you need or your subscription app supports (upcoming order, order shipped, skipped, product out of stock, price change, card expiring, paused). Optional; a standard set is used if empty.
    type: text
output_contract:
  format: markdown
  sections: [Notice map, Messages, Rules, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the operational emails for a recurring-delivery subscription in an online shop. Subscribers cancel mostly because product piles up, not because they dislike it, so the "upcoming order" email is a retention tool: a few days before charging, it shows what is coming, when, and the price, with one-tap skip, swap and change-date links. Making skip easier than cancel keeps customers who would otherwise leave. Experts keep each notice to one job, put the date and amount in the subject line, explain out-of-stock substitutions before shipping rather than after, and give real notice of price changes with the subscriber's options. These emails are service messages, so they should not be stuffed with promotions.
</context>

<task>
Write recurring-order notices.

<subscription>
{{subscription}}
</subscription>
{{#events}}Notices needed: {{events}}{{/events}}

1. **Notice map:** for each event, the trigger, timing (for example upcoming order 3 to 5 days before charge), and the one action the customer may take.
2. **Messages:** write each notice: subject line with the key fact (date, amount, product), preheader, short body, primary action button and secondary links (skip, swap, change date, manage). Show merge fields as `{field}`.
3. Include at least: upcoming order, order on its way, skipped confirmation, item out of stock with the substitution or skip choice, price change notice with old and new price and the date, card expiring soon, paused and resumed, and cancellation confirmation with a way back.
4. **Rules:** which notices are service-only (no promotions), how far ahead the price change notice goes out, what happens if the customer does nothing on a substitution, and how often a customer can skip.
5. **Checks:** merge fields with multiple products, time zones for charge dates, links that log the customer in or deep-link to the right page.
</task>

<constraints>
- Discount levels, prices, policies and self-service options only as supplied; `[NEEDED: ...]` otherwise.
- Skip and cancel links must be easy to find; never hide cancellation behind a call or chat if self-service exists.
- Keep notices short and readable on a phone.
- Tell the user to check local rules on notice for recurring charges and price changes; do not state them as fact.
</constraints>

<output_format>
## Notice map
A table: Event | Trigger and timing | Customer action.

## Messages
Each notice with subject, preheader, body and buttons.

## Rules
Bullets.

## Checks
A checklist.
</output_format>
