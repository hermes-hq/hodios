---
schema: 1
id: set-up-document-control
kind: prompt
title: Set up document control
description: Sets up document control for procedures, forms and work instructions - numbering, versions, approval, where the current copy lives, removing old copies, and record retention.
category: operations
version: 1.0.0
status: incubating
stage: [design, build]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [notes, text]
output: [plan, table, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [document-control, document-versioning, controlled-documents, records-management, quality-management]
pairs_with:
  prompts: [audit-sop-library, write-sop, write-operations-manual]
args:
  - name: documents
    description: What documents you have (procedures, forms, checklists, work instructions, policies, drawings, supplier specs), roughly how many, where they live today (shared drive, cloud folders, binders, printed on the wall), and what has gone wrong (old versions in use, nobody knows the latest).
    type: text
    required: true
  - name: setup
    description: Team size, sites and shifts, whether staff can access a screen at the point of work, tools available (cloud storage, intranet, quality software), and any standard or customer requirement you must meet.
    type: text
output_contract:
  format: markdown
  sections: [Principles, Document types and numbering, Version and approval, Storage and access, Printed copies and obsolete documents, Records retention, Master list, Rollout, Points to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Document control has one purpose: the person doing the work uses the current, approved version, and nobody can be misled by an old one. The essentials are a simple numbering scheme, a version and date on every document, a named approver, one master location that holds only current versions, a register (master list) of every controlled document with its owner and review date, and a rule for printed copies, because laminated sheets on the wall and personal downloads are where old versions survive. Changes should be easy to request and should say what changed. Documents (instructions that get revised) are different from records (evidence of what happened, which are never edited and are kept for a set period). Small businesses over-engineer this with complex codes and approval chains that stall updates, or under-engineer it with folders named "final v3 NEW".
</context>

<task>
Documents:
<documents>
{{documents}}
</documents>

{{#setup}}Setup:
<setup>
{{setup}}
</setup>{{/setup}}

1. State the principles in a few lines, including the difference between documents and records.
2. Define document types and a short numbering scheme (for example type prefix plus number), with examples using the document kinds described.
3. Set version and approval rules: version format, what counts as a minor or major change, who approves each type, a change note on each version, and a review interval by risk.
4. Choose storage and access suited to the tools and the point of work: one master location, read-only for most staff, editing by owners only, and how staff open the current version at the workstation (screen, QR code, controlled print).
5. Set rules for printed copies and obsolete documents: mark prints as controlled or uncontrolled, how old versions are withdrawn, and whether archived copies are kept and how they are marked.
6. Set records retention: list record types from the description, where kept, and retention periods as `[CONFIRM]` against legal, customer or standard requirements.
7. Give a master list layout with columns and two or three example rows.
8. Plan the rollout: inventory, cleanup of duplicates, numbering, moving to the master location, removing old prints, telling staff where to find documents.
9. List points to confirm.
</task>

<constraints>
- Keep it proportionate to the team size; avoid approval chains longer than needed.
- Do not state legal retention periods as fact unless supplied; mark them to confirm.
- Do not claim specific features of named software; describe what the setup needs and say to check the tool supports it (version history, permissions).
- If a standard or customer requirement is named, align the terms but do not quote the standard's text.
</constraints>

<output_format>
## Principles
## Document types and numbering
## Version and approval
## Storage and access
## Printed copies and obsolete documents
## Records retention
Table: Record | Where | Retention.
## Master list
Table: Number | Title | Type | Owner | Version | Approved | Next review | Location.
## Rollout
## Points to confirm
</output_format>
