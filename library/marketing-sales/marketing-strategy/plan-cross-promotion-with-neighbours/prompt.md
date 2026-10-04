---
schema: 1
id: plan-cross-promotion-with-neighbours
kind: prompt
title: Plan cross-promotion with neighbours
description: Finds nearby or complementary businesses to team up with, designs fair cross-promotions, referral swaps or bundles with simple tracking, and writes the first approach message.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer]
subject: [retail, hospitality]
requires: [none]
inputs: [text]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [cross-promotion, local-partnerships, referral-swap, bundles, joint-events]
pairs_with:
  prompts: [design-referral-program, design-loyalty-program, plan-cause-marketing-campaign, brainstorm-guerrilla-marketing]
args:
  - name: business
    description: What you sell, your typical customers and when they visit or buy, your street or area, and what you could offer a partner (space, an email list, counter display, a discount, skills).
    type: text
    required: true
  - name: neighbours
    description: Businesses near you or that serve the same customers, and anyone you already know or have worked with. Optional; the plan suggests types otherwise.
    type: text
output_contract:
  format: markdown
  sections: [Partner shortlist, Promotion ideas, Fair terms, Approach message, Tracking]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help independent shops, cafes, trades and market traders team up with neighbours and complementary businesses. The best partners serve the same customer at a moment just before or after you (florist and wedding venue, cafe and bookshop, builder and electrician, gym and smoothie bar), at a similar price and quality level, without competing for the same purchase. Partnerships fail when one side does all the work, nobody tracks what each side sent, the offer cheapens both brands, or the deal lives only in a chat at the counter and is forgotten in a month.
</context>

<task>
<business>
{{business}}
</business>

{{#neighbours}}<neighbours>
{{neighbours}}
</neighbours>{{/neighbours}}

1. If you do not know what the business sells and who buys, ask and stop.
2. Build a partner shortlist of four to eight businesses (named ones from the input, otherwise types): why their customers fit, the moment they share (before, during, after), overlap risk, and fit on price and values. Rank by fit.
3. Promotion ideas for the top three partners, chosen from: bounce-back vouchers (spend here, get an offer next door), a bundle or joint product, a shared event or trail, counter displays or leaflet swaps, a referral swap between trades, a shared loyalty card, or cross-posting to each other's lists. For each, say what each side gives and gets, the cost, and the effort.
4. Fair terms: a one-page agreement outline covering what each side does, how long the trial runs (default 90 days), how offers are honoured, how referrals are tracked and whether any referral fee applies, what happens with customer data, and how either side ends it.
5. Write the first approach message (in person script and short written version): lead with what is in it for them, propose one specific idea, suggest a small trial, and ask for a 15-minute chat at a quiet time.
6. Tracking: a code or stamp per partner, a shared monthly tally, and a review date.
</task>

<constraints>
- Use only supplied facts; do not invent named businesses, their offers or their customer numbers.
- No sharing customer contact details between businesses without the customers' consent; cross-promote through each business's own channels instead.
- Referral fees or commissions may need disclosing to customers in some sectors (financial, legal, health, property); flag this as a check.
- Avoid offers that only shift discounts around without new customers; each idea states which new customers it reaches.
- Keep effort balanced; if one side carries more work, say how the other side compensates.
</constraints>

<output_format>
## Partner shortlist
Table: Partner | Shared customer moment | Why it fits | Overlap risk | Rank.

## Promotion ideas
For each of the top three partners: idea, what each side gives and gets, cost, effort, new customers reached.

## Fair terms
One-page agreement outline as bullets.

## Approach message
Spoken script (under 80 words) and a written version (under 120 words).

## Tracking
Bullets: codes, tally, review date and the keep or stop rule.
</output_format>
