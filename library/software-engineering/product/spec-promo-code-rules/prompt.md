---
schema: 1
id: spec-promo-code-rules
kind: prompt
title: Specify promo and discount code rules
description: Specifies promo and discount codes for a store or subscription, with code types, eligibility, stacking order, usage limits, expiry, currency and tax handling, refunds and abuse prevention.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, business-analyst, backend-engineer, fullstack-engineer]
stack: []
requires: [none]
inputs: [spec, notes, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [ecommerce]
tags: [promo-codes, discounts, checkout, requirements]
pairs_with:
  prompts: [spec-calculation-rules, implement-shopping-cart]
args:
  - name: promotions
    description: The kinds of promotions the business wants to run (percentage off, fixed amount, free shipping, first order, influencer codes) and where they are used.
    type: text
    required: true
  - name: context
    description: Store or subscription model, currencies and countries, tax-inclusive or exclusive prices, existing sales or loyalty features, and abuse seen so far.
    type: text
output_contract:
  format: markdown
  sections: [Code types, Eligibility, Stacking and order of application, Limits and expiry, Refunds and edge cases, Abuse prevention, Admin and reporting, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Discount codes leak money through the rules nobody wrote down. An influencer code meant for new customers ends up on a coupon site and is used 20,000 times by existing ones; a percentage code stacks with a sale price and an automatic bundle discount to sell below cost; a fixed 10 off applies in a currency where 10 is worth five times more; the discount is applied after tax in one place and before tax in another so invoices and refunds disagree; a partial return refunds the full item price and keeps the discount; and a single-use code can be redeemed twice by two simultaneous checkouts. Codes need a type, explicit eligibility (products, customers, minimum spend, channels), a stacking policy and order of application, limits counted atomically, expiry in a stated time zone, rules for how discounts spread across order lines for refunds, and abuse controls.
</context>

<task>
<promotions>
{{promotions}}
</promotions>
{{#context}}
<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. Define code types: percentage, fixed amount per order or per item, free shipping, buy X get Y, first order, and subscription codes (first period only, a number of periods, forever), with the fields each needs. Distinguish single shared codes from batches of unique codes.
2. Specify eligibility: products and categories included or excluded (gift cards, already-discounted items), customer conditions (new customers, segments, email domain), minimum spend measured before or after other discounts, channels, and countries or currencies.
3. Specify stacking and order of application: whether codes combine with each other, sale prices, automatic discounts and loyalty credit; the order in which they apply; whether discounts apply before or after tax and to shipping; and rounding per line. Give a worked example.
4. Specify limits and expiry: total redemptions, per customer, per household or payment method if needed, counting under concurrency so limits cannot be exceeded, start and end times with time zone, and behaviour for a cart that had a valid code that expires before payment.
5. Specify refunds and edge cases: how an order discount is allocated across lines, partial returns, full cancellation returning a single-use code or not, exchanges, price changes in the cart, and currency conversion of fixed amounts.
6. Specify abuse prevention: code leakage to coupon sites (unique codes, customer binding), brute-force guessing of codes (rate limits, code length), multiple accounts, and monitoring for unusual redemption spikes.
7. Specify admin and reporting: who can create codes and maximum discount without approval, bulk generation, deactivation, and reports of redemptions, revenue and discount cost per code.
8. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Do not set discount levels; specify behaviour for the promotions given.
- Limits must be enforced atomically on the server, never only in the cart UI.
- State whether discounts apply before or after tax, and flag that tax treatment of discounts depends on the country for confirmation.
- If the stacking policy is not given, propose one as a default and mark it for business confirmation.
- If the planned promotions, business model or currencies are not given, ask before writing.
</constraints>

<output_format>
## Code types
Table: type, fields, example.
## Eligibility
Numbered rules.
## Stacking and order of application
Numbered order, then a worked example.
## Limits and expiry
Bullets.
## Refunds and edge cases
Table: case, rule.
## Abuse prevention
Bullets.
## Admin and reporting
Bullets.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
