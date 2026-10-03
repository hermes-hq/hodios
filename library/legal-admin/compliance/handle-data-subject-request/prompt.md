---
schema: 1
id: handle-data-subject-request
kind: prompt
title: Handle a personal data request
description: Guides a small organisation through answering a personal-data access or deletion request, covering identity checks, where to search, exemptions to check, deadlines and the reply.
category: compliance
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, founder, support-agent, legal-professional]
subject: [law]
requires: [none]
inputs: [message, text]
output: [plan, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [subject-access-request, right-to-erasure, data-protection, privacy-requests]
pairs_with:
  prompts: [map-personal-data-processing, audit-website-privacy-compliance, plan-data-breach-response]
  personas: [compliance-officer]
args:
  - name: request_text
    description: The request as received (email, letter, form or a note of a phone call), the date it arrived, how it arrived, and anything you know about the requester (customer, ex-employee, job applicant, someone acting for another person). Remove details you do not need to share.
    type: text
    required: true
  - name: systems
    description: Where personal data may be held - CRM, email accounts, shared drives, HR and payroll, accounting, support desk, chat tools, CCTV, backups, paper files, and vendors who hold data for you - and which law you work under if you know it (for example UK GDPR, EU GDPR, CCPA/CPRA). Optional.
    type: text
output_contract:
  format: markdown
  sections: [What this request is, Deadline, Identity check, Search plan, Exemptions and redactions to check, Response checklist, Draft acknowledgment, Draft response, Get advice if]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You guide small organisations through data subject requests the way a data protection officer at a managed privacy service would. Requests arrive informally ("send me everything you have on me", "delete my account"), and the law usually does not require a particular form or wording. The risks are: missing the statutory deadline, disclosing data to the wrong person, leaking other people's data in the response, deleting data that must be kept, and ignoring a request because it came via social media or a staff member's inbox. Rules differ between laws (EU and UK GDPR, US state privacy laws, Brazil's LGPD and others) on deadlines, extensions, fees and exemptions, so you name which law you are assuming and mark what to confirm.
</context>

<task>
Request:

<request>
{{request_text}}
</request>
{{#systems}}

Where data may be held, and the applicable law:
<systems>
{{systems}}
</systems>
{{/systems}}

1. Classify the request: access, deletion or erasure, correction, restriction, objection (including to direct marketing), portability, opt-out of sale or sharing, or several. Note whether it is clear enough to act on. If not, draft a short clarification question, but say that asking usually should not be used to delay and that the clock may still be running.
2. Deadline: identify the law you are assuming (from the input, or from the requester's and organisation's location; if unknown, say so) and the common response period under it, the day it starts (often receipt, or receipt of identity verification), and any extension mechanism. Calculate dates from the receipt date shown, show the calculation, and mark "verify".
3. Identity check: proportionate verification. Use information already held (reply from the account email, confirm two details already on file) rather than asking for new ID documents by default. For requests made on behalf of someone else, check authority.
4. Search plan: a table of every system to search, search terms (name, email, phone, customer ID, nicknames, mentions in free text), who searches, and evidence of the search. Include vendors holding data on the organisation's behalf, email and chat, and backups.
5. Exemptions and redactions to check: other people's personal data in the records, legal privilege, confidential references, information about crime prevention or legal claims, manifestly unfounded or excessive requests, and for deletion: data the organisation must keep (tax, accounting, employment records, legal holds, ongoing disputes). Frame each as "check whether this applies", not as a conclusion.
6. Response checklist: for access, what to provide (copies of the data plus purposes, categories, recipients, retention, source, rights, complaint route) and in what format, securely; for deletion, what is deleted, what is kept and why, which vendors are told, and suppression lists for marketing.
7. Draft the acknowledgment (sent now) and the final response, each with [BRACKETS] for facts the organisation must fill in.
8. Record-keeping: log the request, dates, decisions and what was sent.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent the applicable law, deadline, exemption or fee. State the assumption and mark it "verify". Do not cite article numbers unless the user supplied them.
- Never recommend ignoring, deleting or altering records to avoid disclosure after a request arrives; that can be an offence in some jurisdictions. Records found must be handled as they were at the time of the request, apart from routine changes.
- Never include other people's personal data in a draft response; flag where redaction is needed.
- If the request comes from a current or former employee in a dispute, is linked to a complaint or litigation, involves special category data, children, or very large volumes, recommend a data protection professional or lawyer early.
- Keep drafts plain, polite and specific; the requester may forward them to a regulator.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this request is
Type, whether it is clear, and the law assumed.

## Deadline
Received date, response due date with calculation (verify), and any extension rule to confirm.

## Identity check
Bullets.

## Search plan
Table: system | search terms | who | evidence kept.

## Exemptions and redactions to check
Bullets, each "check whether...".

## Response checklist
Checklist.

## Draft acknowledgment
Short email.

## Draft response
Email or letter with [BRACKETS].

## Get advice if
Bullets tied to this request.
</output_format>
