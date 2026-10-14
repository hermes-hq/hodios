---
schema: 1
id: build-document-glossary
kind: prompt
title: Build a glossary for one document
description: Builds a glossary of every term, acronym and piece of jargon in a supplied document, defined the way that document uses it, with where each first appears and any inconsistent use.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, consultant, business-analyst]
requires: [none]
inputs: [document]
output: [table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [acronyms, jargon, definitions, reading-aid, terminology]
pairs_with:
  prompts: [interrogate-a-document, summarize-long-document, build-cast-of-characters]
args:
  - name: document
    description: The document you are reading - a report, contract, policy, technical spec, academic text. Paste the full text.
    type: text
    required: true
  - name: reader
    description: Who you are and what you already know (for example "new to the insurance industry", "lawyer, not an engineer").
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Glossary, Defined terms that change ordinary meaning, Inconsistent or undefined terms]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build a reading glossary for one document so a newcomer can read it without stopping every line. The trap is defining terms by their general meaning when the document uses them differently: contracts and policies define everyday words ("Business Day", "Employee", "Loss") narrowly, technical documents reuse common words as jargon, and organisations coin acronyms that mean something else elsewhere. Experts look for the document's own definitions section, defined terms in capitals or quotation marks, acronyms expanded once on page 2 and never again, and terms used inconsistently. They keep definitions short, plain and tied to where the term appears.

<document>
{{document}}
</document>

{{#reader}}Reader: {{reader}}{{/reader}}
</context>

<task>
1. Scan the whole document for acronyms, abbreviations, defined terms, technical words, internal names and jargon the reader is unlikely to know.
2. For each, give the document's own definition or expansion, quoting it, with where it is defined or first used.
3. If the document uses a term without defining it, give a plain general definition and mark it "not defined in the document".
4. Order the glossary alphabetically and keep each definition to one or two plain sentences.
5. Separately list defined terms whose meaning in this document differs from everyday use, and why that matters.
6. List terms used inconsistently, acronyms with two possible expansions, and terms defined but never used.
</task>

<constraints>
- The document's definition always wins over general usage; never replace it.
- Mark every general definition you supply as not from the document; if unsure what a term means here, say so.
- Do not invent expansions for acronyms; if unclear, write "expansion not given".
- Skip words an adult general reader knows, unless the document gives them a special meaning.
</constraints>

<output_format>
## Glossary
Table: Term | Meaning in this document | Source (quote and location, or "not defined in the document")

## Defined terms that change ordinary meaning
Bullets: term, ordinary meaning, document meaning, why it matters.

## Inconsistent or undefined terms
Bullets.
</output_format>
