---
schema: 1
id: design-report-template
kind: prompt
title: Design a report template
description: Designs a recurring report template with sections, metric specifications, commentary prompts, formatting rules and a production checklist. Use when setting up a weekly, monthly or board report.
category: reporting
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, manager, operations-manager, financial-analyst]
inputs: [text]
output: [docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [report-template, recurring-report, management-reporting, commentary]
pairs_with:
  prompts: [write-monthly-business-review, automate-recurring-report, build-metrics-glossary]
args:
  - name: report_purpose
    description: "What the report is for, the decisions it supports, how often it goes out, the metrics available, and anything wrong with the current version."
    type: text
    required: true
  - name: audience
    description: "Who reads it and how (for example 'executive team, skimmed on phones before Monday meeting', 'board pack, read in full')."
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Purpose and audience, Template, Metric specification, Commentary prompts, Formatting rules, Production checklist]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a head of business intelligence who has redesigned dozens of management reports. You know recurring reports decay: metrics get added and never removed, commentary turns into a description of the chart ("revenue went up"), colours and thresholds drift between authors, and readers stop opening it. A good template prevents this by fixing the structure, defining every number once, and prompting authors to explain why things changed and what should happen next.
</context>

<task>
Design a recurring report template.

<report_purpose>
{{report_purpose}}
</report_purpose>

Audience: {{audience}}

1. Define the purpose and audience in one paragraph: decisions supported, cadence, reading context and the time a reader will spend. If the purpose does not name decisions or metrics, ask and stop.
2. Choose the metrics: a headline set of three to seven, each tied to a decision, plus supporting metrics per section. Cut metrics that no decision depends on, and list what you cut and why.
3. Structure the template, most important first:
   - headline summary: what happened, why, and what needs attention, in three to five bullets;
   - KPI block: each headline metric with actual, comparison (target, prior period, same period last year as fits), variance and a status rule;
   - one section per area of the business or per question, each with a chart, a short table and commentary;
   - risks, issues and decisions needed;
   - appendix: definitions, data sources, refresh time and known data issues.
4. Specify each metric: definition or link to the glossary, formula, source, comparison basis, status thresholds (for example green within 2% of target, amber 2% to 5% below, red more than 5% below), number format and owner.
5. Write commentary prompts for authors that force explanation: what changed and by how much, the main driver, whether it is a one-off or a trend, the impact on the target, and the action or decision needed. Include one good and one bad example sentence.
6. Set formatting rules: number formats and rounding, units in headers, sign conventions (a favourable variance shown consistently), date conventions, chart rules (titles that state the finding, consistent colours, no 3D), status colours with a non-colour cue for accessibility, and a maximum length.
7. Write the production checklist: data refresh and reconciliation checks, who writes which section, review and sign-off, distribution time, and how changes to the template are approved.
</task>

<constraints>
- Fit the length to the audience: a skimmed executive report fits on one or two screens; a board pack can be longer but still opens with the summary.
- Do not invent targets or thresholds the user has not set; propose defaults clearly labelled as proposals.
- Keep every section answerable from the available data; flag any metric that needs data the user does not have.
- Prefer a stable structure: sections appear every period even when there is nothing new, with "No change" written in.
</constraints>

<output_format>
## Purpose and audience
One paragraph.

## Template
The report skeleton in Markdown inside a code block, with [square-bracket placeholders] for values and author instructions in italics.

## Metric specification
Table: Metric | Definition | Formula | Source | Comparison | Status thresholds | Format | Owner.

## Commentary prompts
Numbered prompts, then a good and a bad example.

## Formatting rules
Bullets.

## Production checklist
Numbered steps with owner and timing.
</output_format>
