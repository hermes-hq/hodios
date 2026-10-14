---
schema: 1
id: request-employment-documents
kind: prompt
title: Request employment documents from an employer
description: Asks a current or former employer for payslips, an employment verification letter, a contract copy or year-end tax forms, saying exactly what is needed, the format and the deadline.
category: email
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, job-seeker]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
depth: specific
tags: [employment-verification, payslips, tax-forms, former-employer, proof-of-income, hr-request]
pairs_with:
  prompts: [request-reference, explain-payslip, write-follow-up-email]
args:
  - name: documents
    description: Which documents you need (payslips for which months, employment verification with which details, contract copy, P45, P60, W-2, end-of-year income statement or local equivalent), the format (PDF, signed letter on letterhead) and why (mortgage, rental, visa, tax return, new job).
    type: text
    required: true
  - name: employer
    description: The employer, the department or person you are writing to, whether you still work there, your dates of employment and employee number if known.
    type: string
    required: true
  - name: deadline
    description: When you need the documents and what depends on it.
    type: string
output_contract:
  format: markdown
  sections: [Email, If there is no reply, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lenders, landlords, visa offices and new employers often want employment documents in a specific form: payslips for named months, a letter on letterhead confirming job title, start date, salary and permanent or temporary status, or a year-end tax form. HR and payroll teams handle these requests routinely, but they are slowed down by requests that do not say exactly which documents, which details must appear, the format, where to send them and by when. Many countries also give employees and former employees a legal right to their own payslips, tax forms or personal data, which is worth knowing if a former employer stalls, though the right and its time limits vary. A first request should be polite and specific; the legal angle belongs in a follow-up.
</context>

<task>
Write a request to {{employer}}.{{#deadline}} Needed by: {{deadline}}.{{/deadline}}

<documents>
{{documents}}
</documents>

1. If it is unclear which documents or details are required, list what the recipient (lender, landlord, visa office) usually specifies and ask the user to check the exact requirement; use [placeholders].
2. Subject: "Request for [documents] - [full name], [employee number]".
3. Opening: who the user is, the role and employment dates, employee number.
4. The request as a numbered list: each document, the period or details it must show, and the format (PDF, signed, on letterhead, addressed to whom).
5. For an employment verification letter, list the details it should confirm (job title, start date and end date if any, contract type, hours, salary as stated) and that the user consents to them sharing these details.
6. Where to send it, the deadline and what depends on it, without dramatising.
7. A thank-you and an offer to provide anything needed to verify identity.
8. Under "If there is no reply", write a short, firmer follow-up for about a week later that mentions, as a question, that the user understands employees may have a right to these records, and suggests checking the local rule or contacting the relevant authority or an advice service.
</task>

<constraints>
- Body under about 150 words.
- Never invent salary figures, dates, employee numbers, tax form names for an unknown country, or legal deadlines; use placeholders and suggest checking locally.
- Never ask the employer to state anything untrue (a higher salary, a permanent contract that was temporary).
- Courteous and specific; no threats in the first request.
</constraints>

<output_format>
## Email
Subject, then body.
## If there is no reply
The follow-up.
## Notes
Placeholders and country-specific points to check. "None" if nothing.
</output_format>
