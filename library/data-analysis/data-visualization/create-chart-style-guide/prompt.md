---
schema: 1
id: create-chart-style-guide
kind: prompt
title: Create a chart style guide
description: Creates a house style guide for charts with fonts, sizes, palettes, chart defaults, titles, number formats and source notes, plus theme code. Use so every team's charts look and read the same.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [designer, data-analyst, data-scientist, manager]
inputs: [text, image, preferences]
output: [docs, code, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [house-style, chart-theme, brand-guidelines, chart-design]
pairs_with:
  prompts: [choose-chart-colors, critique-chart, write-plotting-code]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: organisation
    description: "Who the guide is for (team, company, publication), where charts appear (slides, reports, web, dashboards), the tools in use (ggplot2, matplotlib, Excel, Power BI, Tableau, Datawrapper) and the main audiences."
    type: text
    required: true
  - name: brand
    description: "Brand fonts and colours with hex codes, any existing brand rules, and examples of current charts and what is wrong with them."
    type: text
output_contract:
  format: markdown
  sections: [Principles, Typography and layout, Colour, Chart defaults, Text and numbers, Accessibility, Theme code, Review checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data visualisation lead who writes chart style guides for organisations. You know the point of a style guide is fewer decisions per chart, so analysts spend time on the message, not on fonts; that guides fail when they are long PDFs nobody reads instead of themes built into the tools; that brand palettes rarely work for data as-is (too few distinct hues, poor contrast, red and green as main colours); and that the most useful rules are about words (action titles, units, sources, number formats) as much as visuals. Good guides from newsrooms and statistics offices have short principles, concrete defaults and theme files.
</context>

<task>
Write a chart style guide for this organisation.

<organisation>
{{organisation}}
</organisation>

{{#brand}}
<brand>
{{brand}}
</brand>
{{/brand}}

1. Write three to five principles that fit the audiences, for example "one message per chart" and "label directly, avoid legends".
2. Typography and layout: font family (brand font if readable at small sizes, with a fallback), sizes for title, subtitle, axis, labels and notes per medium, alignment (left-aligned titles), margins, and standard sizes and aspect ratios for slides, report pages and web.
3. Colour: derive data palettes from the brand: a categorical palette of up to six to eight colours, a highlight colour plus grey for focus charts, sequential and diverging palettes, and fixed meanings for recurring categories (for example each product line always the same colour). Check them for colour-vision deficiency and contrast against the background and flag brand colours that fail. Use only the brand hex codes given; where you propose new colours, mark them as proposals.
4. Chart defaults: gridlines (light horizontal only), axes (zero baseline for bars), line weights, bar spacing, sorting rules, when to use a legend versus direct labels, and the default chart for common jobs (trend, ranking, part-to-whole, distribution).
5. Text and numbers: action titles that state the finding, subtitles with measure, units and period, number formats (thousand separators, decimals, k/m/bn, percentages versus percentage points), date formats, source and note lines, and spelling of recurring terms.
6. Accessibility: minimum font sizes, contrast, not relying on colour alone, alt text requirements.
7. Theme code for the tools in use: ggplot2 theme function, matplotlib style sheet (mplstyle), plotly template, Vega-Lite config, and notes for Excel chart templates, Power BI theme JSON or Tableau defaults as relevant.
8. A one-page review checklist to run before a chart is published.
</task>

<constraints>
- Do not invent brand colours or fonts; if none are given, propose neutral defaults and label them.
- Keep each section short and prescriptive; prefer a default plus the allowed exception over a list of options.
- Every colour rule must pass a colour-vision check, or the guide must say how to fix it.
- Theme code must be valid for the named tools and use the guide's exact values.
</constraints>

<output_format>
## Principles
Numbered list.

## Typography and layout
Table: Element | Slides | Report | Web.

## Colour
Palettes with hex codes and their uses, plus fixed category colours.

## Chart defaults
Bullets and a table of default chart per job.

## Text and numbers
Bullets with examples.

## Accessibility
Bullets.

## Theme code
One code block per tool in use.

## Review checklist
A checklist of 10 to 15 items.
</output_format>
