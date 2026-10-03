---
schema: 1
id: prepare-for-immigration-appointment
kind: prompt
title: Prepare for an immigration appointment
description: Prepares someone for an appointment at an immigration or registration office with a folder checklist, likely questions, interpreter options and what to do if a document is missing.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [immigration-office, appointment-preparation, interpreter, required-documents, newcomers]
pairs_with:
  prompts: [understand-residence-permit-conditions, write-immigration-status-enquiry, prepare-visa-application, find-free-legal-help]
  personas: [legal-information-guide]
  workflows: [newcomer-first-month-track]
args:
  - name: appointment_type
    description: What the appointment is for, as written on the booking if possible, for example "residence permit extension", "address registration", "biometrics for residence card", "family reunification interview".
    type: string
    required: true
  - name: country
    description: Country, and city or office if known; requirements often differ between offices.
    type: string
    required: true
  - name: documents_held
    description: The documents you already have ready, and anything you are still waiting for. Optional but lets the checklist show your gaps.
    type: text
  - name: appointment_language
    description: Your comfort with the office's language. needs-interpreter adds how to request one and ready-to-show sentences.
    type: enum
    enum: [fluent, basic, needs-interpreter]
    default: basic
output_contract:
  format: markdown
  sections: [The appointment in brief, Folder checklist, Likely questions, Language and interpreter, If something is missing or goes wrong, On the day, After the appointment, Confirm before you go]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Immigration and registration appointments are often hard to get and short once you are in the room. People are sent away for avoidable reasons: a photo that does not meet the specification, a copy instead of an original, a translation that is not certified, the wrong payment method, a missing landlord confirmation, a child who had to be present, or one form unsigned. Others leave without the one thing that protects them: a written receipt or bridging document showing their application is pending. You prepare the person so they walk in with an ordered folder, know what will be asked and what to do if something goes wrong.

Appointment: {{appointment_type}}
Country and office: {{country}}
Language comfort: {{appointment_language}}
</context>

<task>
{{#documents_held}}
Documents the person has:

<documents_held>
{{documents_held}}
</documents_held>

{{/documents_held}}
1. In general terms, say what this kind of appointment usually involves (submission, biometrics, short interview, collection) and roughly how long, marked typical.
2. Build the folder checklist for this appointment type: the documents commonly required, original or copy, how many copies, translation and apostille needs, photo specification, the fee and accepted payment methods, the booking confirmation, and who must attend (each family member, children, sponsor). Compare it with the documents they hold, if given, and mark each Have, Missing or Check. Order the checklist the way an officer usually goes through it.
3. List the questions an officer typically asks at this kind of appointment, with how to answer: truthfully, briefly, consistently with the forms, and "I don't know, can I check?" when unsure.
4. Language: whether offices typically provide interpreters, whether a friend may interpret, and how to ask in advance. At needs-interpreter or basic, give four or five sentences in the office's language with an English gloss (I have an appointment; I don't understand, please speak slowly; can I bring this document later; can I have a receipt for what I submitted).
5. If something is missing or goes wrong: ask whether the document can be sent later and how; ask for written confirmation of what was submitted and of the next step; ask whether a bridging document will be issued if the current permit expires before a decision; never sign anything not understood; note the date, time and officer's desk or name; when to contact free legal help.
6. On the day and after the appointment: timing, security, phone use, what to keep, and what to calendar next.
7. Before writing, check that every Missing item from step 2 has an action and that no requirement is stated as certain.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Requirements differ by office and change; mark them "typical, confirm on the office's official page or booking confirmation".
- Never suggest giving false answers, rehearsing a story that differs from the documents, or hiding previous refusals or overstays.
- If the appointment is an asylum interview, a removal or detention matter, or follows a refusal, tell them to get a specialist adviser or lawyer before the appointment and keep the rest brief.
- Keep personal identifiers out of the output.
{{> output/uncertainty}}
</constraints>

<output_format>
## The appointment in brief
Three or four lines.

## Folder checklist
Table: Order | Document | Original or copy | Copies | Translation or apostille | Your status | Notes.

## Likely questions
Table: Question | How to answer well.

## Language and interpreter
Bullets, then the phrase block if needed.

## If something is missing or goes wrong
Bullets.

## On the day
Checklist.

## After the appointment
Bullets, including what to calendar.

## Confirm before you go
Numbered questions for the office or its website.
</output_format>
