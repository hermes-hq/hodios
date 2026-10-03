---
schema: 1
id: write-immigration-status-enquiry
kind: prompt
title: Write an immigration status enquiry
description: Writes a polite, precise enquiry to an immigration office about a delayed application or appointment, with reference numbers, dates, the impact of the delay and one specific request.
category: paperwork
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [immigration, application-delay, follow-up-letter, official-correspondence]
pairs_with:
  prompts: [understand-residence-permit-conditions, prepare-for-immigration-appointment, find-free-legal-help, write-complaint-letter]
  personas: [legal-information-guide]
args:
  - name: application_details
    description: What you applied for, the application or case reference, submission date, any published processing time you have seen, previous contact (dates, what was said), and how the delay affects you (job start, travel, a permit expiring, family apart).
    type: text
    required: true
  - name: country
    description: Country and the office or authority handling the application.
    type: string
    required: true
  - name: language
    description: Language the enquiry should be written in, usually the office's language.
    type: string
    default: English
  - name: channel
    description: How it will be sent. web-form keeps it short enough for a character-limited box.
    type: enum
    enum: [email, letter, web-form]
    default: email
output_contract:
  format: markdown
  sections: [Before you send, Subject, Message, Translation for you, Attach, If there is no answer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Immigration offices receive large volumes of vague, emotional or angry messages, and those wait longest. The enquiries that get answered let a caseworker find the file in seconds and know exactly what is being asked: the reference in the subject, the facts in date order, a short factual statement of impact, and one specific request (a status update, an expected decision date, confirmation that the person's status continues while pending, whether anything is missing, or whether the case can be prioritised, with evidence). Threats, legal claims the writer cannot back up and long backstories slow things down.

Country and office: {{country}}
Language: {{language}}
Channel: {{channel}}
</context>

<task>
Application details:

<application_details>
{{application_details}}
</application_details>

1. If the reference number, application type or submission date is missing, list them under "Before you send" and use [BRACKETS] in the draft. Ask the person to check the office's own guidance first: many offices publish processing times and say when an enquiry is accepted.
2. Choose the one main request that fits the facts, and at most one secondary request. If a permit expires before a decision, the main request is usually written confirmation of the person's status while the application is pending.
3. Write the enquiry in {{language}}, in the register officials expect in {{country}}: the reference in the subject line, a one-sentence purpose, facts in date order, impact in one or two factual sentences with the evidence they can attach, the request phrased as a clear question, and a polite close with contact details as placeholders. For web-form, keep it to a short paragraph without a subject.
4. If {{language}} is not English, add an English translation so the person knows exactly what they are sending.
5. List attachments that support the request (submission receipt, job offer with start date, flight booking, medical letter), and remind them not to send originals.
6. Follow-up plan: when to send a reminder, and the escalation options that commonly exist (formal complaint procedure, ombudsman, an elected representative's office, an immigration adviser), all marked verify.
7. Before writing, check that the draft contains no claim of a legal entitlement that the details do not support and no threat.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Polite, factual, brief. No blame, sarcasm or emotional pressure; describe the impact, do not plead.
- Never invent facts, dates, references or processing standards. Use [BRACKETS] for anything not given.
- Do not cite laws, deadlines or service standards unless the person supplied them; suggest they check the office's published standard instead.
- If the delay involves a refusal, a removal notice, detention or an expired status, tell the person to contact an immigration lawyer or free legal help before or alongside sending.
- Personal identifiers stay as placeholders such as [FULL NAME] and [DATE OF BIRTH].
</constraints>

<output_format>
## Before you send
Bullets: missing facts and the check of official guidance. Omit if nothing is missing.

## Subject
One line (omit for web-form).

## Message
The enquiry, ready to paste.

## Translation for you
Only if the language is not English.

## Attach
Checklist.

## If there is no answer
Bullets with timing.
</output_format>
