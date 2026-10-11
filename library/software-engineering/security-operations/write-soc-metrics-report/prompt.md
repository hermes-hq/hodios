---
schema: 1
id: write-soc-metrics-report
kind: prompt
title: Write a SOC metrics report
description: Turns raw security operations data into an honest monthly or quarterly metrics report - detection and response times, alert quality, coverage and workload - for analysts, leaders or the board.
category: security-operations
version: 1.0.0
status: incubating
stage: [review]
role: [security-engineer, manager]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [soc-metrics, mttd, mttr, alert-quality, security-reporting]
pairs_with:
  prompts: [map-detection-coverage, prune-noisy-alerts, write-threat-intel-brief]
  personas: [soc-analyst]
args:
  - name: data
    description: The numbers for the period - alert counts by source and disposition, case open and close times, incidents, escalations, staffing - as a table or export. Include the previous period if you have it.
    type: text
    required: true
  - name: audience
    description: Who reads it; it decides the detail and the language.
    type: enum
    enum: [soc-team, security-leadership, executives-board]
    default: security-leadership
  - name: period
    description: The period covered, e.g. "September 2026" or "Q3 2026". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Headline, Metrics, What changed and why, Caveats, Decisions or asks, Metrics to add or drop]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SOC metrics often reward the wrong thing. A mean time to respond is dragged by a few long cases, so the median and the 90th percentile tell the truth better. "Alerts closed" rewards closing fast, not closing right. A true-positive rate depends on how consistently analysts pick dispositions. "Percentage of ATT&CK covered" counts rules, not whether they work. Leaders need a small number of measures tied to risk (how fast real threats were found and contained, where blind spots are, whether the team is overloaded) and the honest limits of the data. Board readers want two or three sentences on risk and the decisions needed from them, not alert volumes.
</context>

<task>
Write the SOC metrics report for {{audience}}{{#period}} covering {{period}}{{/period}}.

<data>
{{data}}
</data>

1. Check the data first: list missing fields, inconsistent definitions (for example when the clock starts for "time to detect"), and anything that looks like a data error. Do not hide these.
2. Compute the measures the data supports: time to detect and time to respond or contain as median and 90th percentile, alert volume by source, disposition mix (true positive, benign true positive, false positive, undetermined), true-positive rate per top rule, escalations and incidents by severity, workload per analyst. Show the calculation basis for each and the previous period where given.
3. Explain what changed and the likely reason, separating causes evidenced in the data from hypotheses.
4. Write the caveats: small numbers, definition changes, gaps in logging that mean "no incidents" may mean "not seen".
5. List decisions or asks for the audience, each linked to a number (for example, three rules produce half the false positives; tuning them frees an estimated share of analyst time).
6. Suggest metrics to add or drop, with reasons.
7. Fit the language to {{audience}}: analysts get rule-level detail; leadership gets trends and resourcing; the board gets a plain risk summary of five sentences at most before any table.
</task>

<constraints>
- Every number must come from the data or a shown calculation on it. Never invent benchmarks or industry averages; if the user wants a comparison, say a trusted benchmark source is needed.
- Do not use mean time alone when the data allows median and percentiles.
- Do not present a rise in detections as a worsening threat, or a fall as improvement, without evidence for the cause.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
Three to five sentences.

## Metrics
Table: Measure | This period | Previous | Basis.

## What changed and why
Bullets marked evidenced or hypothesis.

## Caveats
Bullets.

## Decisions or asks
Numbered, each tied to a number.

## Metrics to add or drop
Bullets with reasons.
</output_format>
