---
schema: 1
id: build-bond-ladder
kind: prompt
title: Lay out a bond or CD ladder for dated needs
description: Explains bond and CD ladders and lays out an illustrative ladder for your timeline and amounts, with yield to maturity, reinvestment and inflation risk, and the ladder-versus-fund trade-off.
category: investing
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [bond-ladder, certificates-of-deposit, government-bonds, yield-to-maturity, fixed-income]
pairs_with:
  prompts: [explain-bonds-and-interest-rates, compare-cash-vs-money-market-funds]
  personas: [investing-educator]
args:
  - name: needs
    description: What the money is for and when you need it - for example 20,000 a year for five years from 2028, or a single sum in three years - and the total you have.
    type: text
    required: true
  - name: country
    description: Your country and the account you would hold it in (taxable, tax-advantaged), since instruments, protection and tax differ.
    type: string
    required: true
  - name: yields
    description: Any current yields or rates you have seen for the maturities you are considering, with their source and date. Optional; without them the ladder uses clearly labelled illustrative rates.
    type: text
output_contract:
  format: markdown
  sections: [How a ladder works, Your illustrative ladder, What you lock in and what you do not, Building blocks to compare, Ladder or fund, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A ladder buys bonds, gilts, Treasuries or fixed-term deposits that mature in successive years so that money becomes available when it is needed. The point is matching: if a high-quality bond is held to maturity, the nominal amount due is known in advance regardless of what interest rates do in between, which a bond fund with no maturity date cannot promise. What experts check that novices miss: compare yield to maturity, not the coupon (a bond bought above par with a high coupon returns less than its coupon suggests); nominal ladders do not protect buying power, so inflation-linked bonds suit real spending needs; callable bonds and callable CDs can be repaid early when rates fall; early withdrawal from fixed-term deposits often costs interest; deposit protection schemes have per-institution limits; credit risk rises outside government bonds; when a rung matures for an ongoing ladder, the reinvestment rate is unknown; and tax treatment differs (in some countries interest is taxed but capital gains on government bonds are not, which favours low-coupon issues). Target-maturity bond funds are a middle option.

Needs: {{needs}}

Country and account: {{country}}
{{#yields}}Yields provided: {{yields}}{{/yields}}
</context>

<task>
1. Explain in a short paragraph how a ladder works for their goal: a spending ladder that is used up, or a rolling ladder that is reinvested.
2. Lay out an illustrative ladder: one rung per date or year of need, with amount needed, maturity, instrument type, the yield used (theirs if supplied, otherwise an illustrative rate clearly labelled), and the amount to invest today to receive what is needed, showing the present value working for at least one rung.
3. Explain what is locked in (nominal amounts at maturity, if held and if the issuer pays) and what is not (inflation, reinvestment rate for a rolling ladder, early sale price, call risk).
4. Compare building blocks available in their country by type: government bonds, inflation-linked government bonds, fixed-term deposits or CDs, high-grade corporate bonds, target-maturity funds, on safety, protection limits, liquidity, tax and minimum sizes. Name country-specific products only when confident, marked "verify".
5. Ladder or fund: when a bond fund of similar duration does a similar job and when it does not.
6. List questions to check with the broker, bank or tax authority.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present today's yields as fact from memory. Use the user's figures with their date, or illustrative rates labelled as such.
- Do not name specific bonds, issuers or banks to buy, or say what share of their wealth to ladder.
- If any need is within about a year, mention that cash or a deposit may be simpler than a bond.
- Keep arithmetic transparent; round sensibly and say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## How a ladder works
Short paragraph.

## Your illustrative ladder
Table: rung | date needed | amount needed | instrument type | yield used | invest today, with one worked example.

## What you lock in and what you do not
Bullets.

## Building blocks to compare
Table: instrument | safety | protection | liquidity | tax notes.

## Ladder or fund
Short paragraph.

## Questions to check
Bullets.
</output_format>
