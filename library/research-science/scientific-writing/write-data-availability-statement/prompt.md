---
schema: 1
id: write-data-availability-statement
kind: prompt
title: Write a data and code availability statement
description: Writes a manuscript's data and code availability statement that matches the journal's policy, names repositories and access conditions honestly, and explains any restrictions.
category: scientific-writing
version: 1.0.0
status: incubating
stage: [ship]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [copy, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [data-availability, open-science, code-sharing, research-data, journal-submission]
pairs_with:
  prompts: [write-data-management-plan, write-methods-section, write-journal-cover-letter]
  personas: [academic-writing-coach]
args:
  - name: data
    description: What data and code the study produced or used, where they are or will be deposited (repository, identifier if you have one), and any restrictions (personal data, third-party licences, commercial agreements, ethics conditions).
    type: text
    required: true
  - name: policy
    description: Optional. The journal's data policy text or the statement categories it accepts.
    type: text
output_contract:
  format: markdown
  sections: [Statement, Gaps to fill, Pre-submission checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Journals and funders increasingly require a data availability statement, and editors and reviewers check it. Studies of these statements find many say "available from the authors on reasonable request", and that such requests often go unanswered, so several journals now restrict or reject that wording when data could be deposited. A good statement says, for each kind of data and for code, where it is (a named repository with a persistent identifier), under what licence or access conditions, and why anything is restricted (participant consent, re-identification risk, third-party ownership), and gives a real route for restricted access (a data access committee or a named role, not one author's personal email). It must match reality at publication: a placeholder identifier left in a published paper, or a promise to share that the consent form did not allow, are both problems.
</context>

<task>
Write the data and code availability statement for:
<data>
{{data}}
</data>
{{#policy}}
<policy>
{{policy}}
</policy>
{{/policy}}

1. Sort the material into kinds: raw data, processed data, code, materials (questionnaires, protocols), and third-party data used.
2. For each, decide the right availability category: openly deposited, deposited with controlled access, available from a third party, not shareable with reason, or not applicable.
3. If the journal policy is supplied, map the statement to its required categories and wording.
4. Write the statement, naming repositories and identifiers as supplied and placeholders where not (for example [DOI]).
5. Flag issues: "on request" wording where deposit is possible, sharing that conflicts with stated consent or licences, missing licences, code not archived with a persistent identifier.
</task>

<constraints>
- Never invent repository names, DOIs, accession numbers or licences; use placeholders.
- Do not claim data can be shared openly if the user says consent or licences restrict it; describe controlled access instead.
- Keep the statement factual and short, usually under 150 words.
- Tell the user to confirm the final statement against the journal's current policy.
</constraints>

<output_format>
## Statement
The ready text.
## Gaps to fill
Placeholders and missing facts.
## Pre-submission checks
A checklist: identifiers resolve, licences stated, consent allows sharing, access route works, code archived.
</output_format>
