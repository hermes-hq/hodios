---
schema: 1
id: resolve-name-mismatch-in-documents
kind: prompt
title: Resolve name mismatches across documents
description: Finds every difference in names, spellings, name order and dates of birth across the documents in an immigration file, and plans how to explain or correct each before an officer queries it.
category: immigration
version: 1.0.0
status: incubating
stage: [review, plan]
role: [individual, parent, student]
subject: [law]
requires: [none]
inputs: [text, document]
output: [table, plan, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [name-discrepancy, transliteration, one-and-the-same-person, document-consistency, date-of-birth-mismatch]
pairs_with:
  prompts: [prepare-visa-application, write-letter-of-explanation-for-visa, prepare-name-change, translate-personal-document]
args:
  - name: documents
    description: Each document in the file and exactly how the name and date of birth appear on it (for example passport "MOHAMMED ALI KHAN", degree "Mohd. A. Khan", birth certificate "Muhammad Ali"). Leave out ID numbers.
    type: text
    required: true
  - name: application
    description: The country and application, and what the authority says about name differences if you know. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Differences found, Why they arise, Fix or explain, Documents to obtain, What to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Officers match identity across every document in a file, and differences that are harmless to the applicant look like possible identity fraud to a stranger. The usual causes are innocent: transliteration from another script (Mohammed, Muhammad, Mohamed), abbreviations and initials, name order differing by culture (family name first or last), names changed on marriage or divorce, a missing middle name, a father's or village name included on some documents, and day and month swapped in dates. The answer depends on the cause: some differences need only a short explanation, many authorities accept a sworn statement that the names refer to the same person (sometimes called a one-and-the-same-person affidavit) with supporting evidence, and some require the document to be corrected at source. Correcting a passport or birth record can take months, so this needs to be checked early.

{{#application}}Application: {{application}}{{/application}}

<documents>
{{documents}}
</documents>
</context>

<task>
1. Differences found: compare every document with the passport (usually the reference document) and list each difference in name, order, spelling or date of birth.
2. Why they arise: the most likely innocent cause for each, as a hypothesis for the person to confirm, not a conclusion.
3. Fix or explain: for each difference, whether it is commonly fine with a note, better covered by a sworn statement with evidence, or should be corrected at source, with a short reason. Note that differences in date of birth are usually treated more seriously than spellings.
4. Documents to obtain: corrections, marriage or name-change certificates, a sworn statement, certified translations that use the passport spelling with a note of the original, or a letter from the issuing institution.
5. What to confirm: the authority's own rule on name differences and how long each correction takes.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the names as given. Never suggest changing a document to hide a real difference, or choosing a spelling to avoid a record.
- A difference in date of birth, or a completely different name, may need a regulated adviser; say so.
- Mark procedures and acceptability "commonly, confirm with the authority".
{{> output/uncertainty}}
</constraints>

<output_format>
## Differences found
Table: Document | As written | Difference from passport.
## Why they arise
## Fix or explain
Table: Difference | Likely cause | Fix or explain | Evidence.
## Documents to obtain
Checklist.
## What to confirm
</output_format>
