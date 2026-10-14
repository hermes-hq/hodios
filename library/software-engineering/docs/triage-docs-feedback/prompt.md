---
schema: 1
id: triage-docs-feedback
kind: prompt
title: Triage docs feedback
description: Clusters docs feedback, page ratings, support tickets and failed searches into ranked fixes, each naming the page to change and what to change on it.
category: docs
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [technical-writer, developer-advocate, maintainer, product-manager]
stack: []
requires: [none]
inputs: [dataset, text, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [reader-feedback, search-analytics, page-ratings, docs-backlog, fix-ranking]
pairs_with:
  prompts: [audit-documentation, write-troubleshooting-guide, reorganize-docs-by-diataxis]
args:
  - name: feedback
    description: The raw signals - feedback comments with page URLs, thumbs or rating counts per page, top searches with no results, docs-related support tickets or issues.
    type: text
    required: true
  - name: period
    description: The time window the data covers, and page view counts if available.
    type: text
  - name: notes
    description: Context such as recent releases, known gaps already planned, or how many hours the team has for docs fixes.
    type: text
output_contract:
  format: markdown
  sections: [Ranked fixes, Themes, Noise and non-docs issues, Data gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Docs feedback is noisy. Thumbs-down widgets attract complaints about the product, pricing and bugs; one angry comment can outweigh twenty silent failures; and the pages with the most negative votes are often just the most visited. The useful signals are different: failed site searches show words readers use that the docs do not (a missing page or a missing synonym), repeated support tickets that a page should have prevented show where a page exists but fails, and rating ratios only mean something next to page views. Most docs fixes fall into a few types: missing content, wrong or outdated content, content that exists but cannot be found, an example that does not run, and unclear steps. Each type has a different fix, so triage should name the type, not just the page.
</context>

<task>
<feedback>
{{feedback}}
</feedback>
{{#period}}Period and volume: {{period}}{{/period}}
{{#notes}}Notes: {{notes}}{{/notes}}

1. Normalise the items: page or search term, signal type (comment, rating, failed search, ticket, issue), and the reader's goal if it can be inferred. Remove exact duplicates and count them.
2. Separate non-docs items: product bugs, feature requests, pricing and account complaints, spam. Route them (bug tracker, product, support) rather than discarding them.
3. Cluster the rest into themes by reader goal and failure type: missing, wrong or outdated, hard to find, broken example, unclear. Merge failed searches that mean the same thing (synonyms, misspellings, product's old name).
4. Rank fixes by reach (page views or how many signals, across sources) times severity (blocked a task, caused an error, or mildly confusing), and note effort as small, medium or large. Use rate, not raw count, when view data exists.
5. For each fix, name the page (or the new page needed), the specific change (add a section, correct a value, add a synonym or redirect, fix a sample), and the evidence behind it.
</task>

<constraints>
- Every fix must cite the items it comes from, with counts. Do not add fixes the data does not support; ideas of your own go under data gaps as things to check.
- Do not treat raw negative-vote counts as severity without views; say when view data is missing.
- Do not judge a page "wrong" from feedback alone; mark it "reported wrong, verify against the product".
- Quote reader comments only briefly and without names, emails or account details.
{{> output/uncertainty}}
</constraints>

<output_format>
## Ranked fixes
Table: rank, page or new page, fix type, specific change, evidence (items and counts), effort.
## Themes
Each theme with a one-paragraph summary and its share of the docs-related signals.
## Noise and non-docs issues
Items routed elsewhere, grouped by destination with counts.
## Data gaps
Missing data that would change the ranking, and how to collect it.
</output_format>
