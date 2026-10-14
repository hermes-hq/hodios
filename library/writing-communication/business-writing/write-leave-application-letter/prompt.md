---
schema: 1
id: write-leave-application-letter
kind: prompt
title: Write a leave application letter
description: Writes a formal leave application in English to a principal, head of department or employer with dates, reason, work cover and contact details, in school, office or email format.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, teacher]
requires: [none]
inputs: [notes]
output: [message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
depth: specific
tags: [leave-application, application-letter, time-off-request, formal-letter, school-letters]
pairs_with:
  prompts: [write-hindi-application-letter, write-formal-letter, write-email-to-teacher]
args:
  - name: recipient
    description: Who approves the leave - for example "The Principal, St. Mary's School, Kochi", "Head of Department, Civil Engineering" or "my line manager Ms Achieng".
    type: string
    required: true
  - name: leave_details
    description: Type of leave (sick, casual, family event, exam, maternity or other), exact dates and number of days, the reason at the level you want to share, who will cover your work or classes, documents attached, and how to reach you.
    type: text
    required: true
  - name: sender
    description: Your name and identifiers - class, roll number, employee ID, designation, department.
    type: string
    required: true
  - name: format
    description: The format to use.
    type: enum
    enum: [school, office-letter, email]
    default: office-letter
output_contract:
  format: markdown
  sections: [Application, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write the formal leave applications that schools, colleges, government offices and many employers across South Asia, Africa, the Middle East and elsewhere still expect in a fixed English format, and that students practise for exams. The approver checks three things quickly: exact dates and number of days, a reason that justifies the leave type, and how work or classes will be covered. The common errors are dates that do not match the day count, a vague reason, no mention of cover or pending work, missing identifiers (class and roll number, employee ID), and the wrong format for the setting. The school format uses "To, The Principal…", "Subject:", "Respected Sir/Madam," and closes "Yours obediently,"; the office letter uses the sender's details, date, "Subject:", "Dear Sir/Madam," and "Yours faithfully," or "Yours sincerely,"; an email keeps the same content with a clear subject line and is shorter.

Recipient: {{recipient}}
Sender: {{sender}}
Format: {{format}}

<leave_details>
{{leave_details}}
</leave_details>
</context>

<task>
1. If the dates or the number of days are missing or do not agree, ask and stop.
2. Write the application in the chosen format:
   - school: "To," recipient block, "Date:", "Subject: Application for … leave", "Respected Sir/Madam,", body, "Thanking you,", "Yours obediently,", name, class, section, roll number.
   - office-letter: sender details, date, recipient block, "Subject: Application for … leave from [date] to [date]", "Dear Sir/Madam," (or the named person), body, "Yours faithfully," or "Yours sincerely," as appropriate, name, designation, employee ID.
   - email: subject line "Leave request: [type], [dates]", salutation, three short paragraphs, sign-off with name and ID.
3. Body: first, the request with type of leave, dates and number of days; second, the reason in one or two sentences; third, cover arrangements, pending work and how to reach you (or that you will be unreachable), plus documents attached such as a medical certificate.
4. Before you send: anything to fill in, documents to attach, and a reminder to check the leave balance or rules where relevant.
</task>

<constraints>
- Do not invent dates, roll numbers, IDs or reasons; use [brackets].
- For sick leave, keep medical detail general unless the user wants more.
- Polite, formal and concise; body under 150 words.
- Write in English. If the user wants Hindi, suggest the Hindi application letter prompt instead.
</constraints>

<output_format>
## Application
The application laid out line by line.
## Before you send
Bullets.
</output_format>
