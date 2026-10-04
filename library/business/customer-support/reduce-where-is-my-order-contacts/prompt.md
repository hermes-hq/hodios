---
schema: 1
id: reduce-where-is-my-order-contacts
kind: prompt
title: Reduce where-is-my-order contacts
description: Cuts "where is my order" contacts for an online shop with clearer delivery promises, confirmation and tracking copy, proactive delay messages and a deflection reply built on real delivery times.
category: customer-support
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, support-agent, operations-manager]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, notes]
output: [plan, copy, message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [order-tracking, delivery-promise, contact-deflection, proactive-updates, dispatch-times]
pairs_with:
  prompts: [analyze-support-tickets, write-support-reply, build-support-macros]
args:
  - name: shop
    description: What you sell, where you ship, your platform, and what customers see today after ordering (confirmation email, dispatch email, tracking link). Paste current wording if you can.
    type: text
    required: true
  - name: delivery_options
    description: Your real delivery promises - dispatch cut-off and handling time, each delivery method with carrier, typical and worst-case transit time, made-to-order or pre-order lead times, and what slips at peak.
    type: text
    required: true
  - name: contact_volume
    description: How many order-status contacts you get and when they arrive (for example "30 a week, mostly day 2-4 after ordering"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Why customers are asking, Delivery promise wording, Customer timeline, Message copy, Deflection reply, What to measure, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help online shops cut "where is my order" contacts, often the largest single reason customers write in. Customers rarely ask because a parcel is late; they ask because they do not know what "normal" looks like. The causes are predictable: a delivery promise that counts from order instead of dispatch, or hides handling time; silence between order and dispatch; a tracking link that shows nothing for a day or carrier jargon nobody understands; and no message when something does slip. The fix is an honest promise at checkout, a message at every step where anxiety rises, a tracking explanation in plain words, and a proactive note before the customer notices a delay.
</context>

<task>
<shop>
{{shop}}
</shop>

<delivery_options>
{{delivery_options}}
</delivery_options>
{{#contact_volume}}
Contact volume: {{contact_volume}}
{{/contact_volume}}

1. Diagnose: from the current wording and promises, list where expectations and reality differ (promise counts from order not dispatch, worst case hidden, no dispatch message, made-to-order lead time only in small print). If contact timing is given, match it to the gap it points to.
2. Delivery promise wording: rewrite the promise for the product page, cart and checkout as a date range or "dispatched within X working days, then Y-Z working days", using the worst realistic case, not the best. Include cut-off times and peak-season wording.
3. Customer timeline: map each point from order to delivery, the customer's likely worry at that point, and the message that answers it before they ask.
4. Message copy: write the order confirmation section on delivery, the dispatch email or SMS, a "how to read your tracking" explanation (common carrier statuses in plain words, including "label created", "in transit" with no update, "out for delivery", "attempted"), and a proactive delay message with a new estimate and a choice (wait, change, cancel) where the shop's policy allows.
5. Deflection reply: a saved reply for "where is my order" that answers with where the order should be by now, what to do next, and when to write again.
6. What to measure: order-status contacts per 100 orders before and after, and the share arriving inside versus outside the promised window.
</task>

<constraints>
- Use only the delivery times and carriers given. Never invent transit times, carrier names or tracking statuses the shop does not use; mark unknowns as [X] and list them in Questions.
- Do not promise compensation, refunds or cancellation rights the shop has not stated; where the customer's rights on late delivery may apply, say to check local consumer rules.
- Keep each message short: dispatch and delay messages under about 80 words.
- Write in the shop's voice if a sample is given; otherwise warm and plain.
</constraints>

<output_format>
## Why customers are asking
Bullets, each a gap between expectation and reality.
## Delivery promise wording
Product page, cart and checkout lines, plus peak-season version.
## Customer timeline
Table: Point | Typical day | Customer worry | Message sent.
## Message copy
Each message under its own bold label, ready to paste.
## Deflection reply
One saved reply with [placeholders] for order details.
## What to measure
Two or three bullets.
## Questions
Anything to confirm.
</output_format>
