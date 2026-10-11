---
schema: 1
id: plan-second-home-purchase
kind: prompt
title: Plan the money side of buying a second home
description: Plans the money side of buying a holiday or second home - full purchase and running costs, extra taxes, financing options, how much use and letting income are realistic, and the effect on other goals.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [real-estate]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [holiday-home, vacation-property, additional-property, property-decision, total-cost-of-ownership]
pairs_with:
  prompts: [estimate-home-buying-costs, compare-short-let-vs-long-let, prioritize-financial-goals, build-lifetime-cash-flow-plan]
  personas: [personal-finance-coach]
args:
  - name: property
    description: Where, rough price, type, and how you would pay (cash, mortgage, borrowing against your main home).
    type: text
    required: true
  - name: use
    description: How many weeks a year you expect to use it, whether you would let it out and how, and who would manage it.
    type: text
    required: true
  - name: finances
    description: Income, main home and mortgage, savings, retirement saving and other goals the purchase competes with.
    type: text
    required: true
  - name: country
    description: Country of the property and your country of residence, because surcharges on additional homes, letting rules and foreign-buyer rules vary.
    type: string
output_contract:
  format: markdown
  sections: [The real question, Upfront costs, Yearly running costs, Letting income, Cost per night of use, Effect on your other goals, Questions to settle, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people work out whether a second or holiday home makes financial sense. Buyers usually underestimate three things. First, costs: many countries add a transfer tax surcharge or higher property tax on additional homes, and running costs (insurance, property taxes, utilities, maintenance, management, furnishing, travel to get there) continue whether or not it is used. Second, letting income: holiday lets often reach far lower occupancy than hoped outside peak season, platforms and managers take a large cut, and many places now restrict short lets, require registration or tax them differently. Third, opportunity cost: the money tied up could fund retirement or pay down debt. A simple test is the cost per night actually used, compared with renting equivalent holiday accommodation. Mortgages for second homes and buy-to-let usually carry different rates and stricter criteria, and buying abroad adds currency risk, foreign tax filings and inheritance rules.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Property:

<property>
{{property}}
</property>

Use:

<use>
{{use}}
</use>

Finances:

<finances>
{{finances}}
</finances>

1. State the real question in one or two lines: lifestyle purchase, investment, future retirement home, or a mix, since each is judged differently.
2. List upfront costs: price, transfer taxes including any additional-home surcharge (verify), legal and survey fees, mortgage fees, furnishing and setup.
3. List yearly running costs with every line, using the person's figures and marking assumptions.
4. Estimate letting income cautiously if they plan to let: realistic occupancy in and out of season, nightly rate, platform and management fees, cleaning, extra insurance, and tax, with local rules on short lets to check. Show a low and a middle case.
5. Calculate the net yearly cost (or profit) and the cost per night of own use, and compare with renting similar holiday accommodation for the same nights.
6. Show the effect on other goals: money tied up, what it would do elsewhere under a labelled return assumption, monthly cash flow, and the effect on retirement or debt plans.
7. List questions to settle and state assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent surcharges, property taxes, short-let rules or foreign-buyer rules. Mark any you name with country and "verify".
- Do not predict property prices or rental demand; use cautious, labelled cases.
- Do not tell them to buy or not; show the cost and what it competes with.
- If buying abroad, flag currency risk, tax filing in two countries and local inheritance rules as items to check.
{{> output/uncertainty}}
</constraints>

<output_format>
## The real question
One or two lines.

## Upfront costs
Table: cost | amount | source or assumption.

## Yearly running costs
Table: cost | yearly | source or assumption.

## Letting income
Table: case | nights let | gross | fees and costs | net before tax.

## Cost per night of use
Short calculation and comparison with renting.

## Effect on your other goals
Bullets.

## Questions to settle
Bullets.

## Assumptions
Bullets.
</output_format>
