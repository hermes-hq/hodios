---
schema: 1
id: analyze-rental-property
kind: prompt
title: Analyse a rental property
description: Analyses a rental property's numbers from the user's figures - gross and net yield, cash flow, cash-on-cash return, vacancy and repair reserves - with stress tests and the gaps to fill.
category: investing
version: 1.0.0
status: incubating
stage: [discover, review]
role: [individual]
requires: [none]
inputs: [text]
output: [table, report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [real-estate]
tags: [rental-yield, buy-to-let, cash-flow, cap-rate, landlord]
pairs_with:
  prompts: [estimate-home-buying-costs, compare-mortgage-options, explain-tax-on-investments]
  personas: [investing-educator]
args:
  - name: property_details
    description: Price, expected monthly rent, location type, condition and any known costs - property tax, insurance, service or HOA charges, management fees, planned repairs, letting fees, licensing.
    type: text
    required: true
  - name: financing
    description: How you would pay - cash, or deposit size, loan amount, interest rate, term and whether repayment or interest-only, plus purchase costs if known. Optional; a cash purchase is analysed without it.
    type: text
  - name: country
    description: Country (and region if relevant), since landlord taxes, rules and typical costs differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Headline numbers, Assumptions, Income and expenses, Returns, Stress tests, What the numbers say, Gaps and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rental listings and enthusiastic friends quote gross yield: annual rent divided by price. It ignores almost everything that decides whether a rental works - empty months, repairs, management, insurance, taxes, service charges, big-ticket replacements and the cost of the loan. A sober analysis builds from gross rent down to net operating income, then subtracts debt service to get real cash flow, compares that with the actual cash put in, and stress-tests the result against higher rates, longer vacancies and a major repair. Capital growth is left out of the base case on purpose: if the deal only works with price rises, that is a bet, not an income investment.

<property_details>
{{property_details}}
</property_details>
{{#financing}}<financing>
{{financing}}
</financing>{{/financing}}
{{#country}}Country: {{country}}{{/country}}
</context>

<task>
1. Assumptions table: list every input as given or assumed. Where the person gave no figure, use a labelled, conservative default and say how to check it: vacancy 1 month a year (about 8%), maintenance 1% of property value a year or 8-10% of rent, management 8-12% of rent if not self-managed, a capital-expenditure reserve (roof, boiler, kitchen) of 5% of rent, insurance and property tax from local quotes. If financing is missing, analyse as a cash purchase.
2. Income and expenses (annual): gross scheduled rent, minus vacancy, equals effective rent; minus each operating expense; equals net operating income (NOI). Debt service is not an operating expense.
3. Returns, each with the formula:
   - Gross yield = annual rent / price.
   - Net yield (cap rate) = NOI / price.
   - Debt service = annual loan payments (amortising payment formula, or interest only).
   - Annual cash flow = NOI - debt service; also monthly.
   - Cash invested = deposit + purchase costs + initial repairs.
   - Cash-on-cash return = annual cash flow / cash invested.
   - Debt service coverage ratio = NOI / debt service (where financed).
   - Break-even occupancy = (operating expenses + debt service) / gross scheduled rent.
4. Stress tests on cash flow: interest rate +2 points (or at the end of a fixed period), vacancy of 2 months, rent 10% lower, and a one-off major repair of a stated size (for example 5% of price). Show which ones turn cash flow negative.
5. What the numbers say: a plain reading of the figures - whether the property covers its costs on conservative assumptions, how thin the margin is, and how dependent the result is on growth or leverage. Describe; do not recommend buying or not.
6. Gaps and questions: what to verify (local rents for similar units, landlord tax treatment including how loan interest is treated, licensing and safety rules, service charges and ground rent or HOA rules, tenant demand), and questions for a lender, a local letting agent and a tax adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use the person's figures exactly; label all defaults. Never present a default as a local fact.
- Show the arithmetic so it can be checked; round to whole currency units and one decimal place for percentages.
- Results are before income tax unless the person supplies a tax rate; say so, and note that landlord tax rules can change the picture materially.
- Leave appreciation out of the base case. If the person asks, show it separately as a scenario with a labelled growth rate.
- Do not tell the person to buy, sell, or which lender, agent or area to choose.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline numbers
Four lines: gross yield, net yield, monthly cash flow, cash-on-cash return.

## Assumptions
Table: item | value | given or assumed | how to check.

## Income and expenses
Table: line | annual | monthly. Ends with NOI, debt service and cash flow.

## Returns
Table: metric | formula | result.

## Stress tests
Table: scenario | annual cash flow | change.

## What the numbers say
One short paragraph.

## Gaps and questions
Bullets grouped by who to ask.
</output_format>
