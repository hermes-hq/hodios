---
schema: 1
id: handle-order-cancellation-request
kind: prompt
title: Handle an order cancellation request
description: Handles a customer who wants to cancel an order - before dispatch, already shipped or made to order - checks what is still possible, chooses cancel, intercept or return, and writes the reply.
category: customer-support
version: 1.0.0
status: incubating
stage: [operate]
role: [support-agent, operations-manager, founder]
requires: [none]
advice_risk: [legal]
subject: [ecommerce, retail]
inputs: [message, notes]
output: [report, message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [order-cancellation, dispatch-intercept, made-to-order, cooling-off, returns]
pairs_with:
  prompts: [design-returns-process, handle-missing-refund-enquiry, write-support-reply]
  rules: [support-commitment-rules]
args:
  - name: request
    description: The customer's message - which order, why they want to cancel if they say, and how urgent it is.
    type: text
    required: true
  - name: order_status
    description: Order date, items and values, payment status, fulfilment stage (unpaid, paid, picking, packed, handed to carrier, in transit, delivered), whether items are personalised or made to order, carrier intercept options and costs.
    type: text
    required: true
  - name: policy
    description: Your cancellation and returns policy, any fees, and what agents may do. Optional.
    type: text
  - name: country
    description: Where the customer is, if known.
    type: string
output_contract:
  format: markdown
  sections: [Where the order is, Options, Recommendation, Reply]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help support handle "please cancel my order" requests. What is possible depends on exactly where the order is: before picking it is a simple cancel and refund (void the authorisation if payment was not yet captured); between packing and carrier hand-off a warehouse stop is often still possible if someone acts within minutes; once with the carrier, some carriers offer an intercept or return-to-sender for a fee; after delivery it becomes a return. Personalised, made-to-order or perishable items have different rules, and work already started may justify a fee where the terms allow it. In many places consumers buying at a distance have a cooling-off or withdrawal right for a set period even after delivery, with exceptions such as personalised goods; the details differ by country. The common failures are telling a customer "it's cancelled" when it has already shipped, and refusing a cancellation that the customer could in effect make anyway by returning the item.
</context>

<task>
<request>
{{request}}
</request>

<order_status>
{{order_status}}
</order_status>

{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

{{#country}}Customer location: {{country}}{{/country}}

1. State exactly where the order is and what that means for cancelling. Say what is unknown and needs checking right now (for example whether the parcel has physically left).
2. List the realistic options with cost and customer effect: cancel and refund, warehouse stop, carrier intercept, refuse delivery, accept delivery and return, or for made-to-order items, cancel with a fee for work done or complete the order. Mark which ones the policy allows.
3. Recommend one option and say why, including who pays any intercept or return costs and whether a legal withdrawal right might apply in the customer's country (to be checked, not assumed).
4. Write the reply: what you have done or will do in the first sentence, what the customer needs to do (if anything), the refund amount and timing, and any fee with its reason. If the order has shipped, say so plainly and give the next best route.
</task>

<constraints>
- Never tell the customer an order is cancelled unless the stage and action confirm it; if it depends on a warehouse or carrier, say "we're trying to stop it" and when they will hear.
- Use only the costs and fees given; mark unknowns `[CHECK: ...]`.
- Do not state the length or scope of statutory withdrawal rights; say they vary by country and should be checked.
- Do not apply a fee the policy does not allow.
- Reply under about 120 words.
{{> guardrails/professional-limits}}
</constraints>

<output_format>
## Where the order is
Stage, implication, what to check now.

## Options
Table: option | allowed by policy | cost | customer effect.

## Recommendation
The option and reasoning.

## Reply
Ready to send.
</output_format>
