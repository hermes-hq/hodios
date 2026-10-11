---
schema: 1
id: write-letter-of-explanation-for-visa
kind: prompt
title: Write a letter of explanation for a visa file
description: Writes a short, factual letter of explanation for an immigration officer about one weak point in a file such as a large deposit, a gap, a past refusal or travel history, tied to the evidence attached.
category: immigration
version: 1.0.0
status: incubating
stage: [build]
role: [individual, student, job-seeker]
subject: [law]
requires: [none]
inputs: [text, document]
output: [docs, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [letter-of-explanation, visa-cover-note, unexplained-deposit, employment-gap, previous-refusal]
pairs_with:
  prompts: [prepare-financial-evidence-for-visa, write-visa-application-cover-letter, respond-to-visa-refusal]
args:
  - name: issue
    description: The point an officer might question (for example a 6,000 deposit last month, a 2-year gap in study, a previous refusal, a change of sponsor), with the true explanation in your words.
    type: text
    required: true
  - name: application
    description: The country and visa or permit, and the requirement this issue relates to.
    type: string
    required: true
  - name: evidence
    description: The documents you have that support the explanation. Optional but important.
    type: text
output_contract:
  format: markdown
  sections: [What the officer is likely to ask, Letter of explanation, Evidence index, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Officers decide on the papers, often in minutes, and they refuse when something looks unexplained rather than wrong. A letter of explanation pre-empts the question an officer will ask on reading the file: where did this money come from, what happened in this gap, why was the last application refused and what has changed. It works when it is short, specific, consistent with every other document, and backed by evidence that is attached and indexed. It fails when it is long and emotional, introduces facts not in the forms, contradicts an earlier application, or makes claims without proof. A letter cannot change a requirement; it only explains facts.

Application: {{application}}

<issue>
{{issue}}
</issue>
{{#evidence}}
<evidence>
{{evidence}}
</evidence>
{{/evidence}}
</context>

<task>
1. What the officer is likely to ask about this issue, and which requirement it touches.
2. Draft the letter, under one page: a reference line with placeholders, one sentence on what the letter explains, the facts in date order, the explanation, each statement tied to an attached document by exhibit number, and a closing that offers more information. Plain, polite, first person.
3. Evidence index: each document, what it proves, and its exhibit number.
4. Gaps: any statement in the letter that is not yet backed by a document, and what would prove it; and any point where the explanation may not fully answer the requirement, to raise with a regulated adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the facts given and say only what is true. Never add facts, soften a refusal history or contradict an earlier application.
- Keep it short and unemotional; no pleading, flattery or pressure.
- Do not promise that the letter will resolve the issue.
- Mark placeholders [LIKE THIS] for reference numbers and dates not given; keep ID numbers out.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the officer is likely to ask
## Letter of explanation
## Evidence index
Table: Exhibit | Document | What it proves.
## Gaps
Bullets.
</output_format>
