---
schema: 1
id: coordinate-care-across-specialists
kind: prompt
title: Coordinate care across specialists
description: Sets up a system for someone seeing several specialists for long-term conditions, with a care team map, shared summary, appointment and test tracker, and a way to spot gaps and conflicts to raise.
category: chronic-conditions
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [notes, text]
output: [table, summary, checklist, questions]
risk: read-only
advice_risk: [medical]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [multimorbidity, care-coordination, health-admin, patient-advocacy, carers, test-results]
pairs_with:
  prompts: [build-medication-list, prepare-emergency-medical-summary, prepare-medication-review]
args:
  - name: care
    description: Your conditions, each specialist or service you see (role, not names), what each manages, upcoming appointments and tests, medicines and who prescribes each, and where things have fallen through the cracks. Remove names and ID numbers.
    type: text
    required: true
  - name: tools
    description: How you prefer to keep things (paper folder, spreadsheet, notes app, a patient portal) and whether a carer helps. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Your care team map, One-page summary, Tracker, Gaps and possible conflicts, Questions to raise, Keeping it up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people with several long-term conditions, or their carers, manage care spread across many services. With multimorbidity each specialist looks after one part, and coordination often falls to the patient: letters do not arrive, a test is ordered twice or not at all, two prescribers do not know about each other's medicines, and nobody owns the whole picture. Experienced patients and carers keep a simple system: a map of who manages what and how to reach them, a one-page summary they bring everywhere, a tracker for appointments, tests and results with who will act on them, and a habit of asking "who is the lead for this?" and "will you send the letter to my GP and the other teams?". Many health systems have a primary care doctor or a care coordinator who can take the lead if asked. Spotting possible conflicts is for asking about, never for acting on.

<care>
{{care}}
</care>
{{#tools}}Preferred tools: {{tools}}{{/tools}}
</context>

<task>
1. Your care team map: a table of each service, what it manages, how to contact it, the medicines it prescribes, and the next contact. Mark unknowns [not noted].
2. One-page summary: conditions, current medicines with dose and prescriber exactly as given, allergies, key recent results they listed, devices, and the lead clinician if there is one. Copy facts exactly.
3. Tracker: appointments, tests and results with a column for "who acts on the result" and "chased by", in their preferred tool format.
4. Gaps and possible conflicts: places where nobody seems to own something, results with no clear follow-up, appointments that may duplicate, or medicines from different prescribers that the person should ask about together. State these as questions to check, never as problems found.
5. Questions to raise: for the GP or lead clinician (whether they can coordinate, whether a combined medication review is possible), and for each specialist (copying letters to the others, who acts on which result).
6. Keeping it up: a ten-minute weekly routine, what to update after each appointment, and how a carer can be authorised to help where that is required.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not interpret results, judge whether a treatment is right, or suggest changing or stopping any medicine. Possible interactions or duplications are things to ask a pharmacist or prescriber about.
- Copy medicine names, doses and results exactly; mark anything unclear.
- Do not include names or identifiers in the output.
</constraints>

<output_format>
## Your care team map
Table: Service | Manages | Contact | Prescribes | Next contact.
## One-page summary
## Tracker
Table: Date | What | Service | Result due | Who acts | Chased by.
## Gaps and possible conflicts
## Questions to raise
## Keeping it up
</output_format>
