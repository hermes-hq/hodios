---
schema: 1
id: plan-debt-payoff
kind: prompt
title: Plan a debt payoff
description: Compares avalanche and snowball payoff orders month by month for a set of debts and one monthly payment, showing payoff dates, total interest and the trade-off between them.
category: financial-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, table, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [debt-avalanche, debt-snowball, credit-cards, interest]
pairs_with:
  prompts: [build-monthly-budget, plan-savings-goal]
  personas: [personal-finance-coach]
args:
  - name: debts
    description: Each debt with name, current balance, interest rate (APR) and minimum monthly payment. Mention promotional 0% periods, fixed loan terms or penalties for paying early.
    type: text
    required: true
  - name: monthly_payment
    description: Total amount available for all debt payments each month, including the minimums.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [Can you cover the minimums, Side by side, Avalanche schedule, Snowball schedule, Which to choose, Before you start, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You compare the two standard debt payoff orders. In both, every debt gets its minimum payment each month and all money left over goes to one target debt; when a debt is paid off, its whole payment rolls onto the next target.

- Avalanche targets the highest interest rate first. It is mathematically cheapest.
- Snowball targets the smallest balance first. It costs more interest but clears whole debts sooner, which many people need to stay motivated.

The difference between them is often small when rates are similar and large when one debt has a much higher rate. Showing the actual numbers lets the person choose with their eyes open.

Monthly amount for debts: {{monthly_payment}}
</context>

<task>
Debts:

<debts>
{{debts}}
</debts>

1. Check feasibility: sum the minimum payments. If {{monthly_payment}} is below that sum, stop the comparison, say so plainly, and go to the "Before you start" section.
2. Simulate both strategies month by month: monthly interest = balance x APR / 12, then apply payments; roll freed-up payments forward. Handle 0% promotional periods by using 0% until the promotion ends and the stated rate afterwards, and flag any promo balance that will not be cleared before it ends.
3. For each strategy report: the order debts are paid off, the month each one is cleared, total months to debt-free, and total interest paid.
4. Give the difference in interest and in months, and the date the first debt is cleared under each.
5. Recommend which to consider in terms of the trade-off, not as an instruction: avalanche if the interest saving is meaningful, snowball if the saving is small and early wins matter to the person. Mention a hybrid (clear one tiny balance first, then avalanche) when it fits.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do the arithmetic carefully and round to the nearest whole unit. Say the results are estimates: real lenders compound daily, charge fees and recalculate minimums.
- Never assume a missing rate or minimum; ask for it. If only a rate is missing for one debt, you may run the plan with a clearly labelled placeholder and say how the result could change.
- Do not recommend specific consolidation loans, balance-transfer cards or lenders. You may explain in general terms what consolidation and balance transfers are, with their usual catches (transfer fees, promotional periods ending, new spending on cleared cards).
- Mention briefly that a small emergency buffer helps avoid new borrowing during the plan.
- If the person cannot cover minimums, is being chased by collectors, or mentions court letters, wage garnishment or bankruptcy, point them to free, non-profit debt advice in their country before anything else.
{{> output/uncertainty}}
</constraints>

<output_format>
## Can you cover the minimums
Sum of minimums vs the monthly amount, and what is left over for the target debt.

## Side by side
Table: strategy | payoff order | months to debt-free | total interest | first debt cleared.

## Avalanche schedule
Table: debt | APR | balance | paid off in month | interest paid on it.

## Snowball schedule
Same table.

## Which to choose
Two to four sentences on the trade-off for these numbers.

## Before you start
Bullets: buffer, stopping new borrowing, automating payments, and any professional help that fits.

## Assumptions
Bullets.
</output_format>
