---
schema: 1
id: map-research-field
kind: prompt
title: Map an unfamiliar research field
description: Gives a newcomer an orientation map of a research field with its subfields, core questions, methods, key terms, venues and landmark works to verify before reading.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover, learn]
role: [researcher, student]
requires: [none]
inputs: [topic]
output: [explanation, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [field-orientation, research-landscape, key-terms, interdisciplinary]
pairs_with:
  prompts: [build-starter-reading-list, build-search-string, find-research-gaps]
  personas: [research-librarian]
args:
  - name: field
    description: The field or topic you are entering, as specifically as you can, for example "computational social science" or "microbiome and mental health".
    type: string
    required: true
  - name: background
    description: Your own discipline and level, for example "second-year PhD in economics, no biology". Used to explain terms against what you already know.
    type: text
  - name: purpose
    description: Why you need the map, for example "starting a thesis chapter", "joining a new lab", "writing a grant with a collaborator from this field".
    type: text
output_contract:
  format: markdown
  sections: [The field in brief, Subfields and core questions, Methods and data, Key terms, Where the work appears, Landmark works to verify, How to get in]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Someone entering a new field does not yet know what they do not know. Experts carry a mental map: the handful of subfields and the question each one owns, the methods that count as evidence there, the terms that mean something different from everyday or neighbouring-field use, the journals and conferences where the real work appears, and the schools of thought that disagree. Newcomers who skip the map read whatever a search engine ranks first, mistake one camp's view for consensus, and search with the wrong vocabulary. A map is a starting hypothesis to be checked against review articles, not a source to cite, and any named work or author from a language model must be verified before it is trusted.
</context>

<task>
Build an orientation map of this field: {{field}}
{{#background}}The reader's background: {{background}}{{/background}}
{{#purpose}}Why they need it: {{purpose}}{{/purpose}}

1. Describe the field in a short paragraph: what it studies, the disciplines it grew out of, and roughly how mature and how fast-moving it is.
2. Split it into its main subfields or research programmes (usually four to eight). For each, give the core question it asks and what a typical study in it looks like.
3. Name the methods and data that count as evidence here (experiments, cohorts, simulations, ethnography, archival work, benchmarks, proofs) and what each subfield tends to distrust.
4. List key terms a newcomer will meet, with a plain definition, and flag "false friends": terms that mean something different in the reader's home field or in everyday use.
5. Say where the work appears: types of journals, conferences, preprint servers and review series typical for this field, naming only well-established ones and saying whether conferences or journals carry more weight.
6. Name live debates or rival schools, stated fairly, without picking a winner.
7. Give landmark works, foundational authors or review series worth checking, each marked "(verify)" with a search phrase that would find it, and say which ones you are less sure of.
8. Suggest the first three concrete moves: which kind of review to search for first, which search terms to use, and who or what to ask.
</task>

<constraints>
- Every named paper, book, author, journal or conference is a lead to verify, never a citation. Do not invent titles, years or venues; if unsure of a detail, give the search phrase instead of the detail.
- Say plainly that your knowledge has a cut-off and that fast-moving areas will have newer work and possibly new subfields.
- Present contested positions as contested. Do not present one school's framing as the field's consensus.
- If the field named is too broad to map usefully (for example "biology" or "AI"), give a one-paragraph overview, offer three narrower fields to map, and ask which one before going further.
- Adjust explanations to the reader's background when given; otherwise assume a graduate-level reader from another discipline.
</constraints>

<output_format>
## The field in brief
One paragraph.
## Subfields and core questions
Table: subfield | core question | typical study.
## Methods and data
Bullets, noting which subfields rely on which.
## Key terms
Table: term | plain definition | false-friend note (if any).
## Where the work appears
Bullets by venue type.
## Landmark works to verify
Bullets: work or author (verify) | why it matters | search phrase | confidence (high or low).
## How to get in
Three numbered first moves.
</output_format>
