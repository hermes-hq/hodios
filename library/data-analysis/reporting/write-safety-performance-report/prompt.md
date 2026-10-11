---
schema: 1
id: write-safety-performance-report
kind: prompt
title: Write a health and safety performance report
description: Writes a health and safety performance report with incident rates on a stated basis (TRIR, LTIFR), leading indicators, significant incidents, action status and next period's focus.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [operations-manager, manager, executive, consultant]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [health-and-safety, trir, ltifr, leading-indicators, near-miss]
pairs_with:
  prompts: [write-workplace-incident-report, set-scorecard-status-thresholds, compare-period-performance]
args:
  - name: safety_data
    description: "Hours worked (employees and contractors), injuries by type (lost time, medical treatment, restricted work, first aid), lost days, near misses, high-potential incidents, inspections and audits done, actions raised and closed, training completion, for the period and the last 12 months."
    type: text
    required: true
  - name: context
    description: "Industry, sites, country or countries, which rate formulas and multipliers your organisation uses, targets, and who reads the report (site team, board). Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Lagging indicators, Leading indicators, Significant incidents, Actions status, Focus for next period, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A safety report has to show whether people are getting hurt and whether the controls that prevent harm are working. Safety professionals know the rate formulas differ: total recordable incident rate (TRIR) is usually recordable cases times 200,000 divided by hours worked (about 100 full-time workers for a year), while lost time injury frequency rate (LTIFR) is often per 1,000,000 hours but some organisations use 200,000; the basis must be stated and kept consistent, and definitions of "recordable" depend on national rules. Contractor hours and injuries are included or excluded by an explicit rule. Small sites have so few hours that one injury swings the rate, so rolling 12-month rates and counts are shown beside monthly figures. Lagging indicators alone reward under-reporting: a falling injury rate with falling near-miss reports may mean people stopped reporting. Leading indicators (near-miss reporting rate, inspections completed, actions closed on time, training completion, safety conversations) show whether controls are active, and a rise in near-miss reports is often good news. High-potential incidents, events that could have caused a serious injury, deserve attention whatever the actual outcome. Legal reporting duties to regulators differ by country.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<safety_data>
{{safety_data}}
</safety_data>

1. State the rate formulas and multipliers used and the contractor rule; if not given, use TRIR per 200,000 hours and LTIFR per 1,000,000 hours and say so.
2. Compute TRIR, LTIFR and lost-day severity for the period and the rolling 12 months, with counts and hours shown, and compare with target and prior periods.
3. Report leading indicators against their targets and trend, and comment on the relationship between near-miss reporting and injury rates.
4. Summarise significant and high-potential incidents without naming people: what happened, the potential severity, root cause status and the main control fix.
5. Report corrective action status: raised, closed, overdue, and the oldest overdue items.
6. Set three to five focus areas for the next period, each tied to a figure.
</task>

<constraints>
- Show the counts and hours behind every rate, and never compare rates calculated on different multipliers.
- Do not name or identify injured people; describe roles only when needed and when the group is not small enough to identify someone.
- Do not present a falling injury rate as improvement without checking leading indicators and reporting levels.
- Do not state what must be reported to a regulator; say that reporting duties depend on the country and should be checked with the competent person or regulator.
- Do not invent targets or industry averages.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: injury rates and trend, the state of leading indicators, the most serious incident, the main focus.

## Lagging indicators
Table: Measure | Count | Hours | Rate (basis) | Rolling 12 months | Target | Prior period.

## Leading indicators
Table: Indicator | Actual | Target | Trend. One or two sentences on what they say about reporting culture.

## Significant incidents
Bullets: date, type, potential severity, root cause status, key fix.

## Actions status
Table: Raised | Closed | Open | Overdue. List of the oldest overdue actions with owners.

## Focus for next period
Numbered focus areas with the figure behind each.

## Data notes
Bullets: formulas, contractor rule, data gaps.
</output_format>
