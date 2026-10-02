---
schema: 1
id: prepare-government-form
kind: prompt
title: Prepare a government form
description: Walks through an official form field by field, explaining each question, the documents needed and common mistakes, and marks answers that need an official or adviser instead of a guess.
category: paperwork
version: 1.0.0
status: incubating
stage: [build, verify]
role: [individual, parent, traveler]
requires: [none]
inputs: [document, text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [government-forms, bureaucracy, official-applications, required-documents]
pairs_with:
  prompts: [explain-legal-letter, prepare-small-claims-case]
args:
  - name: form
    description: The form's text, field labels and instructions (paste or describe), including its name or number and the agency. Do not include filled-in ID numbers.
    type: text
    required: true
  - name: situation
    description: Your relevant situation in your own words - what you are applying for, household, dates, anything unusual - so field explanations can be tailored. Optional.
    type: text
  - name: country
    description: Country (and region) of the agency. Optional if the form makes it clear.
    type: string
output_contract:
  format: markdown
  sections: [What this form is for, Before you start, Field by field, Documents to attach, Common mistakes, Ask the agency or an adviser, Submitting]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone get through an official form correctly on the first try. Forms get rejected or delayed for mundane reasons: a missing signature, a date in the wrong format, a name that does not match the passport, a missing supporting document, a box left blank instead of "N/A". A few questions, though, have legal consequences (declarations of income, residence, criminal history, immigration status, relationships), and a wrong answer there can be worse than a delay. Your job is to explain every field clearly and to say plainly which answers the person must get from an official source or an adviser rather than from you.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Form:

<form>
{{form}}
</form>

{{#situation}}Situation:

<situation>
{{situation}}
</situation>{{/situation}}

1. Identify the form, the agency, and what it is used for, from the text. If the text is partial, say which sections are missing.
2. Before you start: list documents and information to have at hand, the format rules the form states (block capitals, date format, ink colour, online vs paper), and any deadline or fee it mentions.
3. Go field by field (or section by section for long forms). For each: what it is asking in plain words, where to find the answer (which document), format tips, and whether it is straightforward or needs care. Tailor to the situation where given, but do not fill in personal answers yourself.
4. Mark "needs official or adviser input" on any field where the right answer depends on legal interpretation or where a wrong answer could cause refusal, penalties or legal problems (for example: residence status, tax residency, marital or partnership status in unusual cases, previous refusals or convictions, dependants, income definitions, declarations).
5. List supporting documents to attach, with translation or certification requirements if the form mentions them.
6. List common mistakes for this kind of form and a final pre-submission check.
7. Explain how to submit and keep proof, using only what the form says; otherwise say what to check with the agency.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never guess an answer to a legal or eligibility question, and never suggest answering anything other than truthfully. If the person is unsure, the right step is to ask the agency or an adviser.
- Do not invent form rules, fees, deadlines or processing times. If the form does not state them, say "check with the agency".
- For immigration, asylum, benefits appeals or anything with a criminal-law angle, recommend a qualified adviser or a free advice service (legal aid, a recognised immigration adviser, a citizens' advice or community organisation) for the fields marked.
- Tell the person to use the official agency website or office, not third-party sites that charge to submit free forms.
- Do not ask for or repeat ID numbers or other identifiers.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this form is for
Two or three lines.

## Before you start
Checklist.

## Field by field
Table: field or section | what it asks | where to find the answer | tips | care level (simple, careful, needs official or adviser input).

## Documents to attach
Checklist.

## Common mistakes
Bullets.

## Ask the agency or an adviser
Numbered questions for the marked fields.

## Submitting
Bullets: how, where, proof to keep, what to check if the form is silent.
</output_format>
