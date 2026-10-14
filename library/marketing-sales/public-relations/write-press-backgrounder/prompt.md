---
schema: 1
id: write-press-backgrounder
kind: prompt
title: Write a press backgrounder and fact sheet
description: Writes a press backgrounder and a one-page fact sheet about an organisation or programme, with dated, sourced figures, spokesperson bios and a list of claims to verify.
category: public-relations
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, founder, executive]
requires: [none]
inputs: [document, notes, text]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [backgrounder, fact-sheet, press-kit, spokesperson-bio, newsroom]
pairs_with:
  prompts: [write-press-release, pitch-journalist]
args:
  - name: subject
    description: The organisation, product, programme or project the backgrounder is about.
    type: string
    required: true
  - name: source_material
    description: Everything you have, for example the website about page, annual report extracts, key figures with their dates and sources, milestones, leadership names and roles, and past press releases.
    type: text
    required: true
  - name: spokespeople
    description: Names, roles and a few facts about each person who speaks to media. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fact sheet, Backgrounder, Spokesperson bios, Fact register, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a press officer preparing the reference documents a journalist opens when writing about {{subject}} on deadline. Reporters use a fact sheet to check a number or a spelling in thirty seconds and a backgrounder to understand context, history and how the subject fits its field. Both are reference, not persuasion: superlatives ("leading", "innovative", "world-class") are ignored or mocked, while precise, dated, sourced figures get quoted. The most common failure is stale numbers with no date, which reporters then print and which come back as corrections.

<source_material>
{{source_material}}
</source_material>
{{#spokespeople}}
<spokespeople>
{{spokespeople}}
</spokespeople>
{{/spokespeople}}
</context>

<task>
1. Extract every fact from the source material into a fact register: the fact, its figure, the date it refers to, and its source. Mark facts with no date or source, and facts that contradict each other.
2. Fact sheet, one page: name and one-line description in plain words; founded or started (year, place); headquarters or base; leadership; size (people, users, locations, budget or revenue only if public and given), each figure with an "as of" date; what it does in three to five bullets; key milestones with years; recognition only if verifiable; media contact placeholder.
3. Backgrounder, about 400 to 700 words: what it is and the problem it addresses; short history with turning points; how it works; who it serves and with what results (only sourced figures); the wider context or sector it sits in, stated neutrally; what is next, limited to plans that are public. Write in the third person, past and present tense, with no quotes from executives.
4. Spokesperson bios: for each person, a 60 to 100 word bio (role, relevant expertise, the topics they can speak on) and a one-line version for captions. Do not add degrees, awards or past employers that were not given.
5. Gaps: the facts a journalist will expect that are missing (for example founding year, headcount date, how a figure was measured) and any figures to re-check because they are old.
</task>

<constraints>
- Use only facts from the input. Do not invent figures, dates, awards, clients or biography details; use placeholders like [YEAR FOUNDED].
- Every number carries the date it refers to. Flag any figure older than about a year as needing a refresh.
- No superlatives or claims of being first, biggest or leading unless the source gives verifiable evidence; otherwise rewrite them as a plain fact or drop them and list them in Gaps.
- If financial figures of a listed company or a regulated organisation appear, say that they must match the latest published filings.
- Plain, neutral language a reporter could lift without editing.
</constraints>

<output_format>
## Fact sheet
Short labelled lines and bullets.
## Backgrounder
## Spokesperson bios
Each bio in full and in one line.
## Fact register
A table: Fact | Figure | As of | Source | Status (ok, undated, unsourced, conflicting, stale).
## Gaps
</output_format>
