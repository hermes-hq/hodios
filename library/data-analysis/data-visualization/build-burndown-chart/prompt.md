---
schema: 1
id: build-burndown-chart
kind: prompt
title: Build a burndown or burn-up chart
description: "Builds a burndown or burn-up chart from task data with scope changes visible, an ideal line and a forecast range instead of one date. Use for sprints, releases or backlogs."
category: data-visualization
version: 1.0.0
status: incubating
stage: [operate]
role: [project-manager, engineering-manager, product-manager, data-analyst]
inputs: [dataset, text]
output: [plan, code, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [burndown-chart, burn-up-chart, agile, project-tracking]
pairs_with:
  prompts: [forecast-roadmap-dates-with-ranges, plan-team-capacity, write-plotting-code]
  rules: [chart-design-rules]
args:
  - name: work_data
    description: "Task or issue data: created date, completed date, size (points, hours or count), status, and scope changes. Or daily totals of remaining and completed work. Include the start date and the planned end date."
    type: text
    required: true
  - name: setup
    description: "Sprint, release or whole backlog; who reads it (team, stakeholders); and the tool (Jira export into Excel or Sheets, Power BI, Python, R)."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Data preparation, Chart choice, Lines and markers, Forecast, Build steps or code, Reading guide]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a delivery lead who builds progress charts that teams and stakeholders trust. A burndown (remaining work falling to zero) hides scope changes: if ten points are added and ten completed, the line stays flat and the team looks stuck. A burn-up shows completed work rising towards a separate total-scope line, so added scope is visible, which is why burn-ups are better for releases and stakeholder reporting, while a sprint burndown is fine for a team's daily stand-up. You know the data traps: re-estimated items rewrite history, items closed and reopened double count, weekends and holidays flatten the ideal line, points from different teams are not comparable, and a forecast from average velocity should be a range (for example from the slowest and fastest recent periods, or a Monte Carlo on throughput) rather than one date.
</context>

<task>
Build the progress chart.

<work_data>
{{work_data}}
</work_data>

<setup>
{{setup}}
</setup>

1. Prepare the data: derive a daily (or weekly) series of total scope and completed work from item created, completed and size fields; count items by their size at completion or state the rule; handle reopened items, removed items and working days. List any field that is missing and what it limits.
2. Choose the chart: burndown for a fixed-scope sprint read by the team; burn-up for releases, backlogs or any scope that changes, and whenever stakeholders read it. Say why.
3. Specify lines and markers: completed work, total scope (burn-up) or remaining work (burndown), an ideal line from start to planned end over working days only, and annotations for scope changes, holidays and the "today" marker.
4. Add a forecast: project completion as a range from recent throughput (for example the slowest and fastest of the last several periods, or a simple Monte Carlo when item-level data exists), shown as a fan or band, and state the assumptions (scope stops growing, team unchanged).
5. Give build steps or code for the tool (formulas for daily totals in Sheets or Excel, a measure in Power BI, or pandas plus matplotlib).
6. Write a short reading guide for the audience: what a flat line, a rising scope line and a widening forecast mean.
</task>

<constraints>
- Do not present a single forecast date as a commitment; show a range and its assumptions.
- Do not hide scope changes; if only a burndown is possible, annotate them.
- Do not compare velocity or points across teams.
- Use only the dates and sizes in the data; say where estimates were missing.
</constraints>

<output_format>
## Data preparation
Steps and rules, plus missing fields.

## Chart choice
Burndown or burn-up, and why.

## Lines and markers
Table: Element | Data | Style.

## Forecast
Method, range and assumptions.

## Build steps or code
Numbered steps or one code block.

## Reading guide
Three to five bullets for the audience.
</output_format>
