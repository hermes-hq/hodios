---
schema: 1
id: write-fundraising-performance-report
kind: prompt
title: Write a fundraising performance report
description: Writes a nonprofit fundraising report for the board with income against target by stream, net return, restricted and unrestricted split, donor retention, pipeline and year-end outlook.
category: reporting
version: 1.0.0
status: incubating
stage: [operate, review]
role: [manager, executive, operations-manager]
subject: [nonprofit]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [donor-retention, income-streams, board-reporting, unrestricted-income, net-income]
pairs_with:
  prompts: [forecast-fundraising-income, analyze-donor-data, write-trustee-board-report]
args:
  - name: fundraising_data
    description: "Income year to date and for the period by stream (individual giving, regular giving, major donors, trusts and foundations, corporate, legacies, events, grants), targets phased by month if available, costs by stream, restricted versus unrestricted, donor counts and retention, and pipeline."
    type: text
    required: true
  - name: context
    description: "Financial year dates, how pledges and legacies are recognised in your accounts, major campaigns this period, the board's known concerns, and the country. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Summary, Income against target, Income by stream, Donors and retention, Pipeline and year-end outlook, Risks and decisions for the board, Data notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Trustees want to know whether the organisation will raise what the budget depends on, and whether that money can pay for core costs. Experienced fundraising directors report so that answer is visible. Income is compared with a phased target, not the annual target divided by twelve, because giving is seasonal (year-end appeals, tax-year deadlines) and legacies and large grants arrive in lumps. Gross income misleads without cost: net income and return on investment by stream show which streams actually fund the mission, and events often raise a lot gross and little net. Restricted income cannot pay for overheads, so a year that beats target on restricted grants can still leave an unrestricted gap. Pledged or confirmed income is not cash received, and accounting recognition rules differ by country and organisation, so say which basis each figure uses. Donor retention, especially first-year retention, is usually far lower than multi-year retention and is the best early warning for individual giving; regular-giving attrition matters in the same way. Pipeline for major gifts and trusts is reported weighted by stage, not at face value.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<fundraising_data>
{{fundraising_data}}
</fundraising_data>

1. State the basis of each figure (received, confirmed, pledged, accounting recognition) and the target phasing used; if no phasing is supplied, say so and use last year's pattern only if it is given.
2. Compare year-to-date income with the phased target, in total and by stream, and split restricted from unrestricted.
3. Compute net income and return per unit of cost by stream where costs are given.
4. Report donor numbers, new donors, retention (first-year and multi-year where available) and regular-giving attrition, with trend.
5. Weight the pipeline by stage using the probabilities supplied or ones you state as assumptions, and give a year-end outlook as a range.
6. Set out the risks and any decisions the board needs to make, such as reallocating investment between streams or closing an unrestricted gap.
</task>

<constraints>
- Do not treat pledges, unconfirmed bids or legacy notifications as received income.
- Keep restricted and unrestricted income separate whenever the gap to target is discussed.
- Do not invent sector benchmarks or stage probabilities; label any you assume.
- Do not give accounting or tax treatment advice; say when a recognition question should go to the finance lead or auditor.
- Do not name individual donors unless the board pack already does and the context says it is appropriate.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Three to five sentences: year to date against phased target, unrestricted position, outlook range, the main decision.

## Income against target
Table: Measure | Year to date actual | Phased target | Variance | Annual target. Rows for total, restricted, unrestricted.

## Income by stream
Table: Stream | Gross | Costs | Net | Return per unit cost | Against target | Trend.

## Donors and retention
Table: Measure | This period | Last year. Short commentary.

## Pipeline and year-end outlook
Weighted pipeline table and the outlook range with assumptions.

## Risks and decisions for the board
Numbered items, each with the figure behind it.

## Data notes
Bullets: recognition basis, phasing, gaps.
</output_format>
