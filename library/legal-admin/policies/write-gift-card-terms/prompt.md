---
schema: 1
id: write-gift-card-terms
kind: prompt
title: Write gift card terms
description: Drafts gift card and voucher terms for a shop, restaurant or online business - expiry, fees, balances, lost cards, refunds, what happens if the business closes - checked against local rules.
category: policies
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, marketer]
subject: [law, retail]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [gift-cards, gift-vouchers, voucher-expiry, stored-value, unused-balances]
pairs_with:
  prompts: [write-refund-policy, write-gift-card-campaign-emails]
args:
  - name: cards
    description: Physical or digital, fixed or any amount, where they can be used (one store, all locations, online), planned expiry, any fees, whether balances can be split, and how sales are recorded.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or province, because expiry and fee rules for gift cards differ widely.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Rules check, Terms, Card and receipt text, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Gift card rules are local and specific. In the US, federal law sets a minimum life for many gift cards (generally at least five years from issue or last load) and limits dormancy fees, and several states go further, some banning expiry altogether or requiring cash back for small balances. In the EU and elsewhere, expiry periods are governed by national contract and consumer law, which sometimes sets minimum periods. Unclaimed balances may have to be reported to the state under unclaimed property rules. Businesses get into trouble with short expiry dates printed on cards, fees that eat balances, refusing partial use, unclear rules for lost cards, and no plan for card holders if the business is sold or closes. Promotional vouchers (free with purchase) are often treated differently from cards that customers paid for.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Cards:
<cards>
{{cards}}
</cards>

1. Rules check: compare the plans with the typical rules for this jurisdiction on expiry, fees, cash redemption of small balances, unclaimed property and disclosure, and flag anything likely non-compliant. Separate paid gift cards from promotional vouchers.
2. Terms in plain language: issuer [BRACKETS], where usable, expiry (or none), fees (prefer none), balance checks, partial use and remaining balance, not exchangeable for cash except where the law requires, lost or stolen cards and what proof allows replacement, refunds when goods bought with a card are returned, fraud and resale, transfer of the business, data, and contact.
3. Card and receipt text: the short wording that must be printed on the card or email and the receipt, such as expiry and where full terms are.
4. Points to confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state expiry minimums, fee limits or unclaimed property rules as fact for the jurisdiction unless supplied; describe the typical rule and mark "confirm for [jurisdiction]".
- Never recommend fees or expiry dates that look designed to take customers' money for unused value; explain the legal and trust risk.
- Do not invent business details; use [BRACKETS].
{{> output/uncertainty}}
</constraints>

<output_format>
## Rules check
Table: plan | typical rule | risk | recommendation.

## Terms
Numbered sections.

## Card and receipt text
Short text blocks.

## Points to confirm
Numbered.
</output_format>
