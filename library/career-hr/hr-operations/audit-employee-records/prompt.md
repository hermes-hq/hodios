---
schema: 1
id: audit-employee-records
kind: prompt
title: Audit employee records
description: Plans an audit of personnel files and HR data - what each record should hold, gaps, over-kept data, access, retention and right-to-work evidence - and a fix-up plan, flagging what local law decides.
category: hr-operations
version: 1.0.0
status: incubating
stage: [verify, maintain]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [text, dataset, document]
output: [checklist, plan, report]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [personnel-files, record-keeping, data-retention, data-protection, hr-audit]
pairs_with:
  prompts: [select-hr-system, write-employee-handbook, plan-employee-offboarding]
  personas: [hr-business-partner]
args:
  - name: situation
    description: Why the audit is happening (system migration, an inspection, a data-access request, a merger, a new HR lead) and the deadline if any.
    type: text
    required: true
  - name: records
    description: Where employee records live now (paper files, shared drives, HR system, payroll, email), roughly how many current and former staff, and what you already know is messy.
    type: text
    required: true
  - name: jurisdiction
    description: Countries or states where staff are employed. Optional, but retention and right-to-work rules depend on it.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Record map, Audit checklist, Sampling plan, Fix-up plan, Access and retention, Questions for legal or data protection]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Employee records drift. Signed contracts and changes to terms go missing, so nobody can prove what was agreed. Right-to-work checks were done but the evidence was never filed, or was filed without the date of the check. Former staff files are kept forever "just in case", which data protection rules in many countries do not allow, while records that must be kept for a set period are deleted early. Sensitive data (health, disciplinary, diversity, bank details) sits in shared folders that half the company can open. The same person appears with different start dates in payroll and the HR system. An audit fixes this by first deciding what a complete, lawful file looks like for each type of worker, then checking a sample against it, then fixing causes as well as files.

<situation>
{{situation}}
</situation>
<records>
{{records}}
</records>
{{#jurisdiction}}Jurisdiction: {{jurisdiction}}{{/jurisdiction}}
</context>

<task>
1. Assumptions: if the jurisdiction is missing, ask for it and continue with retention and right-to-work points marked [JURISDICTION]. State which parts depend on local law.
2. Record map: list the record types an employee file usually holds (contract and changes, offer, identity and right-to-work evidence, pay and bank details, tax forms, leave, performance and disciplinary records, health and adjustments, training and certifications, leaver records), where each currently lives, and who owns it.
3. Audit checklist per worker type (current employees, leavers, contractors, interns): required items, the evidence that proves each, and data that should not be kept.
4. Sampling plan: how many files to check and how to choose them so the result is meaningful, plus a consistency check between systems (start dates, job titles, pay).
5. Fix-up plan: prioritised by legal and practical risk, separating missing items to obtain, wrong items to correct, over-kept data to delete under an agreed schedule, and process changes to stop the drift.
6. Access and retention: who should see which categories, how sensitive categories are separated, and a retention schedule template with periods left for local confirmation.
7. Questions for an employment lawyer or data protection lead.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state retention periods, right-to-work requirements or data protection rules as fact; mark each "confirm for [jurisdiction]".
- Do not recommend deleting anything that may relate to an open dispute, claim, investigation or data-access request; flag a hold.
- Do not ask the user to paste real employee personal data; work from descriptions and counts.
- Recommend that the audit itself is done by people with a need to see the data.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
## Record map
Table: Record type | Where it lives | Owner | Sensitive?
## Audit checklist
Per worker type, as checkboxes.
## Sampling plan
## Fix-up plan
Table: Issue | Risk | Action | Owner | By when.
## Access and retention
Access rules, then a retention table with periods to confirm.
## Questions for legal or data protection
Numbered.
</output_format>
