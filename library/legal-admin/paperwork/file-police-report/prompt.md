---
schema: 1
id: file-police-report
kind: prompt
title: File a police report
description: Prepares a police report for theft, fraud, burglary or criminal damage - the facts and evidence to record, getting a crime reference and using it for insurers and banks.
category: paperwork
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, report, plan]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [police-report, crime-reference, theft, burglary, fraud-report, insurance-claim]
pairs_with:
  prompts: [respond-to-identity-theft, claim-scam-reimbursement-from-bank, handle-emergency-abroad]
args:
  - name: incident
    description: What happened, when and where, what was taken or damaged and its value, how you found out, anyone seen or suspected, and anything already done (bank called, cards blocked).
    type: text
    required: true
  - name: location
    description: Country and city or region where it happened. Reporting channels and which body takes the report differ.
    type: string
    required: true
  - name: purpose
    description: Optional. What you need the report for - insurance claim, bank refund, replacing documents, a landlord or employer, or simply to have it recorded.
    type: text
output_contract:
  format: markdown
  sections: [First steps, Where to report, Your statement, Evidence and item list, After you report]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a victim of a non-emergency crime report it well. Reports are often filed vaguely and then fail the person later: insurers and banks usually ask for a crime or incident reference number, sometimes within a set time; police may not investigate low-value crimes but a clear, complete report with serial numbers, CCTV locations and transaction details gives them something to act on and links the case to others. Many places route reports by type: an emergency number for crimes in progress or danger, a non-emergency number or online form for most thefts and damage, and a separate national fraud or cybercrime reporting centre for scams and online fraud. Reports abroad may need to be made in person and in the local language, and travel insurers often require a report made within a short time of the theft. Victims also tend to forget the time-critical actions that matter more than the report: blocking cards, changing passwords, tracking or locking a phone, and preserving CCTV before it is overwritten.

Location: {{location}}

<incident>
{{incident}}
</incident>

{{#purpose}}Report needed for: {{purpose}}{{/purpose}}
</context>

<task>
1. If anything suggests danger now, an offender nearby or a crime in progress, say to call the local emergency number first and stop there.
2. List time-critical first steps for this crime type: block or cancel cards, call the bank's fraud line, change passwords and enable two-step login, use device tracking and remote lock, ask nearby businesses to keep CCTV, avoid touching items the offender handled, and photograph damage.
3. Say where to report in {{location}} for this type of crime (emergency, non-emergency line, online form, a fraud or cybercrime centre, local police abroad), marked "[to verify]", and whether in person may be required.
4. Draft a factual statement in the first person: date, time window and place, what happened in order, what was taken or damaged with values, descriptions of anyone seen, and what the person has done since. Use only the facts given; put unknowns in [brackets]; separate what they saw from what they believe.
5. Build an evidence and item list: serial numbers, IMEI for phones, receipts or photos of items, bank transactions with dates and amounts, screenshots of messages or listings, and CCTV locations.
6. Explain after reporting: note the crime reference and the officer or form confirmation, how to add information later, what insurers and banks will usually ask for and their time limits ("[to verify]"), and victim support services.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never add, exaggerate or guess facts, values or suspects; false reports are an offence and also sink insurance claims.
- Do not encourage the person to confront a suspect, track down stolen goods themselves or go to an address shown by a tracking app; give the location to police instead.
- If the incident involves violence, sexual assault, stalking or domestic abuse, put safety and specialist support first and do not ask for unnecessary detail.
{{> guardrails/crisis-safety}}
- Mark reporting channels and deadlines "[to verify]".
{{> output/uncertainty}}
</constraints>

<output_format>
## First steps
Checklist in order of urgency.

## Where to report
Two to four lines marked "[to verify]".

## Your statement
The draft statement.

## Evidence and item list
Table: Item or evidence | Detail (serial, value, date) | Have it?

## After you report
Bullets.
</output_format>
