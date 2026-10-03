---
schema: 1
id: calculate-true-cost-of-hire
kind: prompt
title: Calculate the true cost of a hire
description: Calculates the full cost of an employee beyond salary, including employer taxes, benefits, equipment, recruitment, onboarding and management time, as one-off and annual figures with sources to verify.
category: accounting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, manager, operations-manager, recruiter]
requires: [none]
inputs: [text, preferences]
output: [table, report, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [employment-cost, employer-costs, payroll-tax, loaded-cost]
pairs_with:
  prompts: [set-up-first-payroll, build-small-business-budget, calculate-cash-runway]
args:
  - name: salary
    description: Gross annual salary or hourly rate and hours for the role, plus any bonus or commission plan.
    type: string
    required: true
  - name: country
    description: Country (and state or region if relevant) where the employee will work.
    type: string
    required: true
  - name: benefits
    description: Benefits you plan to offer (pension contribution, health insurance, extra leave, allowances), how you will recruit (agency, job boards, referral) and whether the role needs equipment, a desk or travel. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The number, Recurring annual cost, One-off costs, Time cost, First-year total, Sources to verify, Questions before you commit]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You work out what an employee really costs, so a small business owner can budget a hire and compare it with a contractor or doing nothing. Salary is only the largest line. Employers usually also pay social security or payroll taxes (often with caps and thresholds), compulsory pension or insurance contributions, benefits, equipment and software, recruitment fees, and in some countries extra salary months or mandatory accruals. Then there is the cost that never appears on an invoice: the months before a new hire is fully productive and the manager time spent getting them there.

Salary: {{salary}}
Country: {{country}}
</context>

<task>
{{#benefits}}Benefits, recruitment and setup:

<benefits>
{{benefits}}
</benefits>{{/benefits}}

1. List the employer-side statutory costs that usually apply in {{country}}: employer social security or payroll taxes, unemployment and accident insurance, compulsory pension contributions, any extra salary months or holiday pay rules. Give each rate with its year and confidence, apply any thresholds or caps, and mark "verify" where unsure.
2. Add the benefits the user listed, or common ones for this market as clearly labelled assumptions if none were given.
3. Add recurring operating costs: equipment depreciation or lease, software licences, workspace, phone, training, payroll provider fees.
4. Add one-off costs: recruitment (agency fees are often a percentage of first-year salary, verify the quote), job ads, background checks, equipment purchase, and onboarding.
5. Estimate the time cost separately and label it as an opportunity cost, not cash: a ramp-up period at partial productivity and manager hours during onboarding, with the assumptions stated.
6. Total it as recurring annual cost, one-off cost, and first-year total, and give the loaded multiple of salary.
7. List the sources to check for each statutory rate and the questions to settle before making an offer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present a statutory rate, threshold or cap as certain unless you are confident it is current for {{country}}; label each with the year and mark "verify", naming the tax authority or social security body.
- Keep cash costs and time costs in separate totals.
- If you do not know the country's employer costs, say "I don't know", use a clearly labelled placeholder range, and point to a local payroll provider or accountant.
- Do not advise on classifying the worker as a contractor to save cost; if asked, say that misclassification carries legal and tax risk and that the test depends on the working relationship, not the label.
{{> output/uncertainty}}
</constraints>

<output_format>
## The number
One line: first-year cash cost, recurring annual cost and the multiple of salary.

## Recurring annual cost
Table: item | basis | rate or amount | annual cost | confidence.

## One-off costs
Table: item | basis | amount.

## Time cost
Table: item | assumption | value. Labelled as opportunity cost.

## First-year total
Short table: salary, statutory, benefits, operating, one-off, cash total; time cost separately.

## Sources to verify
Bullets.

## Questions before you commit
Numbered.
</output_format>
