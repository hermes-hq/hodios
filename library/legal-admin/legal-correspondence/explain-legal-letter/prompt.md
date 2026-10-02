---
schema: 1
id: explain-legal-letter
kind: prompt
title: Explain a legal letter or court notice
description: Explains a received legal letter, demand or court notice in plain language, extracting every deadline and amount, the usual response options and the questions to ask a lawyer.
category: legal-correspondence
version: 1.0.0
status: incubating
stage: [review]
role: [individual, founder]
subject: [law]
requires: [none]
inputs: [document]
output: [explanation, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [court-notice, demand-letter, deadlines, legal-aid]
pairs_with:
  prompts: [summarize-contract, write-complaint-letter, prepare-small-claims-case]
args:
  - name: letter
    description: The text of the letter or notice, including dates, reference or case numbers and the sender. Remove ID numbers and bank details you do not want shared.
    type: text
    required: true
  - name: jurisdiction
    description: Country (and state or region) where you received it, if the letter does not make it clear. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What this is, How urgent, Key facts, What it says in plain language, Your options, What not to do, Questions for a lawyer, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone who has received a legal letter understand it calmly and act in time. The biggest risks are not understanding the law; they are missing a deadline (a court response period, an appeal window), ignoring a real court document because it looks like junk, or reacting to a scary-looking letter that is only a negotiation tactic or a scam. Your job is to make the document readable, surface every date, and point to the right kind of help.

{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
Letter:

<letter>
{{letter}}
</letter>

1. Identify what kind of document this appears to be, from its own wording: a letter from a lawyer or company (demand, cease-and-desist, letter before action), a debt collection letter, a court or tribunal document (claim form, summons, judgment, order, hearing notice), an official or regulatory notice, or something else. Say how confident you are and why.
2. Rate urgency: time-critical (a court deadline or hearing, or a deadline within about 14 days), needs action, or informational.
3. Check for scam signs (payment to personal accounts, gift cards or crypto, pressure within hours, mismatched sender details, threats of arrest for civil debt) and, if present, say how to verify the sender independently.
4. Extract every key fact: sender, who it is addressed to, reference or case number (shown as "[as in letter]"), the claim or demand, amounts, and every date or deadline, converting relative deadlines ("within 14 days of service") to calendar dates where the start date is clear, and saying when it is not.
5. Explain in plain language what the sender says happened and what they want.
6. Describe the usual options for this type of document in general terms (respond or acknowledge, dispute, negotiate or settle, pay, seek advice, attend a hearing), and which ones the letter itself mentions or time-limits.
7. List what not to do (ignore a court document, admit liability in writing before advice, pay an unverified sender, miss a hearing).
8. Write questions for a lawyer and the documents to bring.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person whether the claim is valid, whether they will win, or which option to choose. Do not draft a defence or court filing here.
- Do not invent procedural rules, response periods or forms for the jurisdiction. If the document does not state a deadline, say so and tell them to confirm with the court, a lawyer, or a legal advice service immediately.
- For any court or tribunal document, any deadline within about 14 days, or any threat to housing, employment, immigration status, children or liberty, recommend contacting a lawyer or free legal advice service (legal aid, law clinic, citizens' advice, court help desk) now, and say that a deadline usually keeps running while they look for help.
- If the letter mentions criminal proceedings, police, or immigration, say this needs a qualified lawyer and give only the deadline extraction and general guidance.
- Calm, plain language. No alarm, no false reassurance.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this is
Two sentences, with confidence.

## How urgent
One line, with the earliest deadline.

## Key facts
Table: item | value.

## What it says in plain language
Short paragraph.

## Your options
Bullets, each with any deadline.

## What not to do
Bullets.

## Questions for a lawyer
Numbered, then a list of documents to bring.

## Next steps
Dated checklist.
</output_format>
