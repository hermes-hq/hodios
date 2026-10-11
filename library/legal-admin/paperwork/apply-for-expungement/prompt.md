---
schema: 1
id: apply-for-expungement
kind: prompt
title: Apply to clear a criminal record
description: Checks whether a criminal record can be expunged, sealed, set aside or treated as spent, and prepares the petition, documents and what to disclose in the meantime.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, job-seeker]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, plan, questions, message]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [expungement, record-sealing, spent-convictions, criminal-record, pardon, second-chance]
pairs_with:
  prompts: [prepare-job-search-with-criminal-record, prepare-for-background-check, find-free-legal-help, write-character-reference]
args:
  - name: location
    description: Country and state or province where the conviction or arrest happened; clearing a record depends on the law where the case was handled, not where you live now.
    type: string
    required: true
  - name: record
    description: What is on the record - each arrest, charge or conviction with the offence, year, sentence (fine, probation, prison and length), whether all conditions, fines and restitution are complete, any later offences, and why you want it cleared (jobs, housing, travel, licensing).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What clearing a record can mean, Questions that decide eligibility, Getting your official record, Petition or application, Supporting documents, What to disclose meanwhile, Free help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people find out whether they can clear or limit a criminal record and prepare the application. The terms vary and matter: expungement (record destroyed or treated as never existing), sealing (hidden from most checks but visible to some agencies), set-aside or dismissal after completed probation, spent convictions that no longer need disclosing after a rehabilitation period, pardons or record suspensions, and automatic "clean slate" relief in some places. Eligibility usually turns on the offence type, the sentence, the time since the sentence ended, whether all fines and restitution are paid, and later offences. Arrests and charges that did not lead to conviction are often the easiest to clear and are commonly forgotten. What experts know: people misjudge their eligibility from memory, so the first step is always obtaining the official record; cleared records may still be visible for certain jobs (children, vulnerable adults, law enforcement, some licences) and to immigration authorities; and private background check companies may hold outdated data that needs a separate correction. You organise; eligibility is decided by the court or agency.

Location: {{location}}
</context>

<task>
Record and goal:

<record>
{{record}}
</record>

1. Explain what clearing a record can mean in {{location}}: the relief types that commonly exist there, using local names only when confident, otherwise descriptive names marked "to verify", and what each does and does not hide.
2. List the questions that decide eligibility for each item on the record, answered from what was given or marked "[to confirm]": offence category, sentence and completion date, waiting periods, outstanding fines or restitution, later offences, and whether the item was a non-conviction.
3. Getting your official record: how to obtain the official criminal history or court records (state or national repository, court clerk) and why to check it against memory, including dates and dispositions.
4. Petition or application: the usual steps (forms, filing with the court or board, fees and fee waivers to verify, notice to the prosecutor, possible hearing), and a draft personal statement in the person's voice showing completion of the sentence, what has changed since, and the concrete harm the record causes (a job offer withdrawn, housing refused), using only facts given.
5. Supporting documents: proof of completed sentence and payments, employment, education or treatment records, references, and evidence of the specific barrier.
6. What to disclose meanwhile: explain that until relief is granted the record may still need to be disclosed when asked, that questions differ (convictions only, unspent convictions, any arrest), and that answering falsely can cause more harm than the record. Note immigration and certain licensing applications usually require disclosure even after clearing (to verify).
7. Free help: legal aid, public defender or clean-slate clinics, re-entry organisations.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person they are eligible; set out the deciding factors and the official route to confirm.
- Do not invent waiting periods, offence lists or fees; mark them "to verify".
- Never advise lying about a record on an application; explain disclosure duties honestly and how to talk about the record instead.
- If the person is not a citizen, say that criminal record relief may not remove immigration consequences and immigration advice is needed before applying or travelling.
- Use respectful, non-judgemental language.
{{> output/uncertainty}}
</constraints>

<output_format>
## What clearing a record can mean
Table: relief | what it does | who can still see it | likely relevant?

## Questions that decide eligibility
Per record item: bullets with answers or [to confirm].

## Getting your official record
Numbered steps.

## Petition or application
Numbered steps, then the draft personal statement.

## Supporting documents
Checklist.

## What to disclose meanwhile
Bullets.

## Free help
Bullets.
</output_format>
