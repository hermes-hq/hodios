---
schema: 1
id: calculate-home-affordability
kind: prompt
title: Calculate how much home you can comfortably afford
description: Works out a comfortable home price from take-home pay, debts, deposit and the full cost of owning, compares it with what lenders may offer, and stress-tests the payment against higher rates.
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
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [home-budget, mortgage-payment, rate-stress-test, first-time-buyer, home-buying]
pairs_with:
  prompts: [estimate-home-buying-costs, prepare-mortgage-application, compare-rent-vs-buy, check-rent-affordability]
  personas: [personal-finance-coach]
args:
  - name: income
    description: Gross and take-home pay for everyone on the mortgage, how stable it is, and any bonus or overtime.
    type: text
    required: true
  - name: finances
    description: Deposit saved, other savings, monthly debts (car, cards, student loans), current monthly spending, childcare and any upcoming changes such as a baby or a pay cut.
    type: text
    required: true
  - name: market
    description: The area and type of home, typical prices you have seen, current mortgage rates you have been quoted, and expected property taxes, service charges or insurance. Optional.
    type: text
  - name: country
    description: Country, because lender income multiples, loan-to-value limits, stress tests and buying costs differ.
    type: string
output_contract:
  format: markdown
  sections: [Your comfortable price, What owning costs each month, Comfort versus lender maximum, Rate stress test, What would change the number, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people work out how much home they can afford before they start viewing. Lenders calculate a maximum loan from gross income, debts and their own stress tests; that is a ceiling, not a recommendation, and borrowing the maximum often leaves no room for saving, repairs or a rate rise. A comfortable figure starts from take-home pay and the household's real spending, adds every cost of owning (mortgage payment, property taxes, insurance, service charges or association fees, utilities that may be higher than now, and maintenance, often budgeted at around 1 percent of the home's value a year), and keeps an emergency fund intact after the deposit and buying costs are paid. Common rules of thumb such as housing costs below about a third of take-home pay are a sanity check, not a rule. The payment should be tested at a rate a few points higher in case it rises when a fixed period ends.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Income:

<income>
{{income}}
</income>

Finances:

<finances>
{{finances}}
</finances>
{{#market}}

Market:

<market>
{{market}}
</market>
{{/market}}

1. Start from take-home pay and current spending: work out how much the household can put towards total housing costs each month while still saving and keeping a buffer. Show the arithmetic.
2. Subtract non-mortgage owning costs (property taxes, insurance, service charges, maintenance allowance, any utility increase) to get a comfortable mortgage payment.
3. Convert that payment into a loan amount at the person's quoted rate (or two labelled illustrative rates) over a typical term, using a standard repayment formula, and add the deposit to get a comfortable price. Deduct buying costs and the emergency fund from cash first.
4. Compare with a rough lender maximum based on income multiples or debt ratios the person gives or that are typical in their country (marked "verify"), and explain the gap between comfort and maximum.
5. Stress-test the comfortable payment at rates 2 and 3 points higher, and show what that would do to the monthly budget.
6. Show what would change the number: a bigger deposit, a longer term (and its total interest cost), clearing a debt, a second income, or upcoming life changes.
7. State assumptions.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent lender income multiples, stress test rules, rates or taxes; use the person's figures or typical ones marked "verify".
- Do not predict rates or prices; stress tests are illustrations.
- Present the lender maximum as a ceiling, not a target, and say why.
- Keep an emergency fund in place after buying; do not count it towards the deposit.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your comfortable price
One or two lines with the price range and the payment it implies.

## What owning costs each month
Table: cost | monthly | source or assumption.

## Comfort versus lender maximum
Short comparison.

## Rate stress test
Table: rate | monthly payment | change | what it does to the budget.

## What would change the number
Bullets with the effect of each.

## Assumptions
Bullets.
</output_format>
