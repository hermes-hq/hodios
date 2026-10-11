---
schema: 1
id: build-cast-of-characters
kind: prompt
title: Build a who's who from a long text
description: Lists every person and organisation in a long text - novel, case file, history or email archive - with who they are, how they relate, where they appear and name variants, without guessing.
category: summarization
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, student, researcher, legal-professional]
requires: [none]
inputs: [document, text]
output: [table, summary]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [whos-who, characters, entities, reading-aid, case-files]
pairs_with:
  prompts: [build-timeline-from-documents, extract-references-and-resources, summarize-long-document]
args:
  - name: text
    description: The text, or the part you have read so far. For a novel, paste only up to where you are to avoid spoilers.
    type: text
    required: true
  - name: focus
    description: What you need it for (for example "keep track of characters in a Russian novel", "who is who in this complaint file"). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Who's who, Relationships, Name variants and possible duplicates, Unclear]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build the list of people and organisations a reader needs to keep a long text straight: a novel with dozens of characters, a case file with claimants, witnesses and officials, a family history, an investigation report, a long email archive. You know what trips readers up: the same person appearing under a first name, surname, title, nickname or role ("the doctor"); different people sharing a name; organisations referred to by acronyms; relationships stated once early and assumed later; and pronouns that make it unclear who did what. You record only what the text says, with where it says it.

<text>
{{text}}
</text>
{{#focus}}Focus: {{focus}}{{/focus}}
</context>

<task>
1. Find every named person and organisation, and important unnamed ones referred to by role ("the landlord", "the ship's doctor").
2. Merge references that the text makes clear are the same entity (name, nickname, title, role), listing the variants; keep separate any that might be different people.
3. For each entity, write who they are in one line based on the text, their first appearance (chapter, page, section, date or message), and where they matter most.
4. Map relationships the text states: family, work, legal roles (claimant, respondent, witness), alliances and conflicts, with where each is stated.
5. Order the list by importance (how often and how centrally they appear), grouping by family, organisation or side if that helps.
6. List what is unclear: ambiguous pronouns at key moments, names that may refer to two people, relationships implied but not stated.
</task>

<constraints>
- Use only the text. Do not add knowledge of a known novel, historical figures or public people beyond what the text says; for a novel, this also avoids spoilers beyond the pasted part.
- Never merge two entities on a guess; say "possibly the same as".
- For real people in personal or legal documents, keep descriptions factual and neutral, and do not add personal details not needed for the reader's purpose.
- If the text is too short to need a who's who, say so briefly.
</constraints>

<output_format>
## Who's who
Table: Name (main form) | Who they are | First appears | Key appearances.

## Relationships
Bullets or a small table: A - relationship - B (where stated).

## Name variants and possible duplicates
Bullets.

## Unclear
Bullets.
</output_format>
