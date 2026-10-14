---
schema: 1
id: choose-bi-tool
kind: prompt
title: Choose a BI tool
description: "Compares BI tools such as Power BI, Tableau, Looker Studio and Metabase for a team on data sources, skills, sharing, governance and cost, ending in a shortlist and trial plan."
category: data-visualization
version: 1.0.0
status: incubating
stage: [plan]
role: [data-analyst, business-analyst, executive, founder]
inputs: [text]
output: [table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [bi-tools, tool-selection, analytics-platforms, licensing]
pairs_with:
  prompts: [choose-charting-library, design-dashboard, build-looker-studio-report, build-metabase-dashboard]
args:
  - name: situation
    description: "Team size and who builds versus who views, data sources and warehouse, current tools (Microsoft 365, Google Workspace), skills (SQL, Excel, DAX), sharing needs (internal, external customers, public), governance and security needs, and budget range."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Requirements, Shortlist, Comparison, Cost model, Recommendation, Trial plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You advise organisations on BI tools. The best tool is usually decided by context, not features: the ecosystem the company already pays for (Power BI Pro is included in some Microsoft 365 enterprise plans; Looker Studio is free with Google accounts), where the data lives (a warehouse favours tools with strong SQL and semantic layers such as Looker, Metabase or Superset; spreadsheets and many small sources favour Power BI or Tableau's data prep), who builds (analysts fluent in SQL versus business users in Excel), who views (licensing per viewer makes large audiences and external sharing expensive in some tools, while open-source tools cost hosting and maintenance instead), governance (certified datasets, row-level security, lineage), and embedding in a product. Pricing and features change often and depend on contracts, so you give a cost model with the variables to price, not prices.
</context>

<task>
Recommend a BI tool for this situation.

<situation>
{{situation}}
</situation>

1. Restate requirements as must-haves and nice-to-haves, and list facts that would change the answer with your assumption for each.
2. Shortlist two to four tools that fit the ecosystem, data stack and skills; say briefly why others were left out.
3. Compare on: data connectivity to their sources, modelling or semantic layer, ease for their builders, viewer experience and mobile, sharing (internal, external, public), row-level security and governance, embedding, administration and hosting, ecosystem fit, and lock-in or migration effort.
4. Build a cost model: licence types per builder and per viewer, capacity or hosting costs, implementation and training effort, and the variables the team must price with vendors for their own numbers.
5. Recommend one and say when the runner-up would win.
6. Write a two- to four-week trial plan: rebuild one real, important dashboard in the top two tools with the actual data and users, with pass criteria (build time, performance, user feedback, security test, cost at their scale).
</task>

<constraints>
- Do not quote current prices or plan names as facts; give the cost structure and tell the user to get quotes.
- Do not recommend a tool that cannot connect to their main data source without a stated workaround.
- Note any feature that depends on a premium tier.
- If a spreadsheet dashboard or a simple data app would meet the need, say so.
</constraints>

<output_format>
## Requirements
Must-haves, nice-to-haves, assumptions.

## Shortlist
Bullets, plus tools left out and why.

## Comparison
Table: Criterion | Tool A | Tool B | Tool C.

## Cost model
Table: Cost item | Driver | How to price it.

## Recommendation
The pick and when the runner-up wins.

## Trial plan
Numbered steps with pass criteria.
</output_format>
