---
schema: 1
id: handle-government-data-request
kind: prompt
title: Handle a police or government data request
description: Guides a small organisation through a police, court or government request for customer or staff data, checking authenticity and legal basis, disclosing only what is needed and keeping a record.
category: compliance
version: 1.0.0
status: incubating
stage: [operate]
role: [operations-manager, founder, legal-professional, support-agent]
subject: [law]
requires: [none]
inputs: [message, document, text]
output: [plan, checklist, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [law-enforcement-requests, disclosure, court-orders, data-sharing, transparency-log]
pairs_with:
  prompts: [handle-data-subject-request, map-personal-data-processing, plan-cctv-data-compliance]
  personas: [compliance-officer]
args:
  - name: request
    description: The request as received - who sent it (police force, court, tax authority, regulator, foreign agency), how it arrived, what data it asks for, about whom, the stated legal basis or reason, any deadline, and any instruction not to tell the person. Remove details you do not need to share.
    type: text
    required: true
  - name: organisation
    description: Your organisation, country, what data you hold about the person, and any policy you have for these requests. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Verify the request, Legal basis check, What to disclose, Telling the person, Draft reply, Record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation respond to a request for personal data from police, courts or other public authorities. These requests come in different forms with different force: a voluntary request (the organisation may usually disclose if data protection law allows an exemption for crime prevention or similar, but is not compelled), a compulsory order or warrant (the organisation must comply within its terms), and a request from a foreign authority (which often must go through formal channels). Fake requests are a real fraud method: emails pretending to be from police asking for a customer's address or account details. Good practice is to verify the requester through an independently found contact, ask for the request in writing on official letterhead or through the official portal, check the stated basis, disclose only what is necessary, and log every decision. Some orders include a non-disclosure instruction; otherwise, whether to tell the person depends on whether telling them would prejudice the investigation.
</context>

<task>
Request:

<request>
{{request}}
</request>
{{#organisation}}

Organisation:
<organisation>
{{organisation}}
</organisation>
{{/organisation}}

1. Verify the request: check sender details, ask for it in writing through official channels, call back on an independently sourced number, and look for fraud signs (personal email domains, urgency, requests for passwords or full account access, odd formatting). If anyone is in immediate danger, note that emergency disclosure procedures may apply and should be handled by a senior person.
2. Legal basis check: classify the request as voluntary, compulsory or foreign, from its wording, and explain what that means in general terms. Identify the information needed to decide (the offence or purpose, why the data is needed, the specific data and date range) and the exemption or power the requester relies on, marked "verify".
3. What to disclose: apply minimisation - only the data items and date range necessary for the stated purpose; flag other people's data in the records and redaction; secure transfer method.
4. Telling the person: whether to notify the data subject, considering any non-disclosure instruction and whether notice could prejudice an investigation; when to revisit.
5. Draft a reply: either requesting clarification and the formal basis, or confirming disclosure with a list of what is enclosed.
6. Record: a log entry template (date, requester, basis, data requested, data disclosed, decision maker, reasons).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent statutes, powers, order types or deadlines; describe them generally and mark "verify".
- Never recommend disclosing data to an unverified requester, or disclosing more than requested and necessary.
- Never recommend ignoring or obstructing a valid court order or warrant; if in doubt about validity, get legal advice quickly rather than refusing outright.
- Recommend legal advice for compulsory orders, foreign authority requests, requests touching special category data or journalists' sources, or any request with a gagging instruction.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verify the request
Checklist with any fraud signs found.

## Legal basis check
Classification and what is needed to decide.

## What to disclose
Table: data item | requested | necessary? | disclose or withhold | reason.

## Telling the person
Bullets.

## Draft reply
Email or letter.

## Record
Log entry template filled where possible.
</output_format>
