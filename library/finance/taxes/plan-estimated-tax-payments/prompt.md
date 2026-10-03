---
schema: 1
id: plan-estimated-tax-payments
kind: prompt
title: Plan estimated tax payments
description: Plans estimated or advance tax payments on self-employed or untaxed income, with a dated schedule, amounts and methods to verify, penalty risks and a monthly set-aside routine.
category: taxes
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [consultant, founder, content-creator, individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [estimated-tax, self-employed, payments-on-account, tax-deadlines]
pairs_with:
  prompts: [plan-freelance-tax-set-aside, estimate-annual-tax-bill, plan-business-tax-calendar]
args:
  - name: income_projection
    description: Expected self-employed or untaxed income this year (monthly if uneven), last year's income and total tax bill if known, any salary with tax withheld, and payments already made this year.
    type: text
    required: true
  - name: country
    description: Country (and state if relevant) where you are tax resident.
    type: string
    required: true
  - name: tax_year
    description: The tax year to plan, for example 2026 or 2026-27. Optional; without it, the current tax year is assumed and stated.
    type: string
output_contract:
  format: markdown
  sections: [Do you need to pay in advance, How the instalments are set, Payment schedule, Set-aside routine, Risks and penalties, Questions for your accountant]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan the advance tax payments that self-employed people, landlords and investors must make during the year when no employer withholds tax. Most systems have one: quarterly estimated payments, payments on account based on last year's bill, or instalments the tax office sets after the first return. The common failures are missing the first instalment, paying a balance and the first advance payment in the same month without warning, and underpaying when income jumps. Most systems also offer a safe method, often based on last year's tax, that limits penalties even if this year's income is higher.

Country: {{country}}
{{#tax_year}}Tax year: {{tax_year}}{{/tax_year}}
If no tax year is given, assume the current tax year and say which one you assumed.
</context>

<task>
Income projection:

<income_projection>
{{income_projection}}
</income_projection>

1. Say whether advance payments are likely required in {{country}} for this situation, and the usual thresholds or exemptions (for example a minimum liability, or most tax already deducted at source). Mark "verify" where unsure.
2. Explain how instalments are set in {{country}}: who calculates them (the taxpayer, or the tax office from the last return), the usual due dates, and the methods allowed (prior-year basis, current-year estimate, annualised for uneven income). Name the method that limits penalties, if there is one.
3. Compute the instalments using the user's figures under each available method, showing the arithmetic. If last year's tax is not given, estimate from the projection and say the estimate is rough.
4. Build a dated payment schedule for the year, including any balancing payment for the previous year that falls in the same window, and flag months where two payments stack up.
5. Turn the schedule into a set-aside routine: a percentage of each payment received moved to a separate tax account, sized so each instalment is covered before it is due.
6. Explain what happens if income changes: how to reduce or increase instalments, the interest or penalty cost of reducing too far, and when to recalculate (quarterly).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present a due date, rate or threshold as certain unless you are confident it is current for {{country}}; mark it "verify" and point to the tax authority's own guidance. Remind the user that due dates falling on weekends or holidays may shift.
- If you do not know the country's system, say "I don't know", ask which system applies, and give only the general structure and a cautious set-aside.
- Err on the side of paying enough: show the cost of underpaying alongside the cost of overpaying (cash tied up until the refund).
- If the user already missed an instalment or cannot pay, tell them to pay what they can now and contact the tax authority about a payment arrangement, since penalties and interest usually grow with time.
{{> output/uncertainty}}
</constraints>

<output_format>
## Do you need to pay in advance
Two or three sentences with the test applied.

## How the instalments are set
Short explanation, then a table: method | how it works | instalment amount | penalty protection.

## Payment schedule
Table: due date (confirm) | what it is | amount | paid from.

## Set-aside routine
Checklist with the percentage to move.

## Risks and penalties
Bullets.

## Questions for your accountant
Numbered.
</output_format>
