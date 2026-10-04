---
schema: 1
id: claim-employee-tax-deductions
kind: prompt
title: Find work-related tax reliefs as an employee
description: Lists the work-related tax reliefs or deductions an employee may be able to claim in their country, the evidence to keep, and how to claim or check with the tax authority or an adviser.
category: taxes
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual]
requires: [none]
inputs: [text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [tax-relief, work-expenses, employee-deductions, tax-return, uniform-allowance, home-working]
pairs_with:
  prompts: [explain-payslip, check-tax-withholding, organize-tax-documents]
  personas: [tax-educator]
args:
  - name: country
    description: Country (and state or region where it matters) where you pay income tax, and the tax year if you know it.
    type: string
    required: true
  - name: job
    description: Your job and how you work, for example "nurse, shift work, buys own shoes", "teacher, works from home two days", "electrician employed by a firm, uses own tools".
    type: string
    required: true
  - name: expenses
    description: The work costs you pay yourself and are not reimbursed - uniforms, tools, professional fees, travel between sites, home working, training, union dues - with rough yearly amounts.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How work-related relief usually works where you live, Possible claims, Probably not claimable, Evidence to keep, How to claim, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employees find work-related tax reliefs they may be missing. Many employees pay for things their job requires and never claim, while others claim things that are not allowed and face penalties. The rules differ sharply between countries: some give itemised deductions, some fixed allowances or flat-rate amounts per occupation, some only relief for costs that are "wholly, exclusively and necessarily" for the job, and some fold everything into a standard deduction that makes small claims pointless. Common tests across systems are that the cost was not reimbursed, was required for the job rather than personal, and can be evidenced. Ordinary commuting is almost never deductible; travel between workplaces sometimes is. Your job is to map the person's costs onto the kinds of relief that usually exist in their country, flag what is unlikely to qualify, and show how to claim or check. You do not decide what they are entitled to.

Country: {{country}}
Job: {{job}}
</context>

<task>
Expenses:

<expenses>
{{expenses}}
</expenses>

1. If the expenses list has no amounts, or it is unclear whether the employer reimburses them, ask for both in one short question and stop.
2. Explain in a short paragraph how work-related relief generally works in {{country}} for employees: itemised versus standard deduction or flat-rate allowance, whether relief reduces taxable income or tax directly, and how claims are usually made (annual return, online form, payroll adjustment). Mark each country-specific point "to verify".
3. For each expense the person listed, assess whether it is a possible claim, unlikely, or depends on facts, and why, using the common tests (required by the job, not reimbursed, not personal, evidenced). Include any occupation-specific flat-rate or fixed allowance that may exist for {{job}}, described as something to check.
4. Mention other reliefs employees in this kind of job often miss, only if they plausibly apply: professional body fees on an approved list, union dues, home working costs when required by the employer, uniform cleaning, work-required training. Mark each to verify.
5. List the costs that are usually not claimable and why (ordinary commuting, clothing that can be worn outside work, costs the employer already pays, fines).
6. Give the evidence to keep for each possible claim: receipts, employer letter confirming the requirement and non-reimbursement, mileage logs, and how long records are typically kept.
7. Explain how to claim or check: the tax authority's guidance and online service, whether back years can usually be claimed, and when to use a tax adviser or free tax help service. Warn about claim companies that take a large share of any refund.
8. Write questions to ask the tax authority, the employer or an adviser.
9. Check before answering: no amount is promised as a refund, no rate is stated as fact, and every claim marked "possible" is tied to an expense the person actually listed.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person they are entitled to a deduction or calculate a guaranteed refund. Describe what may qualify and what to check.
- Do not invent forms, codes, thresholds or flat-rate amounts. Name a specific relief only if you are confident it exists in that country, and say to confirm current rules for the tax year.
- Never suggest claiming personal costs, inflating amounts, or claiming costs the employer reimbursed.
- If the person is actually self-employed or a contractor, say that different rules apply and the claim list changes.
{{> output/uncertainty}}
</constraints>

<output_format>
## How work-related relief usually works where you live
One short paragraph, points marked to verify.

## Possible claims
Table: expense | yearly amount | likely status (possible / depends / unlikely) | why | to verify.

## Probably not claimable
Bullets with reasons.

## Evidence to keep
Checklist per claim.

## How to claim
Numbered steps.

## Questions to check
Numbered, grouped by who to ask.
</output_format>
