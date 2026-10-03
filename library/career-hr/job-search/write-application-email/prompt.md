---
schema: 1
id: write-application-email
kind: prompt
title: Write a job application email
description: Writes the short email that carries a CV when applying by email, with a clear subject line, the role and reference, two lines of fit and the attachments. Use when a job asks for email applications.
category: job-search
version: 1.0.0
status: incubating
stage: [ship]
role: [job-seeker]
requires: [none]
inputs: [job-posting, notes]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: off
level: beginner
tags: [application-email, cv-email, job-application, email-etiquette]
pairs_with:
  prompts: [write-cover-letter, tailor-resume-to-job]
args:
  - name: role
    description: The role, any reference number, and the application instructions from the posting (what to send, subject line format, deadline).
    type: string
    required: true
  - name: company
    description: The company, and the recipient's name and title if the posting gives one.
    type: string
    required: true
  - name: highlights
    description: The two or three facts that make you a fit - years of experience, a key achievement, a required licence or qualification, availability.
    type: text
    required: true
  - name: cover_letter_attached
    description: Whether a separate cover letter is attached. If no, the email does a little more of the cover letter's job.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Email, Attachment check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write application emails for job seekers. When a job asks for applications by email, the email itself is the first impression and is often forwarded to the hiring manager. It must be easy to file and forward: a subject line that names the role and reference, a body that says what it is in the first line, two lines of fit, and attachments that are named sensibly and match what was requested. Small failures get applications discarded: a missing reference number, a vague subject ("Job application"), files named "CV final v3.docx", or ignoring the posting's instructions.

Role and instructions: {{role}}
Company and recipient: {{company}}
Separate cover letter attached: {{cover_letter_attached}}

<highlights>
{{highlights}}
</highlights>
</context>

<task>
1. Read the application instructions in the role details and follow them exactly: required subject line format, reference number, documents, file format, deadline.
2. Write the subject line: "Application: [Role title] - [Reference if any] - [Full name]" unless the posting specifies a format.
3. Write the body:
   - Greeting with the recipient's name if given, otherwise "Dear Hiring Team" or the local equivalent for the company's language.
   - First sentence: applying for the role, with the reference and where it was advertised if known.
   - Two or three sentences of fit from the highlights (the strongest achievement, the must-have qualification, availability). If no cover letter is attached, allow up to five sentences.
   - Attachments listed by name.
   - A closing line on availability for interview, and a sign-off with [Full name], [phone] and an optional profile link placeholder.
4. Suggest file names for the attachments ("Firstname-Lastname-CV-[Role].pdf") and a short attachment check.
</task>

<constraints>
- Body of 70 to 130 words with a cover letter attached; up to 180 without one.
- Use only facts in the highlights. Never invent qualifications, years or achievements.
- Formal and plain; no emojis, no "To whom it may concern" when a name or team is known.
- If the instructions ask for something the candidate has not mentioned (a portfolio, references, salary expectations, a specific form), flag it in the attachment check.
- Match the language of the posting; if the posting is not in English, write the email in that language and say so.
</constraints>

<output_format>
## Email
Subject line, then the body ready to paste.
## Attachment check
Checklist: suggested file names, PDF format, everything the posting asked for, deadline, and a test send to yourself.
</output_format>
