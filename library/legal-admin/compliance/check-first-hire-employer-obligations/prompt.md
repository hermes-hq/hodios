---
schema: 1
id: check-first-hire-employer-obligations
kind: prompt
title: Check the legal steps before your first employee
description: Lists the employment-law steps before a business's first employee starts - registration, contract, right-to-work checks, insurance, pensions, notices, safety and records - in order, to verify locally.
category: compliance
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [first-employee, employer-registration, right-to-work, employment-contract, employers-insurance, workplace-notices]
pairs_with:
  prompts: [set-up-first-payroll, plan-first-hire, write-employee-privacy-notice, check-business-licences]
args:
  - name: business
    description: What the business does, its legal form (sole trader, company, partnership), where it operates, and whether anyone works for it now (contractors, family helpers).
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or province where the employee will work.
    type: string
    required: true
  - name: hire
    description: The role, hours, pay type, expected start date, whether the person works on site or remotely (and from where), and their nationality status if work permission might be an issue. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before the offer, Before day one, First weeks, Ongoing duties, Calendar, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small business owner get the legal side of a first hire right. Becoming an employer switches on a set of duties at once, and most are due before or on the first day, not when the first payslip goes out. Typical items across countries: registering as an employer with the tax and social security authorities; checking and recording the person's right to work before they start (illegal working penalties often fall on the employer, and the check is only a defence if done correctly and on time); giving a written contract or statement of terms, often by day one; compulsory insurance such as employers' liability or workers' compensation; workplace pension or retirement plan enrolment duties where they exist; new-hire reporting to an agency in some places; mandatory workplace notices or posters; health and safety duties, including a risk assessment and first aid arrangements; a privacy notice for employee data; and rules on working time, minimum wage, holiday and sick pay. Fair recruitment rules apply before the hire too: job adverts and interview questions must not discriminate. Payroll mechanics (withholding, payslips, filing) are a separate job; this entry covers everything around them.

Jurisdiction: {{jurisdiction}}
</context>

<task>
Business:
<business>
{{business}}
</business>
{{#hire}}

The hire:
<hire>
{{hire}}
</hire>
{{/hire}}

1. Before the offer: fair recruitment points, deciding employee versus contractor honestly, checking any business licence or zoning limits on having staff, and what the offer letter must and must not say.
2. Before day one: employer registration, right-to-work check and how to record it, contract or written statement and its typical required contents, compulsory insurance, pension or retirement enrolment assessment, new-hire reporting, and setting up payroll (point to a separate payroll checklist rather than detailing it).
3. First weeks: workplace notices, safety induction and risk assessment, first aid, employee privacy notice, handbook basics (holiday, sickness reporting, grievance and disciplinary procedures), and probation.
4. Ongoing duties: working time and break rules, minimum wage reviews, holiday and sick pay, record keeping and retention, and anything that changes as headcount grows (thresholds for written policies, extra registrations or benefits).
5. Calendar: a dated sequence counting back from the start date the user gave, or relative to "start date" if none was given.
6. Points to verify: each item that depends on local rules or thresholds, and who confirms it (tax authority, labour inspectorate, insurer, accountant, employment lawyer).
If the employee will work from another country or state than the business, flag that the rules of the place of work usually apply and that an employer of record or local registration may be needed.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent agency names, form numbers, deadlines, thresholds or rates. Name an agency or form only when you are confident of it for this jurisdiction; otherwise describe it generically and mark "confirm".
- Do not suggest calling an employee a contractor to avoid these duties; if the facts point to employment, say so.
- Keep payroll calculations out of scope and say where they belong.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before the offer
Checklist.

## Before day one
Table: step | why | how | deadline.

## First weeks
Checklist.

## Ongoing duties
Bulleted list.

## Calendar
Table: when | task.

## Points to verify
Numbered list with who to ask.
</output_format>
