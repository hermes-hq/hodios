---
schema: 1
id: write-8d-report
kind: prompt
title: Write an 8D report
description: Writes an 8D report answering a customer quality complaint, covering team, problem description, containment, root cause for occurrence and escape, corrective and preventive actions and verification.
category: business-writing
version: 1.0.0
status: incubating
stage: [operate, review]
role: [operations-manager, manager, consultant, project-manager]
requires: [none]
inputs: [notes, document, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [8d-report, quality-complaint, corrective-action, manufacturing-quality, root-cause]
pairs_with:
  prompts: [write-a3-report, run-five-whys, write-supplier-nonconformance-report]
args:
  - name: complaint
    description: The customer complaint or nonconformance notice, with part or product, quantity, dates, the defect, and what the customer requires and by when.
    type: text
    required: true
  - name: investigation
    description: What your team has found so far, such as containment done, stock checked, data, root cause analysis, actions taken or planned, and team members by role.
    type: text
    required: true
  - name: customer_format
    description: The customer's 8D form headings or required deadlines for each step, if they have one. Optional.
    type: text
output_contract:
  format: markdown
  sections: [8D report, Weak points a customer quality engineer will challenge, Gaps to fill]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The 8D (eight disciplines) is the standard way suppliers answer customer quality complaints in automotive, aerospace, electronics and general manufacturing. Customer quality engineers reject 8Ds for familiar reasons: the problem description is vague instead of using is / is-not detail (what, where, when, how many); containment does not cover all suspect stock, including in transit and at the customer; the root cause stops at "operator error" or "retrain operator"; only the occurrence cause is found, not why the defect escaped detection; corrective actions are not verified with data; and nothing is done to prevent the same failure on similar products or processes (updating the FMEA and control plan). Customers usually expect containment within 24 to 48 hours and the full report within a set period, so the report often goes out in stages with D1 to D3 first.
</context>

<task>
Write an 8D report.

<complaint>
{{complaint}}
</complaint>

<investigation>
{{investigation}}
</investigation>
{{#customer_format}}
<customer_format>
{{customer_format}}
</customer_format>
{{/customer_format}}

1. If the complaint does not identify the defect or product, ask in one short message and stop. If the investigation is early, write the disciplines that can be completed and mark later ones "open" with planned dates, as an interim 8D.
2. Follow the customer's format if given.
3. D1 Team: members by role, with a leader and a champion.
4. D2 Problem description: what, where, when, how many, how detected, in is / is-not form, from the facts given.
5. D3 Containment: actions to protect the customer now, covering stock at the plant, in transit, in warehouses and at the customer, with quantities checked and results; state the containment's effectiveness.
6. D4 Root cause: separately for occurrence (why it was made) and escape (why it was not detected), each with the analysis method and the evidence that verifies the cause. Unverified causes stay labelled as suspected.
7. D5 Permanent corrective actions: one per verified root cause, for both occurrence and escape, with how effectiveness will be proven.
8. D6 Implementation and validation: dates, owners, and results data or the planned verification.
9. D7 Prevent recurrence: update of process FMEA, control plan, work instructions, and similar products or lines to check (read-across).
10. D8 Closure and recognition: closure criteria and team recognition.
11. List the weak points a customer quality engineer would challenge.
</task>

<constraints>
- Use only the facts given. Never invent quantities, test results, dates or root causes; mark gaps `[NEEDED: …]`.
- "Operator error" or "retraining" alone is never an acceptable root cause or corrective action; if that is all the input offers, say so in the weak points and ask what in the process allowed the error.
- Keep it factual and non-defensive; do not dispute the complaint unless the input gives evidence, and then present it neutrally.
</constraints>

<output_format>
## 8D report
Header (customer, complaint number placeholder, part, dates, status: interim or final), then D1 to D8 as headed sections with tables where useful (D2 is / is-not; D3 containment by location; D4 causes; D5 and D6 actions with owner, date, verification).
## Weak points a customer quality engineer will challenge
Bullets with how to strengthen each.
## Gaps to fill
Each `[NEEDED: …]`. "None" if none.
</output_format>
