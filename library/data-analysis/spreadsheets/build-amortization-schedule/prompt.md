---
schema: 1
id: build-amortization-schedule
kind: prompt
title: Build a loan amortisation schedule
description: Builds a loan amortisation schedule in a spreadsheet with payment formulas, extra-payment scenarios and total interest, explaining each column. Use to see how a loan or mortgage pays down.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [individual, financial-analyst, founder]
stack: [excel, google-sheets]
subject: [real-estate]
inputs: [text]
output: [table, code, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [amortization, mortgage, loan-payment, extra-payments, interest]
pairs_with:
  prompts: [run-what-if-analysis, write-spreadsheet-formula]
args:
  - name: principal
    description: Amount borrowed, in your currency (for example 250000).
    type: number
    required: true
  - name: annual_rate
    description: Nominal annual interest rate as a percentage (for example 5.25 for 5.25%).
    type: number
    required: true
  - name: term_months
    description: Loan term in months (for example 360 for 30 years).
    type: number
    required: true
  - name: extra_payment
    description: Extra amount paid towards principal every month, if you want to compare scenarios. 0 means none.
    type: number
    default: 0
output_contract:
  format: markdown
  sections: [Loan summary, Inputs block, Schedule columns, First and last rows, Extra-payment comparison, Assumptions to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build loan schedules that match what a lender's statement will show, to the cent where the lender's method is known, and that someone without a finance background can read. A schedule that hard-codes the payment or lets the balance go negative in the last month is wrong; one built from an inputs block with each column explained lets the borrower test their own scenarios.
</context>

<task>
Build an amortisation schedule for a loan of {{principal}} at a nominal annual rate of {{annual_rate}}% over {{term_months}} months, with an extra monthly principal payment of {{extra_payment}}.

1. Read the rate as a percentage. If it looks like a decimal (below 1, such as 0.05), confirm whether 5% was meant before going further. If any input is missing or implausible, ask.
2. Compute and state the scheduled monthly payment with `PMT(rate/12, term, -principal)`, rounded to cents, and the total interest with no extra payment.
3. Inputs block (named cells): Principal, AnnualRate, TermMonths, ExtraPayment, StartDate. Every schedule formula refers to these names.
4. Schedule columns, one row per month, with the formula for the first row and the formula for following rows:
   - Period; Payment date with `EDATE(StartDate, Period - 1)`.
   - Opening balance: Principal for period 1, then the previous Closing balance.
   - Interest: `ROUND(Opening * AnnualRate / 12, 2)`.
   - Scheduled payment: the smaller of the PMT amount and Opening plus Interest, so the final payment is not overpaid.
   - Principal portion: Scheduled payment minus Interest.
   - Extra payment: the smaller of ExtraPayment and the balance left after the scheduled principal.
   - Closing balance: Opening minus Principal portion minus Extra.
   - Cumulative interest.
   - Every column returns blank once the opening balance reaches zero, so the schedule stops by itself when extra payments shorten the loan.
5. Show the first three rows and the final row with real numbers for these inputs, and check that the closing balance of the final row is zero (or within one cent, absorbed by the last payment).
6. Compare scenarios: no extra payment against the extra payment given (and, if it is 0, against one round illustrative amount you label as an example): months to pay off, payoff date, total interest, interest saved.
7. Explain each column in one plain sentence.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Show the arithmetic for the payment and the totals. Do not round intermediate balances except where the formula rounds interest to cents.
- State the method: monthly compounding of a nominal annual rate with fixed payments. Some loans differ: daily simple-interest loans, mortgages compounded semi-annually (as in Canada, where the monthly rate is `(1 + rate/2)^(1/6) - 1`), adjustable rates, payment holidays, fees and insurance included in the payment. Name these as things to check against the loan agreement.
- Do not advise whether to make extra payments, refinance or invest instead. You may list the factors people weigh (prepayment penalties, higher-interest debt, emergency savings, tax treatment in their country) without recommending one.
- Formulas work in both Excel and Google Sheets; use comma separators and note once that some locales use semicolons.
</constraints>

<output_format>
One sentence first: this is a calculation tool, and the lender's statement and a qualified adviser are the reference for decisions.

## Loan summary
Monthly payment, number of payments, total paid, total interest, with the formula used.

## Inputs block
Table: Name | Cell | Value.

## Schedule columns
Table: Column | First-row formula | Following-row formula | Plain meaning.

## First and last rows
The first three rows and the final row as a table with numbers.

## Extra-payment comparison
Table: Scenario | Months | Payoff date | Total interest | Interest saved.

## Assumptions to check
Bullets: compounding method, rounding, fees, prepayment terms.
</output_format>
