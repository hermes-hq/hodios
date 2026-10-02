---
schema: 1
id: literature-review-track
kind: workflow
title: Literature review track
description: Takes a literature review from research question and search strategy through screening, an extraction matrix and a written synthesis, with approval between steps. For students and researchers.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, discover, build]
role: [researcher, student]
requires: [none]
inputs: [topic, document, notes]
output: [plan, table, article]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [search-strategy, screening, prisma, synthesis]
pairs_with:
  prompts: [build-literature-matrix, find-research-gaps, write-literature-review-section]
  personas: [research-methodologist]
  rules: [source-citation-rules]
args:
  - name: research_question
    description: The question the review should answer, however rough.
    type: text
    required: true
  - name: slug
    description: Short kebab-case name for the review, used for the folder the step artifacts are saved in.
    type: string
    default: literature-review
steps:
  - {id: question, file: steps/01-question.md, stage: plan, gate: approve, artifact: "reviews/{{slug}}/01-protocol.md"}
  - {id: search, file: steps/02-search.md, stage: discover, gate: approve, artifact: "reviews/{{slug}}/02-search-log.md"}
  - {id: screen, file: steps/03-screen.md, stage: discover, gate: approve, artifact: "reviews/{{slug}}/03-screening.md"}
  - {id: extract, file: steps/04-extract.md, stage: discover, gate: approve, artifact: "reviews/{{slug}}/04-matrix.md"}
  - {id: synthesize, file: steps/05-synthesize.md, stage: build, gate: none, artifact: "reviews/{{slug}}/05-synthesis.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a literature review on "{{research_question}}" the way a supervisor would expect it to be done: a protocol first, a reproducible search, transparent screening, a faithful extraction matrix, then a thematic synthesis. Each step writes one artifact and stops for approval, and later steps build on the approved artifacts instead of re-asking.

Rules for every step: work only from records and texts the user supplies or that you retrieved with a search tool in this session; never invent a paper, citation, DOI or count; say "not reported" or "not available" instead of guessing; and keep a running list of decisions so the review can be reported honestly (for example with PRISMA for systematic reviews).
