---
schema: 1
id: plan-bibliometric-analysis
kind: prompt
title: Plan a bibliometric analysis
description: Plans a bibliometric or science-mapping study with a clear question, database choice, retrieval and cleaning, fitting indicators and network methods, and honest limits of citation data.
category: literature-review
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, student, data-analyst]
requires: [none]
inputs: [topic, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [bibliometrics, science-mapping, co-citation-analysis, citation-analysis, research-trends]
pairs_with:
  prompts: [build-search-string, plan-scoping-review, build-evidence-gap-map, find-research-gaps]
  personas: [research-librarian, research-methodologist]
args:
  - name: question
    description: What you want to learn about the field, for example "how research on green bonds has developed and which intellectual communities it draws on".
    type: text
    required: true
  - name: resources
    description: Optional. Databases you can export from, software you can use (for example R, Python, VOSviewer, CiteSpace) and the purpose (thesis chapter, journal article, institutional report).
    type: text
output_contract:
  format: markdown
  sections: [Question and fit, Data, Cleaning, Analyses, Interpretation limits, Reporting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bibliometric studies analyse publication and citation data to describe a field's growth, structure and communities. They are easy to produce and easy to do badly: many simply run software on a keyword export and report the most-cited papers and a colourful network with no research question. Good studies start with a question the data can answer, choose methods that match it (performance analysis for output and impact; co-citation for intellectual foundations; bibliographic coupling for current research fronts; co-word analysis for topics; co-authorship for collaboration), and spend serious effort on cleaning: author name disambiguation, merging institution variants, unifying keywords, and removing out-of-scope records. They also respect the data's limits: database coverage differs by field, language and region; citation counts depend on field, age and document type and must be normalised before comparing; and clusters depend on thresholds and algorithm settings, so they need sensitivity checks and substantive interpretation. Reporting guidance for bibliometric studies is emerging (for example the BIBLIO checklist and preliminary guideline work); the user should check the current version.
</context>

<task>
Plan a bibliometric analysis for:
<question>
{{question}}
</question>
{{#resources}}
Resources and purpose: {{resources}}
{{/resources}}

1. Sharpen the question into one to three answerable sub-questions and say whether bibliometrics fits or whether a scoping or systematic review would serve better; recommend combining methods if needed.
2. Choose the data source(s) with the coverage trade-offs for this field, the document types and years, and whether merging databases is worth the deduplication cost.
3. Build the retrieval: concept blocks for the query, fields searched, how precision is tested (screen a random sample of records and report the share in scope), and the export format and date.
4. Plan cleaning: deduplication, author and institution disambiguation, keyword thesaurus, removal of out-of-scope records, and a log of every change.
5. Match each sub-question to an analysis: performance indicators (with field and year normalisation), and the network method that fits, with the unit, counting method (full or fractional), thresholds, normalisation and clustering algorithm. Plan a sensitivity check on thresholds.
6. Plan interpretation: label clusters by reading their core documents, not only top keywords; link findings back to the question.
7. State the limits and the reporting checklist to use, and what to share for reproducibility (query, export date, cleaned data, software settings).
</task>

<constraints>
- Do not invent results, top authors, top journals or cluster themes; describe what the analysis will produce.
- Never treat citation counts as quality or rank unnormalised counts across fields or years.
- Name software only as options, and tell the user to confirm current features and versions.
- If the question only needs a descriptive count, say a full science-mapping study is unnecessary.
</constraints>

<output_format>
## Question and fit
Sub-questions and the recommendation.
## Data
Sources, scope and the draft query.
## Cleaning
Numbered steps and the cleaning log fields.
## Analyses
A table: sub-question | method | unit and counting | settings | output.
## Interpretation limits
Bullets.
## Reporting
Checklist to use and the reproducibility package.
</output_format>
