---
schema: 1
id: compare-pension-lump-sum-vs-income
kind: prompt
title: Compare a pension lump sum with a lifetime income
description: Compares a pension lump sum or transfer value with a guaranteed lifetime income - what you give up, break-even age, inflation, survivor benefits and questions for a regulated adviser.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [document, text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [defined-benefit, pension-options, annuity, retirement-income]
pairs_with:
  prompts: [understand-pension-statement, plan-retirement-drawdown, plan-retirement-scenarios]
  personas: [investing-educator]
args:
  - name: offer
    description: The options you have been given - the guaranteed income (yearly amount, start age, how it rises each year, what a spouse or partner gets after your death) and the lump sum, commutation or transfer value offered, with any deadline.
    type: text
    required: true
  - name: situation
    description: Your age, health and family history if you want them considered, partner and dependants, other pensions and savings, debts, and what you would do with a lump sum. Optional.
    type: text
  - name: country
    description: Country, because tax, advice requirements and pension protections differ.
    type: string
output_contract:
  format: markdown
  sections: [What you are being offered, What the guaranteed income is worth, Break-even view, What you would give up and gain, Questions for a regulated adviser, Red flags]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people understand the choice between a guaranteed pension income for life (from a defined benefit or final salary scheme, or a similar promise) and a lump sum, commutation or transfer value instead. The guaranteed income carries protections that are expensive to buy: it lasts however long you live, it often rises with inflation, it may continue to a spouse or partner, and the investment risk sits with the scheme. A lump sum gives flexibility and something to leave behind, but moves longevity, investment and inflation risk to the person, and buying a comparable income on the open market often costs more than the transfer value. Simple comparisons divide the lump sum by the income ("20 times") and miss inflation linking and survivor benefits. Many countries require or strongly recommend regulated advice for giving up guaranteed benefits above a size, and pension transfers are a favourite target for scams.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
The offer:

<offer>
{{offer}}
</offer>
{{#situation}}

Situation:

<situation>
{{situation}}
</situation>
{{/situation}}

1. Restate what is being offered in plain words: income amount, start age, how it increases, survivor benefit, the lump sum or transfer value, and the deadline. Mark anything missing as [X] and say where in the scheme papers to find it.
2. Explain what the guaranteed income is worth: the lump-sum-to-income ratio, what the income would cost to buy elsewhere described as a question to get quoted, and the value of inflation linking and survivor benefits in words and a simple illustration.
3. Show a break-even view: the age at which total income received passes the lump sum, without and with an illustrative growth rate on the lump sum (labelled), and how inflation linking moves it. Make clear this ignores tax and is not advice.
4. Lay out what the person would give up and gain with each choice, tied to their situation (health, partner, other secure income, need for flexibility, desire to leave money, comfort with investment risk).
5. List questions for a regulated adviser who specialises in this kind of pension, including whether advice is required by law in their country, how the adviser is paid, and what a partial option would look like if the scheme allows one.
6. List red flags: cold calls, pressure to decide quickly, promises of high guaranteed returns, overseas investments, early access before the legal minimum age, and fees taken from the transfer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend taking or keeping the guaranteed income. Explain the trade-offs and who to ask.
- Never invent annuity rates, tax rules, advice thresholds or scheme rules. Mark any figure you illustrate as illustrative.
- Do not guess life expectancy for the person; you may say that health and family history affect the trade-off and that official life tables exist.
- If there are signs of a scam or pressure selling, put them first.
{{> output/uncertainty}}
</constraints>

<output_format>
## What you are being offered
Table: feature | guaranteed income | lump sum or transfer.

## What the guaranteed income is worth
Short explanation with the ratio and illustrations.

## Break-even view
Small table by age, with labelled assumptions.

## What you would give up and gain
Two columns of bullets tied to the situation.

## Questions for a regulated adviser
Bullets.

## Red flags
Bullets.
</output_format>
