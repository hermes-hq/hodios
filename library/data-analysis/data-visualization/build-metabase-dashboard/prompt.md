---
schema: 1
id: build-metabase-dashboard
kind: prompt
title: Build a Metabase dashboard
description: "Plans a Metabase dashboard with shared models and metrics, SQL questions, filters wired to every card, caching, permissions and safe sharing. Use when building on Metabase."
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, data-engineer, business-analyst, founder]
stack: [sql]
inputs: [text, schema]
output: [plan, code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [metabase, sql-dashboards, dashboard-filters, self-hosted-bi]
pairs_with:
  prompts: [design-dashboard, choose-bi-tool, speed-up-slow-dashboard, define-metric]
  rules: [chart-design-rules]
args:
  - name: dashboard_brief
    description: "Audience and questions, the database and the tables and columns available (or DDL), any existing saved questions or SQL, and who should see what."
    type: text
    required: true
  - name: setup
    description: "Metabase edition and hosting (open source self-hosted, Cloud, Pro or Enterprise), the database engine (Postgres, MySQL, BigQuery, Snowflake), and whether the dashboard will be shared publicly or embedded."
    type: text
output_contract:
  format: markdown
  sections: [Models and metrics, Questions, Dashboard layout, Filters and wiring, Performance and caching, Permissions and sharing, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build dashboards in Metabase. Its strengths are fast SQL and query-builder questions on a warehouse, and its weak spots are predictable: SQL questions only respond to dashboard filters through template variables (plain variables or field filters, written in double curly braces, inside optional clauses in double square brackets), so filters silently fail to apply to some cards unless every card is wired; field filters need the column's semantic type set in the Table Metadata admin page; metric definitions drift when every analyst writes their own SQL, which models and shared metrics fix; timezone settings on the instance and database shift daily numbers; heavy questions need caching or pre-aggregated tables; and sharing options differ (public links expose data to anyone with the URL, static embedding needs signed tokens, interactive embedding and sandboxing need paid editions). You plan with these in mind.
</context>

<task>
Plan the Metabase dashboard.

<dashboard_brief>
{{dashboard_brief}}
</dashboard_brief>

{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}

1. Define models and metrics: the cleaned base tables or SQL models the questions should share, with column semantic types (date, category, entity key, currency), and shared metric definitions so every card computes the same thing.
2. Write the questions: one per dashboard question, query builder where it suffices, SQL where needed. For SQL, include field-filter template variables with optional clauses so dashboard filters apply, and state the visualisation and settings for each card.
3. Lay out the dashboard: headline numbers with comparison on top, trends next, breakdowns and detail tables below; text cards for definitions; tabs if there are more than about 10 to 12 cards.
4. Wire filters: list each dashboard filter (date range, category, entity) and the field or variable it maps to on every card; flag any card it cannot reach and why; set default values; add click behaviour or links to detail dashboards where useful.
5. Plan performance: caching duration, pre-aggregated tables or materialised views for heavy questions, avoiding SELECT *, and checking query time in the database.
6. Set permissions and sharing: collection and data permissions by group, row-level restrictions where the edition supports them, and the sharing mode (internal, public link, static or interactive embedding) with its security implications.
7. Give checks: every filter changes every card it should, numbers reconcile with a source query, timezone correct, and permission test as a restricted user.
</task>

<constraints>
- Do not invent tables or columns; list what is missing.
- Warn before using public links for any non-public data.
- Note which features need a paid edition, and that names and menus change between versions.
- Write SQL in the dialect of the stated database.
</constraints>

<output_format>
## Models and metrics
Table: Model or metric | Definition | Source.

## Questions
For each: name, type, SQL or builder steps, visualisation.

## Dashboard layout
Text wireframe.

## Filters and wiring
Table: Filter | Card | Field or variable | Notes.

## Performance and caching
Bullets.

## Permissions and sharing
Bullets.

## Checks
Checklist.
</output_format>
