---
schema: 1
id: prepare-asylum-statement
kind: prompt
title: Prepare an asylum statement with a lawyer
description: Helps someone seeking asylum organise their own account into a clear, dated chronology for their lawyer, with gaps, evidence and inconsistencies to discuss, at their pace and in their words.
category: immigration
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal, mental-health]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [asylum-claim, refugee-protection, personal-statement, trauma-informed, credibility]
pairs_with:
  prompts: [find-free-legal-help, prepare-for-immigration-appointment, vet-immigration-adviser]
args:
  - name: account
    description: What happened to you and why you fear returning, in your own words, in whatever order it comes. Share only what you are comfortable with; you can stop at any time.
    type: text
    required: true
  - name: country
    description: The country where you are claiming, and whether you have a lawyer or legal aid representative yet, and any interview date.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before we start, Your chronology, Questions your lawyer may ask, Evidence to gather, Points to discuss with your lawyer, Looking after yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An asylum decision often turns on whether the decision-maker finds the account credible and consistent, and on whether the fear is linked to grounds the law protects. Trauma affects memory: people often remember events in fragments, out of order, without exact dates, and may find some things very hard to say. Decision-makers are supposed to take this into account, but inconsistencies between the screening interview, the written statement and the main interview are still a common reason for refusal. A lawyer or legal aid representative turns the account into a formal statement and connects it to the law; the person's job, with this help, is to put their own memories in order, mark what they are unsure about, and gather what evidence exists. This must be their account in their words: a statement that is polished, exaggerated or copied from someone else harms the claim.

Country and representation: {{country}}

<account>
{{account}}
</account>
</context>

<task>
1. Before we start: in a few lines, explain how this helps (organising their account for their lawyer), that they control the pace and can stop, and that the lawyer, not this tool, decides how the claim is presented. If they do not yet have a lawyer, say first what kinds of free legal help for asylum commonly exist (legal aid, refugee law clinics, refugee support organisations) and that they should get one before any interview if possible.
2. Your chronology: put the events they described in order with approximate dates or anchors (season, age, a known event), keeping their words, and marking anything uncertain as uncertain. Do not add events or details.
3. Questions your lawyer may ask: gentle, open questions about gaps in the chronology (who, what, where, when, why they fear return), offered for them to think about, not to answer here unless they wish.
4. Evidence to gather: documents, photos, medical records, messages, witness contacts, and country information their lawyer may use, noting safety concerns about contacting people at home.
5. Points to discuss with your lawyer: anything that might look inconsistent with earlier interviews or documents (including problems with an interpreter or with how an earlier interview was recorded), travel route and other countries passed through, and any document issues, to raise openly with the lawyer.
6. Looking after yourself: brief, practical support options and what to do if recalling events becomes overwhelming.
</task>

<constraints>
{{> guardrails/professional-limits}}
{{> guardrails/crisis-safety}}
- Use only what the person tells you, in their words. Never add, strengthen or invent events, persecution or dates, and never suggest a story that would fit the law better.
- Do not assess whether the claim will succeed or which legal ground applies; that is for their lawyer.
- Do not push for details of traumatic events; offer to continue later.
- If they write in a language other than English, keep their own words in that language in the chronology, with a translation beside it if helpful.
- Do not invent the names, phone numbers or websites of legal services or support organisations; describe the kind of service and how to find it locally.
- Remind them not to share the chronology with anyone except their lawyer and to keep it secure, because it may contain information that puts them or others at risk.
- If they mention being in danger now, detention or removal, put contacting a lawyer and emergency help first.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before we start
## Your chronology
Table: When | What happened (their words) | Sure or unsure.
## Questions your lawyer may ask
## Evidence to gather
Checklist.
## Points to discuss with your lawyer
## Looking after yourself
</output_format>
