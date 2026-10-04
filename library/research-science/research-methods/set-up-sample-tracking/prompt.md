---
schema: 1
id: set-up-sample-tracking
kind: prompt
title: Set up sample tracking for a lab
description: Sets up sample tracking for a lab with an ID scheme, labels, chain-of-custody fields, storage locations, freezer maps and audit checks, fitted to a spreadsheet, a LIMS or paper records.
category: research-methods
version: 1.0.0
status: incubating
stage: [design, operate]
role: [researcher, operations-manager]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [sample-management, chain-of-custody, freezer-inventory, lims, labelling, biobank]
pairs_with:
  prompts: [write-data-management-plan, write-lab-notebook-entry, write-lab-induction-checklist]
  personas: [lab-manager]
args:
  - name: sample_types
    description: The samples you handle - type, container, storage condition and whether they come from people, for example "plasma aliquots from study participants, 0.5 ml cryovials, -80 C; extracted DNA, 1.5 ml tubes, -20 C".
    type: text
    required: true
  - name: volume_per_month
    description: Roughly how many new samples (including aliquots) arrive per month.
    type: number
    required: true
  - name: tools
    description: Where the register lives. spreadsheet means a shared Excel or Google Sheets file; lims means a laboratory information management system you are configuring; paper means bound logbooks.
    type: enum
    enum: [spreadsheet, lims, paper]
    default: spreadsheet
output_contract:
  format: markdown
  sections: [ID scheme, Labels, Sample register fields, Storage locations and freezer map, Chain of custody and events, Audit checks, Set-up in your tool, Capacity]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lost and mislabelled samples usually trace back to the tracking system, not to carelessness: IDs that encode meaning and then run out or collide, handwritten labels that smudge in the freezer, a register where one row is sometimes a sample and sometimes a box, aliquots with no link to their parent, moves between freezers that nobody records, and a spreadsheet anyone can sort into chaos. Good tracking uses short opaque IDs, puts meaning in fields rather than in the ID, records every event (received, aliquoted, moved, thawed, shipped, used up), maps every storage position, and is audited on a schedule. Samples from people also need the link to personal identities kept separate from the lab register.
</context>

<task>
Set up sample tracking for about {{volume_per_month}} new samples a month, using {{tools}} records.

<sample_types>
{{sample_types}}
</sample_types>

1. ID scheme: an opaque, sequential ID with a short prefix per project or sample type, a fixed width that will not run out at this volume for at least five years, and a rule for aliquots or derivatives that links to the parent. Explain why meaning (date, participant, site) goes in fields and not the ID. If participant samples are involved, keep participant identifiers out of the ID and out of the lab register.
2. Labels: what is printed (ID, a machine-readable barcode or 2D code if available, the minimum human-readable fields), the label stock suited to each storage condition (freezer, cryogenic, solvent exposure), and where the label goes on the container.
3. Sample register fields: one row per physical container. List each field with type, allowed values and whether required: ID, parent ID, sample type, project, collection date and time, received date, received by, condition on receipt, volume or amount, storage location, status, consent or use restrictions, and notes.
4. Storage locations and freezer map: a location hierarchy (room, unit, shelf or rack, box, position), a box layout convention (for example A1 at top left, row then column), and a freezer map format. Include what happens when a box is full and how empty positions are found.
5. Chain of custody and events: an event log with who, what, when, from and to, and quantity, for receipt, aliquoting, moves, thaw cycles, shipping out, return, use and disposal. Say which events need a second person or a signature.
6. Audit checks: weekly, monthly and yearly checks (for example a random spot check of ten positions against the register, reconciliation of counts per box, a review of samples past their retention date) and what to do with a mismatch.
7. Set-up in your tool: concrete instructions for {{tools}}. For a spreadsheet: one sheet for the register, one for events and one for locations; data validation lists; IDs generated in sequence and never retyped; protected header and ID columns; no merged cells; version history or backups. For a LIMS: the configuration requirements to hand to the vendor or administrator. For paper: bound numbered logbooks, pre-printed label sheets, and a weekly transcription or scan.
8. Capacity: positions needed per year at this volume, when current storage fills, and when to plan the next unit.
9. Before you answer, check that the ID width covers five years at this volume and that every event in step 5 has a field in the register or the event log.
</task>

<constraints>
- Never put participant names, dates of birth or medical record numbers in sample IDs or labels.
- Do not recommend a specific commercial product; describe the features to look for.
- Keep it as simple as the volume allows: a lab with a few dozen samples a month does not need a LIMS, and you should say so.
- If you do not know the storage conditions or whether samples come from people, ask, and give a provisional design with the assumption marked.
</constraints>

<output_format>
Markdown with the sections in the output contract. Register fields as a table (Field | Type | Allowed values | Required). Give one example row, a sample freezer box map as a small grid, and audit checks as a table (Check | Frequency | Who | Action on mismatch).
</output_format>
