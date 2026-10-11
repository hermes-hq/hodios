---
schema: 1
id: build-grant-boilerplate-library
kind: prompt
title: Build a grant boilerplate library
description: Turns scattered past applications and documents into a reusable grant content library - organisation, programme, outcome and staff blocks in three lengths, dated and sourced, with an upkeep routine.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [writer, manager, executive]
requires: [none]
inputs: [document, text, notes]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [boilerplate, content-library, reusable-text, attachments-checklist, approved-text]
pairs_with:
  prompts: [write-grant-application, adapt-proposal-for-new-funder]
  personas: [grant-writer]
args:
  - name: source_documents
    description: Past applications, reports, the annual report, website text, staff bios and policies, pasted in. Note the date of each.
    type: text
    required: true
  - name: organisation_type
    description: For example a community nonprofit, a university research group, a social enterprise or a public body, and the main funder types you apply to.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Library index, Content blocks, Conflicts and stale facts, Attachments checklist, Upkeep routine]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grants manager setting up the content library that saves a team days on every application. Most organisations rewrite the same sections each time, or copy last year's text with old numbers, a former director's name, or another funder's name still in it. A good library holds approved, dated blocks in standard lengths (often around 50, 150 and 300 words, because forms ask for all three), each with its source and an owner, plus the attachments funders ask for again and again. Blocks are a starting point to tailor, never text to paste unchanged into every application.

Organisation type: {{organisation_type}}

<source_documents>
{{source_documents}}
</source_documents>
</context>

<task>
1. Extract and reconcile: pull every reusable fact and passage from the sources. Where sources disagree (a figure, a date, a name, a description of a programme), list the conflict and use the most recent source provisionally, marked to confirm.
2. Library index: the blocks to hold, typically: mission and vision; organisation history and legal status; programmes or research areas (one block each); people served or research reach with figures; outcomes and impact with figures; approach and what is distinctive; partnerships; governance and leadership; staff and key personnel bios; financial overview; policies (safeguarding, equality, data protection, environment) as short statements; and evaluation approach. Add or drop blocks to fit the organisation type.
3. Content blocks: for each block, write a short (about 50 words), medium (about 150) and long (about 300) version from the sources, each with an "as of" date for any figure, the source, and an owner role. Write in a neutral voice that adapts to any funder: no funder names, no deadline-specific language.
4. Conflicts and stale facts: the reconciled conflicts, figures older than about a year, names or roles that may have changed, and leftover funder-specific wording found in the sources.
5. Attachments checklist: documents funders commonly request (registration or incorporation papers, latest accounts, budget, governing document, board list, key policies, audit or financial statements, letters of support, CVs), with status, date and where it is kept.
6. Upkeep routine: when blocks are reviewed (for example after annual accounts are approved and after each grant report), who approves changes, how versions are named, and a pre-use checklist (update figures, tailor to the funder's language, remove other funders' names).
</task>

<constraints>
- Use only facts from the sources; never invent figures, names, policies or achievements. Missing blocks are listed with [NEEDED] rather than drafted from nothing.
- Every figure carries its date and source.
- Remove any personal data beyond names and professional roles of staff who appear in public materials.
- Do not reproduce text that the sources show belongs to a partner or a funder without marking it.
</constraints>

<output_format>
## Library index
A table: Block | Owner | Last updated | Status.
## Content blocks
One subsection per block with Short, Medium and Long versions and source notes.
## Conflicts and stale facts
## Attachments checklist
A table: Document | Status | Date | Location.
## Upkeep routine
</output_format>
