---
schema: 1
id: write-prisma-flow-report
kind: prompt
title: Write a PRISMA flow report
description: Checks screening numbers add up, then writes the PRISMA 2020 flow diagram content, a drawable diagram and the results paragraph on study selection with exclusion reasons.
category: literature-review
version: 1.0.1
status: incubating
stage: [build, verify]
role: [researcher, student]
requires: [none]
inputs: [text, notes]
output: [diagram, docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [prisma, flow-diagram, systematic-review, study-selection, evidence-synthesis]
pairs_with:
  prompts: [screen-studies, write-systematic-review-protocol, chase-citations, write-results-section]
  personas: [research-librarian]
args:
  - name: screening_numbers
    description: Every count you have - records per database, register and other source, duplicates removed, title-abstract exclusions, reports sought and not retrieved, full-text exclusions with reasons, included studies and reports - and whether this is a new review or an update.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Arithmetic check, Flow diagram content, Diagram code, Study selection paragraph, Missing items]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.1, note: "Other-methods sources skip record screening in the arithmetic check, as in the PRISMA 2020 template, and Mermaid labels are quoted so the diagram renders."}
  - {version: 1.0.0, note: "First version."}
---
<context>
The PRISMA 2020 flow diagram is the first thing reviewers check in a systematic review, and its most common faults are numbers that do not add up, records and reports treated as the same thing, full-text exclusions without reasons, and other sources (citation searching, websites, contacting authors) folded into database counts. PRISMA 2020 has templates for new reviews and for updates, each with an optional second column for "identification of studies via other methods". It counts records at screening, reports at full text, and studies at inclusion, because one study can have several reports.
</context>

<task>
Build the PRISMA flow report from these numbers:
<screening_numbers>
{{screening_numbers}}
</screening_numbers>

1. Map every number to its PRISMA 2020 box: identification (records from each database and register; other methods by source), records removed before screening (duplicates, marked ineligible by automation tools, other reasons), records screened, records excluded, reports sought for retrieval, reports not retrieved, reports assessed for eligibility, reports excluded with reasons, new studies included and reports of included studies. For an update, add the previous review's studies and reports and the totals.
2. Check the arithmetic at each step, separately for each column. Databases and registers: identified minus removed before screening equals screened; screened minus excluded equals sought; sought minus not retrieved equals assessed; assessed minus excluded equals included reports. Other methods have no record-screening stage: reports identified by each source are sought for retrieval, then sought minus not retrieved equals assessed, and assessed minus excluded equals included reports. Check that exclusion reasons sum to each column's full-text exclusion total, and that included reports from both columns add up to the total reports of included studies. Show each sum.
3. If anything does not add up or a box is missing, do not adjust or invent numbers. Show the gap, give the likely causes (for example a study with several reports, records found in both columns, an unrecorded exclusion), and leave the box as [MISSING] or [CHECK: expected N, given M].
4. Write the diagram content box by box, and drawable code for it.
5. Write the study selection paragraph for the results section, in past tense, reporting the counts, the main full-text exclusion reasons in descending order, and the number of studies and reports included. Mention any studies that seemed to meet the criteria but were excluded, if the author named them.
</task>

<constraints>
- Never change, round or fill in a number. Every number in the output appears in the input or is a sum you showed.
- Keep records, reports and studies distinct; flag wording in the input that blurs them.
- Full-text exclusion reasons must be specific ("wrong comparator", "conference abstract only"), not "irrelevant"; flag vague ones for the author to recode.
- Use PRISMA 2020 terminology, not PRISMA 2009 box names.
</constraints>

<output_format>
## Arithmetic check
A table: step | calculation | result | OK or mismatch.
## Flow diagram content
The boxes in order, grouped into Identification, Screening and Included, with the database and other-methods columns side by side where both exist.
## Diagram code
A Mermaid flowchart (top-down) in a code block that renders the boxes and arrows, with exclusion boxes to the side. Put every node label in double quotes, for example `A["Records identified from databases (n = 812)"]`, because parentheses and commas in unquoted labels break rendering; use `<br>` for line breaks inside a box.
## Study selection paragraph
One paragraph ready to paste, with "(Figure 1)" where the diagram is cited.
## Missing items
Each [MISSING] or [CHECK] item and the question to answer.
</output_format>
