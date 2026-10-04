---
schema: 1
id: reply-to-price-inquiry-dms
kind: prompt
title: Reply to price inquiry DMs
description: Writes reply templates for the "price?" and "available?" messages small sellers get, with friendly answers, payment and delivery steps, scam warning signs and a no-reply follow-up.
category: social-media
version: 1.0.0
status: incubating
stage: [operate]
role: [founder, individual, sales-rep]
subject: [ecommerce, retail]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [social-selling, direct-messages, saved-replies, scam-awareness, home-business]
pairs_with:
  prompts: [write-fcommerce-facebook-post, reply-to-comments]
args:
  - name: products
    description: What you sell, with prices, sizes or variants, stock status, made-to-order times, delivery or pickup options and costs, and your returns policy if you have one.
    type: text
    required: true
  - name: payment_methods
    description: How you take payment (for example "bank transfer, PayPal goods and services, cash on pickup") and when (before dispatch, deposit for custom orders).
    type: string
    required: true
  - name: platform
    description: Where the messages arrive (for example "Instagram DMs", "Facebook Marketplace and page", "WhatsApp Business").
    type: string
    default: Instagram and Facebook
output_contract:
  format: markdown
  sections: [Saved replies, Order steps, Follow-ups, Scam warning signs, Before you use these]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A maker, small seller or home business answers the same messages all day: "price?", "available?", "do you deliver?", "last price?". Replies that only state a number lose buyers who needed one more nudge; replies that are long and late lose them too. The best saved replies answer the question first, add one useful detail and ask one question that moves toward an order (size, colour, pickup or delivery). Small sellers are also prime targets for scams: fake payment screenshots, overpayment with a refund request, "my courier will collect", requests to pay or verify through a link, and pressure to ship before money clears.

Platform: {{platform}}
Payment methods: {{payment_methods}}
</context>

<task>
<products>
{{products}}
</products>

1. Write saved replies, each under 50 words, for: "price?" (give the price, one detail that shows value, one qualifying question); "available?" in stock, out of stock (with a restock date only if given, or a wait-list offer) and made-to-order; "do you deliver?" with options and costs as given; "last price?" or haggling (a polite firm line, or a bundle offer only if the seller says they allow it); a custom-order request (what you need to know, deposit if the seller uses one); and a buyer who wants to pay later or by an unlisted method.
2. Write the order steps message: confirm item and variant, total with delivery, how to pay, when it ships or can be collected, and what they will receive (receipt or tracking).
3. Write follow-ups: one gentle nudge after no reply (about 24-48 hours, once only), and a closing message when the item is reserved for someone else.
4. List scam warning signs for this seller's payment methods and platform, with the safe response to each: confirm money in your own account or app, never in a screenshot; never refund an "overpayment"; do not click payment or verification links; no shipping before cleared payment; meet in public for cash pickups. Note any payment protection features only in general terms and suggest checking the provider's own rules.
5. Write a short reply for declining a suspicious buyer politely.
</task>

<constraints>
- Use only the prices, stock, delivery costs and policies given; use [X] for anything missing and list it under Before you use these.
- Friendly and plain, matching a small seller's own voice; no pushy sales tactics or fake scarcity.
- Never suggest asking buyers for passwords, card numbers in chat, or ID documents.
- Note that consumer rights for distance selling (cancellations, refunds) differ by country and for business sellers; suggest checking local rules before stating a no-returns policy.
- If no products or prices are given, ask for them and stop.
</constraints>

<output_format>
## Saved replies
Each with a short label and the text, ready to paste.

## Order steps
One message.

## Follow-ups
Two messages.

## Scam warning signs
Table: sign | what it looks like | what to do.

## Before you use these
Checklist of [X] items and settings (quick replies, away message, business hours).
</output_format>
