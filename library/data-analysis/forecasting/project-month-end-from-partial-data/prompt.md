---
schema: 1
id: project-month-end-from-partial-data
kind: prompt
title: Project month-end results from partial data
description: Projects where a month, quarter or season will finish from results to date, using how the period usually fills up rather than a straight run rate, with a range that narrows as days pass.
category: forecasting
version: 1.0.0
status: incubating
stage: [operate]
role: [manager, financial-analyst, sales-rep, operations-manager]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [run-rate, nowcasting, month-to-date, landing-estimate, pacing]
pairs_with:
  prompts: [write-forecast-commentary, forecast-time-series, explain-budget-variance]
args:
  - name: period_to_date
    description: "Results so far in the current period by day (or the total to date and the date), what the metric is (sales, orders, signups, spend), and the period's length."
    type: text
    required: true
  - name: history
    description: Daily or weekly results for several past periods of the same kind, so the usual filling pattern can be measured. Optional; without it the projection is much rougher.
    type: text
  - name: target
    description: The target or budget for the period, if you want the chance of hitting it.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Methods compared, Projection, Range, What would change it, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The straight run rate (total to date divided by days elapsed, times days in the period) is the most common landing estimate and is often badly wrong. Periods do not fill evenly: weekdays and weekends differ and the mix of each changes month to month, paydays and month-end pushes lift the last days (B2B sales often close a large share in the final week), holidays remove days, and some data arrives late, so the latest days are understated. A better method uses history: by this day of past periods, what share of the final total had typically arrived? Dividing the total to date by that share gives a projection, and the spread of shares across past periods gives an honest range, wide early in the period and narrowing as it closes. Known items still to come (booked orders, scheduled invoices) can be added on top.

{{#target}}Target: {{target}}{{/target}}
</context>

<task>
<to_date>
{{period_to_date}}
</to_date>
{{#history}}

<history>
{{history}}
</history>
{{/history}}

1. Check the data: days elapsed, working or trading days elapsed and remaining, holidays, and whether recent days may be incomplete because of reporting lag.
2. Methods compared:
   a. Straight run rate by calendar days.
   b. Run rate by trading days or weighted by day of week.
   c. Share-of-period from history: the typical share of the final total reached by this day, and the projection it implies.
   d. If known future items are listed, add them to the to-date figure and project only the unknown part.
   Show the arithmetic for each and explain why they differ.
3. Projection: pick the most suitable method and say why; give the central projection.
4. Range: from the spread of shares in past periods (or a stated assumption if no history), give a low and high landing; if a target is given, estimate the chance of reaching it and what daily average the remaining days would need.
5. What would change it: late-period effects, a big deal or order outstanding, data lag, and the date when the projection becomes reliable.
</task>

<constraints>
- Compute only from figures supplied; show every calculation.
- If no history is given, say the range is an assumption and how many past periods would make it reliable.
- Do not report a projection to more precision than the data supports; round sensibly.
- Never present the run rate alone when the history shows the period fills unevenly.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Central projection, range, and the chance of hitting target if one was given.

## Methods compared
Table: method | projection | arithmetic | why it differs.

## Projection
Two or three sentences.

## Range
Low and high with how they were derived; required daily average to hit target.

## What would change it
Bullets.

## Notes
Data checks and assumptions.
</output_format>
