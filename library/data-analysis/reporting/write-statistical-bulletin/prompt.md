---
schema: 1
id: write-statistical-bulletin
kind: prompt
title: Write a statistical bulletin
description: Writes a public statistical release in the style of an official statistics bulletin - main points first, measured changes with uncertainty, revisions, comparability notes and plain language.
category: reporting
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, researcher, writer]
subject: [public-sector, statistics]
inputs: [dataset, text]
output: [report, article]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [official-statistics, statistical-release, public-data, revisions]
pairs_with:
  prompts: [write-data-methodology-note, compute-survey-margin-of-error, apply-small-number-suppression]
args:
  - name: statistics
    description: "The figures for the release: the series, latest period and comparison periods, confidence intervals or standard errors if survey-based, any revisions to previously published figures, and the data source."
    type: text
    required: true
  - name: producer
    description: "Who publishes it (agency, council, research institute, charity), the release's usual title and frequency, and any house style rules."
    type: text
    required: true
  - name: notes
    description: Methodology changes, events affecting the period, known quality issues. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Main points, Headline findings, Revisions, Things you need to know, Quality and methodology]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Official and public statistics follow conventions that protect trust. Releases lead with a few plain-language main points, each a complete sentence with the number, the period and the comparison. Survey-based changes are described as real only when they are statistically significant; otherwise the release says the figure is "broadly unchanged" or "not statistically significant", rather than reporting noise as a rise. Revisions to earlier figures are stated openly with their size and cause. Comparisons across a methodology change or a series break are flagged or avoided. Language is neutral: no "worrying", "encouraging" or policy commentary, because the producer reports and the reader judges. Rounding is consistent, units are explicit, and every chart has a written equivalent. Producers usually have a code of practice for statistics; the bulletin should be compatible with it but this prompt does not certify compliance.

Producer: {{producer}}
</context>

<task>
<statistics>
{{statistics}}
</statistics>
{{#notes}}

<notes>
{{notes}}
</notes>
{{/notes}}

1. Identify the main messages: the latest level, the change on the main comparison (previous period, same period last year), the longer-term trend, and any notable breakdowns. For survey estimates, judge significance of the change itself, not by whether the two intervals overlap (overlapping intervals can still hide a significant change): use a supplied test or interval for the change, or approximate one from the standard errors and say it assumes independent samples. If no intervals are supplied, say change cannot be judged significant and word it cautiously.
2. Write three to five main points, each self-contained and neutral, with numbers rounded consistently.
3. Write headline findings by topic, each with a short paragraph and a suggested chart with its written description.
4. Report revisions: which figures changed, from what to what, and why.
5. Write "things you need to know": definitions, coverage, comparability, series breaks and events affecting the period.
6. Write a short quality and methodology section: source, sample or coverage, main uncertainty, and where full methodology lives.
</task>

<constraints>
- Use only the figures supplied; never add context statistics from memory.
- Never describe a change as an increase or decrease when the interval shows it is not statistically significant.
- Neutral language only: no evaluative adjectives, no causes asserted beyond what the notes establish, no policy recommendations.
- Flag any figure built on very small numbers and suggest suppression or aggregation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Main points
Three to five bullets.

## Headline findings
Subsections by topic, each with text and a chart suggestion plus its written description.

## Revisions
Table: Figure | Previously published | Revised | Reason. Or "No revisions".

## Things you need to know
Bullets.

## Quality and methodology
Short paragraphs.
</output_format>
