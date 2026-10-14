---
schema: 1
id: compare-property-investing-routes
kind: prompt
title: Compare ways to invest in property
description: Compares buy-to-let, REITs and property funds, and property crowdfunding on money needed, returns after costs, leverage, liquidity, effort and risk, as education rather than a recommendation.
category: investing
version: 1.0.0
status: incubating
stage: [learn]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [property-investing, reits, buy-to-let, real-estate-crowdfunding]
pairs_with:
  prompts: [analyze-rental-property, evaluate-alternative-investment, check-portfolio-diversification, spot-investment-scam]
  personas: [investing-educator]
args:
  - name: situation
    description: The money you could put in, whether you own your home, time you would give it, horizon, country, and the routes you are considering.
    type: text
    required: true
  - name: example_deal
    description: Any specific property, fund or platform offer with its figures. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The routes compared, Leverage cuts both ways, Costs people forget, Liquidity and concentration, Your example, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People often say "property" as if it were one investment. Buying a rental property directly is really a small, leveraged, concentrated business: it needs a large deposit, a mortgage, landlord time or agent fees, and carries void periods, repairs, regulation and tax that differ by country, and it cannot be sold quickly or in part. Listed property companies and REITs give a slice of many buildings for a small sum, can be sold daily, but their prices move with share markets and interest rates. Open-ended property funds have had to suspend withdrawals in market stress because buildings cannot be sold as quickly as investors want their money. Property crowdfunding and loan-based platforms offer high headline returns but often lock money up, depend on the platform's survival and due diligence, and may lack the deposit or investor protection people assume. Gross rental yield (rent / price) flatters returns; net yield after all costs, and return on the cash put in after mortgage costs, are what count.

<situation>
{{situation}}
</situation>
{{#example_deal}}<example_deal>
{{example_deal}}
</example_deal>{{/example_deal}}
</context>

<task>
1. The routes compared: a table across buy-to-let, listed property shares or REITs, open-ended property funds, property crowdfunding or loan platforms (and any route they named) on minimum money, typical leverage, how returns arise, liquidity, effort, diversification, main risks and investor protection to check.
2. Leverage cuts both ways: a worked example of a mortgaged property where prices rise 10% and where they fall 10%, showing the effect on the deposit, plus the effect of an interest rate rise on monthly cash flow. Label figures as illustrative.
3. Costs people forget: for direct property (purchase taxes and fees, repairs, voids, agent fees, insurance, compliance, tax on rent and gains) and for funds and platforms (charges, spreads, exit restrictions).
4. Liquidity and concentration: what it means to have much of one's wealth in one building or one platform, and how property may already be a large part of their wealth if they own their home.
5. Your example: if a deal or offer is given, work out gross and net yield or the platform's terms, and list what is missing or worrying (including scam red flags for "guaranteed" returns).
6. Questions to check with a tax adviser, mortgage broker, solicitor or licensed adviser, and how to verify a platform is authorised in their country.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend a route, property, fund or platform.
- Do not state local property prices, rents, tax rates or landlord rules as fact; frame as things to check for their country.
- Label all illustrative numbers.
{{> output/uncertainty}}
</constraints>

<output_format>
## The routes compared
Table: route | money needed | leverage | liquidity | effort | main risks | protection to check.

## Leverage cuts both ways
Worked example table.

## Costs people forget
Bullets per route.

## Liquidity and concentration
Short paragraph.

## Your example
Calculation and red flags, or "no example given".

## Questions to check
Bullets.
</output_format>
