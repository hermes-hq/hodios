---
schema: 1
id: explain-structured-product
kind: prompt
title: Explain a structured product or capital-protected note
description: Explains a structured product, autocall or capital-protected note from its brochure or term sheet - payoff in every scenario, barriers, issuer risk, hidden costs and what you give up - in plain words.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [structured-products, autocallables, capital-protection, counterparty-risk]
pairs_with:
  prompts: [explain-fund-document, explain-options-risks, choose-financial-advisor, spot-investment-scam]
  personas: [investing-educator]
args:
  - name: product
    description: The brochure, key information document or term sheet text, or its main terms (underlying index, term, coupon, barriers, protection level, issuer, early-exit terms, costs).
    type: text
    required: true
  - name: amount
    description: The amount you are considering, so outcomes can be shown in money. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What it is in one paragraph, What you get in each scenario, The barrier, Who you are lending to, Costs and what you give up, Getting out early, Questions to ask before signing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Structured products package a bond-like promise from a bank with options on an index or share. The marketing stresses the attractive parts ("8% a year if the index is flat", "100% capital protection"); the important terms are elsewhere. Key points experts check: returns usually depend on an index **excluding dividends**, so the investor gives up the dividend yield; capital "protection" or "at risk only if" depends on a **barrier** (often 50-70% of the starting level) observed at maturity or continuously, and if breached, losses can match the index fall one-for-one; payments depend on the **issuing bank** staying solvent, and deposit protection usually does not apply; autocalls end early when the index is above a level, so the best scenarios are capped and short; costs are built into the pricing and may be shown only as a reduction in yield; and selling before maturity is at the issuer's price, which can be well below the amount invested.

<product>
{{product}}
</product>
{{#amount}}Amount: {{amount}}{{/amount}}
</context>

<task>
1. What it is in one paragraph, naming the type (autocall, capital-protected growth note, reverse convertible, other) and the underlying.
2. What you get in each scenario: a table of outcomes for the underlying at maturity or each observation date: well up, flat, down 20%, down at the barrier, down below the barrier (for example -50%), with the payout in money on their amount if given. Show how autocall dates work if relevant.
3. The barrier: what level, how it is observed (end-only or continuous) and what happens if it is breached, in money.
4. Who you are lending to: the issuer, what happens if the issuer fails, and that deposit protection probably does not apply (to check).
5. Costs and what you give up: dividends on the index, the cap on gains, the cost figures from the document, and adviser or distributor commission if mentioned. Compare with a simple illustration of holding the index plus cash over the same term, labelled as illustrative.
6. Getting out early: secondary market terms and the likely haircut.
7. Questions to ask before signing, including whether the seller receives commission and why this suits their goals over simpler options.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only terms in the document; mark missing terms (barrier type, issuer, costs) and do not assume favourable ones.
- Do not say whether to buy it.
- Do not predict the index; scenarios are illustrations.
{{> output/uncertainty}}
</constraints>

<output_format>
## What it is in one paragraph
Paragraph.

## What you get in each scenario
Table: scenario | payout | in money.

## The barrier
Short explanation.

## Who you are lending to
Short paragraph.

## Costs and what you give up
Bullets and a short comparison.

## Getting out early
Short paragraph.

## Questions to ask before signing
Bullets.
</output_format>
