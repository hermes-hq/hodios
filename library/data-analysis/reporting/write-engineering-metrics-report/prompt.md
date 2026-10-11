---
schema: 1
id: write-engineering-metrics-report
kind: prompt
title: Write a monthly engineering metrics report
description: Writes a monthly engineering delivery report with DORA metrics, cycle time by stage, incidents and where time went, framed at team level to avoid gaming and unfair ranking.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [engineering-manager, tech-lead, executive]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dora-metrics, cycle-time, deployment-frequency, change-failure-rate, delivery-metrics]
pairs_with:
  prompts: [measure-dora-metrics, report-incident-trends, analyze-process-cycle-times, write-monthly-business-review]
args:
  - name: engineering_data
    description: "Per team and in total for the month and prior months: deployments, lead time for changes, change failure rate, time to restore, pull request cycle time split by stage, incidents by severity, and work allocation (features, maintenance, unplanned)."
    type: text
    required: true
  - name: context
    description: "How each metric is measured and from which tools, team sizes and what each team owns, notable events (migrations, freezes, reorganisations), goals, and who reads the report. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Delivery metrics, Flow and cycle time, Reliability and incidents, Where time went, What we are changing, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An engineering metrics report should help leaders see whether delivery is getting faster and safer and where the system slows teams down; used badly, it makes teams game numbers. Engineering leaders who report well follow a few principles. The four DORA measures (deployment frequency, lead time for changes, change failure rate, time to restore) are read together, because speed bought with more failures is not progress. Each measure depends on its definition (what counts as a deployment or a failure), so definitions are stated and changes to them are flagged. Cycle time is more useful split into stages (coding, waiting for review, in review, waiting to deploy), because waiting time is usually larger than working time and points at process fixes. Medians and percentiles matter, since a few long-running items distort averages. Teams differ in what they own (a mobile app with store review, a regulated payments service, a legacy platform), so comparing teams or ranking them is misleading and invites gaming; the useful comparison is each team against its own trend. Individual-level metrics such as commits or lines of code per person do not measure contribution and should not appear. Work allocation shows how much capacity goes to unplanned work and maintenance, often the real reason delivery slows.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<engineering_data>
{{engineering_data}}
</engineering_data>

1. State the definition and source of each metric and flag any definition or tooling change that breaks the trend.
2. Report the four DORA measures for the organisation and per team against each team's own trend, using medians where distributions are skewed.
3. Break cycle time into stages, find the stage with the most waiting, and suggest the likely process cause as a hypothesis.
4. Report incidents by severity, time to restore and recurring causes, and link change failures to their sources where the data shows it.
5. Report work allocation and how unplanned work moved.
6. List what teams or leadership are changing next month, each tied to a figure, and what will be watched to see if it worked.
</task>

<constraints>
- Do not rank teams against each other or present a league table; compare each team with its own history and note context differences.
- Do not report individual-level productivity metrics; refuse requests to do so and explain why.
- Read speed and stability together; never praise a speed gain without the failure rate beside it.
- Do not invent benchmarks or performance tiers unless supplied with their source.
- Mark causes as hypotheses unless the data shows them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: speed and stability trend, the biggest bottleneck, the main reliability issue, the main change planned.

## Delivery metrics
Table: Measure | This month | Last month | Three-month trend | Definition. Per-team trends as a separate table without ranking.

## Flow and cycle time
Table: Stage | Median | 85th percentile | Change. Bottleneck and hypothesis.

## Reliability and incidents
Incidents by severity, time to restore, recurring causes.

## Where time went
Table: Work type | Share this month | Last month.

## What we are changing
Numbered changes with the figure that motivates each and the signal to watch.

## Data notes
Bullets: definitions, tool changes, gaps.
</output_format>
