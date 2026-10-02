---
schema: 1
id: build-search-string
kind: prompt
title: Build a database search strategy
description: Builds a Boolean search strategy for PubMed, Scopus, Web of Science or Google Scholar with concepts, synonyms, controlled vocabulary, filters and a search log. For systematic and narrative reviews.
category: literature-review
version: 1.0.0
status: incubating
stage: [discover]
role: [researcher, student]
requires: [none]
inputs: [text, topic]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [search-strategy, boolean-search, mesh, systematic-review, pubmed, scopus]
pairs_with:
  prompts: [screen-studies, build-literature-matrix, write-literature-review-section]
  workflows: [literature-review-track]
  personas: [research-methodologist]
args:
  - name: research_question
    description: The review question, plus the review type (systematic, scoping, narrative, rapid) and any known key papers the search must find.
    type: text
    required: true
  - name: databases
    description: The databases you can access, for example "PubMed, Embase via Ovid, Scopus". If left empty, the strategy covers PubMed, Scopus, Web of Science and Google Scholar.
    type: text
    default: PubMed, Scopus, Web of Science, Google Scholar
output_contract:
  format: markdown
  sections: [Question framing, Concept table, Search strings, Filters and limits, Testing the strategy, Search log]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A review is only as good as its search. Good strategies split the question into a few concepts, capture each concept with both controlled vocabulary (MeSH in PubMed, Emtree in Embase, subject headings elsewhere) and free-text synonyms, combine synonyms with OR and concepts with AND, and adapt the syntax to each database's field tags. Common failures are searching the whole question as one phrase, adding too many concepts (which kills recall), forgetting spelling variants and truncation, and filters that silently drop relevant records. Systematic reviews favour sensitivity and must be reproducible to the character; narrative reviews can trade some recall for precision.
</context>

<task>
Build a search strategy for:
<question>
{{research_question}}
</question>
Databases: {{databases}}

1. Frame the question with the framework that fits (PICO or PECO for interventions and exposures, PCC for scoping reviews, SPIDER or PEO for qualitative questions). Decide which two to four elements become search concepts; outcomes and comparators are usually left out of the search to protect recall, and say why for each element you drop.
2. For each concept, list: controlled-vocabulary terms per database (with explode or no-explode choices), free-text synonyms, British and American spellings, abbreviations, and truncation or wildcards. Mark any subject heading you are not certain exists with "(verify)".
3. Write one complete, copy-ready string per database in its own syntax: PubMed field tags such as [tiab] and [Mesh]; Scopus TITLE-ABS-KEY(); Web of Science TS=; Ovid line-by-line with numbered sets where Ovid is listed. For Google Scholar, write a short string under its length limit and explain that it is a supplementary source, not a reproducible database search.
4. Recommend filters and limits (date, language, study design, humans) with the trade-off of each. Prefer validated search filters for study design (for example the Cochrane highly sensitive search strategy for randomised trials in PubMed) over database limits, and name the filter rather than reproduce it from memory if you are not sure of its exact text.
5. Explain how to test the strategy: check it retrieves the known key papers, and if not, which concept or term caused the miss; look at the first 50 results for precision; adjust.
6. Add supplementary methods suited to the review type: citation chasing, trial registries, preprint servers, grey literature.
</task>

<constraints>
- Never run, cite or count results you have not seen. You write strings; the user runs them and records counts.
- Use correct Boolean grouping with parentheses, and keep each concept in its own bracketed OR block.
- Do not invent MeSH or Emtree terms. Flag uncertain ones with "(verify)" and tell the user to check them in the database's thesaurus browser.
- If the question is too vague to search (no clear population, exposure or phenomenon), propose two or three searchable versions and ask which to use before writing strings.
- If the review is systematic, recommend having the strategy peer reviewed (PRESS checklist) and involving a librarian.
</constraints>

<output_format>
## Question framing
Framework table: element | content | searched (yes or no) | why.
## Concept table
Table: concept | controlled vocabulary (per database) | free-text terms.
## Search strings
One fenced code block per database, labelled with the database and interface.
## Filters and limits
Bullets with trade-offs.
## Testing the strategy
Numbered steps.
## Search log
An empty table to fill in: database | interface | date run | string version | results | notes.
</output_format>
