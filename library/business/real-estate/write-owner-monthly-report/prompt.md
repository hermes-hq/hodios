---
schema: 1
id: write-owner-monthly-report
kind: prompt
title: Write a monthly report to a property owner
description: Writes a property manager's monthly report to a landlord client from the ledger and notes - rent collected, arrears, spend against approvals, maintenance, compliance dates and decisions needed.
category: real-estate
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager]
subject: [real-estate]
requires: [none]
inputs: [dataset, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [owner-statement, client-reporting, landlord, compliance-dates]
pairs_with:
  prompts: [write-property-inspection-report, set-up-rental-maintenance-process]
  personas: [property-manager]
args:
  - name: period_data
    description: For the month - rent due and received per unit, arrears, expenses with invoices and who approved them, fees, payments to the owner, maintenance jobs open and closed, inspections, tenancy events (notices, renewals, vacancies) and compliance certificates with expiry dates.
    type: text
    required: true
  - name: owner
    description: The owner's preferences - how much detail, their approval limit for spending, and anything they asked about last month. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Money, Arrears, Maintenance, Tenancies, Compliance dates, Decisions needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write owner reports the way a property manager that keeps its clients does. Owners leave managers over surprises: a large bill they did not approve, arrears they hear about late, or a lapsed safety certificate. A good monthly report reconciles the money (what was due, what came in, what went out, what was paid to the owner) so it ties to the statement, separates routine spend from anything above the owner's approval limit, is open about problems and what is being done, and ends with the decisions the owner must make, each with a recommendation and a date. Bad news goes near the top, not buried.

<period_data>
{{period_data}}
</period_data>
{{#owner}}

<owner>
{{owner}}
</owner>
{{/owner}}
</context>

<task>
1. Write a three-line headline: net paid to the owner, anything that went wrong, and the most important decision needed.
2. Reconcile the money: rent due, received, arrears movement, expenses by category, fees, and the payment to the owner. Show that the figures tie together; if they do not, flag the difference instead of forcing it.
3. Report arrears per unit with age and the action taken or planned.
4. Summarise maintenance: jobs completed with cost, jobs open with status, and any spend above the approval limit with whether approval was obtained.
5. Report tenancy events: notices, renewals, vacancies and marketing status.
6. List compliance dates due in the next 90 days (safety certificates, inspections, insurance, licences) and anything overdue in bold.
7. List decisions needed: each with options, the manager's recommendation, cost and the date a reply is needed.
</task>

<constraints>
- Use only the figures and events given. Do not invent invoices, payments, tenant behaviour or dates.
- If the numbers do not reconcile, show the gap and say what needs checking.
- Spend above the owner's limit without recorded approval must be flagged, not smoothed over.
- Refer to tenants by unit, not by name, and leave out personal details not needed by the owner.
- Plain, factual tone. Under 600 words excluding tables.
</constraints>

<output_format>
## Headline
Three lines.

## Money
Reconciliation table.

## Arrears
Table: unit, amount, age, action.

## Maintenance
Table: job, status, cost, approved.

## Tenancies
Bullets.

## Compliance dates
Table: item, unit, due date, status.

## Decisions needed
Numbered: decision, options, recommendation, cost, reply by.
</output_format>
