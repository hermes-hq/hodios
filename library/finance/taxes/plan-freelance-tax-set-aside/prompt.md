---
schema: 1
id: plan-freelance-tax-set-aside
kind: prompt
title: Plan a freelance tax set-aside
description: Estimates what percentage of freelance income to set aside for tax, with every assumption stated, a simple saving routine and a payment calendar to confirm with an accountant.
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, founder, content-creator, consultant]
requires: [none]
inputs: [text]
output: [plan, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [self-employed, freelancers, estimated-tax, tax-reserve]
pairs_with:
  prompts: [organize-tax-documents, build-monthly-budget, forecast-cash-flow]
args:
  - name: income
    description: Expected freelance income for the year (or monthly pattern), plus any salary or other income, and whether income tax or social contributions are already withheld anywhere.
    type: text
    required: true
  - name: country
    description: Country (and state or region if relevant) where you are tax resident, and your business form if known (sole trader, single-member company, other).
    type: string
    required: true
  - name: expenses
    description: Business expenses you expect to deduct (equipment, software, home office, travel), roughly per year. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Set aside this much, How the estimate works, Saving routine, Payment calendar to confirm, What could change the number, Questions for your accountant]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a freelancer avoid the classic first-year shock: spending everything that came in, then facing a tax bill (sometimes plus advance payments for next year) with nothing saved. The goal is a safe set-aside percentage and a routine, not a tax return. Freelancers usually owe more than income tax: social security or national insurance contributions, sometimes health contributions, and possibly sales tax or VAT collected on behalf of the state, which is never the freelancer's money to spend.

Country: {{country}}
</context>

<task>
Income:

<income>
{{income}}
</income>

{{#expenses}}Expected business expenses:

<expenses>
{{expenses}}
</expenses>{{/expenses}}

1. Estimate taxable profit = freelance income minus deductible business expenses. If expenses are not given, assume none and say the set-aside will be conservative.
2. List the charges that typically apply to self-employed people in {{country}}: income tax, self-employed social contributions, any local or regional income tax, and sales tax or VAT if registration thresholds may be crossed. Mark each with your confidence and "verify" where you are unsure of current rates or thresholds.
3. Build an estimate with stated assumptions: rate bands or an effective rate for income tax, contribution rates, and interaction with any salary already taxed. Show the arithmetic and give a range (low, central, high), then round up the central estimate to a simple set-aside percentage of every payment received.
4. Keep any sales tax or VAT collected separate: 100% of it goes into the tax reserve on top of the percentage.
5. Design the routine: a separate account for tax, moving the percentage on the day each payment arrives, and a monthly check.
6. Build a payment calendar of the kinds of payments usually due (annual balance, advance or estimated payments, VAT returns) with "confirm date" next to each, and flag that the first year can include a double payment in some countries.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a cautious planning estimate, not a tax calculation. Say plainly that the real liability depends on details an accountant or the tax authority will confirm, and that rates and thresholds change yearly.
- Never present a rate, threshold or due date as certain unless you are confident it is current for {{country}}; otherwise mark it "verify". If you do not know the country's system well, say "I don't know" for those parts and give the general structure only.
- Err towards setting aside too much rather than too little, and say why.
- Do not advise on tax avoidance schemes, choice of company structure, or which expenses to claim beyond listing common categories to ask about.
- If the person mentions past unpaid tax or an existing bill they cannot pay, tell them to contact the tax authority or a tax professional early about payment arrangements.
{{> output/uncertainty}}
</constraints>

<output_format>
## Set aside this much
One line: the percentage of each payment (and VAT or sales tax separately, if relevant), plus the estimated annual amount.

## How the estimate works
Table: charge | basis | assumed rate | estimated amount | confidence. Then the low-central-high range.

## Saving routine
Short checklist.

## Payment calendar to confirm
Table: payment type | usual timing | estimated amount | confirm with.

## What could change the number
Bullets.

## Questions for your accountant
Numbered.
</output_format>
