---
schema: 1
id: compare-active-vs-passive-funds
kind: prompt
title: Compare an active fund with a passive one
description: Compares an active fund with an index alternative using the evidence on fees, persistence and survivorship bias, and works out the yearly outperformance the active fund needs to break even.
category: investing
version: 1.0.0
status: incubating
stage: [learn, review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [explanation, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [active-management, index-funds, survivorship-bias, benchmarks, fund-fees]
pairs_with:
  prompts: [compare-two-funds, calculate-fee-drag, explain-fund-document]
  personas: [investing-educator]
args:
  - name: active_fund
    description: Factsheet details of the active fund - objective, benchmark, ongoing charge, performance figures against its benchmark, manager tenure, size, number of holdings.
    type: text
    required: true
  - name: passive_fund
    description: Details of the index fund or ETF you are comparing it with - index, ongoing charge, tracking difference if given. If you have none in mind, describe the market you want exposure to.
    type: text
    required: true
  - name: amount
    description: Amount and time horizon, so costs can be shown in money. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What the evidence says, Are these comparable, Cost gap in money, Outperformance needed, Reading this fund's record, Questions to check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Published scorecards that compare active funds with their benchmarks (such as the long-running S&P SPIVA reports and similar studies in several regions) consistently find that most active funds trail a comparable index after fees over 10 to 15 years, that past winners rarely stay in the top group (low persistence), and that fund lists look better than reality because closed and merged funds, usually the poor performers, disappear from the data (survivorship bias). The main driver is arithmetic: before costs, active investors as a group earn the market return; after higher costs, the average active pound or dollar must earn less. Exceptions exist and the size of the gap varies by market, but picking a future winner in advance is the hard part. Things novices miss: a fund compared against a flattering benchmark (a global small-cap fund measured against a large-cap index); a strong record driven by a style or sector tilt that a cheaper fund could replicate; short or cherry-picked periods; manager changes that make the record irrelevant; "closet trackers" charging active fees while hugging the index; and performance shown before fees.

<active_fund>
{{active_fund}}
</active_fund>

<passive_fund>
{{passive_fund}}
</passive_fund>
{{#amount}}Amount and horizon: {{amount}}{{/amount}}
</context>

<task>
1. Summarise what the evidence on active versus passive shows, in plain words, naming the type of source and noting that figures change with each edition and should be checked in the latest one.
2. Check comparability: does the active fund's stated benchmark match what it actually holds, and does the passive fund track that same market? If not, say what a fair comparison would be.
3. Cost gap in money: the yearly cost of each and the difference compounded over the horizon (or 10,000 over 20 years, labelled illustrative) at one assumed gross return, showing working.
4. Outperformance needed: the yearly return the active fund must beat its benchmark by, before fees, just to match the index fund after fees, and what share of a typical year's return that is.
5. Read this fund's record: what its figures do and do not show (period length, net or gross, against which benchmark, manager tenure, size growth, number of holdings, any sign of index hugging). Point out missing figures.
6. Questions to check before deciding, for example rolling-period performance versus benchmark, active share, total costs including transaction costs, and what the manager says drives returns.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not quote specific scorecard percentages as current fact; describe the findings and tell them to check the latest edition.
- Do not predict whether the active fund will outperform or say which to choose. Explain the odds, the costs and what the record can and cannot show.
- Use only the figures provided about each fund; mark missing items "not given".
- Be fair: note the markets or situations where active management is more often argued for, and that evidence there is mixed.
{{> output/uncertainty}}
</constraints>

<output_format>
## What the evidence says
Short paragraph.

## Are these comparable
Short paragraph with any mismatch.

## Cost gap in money
Table with working.

## Outperformance needed
One or two sentences with the figure.

## Reading this fund's record
Bullets.

## Questions to check
Bullets.
</output_format>
