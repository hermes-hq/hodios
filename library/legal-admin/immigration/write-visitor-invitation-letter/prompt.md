---
schema: 1
id: write-visitor-invitation-letter
kind: prompt
title: Write a visitor invitation letter
description: Writes a host's invitation letter for a relative or friend's visitor visa, stating the true purpose, dates, accommodation, who pays and the host's status, plus documents to attach.
category: immigration
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, traveler]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [invitation-letter, visitor-visa, family-visit, sponsor-letter, supporting-documents]
pairs_with:
  prompts: [prepare-visa-application, prepare-financial-evidence-for-visa, practise-visa-interview]
args:
  - name: visit
    description: Who is visiting and their relationship to you, the purpose (for example a graduation, a new baby, a holiday), arrival and departure dates, where they will stay, and who pays for what.
    type: text
    required: true
  - name: host
    description: Your status in the country (citizen, permanent resident, work visa), occupation, and what you can provide as evidence. Do not include ID numbers; add them on the printed copy.
    type: text
    required: true
  - name: country
    description: The country being visited, and any official form or invitation format it requires if you know (some countries use an official invitation form or a formal guarantee).
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Check first, Invitation letter, Documents to attach, Consistency checklist, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Visitor visa officers mostly want to know three things: that the visit is genuine, that the trip is funded, and that the visitor will leave on time. An invitation letter supports the visitor's own application, but it cannot fix a weak one, and in some countries a free-form letter is not enough: an official invitation or guarantee form, registered with an authority, is required instead or as well. The letter must match everything else in the file: dates, address, relationship and who pays. Inconsistencies, vague purposes, or promises the host cannot back with documents do more harm than no letter. Hosts sometimes take on a legal or financial obligation when they formally sponsor a visitor; they should know what they are signing.

<visit>
{{visit}}
</visit>

<host>
{{host}}
</host>
Destination: {{country}}
</context>

<task>
1. Check first: say whether this country commonly uses an official invitation or guarantee form for visitors (marked to confirm on the official source), and whether a formal sponsorship creates obligations for the host, so the user checks before relying on a free-form letter.
2. Invitation letter: addressed to the embassy or consulate, with the host's name and status, the visitor's name and relationship, the true purpose, exact dates, where they will stay, who pays for travel, accommodation and daily costs, and a sentence that the visitor intends to return, framed as the host's understanding of their plans, not a guarantee. Use [placeholders] for names, addresses and document numbers. One page.
3. Documents to attach: from the host's side (proof of status, address, income or funds if paying, accommodation evidence, proof of relationship), each marked as commonly requested and to confirm.
4. Consistency checklist: what must match the visitor's own application form and documents.
5. Questions to settle before sending.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Write only what is true. Do not inflate the host's income, invent a purpose such as a wedding that is not happening, or promise the visitor will leave if the host cannot know that; say why false statements risk refusal and bans for both.
- Do not include identity document numbers in the draft; use placeholders.
- Do not state current form requirements or fees as fact.
{{> output/uncertainty}}
</constraints>

<output_format>
## Check first
## Invitation letter
The letter, ready to fill in.
## Documents to attach
Table: Document | Shows | Commonly requested? | Confirm on official source.
## Consistency checklist
## Questions
</output_format>
