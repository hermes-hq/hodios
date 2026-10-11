---
schema: 1
id: explain-how-loan-interest-works
kind: prompt
title: Explain how interest works on my loan
description: Explains interest on a loan or card you already have - APR versus rate, daily interest, compounding, why early payments are mostly interest - worked through with your own numbers.
category: debt
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student]
requires: [none]
inputs: [text, document]
output: [explanation, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [apr, compound-interest, amortization, minimum-payments, interest-calculation]
pairs_with:
  prompts: [explain-credit-card-statement, compare-loan-offers, plan-debt-payoff]
args:
  - name: loan
    description: The loan or card you want explained - type (mortgage, car loan, personal loan, student loan, card), balance, interest rate or APR, payment, remaining term, and any figures from a statement you find confusing. Leave out account numbers.
    type: text
    required: true
  - name: question
    description: What puzzles you, for example why the balance barely moves, how much of each payment is interest, or what an extra payment would do.
    type: text
  - name: country
    description: Country, because how APR is defined and quoted differs.
    type: string
output_contract:
  format: markdown
  sections: [Your loan in one paragraph, Rate versus APR, How interest is charged, Where your payment goes, What changes the cost, Check your understanding]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You explain how interest works on a loan or card the person already holds, using their own figures so it sticks. The ideas people most often get wrong: the interest rate and the APR are different numbers (APR usually adds compulsory fees and is the comparison figure, though the exact definition varies by country); most loans and cards charge interest daily or monthly on the balance outstanding, so paying earlier or more often lowers it; on a repayment loan with fixed payments, the early payments are mostly interest and the later ones mostly principal (amortisation), which is why the balance seems stuck at first; a card charging only minimum payments can take many years to clear; a promotional or variable rate can change the payment; extra payments usually go to principal and shorten the term or lower the payment, depending on the lender; and simple interest, compound interest and precomputed interest (fixed interest added at the start) behave differently when you repay early.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
The loan:

<loan>
{{loan}}
</loan>
{{#question}}

Question:

<question>
{{question}}
</question>
{{/question}}

1. Summarise their loan in one plain paragraph: what kind of interest it charges as far as the details show, and what you had to assume.
2. Explain the difference between the rate and the APR for this loan, what the APR typically includes, and when the difference matters.
3. Show how interest is charged with their numbers: the approximate interest this month (balance times rate divided by 12, or daily rate times days, stating which method you assume), and how compounding or daily accrual works on this type of debt.
4. Show where their payment goes: a short amortisation table for the first three months and a later point, with interest, principal and remaining balance, plus the total interest over the remaining term if they pay as scheduled. For a card on minimum payments, show roughly how long it takes and the total interest.
5. Show what changes the cost: an extra payment of a sensible amount, paying earlier in the month, a rate change, or a payment holiday, each with an approximate effect in money. Say that lenders differ in how they apply extra payments and to check.
6. Answer their specific question directly, then give three short questions they can answer to check their understanding, with answers.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Show every calculation so it can be checked. State your assumptions (day count, monthly compounding, payment date) and say that the lender's statement or schedule is the authority.
- Round to whole currency units in tables, but keep the method visible.
- Do not invent fees, penalties or terms that are not in the details given; list what to look for in the agreement instead.
- If the numbers given do not fit together (for example a payment too small to cover the interest), point that out instead of forcing a result.
- Plain language; define each term the first time it appears.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your loan in one paragraph
Paragraph with assumptions.

## Rate versus APR
Short explanation.

## How interest is charged
Worked example with their numbers.

## Where your payment goes
Table: month | payment | interest | principal | balance, then the total interest.

## What changes the cost
Table: change | approximate effect.

## Check your understanding
Three questions with answers.
</output_format>
