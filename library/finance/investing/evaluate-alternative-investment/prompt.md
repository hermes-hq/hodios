---
schema: 1
id: evaluate-alternative-investment
kind: prompt
title: Evaluate an alternative investment
description: Checks an alternative investment such as peer-to-peer lending, startup crowdfunding, wine, art or collectibles for source of return, risks, all-in costs, exit and investor protection.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [text, document]
output: [report, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [alternative-assets, peer-to-peer-lending, equity-crowdfunding, collectibles]
pairs_with:
  prompts: [spot-investment-scam, compare-property-investing-routes, explain-crypto-risks, check-portfolio-diversification]
  personas: [investing-educator]
args:
  - name: offer
    description: The investment and its terms - what you buy, the claimed returns, minimum, fees, lock-in, how you exit, who runs it and where it is registered - pasted from the offer or described.
    type: text
    required: true
  - name: context
    description: How much you would put in, as a share of your total savings and investments. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you would actually own, Where the return comes from, Risks, Costs, Getting your money out, Protection and regulation, How much is at stake, Questions before investing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Alternative investments are sold on low correlation with markets and attractive past returns. The questions experts ask are the same for wine, watches, startup equity or loans: **What exactly do I own** (the asset itself, a fractional share in a company that owns it, or a loan to a platform)? **Where does the return come from** (rental income, interest, price appreciation set by appraisals, or new investors' money)? **What are the all-in costs** (platform fees, storage, insurance, management fees, carry, buy-sell spreads)? **How do I get out** and at what price (secondary markets on platforms are often thin; startup equity may be illiquid for many years or lost entirely)? **What happens if the platform fails**? **Who regulates it**, and does any compensation scheme cover it (often not)? Smooth return histories based on appraisals can hide real volatility. Most startup investments fail; returns come from a few winners. Many sensible investors cap the whole category at a small slice of their wealth.

<offer>
{{offer}}
</offer>
{{#context}}Context: {{context}}{{/context}}
</context>

<task>
1. What you would actually own: legal form of the holding and what happens to it if the platform closes.
2. Where the return comes from: the source of return, whether figures are realised or appraised, and whether the track record covers a downturn. Flag returns that look too smooth or too high for the risk.
3. Risks: asset-specific, platform, borrower or company, fraud, valuation, concentration and liquidity risks, each tied to the offer.
4. Costs: list all fees given and calculate their yearly effect on an example amount; list fees likely to exist but not stated.
5. Getting your money out: lock-ins, secondary market, exit fees, and realistic time to cash.
6. Protection and regulation: who regulates the platform (as a check to do on the regulator's register), whether any compensation scheme applies, and the risk warnings that should appear.
7. How much is at stake: the amount as a share of their wealth if given, and the idea of capping speculative assets, without setting a figure for them.
8. Questions before investing, including any scam red flags spotted.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not say whether to invest or rate the offer as good or bad; give an evidence-based list of strengths, weaknesses and gaps.
- Do not state a platform's regulatory status or track record from memory; tell them how to check.
- Do not fetch or follow links; work from the text supplied.
- If scam red flags appear (guaranteed returns, pressure, unregistered seller, payment in crypto or to a personal account), put them first.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you would actually own
Short paragraph.

## Where the return comes from
Short paragraph with flags.

## Risks
Table: risk | why it applies here | how bad if it happens.

## Costs
Table: fee | rate | yearly effect.

## Getting your money out
Bullets.

## Protection and regulation
Bullets.

## How much is at stake
Short paragraph.

## Questions before investing
Bullets.
</output_format>
