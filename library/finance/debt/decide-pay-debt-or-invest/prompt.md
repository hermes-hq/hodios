---
schema: 1
id: decide-pay-debt-or-invest
kind: prompt
title: Decide between paying off debt and investing
description: Ranks where each spare pound or dollar should go - employer match, emergency fund, each debt, saving or investing - using interest rates, tax, risk and your own priorities.
category: debt
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [order-of-priority, employer-match, guaranteed-return, emergency-fund, interest-rates]
pairs_with:
  prompts: [compare-mortgage-overpay-vs-invest, check-employer-retirement-match, plan-debt-payoff, build-emergency-fund-plan]
  personas: [personal-finance-coach]
args:
  - name: debts
    description: Each debt with balance, interest rate (APR), monthly payment, any promotional rate and when it ends, and whether it is fixed or variable. Include mortgage, student loans, cards, car finance and overdraft.
    type: text
    required: true
  - name: money_available
    description: How much spare money you have each month and any lump sum, plus current savings and how many months of essential costs they cover.
    type: text
    required: true
  - name: retirement_and_investing
    description: Any workplace pension or retirement plan, the employer match rules, what you already invest, and the account types you have access to.
    type: text
  - name: country
    description: Country (and state or region), because tax relief, account types and student loan rules differ.
    type: string
output_contract:
  format: markdown
  sections: [The short answer, Your order of priority, Debt by debt, The numbers, What would change the order, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people decide where extra money should go when they have debts and also want to save or invest. Paying off a debt earns a guaranteed, tax-free return equal to its interest rate; investing earns an uncertain return that can be negative over several years. That makes high-interest debt (cards, overdrafts, payday and store credit, often 20% or more) almost always the first target once a small emergency buffer and any free employer match are in place, while low fixed-rate debt (some mortgages and subsidised student loans) is a genuine judgement call. Novices miss several things: an employer match is an instant return no debt can beat; a promotional 0% balance still needs a plan before the rate jumps; debts that may be written off or are repaid by income (some student loan systems) behave differently from ordinary loans; tax relief on pension contributions changes the comparison; money sent to a debt cannot be got back in an emergency, while savings can; and the right answer also depends on job security and how the person sleeps at night.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Debts:

<debts>
{{debts}}
</debts>

Money available:

<money>
{{money_available}}
</money>
{{#retirement_and_investing}}

Retirement and investing:

<retirement>
{{retirement_and_investing}}
</retirement>
{{/retirement_and_investing}}

1. Check the basics first: are all minimum payments being made, is anything in arrears or a priority debt (housing, energy, tax, court fines)? If so, catching up comes before any optional overpayment or investing; say so plainly.
2. Build the order of priority for spare money, explaining each step: a starter emergency buffer; the full employer match if there is one; high-interest debts in order of rate (highest first, with any promotional rates that end soon flagged); a fuller emergency fund; then the middle zone; then low-rate debts versus investing.
3. For each debt, place it in one of three bands: pay down now (rate clearly above a cautious expected investment return after tax), judgement call (rate close to it), or no rush (rate clearly below it, or the debt has special features such as income-linked repayment or possible write-off). State the threshold you are using and that it is an assumption, not a forecast.
4. Show the numbers: for the spare amount, the guaranteed interest saved per year by sending it to each debt, next to an illustrative range of investment outcomes at low, middle and high returns, labelled as illustrations. Include tax relief or tax-free account treatment only as points to check for their country.
5. List what would change the order: unstable income, a planned big purchase or home move, a variable rate likely to rise, a promotional rate ending, an upcoming mortgage application, or strong discomfort with debt.
6. Give next steps for this month, in order, with amounts.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never recommend a specific fund, share, provider or product. Talk about types of account and investment only in general terms.
- Do not present investment returns as expected or guaranteed. Label every return figure as illustrative and show a range that includes a poor outcome.
- Do not invent tax rules, contribution limits or student loan terms. Name what to check and where (the plan provider, the tax authority, the loan servicer).
- Never suggest stopping minimum payments, skipping priority bills or borrowing to invest.
- If the person cannot cover essentials or is behind on payments, switch focus to free, non-profit debt advice instead of optimising.
- Show the arithmetic so it can be checked, and round to whole currency units.
{{> output/uncertainty}}
</constraints>

<output_format>
## The short answer
Two or three sentences: where the next spare money should go first.

## Your order of priority
Numbered list with the amount or target for each step.

## Debt by debt
Table: debt | rate | band (pay down now, judgement call, no rush) | why.

## The numbers
Table: option | guaranteed saving or illustrative return per year | risk | can you get the money back?

## What would change the order
Bullets.

## Next steps
Checklist for this month.
</output_format>
