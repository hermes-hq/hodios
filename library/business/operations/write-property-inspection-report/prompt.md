---
schema: 1
id: write-property-inspection-report
kind: prompt
title: Write a rental property inspection report
description: Writes a periodic rental inspection report from a property manager's notes, with room-by-room condition, maintenance needed, tenant-caused issues, photos to attach and dated actions with owners.
category: operations
version: 1.0.1
status: incubating
stage: [operate, review]
role: [operations-manager, individual]
subject: [real-estate]
requires: [none]
inputs: [notes, document]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [property-management, rental-inspection, landlord, condition-report, wear-and-tear]
pairs_with:
  prompts: [set-up-rental-maintenance-process, document-rental-move-in, check-landlord-obligations]
  personas: [property-manager]
args:
  - name: inspection_notes
    description: Your notes from the visit, room by room if possible - condition, damage, repairs needed, safety checks done (smoke and carbon monoxide alarms), meter readings, photo numbers, and anything the tenant reported.
    type: text
    required: true
  - name: property
    description: The property reference and the inspection date, for example "Flat 2, 14 Mill Lane - inspected 3 October".
    type: string
    required: true
  - name: previous_report
    description: Optional. The last inspection or the move-in inventory, so changes can be compared.
    type: text
output_contract:
  format: markdown
  sections: [Inspection details, Summary, Room by room, Safety checks, Maintenance needed, Tenant responsibility items, Changes since last report, Actions, Photos to attach, Gaps in the notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.1, note: "Audience is property managers and self-managing landlords."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You write periodic inspection reports for residential property managers. The report may be read months later by a landlord deciding on repairs, by a tenant disputing a deposit deduction, or by an adjudicator, so it must record what was seen, in neutral words, with nothing the notes do not support. The key distinction is between fair wear and tear (the normal deterioration of an occupied home, which is the landlord's cost), damage or neglect by the occupants, and maintenance the landlord owes regardless. Causes such as damp or leaks are often not visible at an inspection; the honest entry is "cause not established, investigate" rather than a guess.

Property: {{property}}

<inspection_notes>
{{inspection_notes}}
</inspection_notes>
{{#previous_report}}
<previous_report>
{{previous_report}}
</previous_report>
{{/previous_report}}
</context>

<task>
1. If the notes do not cover at least the main rooms or give no condition information, ask for the missing parts and stop.
2. Write a summary of three to five sentences: overall condition, anything urgent, and whether the tenancy appears to be going well.
3. Go room by room. For each item give its condition (good, fair, poor) and a factual description: what, where, how big. Classify each issue as maintenance (landlord), possible tenant responsibility, or wear and tear, and mark uncertain ones "to be confirmed".
4. Record the safety checks: smoke and carbon monoxide alarms tested and working or not, visible hazards, and any certificates seen or due. Mark a failed or untested alarm, gas smell, electrical hazard, significant leak, or damp and mould as urgent.
5. List maintenance needed with priority (urgent, soon, routine) and the likely trade.
6. List possible tenant-responsibility items, worded neutrally, with what the tenant should be asked to do. Do not decide liability or deposit deductions.
7. If a previous report is supplied, compare: what is new, what got worse, what was fixed.
8. Build the action list: action, owner (landlord, agent, tenant, contractor), deadline, and how completion will be confirmed. Deadlines the notes do not give become `[SET DATE]`.
9. List the photos to attach by number and what each shows.
10. Before writing the final version, check that every issue in the report is in the notes, that no cause is stated without evidence, and that no tenant is described by anything other than what was observed in the property.
</task>

<constraints>
- Neutral, factual language: "15 cm scuff on the hallway wall at shoulder height", not "tenant has trashed the hallway".
- Never record personal details of the tenants beyond what is needed for the property (for example, do not comment on belongings, lifestyle or visitors unless they cause a safety or damage issue).
- Do not state legal obligations, repair deadlines or deposit rules as fact. Where they matter, write `[CHECK: tenancy agreement and local rules]`.
- Treat damp, mould, leaks, gas, electrics and alarms as safety issues, never cosmetic.
</constraints>

<output_format>
## Inspection details
Property, date, inspected by `[NAME]`, tenant present (yes, no, not recorded).
## Summary
## Room by room
One table per room: Item | Condition | Description | Type (maintenance, tenant, wear and tear, to be confirmed) | Photo.
## Safety checks
## Maintenance needed
Table: Issue | Priority | Trade.
## Tenant responsibility items
## Changes since last report
Omit if no previous report.
## Actions
Table: Action | Owner | Deadline | Confirmed by.
## Photos to attach
## Gaps in the notes
</output_format>
