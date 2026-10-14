---
schema: 1
id: analyze-sales-funnel-metrics
kind: prompt
title: Analyse sales funnel metrics
description: Analyses a CRM export of closed and open deals for stage conversion, win rate, cycle length and deal size by lead source and segment, and names the biggest leak worth fixing first.
category: sales
version: 1.0.0
status: incubating
stage: [review]
role: [manager, founder, business-analyst, data-analyst]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [funnel-analysis, conversion-rates, win-rate, sales-cycle, sales-analytics, crm-data]
pairs_with:
  prompts: [analyze-sales-rep-performance, write-sales-performance-report, review-sales-pipeline, design-crm-pipeline]
args:
  - name: deals
    description: A CRM export of deals (CSV or table) with, ideally, created date, stage history or highest stage reached, close date, status (won, lost, open), amount, lead source, segment or region, and loss reason.
    type: text
    required: true
  - name: question
    description: What you want to know (for example "where are we losing most deals", "is outbound worth it", "why did win rate drop this half") and the period to analyse. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Funnel overview, Cuts by source and segment, The biggest leak, What to do, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You analyse sales funnels from CRM data. Common mistakes in this analysis distort decisions: computing win rate on all deals including open ones, which depresses recent periods; counting deals by their current stage instead of the highest stage reached, which hides where deals actually drop; comparing sources with very different cycle lengths over the same short window; treating averages of skewed deal sizes as typical (use the median too); and ignoring that stage definitions and data entry habits change over time. Analysts who do this well cohort deals by creation date, use closed deals only for win rate, show counts beside every percentage so small groups are visible, and look for the single stage and segment where improvement would add the most revenue rather than listing every difference.
</context>

<task>
<deals>
{{deals}}
</deals>

{{#question}}<question>
{{question}}
</question>{{/question}}

1. **Data check:** rows, date range, fields present and missing, open versus closed counts, and data problems (missing amounts, deals skipping stages, duplicate deals, close dates before create dates). State how each problem is handled.
2. **Funnel overview:** for closed deals, conversion from each stage to the next based on the highest stage reached, overall win rate by count and by value, median and average cycle length for won and lost deals, and median and average deal size.
3. **Cuts by source and segment:** the same metrics by lead source and by segment or region, with counts shown beside every rate, and groups under about 20 closed deals flagged as unreliable.
4. **The biggest leak:** the stage and group where improving conversion would add the most revenue. Show the calculation: the deals entering that stage, the current rate, a realistic improved rate (for example, matching the best comparable group), and the resulting extra won deals and value.
5. **What to do:** three specific actions targeting the leak and the measures to watch, plus one thing the data suggests stopping or de-prioritising.
6. **Caveats:** what the data cannot show (causation, deals never logged, changes in stage definitions) and what to track to answer the question better next time.
</task>

<constraints>
- Compute only from the data given; show formulas or the counts behind every rate.
- Exclude open deals from win rates and say so; if stage history is missing, explain the limitation of using the current stage.
- Do not attribute differences to causes without evidence; say "associated with".
- If the data is too small to support conclusions (for example, under about 30 closed deals in total), say so and limit the output to descriptive figures and what to collect.
</constraints>

<output_format>
## Data check
Bullets with counts and handling.

## Funnel overview
Table: Stage transition | Deals entering | Converted | Rate; then win rate, cycle and size figures.

## Cuts by source and segment
Tables by source and by segment with counts beside rates.

## The biggest leak
Short explanation and the calculation.

## What to do
Numbered actions with measures, and one thing to stop.

## Caveats
Bullets.
</output_format>
