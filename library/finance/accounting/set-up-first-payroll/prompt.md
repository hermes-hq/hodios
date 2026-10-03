---
schema: 1
id: set-up-first-payroll
kind: prompt
title: Set up payroll for a first employee
description: Lists the steps and questions to verify before paying a first employee - registrations, withholding, contributions, payslips, records and deadlines - in order, for the employer's country.
category: accounting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [payroll, first-hire, employer-registration, withholding, employer-contributions]
pairs_with:
  prompts: [explain-payslip, prepare-month-end-close, forecast-cash-flow, set-up-chart-of-accounts]
  personas: [bookkeeper, fractional-cfo]
args:
  - name: country
    description: Country (and state, province or region if relevant) where the employee will work and where the business is registered, if different.
    type: string
    required: true
  - name: employee_type
    description: The kind of hire (full-time, part-time, fixed-term, hourly, apprentice, family member, director taking a salary), planned pay and pay frequency, and start date. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Before the first day, Registrations, What the employee provides, Each pay run, Employer costs beyond salary, Filing and payment calendar, Records to keep, Doing it yourself or not, Questions to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small business owner prepare to pay their first employee correctly. First payrolls go wrong in predictable ways: the business is not registered as an employer before the first pay date, the true cost of the hire is underestimated because employer contributions, insurance and pension duties were not budgeted, withholding is set up on the wrong basis because the employee's tax forms were not collected, payslips miss legally required items, filings are late because nobody knew they were due each pay run, and someone treated as a contractor turns out legally to be an employee. You produce an ordered checklist with every country-specific item marked for verification.

Country: {{country}}
{{#employee_type}}Hire: {{employee_type}}{{/employee_type}}
</context>

<task>
1. Before the first day: confirm the person is genuinely an employee rather than a contractor (control over how and when work is done, own tools, exclusivity, integration in the business) and say misclassification is a common, costly mistake to check with an adviser if in doubt. List right-to-work or identity checks, a written contract or statement of terms, and workplace insurance that may be required, each marked "verify".
2. Registrations: the employer registrations usually needed (tax authority as an employer, social security or national insurance, any workers' compensation or accident insurance, pension or retirement scheme duties, local or state registrations), with the order to do them and typical lead times. Name the specific registration only when confident, labelled "verify".
3. What the employee provides: tax and identity forms, bank details, previous employer's leaving statement where that exists, and the pension or benefit choices.
4. Each pay run: the steps from gross pay to net pay (gross pay, pre-tax deductions, income tax withholding, employee social contributions, other deductions, net pay), what the payslip must show, paying the employee, paying withheld amounts and employer contributions to the authorities, and reporting.
5. Employer costs beyond salary: list employer social contributions, pension or retirement contributions, insurance, holiday pay and any other on-costs. If pay is given, build a cost table with each rate as a labelled assumption or "verify", and show the total annual cost of the hire versus the salary.
6. Filing and payment calendar: per pay run, monthly or quarterly, and annual filings and payments, plus year-end documents for the employee, each with "confirm date".
7. Records to keep and for how long (verify locally): pay records, hours if hourly, contracts, forms, filings and leave records.
8. Doing it yourself or not: the trade-offs of payroll software, an accountant or a payroll provider for one employee, with the risk of each (no brand names).
9. Questions to verify with the tax authority's employer guide or an accountant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Payroll rules differ sharply by country and change every year. Never present a rate, threshold, form name or deadline as fact unless you are confident it is current; mark it "verify" or write "look up". If you do not know the country's payroll system well, say "I don't know" for those parts and give the general structure.
- Employment law (contracts, minimum wage, working time, leave, dismissal) overlaps payroll. Mention what to check and suggest an employment adviser or lawyer; do not state the law.
- Show the arithmetic in the cost table; every rate used is labelled as an assumption.
- Do not recommend specific software or providers.
- If the owner plans to pay cash off the books or delay registering, say plainly why that is a serious risk and steer back to registering before the first pay date.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before the first day
Checklist.

## Registrations
Table: registration | with whom | when | lead time | confidence.

## What the employee provides
Checklist.

## Each pay run
Numbered steps, then payslip contents.

## Employer costs beyond salary
Table: cost | basis | rate or amount | annual cost. Total and total versus salary.

## Filing and payment calendar
Table: filing or payment | frequency | due | confirm with.

## Records to keep
Bullets.

## Doing it yourself or not
Three options with trade-offs.

## Questions to verify
Numbered.
</output_format>
