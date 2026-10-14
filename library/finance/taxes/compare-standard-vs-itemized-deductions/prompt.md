---
schema: 1
id: compare-standard-vs-itemized-deductions
kind: prompt
title: Compare standard and itemized deductions
description: For US federal returns, compares the standard deduction with itemizing from your mortgage interest, state and local taxes, gifts and medical costs, including bunching across years.
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, explanation, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [united-states, itemized-deductions, bunching, charitable-giving]
pairs_with:
  prompts: [organize-tax-documents, estimate-annual-tax-bill, plan-giving-budget]
  personas: [tax-educator]
args:
  - name: deductions
    description: Filing status, adjusted gross income (or close estimate), mortgage interest and loan size, state and local income or sales tax and property tax paid, charitable gifts (cash and non-cash), medical and dental costs not reimbursed, and anything else you think may be deductible.
    type: text
    required: true
  - name: tax_year
    description: The tax year you are deciding for.
    type: string
    required: true
  - name: state
    description: "Optional: your state, since some states tie their itemizing choice to the federal one."
    type: string
output_contract:
  format: markdown
  sections: [Your itemized total, Standard deduction comparison, Bunching across years, State return effect, Records to keep, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a US taxpayer decide whether itemizing deductions on their federal return beats taking the standard deduction. Since the standard deduction roughly doubled in 2018, most households take it, so itemizing only pays when the allowed itemized total is higher. Each category has limits people overlook: state and local taxes (income or sales tax plus property tax) are capped, and the cap and any income phase-out have changed in recent law, so they must be checked for the year; medical and dental costs count only above a percentage of adjusted gross income; mortgage interest is limited by the size and date of the loan and must be on acquisition debt; charitable gifts need proper acknowledgements and have percentage-of-income limits, and benefits received reduce them. If married filing separately and one spouse itemizes, the other generally must too. "Bunching" moves deductible spending, usually charitable gifts (sometimes through a donor-advised fund) or elective medical costs, into alternate years so the household itemizes in one year and takes the standard deduction in the next. Recent law changes may also allow some charitable deduction for non-itemizers in certain years; check the year.

Tax year: {{tax_year}}
{{#state}}State: {{state}}{{/state}}
</context>

<task>
Deductions and income:

<deductions>
{{deductions}}
</deductions>

1. Build the itemized total for {{tax_year}}: each category, the amount paid, the limit or floor that applies (SALT cap, medical floor of a percentage of AGI, mortgage debt limits, charitable limits), and the allowed amount. Mark every limit "verify" with the year; if you are not confident of a figure for {{tax_year}}, use a placeholder and say where to look.
2. Compare with the standard deduction for the filing status (plus any additional amount for age 65 or blindness), marked "verify". Show the difference and roughly what it is worth at the marginal rate the person gives or a labelled assumed rate.
3. Bunching: if the itemized total is close to the standard deduction, show a two-year illustration where gifts or flexible costs are concentrated in one year, comparing total deductions over two years against taking the standard deduction both years. Mention donor-advised funds as a mechanism, not a recommendation.
4. State return effect: whether the person's state, if given, requires the same choice as federal or has its own rules, marked "verify".
5. Records to keep for each itemized category.
6. Points to verify, including any charitable deduction available to non-itemizers for {{tax_year}}.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This entry is for US federal returns. If the person is not filing in the US, say so and suggest the general tax deductions explainer or a local adviser instead.
- Never present a deduction amount, cap or threshold as certain unless you are confident it applies to {{tax_year}}; mark everything "verify" against IRS guidance or the form instructions.
- Show arithmetic for every total.
- Do not tell the person to give more to charity or spend more to get a deduction; a deduction only reduces tax on money spent.
- Do not recommend specific funds or providers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Your itemized total
Table: category | paid | limit or floor | allowed. Totals row.

## Standard deduction comparison
Short calculation and the approximate tax difference.

## Bunching across years
Two-year table: year | approach | deduction taken. Total, or "Not useful here" with the reason.

## State return effect
One or two bullets.

## Records to keep
Checklist by category.

## Points to verify
Bullets with where to check each.
</output_format>
