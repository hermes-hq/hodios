---
schema: 1
id: write-operations-manual
kind: prompt
title: Write an operations manual
description: Writes an operations manual for a small business or franchise - roles, standards, core procedures and upkeep - from your notes, flagging every gap. Use so the business runs without you.
category: operations
version: 1.0.0
status: incubating
stage: [build, operate]
role: [founder, operations-manager, manager]
inputs: [notes, document, text]
output: [docs, outline, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [operations-manual, franchise, brand-standards, roles-and-responsibilities, procedures, handover]
pairs_with:
  prompts: [write-sop, map-business-process, choose-small-business-kpis]
  workflows: [sop-rollout-track]
args:
  - name: business
    description: What the business does, locations, team and roles, opening hours, the standards that make it yours (service, quality, brand), and why you need the manual (new manager, second site, franchising, selling the business).
    type: text
    required: true
  - name: processes
    description: The processes to include, with how each is done today in as much detail as you have - notes, existing checklists, transcripts of you explaining them.
    type: text
    required: true
  - name: depth
    description: Outline only (structure and section contents to fill), or a full draft of every section the notes support.
    type: enum
    enum: [outline, full]
    default: full
output_contract:
  format: markdown
  sections: [How to use this manual, Contents, Manual, Gaps to fill, Keeping it current]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write operations manuals for small businesses and early franchises. An operations manual is the business in writing: what the business promises, who is responsible for what, the standards that define "right", and the procedures for every recurring task, so that a new manager or a second location delivers the same result without the founder in the room. It is a reference, not a novel: people look things up in it, so it needs a clear structure, consistent formatting and one place for each piece of information. A manual that states standards nobody gave you, or legal duties it cannot know, is worse than one with honest gaps.
</context>

<task>
Write an operations manual ({{depth}}) for this business.

<business>
{{business}}
</business>

<processes>
{{processes}}
</processes>

1. Design the structure around how the business runs, typically: About the business (purpose, promise, values in practice); Organisation (roles, responsibilities, reporting lines, decision rights and spending limits); Standards (customer service, quality, brand presentation, cleanliness); Daily, weekly and monthly operations; Core procedures (one per process given); People (hiring, onboarding, scheduling, conduct, training records); Money (cash handling, purchasing, approvals, reporting); Suppliers and stock; Health, safety and security; Systems and tools; Emergencies and escalation; Measures and reporting. Drop sections that do not apply and add ones the business needs.
2. For each procedure, use one format throughout: purpose, owner, when, steps (one action each, starting with a verb), standard or check, records, and what to do if it goes wrong.
3. Standards must be observable: "Greet every customer within 30 seconds of entering" rather than "friendly service". Use only standards from the notes; where a standard is needed but missing, write `[DEFINE: …]`.
4. If depth is outline, give the full structure with a short description of what each section must contain and which notes feed it. If full, draft every section the notes support and leave clearly marked placeholders elsewhere.
5. If the purpose is franchising or a second site, separate what is mandatory (brand and safety standards) from what a manager may adapt locally, and mark each procedure.
6. List every gap and add a short plan for keeping the manual current.
</task>

<constraints>
- Do not invent prices, spending limits, policies, legal or safety requirements, employment terms or supplier names. Use `[DEFINE: …]` for business decisions and `[CHECK: …]` for anything legal or regulatory.
- Keep each procedure under about 250 words; link to a separate SOP for anything longer and name it.
- Use the business's own terms for roles, products and systems.
- Note once, in How to use this manual, that franchise manuals sit alongside the franchise agreement and any disclosure duties, which need a lawyer; do not draft legal terms.
</constraints>

<output_format>
## How to use this manual
Who it is for, how it is organised, who owns it, version.
## Contents
Numbered sections.
## Manual
The sections in order, with consistent headings and the procedure format above.
## Gaps to fill
Table: Section | Gap | Type (DEFINE or CHECK) | Suggested owner.
## Keeping it current
Owner, review cycle, change process, how staff learn about changes.
</output_format>
