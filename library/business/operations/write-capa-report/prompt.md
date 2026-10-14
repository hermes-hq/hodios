---
schema: 1
id: write-capa-report
kind: prompt
title: Write a CAPA record
description: Writes an internal corrective and preventive action record for a nonconformance or audit finding - containment, root cause, actions with owners and dates, and an effectiveness check.
category: operations
version: 1.0.0
status: incubating
stage: [review, operate]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [notes, document, text]
output: [report, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [capa, nonconformance, corrective-action, quality-management, effectiveness-check]
pairs_with:
  prompts: [run-five-whys, write-8d-report, mistake-proof-a-process]
args:
  - name: nonconformance
    description: What happened - the requirement that was not met, where it was found (internal audit, inspection, process deviation, complaint, near miss), when, how many items or jobs are affected, and the evidence.
    type: text
    required: true
  - name: investigation
    description: What is known about the cause so far - timeline, records, interviews, data, what was already done. Leave empty if the investigation has not started.
    type: text
  - name: system
    description: The quality system or standard the record must fit, if any (for example an ISO 9001 or ISO 13485 system, a customer's requirements, or no formal system).
    type: string
output_contract:
  format: markdown
  sections: [Record summary, Nonconformance, Containment, Root cause, Corrective actions, Preventive actions, Effectiveness check, Open items]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A CAPA record is the internal evidence that a problem was contained, understood and stopped from returning. Auditors reject CAPAs for the same few reasons: the problem statement does not cite the requirement breached, containment is missing or does not cover product already shipped, "operator error" or "retrained staff" is given as the root cause, actions do not address the cause found, and there is no objective effectiveness check, or it is "closed" the day actions are done. Correction (fixing this item), corrective action (removing the cause of this nonconformance) and preventive action (removing the cause of a potential problem elsewhere, such as on sister lines or similar products) are different things and should be listed separately. A good effectiveness check names a measure, a period and a pass criterion decided before the result is known. Customer-facing complaint replies (such as an 8D) draw on the CAPA but are a separate document.
</context>

<task>
Nonconformance:
<nonconformance>
{{nonconformance}}
</nonconformance>

{{#investigation}}Investigation so far:
<investigation>
{{investigation}}
</investigation>{{/investigation}}

{{#system}}Quality system: {{system}}{{/system}}

1. Write a problem statement covering what, where, when, how many, the requirement not met and how it was detected. Classify severity (safety or regulatory, customer impact, internal only).
2. Containment: list immediate actions to protect the customer and the process, including stock on hand, work in progress and anything already shipped since the last known good point. Mark actions not yet confirmed as done.
3. Root cause: work from the evidence given. Use a short why chain or cause categories (method, machine, material, people, measurement, environment). Separate confirmed causes from hypotheses and say what evidence would confirm each. Address both why it happened and why it was not detected.
4. If the only cause offered is human error or lack of training, ask why the process allowed that error and propose a system-level cause to verify.
5. Corrective actions: each tied to a confirmed or likely cause, with owner role, due date as `[DATE]` if not given, and evidence of completion.
6. Preventive actions: where else the same cause could act (other products, lines, sites, suppliers, documents) and what to do there.
7. Effectiveness check: a measurable criterion, the period or quantity to watch, who checks and when the CAPA may be closed.
8. List open items and documents to update (procedures, drawings, risk assessments, training records, the FMEA if one exists).
</task>

<constraints>
- Do not invent evidence, test results, quantities or completed actions. Unknowns become `[CONFIRM: …]` and go under Open items.
- Never close a CAPA on "retrained operator" alone; retraining can be an action but not the whole answer.
- Keep correction, corrective action and preventive action distinct.
- If the nonconformance involves product safety, a regulated product or a legal reporting duty, state that a decision on notifying the customer or authority is needed and who in the business should make it; do not decide it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Record summary
Table: CAPA no. `[ID]` | Source | Date opened | Severity | Owner | Target close date.
## Nonconformance
Problem statement.
## Containment
Table: Action | Scope covered | Owner | Status.
## Root cause
Occurrence cause and detection cause, each marked confirmed or hypothesis, with evidence.
## Corrective actions
Table: Action | Cause addressed | Owner | Due | Evidence of completion.
## Preventive actions
Table: Where else | Action | Owner | Due.
## Effectiveness check
Measure, period, pass criterion, checker, review date.
## Open items
Numbered list, including documents to update.
</output_format>
