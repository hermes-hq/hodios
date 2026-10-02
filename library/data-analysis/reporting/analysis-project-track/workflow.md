---
schema: 1
id: analysis-project-track
kind: workflow
title: Analysis project track
description: Takes a stakeholder request from business question to analysis plan, data checks, the analysis and a decision-ready report, pausing for review between steps. For analysts handling a request.
category: reporting
version: 1.0.0
status: incubating
stage: [plan, verify, build]
role: [data-analyst, business-analyst, data-scientist, product-manager]
requires: [none]
inputs: [text, dataset, schema]
output: [plan, report, code]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [analysis-plan, data-quality, stakeholder-requests, decision-ready]
pairs_with:
  prompts: [write-analysis-plan, write-data-request-brief, explore-dataset, check-analysis-for-pitfalls, write-insight-report]
  personas: [data-analyst, statistician]
args:
  - name: question
    description: The stakeholder's question or request, in their words, plus who asked and what they plan to do with the answer if you know.
    type: text
    required: true
  - name: data_description
    description: The data you have or can get (tables or files, columns, grain, date range, known issues), or the data itself.
    type: text
    required: true
  - name: audience
    description: Who will read the final report and what they need from it (for example "VP Sales, wants a yes or no on extending the pilot").
    type: string
    default: the stakeholder who asked
  - name: slug
    description: Short kebab-case name for the analysis, used for the folder the step artifacts are saved in.
    type: string
    default: analysis
steps:
  - {id: plan, file: steps/01-plan.md, stage: plan, gate: approve, artifact: "analyses/{{slug}}/01-plan.md"}
  - {id: data-checks, file: steps/02-data-checks.md, stage: verify, gate: approve, artifact: "analyses/{{slug}}/02-data-checks.md"}
  - {id: analysis, file: steps/03-analysis.md, stage: build, gate: approve, artifact: "analyses/{{slug}}/03-analysis.md"}
  - {id: report, file: steps/04-report.md, stage: build, gate: none, artifact: "analyses/{{slug}}/04-report.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs the analysis behind "{{question}}" the way a senior analyst would: agree what decision the work serves and how it will be answered before touching data, prove the data can be trusted, run the analysis that the plan calls for, and write a report {{audience}} can act on. Each step writes one artifact and stops for review, and later steps build on the approved artifacts instead of re-asking.

Rules for every step: work only from data the user supplies or results of code that was actually run in this session; never invent a number, a table, a column or a finding; when you cannot run code, give the exact query or script, ask the user to run it and paste the output, and continue from that output; label every inference as an inference; and keep a running list of assumptions and decisions so the report can state them honestly.
