---
schema: 1
id: write-data-paper
kind: prompt
title: Write a data descriptor paper
description: Writes a data descriptor paper covering background, methods of collection, data records, technical validation and usage notes, so others can find, trust and reuse a dataset.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [researcher, data-scientist]
requires: [none]
inputs: [dataset, notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [data-descriptor, open-data, fair-data, research-data, journal-submission]
pairs_with:
  prompts: [write-data-availability-statement, write-software-paper, choose-target-journal]
args:
  - name: dataset
    description: What the dataset contains, how it was collected or generated, file formats and structure, variables, size, quality checks done, repository and identifier, licence, and access restrictions.
    type: text
    required: true
  - name: journal
    description: Optional. The target data journal and its required sections or limits.
    type: string
output_contract:
  format: markdown
  sections: [Data paper, FAIR checklist, Missing information]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A data descriptor (a "data paper") publishes a dataset as a citable research output, without hypothesis testing. Data journals and data article types in general journals share a common structure: background and summary (why the data exist and what they can be used for), methods (how the data were collected or generated in enough detail to reproduce or judge them), data records (where the data are deposited, the persistent identifier, the files and their structure), technical validation (evidence of quality: calibration, error rates, agreement with reference data, completeness and missingness), and usage notes (known limitations, how to load and combine the data). Reviewers check the deposited data themselves, so the paper must match the repository exactly. Common reasons for revision: no persistent identifier, unclear licence, missing variable definitions or units, validation that only says "data were checked", and conclusions drawn from the data as if it were a research article. For human data, consent for sharing and de-identification must be stated.
</context>

<task>
Write a data paper for:
<dataset>
{{dataset}}
</dataset>
{{#journal}}
Target: {{journal}}
{{/journal}}

1. Write a title that names the data, scope, place and period, and an abstract describing what the dataset is and its reuse value, without research findings.
2. Write Background and Summary: the gap the data fill, how they were produced, and example reuses.
3. Write Methods: sampling or generation, instruments and settings, processing steps from raw to released data, and software with versions as supplied.
4. Write Data Records: repository, identifier, licence, file list with formats and sizes, folder structure, and a variable table (name, description, unit, type, allowed values).
5. Write Technical Validation from the checks supplied, with numbers, and say what was not validated.
6. Write Usage Notes: limitations, known errors, how to load the files, and access conditions.
7. Add a code availability statement if code was used to process the data.
</task>

<constraints>
- Do not report research findings or test hypotheses; the paper describes data.
- Use only supplied facts; never invent identifiers, sizes, error rates or licences; use [MISSING: ...].
- Variable names and file names must match what the author supplied exactly.
- For data about people, state consent and de-identification as supplied, and flag if they are not described.
</constraints>

<output_format>
## Data paper
The paper with the section headings above, including the variable table.
## FAIR checklist
Findable, accessible, interoperable, reusable: each item marked met, partly met or missing.
## Missing information
Each [MISSING] item and why reviewers will ask.
</output_format>
