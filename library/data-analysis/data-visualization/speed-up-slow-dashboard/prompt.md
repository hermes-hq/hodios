---
schema: 1
id: speed-up-slow-dashboard
kind: prompt
title: Speed up a slow dashboard
description: "Diagnoses a slow BI dashboard (Power BI, Tableau, Looker Studio, Metabase) and ranks fixes across data volume, model, calculations and page design, with how to measure each."
category: data-visualization
version: 1.0.0
status: incubating
stage: [maintain]
role: [data-analyst, business-analyst, data-engineer]
stack: [power-bi, tableau]
inputs: [text, logs, config]
output: [plan, checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dashboard-performance, query-optimisation, looker-studio, metabase]
pairs_with:
  prompts: [build-power-bi-report-page, build-tableau-dashboard, design-power-bi-data-model, audit-dashboard, speed-up-power-bi-report]
args:
  - name: dashboard
    description: "The tool, the slow page or view, data source and connection mode (import or extract, DirectQuery or live), data volume (rows, columns), number of visuals and filters, heavy calculations, and when it is slow (opening, filtering, refresh)."
    type: text
    required: true
  - name: measurements
    description: "Any measurements: Performance Analyzer or Performance Recording output, query times from the database, refresh durations, or 'none yet'."
    type: text
output_contract:
  format: markdown
  sections: [Where the time goes, Ranked fixes, How to measure, Quick wins, What not to do]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You tune BI dashboards. Slowness has a short list of causes, and measuring first beats guessing: Power BI's Performance Analyzer splits each visual into DAX query, visual display and other (waiting) time, and DAX Studio shows storage-engine versus formula-engine time; Tableau's Performance Recording shows query, layout and render time per sheet; Looker Studio is mostly bound by the connector and data source (BigQuery or Sheets), helped by extracts and BI Engine, and hurt by blends; Metabase depends on the warehouse query and its caching. The common causes: too many visuals per page (each fires its own queries), live or DirectQuery connections to slow sources, wide tables with unused columns and high-cardinality text, missing star schema (Power BI) or overly granular extracts (Tableau), row-by-row calculations (iterators over large tables, string operations, nested LODs), slicers and quick filters with "only relevant values" on large dimensions, bidirectional relationships, and custom visuals. You rank fixes by expected gain over effort.
</context>

<task>
Diagnose and speed up this dashboard.

<dashboard>
{{dashboard}}
</dashboard>

{{#measurements}}
<measurements>
{{measurements}}
</measurements>
{{/measurements}}

1. Say where the time most likely goes, from the measurements if given, otherwise from the description, and state confidence. Separate load time, interaction time and refresh time.
2. Rank fixes by expected gain and effort, covering the layers that apply: data volume (filter history, aggregate tables, remove unused columns, reduce cardinality); model (star schema, relationship direction, data types); connection (import or extract versus DirectQuery or live, incremental refresh, extract filters); calculations (rewrite heavy measures or LODs, push logic upstream to the database or ETL); page design (fewer visuals, drill-through or tabs for detail, fewer slicers, avoid "only relevant values" on large fields); tool features (aggregations, query reduction settings, caching, BI Engine).
3. For each fix, say how to measure before and after with the tool's own profiler.
4. Pick two or three quick wins to try first.
5. Name what not to do (for example buying more capacity before measuring, or removing visuals users need without asking).
</task>

<constraints>
- Do not claim specific speed-ups as certain; give expected direction and size ranges and insist on measurement.
- Do not recommend changes that alter the numbers shown (filters, sampling) without stating the effect.
- Tool features and limits vary by licence and version; say when a fix depends on them.
</constraints>

<output_format>
## Where the time goes
Short diagnosis with confidence.

## Ranked fixes
Table: Rank | Fix | Layer | Expected gain | Effort | Changes numbers?

## How to measure
Bullets per tool.

## Quick wins
Numbered, two or three.

## What not to do
Bullets.
</output_format>
