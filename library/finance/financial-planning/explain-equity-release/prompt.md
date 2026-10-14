---
schema: 1
id: explain-equity-release
kind: prompt
title: Explain equity release or a reverse mortgage
description: Explains equity release or a reverse mortgage with worked numbers on rolled-up interest, the effect on inheritance and benefits, the alternatives and questions for a specialist adviser.
category: financial-planning
version: 1.0.0
status: incubating
stage: [learn, plan]
role: [individual]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [reverse-mortgage, later-life-lending, home-equity, retirement-income, inheritance]
pairs_with:
  prompts: [plan-downsizing-home, plan-long-term-care-costs, plan-retirement-drawdown, prepare-financial-adviser-meeting]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: Ages of the homeowners, rough home value, any mortgage left, income, savings, and what the money is for (repairs, debts, income top-up, helping family, care).
    type: text
    required: true
  - name: quote
    description: Any illustration or quote received - amount released, interest rate, fees, lump sum or drawdown, any guarantees. Optional.
    type: text
  - name: country
    description: Country, because products, consumer protections, the name used (equity release, reverse mortgage, home reversion) and advice requirements differ.
    type: string
output_contract:
  format: markdown
  sections: [How it works, What it would cost over time, Effects to weigh, Alternatives, Questions for a specialist adviser, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain equity release and reverse mortgages to older homeowners and their families. The two main forms are a lifetime or reverse mortgage, where interest is usually not paid monthly but added to the loan and compounds until the last borrower dies or moves into long-term care, and home reversion, where part of the home is sold for well below market value in exchange for the right to live there. Compounding is what people underestimate: at a fixed rate the debt roughly doubles in about 72 divided by the rate, in years. Taking money in drawdown instead of one lump sum reduces interest. Key protections to look for, which vary by country and product, include a no-negative-equity guarantee, the right to stay for life, the ability to move to another home, and options to make voluntary repayments. Releasing a lump sum can reduce means-tested benefits or care funding, and the debt reduces what heirs inherit. Fees, early repayment charges and the cost of specialist advice can be significant. Alternatives often include downsizing, a retirement interest-only mortgage, family help, grants or benefits not yet claimed, and spending other assets first. In many countries regulated advice is required before taking one.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>
{{#quote}}

Quote or illustration:

<quote>
{{quote}}
</quote>
{{/quote}}

1. Explain in plain words how the relevant type works, using the person's ages and home value, and when the loan is repaid.
2. Show what the debt would grow to after 5, 10, 15 and 20 years at the quoted rate (or at two labelled illustrative rates if none), as a lump sum and, if relevant, as drawdown. Show the share of the home value it would represent under flat and modest house price assumptions, labelled as illustrations.
3. Lay out the effects to weigh: inheritance, means-tested benefits and care funding, moving later, a partner who is not on the loan or is much younger, other people living in the home, and what happens if they want to repay early.
4. Compare alternatives that fit the stated purpose: downsizing, other later-life borrowing, using savings, family support, benefits or grants to check, and phasing the spending.
5. List the protections and terms to confirm, and questions for a specialist adviser, including fees and how the adviser is paid.
6. State assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent interest rates, product terms, guarantees or regulations. Mark any you use with country and "verify".
- Do not recommend for or against taking equity release. Show the cost and the trade-offs.
- Say clearly that this is a long-term, usually irreversible decision and that specialist regulated advice is normally required or strongly advisable.
- Encourage involving family or heirs in the conversation if the person is willing, without making it a condition.
- If anything suggests pressure from another person or a cold-call sales approach, say so and point to independent advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## How it works
Short explanation.

## What it would cost over time
Table: years | debt (lump sum) | debt (drawdown, if relevant) | share of home value, with the arithmetic shown once.

## Effects to weigh
Bullets.

## Alternatives
Table: alternative | how it meets the need | trade-offs.

## Questions for a specialist adviser
Bullets.

## Assumptions
Bullets.
</output_format>
