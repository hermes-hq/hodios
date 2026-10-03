---
schema: 1
id: compare-mortgage-overpay-vs-invest
kind: prompt
title: Compare overpaying a mortgage with investing
description: Compares overpaying a mortgage with investing or saving the same money, with illustrative scenarios, a break-even return, risk, liquidity and tax notes, and the questions that decide it.
category: financial-planning
version: 1.1.0
status: incubating
stage: [plan]
role: [individual, parent]
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
level: intermediate
tags: [mortgage-overpayment, opportunity-cost, compounding, home-equity]
pairs_with:
  prompts: [compare-mortgage-options, plan-retirement-scenarios, build-emergency-fund-plan, plan-debt-payoff]
  personas: [personal-finance-coach]
args:
  - name: mortgage
    description: Balance, interest rate, years left, whether the rate is fixed (and until when), overpayment limits or early repayment charges, and whether mortgage interest is tax-deductible for you.
    type: text
    required: true
  - name: monthly_amount
    description: The extra amount per month you could put toward either option (and any lump sum).
    type: string
    required: true
  - name: country
    description: Country, since tax-advantaged accounts, mortgage interest tax rules and overpayment rules differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [The short answer, Check these first, Your numbers, Scenarios, What the table cannot show, Questions that decide it]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Scenarios keep cash flows equal by investing the freed payment once an overpaid mortgage is cleared, respect overpayment limits, and price the rate after a fixed period ends."}
---
<context>
Overpaying a mortgage earns a guaranteed, tax-free "return" equal to the mortgage rate (lower if the interest is tax-deductible), but the money is locked into the house. Investing the same money has a higher expected return over long periods and keeps it accessible, but it is uncertain, can fall, and may be taxed unless it goes into a tax-advantaged account; investing inside a pension may also attract tax relief or an employer match. Saving in cash is the low-risk middle option. The right answer depends on the rate gap, the time horizon, tax wrappers, risk tolerance, and whether the foundations (emergency fund, no expensive debt, employer match taken) are in place.

Country: {{country}}
Monthly amount: {{monthly_amount}}

<mortgage>
{{mortgage}}
</mortgage>
</context>

<task>
1. Check these first: emergency fund in place, no debt more expensive than the mortgage, any employer pension match being collected, overpayment limits and early repayment charges, and whether the fixed rate ends soon. If a foundation is missing, say so first and show how that changes the comparison.
2. Your numbers: the effective mortgage rate (after any tax deduction the person states), the break-even return an investment would need after fees and tax to beat overpaying, and the guaranteed outcome of overpaying - interest saved and time cut from the term, using the amortisation formula with the extra payment. If the rate is fixed for only part of the remaining term, assume the same rate afterwards, label that assumption, and show the result at the rate 2 points higher as well. Show the method.
3. Scenarios over the remaining term (and at 10 years): overpay; save in cash at a labelled rate; invest in a taxable account; invest in a tax-advantaged account or pension where relevant. Use three labelled annual returns for investing (for example 2%, 5%, 7% nominal after fees) and one cash rate. Keep the cash flows equal: every scenario spends the normal mortgage payment plus the extra amount each month until the end of the original term, so in the overpay scenario the whole freed payment (normal payment plus extra) is invested at the same labelled return from the month the mortgage is cleared. Without this the overpay option is understated. Compare the net position (investments or savings minus remaining mortgage) at the same dates for each. Respect any overpayment limit: money above the limit goes to savings in the overpay scenario.
4. What the table cannot show: liquidity (overpaid equity cannot be spent without remortgaging), risk of a bad decade for markets, lower loan-to-value bands that may cut the next rate, peace of mind of owning outright, flexibility to reduce payments in hardship, rate changes at the end of a fixed period, and the option to split the money.
5. Questions that decide it: 6-8 questions the person answers (How would I feel if investments fell 30% the year before I wanted to retire? Do I want to be mortgage-free by a date? Will my rate reset soon?).
6. The short answer: summarise, with their numbers, what the decision mostly hinges on. Do not choose for them.
</task>

<constraints>
{{> guardrails/professional-limits}}
- All investment returns and cash rates are labelled illustrations. Show the formulas once.
- Do not recommend a specific fund, account provider or lender, or say which option to take.
- Do not model tax in detail; state the tax treatment you assume (for example taxable versus tax-free account, mortgage interest deductible or not) and tell them to verify it for {{country}}.
- If the mortgage rate is variable, show the comparison at the current rate and at the rate 2 points higher.
{{> output/uncertainty}}
</constraints>

<output_format>
## The short answer
Three or four sentences, with the break-even return.

## Check these first
Checklist with their status.

## Your numbers
Effective rate, break-even return, interest saved and years cut by overpaying.

## Scenarios
Table: option | assumed return | value of savings or investments | mortgage left | net position at 10 years | net position at end of original term. Then one line on when the overpaid mortgage is cleared and what the freed payment is assumed to earn.

## What the table cannot show
Bullets.

## Questions that decide it
Numbered.
</output_format>
