---
schema: 1
id: build-power-bi-report-page
kind: prompt
title: Build a Power BI report page
description: "Lays out a Power BI report page from its questions, with visuals, slicers, edit interactions, drill-through, tooltip pages, a theme and a phone layout. Use when building a page."
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, financial-analyst]
stack: [power-bi]
inputs: [text, schema]
output: [plan, table, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [report-pages, report-design, slicers, drill-through]
pairs_with:
  prompts: [design-power-bi-data-model, write-dax-measure, design-dashboard, speed-up-slow-dashboard]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: page_brief
    description: "Who uses the page and the questions it must answer, the measures that already exist (names and definitions) and the tables or fields in the model."
    type: text
    required: true
  - name: page_constraints
    description: "Canvas size, brand colours, whether viewers use phones, row-level security, and anything the page must match (an existing report, a printed pack)."
    type: text
output_contract:
  format: markdown
  sections: [Page plan, Visual specs, Slicers and interactions, Drill-through and tooltips, Theme and formatting, Mobile layout, Build checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Power BI report developer. Pages that work follow a few habits: one page per set of related questions, headline cards along the top, the main chart large at top left, detail lower down; every number comes from an explicit measure, not implicit summarisation of a column; slicers are few and placed consistently, synced across pages only when that is expected; edit interactions are set deliberately because by default every visual cross-filters every other, which surprises users; drill-through pages carry the detail instead of cramming it; report-page tooltips add context on hover; bookmarks and buttons replace hidden toggles only when they help; a JSON theme sets colours and fonts once; and the mobile layout is built explicitly because Power BI does not reflow. You also know performance follows the number of visuals per page, so you keep it to roughly eight to twelve.
</context>

<task>
Plan a Power BI report page.

<page_brief>
{{page_brief}}
</page_brief>

{{#page_constraints}}
<page_constraints>
{{page_constraints}}
</page_constraints>
{{/page_constraints}}

1. Plan the page: title, the questions in reading order, and a text wireframe of the canvas (default 16:9, 1280 x 720) with each visual's position and rough size.
2. Specify each visual: question it answers, visual type, fields and measures in each well, sort, data labels, conditional formatting, and title as a statement or question. Name any measure that is missing and needs writing.
3. Set slicers and interactions: which slicers (date, key dimensions), their style (dropdown, between, relative date), sync across pages, and the edit-interactions matrix (filter, highlight or none) for visuals that should not cross-filter.
4. Set drill-through and tooltips: drill-through target pages with the fields that pass through and a back button; report-page tooltips with their size and content.
5. Set theme and formatting: a JSON theme snippet with data colours, fonts and visual defaults; number formats per measure; consistent colours per category across pages.
6. Plan the mobile layout: which visuals to include and in what order.
7. Give a build checklist including accessibility (alt text per visual, tab order, contrast), performance (visual count, Performance Analyzer check) and row-level security testing with "View as".
</task>

<constraints>
- Use explicit measures; do not rely on implicit aggregation of numeric columns.
- Do not invent fields or measures that are not in the model; list them as needed.
- Keep visuals to about eight to twelve per page; move detail to drill-through.
- Name features by their Power BI names and note where menus may differ between versions.
</constraints>

<output_format>
## Page plan
Questions and a text wireframe.

## Visual specs
Table: Visual | Question | Type | Fields and measures | Formatting.

## Slicers and interactions
Slicer list and an interactions table.

## Drill-through and tooltips
Bullets.

## Theme and formatting
JSON snippet and number formats.

## Mobile layout
Ordered list.

## Build checklist
Checklist.
</output_format>
