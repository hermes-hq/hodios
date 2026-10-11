---
schema: 1
id: write-research-table-prompt
kind: prompt
title: Write a research table prompt
description: Writes a prompt that fills a comparison matrix of vendors, tools or options criterion by criterion, with a source and date per cell and "unknown" instead of guessed values.
category: prompt-engineering
version: 1.0.0
status: incubating
stage: [plan, design]
role: [researcher, product-manager, consultant, operations-manager]
requires: [none]
inputs: [text, topic]
output: [prompt, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [comparison-matrix, vendor-research, source-per-cell, web-research, reusable-prompt]
pairs_with:
  prompts: [write-deep-research-brief, compare-vendors, build-literature-matrix]
  personas: [prompt-engineer]
args:
  - name: options
    description: The things to compare, by name, or how to find them (for example "the five most used open-source vector databases").
    type: text
    required: true
  - name: criteria
    description: What you need to know about each option, as roughly as you like - the prompt will turn them into checkable criteria.
    type: text
    required: true
  - name: context
    description: Optional - what the table is for, your region or currency, hard requirements, and sources you trust or distrust.
    type: text
output_contract:
  format: markdown
  sections: [Criteria definitions, Prompt, Checking the table]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write prompts that make an assistant with web search fill a comparison table. Comparison tables are where assistants invent most confidently: an empty cell feels like a gap to fill, so prices, limits, certifications and integrations get guessed from what similar products usually offer, or copied from an old page or a reseller. Vague criteria make it worse ("security" or "ease of use" cannot be checked). A good research-table prompt turns each criterion into a question with a defined answer type (yes, no, number with unit, short list), fixes the options and the date, requires a source and the date seen for every filled cell, prefers the vendor's own documentation or pricing page for vendor facts and independent sources for claims about quality, and makes "unknown" and "unclear - sources conflict" valid, expected answers. Prices and plans change often and differ by region, so they are recorded with currency, plan name and date.

Options: {{options}}

Criteria: {{criteria}}
{{#context}}

Context: {{context}}
{{/context}}
</context>

<task>
1. Turn each rough criterion into a checkable definition: the exact question, the answer type, the unit or allowed values, and the preferred source type. Split vague criteria into checkable parts and say which parts cannot be answered from public sources (for example "support quality"). If the options are not fixed, add a step that lists the candidates with inclusion rules and stops for the user to confirm before filling cells.
2. Write the prompt. It tells the assistant to: research one option at a time; answer every criterion with the defined answer type; give the source link and date seen for each filled cell; write "unknown" when nothing reliable is found and "conflict" with both sources when sources disagree; never fill a cell from general knowledge or by analogy with similar products; record prices with currency, plan, billing period and region; and return the table followed by a list of the cells it was least sure about.
3. Add a rule for marketing claims: features stated only on a landing page are labelled "vendor claim".
4. Checking the table: a short plan to spot-check cells (all prices, every "yes" on a hard requirement, every cell with a single source), and a reminder to confirm critical facts with the vendor in writing before a decision.
</task>

<constraints>
- Do not invent options, criteria values or sources in the example; use placeholders.
- The prompt must not rank or recommend unless the user asks; the table is evidence, not a verdict.
- Model-agnostic; it works with any assistant that can search the web, and says what to do if browsing is off (fill nothing, list what to look up).
- Avoid more than about 12 criteria per run; suggest splitting larger tables.
</constraints>

<output_format>
## Criteria definitions
Table: Criterion | Question | Answer type | Preferred source.
## Prompt
In a fenced code block, with the table layout Option | criterion columns, and a Sources list keyed by cell.
## Checking the table
Numbered checklist.
</output_format>
