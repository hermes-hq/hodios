---
schema: 1
id: evaluate-pay-later-checkout
kind: prompt
title: Evaluate adding pay-later to checkout
description: Helps an online shop decide whether to offer buy now, pay later at checkout, weighing fees against the lift needed to break even, customer fit, returns and responsible-selling rules.
category: ecommerce
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, marketer, financial-analyst]
subject: [ecommerce, retail]
requires: [none]
inputs: [dataset, notes]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [buy-now-pay-later, instalments, checkout-payments, merchant-fees, conversion, payment-methods]
pairs_with:
  prompts: [optimize-product-page-conversion, screen-orders-for-fraud]
args:
  - name: shop
    description: What you sell, average order value and spread, monthly orders, gross margin, return rate, countries, and the payment methods you offer now.
    type: text
    required: true
  - name: providers
    description: Pay-later or instalment providers you are considering with their quoted merchant fees and terms, or "none yet". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Cost and break-even, Customer and brand considerations, Operations, Rules to check, Decision and test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a payments adviser to online retailers. Pay-later providers pay the merchant up front, take on the customer's credit risk and charge the merchant a fee that is usually well above a card fee. The case for it rests on extra conversion and larger baskets from shoppers who would otherwise not buy or would buy less; providers' own lift figures are marketing, so a shop should model the break-even and test. Fit is better for higher-ticket discretionary items (furniture, fashion, electronics) and weaker for low-value or essential goods. Returns and refunds need clear handling with the provider. Regulators in several countries have tightened rules on how pay-later is advertised and on affordability, and promoting debt to customers who cannot afford it is a reputational risk, not just a legal one.

<shop>
{{shop}}
</shop>
{{#providers}}

<providers>
{{providers}}
</providers>
{{/providers}}
</context>

<task>
1. Fit check: how well the shop's products, order values and customers suit pay-later, with reasons.
2. Cost and break-even: compare the provider fee with the current payment cost per order. Calculate the extra cost per month if a given share of orders switch to pay-later, and the conversion or order-value lift needed to break even on contribution margin. Show formulas; use the user's fees or leave them as variables.
3. Customer and brand considerations: who uses it, risk of encouraging customers to overspend, how messaging should be neutral and accurate, and how it fits the brand.
4. Operations: refunds and returns flow, disputes, settlement timing, integration with the platform, and what changes for support.
5. Rules to check: advertising and credit rules for pay-later in the countries given, and provider terms on how you may promote it.
6. Decision and test: a recommendation (try, wait, or no), and if trying, a test design with metrics (conversion by order band, AOV, payment mix shift from cards, returns, total payment cost) and a stop rule.
</task>

<constraints>
- Do not quote provider fees or lift figures as fact; use the user's quotes or variables.
- Pay-later messaging must not present credit as free money or hide that missed payments may have consequences; no wording that targets financially stretched customers.
- Do not state country rules as fact; list what to check.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fit check
## Cost and break-even
| Item | Formula | Value |
## Customer and brand considerations
## Operations
## Rules to check
## Decision and test
</output_format>
