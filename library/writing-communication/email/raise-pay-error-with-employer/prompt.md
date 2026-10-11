---
schema: 1
id: raise-pay-error-with-employer
kind: prompt
title: Raise a pay error with your employer
description: Writes a calm, evidence-backed email to payroll, HR or your manager about missing pay, unpaid overtime or a wrong deduction, with the figures, the ask and a date to fix it by.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, student]
requires: [none]
inputs: [notes, document]
output: [message, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [payslip, pay-error, underpayment, overtime, deductions, payroll-query]
pairs_with:
  prompts: [explain-payslip, claim-unpaid-wages, write-workplace-grievance, request-employment-documents]
args:
  - name: problem
    description: What looks wrong on which payslip or pay date, for example "15 hours of overtime in May not paid", "tax code changed", "deduction labelled ADJ of 120", "paid at old rate after my raise in April".
    type: text
    required: true
  - name: evidence
    description: What you have - payslip lines, timesheets, rota, contract or offer letter, emails confirming a raise - with the figures you expected and the figures you got.
    type: text
    required: true
  - name: details
    description: Optional - who to send it to (payroll, HR, manager, agency), whether you have raised it before and what they said, how urgent it is for you (rent due), and your country.
    type: text
output_contract:
  format: markdown
  sections: [Check first, The numbers, Email, If there is no reply or they refuse, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employees get pay mistakes fixed quickly without damaging the working relationship. Most pay errors are administrative: overtime not keyed in before the payroll cut-off, a raise not entered, a new tax code, a benefit or pension deduction starting, holiday pay at the wrong rate, or a pro-rata mistake in a first or last month. Payroll fixes these fastest when the email is short, names the pay period, shows expected versus actual figures with the working, attaches the evidence, and asks for a specific correction and date, often an off-cycle payment rather than waiting a month. Starting accusatory slows things down; starting vague ("my pay seems off") gets a vague reply. Some apparent errors are correct (tax, pension auto-enrolment, a deduction the employee agreed to), so it is worth checking first. If an informal request fails, there are formal routes such as a written grievance or a wage claim, which differ by country.

Problem: {{problem}}

<evidence>
{{evidence}}
</evidence>
{{#details}}Details: {{details}}{{/details}}
</context>

<task>
1. Check first: list the two or three likely explanations for this specific problem, including any that would mean the pay is correct, and what to look at on the payslip or contract to rule them out.
2. The numbers: lay out expected versus actual pay for the period with the working (hours times rate, the old and new rate, the deduction) using only the user's figures. If a figure is missing, mark it rather than guessing.
3. Write the email: a subject line with the pay date and issue; one sentence on what is wrong and the amount; the working in a short list or small table; the evidence attached; a specific ask (correct it and pay the difference, ideally in an off-cycle payment or by a stated date; or explain the deduction in writing); and a friendly close. Keep it neutral, assuming an error rather than bad faith.
4. If there is no reply or they refuse: a short follow-up for after a reasonable wait, then the next steps in order (manager or HR escalation, a written grievance, outside advice or a wage claim), described in general terms.
5. Notes: what records to keep, any time limits to check for formal claims, and if the shortfall causes hardship, how to ask for an advance or a quicker payment.
</task>

<constraints>
- Do not state minimum wage rates, overtime rules, deduction laws or claim deadlines for any country as fact. Say these differ by country and contract and point to the official employment rights source or an advice service where the user lives.
- Do not invent figures, hours or contract terms. Use only what the user provided.
- Keep the email under about 180 words plus the numbers.
- No threats or legal language in the first email unless the user says the issue has been raised before and ignored; even then keep it factual.
- If the user's numbers show they were actually overpaid, or the deduction looks correct, say so honestly and adjust the email.
</constraints>

<output_format>
## Check first
## The numbers
A table: Item | Expected | Paid | Difference.
## Email
Subject line, then the email.
## If there is no reply or they refuse
Follow-up text, then the escalation steps.
## Notes
</output_format>
