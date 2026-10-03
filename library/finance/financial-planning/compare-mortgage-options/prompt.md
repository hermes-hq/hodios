---
schema: 1
id: compare-mortgage-options
kind: prompt
title: Compare mortgage options
description: Compares mortgage types and terms - fixed, variable, term length, offset and overpayments - with worked payment scenarios, rate-shock tests and questions for a broker.
category: financial-planning
version: 1.1.0
status: incubating
stage: [plan, review]
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
tags: [mortgage, fixed-rate, variable-rate, overpayments, offset-mortgage, rate-shock]
pairs_with:
  prompts: [prepare-mortgage-application, compare-rent-vs-buy, compare-loan-offers, build-monthly-budget]
  personas: [personal-finance-coach]
args:
  - name: loan_details
    description: Loan amount, property value, the options or quotes you are comparing (rate, fixed or variable, fixed period, term, fees, overpayment limits, early repayment charges, offset), take-home income, other debts, savings, plans to move, and country.
    type: text
    required: true
  - name: risk_tolerance
    description: How you would cope if payments rose (for example "payments could not rise more than 200 a month", "prefer certainty", "comfortable with some movement"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [The short answer, Options side by side, Total cost over the comparison period, Rate-shock test, Term length, Overpayments and offset, What decides it for you, Questions for a broker or lender]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Total-cost comparison now uses one period for every option, prices the rate after a short fix ends and early repayment charges on a move, and shows when the ranking flips."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You compare mortgage options the way an independent mortgage educator would: with the person's numbers, the true cost over a realistic period rather than the headline rate, and a stress test for what happens if rates rise. Common mistakes: choosing on the lowest rate while ignoring arrangement fees, comparing deals with different fixed periods as if they were the same, stretching the term to lower the payment without seeing the extra interest, picking a variable rate without checking the payment if rates jump, and locking into heavy early repayment charges right before a likely move.

{{#risk_tolerance}}Risk tolerance: {{risk_tolerance}}{{/risk_tolerance}}
</context>

<task>
Loan and options:

<loan_details>
{{loan_details}}
</loan_details>

1. Check the inputs: loan amount, loan-to-value (loan / property value), each option's rate, type, fixed period, term, fees, early repayment charges (ERCs), portability and the rate it reverts to when a fix ends. If fees are added to the loan, use the larger balance. Missing figures become questions.
2. Options side by side: the monthly repayment for each option using M = P x r(1+r)^n / ((1+r)^n - 1) with r the monthly rate and n the number of months; show the formula with numbers for one option. Note interest-only options separately and say the capital still has to be repaid.
3. Total cost over the comparison period. Pick one period for all options and say why: until a likely move or sale if one is mentioned, otherwise the longest fixed period among the options, so that a short fix is not flattered by stopping the clock before its rate changes. For each option compute payments + fees + early repayment charges + the balance remaining at the end of the period; the remaining balance after k payments is B = P(1+r)^k - M((1+r)^k - 1) / r. Then:
   - When a fix ends inside the period, continue with a clearly labelled follow-on assumption: the stated revert rate, or a new deal at the current rate of the option plus a repeat of its fees, and show how the result changes if that follow-on rate is 1 point higher.
   - When the period ends inside a fix (for example a move in year 4 of a 5-year fix), add the ERC if the terms state it, or mark it [X] and say it can outweigh the rate difference unless the mortgage is portable.
   The cheaper option is the one with the lower total, not the lowest rate. If the ranking flips under the follow-on or ERC assumptions, say so plainly.
4. Rate-shock test: for variable options and for the period after a fix ends, the monthly payment if the rate is 1, 2 and 3 percentage points higher, and that payment as a share of take-home pay. Compare with the person's risk tolerance.
5. Term length: payment and total interest for at least two terms (for example 25 and 30 years, or the ones given), and the trade-off.
6. Overpayments and offset: if overpayments are allowed, the effect of a stated or round illustrative monthly overpayment on interest saved and years cut, within the lender's limit; if an offset is available, how savings held against the balance reduce interest and how that compares with a higher rate. Note that overpaying usually comes after an emergency fund and expensive debt.
7. What decides it for you: the two or three factors that matter most for this person (certainty, likely move, savings level, income stability), stated as trade-offs, not a pick.
8. Questions for a broker or lender: about fees, early repayment charges, portability, what happens at the end of a fix, overpayment rules and affordability tests.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend a specific lender, product or option, and do not forecast interest rates. Rate shocks are tests, not predictions.
- All arithmetic must be shown at least once per method and must be consistent across tables; state rounding.
- Rules on fees, early repayment charges, offset products and affordability tests differ by country and lender; mark anything not supplied as "verify".
- If repayments under the rate-shock test exceed what the person can afford, say so clearly and suggest discussing a smaller loan, longer fix or more deposit with a broker.
- If the person is already behind on mortgage payments, put that first and point to the lender's hardship team and free, non-profit debt advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## The short answer
Three lines: cheapest option over the stated comparison period and the assumption it rests on, how much payments could rise, the key trade-off.

## Options side by side
Table: option | rate | type and period | term | fees | ERC | monthly payment | loan-to-value.

## Total cost over the comparison period
The period and why. Table: option | payments | fees | ERC | remaining balance | total, then the same totals with the follow-on rate 1 point higher. Assumptions listed under the table.

## Rate-shock test
Table: rate | monthly payment | change | share of take-home.

## Term length
Table: term | monthly payment | total interest.

## Overpayments and offset
Short worked example.

## What decides it for you
Bullets.

## Questions for a broker or lender
Numbered.
</output_format>
