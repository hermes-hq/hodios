---
schema: 1
id: decide-whether-to-close-credit-card
kind: prompt
title: Decide whether to close a credit card
description: Weighs closing a credit card against the effect on your credit score, utilisation, fees, account age and temptation, and suggests safer options such as a downgrade or removing it from your wallet.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [report, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [close-account, credit-utilization, annual-fee, product-change, account-age]
pairs_with:
  prompts: [improve-credit-score, choose-credit-card, stop-relying-on-credit-cards]
args:
  - name: card
    description: The card you are thinking of closing - its limit, current balance, annual fee, how long you have had it, and why you want to close it.
    type: text
    required: true
  - name: other_credit
    description: Your other cards with limits and balances, and any big borrowing you plan in the next year, such as a mortgage or car loan.
    type: text
  - name: country
    description: Country, because credit scoring works differently between countries.
    type: string
output_contract:
  format: markdown
  sections: [The short answer, Effect on your credit, Costs of keeping it, Options other than closing, If you close it, Checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone decide whether to close one credit card. The answer depends on why they want to close it and on how credit scoring works in their country. Where scores use credit utilisation (balances as a share of total limits), closing a card removes its limit and can push utilisation up, which may lower the score, especially if other cards carry balances. Where scores reward a long history, closing an old account can matter less than people fear, because closed accounts in good standing often stay on the report for years, but it varies. In other countries lenders care more about total available credit, and fewer unused limits can help a mortgage application. The real reasons to close are often good ones: an annual fee that is not earning its keep, a card that keeps getting used for spending they regret, or wanting less available credit before a joint or mortgage application. Alternatives people forget: asking the issuer to change the card to a no-fee version on the same account, lowering the limit, or keeping it with a small recurring charge on direct debit. Timing matters: avoid closing just before a big application unless a lender has asked for it.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
The card:

<card>
{{card}}
</card>
{{#other_credit}}

Other credit and plans:

<other>
{{other_credit}}
</other>
{{/other_credit}}

1. Give a short answer first: close, keep, or change it, and the deciding factor.
2. Explain the likely effect on their credit: utilisation before and after (show the arithmetic from their limits and balances), account age, and how much this matters in their country, with the caveat that scoring models differ and are not published in full.
3. Cost of keeping it: annual fee versus value they get, temptation and past use, risk of the issuer closing an unused card anyway, and fraud exposure of an unused card.
4. Options other than closing: downgrade to a no-fee card on the same account, reduce the limit, remove it from wallets and online shops, or keep one small recurring charge paid in full.
5. If they do close it: pay it to zero first, ask for written confirmation of closure, cancel or move any recurring payments, redeem rewards, and check the credit report a couple of months later. Say whether to wait if a big application is coming.
6. A short checklist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state exact score changes; scoring formulas are not public and vary by country and bureau. Describe direction and size in general terms.
- Do not invent the issuer's policies; give questions to ask them.
- If the card carries a balance they cannot pay, say that closing does not remove the debt and point to a payoff plan.
- Do not recommend specific card products.
{{> output/uncertainty}}
</constraints>

<output_format>
## The short answer
Two sentences.

## Effect on your credit
Utilisation before and after, then account age and local notes.

## Costs of keeping it
Bullets.

## Options other than closing
Bullets.

## If you close it
Numbered steps.

## Checklist
Checklist.
</output_format>
