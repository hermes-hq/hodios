---
schema: 1
id: write-docs-landing-page
kind: prompt
title: Write a documentation home page
description: Writes the home page of a documentation site that routes each kind of reader to the right first page in one click, built from top tasks and search data rather than the product's org chart.
category: docs
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [technical-writer, developer-advocate, product-manager]
stack: []
requires: [none]
inputs: [text, dataset, document]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [docs-home, information-architecture, navigation, reader-journeys]
pairs_with:
  prompts: [reorganize-docs-by-diataxis, write-api-quickstart, audit-documentation, audit-readme-conversion]
  personas: [technical-writer]
args:
  - name: docs_inventory
    description: The main sections and top pages of the docs site, with page titles and paths.
    type: text
    required: true
  - name: reader_signals
    description: What readers actually do and look for - top pages by views, top search terms including searches with no results, support ticket themes, and who the readers are.
    type: text
  - name: product_summary
    description: One or two sentences on what the product does and for whom.
    type: string
    required: true
---
<context>
You write the home page of a documentation site. Readers land there with one of a few intents: evaluate whether the product fits, get started for the first time, do a specific task, look something up, or fix a problem. Home pages fail when they mirror the company's product structure, list every section with equal weight, open with marketing copy, or hide the quickstart and API reference below the fold. Search data and top pages show what readers actually come for; searches with no results show what is missing or misnamed. A good home page has a one-line orientation, a clear first step for newcomers, direct links to the handful of most-used pages, routes by role or intent, and an obvious way to get help.

Product: {{product_summary}}

<docs_inventory>
{{docs_inventory}}
</docs_inventory>

{{#reader_signals}}
<reader_signals>
{{reader_signals}}
</reader_signals>
{{/reader_signals}}
</context>

<task>
1. Identify the main reader intents and roles from the signals and inventory. If there are no reader signals, say the page will be based on assumptions and list what data to collect.
2. Map each intent to the best existing first page. Flag intents with no good page (including no-result searches) as gaps.
3. Write the page: a one-sentence orientation in plain words; a primary call to action for getting started; a short "most used" block of four to eight links chosen from the data; routes by intent or role with one line on what each leads to; links to reference, changelog and status; and a help section (search tips, community, support).
4. Write link text that matches the words readers search for, not internal names, and note where page titles should be renamed to match.
5. Keep it scannable: no paragraph longer than two sentences, and no section with more than eight links.
6. List the gaps and renames, and suggest how to measure whether the new home page works (clicks from home to top tasks, home-page bounce, search use from home).
</task>

<constraints>
- Link only to pages in the inventory; for gaps, write the intended link as a [missing page] placeholder.
- No marketing claims; the orientation sentence says what the product does in plain terms.
- Do not invent traffic numbers or search terms; use only the signals given.
{{> output/uncertainty}}
</constraints>

<output_format>
## Reader intents
Table: intent or role | first page | evidence.
## Home page
The Markdown page.
## Gaps and renames
Bullets.
## Measuring it
Bullets.
</output_format>
