---
schema: 1
id: set-scorecard-status-thresholds
kind: prompt
title: Set scorecard status thresholds
description: Sets on-track, at-risk and off-track rules for each KPI on a scorecard from target, trajectory and normal noise, so statuses stop flickering and a red means someone must act.
category: reporting
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, business-analyst, operations-manager, manager]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [rag-status, kpi-scorecard, tolerance-bands, exception-reporting]
pairs_with:
  prompts: [define-metric, design-report-template, write-monthly-business-review, detect-anomalies]
args:
  - name: kpis
    description: "Each KPI with its definition, direction (higher or lower is better), target and target date, reporting frequency, and the owner."
    type: text
    required: true
  - name: history
    description: Past values for each KPI (at least 12 periods where possible), so normal variation can be measured. Optional, but thresholds without it are guesses.
    type: text
  - name: current_rules
    description: The status rules in use today and what goes wrong with them (everything green, constant flicker, red ignored). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Threshold rules, Backtest on history, Escalation, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most scorecards set red, amber and green with one flat rule ("green within 5% of target") applied to every KPI. That fails in known ways. A volatile metric flips colour every period on noise, so people learn to ignore it; a stable metric sits green while drifting steadily off course; a point-in-time rule against an end-of-year target shows red in January for a metric that is exactly on its planned path; and nobody has agreed what a red obliges anyone to do. Good thresholds are set per KPI from three things: the planned trajectory to the target (not the final target), the KPI's normal period-to-period variation (so a status change means a real signal, often confirmed over two periods), and the cost of acting late. Each status then carries an action: amber means the owner explains and watches, red means a recovery plan by a date.
</context>

<task>
<kpis>
{{kpis}}
</kpis>
{{#history}}

<history>
{{history}}
</history>
{{/history}}
{{#current_rules}}

<current_rules>
{{current_rules}}
</current_rules>
{{/current_rules}}

1. For each KPI, set the comparison basis: the planned trajectory for this period (straight-line, seasonal profile or phased plan) rather than the year-end target, and say which you chose and why.
2. Measure normal variation from the history: typical period-to-period movement or the spread of residuals around the trend. Without history, propose a provisional band and mark it as an assumption.
3. Propose thresholds per KPI: on track, at risk, off track, expressed as a gap to the trajectory in the KPI's own units or as a number of normal-variation widths. Add a persistence rule where noise is high (for example two consecutive periods beyond the band) and a trend rule for slow drift (for example three periods moving away).
4. Treat special cases: KPIs with tiny counts, ratio KPIs with small denominators, lagging KPIs measured quarterly, and hard limits (compliance, safety) where any breach is red regardless of noise.
5. Backtest the rules on the history: how many periods would have been each colour, how many flips, and whether real problems would have been flagged early. Adjust if a KPI is almost always one colour.
6. Define the action each status triggers, who owns it and by when.
</task>

<constraints>
- Do not apply one flat percentage to every KPI without justifying it per KPI.
- Never invent historical values; run the backtest only on supplied data and say when it is too short.
- Status must always be shown with a word as well as a colour.
- Keep the rules simple enough that the report owner can apply them by hand or in a spreadsheet formula.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three sentences: the approach and the biggest change from the current rules.

## Threshold rules
Table: KPI | Basis (trajectory) | Normal variation | On track | At risk | Off track | Persistence or trend rule.

## Backtest on history
Table: KPI | Periods green, amber, red | Flips | Would it have caught known problems.

## Escalation
Table: Status | What it obliges | Owner | Deadline.

## Caveats
Bullets.
</output_format>
