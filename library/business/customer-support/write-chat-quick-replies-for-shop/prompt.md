---
schema: 1
id: write-chat-quick-replies-for-shop
kind: prompt
title: Write chat quick replies for a shop
description: Writes short quick replies for a local shop's messaging app - hours, stock, reserve and collect, prices, delivery, payment - in plain and casual versions, plus greeting and away messages.
category: customer-support
version: 1.0.0
status: incubating
stage: [build]
role: [founder, sales-rep]
subject: [retail]
requires: [none]
inputs: [text]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: "off"
level: beginner
tags: [quick-replies, messaging-apps, local-shop, click-and-collect, away-message]
pairs_with:
  prompts: [build-multilingual-reply-snippets, build-support-macros, write-missed-call-textbacks]
args:
  - name: shop
    description: Your shop - name, what you sell, address and opening hours, whether you reserve items and for how long, delivery area and fees, payment methods, and how you like to sound.
    type: text
    required: true
  - name: top_questions
    description: Optional. The questions customers message most, if different from the usual hours, stock, reserve, price, delivery and payment questions.
    type: text
output_contract:
  format: markdown
  sections: [Greeting and away messages, Quick replies, Setup tips, Facts to fill in]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write saved quick replies for a small shop, market trader or bakery that answers customers through a messaging app. The owner usually replies between customers at the till, so each saved reply must be short, need only a word or two filled in, and still sound like a person. The most common problems: replies that promise stock the owner has not checked, reserve rules nobody remembers, and payment answers that could be mistaken for a scam (asking for card details by message).
</context>

<task>
<shop>
{{shop}}
</shop>

{{#top_questions}}
<top_questions>
{{top_questions}}
</top_questions>
{{/top_questions}}

1. Write a greeting message (sent on first contact) and an away message (outside hours) with the hours and when the customer will get an answer.
2. Write 10-14 quick replies covering: opening hours and address, holiday hours, "do you have X?" (a holding reply while the owner checks, and the "yes" and "sorry, not in stock" follow-ups with an offer to order or suggest an alternative), reserve and collect (how long it is held, name needed), price check, delivery or local drop-off, payment methods, gift vouchers, returns, and "can I order for a specific day?" (for bakeries and florists). Add any questions given.
3. For each reply: a shortcut keyword (for example /hours, /reserve), a plain version, and a casual version, both under about 300 characters, with the parts to fill in in square brackets.
4. Payment replies say how to pay (in shop, card on collection, the shop's own payment link or bank details if the shop uses them) and never ask for card numbers in the chat.
5. Setup tips: where to save quick replies in a typical messaging business app (in general terms), how to label chats (new order, ready to collect, paid), and a reminder to update holiday hours.
</task>

<constraints>
- Use only the facts given. Never invent hours, prices, delivery fees or reserve periods; use [CHECK: ...] and list them under Facts to fill in.
- The plain version uses no emoji; the casual version may use at most one.
- Never promise stock in a saved reply; the stock reply checks first.
- No pressure selling ("only 2 left!") unless the owner fills it in from real stock.
</constraints>

<output_format>
## Greeting and away messages
Both messages.

## Quick replies
Table: shortcut | when to use | plain version | casual version.

## Setup tips
Up to five bullets.

## Facts to fill in
Bullets of every [CHECK] item.
</output_format>
