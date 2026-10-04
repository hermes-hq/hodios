---
schema: 1
id: pitch-to-stockists
kind: prompt
title: Pitch to stockists
description: Prepares a maker or small food and drink producer to pitch independent shops, with a stockist shortlist method, wholesale terms to state, a short email and walk-in pitch, samples and follow-up.
category: sales
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, artist, individual]
subject: [retail]
requires: [none]
inputs: [text, notes]
output: [plan, message, script, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [stockists, wholesale-terms, independent-shops, makers, sale-or-return, buyer-pitch]
pairs_with:
  prompts: [nudge-trade-account-reorders, handle-haggling-at-stall, write-cold-outreach]
  personas: [small-business-selling-mentor]
args:
  - name: product_and_terms
    description: What you make, retail price, wholesale price or cost per unit, minimum order, case sizes, shelf life (for food), lead time, what sells best direct, any proof (repeat customers, market sales, awards, press). Rough notes are fine.
    type: text
    required: true
  - name: target_shops
    description: Shops you have in mind or the area and type of shop (delis, gift shops, farm shops, bookshops, concept stores). Optional; you get a method for building the list either way.
    type: text
  - name: capacity
    description: How many stockists you could supply each month without missing orders.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Terms check, Stockist shortlist, Email pitch, Walk-in pitch, Samples and follow-up, Questions buyers ask]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a maker, craft brand or small food and drink producer get their products into independent shops. Shop buyers are busy, get pitched constantly, and decide fast on three things: does it fit what my customers buy, can I make my margin at a price my customers will pay, and will this supplier be easy to deal with. Makers lose pitches by not knowing their wholesale terms, pricing wholesale so low there is no margin left for them, walking in on a Saturday afternoon, sending a long brand story without the price, or offering sale-or-return on everything without understanding the risk. A good pitch is short, shows the product, states clear terms, and makes a small first order easy.

Capacity: {{capacity}}
</context>

<task>
<product_and_terms>
{{product_and_terms}}
</product_and_terms>

{{#target_shops}}<target_shops>
{{target_shops}}
</target_shops>{{/target_shops}}

1. Terms check: from the figures, calculate the shop's margin at the recommended retail price (independent shops often look for roughly a 2x to 2.5x markup from wholesale to retail, before sales tax, but say this varies by category and to check with buyers) and the maker's own margin at wholesale. Flag if wholesale leaves the maker under cost plus a reasonable margin, or if retail would have to rise. Set out the terms to state: wholesale price, recommended retail price, minimum first order, reorder minimum, case sizes, lead time, delivery charge or free delivery threshold, payment terms, and whether sale-or-return is offered (suggest it only for a small trial quantity, with a time limit and a condition rule).
2. Stockist shortlist: criteria for a good fit (similar price points on the shelf, customers who buy local or handmade, no direct competitor product, a shop that looks after its displays), how to research (visit, look at their shelves and social posts), and a scoring table. Use the target shops given; never invent shop names.
3. Email pitch: under 120 words with a specific subject line, one line on why this shop, what the product is, the key terms, one proof point, and an offer to drop in samples at a time that suits the buyer.
4. Walk-in pitch: when to go (quiet weekday mornings; never busy times), how to ask for the buyer, a 30-second pitch, what to bring (samples, a one-page line sheet with terms), and how to leave gracefully if the buyer is not in.
5. Samples and follow-up: what to leave, a follow-up 7 to 10 days later, and a first-order offer (a starter pack) if the terms allow.
6. Questions buyers ask, with answers from the given terms.
</task>

<constraints>
- Use only the figures and proof given; calculate margins with the arithmetic shown. Missing figures are [X].
- Never invent shop names, buyer names, awards or press coverage.
- Food and drink: remind the user to check labelling, allergen and registration rules for selling through shops in their country, and that buyers may ask for insurance and certificates.
- Keep commitments within capacity; if capacity is low, say how many stockists to approach first.
- If the product or prices are missing, ask for them and stop.
</constraints>

<output_format>
## Terms check
Table: Product | Cost | Wholesale | Recommended retail | Shop markup | Maker margin | Flag. Then the terms list.

## Stockist shortlist
Fit criteria, research steps, and a scoring table: Shop | Fit | Price fit | Competition | Score.

## Email pitch
Subject line and email.

## Walk-in pitch
When, the 30-second pitch, what to bring, how to leave.

## Samples and follow-up
Bullets plus the follow-up message.

## Questions buyers ask
Table: Question | Answer.
</output_format>
