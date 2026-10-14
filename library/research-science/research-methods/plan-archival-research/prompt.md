---
schema: 1
id: plan-archival-research
kind: prompt
title: Plan archival research
description: Plans archival research from question to visit, covering which archives to search, finding aids, access and permissions, visit logistics, recording sources, citation and handling gaps in the record.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [history]
tags: [archives, primary-sources, historical-research, finding-aids, source-criticism]
pairs_with:
  prompts: [refine-research-question, write-data-management-plan, plan-phd-timeline]
  personas: [research-methodologist]
args:
  - name: project
    description: Your research question, period and places, the kinds of records you hope to find, languages, travel budget and time available.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What records would answer it, Where to look, Before the visit, During the visit, Recording and citation, Gaps and silences]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Archival research rewards preparation. Experienced researchers first ask who would have created a record of the thing they study, why, and where that body's records ended up: government departments, courts, companies, churches, charities, families and newspapers deposit in different places, and records are arranged by the creator (provenance), not by topic. Finding aids, catalogues and union catalogues are searched before travel; many archives require registration, advance ordering of items, and have closure periods for personal data or rules on photography and reuse. Time in the reading room is expensive, so researchers prioritise, photograph systematically with a capture log, and record full references at the moment of capture, because reconstructing a citation later is often impossible. Source criticism (who wrote this, for whom, what is missing) and attention to whose voices the archive omits are part of the method.
</context>

<task>
Plan archival research for:
<project>
{{project}}
</project>

1. Work out what records would answer the question: which people or institutions would have created them, for what purpose, and what types of record (correspondence, minutes, registers, case files, maps, photographs, press).
2. Suggest the kinds of repositories where such records usually end up (national, regional, municipal, university, company, religious, private collections, digitised collections) and how to find specific ones through catalogues and finding aids. Name specific archives only when confident they hold relevant material; otherwise describe how to identify them.
3. Plan before the visit: catalogue searching and search terms (including period terminology and spelling variants), contacting archivists with a precise enquiry, registration, ordering in advance, access restrictions and closure periods, permissions for photography and reuse, and a prioritised list of items.
4. Plan the visit: a daily schedule, handling rules, photography workflow and capture log, note-taking template, and a quick-triage method for large boxes.
5. Set up recording and citation: file naming linked to full archival references, backup, and the citation style required.
6. Plan for gaps: missing or destroyed records, silenced voices, alternative sources (oral history, newspapers, other creators' copies), and how to write about absence.
7. Fit to the budget and timeline, with a fallback if access is refused.
</task>

<constraints>
- Do not invent archive names, collection titles, reference numbers or holdings. Mark any named repository as one to verify.
- Do not state access rules or closure periods as fact; tell the user to check each archive's current rules.
- Respect copyright, data protection and archive terms on reproductions.
- Keep the plan realistic for the stated time and money.
</constraints>

<output_format>
## What records would answer it
A table: creator | record type | why it was created | what it could show.
## Where to look
Repository types, how to identify specific ones, and search terms.
## Before the visit
A checklist.
## During the visit
Schedule, workflow and a capture log template in a code block.
## Recording and citation
File naming, backup and citation rules.
## Gaps and silences
Bullets with alternative sources and how to report absence.
</output_format>
