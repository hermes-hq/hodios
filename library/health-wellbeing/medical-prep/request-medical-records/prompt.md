---
schema: 1
id: request-medical-records
kind: prompt
title: Request your medical records
description: Explains how to request your medical records, writes a ready-to-send request for each provider, and sets up a simple system to organise, check and share them.
category: medical-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [medicine]
requires: [none]
inputs: [text]
output: [message, checklist, plan]
risk: read-only
advice_risk: [medical, legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [medical-records, subject-access-request, patient-rights, health-records, record-keeping]
pairs_with:
  prompts: [prepare-second-opinion, organize-family-medical-history, prepare-emergency-medical-summary]
  personas: [health-navigator]
args:
  - name: country
    description: Where the providers are, since access rights, deadlines and fees differ, for example "UK", "California, USA", "Germany", "Australia".
    type: string
    required: true
  - name: providers
    description: Who holds the records and what you need, for example "my GP practice, full record; St Mary's Hospital, imaging and discharge letters from 2023; a private physio". Say if you are requesting for someone else and your relationship.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Your rights in brief, Before you send, Request letters, Tracking your requests, Organising your records, Checking and correcting, Sharing safely]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people get copies of their health records and keep them organised. You know the general picture: in many countries people have a legal right to access their own health records (for example under data-protection law in the UK and EU, or health-privacy law in the US), with deadlines for providers to respond and rules about fees that differ by jurisdiction; many providers offer patient portals that already show part of the record; requests usually need proof of identity; requesting for someone else usually needs their written consent or legal authority (such as a power of attorney or, for young children, parental responsibility, with limits for older children); imaging is often supplied separately; and people can ask for inaccurate information to be corrected or a note added. You mark any specific deadline, fee or law you are not sure applies in their country as something to check.

Country: {{country}}
<providers>
{{providers}}
</providers>
</context>

<task>
1. Your rights in brief: three to five lines on the right to access in {{country}}, the usual response deadline and fee rules if you are confident, otherwise marked [check], and where to confirm (the provider's privacy or records office, or the national data-protection or health-privacy regulator).
2. Before you send: check the patient portal first; decide exactly what to ask for (full record or specific dates, letters, results, imaging on disc or by electronic transfer, notes from particular departments), because a precise request is faster; gather ID; and, if requesting for someone else, the consent or authority needed.
3. Request letters: one short, ready-to-send letter or email for each provider listed, with placeholders for personal details ([full name], [date of birth], [address], [record or patient number]). Include what records and date range, the format wanted (electronic where possible), the legal basis in plain words if you are confident of it for {{country}}, and a request to confirm receipt. Keep each under 200 words.
4. Tracking your requests: a table to log each request with sent date, the expected response date and a follow-up date, plus a short polite chaser and what to do if the deadline passes (ask the records manager, then complain to the regulator).
5. Organising your records: a simple folder structure (digital and paper) by type and date, a file-naming pattern, a one-page index of key diagnoses, medicines, allergies, operations and contacts, and keeping a backup.
6. Checking and correcting: read for errors (wrong medicines, allergies, diagnoses, or someone else's information) and how to ask for a correction or for a note to be added.
7. Sharing safely: how to share with a new doctor or a second-opinion specialist (secure portals or provider-to-provider transfer rather than ordinary email where possible), and to share only what is needed.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state specific deadlines, fees or legal provisions for {{country}} unless you are confident; mark them [check] instead.
- Never fill in personal details; always use placeholders.
- Do not interpret anything in the records; suggest taking questions to a clinician.
- Never write a request for another adult's records without their consent or legal authority; if they want records for a dispute, say this usually needs consent or a court process and suggest asking their lawyer.
- If requesting a deceased person's records, say that different rules usually apply and to ask the provider what is needed.
- If the providers listed are too vague, write one generic request and ask which providers hold the records.
</constraints>

<output_format>
## Your rights in brief
## Before you send
Checklist.
## Request letters
One per provider, each in a quote block with a subject line.
## Tracking your requests
Table: Provider | What I asked for | Sent | Due | Follow up on | Received. Then the chaser in a quote block.
## Organising your records
## Checking and correcting
## Sharing safely
</output_format>
