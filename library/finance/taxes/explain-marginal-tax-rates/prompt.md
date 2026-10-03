---
schema: 1
id: explain-marginal-tax-rates
kind: prompt
title: Explain marginal and effective tax rates
description: Explains marginal versus effective tax rates with the person's income and supplied brackets, showing why a higher bracket only taxes the extra income and where real cliff edges exist.
category: taxes
version: 1.1.0
status: incubating
stage: [learn]
role: [individual, student]
subject: [economics]
requires: [none]
inputs: [text]
output: [explanation, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [marginal-rate, effective-rate, tax-brackets, pay-rise, financial-literacy]
pairs_with:
  prompts: [explain-payslip, plan-freelance-tax-set-aside, explain-tax-on-investments]
  personas: [tax-educator]
args:
  - name: income
    description: Taxable income to work with, with currency and whether it is before or after allowances or deductions (for example "62,000 EUR taxable income" or "salary 48,000, considering a raise to 53,000").
    type: string
    required: true
  - name: brackets
    description: "The bracket table to use, copied from an official source, with the year and country (for example: 0% to 12,570; 20% to 50,270; 40% to 125,140; 45% above). Optional; without it the answer uses clearly made-up brackets."
    type: text
  - name: country
    description: Country (and state or region if it has its own income tax) and tax year, so the answer can name the right official source and any well-known tapers to verify. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The short answer, Tax band by band, Marginal versus effective, What a raise really costs, Where it gets more complicated, What to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.1.0, note: "Adds an optional country and tax year, and flags when a gross salary is run through brackets meant for taxable income."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach how progressive income tax works using the person's own numbers. The most common misunderstanding is that moving into a higher bracket makes all income taxed at the higher rate, so a raise could leave someone worse off. In a bracket system that is false: only the income above each threshold is taxed at that band's rate. But the honest answer has a second half: some systems contain real cliff edges and tapers (an allowance withdrawn as income rises, a benefit or credit reduced, a social contribution with its own thresholds), and there the effective marginal rate on a slice of income can be much higher than the headline bracket.

Income: {{income}}
{{#country}}Country and tax year: {{country}}{{/country}}
</context>

<task>
{{#brackets}}Brackets to use:

<brackets>
{{brackets}}
</brackets>{{/brackets}}

1. If brackets were supplied, use exactly those. If the income given is a gross salary and the table applies to taxable income after allowances or deductions, say so: apply only the allowances the person supplied, or label the result approximate. If not, do not guess a real country's current brackets: build a simple, obviously illustrative table (round thresholds and rates), label it "made-up brackets for teaching", explain the concept with it, and tell the person to paste their official bracket table to see their real figures.
2. Tax band by band: split the income across the bands, compute the tax in each, and total it. Show every multiplication.
3. Marginal versus effective: state the marginal rate (the rate on the next unit of income) and the effective or average rate (total tax / income), and explain in two sentences why they differ.
4. What a raise really costs: if a raise or second figure is given, compute the extra tax and the extra take-home on the increase, and the rate on that increase. Otherwise use an extra 1,000 as the example. Make explicit that crossing a threshold only changes the rate on the part above it.
5. Where it gets more complicated: in general terms, list what can make the true marginal rate differ from the bracket rate: social contributions or payroll taxes with their own thresholds, allowances or credits that phase out, means-tested benefits withdrawn as income rises, student loan repayments based on income, and local or regional taxes. If a country is given or obvious from the input and you are confident a well-known taper exists there, mention it as an example to verify; otherwise stay general.
6. What to check: where to find their official bracket table and what to confirm (year, filing status, allowances applied before the brackets).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present a country's brackets, allowances or thresholds as current fact unless they were supplied. Mark anything you add from memory as "verify".
- All arithmetic must be shown and must add up exactly. Round only the final figures, and say how you rounded.
- Explain income tax only unless the person asks about the other items; mention them in step 5.
- This is an explanation, not a tax calculation for filing; say once that the real liability depends on deductions, credits and status.
{{> output/uncertainty}}
</constraints>

<output_format>
## The short answer
Two or three sentences with the marginal rate, effective rate and total tax.

## Tax band by band
Table: band | rate | income in this band | tax. Totals row.

## Marginal versus effective
Two short paragraphs.

## What a raise really costs
Small table: before | after | difference, for income, tax and take-home.

## Where it gets more complicated
Bullets.

## What to check
Bullets.
</output_format>
