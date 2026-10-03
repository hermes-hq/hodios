---
schema: 1
id: dashboard-build-track
kind: workflow
title: Dashboard build track
description: Builds a dashboard in gated steps from decisions and users to metric definitions, data checks, a wireframe, a build spec and a QA and adoption review. Use when a dashboard must be trusted and used.
category: data-visualization
version: 1.0.0
status: incubating
stage: [discover, plan, verify, design, build, review]
role: [data-analyst, business-analyst, data-engineer, product-manager]
requires: [none]
inputs: [text, dataset, schema]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [bi, metric-definitions, wireframe, dashboard-qa, adoption]
pairs_with:
  prompts: [design-dashboard, define-metric, audit-dashboard, build-sheets-dashboard, write-dax-measure]
  rules: [chart-design-rules]
  personas: [data-analyst]
args:
  - name: purpose
    description: Why the dashboard is needed, in the requester's words - who asked, for which meeting or decision, and what they do today without it.
    type: text
    required: true
  - name: data_sources
    description: The data available (systems, tables or files, key columns, grain, refresh frequency, known quality issues). Leave empty if still unknown; step 1 will list what is needed.
    type: text
  - name: tool
    description: The BI or spreadsheet tool the dashboard will be built in (for example Power BI, Tableau, Looker Studio, Metabase, Excel, Google Sheets).
    type: string
    default: the team's existing BI tool
steps:
  - {id: decisions, file: steps/01-decisions.md, stage: discover, gate: approve, artifact: "dashboard-build/01-decisions.md"}
  - {id: metrics, file: steps/02-metrics.md, stage: plan, gate: approve, artifact: "dashboard-build/02-metrics.md"}
  - {id: data-checks, file: steps/03-data-checks.md, stage: verify, gate: approve, artifact: "dashboard-build/03-data-checks.md"}
  - {id: wireframe, file: steps/04-wireframe.md, stage: design, gate: approve, artifact: "dashboard-build/04-wireframe.md"}
  - {id: build-spec, file: steps/05-build-spec.md, stage: build, gate: approve, artifact: "dashboard-build/05-build-spec.md"}
  - {id: qa-adoption, file: steps/06-qa-adoption.md, stage: review, gate: none, artifact: "dashboard-build/06-qa-adoption.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Builds the dashboard behind "{{purpose}}" in {{tool}} as a strong BI team would: agree the decisions and users, define every metric, prove the data, sketch the layout, write a build spec, then QA it and plan adoption. Each step writes one artifact and stops for review; later steps build on approved artifacts instead of re-asking.

Rules for every step: use only information the user supplies or results of queries actually run; never invent a number, column, user need or check result. When a query cannot be run, give it, ask for the output and continue from it. Label assumptions and keep a running log of them. Every tile must trace to a decision approved in step 1. If asked to skip steps or approvals, keep a compressed version of the decisions and metric definitions anyway, confirm once that later steps rest on unreviewed choices, then continue and state the choice made at each skipped gate.
