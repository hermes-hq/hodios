---
schema: 1
id: model-round-dilution
kind: prompt
title: Model the dilution of a funding round
description: Builds the pro forma cap table for a priced round - price per share, new shares, option pool top-up and each holder's ownership before and after - with every formula shown.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, financial-analyst]
advice_risk: [financial]
inputs: [dataset, text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [cap-table, dilution, pre-money, option-pool, priced-round, ownership]
pairs_with:
  prompts: [explain-term-sheet, calculate-safe-conversion, size-option-pool]
  personas: [venture-capitalist]
args:
  - name: cap_table
    description: The current cap table - each holder or class with share counts (founders, employees, granted and unallocated options, prior preferred). Fully diluted counts if you have them.
    type: text
    required: true
  - name: round_terms
    description: The proposed round - amount raised, pre-money or post-money valuation, target option pool after the round and whether it sits in the pre-money.
    type: text
    required: true
  - name: convertibles
    description: Any SAFEs or notes that convert in this round, with amounts, caps and discounts. Leave empty if none.
    type: text
output_contract:
  format: markdown
  sections: [Inputs and assumptions, Price per share, Pro forma cap table, Who pays for the pool, Sensitivity, Checks for your lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You model priced-round dilution for founders. The headline valuation hides most of what founders actually give up. The details that move ownership are: whether the option pool top-up is counted in the pre-money (the "option pool shuffle", which makes existing holders pay for it), whether the price per share is computed on a fully diluted basis that includes granted and unallocated options, and whether SAFEs and notes convert before the new money and so also dilute the founders rather than the new investor. Rounding share counts and using issued shares instead of fully diluted shares are the usual sources of error.
</context>

<task>
Model this round.

<cap_table>
{{cap_table}}
</cap_table>

<round_terms>
{{round_terms}}
</round_terms>

{{#convertibles}}
<convertibles>
{{convertibles}}
</convertibles>
{{/convertibles}}

1. Inputs and assumptions: restate every number you will use and label each assumption you had to make (for example "pool counted in pre-money, as the terms say", or "assumed fully diluted includes unallocated options").
2. Price per share: compute the pre-money fully diluted share count including the pool top-up if it sits in the pre-money, then price per share = pre-money valuation / pre-money fully diluted shares. Show the formula with numbers.
3. If convertibles are given, convert them first: shares = purchase amount / conversion price, where the conversion price is the lower of the cap price and the discounted round price. Note if the cap is pre-money or post-money and that the method changes the result.
4. New investor shares = amount raised / price per share. Compute the post-money fully diluted count and post-money valuation as a check.
5. Pro forma cap table: each holder before and after, shares and percentage.
6. Who pays for the pool: compare the result with the pool counted in the post-money instead, and show the difference in founder ownership in percentage points and in effective pre-money valuation.
7. Sensitivity: founder ownership after the round at the given valuation plus and minus 20%, and at a pool target 5 points lower.
8. Checks for your lawyer: the items in the terms that change the numbers and need confirming in the documents.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the numbers given. Never invent share counts, valuations or terms; ask for what is missing or label the assumption.
- Show every formula with the numbers in it. Round share counts down to whole shares and percentages to two decimals, and say so.
- Check the arithmetic: post-money ownership must sum to 100% and post-money valuation must equal price per share times post-money fully diluted shares. State the check.
- Explain trade-offs; do not tell the founder which valuation or pool to accept.
- Share issuance, conversion mechanics and tax depend on the jurisdiction and the documents. Recommend the company's lawyer confirms the final cap table.
</constraints>

<output_format>
## Inputs and assumptions
## Price per share
## Pro forma cap table
Table: Holder | Shares before | % before | Shares after | % after.
## Who pays for the pool
## Sensitivity
Table: Scenario | Price per share | Founders % after | Investor % after.
## Checks for your lawyer
</output_format>
