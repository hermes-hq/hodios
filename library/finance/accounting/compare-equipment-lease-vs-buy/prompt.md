---
schema: 1
id: compare-equipment-lease-vs-buy
kind: prompt
title: Compare leasing and buying equipment
description: Compares leasing, financing and buying business equipment on total cost, discounted cost, cash flow, tax treatment to verify, flexibility and risk, using the user's actual quotes.
category: accounting
version: 1.0.1
status: incubating
stage: [plan]
role: [founder, operations-manager, financial-analyst]
requires: [none]
inputs: [text, document]
output: [table, report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [lease-vs-buy, equipment-finance, capital-expenditure, net-present-value]
pairs_with:
  prompts: [compare-loan-offers, calculate-cash-runway, forecast-cash-flow]
  personas: [fractional-cfo]
args:
  - name: equipment
    description: What the equipment is (for example a delivery van, a CNC machine, laptops for the team) and what it is used for.
    type: string
    required: true
  - name: quotes
    description: Each option's terms - purchase price; loan or hire purchase rate, term, fees and deposit; lease payments, term, upfront payment, end-of-term options, usage limits and what maintenance is included - plus expected resale value and your cost of borrowing if known.
    type: text
    required: true
  - name: usage_years
    description: How many years you expect to use the equipment. Optional; without it, the longest quoted term is used and stated.
    type: number
output_contract:
  format: markdown
  sections: [Summary, Options compared, Cash flow by year, Discounted comparison, Tax points to verify, Flexibility and risk, Questions to ask each provider]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Notes that leases can appear on the balance sheet and affect loan covenants."}
---
<context>
You compare ways to acquire business equipment on a like-for-like basis. Monthly payments are the wrong comparison: options differ in term, upfront cash, what happens at the end (return, buy for a balloon or nominal sum, keep), whether maintenance is included, usage limits and penalties, and resale value. A fair comparison puts every option over the same period, counts every cash flow including the residual value, discounts them at the business's cost of money, and then weighs what the numbers miss: cash preserved, flexibility to upgrade, obsolescence risk and the burden of owning.

Equipment: {{equipment}}
{{#usage_years}}Expected use: {{usage_years}} years{{/usage_years}}
</context>

<task>
Quotes and terms:

<quotes>
{{quotes}}
</quotes>

1. Restate each option in a comparable form: upfront cash, regular payments, term, end-of-term outcome, maintenance included, limits and fees. List anything missing from a quote (for example a balloon payment, documentation fees or return conditions) as a question.
2. Put every option over the same period of use. If a lease ends earlier, add a replacement or extension cost; if you own at the end, credit the expected resale value (state the assumption).
3. Build the cash flow by year for each option, including maintenance the user would pay when it is not included.
4. Total the undiscounted cost, then the discounted cost at the business's cost of borrowing (or a stated default rate, for example 8 percent, labelled as an assumption). Show the effective interest rate implied by the finance and lease quotes where the data allows.
5. List tax points to verify with an accountant: how purchased equipment is depreciated or qualifies for capital allowances or first-year deductions, how lease payments are deducted, VAT or sales tax on purchase versus on payments, and interest deductibility.
6. Weigh flexibility and risk: obsolescence, usage limits and excess charges, early termination costs, who bears breakdowns, and the effect on cash and borrowing capacity. Under some accounting frameworks most leases sit on the balance sheet as a liability, which can matter for loan covenants and lenders; mark this "verify" with the accountant.
7. Say which option is cheapest on discounted cost and which preserves the most cash, and what would change the answer (resale value, usage years, discount rate). Leave the decision with the user.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the quoted figures; label every assumption (resale value, discount rate, maintenance costs) and keep them in one place.
- Run the comparison before tax and list tax effects as points to verify, unless the user supplies their tax rates and treatment, in which case show an after-tax version too, labelled.
- Show all arithmetic and make sure totals agree across tables.
- Do not recommend a specific lender or leasing company.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three bullets: cheapest on discounted cost, best for cash, the assumption that could flip it.

## Options compared
Table: option | upfront | payments | term | end of term | maintenance | limits and fees.

## Cash flow by year
Table: year | option A | option B | option C.

## Discounted comparison
Table: option | total undiscounted | total discounted | implied rate.

## Tax points to verify
Bullets.

## Flexibility and risk
Table: factor | option A | option B | option C.

## Questions to ask each provider
Numbered.
</output_format>
