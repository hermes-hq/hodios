---
schema: 1
id: plan-post-award-setup
kind: prompt
title: Set up a newly awarded grant
description: Turns a grant award letter into a working setup - key terms, a compliance and reporting calendar, finance coding, data collection, acknowledgement rules and the first 30 days.
category: grant-writing
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [manager, executive, researcher, operations-manager]
requires: [none]
inputs: [document, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [post-award, grant-compliance, reporting-calendar, restricted-funds, grant-kickoff]
pairs_with:
  prompts: [write-grant-report, request-grant-variation, write-grant-evaluation-plan]
args:
  - name: award_documents
    description: The award letter, grant agreement or terms and conditions, or the relevant extracts (amount, dates, payment schedule, reporting, conditions, publicity, ownership of results).
    type: text
    required: true
  - name: project_and_team
    description: What the project will do, who is involved (delivery, finance, evaluation), and the organisation's systems for finance and data.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Key terms, Compliance calendar, Finance setup, Data and evaluation setup, Communications and acknowledgement, First 30 days, Unclear terms]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grants manager setting up a new award. Many grant problems start in the first month: an agreement nobody re-read after signing, conditions to meet before the first payment, a report deadline missed because it lived in one person's inbox, grant spending mixed into general accounts so it cannot be reported, baseline data not collected before activities started, or an announcement made before the funder's own. A short setup turns the agreement into dates, owners and systems. The agreement itself is the authority; where it is ambiguous, the funder's programme officer clarifies.

<award_documents>
{{award_documents}}
</award_documents>

<project_and_team>
{{project_and_team}}
</project_and_team>
</context>

<task>
1. Key terms: a plain summary of the amount, grant period, payment schedule and conditions for each payment, eligible costs and any caps, approval needed for changes, reporting requirements, record-keeping and audit rights, acknowledgement and publicity rules, ownership of results or intellectual property, data and safeguarding conditions, and termination or repayment clauses. Quote clause numbers if given.
2. Compliance calendar: every dated obligation (acceptance deadline, conditions before first payment, interim and final reports, financial claims, evaluation milestones, end date, record retention end) with owner and a reminder date ahead of each.
3. Finance setup: a separate cost code or restricted fund, how staff time on the grant will be recorded, how to keep receipts and evidence, budget versus actual reporting monthly, and who approves spending against the grant.
4. Data and evaluation setup: the indicators the funder expects, baseline data to collect before activities start, collection tools and consent forms, and who holds the data.
5. Communications and acknowledgement: whether and when the award can be announced (some funders announce first), required logos or wording, and thanks to the programme officer.
6. First 30 days: a numbered checklist with owners, including a kick-off meeting where the team reads the key terms together.
7. Unclear terms: anything ambiguous or unusual to clarify with the funder in writing, and anything that may need legal or finance advice before signing or accepting.
</task>

<constraints>
- Summarise only what the documents say; do not fill gaps with assumptions about this funder's rules. Mark missing items as not stated.
- Do not give legal interpretations of clauses; flag unusual or onerous terms (for example repayment triggers, unlimited audit, broad ownership of results) for legal or finance review.
- Every obligation has a date or trigger and an owner role.
- Keep the setup proportionate to the grant size.
</constraints>

<output_format>
## Key terms
## Compliance calendar
A table: Date or trigger | Obligation | Owner | Reminder.
## Finance setup
## Data and evaluation setup
## Communications and acknowledgement
## First 30 days
Numbered checklist with owners.
## Unclear terms
</output_format>
