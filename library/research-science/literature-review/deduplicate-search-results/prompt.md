---
schema: 1
id: deduplicate-search-results
kind: prompt
title: Deduplicate review search results
description: Plans deduplication of records exported from several databases into a reference manager or screening tool, with matching rules, edge cases and a count log for the PRISMA flow diagram.
category: literature-review
version: 1.0.0
status: incubating
stage: [build]
role: [researcher, student]
requires: [none]
inputs: [notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [systematic-review, deduplication, reference-management, prisma]
pairs_with:
  prompts: [write-search-log, screen-studies, write-prisma-flow-report]
  personas: [research-librarian]
args:
  - name: exports
    description: The databases and sources searched with the number of records exported from each, for example "MEDLINE (Ovid) 1,240; Embase 2,015; CINAHL 610; trial registries 85".
    type: text
    required: true
  - name: tool
    description: The reference manager or screening tool you will use, for example EndNote, Zotero, Mendeley, Covidence or Rayyan.
    type: string
    required: true
  - name: review_type
    description: The kind of review, for example "systematic review of RCTs" or "scoping review".
    type: string
output_contract:
  format: markdown
  sections: [Before you start, Matching rules, Procedure, Edge cases, Count log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Searching several databases for a review produces heavy overlap, and deduplication is where many teams quietly lose relevant records or leave hundreds of duplicates for screeners. Automatic duplicate finders differ in their matching and none is perfect: strict rules miss duplicates whose titles differ by punctuation, page format or a missing DOI; loose rules merge different records, such as a conference abstract and the later full paper, two papers from one trial, or an erratum and its article. Good practice is to export with all fields in a standard format (usually RIS), keep the raw exports and per-database counts untouched, run a staged process (exact identifiers first, then fuzzy matching on title, authors, year and journal, then manual checking of near-matches), and log every count, because PRISMA 2020 reports records identified per source and duplicates removed. Removing duplicate records is different from linking multiple reports of the same study, which happens later, during screening or data extraction.
</context>

<task>
Plan deduplication for these exports into {{tool}}.
<exports>
{{exports}}
</exports>
{{#review_type}}Review type: {{review_type}}{{/review_type}}

1. Before you start: export format and fields to include, file naming, keeping untouched copies of every raw export, and recording the per-source counts now.
2. Matching rules: a staged plan, from exact DOI or database accession number matches, to title plus year plus first author, to fuzzy title matches; for each stage, which fields to compare and whether to merge automatically or review by hand.
3. Procedure in {{tool}}: the general steps for its duplicate detection and what its defaults are known to miss, without inventing menu paths or settings you are unsure of. If combining tools (for example a reference manager, then a screening tool that also deduplicates), say which runs first and how to avoid double counting.
4. Edge cases with a rule for each: conference abstract and full paper; preprint and published version; erratum, retraction notice or comment linked to an article; trial registry record and trial publication; translations and duplicate publication; records with missing DOIs or garbled titles; the same journal article indexed differently by MEDLINE and Embase.
5. Quality check: sample records flagged as unique to spot missed duplicates, and sample merged ones for false matches.
6. Count log: the table to fill for the PRISMA flow diagram.
</task>

<constraints>
- Never invent counts. Use the numbers given and leave the rest as blanks to fill.
- Be specific only where you are sure of a tool's behaviour; otherwise describe the step and tell the user to check the tool's current documentation.
- When in doubt whether two records are duplicates, keep both for screening; a missed duplicate costs a minute, a wrongly deleted record can cost a study.
- Different reports of the same study are not duplicate records; say they are linked later, not deleted now.
- Recommend recording the method used so it can be reported in the review's methods section.
</constraints>

<output_format>
## Before you start
Checklist.
## Matching rules
Table: stage | fields compared | automatic or manual.
## Procedure
Numbered steps for the tool.
## Edge cases
Table: case | rule.
## Count log
Table: source | records exported | after automatic removal | after manual check, with totals row and "duplicates removed" line; numbers given filled in, the rest blank.
</output_format>
