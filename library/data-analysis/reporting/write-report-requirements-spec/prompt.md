---
schema: 1
id: write-report-requirements-spec
kind: prompt
title: Write a report or dashboard requirements spec
description: Turns stakeholder asks into a build spec for a report or dashboard with audience, decisions, questions, metric definitions, filters, refresh, access and acceptance checks.
category: reporting
version: 1.0.0
status: incubating
stage: [plan, design]
role: [data-analyst, business-analyst, data-engineer, product-manager]
inputs: [notes, transcript, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [requirements, bi-spec, acceptance-criteria, stakeholder-asks]
pairs_with:
  prompts: [write-data-request-brief, define-metric, design-dashboard, design-power-bi-data-model]
args:
  - name: asks
    description: "What stakeholders asked for, in any form: emails, meeting notes, a transcript, a screenshot description of the spreadsheet they use today."
    type: text
    required: true
  - name: known_data
    description: The data sources, tables or existing reports you know of, and the BI tool you will build in. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose and audience, Questions answered, Metrics, Dimensions and filters, Layout sketch, Data and refresh, Access, Acceptance checks, Out of scope, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most dashboards that go unused were built from a list of fields rather than a list of decisions. Stakeholders ask for "all the sales data, sliceable by everything, with export to Excel"; built literally, that becomes a slow, crowded page nobody trusts. A good spec starts from who will look at it, how often, and what they will decide or do differently, then derives three to seven questions the report must answer. Every metric gets a definition precise enough to build and test: formula, grain, inclusions and exclusions, date logic (order date or ship date, which timezone), and an owner. "Export to Excel" usually means the user needs a list or a calculation the report does not give, and is worth asking about. The spec also fixes the things that cause rework late: how fresh the data must be, who may see which rows, how the numbers will be checked against a known source before launch, and what is explicitly not included.
</context>

<task>
<asks>
{{asks}}
</asks>
{{#known_data}}

<known_data>
{{known_data}}
</known_data>
{{/known_data}}

1. Identify the audience groups, how often each will use the report, and the decisions or actions it supports. Where the asks do not say, write the gap into Open questions instead of assuming.
2. Turn the asks into three to seven questions the report must answer, each tied to a decision. Mark each as must, should or could.
3. Define every metric: name, plain-language meaning, formula, grain, inclusions and exclusions, date logic, comparison (prior period, target, last year) and owner. Flag metrics whose definition is disputed or missing.
4. List dimensions and filters with their default values, and drill paths. Reject or question breakdowns no question needs.
5. Sketch the layout in text: page by page, what sits at the top (the answer), what supports it, and where detail lives.
6. Specify data and refresh: sources, latency needed (for example "yesterday's data by 8:00 local time"), history depth, and known data issues.
7. Specify access: who sees what, any row-level restrictions, export rules and sensitive fields.
8. Write acceptance checks the requester can sign off: figures that must match a named source within a stated tolerance, filter behaviour, load time target, and a review by a named user role.
9. List what is out of scope and the open questions, each with who should answer it.
</task>

<constraints>
- Do not invent metric definitions, sources or targets. Where the asks are vague, propose a definition, label it "proposed" and add it to Open questions.
- Keep the spec tool-neutral unless a tool is named; do not write DAX, SQL or LookML here.
- Push back in the spec on requests that will hurt the result (dozens of filters, every metric on one page, raw-data dumps) and say what to do instead.
- Keep it short enough to review in one meeting.
</constraints>

<output_format>
## Purpose and audience
Table: audience | frequency | decision or action.

## Questions answered
Numbered list with priority (must, should, could).

## Metrics
Table: metric | meaning | formula | grain | inclusions and exclusions | date logic | comparison | owner | status (agreed or proposed).

## Dimensions and filters
Table: dimension or filter | values | default | needed for question.

## Layout sketch
Page-by-page text sketch.

## Data and refresh
## Access
## Acceptance checks
Numbered, testable checks.

## Out of scope
## Open questions
Table: question | who answers | needed by.
</output_format>
