---
schema: 1
id: check-tax-withholding
kind: prompt
title: Check tax withholding
description: Checks from payslips whether the tax withheld from pay is on track for the year, explains why it may be off and how withholding or tax codes are usually adjusted, with figures to verify.
category: taxes
version: 1.0.0
status: incubating
stage: [verify]
role: [individual]
requires: [none]
inputs: [text, document]
output: [report, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [withholding, tax-code, payslip, underpayment]
pairs_with:
  prompts: [explain-payslip, estimate-annual-tax-bill, explain-family-tax-credits]
args:
  - name: payslips
    description: Figures from your latest payslip (pay period, gross pay, tax withheld, year-to-date gross and tax, tax code or withholding settings) and how often you are paid. Earlier payslips help if pay changed during the year.
    type: text
    required: true
  - name: country
    description: Country (and state if relevant) where you are taxed, plus filing or marital status if your system uses it.
    type: string
    required: true
  - name: other_income
    description: Income with no tax withheld (freelance, rent, interest, a second job), expected bonuses, a job change this year, or deductions and credits you expect. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Year-end projection, Why it may be off, How withholding is usually adjusted, Figures to verify, Next check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check whether an employee's tax withholding will cover their actual tax for the year, early enough to fix it through payroll rather than with a surprise bill or a refund the government held for months. Withholding goes wrong for predictable reasons: two jobs or a job change (each employer assumes it is the only one), a wrong or emergency tax code, bonuses withheld at a flat rate, a partner's income in a joint system, and income outside payroll. Most systems let the employee correct this through a form to the employer, a request to the tax authority for a new code, or an allowance.

Country: {{country}}
</context>

<task>
Payslip figures:

<payslips>
{{payslips}}
</payslips>

{{#other_income}}Other income and changes:

<other_income>
{{other_income}}
</other_income>{{/other_income}}

1. Extract the figures: pay frequency, periods so far, year-to-date gross and tax, current per-period withholding, and the code or settings. If year-to-date figures or the tax year start are missing, ask for them, because the projection depends on them.
2. Project to year end: year-to-date tax plus remaining periods at the current rate, adding expected bonuses at their usual withholding treatment.
3. Estimate the full-year liability on all income, including other income, with rates labelled by year or marked "verify". Show the arithmetic.
4. Compare the two and give a verdict: on track, under-withheld or over-withheld, by roughly how much, with the confidence.
5. Explain the likely causes, drawing on the figures (for example, a code that looks like an emergency or basic-rate code, or two employers each applying a full allowance).
6. Explain how adjustments are usually made in {{country}}: which form or online service, who to contact, and how much extra per pay period would close the gap over the remaining periods.
7. Say when to check again.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Present the projection as an estimate. Never state that a tax code or setting is wrong as fact; say what it suggests and how to confirm it with the employer or tax authority.
- Never present a rate, threshold or code meaning as certain unless you are confident it is current for {{country}}; otherwise mark it "verify" and point to the official withholding tool or guidance.
- If you do not know the country's adjustment process, say "I don't know" and describe the general options to ask payroll about.
- Prefer fixing withholding during the year over planning to pay a large balance later, and mention any penalty for under-withholding as something to verify.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
One line: on track, under or over, by about how much, and the confidence.

## Year-end projection
Table: item | amount | working.

## Why it may be off
Bullets tied to the figures.

## How withholding is usually adjusted
Numbered steps, with the per-period change that would close the gap.

## Figures to verify
Checklist.

## Next check
One line with a date or trigger.
</output_format>
