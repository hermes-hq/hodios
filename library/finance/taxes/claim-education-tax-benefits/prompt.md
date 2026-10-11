---
schema: 1
id: claim-education-tax-benefits
kind: prompt
title: Claim US education tax benefits
description: Checks which US tuition credits, student loan interest deduction and related benefits a student or parent can claim, who should claim them, and how to read the 1098-T without double-counting.
category: taxes
version: 1.0.0
status: incubating
stage: [plan, review]
role: [student, parent]
requires: [none]
inputs: [preferences, document]
output: [table, checklist, explanation]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [american-opportunity-credit, lifetime-learning-credit, form-1098-t, student-loan-interest, tuition, united-states]
pairs_with:
  prompts: [prepare-us-federal-tax-return, explain-tax-form, plan-education-savings]
  personas: [tax-educator]
args:
  - name: student
    description: Tax year, the student's age, year of study, enrolment load (at least half time or not), degree or course type, whether they have a felony drug conviction, and whether a parent can claim them as a dependant.
    type: text
    required: true
  - name: money
    description: 1098-T boxes (payments, scholarships and grants), what was actually paid and when, who paid it, 529 plan withdrawals, student loan interest paid (1098-E), and parents' and student's approximate income. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Who can claim, Qualified expenses, Which credit fits, Student loan interest, Records to keep, Check before filing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a US student or parent claim the education tax benefits they are entitled to, the way a volunteer preparer handles the education section. The two main credits are the American Opportunity Tax Credit (for the first four years of post-secondary study, at least half time, partly refundable, claimed for a limited number of years) and the Lifetime Learning Credit (for any post-secondary or job-skills course, non-refundable). Only one can be claimed per student per year, and both phase out with income. The rule that surprises families most: if a parent can claim the student as a dependant and does, only the parent can claim the credit, even if the student paid the tuition; if the parent does not claim the student, the student may claim it. Form 1098-T is a starting point, not the answer: box 1 shows payments received, box 5 scholarships and grants, and timing can differ from the tax year (spring tuition paid in December). Tax-free money (scholarships, grants, tax-free 529 withdrawals) cannot pay for the same expenses as a credit, and scholarships used for room and board are generally taxable to the student, which can sometimes be used deliberately to free up expenses for the credit. The student loan interest deduction is separate, limited and phases out, and is not available to married filing separately.

Student: {{student}}
{{#money}}Money: {{money}}{{/money}}
</context>

<task>
1. Confirm the tax year (if missing, ask and stop) and who can claim the student as a dependant. Say who is entitled to claim any credit as a result.
2. Work out qualified expenses for the year: tuition and required fees paid in the year (and, for the American Opportunity credit, required course materials), minus tax-free scholarships, grants and 529 money allocated to them. Show the arithmetic with their numbers only.
3. Check each credit's eligibility tests against their facts and say which one fits, or that neither does. Mark income limits and credit amounts "check for your tax year".
4. If scholarships exceed or nearly match tuition, explain the allocation choice between taxable scholarship and credit-eligible expenses in general terms and recommend a preparer for the numbers.
5. Student loan interest: who can deduct it (the person legally obliged to pay who is not a dependant), and the filing-status limit.
6. Give a checklist of documents to keep (1098-T, receipts for course materials, account statements showing payment dates, scholarship letters) and note that a state may have its own education credit or 529 deduction to check.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state credit amounts, phase-out ranges or refundable portions as fixed; mark them to check.
- Do not let both parent and student claim the same student, or count the same expenses twice. Say so plainly if asked.
- US federal only. For other countries, say this does not apply and suggest checking the local tuition or education credit.
- Recommend a preparer for: large scholarships, 529 withdrawals that may be partly taxable, graduate students with fellowship income, or divorced parents disputing who claims the child.
{{> output/uncertainty}}
</constraints>

<output_format>
## Who can claim
## Qualified expenses
Table: Item | Amount (from you) | Counts?
## Which credit fits
## Student loan interest
## Records to keep
## Check before filing
</output_format>
