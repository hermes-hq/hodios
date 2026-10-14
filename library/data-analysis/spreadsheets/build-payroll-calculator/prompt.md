---
schema: 1
id: build-payroll-calculator
kind: prompt
title: Build a payroll calculator spreadsheet
description: Builds a spreadsheet that turns hours, salaries and rates into gross pay, deductions and net pay per employee, using tax and contribution rules you supply, with checks and a pay summary.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, individual]
stack: [excel, google-sheets]
requires: [none]
inputs: [text]
output: [table, code, tests]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [gross-to-net, payroll-deductions, small-employer, pay-run, payslip-figures]
pairs_with:
  prompts: [build-timesheet-calculator, build-commission-calculator, calculate-tiered-rates]
  personas: [spreadsheet-expert]
args:
  - name: pay_setup
    description: The employees (or roles), pay frequency, salaried or hourly, rates, overtime and bonuses, and the deductions that apply (income tax, social security or national insurance, pension, health, union, loans) with the rates and thresholds for the tax year, copied from the official source.
    type: text
    required: true
  - name: country
    description: Country and region, and the tax year, so the structure fits local payroll.
    type: string
    required: true
  - name: app
    description: Spreadsheet application to build it in.
    type: enum
    enum: [excel, google-sheets]
    default: excel
output_contract:
  format: markdown
  sections: [Scope and warnings, Rules as understood, Workbook layout, Formulas, Checks and test cases, Pay run routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build payroll spreadsheets for small employers who want to understand or double-check their pay figures. Payroll arithmetic has standard traps: tax bands and thresholds apply per pay period or cumulatively depending on the country; some contributions are charged on earnings between a lower and upper limit; pre-tax deductions (some pension schemes, salary sacrifice) reduce taxable pay while post-tax ones do not; employer contributions are a cost to the employer but do not reduce net pay; overtime and bonuses may be taxed differently in the period they are paid; rounding happens at specific points; and the year-to-date figures matter for cumulative systems. Rates and thresholds change every tax year and often within the year. In many countries employers must also report payroll to the tax authority in real time or monthly, which a spreadsheet does not do. A spreadsheet is useful for understanding, budgeting and checking, but official payroll software or a payroll provider is usually needed to file and stay compliant.

<pay_setup>
{{pay_setup}}
</pay_setup>

Country and tax year: {{country}}
</context>

<task>
Build the calculator in {{app}}.

1. Scope and warnings: say what the spreadsheet will and will not do (it calculates; it does not file, issue official payslips or keep up with rule changes) and that every rate must be checked against the official tax authority guidance for the stated tax year.
2. Restate the rules as a numbered list using only the rates and thresholds the user supplied. Where a needed rule is missing (for example how a deduction is calculated, whether thresholds are per period), list it as a question and build with a clearly labelled placeholder cell, not an invented figure.
3. Lay out the workbook: a Rates sheet holding every rate, band and threshold in named cells with the tax year and source; an Employees table (ID, pay type, rate or salary, pay frequency, deduction settings); a Pay Period table (employee, period, hours, overtime hours, bonus); a Calculation sheet; and a Summary sheet with totals per period for gross pay, each deduction, net pay and employer costs.
4. Give the formulas: gross pay for salaried and hourly staff (including overtime multipliers); pre-tax deductions; taxable pay; banded tax using a band table and `SUMPRODUCT` or a progressive calculation; contributions between lower and upper limits with `MIN`/`MAX`; post-tax deductions; net pay; employer contributions; and year-to-date columns if the rules are cumulative. Show where rounding is applied.
5. Add checks: gross minus all employee deductions equals net; no negative net pay; hours within a sensible range; every employee has a rate; totals tie to the summary. Provide three test cases with hand-calculated expected results based on the supplied rates.
6. Describe the pay run routine: enter hours, review the checks, compare against the payroll software or provider's figures, and record any difference.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent tax rates, thresholds or contribution rules. Use only figures the user supplied; otherwise use a labelled placeholder and ask.
- Every rate lives in a named cell with its tax year; no hard-coded rates inside formulas.
- Do not present the sheet as a compliant payroll system; recommend payroll software, a provider or an accountant for filing and edge cases (leavers, statutory pay, multiple jobs, benefits in kind).
- Keep employee data minimal: an ID or first name, no national identifiers or bank details in the example.
</constraints>

<output_format>
## Scope and warnings
## Rules as understood
## Workbook layout
Table: Sheet | Columns | Purpose.
## Formulas
Each with its cell and a one-line explanation, in code blocks.
## Checks and test cases
Table: Case | Inputs | Expected gross | Expected deductions | Expected net.
## Pay run routine
</output_format>
