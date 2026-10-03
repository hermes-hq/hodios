---
schema: 1
id: set-up-household-employer
kind: prompt
title: Set up as a household employer
description: Lists the payroll, tax, insurance and contract steps to verify when employing a nanny, carer or cleaner directly at home, with an employee-or-not check and a full cost estimate.
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, individual]
requires: [none]
inputs: [text, preferences]
output: [checklist, table, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [nanny, household-employee, domestic-worker, payroll]
pairs_with:
  prompts: [set-up-first-payroll, explain-family-tax-credits, calculate-true-cost-of-hire]
args:
  - name: country
    description: Country (and state or region if relevant) where the work is done.
    type: string
    required: true
  - name: hours_and_pay
    description: Who you want to hire (nanny, carer, cleaner, housekeeper), hours per week, hourly or weekly pay (gross or net as agreed), live-in or not, start date, whether they work for other families, and whether you found them directly or through an agency.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Employee or not, Before the first day, Every pay day, Quarterly and yearly, When the job ends, Cost estimate, Questions to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a family become a lawful employer of someone who works in their home. Many households pay a nanny, carer or cleaner informally without realising that, in many countries, a person working regular hours under their direction is their employee once pay passes a threshold. Getting it right protects the worker (social security, pension, sick pay, holiday) and the family (back taxes, penalties, liability if the worker is injured), and is often needed to claim childcare tax relief at all. Many countries offer simplified schemes or payroll services built for household employers.

Agreeing pay in net terms is a common and expensive trap: the employer then carries every tax and contribution change.

Country: {{country}}
</context>

<task>
The role:

<hours_and_pay>
{{hours_and_pay}}
</hours_and_pay>

1. Work through whether this person is likely an employee, self-employed, or an agency worker in {{country}}: who sets the hours and tasks, whose equipment, how many clients they have, and the usual official tests. Say what changes if they are self-employed or supplied by an agency.
2. If they are likely an employee, list what to verify before the first day: earnings thresholds above which obligations start, registering as an employer or with a household-employer scheme, the worker's tax and social security identifiers, right-to-work checks, minimum wage and overtime rules (including live-in rules), a written contract or statement of terms, and compulsory insurance (employer's liability or workers' compensation).
3. List what happens every pay day: gross-to-net calculation, withholding and contributions, a payslip, and any real-time reporting.
4. List quarterly and yearly duties: returns and payments, year-end forms to the worker and authority, pension enrolment duties, holiday entitlement tracking.
5. List what happens when the job ends: notice, final pay with accrued holiday, leaving forms.
6. Estimate the full annual cost from the hours and pay given: gross pay, employer contributions, pension, insurance, holiday cover and payroll service fees. Show the arithmetic, mark rates "verify", and convert net to gross if the pay was agreed net.
7. Mention childcare or care tax relief that may depend on doing payroll properly, as something to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never present a threshold, rate or deadline as certain unless you are confident it is current for {{country}}; otherwise mark it "verify" and name the official source or scheme to check.
- Do not help structure the arrangement to avoid employment obligations. If the user asks how to keep it informal, explain the risks for both sides plainly and stop there.
- Recommend agreeing pay in gross terms and explain why in one sentence.
- If you do not know the country's household-employer rules, say "I don't know" and give the general checklist with the questions to ask the tax authority or a payroll service.
{{> output/uncertainty}}
</constraints>

<output_format>
## Employee or not
Three to five sentences applying the tests, with confidence.

## Before the first day
Checklist.

## Every pay day
Checklist.

## Quarterly and yearly
Table: duty | usual timing | confirm with.

## When the job ends
Checklist.

## Cost estimate
Table: item | basis | estimated annual amount | confidence. Then the total and the multiple of gross pay.

## Questions to verify
Numbered, with who to ask.
</output_format>
