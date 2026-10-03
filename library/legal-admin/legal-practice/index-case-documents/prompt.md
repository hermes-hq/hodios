---
schema: 1
id: index-case-documents
kind: prompt
title: Index case documents and build a chronology
description: Builds a document index and a sourced chronology from a set of case documents, with dates, parties, document type, relevance to the issues, duplicates and gaps in the record.
category: legal-practice
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [document]
output: [table, summary, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [document-review, case-chronology, litigation-support, privilege]
pairs_with:
  prompts: [summarize-deposition-transcript, draft-legal-research-memo, build-contract-obligations-register]
  personas: [paralegal]
args:
  - name: documents
    description: The documents or extracts, each starting with an identifier line such as "=== DOC 001 ===" or a Bates number, with the text or a description of each (emails, letters, contracts, invoices, notes, photos).
    type: text
    required: true
  - name: issues
    description: The claims, defences or questions the matter turns on, and the parties, so documents can be tagged for relevance. Optional; without it the index tags by subject only.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Cast of characters, Document index, Chronology, Possible privilege and confidentiality, Gaps and follow-up]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You index case documents and build chronologies the way an experienced litigation paralegal does at the start of a matter. The index tells the team what they have; the chronology tells them what happened according to the documents. Both are only useful if every entry points to its source document, dates are normalised, people and entities are named consistently, and anything uncertain is marked rather than smoothed over. Gaps (a reply that should exist but does not, an attachment that is missing) are often as important as what is there.
</context>

<task>
Documents:

<documents>
{{documents}}
</documents>
{{#issues}}

Issues and parties:
<issues>
{{issues}}
</issues>
{{/issues}}

1. Scope: count the documents, their date range, and any that could not be read or are incomplete.
2. Cast of characters: every person and entity, with role, affiliation, the variant names or email addresses used, and the first document they appear in. Use one consistent name per person thereafter.
3. Document index: one row per document, with ID, date (YYYY-MM-DD; "undated" or an inferred date marked "inferred from ..." when needed), type, author, recipients, a one-line neutral description, issue tags (from the issues input, or subjects), and notes (attachments referenced, duplicates or near-duplicates, versions).
4. Chronology: one row per event (not per document), in date order, with the event stated neutrally, the source documents and pinpoints (page, paragraph or quoted phrase), and a flag where documents disagree about the date or what happened.
5. Possible privilege and confidentiality: documents that may involve lawyers, legal advice, litigation preparation, or confidential or personal data, flagged for attorney review, with the reason. Do not decide privilege.
6. Gaps and follow-up: missing attachments, replies, earlier drafts, meeting notes referenced but not produced, date gaps in key periods, and documents worth requesting or locating, plus open questions for the attorney.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Every index row and chronology event cites its document ID. Never invent dates, authors, recipients or events. Mark inferred items clearly.
- Describe documents neutrally. No conclusions about liability, intent or credibility.
- Treat duplicates carefully: link them, do not drop them, and note differences between versions.
- Flag, do not resolve, privilege questions and inconsistencies; they are for the attorney.
- Keep personal data to what the index needs; note sensitive categories (health, financial, children) for handling.
- Tables must paste cleanly into a spreadsheet: one item per row, ISO dates.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope
Three bullets.

## Cast of characters
Table: name used | role | affiliation | variants and addresses | first seen.

## Document index
Table: ID | date | type | author | recipients | description | issue tags | notes.

## Chronology
Table: date | event | sources and pinpoints | flag.

## Possible privilege and confidentiality
Table: ID | reason | for attorney review.

## Gaps and follow-up
Checklist, then numbered questions for the attorney.
</output_format>
