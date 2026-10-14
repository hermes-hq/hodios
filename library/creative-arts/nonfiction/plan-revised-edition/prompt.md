---
schema: 1
id: plan-revised-edition
kind: prompt
title: Plan a revised edition of a nonfiction book
description: Plans a revised or updated edition of a published nonfiction book, auditing what has dated, deciding what to update, add and cut, and drafting the note that tells readers what changed.
category: nonfiction
version: 1.0.0
status: incubating
stage: [maintain]
role: [writer]
requires: [none]
inputs: [document, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [new-edition, book-update, revision-plan, preface, backlist]
pairs_with:
  prompts: [plan-book-research, outline-nonfiction-book]
args:
  - name: book
    description: Title, year of first publication, the table of contents with a line per chapter, and what readers or reviewers have said since.
    type: text
    required: true
  - name: changes_known
    description: What you know has changed in the field, in your own thinking, or in the world since publication, and any request from the publisher.
    type: text
    required: true
  - name: scope
    description: light (corrections and updated facts), substantial (new chapters, revised argument), or rewrite.
    type: enum
    enum: [light, substantial, rewrite]
    default: substantial
output_contract:
  format: markdown
  sections: [Dating audit, Edition plan, Schedule and costs to check, Note to readers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help authors plan new editions. A revised edition must be different enough to justify itself to readers who own the first (and to retailers and reviewers), but every change has a cost: repagination breaks the index, new material needs research and sometimes new permissions, and contracts may define what counts as a new edition. Things that date fastest in nonfiction: statistics, examples tied to companies, technology and people's job titles, laws and regulations, "recent" research that has since failed to replicate, and the author's own past predictions. Honest new editions say what the author got wrong.

<book>
{{book}}
</book>
<changes_known>
{{changes_known}}
</changes_known>
Scope: {{scope}}
</context>

<task>
1. Dating audit: for each chapter, list what is likely to have dated (by type, from the list above and the notes) and how urgent it is, and mark claims the author should re-check against current sources.
2. Edition plan: what to update, what to add (new chapters or sections, with why), what to cut, and any predictions or claims to revisit openly. Fit it to the {{scope}} scope, and say if the changes known suggest a different scope.
3. Production knock-ons: index to rebuild, permissions to renew or seek, notes and references to update, cover and metadata changes, and the contract terms on revised editions to check with the publisher or agent.
4. Schedule and costs to check, without inventing figures.
5. Draft a short "note to the revised edition" for the front of the book: what changed and why, including anything the author now sees differently.
</task>

<constraints>
- Do not state current facts, statistics or research findings; mark what to re-check.
- Do not guess contract terms; list them as questions.
- Keep the note to readers honest and specific; no marketing language.
</constraints>

<output_format>
## Dating audit
Table: Chapter | What may have dated | Type | Urgency | Re-check.

## Edition plan
Update / Add / Cut / Revisit lists, plus production knock-ons.

## Schedule and costs to check

## Note to readers
Draft text, 200 to 400 words.
</output_format>
