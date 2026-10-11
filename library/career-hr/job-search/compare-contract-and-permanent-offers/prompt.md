---
schema: 1
id: compare-contract-and-permanent-offers
kind: prompt
title: Compare contract and permanent offers
description: Converts a contract day or hourly rate and a salaried offer into comparable yearly figures, counting unpaid time, benefits, costs and gaps between contracts, then weighs the risk.
category: job-search
version: 1.0.0
status: incubating
stage: [review]
role: [job-seeker]
advice_risk: [financial]
requires: [none]
inputs: [text, preferences]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [contracting, day-rate, salary-comparison, benefits-value, job-offer, total-compensation]
pairs_with:
  prompts: [evaluate-job-offer, accept-job-offer-in-writing, negotiate-job-offer]
args:
  - name: contract_offer
    description: The contract offer - day or hourly rate, expected length, hours per day or week, whether paid through an agency, your own company or as a temporary employee, notice, and any expenses or travel.
    type: text
    required: true
  - name: permanent_offer
    description: The permanent offer - base salary, bonus, pension or retirement contributions, health and other benefits, paid leave, and any other pay.
    type: text
    required: true
  - name: country
    description: Country (and state or province), since tax, social contributions and contractor rules differ.
    type: string
    required: true
  - name: your_situation
    description: Optional - savings runway, how easily you find contracts in your field, dependants, and what you value (security, flexibility, pay, learning).
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Contract yearly value, Permanent yearly value, Side by side, Break-even rate, Risks and non-money factors, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people compare contract and permanent work honestly. A day rate looks high because it has to cover what an employer otherwise pays for: paid holidays and public holidays, sick days, pension or retirement contributions, health cover, training, equipment, insurance, accounting, and the gaps between contracts. A common rough check is to multiply the day rate by a realistic number of billable days (often well under 230 once leave, sickness and gaps are counted) rather than by 260 working days. Tax treatment can differ a lot between being a temporary employee, working through an agency's payroll, or running your own company, and some countries have rules that decide whether a contractor is taxed like an employee. Permanent roles carry their own risks (layoffs, probation), but usually give notice periods, statutory protections and benefits that contracts do not.

<contract_offer>
{{contract_offer}}
</contract_offer>
<permanent_offer>
{{permanent_offer}}
</permanent_offer>
Country: {{country}}
{{#your_situation}}
<your_situation>
{{your_situation}}
</your_situation>
{{/your_situation}}
</context>

<task>
1. Assumptions: list every assumption in a table (billable days per year, days between contracts, holiday and sick days, costs you will pay as a contractor, benefits value), with the figure used and why. Use the user's numbers wherever given; otherwise use clearly labelled placeholders they should replace.
2. Contract yearly value: gross yearly income (rate times billable days), minus costs a contractor covers (insurance, accounting, equipment, training, pension contributions to match the permanent offer, health cover where relevant), giving a comparable yearly figure before personal tax. Show the working.
3. Permanent yearly value: base plus expected bonus (at a realistic payout, not the maximum), plus the employer's pension or retirement contribution, plus a value for health and other benefits where stated, showing the working.
4. Side by side: both figures in one table, plus a low and high scenario for the contract (fewer and more billable days).
5. Break-even rate: the day or hourly rate at which the contract equals the permanent offer under the stated assumptions.
6. Risks and non-money factors: income gaps, notice periods, statutory protections, career progression, flexibility, and how the person's runway and field affect the risk.
7. Questions to check: tax treatment and contractor-status rules in {{country}} to confirm with an accountant or tax adviser, how the contract is paid (agency payroll, own company, temporary employee), and anything missing from either offer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not calculate personal income tax or state tax rules for {{country}} as fact; compare before personal tax and list tax questions for an adviser.
- Show every calculation so the user can change a number and redo it.
- Do not tell the user which offer to take; give the comparison and the factors that would tip it.
- Do not invent benefit values; if a benefit is stated without a value, use a labelled placeholder.
</constraints>

<output_format>
Start with one sentence: this is a before-tax comparison on stated assumptions, and tax treatment must be checked locally.
## Assumptions
Table: Item | Figure used | Source or reason.
## Contract yearly value
## Permanent yearly value
## Side by side
Table: Scenario | Contract | Permanent | Difference.
## Break-even rate
## Risks and non-money factors
## Questions to check
</output_format>
