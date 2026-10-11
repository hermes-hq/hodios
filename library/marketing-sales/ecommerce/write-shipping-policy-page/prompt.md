---
schema: 1
id: write-shipping-policy-page
kind: prompt
title: Write a shipping policy page
description: Writes an online shop delivery page from your real rates - costs, timings, cut-offs, tracking, duties, lost or damaged parcels - plus matching lines for product and cart pages.
category: ecommerce
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager]
subject: [ecommerce]
requires: [none]
inputs: [notes, preferences]
output: [copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [shipping-page, delivery-times, shipping-rates, store-policies, customer-expectations, faq]
pairs_with:
  prompts: [write-refund-policy, plan-order-fulfilment, reduce-where-is-my-order-contacts]
args:
  - name: shipping_facts
    description: Your actual setup - where you ship from, zones, carriers or services, rates and any free-shipping threshold, processing time, delivery estimates, order cut-off time, tracking, P.O. box or remote area rules, and what happens with lost or damaged parcels.
    type: text
    required: true
  - name: international
    description: Optional - whether you ship abroad, to which countries, and who pays import duties and taxes (you or the customer).
    type: text
  - name: tone
    description: Optional brand voice, e.g. "warm and plain", "short and formal".
    type: string
output_contract:
  format: markdown
  sections: [Gaps to fill, Shipping page, Short lines for the store, Consistency checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write store policies that customers actually read. You know that the shipping page is one of the most visited pages on a small shop and the source of most "where is my order" contacts when it is vague. Good pages separate processing time from transit time (customers add them up wrongly), state business days and the daily cut-off, give a cost table rather than prose, say plainly who pays import duties (the most common cause of refused international parcels and bad reviews), and say what happens when a parcel is late, lost or arrives damaged. Every promise on this page must match what the shop can actually do, and the same numbers must appear on the product page, cart and confirmation email.

Shipping facts: {{shipping_facts}}
{{#international}}International: {{international}}{{/international}}
{{#tone}}Voice: {{tone}}{{/tone}}
</context>

<task>
1. Gaps to fill: list anything a customer would need that the facts do not cover (for example cut-off time, remote area surcharges, what happens if no one is home, lost-parcel claims), and use a clearly marked placeholder in the page for each one rather than inventing it.
2. Shipping page: write the page with these parts, in plain language and the voice given: a three-line summary at the top; a rates table (zone or service, cost, free-shipping threshold, estimated delivery); processing time versus delivery time with business days defined and the cut-off; tracking; address and delivery issues (wrong address, failed delivery, P.O. boxes); late, lost and damaged parcels and how to report them with what evidence; international orders and duties if applicable; holidays and peak periods; and how to contact the shop.
3. Short lines for the store: a one-line delivery promise for product pages, a cart line, a checkout note about duties if relevant, and the matching sentence for the order confirmation email.
4. Consistency checklist: the places where these numbers must match (product page, cart, checkout, emails, marketplace listings, FAQ, refund policy) and anything in the facts that conflicts with itself.
</task>

<constraints>
- Use only the rates, times and carriers given. Never invent prices, delivery times, carrier names or guarantees.
- Write delivery times as estimates unless the shop explicitly guarantees them; if it does, say what the customer gets when a guarantee is missed.
- Do not state consumer law for a specific country. Where rights to refunds for undelivered or damaged goods may depend on local law, add a neutral line such as "This does not affect your statutory rights" and note that the shop should check its local rules.
- If the shop does not ship internationally, say so clearly on the page.
- Keep the page scannable: headings, a table, short paragraphs.
</constraints>

<output_format>
## Gaps to fill
A short list.
## Shipping page
The finished page in Markdown, with [PLACEHOLDER: ...] where facts are missing.
## Short lines for the store
Labelled lines.
## Consistency checklist
A checklist.
</output_format>
