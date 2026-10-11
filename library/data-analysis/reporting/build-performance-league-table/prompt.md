---
schema: 1
id: build-performance-league-table
kind: prompt
title: Build a fair performance league table
description: Compares and ranks stores, branches, teams or sites on rates rather than counts, adjusts for size and mix, and uses funnel plots or intervals so small units are not falsely named best or worst.
category: reporting
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, business-analyst, operations-manager, executive]
subject: [statistics]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [league-table, funnel-plot, ranking, small-numbers, unit-comparison]
pairs_with:
  prompts: [set-scorecard-status-thresholds, build-composite-index, compare-period-performance]
args:
  - name: units_data
    description: "One row per unit (store, branch, ward, team, school) with the outcome count, the denominator (customers, visits, cases, hours), and any mix or context variables such as size, region or case type."
    type: text
    required: true
  - name: purpose
    description: What the ranking is for (internal review, bonuses, publication, choosing where to help) and the audience.
    type: text
    required: true
  - name: tool
    description: Tool for any code.
    type: enum
    enum: [python, r, spreadsheet, none]
    default: none
output_contract:
  format: markdown
  sections: [Summary, Method, Results, Units to look at, Code, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
League tables of units are among the most misleading reports an organisation produces. Raw counts reward size. Rates from small units swing wildly, so the "best" and "worst" in a simple ranking are mostly the smallest units having a lucky or unlucky period, and they regress to the middle next time. Units with harder case mix (older patients, poorer areas, larger orders) look worse for reasons outside their control. Analysts in health and public services use a standard toolkit: compare rates, adjust for mix where justified (indirect standardisation, observed versus expected), show each unit against control limits that widen as size shrinks (a funnel plot), and only call out units outside the limits. A ranked list of 40 positions implies differences that mostly do not exist; bands or a funnel chart communicate what the data can support. When rankings feed pay or publication, the stakes of a false outlier are high.

Purpose: {{purpose}}
Tool: {{tool}}
</context>

<task>
<units_data>
{{units_data}}
</units_data>

1. Check the data: denominators present for every unit, units with very small denominators, missing units, and whether outcomes are counted the same way everywhere.
2. Compute each unit's rate and the overall rate. If mix variables are supplied and relevant, compute expected values by mix and an observed-to-expected ratio; say which adjustment you chose and why, or why none.
3. Build funnel plot limits around the overall rate (for example approximately 95% and 99.8%) by denominator, and classify each unit as within limits, above or below. Show the arithmetic or formula for the limits.
4. Present results as bands (above, within, below expected) rather than a strict rank; if a rank is required, show intervals beside it.
5. Name the units outside the limits and the checks to run before acting on them (data errors first, then mix, then practice).
6. If a tool is chosen, provide the code or spreadsheet formulas to reproduce the table and funnel chart.
</task>

<constraints>
- Compute only from the data supplied; show the formula for every limit.
- Never label a unit best or worst on a point estimate alone.
- Do not adjust for a variable that is itself caused by the unit's performance.
- Where results feed pay, discipline or publication, recommend a review of outliers with unit managers before anything is shared.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three sentences: overall rate, how many units sit outside the limits, and the main caveat.

## Method
Rates, adjustment, limit formula.

## Results
Table: Unit | Denominator | Outcome | Rate | Expected (if adjusted) | Band.

## Units to look at
Bullets with the checks before action.

## Code
Code or formulas, or "Not requested".

## Caveats
Bullets.
</output_format>
