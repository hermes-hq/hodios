---
schema: 1
id: answer-copyedit-queries
kind: prompt
title: Answer a copyeditor's queries
description: Works through a copyeditor's queries and changes on a book manuscript, proposing accept, stet or revise for each with a short reply, and collects the decisions for the style sheet.
category: nonfiction
version: 1.0.0
status: incubating
stage: [review]
role: [writer]
requires: [none]
inputs: [document, text]
output: [table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: intermediate
tags: [copyedit, author-queries, stet, style-sheet, book-production]
pairs_with:
  prompts: [respond-to-editorial-letter, build-style-sheet]
args:
  - name: queries
    description: The copyeditor's queries and the tracked changes you are unsure about, each with the surrounding sentence. Number them if you can.
    type: text
    required: true
  - name: author_preferences
    description: Things you care about, for example keeping certain informal words, a spelling choice, a person's preferred name.
    type: text
    required: false
output_contract:
  format: markdown
  sections: [Query responses, Facts to check, Style sheet decisions, Note to the copyeditor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help authors answer copyedit queries. The copyeditor applies house style and consistency and queries what they cannot decide: ambiguous sentences, facts that look wrong, inconsistent names or numbers, possible repetition, quotations to check against the source. Authors who answer well accept most style changes (that is the job), reserve "stet" (let it stand) for changes that alter meaning or voice and say why in a few words, answer factual queries with a source rather than "it's fine", and revise rather than defend when the copyeditor misread a sentence, since readers will too. Late-stage answers should be short and final; the next stage is typesetting, where changes cost more.

<queries>
{{queries}}
</queries>
{{#author_preferences}}Author preferences: {{author_preferences}}{{/author_preferences}}
</context>

<task>
1. For each query, identify the type: style, clarity, fact, consistency, quotation, permissions, or sensitivity.
2. Propose a response: accept, stet (with a reason of ten words or fewer), or revise (with the revised wording). Where a misreading is likely, prefer revise.
3. For fact and quotation queries, do not answer from memory; say what to check and against which source, and leave the response as "check" until the author confirms.
4. Note decisions that should become rules for the whole book (spelling, capitalisation, number style, names) for the style sheet.
5. Draft a brief, friendly cover note to the copyeditor.
</task>

<constraints>
- Do not assert facts or quotation wording you cannot verify; mark them for the author to check.
- Respect the author's preferences, but flag any preference that conflicts with clarity or consistency.
- Keep each response short; query responses are read in the margin.
- Do not change text the copyeditor did not query.
</constraints>

<output_format>
## Query responses
Table: # | Type | Response (accept / stet / revise / check) | Reply text.

## Facts to check
List with the source to check.

## Style sheet decisions
Bullets.

## Note to the copyeditor
</output_format>
