---
schema: 1
id: write-dashboard-user-guide
kind: prompt
title: Write a user guide for a dashboard
description: Writes a short user guide for a dashboard covering what each view answers, metric definitions, filters, data freshness and the common ways people misread it, for its business users.
category: reporting
version: 1.0.0
status: incubating
stage: [ship, maintain]
role: [data-analyst, business-analyst, data-engineer, technical-writer]
inputs: [notes, image, text]
output: [docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [user-guide, dashboard-documentation, metric-definitions, self-help]
pairs_with:
  prompts: [write-data-methodology-note, build-metrics-glossary, announce-new-dashboard]
args:
  - name: dashboard_description
    description: "The dashboard's pages or views, the charts and tables on each, the metrics with their definitions, the filters and their defaults, the refresh schedule and data sources. Screenshots described in words work too."
    type: text
    required: true
  - name: users
    description: Who uses it and the questions they bring, plus any questions or mistakes the team keeps hearing about. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Purpose, Before you start, Views, Metric definitions, Filters, Data freshness, Common misreadings, Help and changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dashboard users rarely read documentation, so a guide that works is short, organised by the question a user has, and honest about the traps. The support questions a BI team receives are mostly the same handful of misreadings. The current period looks like a collapse because it is only partly complete. A filter set on one page silently carries over to another. A total is not the sum of the rows because the metric is a distinct count or a ratio. The dashboard disagrees with finance because it uses a different date (order date against invoice date) or excludes something. Data is a day behind and the user expected live numbers. Times are in a different timezone. Averages of percentages are read as overall rates. A guide that names these upfront, defines each metric in a sentence a non-analyst understands, and says exactly when the data refreshes prevents most of the questions and most of the wrong decisions.
</context>

<task>
<dashboard_description>
{{dashboard_description}}
</dashboard_description>
{{#users}}

<users>
{{users}}
</users>
{{/users}}

1. Write the purpose in two sentences: what the dashboard is for and what it is not for (point to the right place for what it does not cover if given).
2. Write "before you start": access, where to find it, and the two or three things to know before reading any number.
3. For each view, write the question it answers, how to read it (what each chart shows, what good and bad look like), and the one action users usually take from it.
4. Define every metric in plain language with its formula in words, the date it is based on, inclusions and exclusions, and whether its total can be summed across rows.
5. Describe the filters: defaults, whether they carry across pages, and how to reset them.
6. State data freshness: refresh schedule with timezone, how far behind the data is, how to see the last refresh time, and what happens to the current partial period.
7. List common misreadings with a one-line explanation and the right reading, drawn from the description and the users' known questions; add the general ones above only when they apply to this dashboard.
8. Say where to get help, how to report a wrong number, and where changes to the dashboard are announced.
</task>

<constraints>
- Use only the definitions, schedules and sources given; where something is missing, write a visible placeholder like [refresh time?] and do not guess.
- Keep the guide short: aim for something a user can scan in five minutes. No architecture, no data pipeline detail.
- Write in plain language for business users; explain any unavoidable term once.
</constraints>

<output_format>
## Purpose
## Before you start
## Views
A subsection per view: question answered, how to read it, typical action.

## Metric definitions
Table: metric | meaning | based on date | includes and excludes | can be summed.

## Filters
## Data freshness
## Common misreadings
Table: what people see | what it actually means.

## Help and changes
</output_format>
