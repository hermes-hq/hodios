---
schema: 1
id: review-search-strategy
kind: prompt
title: Peer review a literature search strategy
description: Peer reviews a database search strategy with the PRESS checklist, checking translation of the question, Boolean logic, subject headings, text words, spelling, limits and filters, with fixes per line.
category: literature-review
version: 1.0.0
status: incubating
stage: [review, verify]
role: [researcher, student]
requires: [none]
inputs: [text]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [press-checklist, search-strategy, boolean-search, systematic-review, subject-headings]
pairs_with:
  prompts: [build-search-string, write-systematic-review-protocol, chase-citations]
  personas: [research-librarian]
args:
  - name: question
    description: The review question and eligibility criteria the search must serve.
    type: text
    required: true
  - name: strategy
    description: The full search strategy, line by line as run, with the database and interface (for example "MEDLINE via Ovid"), plus any limits and the number of hits per line if you have them.
    type: text
    required: true
  - name: known_items
    description: Optional. Citations of papers you know should be found, to test sensitivity.
    type: text
output_contract:
  format: markdown
  sections: [Overall assessment, PRESS review, Line-by-line fixes, Revised strategy, Checks to run]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Errors in a search strategy silently lose studies and cannot be fixed by careful screening later. The PRESS (Peer Review of Electronic Search Strategies) guideline gives reviewers six elements to check: translation of the research question into concepts; Boolean and proximity operators; subject headings (correct terms, explosion, too broad or narrow, floating subheadings); text-word searching (synonyms, spelling variants, truncation, field tags); spelling, syntax and line numbers; and limits and filters (unjustified date, language or human limits, validated filters used correctly). Frequent real errors: an OR that should be AND between concepts, a line combining the wrong line numbers, a missing concept or one concept too many that cuts recall, truncation that is too short or in the wrong syntax for the interface, NOT used to exclude animals in a way that also drops human studies, and syntax copied between interfaces without translation (Ovid, PubMed, Embase.com, EBSCO and Web of Science differ).
</context>

<task>
Peer review this search strategy:
<question>
{{question}}
</question>
<strategy>
{{strategy}}
</strategy>
{{#known_items}}
<known_items>
{{known_items}}
</known_items>
{{/known_items}}

1. Identify the database and interface. If the interface is not stated, say which you assumed, because syntax depends on it.
2. Map the strategy back to the question: list the concepts searched, any concept missing, and any concept that should not be a required AND block (outcomes often should not be).
3. Check each PRESS element in turn and record whether it is acceptable, needs revision or is a serious problem, with the line numbers concerned.
4. For each problem, give the corrected line in the same interface's syntax and say what recall or precision effect it has.
5. Check the line combinations so every numbered reference points to the intended lines.
6. If known items are supplied, explain how to test whether the strategy retrieves each one and, for any likely miss, which term or field would catch it.
7. Write the revised strategy in full in the same interface syntax.
</task>

<constraints>
- Review only what is supplied; do not assume hit counts or claim you ran the search.
- Only suggest subject headings you are confident exist in that thesaurus, and tell the user to confirm each in the database's thesaurus browser.
- Keep the user's structure where it works; change only what the review justifies.
- Say when a limit or filter is defensible rather than removing it by reflex.
</constraints>

<output_format>
## Overall assessment
Two to four sentences: the main risk to recall or precision and whether the strategy is ready.
## PRESS review
A table: element | rating (acceptable / revise / serious) | lines | comment.
## Line-by-line fixes
A table: line | problem | corrected line | effect.
## Revised strategy
The full numbered strategy in a code block.
## Checks to run
Bullets: known-item test, hit-count sanity checks, terms to confirm in the thesaurus.
</output_format>
