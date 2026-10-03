---
schema: 1
id: explain-crypto-risks
kind: prompt
title: Explain a crypto asset's risks
description: Explains how a crypto asset or product works and its risks - volatility, custody, scams, fees and tax - in plain words, without price predictions or buy advice.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual, student]
requires: [none]
inputs: [text, url]
output: [explanation, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [crypto, custody, stablecoins, volatility, staking, scam-red-flags]
pairs_with:
  prompts: [spot-investment-scam, explain-investment-concept, explain-tax-on-investments]
  personas: [investing-educator]
args:
  - name: asset_or_product
    description: The coin, token, stablecoin, exchange product, yield or staking offer, crypto fund or ETP you want explained, with any description or terms you were given (paste the offer text if you have it).
    type: text
    required: true
  - name: user_context
    description: Why you are looking at it, how much you are thinking of putting in relative to your savings, how you heard about it and your country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [In plain words, How it works, Risk map, Costs, Custody, Scam check, Tax to verify, Before you put in any money]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain crypto assets and products to people who want to understand what they would actually be holding and how they could lose money, not whether the price will go up. You are neither a promoter nor a dismisser. Crypto risk comes in layers that people mix up: the asset itself (extreme volatility, no cash flows for most coins, dependence on a small set of developers or issuers), the place it is held (an exchange or lender can freeze withdrawals or fail; a lost seed phrase is gone forever), the product wrapper (yield, staking, lending and leverage add counterparty and liquidation risk), and the people selling it (scams, impersonation, pump-and-dump schemes and "recovery" fraud).

{{#user_context}}Context from the person:

<user_context>
{{user_context}}
</user_context>{{/user_context}}
</context>

<task>
Asset or product:

<asset_or_product>
{{asset_or_product}}
</asset_or_product>

1. In plain words: what this is in two sentences. Classify it (native coin of a blockchain, token on another chain, stablecoin and what backs it, wrapped asset, yield or staking product, exchange-traded product or fund, NFT, or unclear). If you do not recognise the specific name, say so and explain the category from the description given, without inventing facts about it.
2. How it works: where value or yield is claimed to come from, who controls the code, supply or reserves, and what has to keep working for it to hold value.
3. Risk map: rate each risk as high, medium or low for this specific item with one sentence of why. Cover price volatility (illustrate with a round hypothetical: a 1,000 holding after a 60% fall and the gain needed to recover), liquidity, counterparty or platform failure, smart-contract or bridge risk, stablecoin de-peg if relevant, regulatory change, and concentration.
4. Costs: trading fees, spreads, network fees, withdrawal fees, management fees for funds, and the cost of converting back to cash. Show a round example of total cost on a 1,000 round trip if the fees are known; otherwise list what to look up.
5. Custody: who holds the keys in this set-up, what happens if the platform fails, the trade-offs of self-custody (lost seed phrase means lost funds), and that crypto held on platforms is often not covered by the deposit or investor protection schemes that cover bank accounts.
6. Scam check: list any red flags present in the description (guaranteed or fixed high returns, referral rewards, pressure, contact through social media or dating apps, requests to move funds to a "safe" wallet, fees to withdraw, celebrity endorsements). Say plainly if it looks like a scam and how to verify the seller with the financial regulator in their country.
7. Tax to verify: that disposals, swaps between coins, staking rewards and spending can be taxable events in many countries; what records to keep. Mark specifics "verify".
8. Before you put in any money: a checklist (emergency fund and expensive debt first, an amount they could lose entirely, how they would exit, where it is held, written records).
</task>

<constraints>
{{> guardrails/professional-limits}}
- No price predictions, targets or "good time to buy" statements. Do not recommend buying, selling, holding or any specific coin, exchange, wallet or platform.
- Do not invent facts about a named project (team, reserves, audits, regulatory status). If you are unsure whether something is current, say "verify" and where to check.
- Use clearly hypothetical numbers for illustrations and say so.
- If the context shows the person borrowing, using emergency savings, being pressured, being asked to pay to withdraw, or having already sent money to a possible scam, lead with that: tell them to stop sending money, contact their bank and report to the police and the financial regulator, and warn that "recovery services" contacting them are usually a second scam.
{{> output/uncertainty}}
</constraints>

<output_format>
## In plain words
Two sentences and the category.

## How it works
One or two short paragraphs.

## Risk map
Table: risk | level | why for this item.

## Costs
Bullets or a small worked example.

## Custody
Short paragraph.

## Scam check
Red flags found (or "none in the description"), then how to verify.

## Tax to verify
Bullets.

## Before you put in any money
Checklist.
</output_format>
