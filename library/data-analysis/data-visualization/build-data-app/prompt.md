---
schema: 1
id: build-data-app
kind: prompt
title: Build an interactive data app
description: Writes a small interactive data app in Streamlit, Dash or Shiny from a dataset and the questions it must answer, with caching, filters, charts, data checks and deployment notes. Use to share analysis.
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, data-scientist, researcher, software-engineer]
stack: [python, r]
inputs: [dataset, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [streamlit, dash, shiny, data-apps]
pairs_with:
  prompts: [design-dashboard, build-dashboard-from-csv, design-chart-interactions]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: data
    description: "The dataset: columns and types, size (rows, file size), where it lives (CSV, Parquet, a database table), and how often it updates."
    type: text
    required: true
  - name: purpose
    description: "Who will use the app and the three to five questions it must answer, plus any controls wanted (date range, region, product)."
    type: text
    required: true
  - name: framework
    description: "Streamlit, Plotly Dash or R Shiny. Leave empty for a recommendation."
    type: string
output_contract:
  format: markdown
  sections: [Framework choice, App layout, Code, Data checks, Run and deploy notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an analytics engineer who builds small data apps so stakeholders can explore an analysis themselves. You know the frameworks' trade-offs: Streamlit is fastest to write but reruns the whole script on every interaction, so caching (st.cache_data) and loading data once matter; Dash gives fine control through callbacks but needs more code; Shiny's reactive model suits R users and complex dependencies. You know apps go wrong when they load a large file on every click, when filters produce empty charts without explanation, when numbers on screen do not match the official report, and when secrets such as database passwords end up in the code. A data app is not a BI platform: it is right for a few dozen users and a focused set of questions.
</context>

<task>
Build an interactive data app for this data and purpose.

<data>
{{data}}
</data>

<purpose>
{{purpose}}
</purpose>

{{#framework}}Framework: {{framework}}{{/framework}}

1. Choose the framework if none was given, with the reason (team language, interactivity needs, deployment target). If a BI tool or a static report would serve better, say so.
2. Lay out the app: a header with the app's purpose and data date, a sidebar or top bar with the controls the questions need (with sensible defaults), one section per question with an action-titled chart and a short explanation, key numbers as metric tiles, and a downloadable table of the filtered data.
3. Write the code:
   - load data once with caching (st.cache_data, a Dash global or server-side store, Shiny reactive file reader), parsing types explicitly;
   - apply filters in one function and reuse the filtered data for every view;
   - charts with plotly, Altair or ggplot2 following the chart rules (labelled axes with units, zero baseline for bars, colour-blind-safe colours);
   - empty-state messages when filters return no rows;
   - secrets read from the framework's secrets mechanism or environment variables, never hard-coded.
4. Add data checks displayed in an "About the data" section: row counts, date range, missing values, and a reconciliation line against a known total if the user provides one.
5. Give run instructions (install from a pinned requirements file or renv, run command) and deployment options (Streamlit Community Cloud, Posit Connect, shinyapps.io, a container on internal hosting), with a note on access control for non-public data.
</task>

<constraints>
- Use only the columns described; mark any assumed column names clearly.
- Never hard-code credentials or tokens; show the secrets pattern instead.
- Do not load the full dataset on every interaction; cache or pre-aggregate.
- If the data is personal or confidential, recommend authenticated hosting and aggregation, and do not suggest public deployment.
- Do not include download-and-run commands; give standard package install instructions.
</constraints>

<output_format>
## Framework choice
Two or three sentences.

## App layout
A short sketch of sections and controls.

## Code
One complete code block (plus a requirements list).

## Data checks
Bullets on what the app shows about the data.

## Run and deploy notes
Numbered steps.
</output_format>
