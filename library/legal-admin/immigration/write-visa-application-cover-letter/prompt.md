---
schema: 1
id: write-visa-application-cover-letter
kind: prompt
title: Write a visa application cover letter
description: Writes the cover letter and indexed document list for a visa or permit application, mapping each requirement to the exhibits that meet it so an officer can check the file in minutes.
category: immigration
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, job-seeker, parent]
subject: [law]
requires: [none]
inputs: [text, document]
output: [docs, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [visa-cover-letter, document-index, application-bundle, exhibit-list, requirements-map]
pairs_with:
  prompts: [prepare-visa-application, write-letter-of-explanation-for-visa, prepare-financial-evidence-for-visa]
args:
  - name: application
    description: The country, visa or permit, and the list of requirements from the official guidance, pasted if you have it.
    type: text
    required: true
  - name: documents
    description: The documents you are including, with a short note on what each is.
    type: text
    required: true
  - name: facts
    description: The key facts in a few lines (who is applying, purpose, dates, sponsor), and anything unusual to explain briefly. No ID numbers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Requirements map, Cover letter, Document index, Gaps before submitting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Where an authority accepts a cover letter, its job is navigation: tell the officer what is being applied for, show where each requirement is evidenced, and point out anything unusual with its explanation. Officers handle many files a day, and a clean index with numbered exhibits makes it less likely that a document is overlooked or that a missing one goes unnoticed until refusal. Cover letters that hurt are long, repeat the forms, argue emotionally, or claim things the documents do not show. Some online systems do not accept cover letters or limit uploads, so the format must follow the authority's instructions.

<application>
{{application}}
</application>

<documents>
{{documents}}
</documents>

<facts>
{{facts}}
</facts>
</context>

<task>
1. Requirements map: each requirement from the guidance (or, if none given, the typical ones marked to confirm), the exhibit numbers that meet it, and whether it is fully met, partly met or missing on the documents listed.
2. Cover letter, one page or a little more: reference line placeholders, what is being applied for and by whom, a short statement of the key facts, a list of requirements with the exhibits that meet each, a brief note on anything unusual with a pointer to a separate explanation letter if needed, and a polite close with contact placeholders.
3. Document index: numbered exhibits in a logical order (identity, the main requirement, finances, accommodation, ties, other), with a description and page count placeholder.
4. Gaps before submitting: missing or weak evidence, documents that need translation or certification, and a reminder to check whether the authority accepts cover letters and in what format.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Claim only what the listed documents show; never say a requirement is met if the evidence is missing.
- Do not repeat the forms at length or argue emotionally.
- Mark requirements from general knowledge "typical, confirm on the official guidance".
- Placeholders for reference numbers, names and dates; keep ID numbers out.
{{> output/uncertainty}}
</constraints>

<output_format>
## Requirements map
Table: Requirement | Exhibits | Status.
## Cover letter
## Document index
Table: Exhibit | Document | Pages.
## Gaps before submitting
Checklist.
</output_format>
