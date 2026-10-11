---
schema: 1
id: build-company-glossary
kind: prompt
title: Build a company glossary for new joiners
description: Builds a glossary of a company's acronyms, jargon, team and system names from pasted documents for new joiners, flagging guessed meanings, clashes and terms that need an owner.
category: business-writing
version: 1.0.0
status: incubating
stage: [build]
role: [manager, operations-manager, technical-writer]
requires: [none]
inputs: [document, text]
output: [table, docs, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [glossary, acronyms, new-joiners, internal-jargon, knowledge-base]
pairs_with:
  prompts: [plan-new-hire-onboarding, write-project-glossary, write-faq-from-documents]
args:
  - name: source_text
    description: Documents, emails, meeting notes, org charts or chat threads full of the company's jargon. The more varied, the better.
    type: text
    required: true
  - name: audience
    description: Who the glossary is for, for example "new sales hires", "all new joiners" or "agency staff working with us".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Glossary, Terms needing an owner, Clashes and inconsistencies]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build internal glossaries that new joiners actually use. Every organisation accumulates acronyms (QBR, OKR, P&L owner), product and project code names, team nicknames, system names and words used with a local meaning ("a run", "a drop", "the board"). New people waste weeks decoding them and are often afraid to ask. A useful glossary gives the expansion, a plain one-line meaning in this company, where you will meet the term, and a related term or owner. The trap is confident guessing: an acronym can mean different things in different teams, and a glossary that states a wrong meaning spreads it. Mark what the documents prove and what is inferred.

Audience: {{audience}}

<source_text>
{{source_text}}
</source_text>
</context>

<task>
1. Extract every acronym, initialism, code name, team or system name and term used with a company-specific meaning. Skip ordinary business words used normally.
2. For each term, work out the meaning from context in the source. Mark confidence: "stated" (defined or clearly explained in the text), "inferred" (strong context), or "unclear".
3. Group terms by type: teams and roles, products and projects, systems and tools, processes and meetings, metrics, customer and market terms, other.
4. Write the glossary as a table per group: Term | Stands for | What it means here | Where you will see it | Confidence. Sort alphabetically within each group.
5. Terms needing an owner: every "unclear" or "inferred" term, with the question to ask and the team most likely to know.
6. Clashes and inconsistencies: the same acronym with two meanings, two names for the same thing, old names still in use, or general-world meanings that differ from the internal one.
</task>

<constraints>
- Do not state an expansion as fact unless the source supports it; general-world meanings of an acronym may be offered as "commonly means … - check".
- Keep each definition to one plain sentence suitable for the audience.
- Do not include personal data such as phone numbers or home details if they appear in the source; people's names only where they own a term.
- Do not include passwords, credentials or confidential figures that appear in the source; note that they were omitted.
</constraints>

<output_format>
## Glossary
Tables by group.
## Terms needing an owner
Table: Term | Question | Ask.
## Clashes and inconsistencies
Bullets.
</output_format>
