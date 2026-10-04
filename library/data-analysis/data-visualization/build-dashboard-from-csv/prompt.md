---
schema: 1
id: build-dashboard-from-csv
kind: prompt
title: Build a static HTML dashboard from a CSV
description: Builds a self-contained HTML dashboard from a CSV with a script, a chart per question, filters and accessible colours, and checks every number against the data. Use for a quick, shareable dashboard.
category: data-visualization
version: 1.0.0
status: incubating
stage: [build, verify]
role: [data-analyst, business-analyst, data-scientist]
stack: [html-css]
requires: [repo-read, file-write, shell]
inputs: [dataset, text]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [html-dashboard, static-site, chart-selection, colour-blind-safe, number-checks]
pairs_with:
  prompts: [choose-chart-type, choose-chart-colors, design-dashboard, audit-dashboard, write-plotting-code]
  rules: [chart-design-rules]
  workflows: [dashboard-build-track]
args:
  - name: data_path
    description: Path to the CSV file in the project.
    type: string
    required: true
  - name: questions
    description: The questions the dashboard must answer, most important first, for example "How are weekly sign-ups trending? Which channels convert best? Where are trials stalling?"
    type: text
    required: true
  - name: output_path
    description: Where to write the dashboard file.
    type: string
    default: dashboard.html
output_contract:
  format: markdown
  sections: [Data summary, Question to chart, Build, Number checks, Accessibility, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A quick dashboard is easy to make and easy to get wrong: charts chosen for variety rather than for the question, a filter that updates two charts but not the headline number, averages of averages, colours that a colour-blind reader cannot tell apart, and a file that shows a blank page when opened offline because the chart library came from a network that is not there. The fix is to compute every number in a script, check it independently, and ship one self-contained file.
</context>

<task>
Build a static HTML dashboard from `{{data_path}}` that answers these questions, and write it to `{{output_path}}`.

<questions>
{{questions}}
</questions>

1. Profile the CSV: columns, types, row count, date range and grain, missing values, and the categories in each dimension. If a question cannot be answered from the columns, say so and leave it out rather than approximating it.
2. For each question, define the metric precisely (numerator, denominator, grain, filter) and choose the chart for the comparison it needs: lines for trends over time, sorted horizontal bars for comparing categories, a stacked or 100% bar only when part-to-whole matters, a scatter for relationships, a table when exact values matter, a single headline number with its comparison for a KPI. Avoid pie charts with more than a few slices, 3D effects and dual axes.
3. Compute all aggregates in a script in the language the project uses (default Python), so ratios are computed as ratios of totals, never averages of row ratios, and write the aggregated data the page needs, not the raw rows, unless filters require row-level data and the file stays small.
4. Build one self-contained HTML file: inline the data as JSON, and inline a charting library or generate SVG directly, so the file works offline and needs no server. Add filters for the dimensions the questions imply (for example date range, region, channel); every chart and headline number on the page must respond to every filter, or say clearly which ones it ignores.
5. Design: titles that state what each chart answers, labelled axes with units, bar axes starting at zero, a consistent colour for each category across charts, a colour-blind-safe palette with text or patterns so colour is never the only cue, sufficient contrast, readable on a laptop and a phone, and a footer with the data source, row count and generation date.
6. Accessibility: a heading structure, keyboard-usable filters with labels, a text summary or data table available for each chart, and alt text or ARIA labels for chart containers.
7. Check the numbers: in the script, recompute each displayed value for the default view and for at least two filter combinations independently from the CSV (a separate code path from the one that built the page data) and compare. If a headless browser is available, open the page, read the rendered values, apply the filters, and check the console for errors.
</task>

<constraints>
- Every number shown comes from the data through the script. No hand-typed values or illustrative placeholders.
- Do not load scripts, fonts or data from the network in the final file.
- Do not include columns with personal data in the embedded data unless a question needs them; aggregate instead.
- Do not overwrite an existing file at the output path without saying so; write alongside it if unsure.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data summary
Rows, columns used, date range, problems found.

## Question to chart
Table: Question | Metric definition | Chart | Why this chart | Filters that apply.

## Build
Script path, how to rebuild with new data, output path and file size.

## Number checks
Table: View or filter | Value | Displayed | Independent recomputation | Match.

## Accessibility
What was done, and what still needs a manual check.

## Verification
Commands run and real results, including browser checks if run.
</output_format>
