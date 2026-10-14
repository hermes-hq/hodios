---
schema: 1
id: write-composite-case-study
kind: prompt
title: Write an anonymised or composite case study
description: Writes a case study for a nonfiction book from real client, patient or student cases, anonymised or combined into a composite so no one is identifiable, with the disclosure note readers are owed.
category: nonfiction
version: 1.0.0
status: incubating
stage: [build]
role: [writer, consultant]
requires: [none]
inputs: [notes]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [case-study, anonymisation, composite-characters, confidentiality, disclosure]
pairs_with:
  prompts: [build-story-bank, draft-nonfiction-chapter, write-note-on-sources]
args:
  - name: case_notes
    description: The real case or cases, already stripped of names, with the point the case should illustrate. Do not paste confidential records.
    type: text
    required: true
  - name: approach
    description: anonymised (one real case, identifying details changed) or composite (several real cases combined into one).
    type: enum
    enum: [anonymised, composite]
    default: anonymised
  - name: profession
    description: Your profession and any confidentiality duty you work under, for example therapist, doctor, lawyer, teacher, consultant.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Case study, What was changed, Identifiability check, Disclosure note]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help professionals write case studies for books. Changing the name is not enough: people are recognised by combinations of details (job, town, age, a distinctive event, a turn of phrase), and the person most likely to recognise a case is the client themself or someone close to them. Professionals with confidentiality duties (clinicians, therapists, lawyers) often need written consent or must disguise thoroughly, according to their professional body's guidance, which differs between professions and countries. Composites must be disclosed as composites, and the details that carry the lesson must stay true to what happened in at least one real case, or the case becomes fiction presented as fact.

<case_notes>
{{case_notes}}
</case_notes>
Approach: {{approach}}. Profession: {{profession}}.
</context>

<task>
1. Name the lesson the case teaches and the details that carry it (these must stay true).
2. List identifying details in the notes (names, places, dates, ages, jobs, rare events, family structure, quotes) and change each to something equivalent that does not alter the lesson. For a composite, say which elements come from which source case, at the level of "case A" and "case B".
3. Write the case study: situation, what the person tried, the turning point, the outcome, and what it shows. Keep invented connective detail minimal and plausible.
4. Identifiability check: could the person, their family or colleagues recognise it? List remaining risks and further changes if any.
5. Write a disclosure note for the book (for example in the introduction or a note on sources) saying names and details are changed and which cases are composites.
6. Remind the author to check their professional body's rules on consent and publication.
</task>

<constraints>
- Do not invent outcomes, quotes or turning points that did not occur in any source case.
- Do not keep rare or striking details that make a person identifiable, even if they are vivid.
- Never present a composite as one real person.
- If the notes contain what look like confidential records (full names, record numbers, dates of birth), stop and ask the author to remove them.
</constraints>

<output_format>
## Case study

## What was changed
Table: Original detail type | Change made | Why it does not affect the lesson.

## Identifiability check
Remaining risks and fixes.

## Disclosure note
Draft text.
</output_format>
