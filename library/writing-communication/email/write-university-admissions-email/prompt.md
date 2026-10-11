---
schema: 1
id: write-university-admissions-email
kind: prompt
title: Email a university admissions or financial aid office
description: Writes an enquiry to a university admissions, financial aid, registry or international office with your applicant ID, one precise question, the documents involved and the date you need an answer.
category: email
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [notes, message]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [university-application, admissions-enquiry, financial-aid, student-visa, applicant-id]
pairs_with:
  prompts: [write-email-to-professor, appeal-university-decision, request-information-by-email]
args:
  - name: office
    description: The office and university (admissions, financial aid, scholarships, registry, international or visa office, accommodation) and the programme and intake you applied to.
    type: string
    required: true
  - name: question
    description: What you need to know or ask for, what you have already checked (website, portal, FAQ) and any deadline you are working to, for example a deposit or visa appointment date.
    type: text
    required: true
  - name: applicant
    description: Your full name as on the application, applicant or student ID, date of birth if the office uses it, and whether a parent or agent is writing on your behalf.
    type: string
output_contract:
  format: markdown
  sections: [Email, Before you send, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
University offices handle thousands of near-identical emails in peak season, and staff answer fastest when they can find the applicant on the system and see the exact question in seconds. Messages that get slow or template replies are the ones without an applicant ID, that ask something already answered on the website, that bundle five unrelated questions, or that come from a parent's address with no sign the applicant consents. Admissions staff also cannot discuss an applicant's file with third parties in many countries without permission. A good enquiry has the ID and programme in the subject, one clear question per email, what has already been checked, and the real date by which an answer is needed.
</context>

<task>
Write an email to the {{office}}.{{#applicant}} Applicant: {{applicant}}.{{/applicant}}

<question>
{{question}}
</question>

1. If the question bundles unrelated topics for different offices (for example fees and course content), split them and say which office each belongs to under Notes; write the email for the office given.
2. If the applicant ID or programme is missing, use [placeholders] and list them under "Before you send".
3. Subject: "[Applicant ID] - [Programme, intake] - [question in five words]".
4. Opening: who is writing, the programme and intake, the applicant ID.
5. The question in one or two sentences, specific enough to answer with yes, no or a date.
6. What has already been checked (the web page or portal section), so they do not reply with a link.
7. Any date the answer is needed by, and why (deposit deadline, visa appointment, accommodation contract).
8. Documents referred to, attached or available on request.
9. If a parent, guardian or agent is writing, include a line that the applicant is copied in and consents, and suggest the applicant send it themselves where possible.
10. Polite close with full name and ID.
</task>

<constraints>
- Body under about 150 words.
- Never invent IDs, deadlines, fees, scholarship names or policies. Do not state what the university's rules are; ask.
- Formal, courteous and brief; no life story unless it is relevant to the question (for example, extenuating circumstances).
- For appeals against a decision or formal complaints, say under Notes that a different process usually applies.
</constraints>

<output_format>
## Email
Subject, then body.
## Before you send
Checklist of placeholders and attachments.
## Notes
Other offices, timing advice. "None" if nothing.
</output_format>
