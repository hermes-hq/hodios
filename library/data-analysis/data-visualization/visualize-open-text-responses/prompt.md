---
schema: 1
id: visualize-open-text-responses
kind: prompt
title: Visualise open-text responses
description: "Shows themes from open-text survey or feedback answers as coded theme charts with denominators and representative quotes instead of word clouds. Use when presenting comments."
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [ux-researcher, data-analyst, product-manager, marketer]
inputs: [dataset, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [open-text, survey-comments, qualitative-data, word-cloud-alternative]
pairs_with:
  prompts: [run-thematic-analysis, classify-text-records, analyze-survey-results, visualize-ranking]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: responses
    description: "The question asked, the number of responses, and either the coded themes with counts or the raw answers (or a sample), plus any segment fields (plan, region, NPS group)."
    type: text
    required: true
  - name: audience_and_tool
    description: "Who will see it (leadership, product team, public report) and where it will be built (slides, Excel, Power BI, Python, Datawrapper)."
    type: text
output_contract:
  format: markdown
  sections: [Coding check, Theme table, Charts, Quotes, Method note, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You present qualitative feedback to people who make decisions. Word clouds are the default and they mislead: they count words, not meanings ("not good" counts as "good"), size by letter count as much as frequency, drop context, and give no denominator. The honest approach is to code responses into themes (one response can carry several), then show the share of respondents mentioning each theme as sorted bars, with sentiment or segment splits where they matter, and pair each theme with one or two representative quotes. You know the denominators matter: the share of all respondents versus the share of those who answered the open question; answer rates are often low and skewed toward strong opinions; multi-coded responses mean shares do not add to 100%; and themes with few mentions should not be dropped if they are severe (safety, legal, data loss).
</context>

<task>
Visualise these open-text responses.

<responses>
{{responses}}
</responses>

{{#audience_and_tool}}
<audience_and_tool>
{{audience_and_tool}}
</audience_and_tool>
{{/audience_and_tool}}

1. Check the coding: if themes are already coded, check the codebook is clear and mutually understandable; if only raw answers are given, propose a codebook of 6 to 12 themes from the sample with definitions, code a sample to show how it works, and say that the full set must be coded consistently (by people, or by a model with a human-checked sample).
2. Build a theme table: theme, definition, number and share of respondents mentioning it (stating the denominator), sentiment split if relevant, and any segment differences.
3. Specify charts: sorted horizontal bars of share of respondents per theme with n in the subtitle and a note that responses can mention several themes; a diverging or stacked sentiment bar per theme if sentiment matters; a segment comparison (dot plot or small multiples) only where differences are large enough to matter; highlight severe low-frequency themes separately.
4. Select quotes: one or two short, representative quotes per main theme, lightly trimmed without changing meaning, with personal details removed.
5. Write a method note: question, response rate, coding approach, who coded, and limits.
6. Give build notes for the tool.
</task>

<constraints>
- Do not produce a word cloud as the main chart; if asked, explain why and offer it only as decoration alongside the theme chart.
- Never invent quotes or alter their meaning; mark trimmed quotes with an ellipsis.
- Remove names, emails and other identifying details from quotes.
- State the denominator for every share and that shares can exceed 100% in total.
</constraints>

<output_format>
## Coding check
Bullets, plus a proposed codebook if needed.

## Theme table
Table: Theme | Definition | Mentions | Share of respondents | Notes.

## Charts
Specs for each chart.

## Quotes
Theme: quote list.

## Method note
A short paragraph.

## Build notes
Numbered steps or one code block.
</output_format>
